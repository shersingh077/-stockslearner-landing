"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

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

function ChatContent() {
  const searchParams = useSearchParams();

  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [utr, setUtr] = useState("");
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  async function loadMessages() {
    try {
      const response = await fetch("/api/chat", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Unable to load chat.");
        return;
      }

      setMessages(data.messages || []);
    } catch {
      setError("Unable to connect to chat.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const prefilledMessage = searchParams.get("message");

    if (prefilledMessage) {
      setText(prefilledMessage);
    }
  }, [searchParams]);

  useEffect(() => {
    loadMessages();

    const interval = setInterval(loadMessages, 5000);

    return () => clearInterval(interval);
  }, []);

  async function sendMessage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (sending) return;

    const message = text.trim();
    const paymentUtr = utr.trim();

    if (!message && !paymentUtr && !screenshot) {
      setError("Message, UTR or screenshot required.");
      return;
    }

    setSending(true);
    setError("");

    try {
      const formData = new FormData();

      formData.append("message", message);

      if (paymentUtr) {
        formData.append("payment_utr", paymentUtr);
      }

      if (screenshot) {
        formData.append("screenshot", screenshot);
      }

      const response = await fetch("/api/chat", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Message could not be sent.");
        return;
      }

      setText("");
      setUtr("");
      setScreenshot(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      await loadMessages();
    } catch {
      setError("Unable to send message.");
    } finally {
      setSending(false);
    }
  }

  function handleScreenshotChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) {
      setScreenshot(null);
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError("Only JPG, PNG and WEBP images are allowed.");
      e.target.value = "";
      setScreenshot(null);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Screenshot must be less than 5 MB.");
      e.target.value = "";
      setScreenshot(null);
      return;
    }

    setError("");
    setScreenshot(file);
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white">
      <div className="mx-auto max-w-2xl">

        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              💬 Chat with Admin
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              Discuss your VIP membership and payment details.
            </p>
          </div>

          <a
            href="/dashboard"
            className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold hover:bg-slate-700"
          >
            Dashboard
          </a>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">

          <div className="h-[500px] space-y-4 overflow-y-auto p-5">

            {loading ? (
              <div className="text-center text-slate-500">
                Loading chat...
              </div>
            ) : messages.length === 0 ? (
              <div className="rounded-xl bg-slate-800 p-5 text-center text-sm text-slate-400">
                No messages yet.
                <br />
                Send a message to start the conversation.
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
                    className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                      item.sender_type === "client"
                        ? "bg-blue-600"
                        : "bg-slate-800"
                    }`}
                  >

                    <p className="whitespace-pre-wrap text-sm">
                      {item.message}
                    </p>

                    {item.payment_utr && (
                      <div className="mt-3 rounded-lg bg-black/20 p-3">
                        <p className="text-xs opacity-60">
                          UTR / Transaction ID
                        </p>

                        <p className="mt-1 break-all text-sm font-semibold">
                          {item.payment_utr}
                        </p>
                      </div>
                    )}

                    {item.attachment_url && (
                      <div className="mt-3">
                        <p className="mb-2 text-xs opacity-60">
                          Payment Screenshot
                        </p>

                        <a
                          href={`/api/chat/file?path=${encodeURIComponent(
                            item.attachment_url
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block rounded-lg bg-white/10 px-3 py-2 text-xs font-semibold hover:bg-white/20"
                        >
                          📎 View Screenshot
                        </a>
                      </div>
                    )}

                    <p className="mt-2 text-[10px] opacity-60">
                      {new Date(
                        item.created_at
                      ).toLocaleString("en-IN")}
                    </p>

                  </div>
                </div>
              ))
            )}

          </div>

          {error && (
            <div className="mx-5 mb-3 rounded-lg bg-red-500/10 p-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <form
            onSubmit={sendMessage}
            className="border-t border-slate-800 p-4"
          >

            <div className="space-y-3">

              <input
                value={utr}
                onChange={(e) => setUtr(e.target.value)}
                placeholder="UTR / Transaction ID (optional)"
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-sm outline-none focus:border-yellow-500"
              />

              <div className="flex items-center gap-3">

                <label className="cursor-pointer rounded-lg bg-slate-800 px-4 py-3 text-sm font-semibold hover:bg-slate-700">
                  📎 Payment Screenshot

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleScreenshotChange}
                    className="hidden"
                  />
                </label>

                {screenshot && (
                  <span className="min-w-0 truncate text-xs text-green-400">
                    ✓ {screenshot.name}
                  </span>
                )}

              </div>

              <div className="flex gap-2">

                <input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Type your message..."
                  className="min-w-0 flex-1 rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-sm outline-none focus:border-blue-500"
                />

                <button
                  type="submit"
                  disabled={
                    sending ||
                    (!text.trim() &&
                      !utr.trim() &&
                      !screenshot)
                  }
                  className="rounded-lg bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {sending ? "..." : "Send"}
                </button>

              </div>

              <p className="text-xs text-slate-500">
                JPG, PNG or WEBP • Maximum 5 MB
              </p>

            </div>

          </form>

        </div>
      </div>
    </main>
  );
}

export default function ChatPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-slate-950 px-4 py-8 text-white">
          <div className="mx-auto max-w-2xl text-center text-slate-400">
            Loading chat...
          </div>
        </main>
      }
    >
      <ChatContent />
    </Suspense>
  );
}
