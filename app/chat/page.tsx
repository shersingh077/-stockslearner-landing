"use client";

import { FormEvent, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ImagePlus, Send, X } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { MAX_CHAT_IMAGE_SIZE, isChatImageType } from "@/lib/chat-upload";

type Message = {
  id: string;
  sender_type: "client" | "admin";
  message: string;
  created_at: string;
  attachment_url?: string | null;
  attachment_name?: string | null;
  payment_utr?: string | null;
  message_type?: string;
};

type UploadResponse = {
  error?: string;
  signedUrl?: string;
  path?: string;
  fileName?: string;
};

function ChatContent() {
  const searchParams = useSearchParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState(() => searchParams.get("message") ?? "");
  const [utr, setUtr] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [authRequired, setAuthRequired] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadMessages = useCallback(async () => {
    try {
      const response = await fetch("/api/chat", { cache: "no-store" });
      const data = await response.json();

      if (response.status === 401) {
        setAuthRequired(true);
        setError("");
        return;
      }

      if (!response.ok) {
        setError(data.error || "Unable to load chat.");
        return;
      }

      setAuthRequired(false);
      setMessages(data.messages || []);
      setError("");
    } catch {
      setError("Unable to connect to chat. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const initialLoad = window.setTimeout(() => {
      void loadMessages();
    }, 0);
    const interval = window.setInterval(() => {
      void loadMessages();
    }, 5000);

    return () => {
      window.clearTimeout(initialLoad);
      window.clearInterval(interval);
    };
  }, [loadMessages]);

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;

    const message = text.trim();
    const paymentUtr = utr.trim();

    if (!message && !paymentUtr && !image) {
      setError("Write a message or attach a photo before sending.");
      return;
    }

    setSending(true);
    setError("");

    try {
      let attachmentPath: string | undefined;
      let attachmentName: string | undefined;

      if (image) {
        const uploadRequest = await fetch("/api/chat/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            file_name: image.name,
            file_size: image.size,
            file_type: image.type,
          }),
        });
        const uploadData = (await uploadRequest.json()) as UploadResponse;

        if (!uploadRequest.ok || !uploadData.signedUrl || !uploadData.path) {
          if (uploadRequest.status === 401) setAuthRequired(true);
          throw new Error(uploadData.error || "Could not start photo upload.");
        }

        const uploadBody = new FormData();
        uploadBody.append("cacheControl", "3600");
        uploadBody.append("", image);
        const storageResponse = await fetch(uploadData.signedUrl, {
          method: "POST",
          headers: { "x-upsert": "false" },
          body: uploadBody,
        });

        if (!storageResponse.ok) {
          throw new Error(
            "Photo upload failed. Check the image is 10 MB or smaller and try again.",
          );
        }

        attachmentPath = uploadData.path;
        attachmentName = uploadData.fileName || image.name;
      }

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          payment_utr: paymentUtr,
          attachment_path: attachmentPath,
          attachment_name: attachmentName,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) setAuthRequired(true);
        throw new Error(data.error || "Message could not be sent.");
      }

      setText("");
      setUtr("");
      setImage(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      await loadMessages();
    } catch (sendError) {
      setError(
        sendError instanceof Error
          ? sendError.message
          : "Unable to send your message.",
      );
    } finally {
      setSending(false);
    }
  }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      setImage(null);
      return;
    }

    if (!isChatImageType(file.type)) {
      setError("Only JPG, PNG and WEBP photos are allowed.");
      event.target.value = "";
      setImage(null);
      return;
    }

    if (file.size > MAX_CHAT_IMAGE_SIZE) {
      setError("Choose a photo that is 10 MB or smaller.");
      event.target.value = "";
      setImage(null);
      return;
    }

    setError("");
    setImage(file);
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-md text-sm font-semibold text-slate-600 transition-colors hover:text-blue-700"
        >
          <ArrowLeft size={17} aria-hidden="true" />
          StockLearners
        </Link>

        <header className="mb-7 mt-6 flex flex-col gap-2 sm:mb-8">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-blue-700">
            Client support
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
            Chat with our team
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Send a message or attach a JPG, PNG or WEBP photo up to 10 MB.
            Please never share passwords, OTPs or sensitive financial details.
          </p>
        </header>

        {loading ? (
          <div
            className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500 shadow-sm"
            role="status"
          >
            Connecting to your chat…
          </div>
        ) : authRequired ? (
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
            <h2 className="text-xl font-bold text-slate-950">
              Sign in to start your chat
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
              Website chat is available to registered clients so your messages
              and photo attachments stay connected to your account.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/login?next=%2Fchat"
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-blue-700 px-6 py-3 font-bold text-white transition-colors hover:bg-blue-800"
              >
                Sign in to chat
              </Link>
              <Link
                href="/register?next=%2Fchat"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-800 transition-colors hover:bg-slate-50"
              >
                Create a client account
              </Link>
            </div>
          </section>
        ) : (
          <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div
              className="h-[min(58vh,560px)] min-h-[300px] space-y-4 overflow-y-auto bg-slate-50/70 p-4 sm:p-6"
              role="log"
              aria-label="Chat messages"
              aria-live="polite"
            >
              {messages.length === 0 ? (
                <div className="mx-auto mt-12 max-w-sm rounded-2xl border border-slate-200 bg-white p-6 text-center">
                  <p className="font-semibold text-slate-900">
                    Your conversation starts here
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Send your question to begin. You can attach a photo if it
                    helps explain your query.
                  </p>
                </div>
              ) : (
                messages.map((item) => (
                  <div
                    key={item.id}
                    className={`flex ${
                      item.sender_type === "client"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[88%] rounded-2xl px-4 py-3 shadow-sm sm:max-w-[75%] ${
                        item.sender_type === "client"
                          ? "bg-blue-700 text-white"
                          : "border border-slate-200 bg-white text-slate-900"
                      }`}
                    >
                      {item.message ? (
                        <p className="whitespace-pre-wrap text-sm leading-6">
                          {item.message}
                        </p>
                      ) : null}

                      {item.payment_utr ? (
                        <div className="mt-3 rounded-lg bg-black/10 p-3">
                          <p className="text-xs opacity-70">
                            UTR / Transaction ID
                          </p>
                          <p className="mt-1 break-all text-sm font-semibold">
                            {item.payment_utr}
                          </p>
                        </div>
                      ) : null}

                      {item.attachment_url ? (
                        <a
                          href={`/api/chat/file?path=${encodeURIComponent(
                            item.attachment_url,
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 inline-flex items-center gap-2 rounded-lg bg-black/10 px-3 py-2 text-xs font-semibold underline underline-offset-2"
                        >
                          <ImagePlus size={15} aria-hidden="true" />
                          View {item.attachment_name || "attached photo"}
                        </a>
                      ) : null}

                      <p className="mt-2 text-[10px] opacity-65">
                        {new Date(item.created_at).toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {error ? (
              <div
                className="mx-4 mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700 sm:mx-6"
                role="alert"
              >
                {error}
              </div>
            ) : null}

            <form
              onSubmit={sendMessage}
              className="space-y-4 border-t border-slate-200 p-4 sm:p-6"
            >
              <div className="flex flex-wrap items-center gap-3">
                <label
                  htmlFor="chat-photo"
                  className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                >
                  <ImagePlus size={17} aria-hidden="true" />
                  Attach a photo
                  <input
                    ref={fileInputRef}
                    id="chat-photo"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleImageChange}
                    className="sr-only"
                  />
                </label>
                <span className="text-xs text-slate-500">
                  JPG, PNG or WEBP · Up to 10 MB
                </span>
              </div>

              {image ? (
                <div className="flex items-center gap-3 rounded-xl border border-blue-100 bg-blue-50 p-3">
                  <ImagePlus
                    size={18}
                    className="shrink-0 text-blue-700"
                    aria-hidden="true"
                  />
                  <span className="min-w-0 flex-1 truncate text-sm font-medium text-slate-800">
                    {image.name}
                    <span className="ml-2 text-xs font-normal text-slate-500">
                      {(image.size / (1024 * 1024)).toFixed(1)} MB
                    </span>
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setImage(null);
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 hover:bg-white hover:text-slate-900"
                    aria-label="Remove attached photo"
                  >
                    <X size={17} aria-hidden="true" />
                  </button>
                </div>
              ) : null}

              <label className="block">
                <span className="sr-only">Message</span>
                <textarea
                  value={text}
                  onChange={(event) => setText(event.target.value)}
                  placeholder="Type your message…"
                  rows={3}
                  maxLength={4000}
                  className="w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm leading-6 text-slate-900 placeholder:text-slate-400 focus:border-blue-500"
                />
              </label>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <label className="min-w-0 flex-1">
                  <span className="sr-only">
                    UTR or transaction ID, optional
                  </span>
                  <input
                    value={utr}
                    onChange={(event) => setUtr(event.target.value)}
                    placeholder="Payment UTR / transaction ID (optional)"
                    maxLength={120}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500"
                  />
                </label>
                <button
                  type="submit"
                  disabled={
                    sending || (!text.trim() && !utr.trim() && !image)
                  }
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-700 px-6 py-3 font-bold text-white transition-colors hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Send size={16} aria-hidden="true" />
                  {sending ? "Sending…" : "Send message"}
                </button>
              </div>
            </form>
          </section>
        )}
      </div>
    </main>
  );
}

export default function ChatPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-slate-50 px-4 py-12">
          <div className="mx-auto max-w-4xl text-center text-sm text-slate-500">
            Loading chat…
          </div>
        </main>
      }
    >
      <ChatContent />
    </Suspense>
  );
}
