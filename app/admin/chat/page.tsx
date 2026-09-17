"use client";

import { FormEvent, Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type Client = {
  id: string;
  full_name: string;
  mobile: string;
  email: string | null;
  city: string | null;
};

type Message = {
  id: string;
  client_id: string;
  sender_type: "client" | "admin";
  message: string;
  created_at: string;
  attachment_url?: string | null;
  attachment_name?: string | null;
  payment_utr?: string | null;
  message_type?: string;
  enquiry_type?: string;
};

const plans = [
  { id: "1_month", name: "1 Month", price: 4999 },
  { id: "3_months", name: "3 Months", price: 9999 },
  { id: "1_year", name: "1 Year", price: 19999 },
];

const investmentPlans = [
  { id: "25000", amount: 25000, returnAmount: "₹50,000 – ₹1,50,000" },
  { id: "50000", amount: 50000, returnAmount: "₹1,00,000 – ₹3,00,000" },
  { id: "100000", amount: 100000, returnAmount: "₹2,00,000 – ₹6,00,000" },
  { id: "200000", amount: 200000, returnAmount: "₹4,00,000 – ₹12,00,000" },
  { id: "300000", amount: 300000, returnAmount: "₹6,00,000 – ₹18,00,000" },
  { id: "500000", amount: 500000, returnAmount: "₹10,00,000 – ₹30,00,000" },
];

function AdminChatContent() {
  const searchParams = useSearchParams();

  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [loadingClients, setLoadingClients] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sending, setSending] = useState(false);
  const [processingPayment, setProcessingPayment] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("3_months");
  const [selectedInvestmentPlan, setSelectedInvestmentPlan] = useState("25000");

  async function loadClients() {
    try {
      const response = await fetch("/api/admin/chat", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Unable to load clients.");
        return;
      }

      const clientList = data.clients || [];
      setClients(clientList);

      const clientId = searchParams.get("client_id");

      if (clientId) {
        const found = clientList.find(
          (client: Client) => client.id === clientId
        );

        if (found) {
          setSelectedClient(found);
        }
      }
    } catch {
      setError("Unable to connect to admin chat.");
    } finally {
      setLoadingClients(false);
    }
  }

  async function loadMessages(
    clientId: string,
    showLoading = false
  ) {
    if (showLoading) {
      setLoadingMessages(true);
    }

    try {
      const response = await fetch(
        `/api/admin/chat?client_id=${encodeURIComponent(clientId)}`,
        { cache: "no-store" }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Unable to load messages.");
        return;
      }

      const newMessages = data.messages || [];

      setMessages((currentMessages) => {
        if (
          currentMessages.length === newMessages.length &&
          currentMessages.length > 0 &&
          currentMessages[currentMessages.length - 1]?.id ===
            newMessages[newMessages.length - 1]?.id
        ) {
          return currentMessages;
        }

        return newMessages;
      });
    } catch {
      setError("Unable to load messages.");
    } finally {
      if (showLoading) {
        setLoadingMessages(false);
      }
    }
  }

  useEffect(() => {
    loadClients();
  }, [searchParams]);

  useEffect(() => {
    if (!selectedClient) return;

    loadMessages(selectedClient.id, true);

    const interval = setInterval(() => {
      loadMessages(selectedClient.id, false);
    }, 5000);

    return () => clearInterval(interval);
  }, [selectedClient]);

  async function sendMessage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const message = text.trim();

    if (!selectedClient || !message || sending) return;

    setSending(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/admin/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: selectedClient.id,
          message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Message could not be sent.");
        return;
      }

      setText("");
      await loadMessages(selectedClient.id);
    } catch {
      setError("Unable to send message.");
    } finally {
      setSending(false);
    }
  }

  async function updatePayment(
    message: Message,
    status: "verified" | "rejected"
  ) {
    if (!selectedClient) return;

    const confirmed = window.confirm(
      status === "verified"
        ? "Payment verify करके VIP activate करना है?"
        : "इस payment को reject करना है?"
    );

    if (!confirmed) return;

    setProcessingPayment(message.id);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/admin/vip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: selectedClient.id,
          plan: selectedPlan,
          payment_status: status,
          payment_method: "Manual Payment",
          utr: message.payment_utr || "",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Payment update failed.");
        return;
      }

      setSuccess(
        status === "verified"
          ? "✓ Payment verified और VIP activate हो गया।"
          : "Payment reject हो गया।"
      );

      await loadMessages(selectedClient.id);
    } catch {
      setError("Unable to update payment.");
    } finally {
      setProcessingPayment(null);
    }
  }

  async function updateInvestment(
    message: Message,
    status: "verified" | "rejected"
  ) {
    if (!selectedClient) return;

    const selected = investmentPlans.find(
      (plan) => plan.id === selectedInvestmentPlan
    );

    if (!selected) {
      setError("Investment plan select करें.");
      return;
    }

    const confirmed = window.confirm(
      status === "verified"
        ? `₹${selected.amount.toLocaleString("en-IN")} Investment approve करना है?`
        : "इस Investment enquiry को reject करना है?"
    );

    if (!confirmed) return;

    setProcessingPayment(message.id);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/admin/investment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: selectedClient.id,
          plan_id: selectedInvestmentPlan,
          status,
          payment_method: "Manual Payment",
          utr: message.payment_utr || "",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Investment update failed.");
        return;
      }

      setSuccess(
        status === "verified"
          ? "✓ Investment approved successfully."
          : "Investment reject हो गया।"
      );

      await loadMessages(selectedClient.id);
    } catch {
      setError("Unable to update investment.");
    } finally {
      setProcessingPayment(null);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 p-4 text-white sm:p-8">
      <div className="mx-auto max-w-7xl">

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">💬 Admin Chat</h1>
            <p className="mt-2 text-slate-400">
              Chat, verify payments and activate VIP.
            </p>
          </div>

          <a
            href="/admin"
            className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold hover:bg-slate-700"
          >
            ← Admin Panel
          </a>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-500/10 p-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 rounded-lg bg-green-500/10 p-3 text-sm text-green-400">
            {success}
          </div>
        )}

        <div className="grid overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 md:grid-cols-[320px_1fr]">

          <div className="border-b border-slate-800 md:border-b-0 md:border-r">
            <div className="border-b border-slate-800 p-4">
              <h2 className="font-semibold">
                Clients ({clients.length})
              </h2>
            </div>

            <div className="max-h-[700px] overflow-y-auto">
              {loadingClients ? (
                <p className="p-5 text-sm text-slate-500">
                  Loading clients...
                </p>
              ) : clients.length === 0 ? (
                <p className="p-5 text-sm text-slate-500">
                  No clients found.
                </p>
              ) : (
                clients.map((client) => (
                  <button
                    key={client.id}
                    onClick={() => setSelectedClient(client)}
                    className={`w-full border-b border-slate-800 p-4 text-left ${
                      selectedClient?.id === client.id
                        ? "bg-blue-600/20"
                        : "hover:bg-slate-800"
                    }`}
                  >
                    <p className="font-semibold">{client.full_name}</p>
                    <p className="mt-1 text-xs text-slate-400">
                      {client.mobile}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {client.city || "City not provided"}
                    </p>
                  </button>
                ))
              )}
            </div>
          </div>

          <div className="flex min-h-[700px] flex-col">

            {!selectedClient ? (
              <div className="flex flex-1 items-center justify-center p-8 text-center">
                <div>
                  <div className="text-5xl">💬</div>
                  <h2 className="mt-4 text-xl font-semibold">
                    Select a client
                  </h2>
                  <p className="mt-2 text-sm text-slate-500">
                    Select a client to open conversation.
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="border-b border-slate-800 p-4">
                  <p className="font-bold">
                    {selectedClient.full_name}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    {selectedClient.mobile}
                    {selectedClient.email
                      ? ` • ${selectedClient.email}`
                      : ""}
                  </p>
                </div>

                <div className="flex-1 space-y-4 overflow-y-auto p-5">

                  {loadingMessages ? (
                    <p className="text-center text-sm text-slate-500">
                      Loading messages...
                    </p>
                  ) : messages.length === 0 ? (
                    <p className="text-center text-sm text-slate-500">
                      No messages yet.
                    </p>
                  ) : (
                    messages.map((item) => (
                      <div
                        key={item.id}
                        className={`flex ${
                          item.sender_type === "admin"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[90%] rounded-2xl px-4 py-3 ${
                            item.sender_type === "admin"
                              ? "bg-blue-600"
                              : item.enquiry_type === "investment"
                              ? "border-2 border-green-500 bg-green-500/10"
                              : "bg-slate-800"
                          }`}
                        >
                          {item.enquiry_type === "investment" && (
                            <div className="mb-3 inline-flex rounded-lg bg-green-600 px-3 py-1 text-xs font-bold text-white">
                              💰 INVESTMENT ENQUIRY
                            </div>
                          )}

                          <p className="whitespace-pre-wrap text-sm">
                            {item.message}
                          </p>

                          {(
                            item.enquiry_type === "investment" ||
                            item.message.toLowerCase().includes("investment")
                          ) ? (
                            <div className="mt-3 rounded-xl border-2 border-green-500/40 bg-green-500/5 p-4">

                              <p className="font-bold text-green-400">
                                💰 INVESTMENT ENQUIRY
                              </p>

                              <div className="mt-3 rounded-lg bg-slate-900 p-3">
                                <p className="text-xs text-slate-400">
                                  Investment Plan
                                </p>

                                <select
                                  value={selectedInvestmentPlan}
                                  onChange={(e) =>
                                    setSelectedInvestmentPlan(e.target.value)
                                  }
                                  className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm outline-none"
                                >
                                  {investmentPlans.map((plan) => (
                                    <option
                                      key={plan.id}
                                      value={plan.id}
                                    >
                                      ₹{plan.amount.toLocaleString("en-IN")} — Return {plan.returnAmount}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              {(() => {
                                const selected = investmentPlans.find(
                                  (plan) => plan.id === selectedInvestmentPlan
                                );

                                return selected ? (
                                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                                    <div className="rounded-lg bg-slate-900 p-3">
                                      <p className="text-xs text-slate-400">
                                        Investment Amount
                                      </p>
                                      <p className="mt-1 font-bold">
                                        ₹{selected.amount.toLocaleString("en-IN")}
                                      </p>
                                    </div>

                                    <div className="rounded-lg bg-slate-900 p-3">
                                      <p className="text-xs text-slate-400">
                                        Return Amount
                                      </p>
                                      <p className="mt-1 font-bold text-green-400">
                                        {selected.returnAmount}
                                      </p>
                                    </div>
                                  </div>
                                ) : null;
                              })()}

                              {item.payment_utr && (
                                <div className="mt-3">
                                  <p className="text-xs text-slate-400">
                                    UTR / Transaction ID
                                  </p>
                                  <p className="mt-1 break-all font-bold">
                                    {item.payment_utr}
                                  </p>
                                </div>
                              )}

                              {item.attachment_url && (
                                <div className="mt-3">
                                  <a
                                    href={`/api/chat/file?path=${encodeURIComponent(
                                      item.attachment_url
                                    )}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block rounded-lg bg-yellow-500 px-4 py-2 text-xs font-bold text-black hover:bg-yellow-400"
                                  >
                                    👁 View Payment Screenshot
                                  </a>
                                </div>
                              )}

                              {item.sender_type === "client" && (
                                <div className="mt-4 flex flex-col gap-2 sm:flex-row">

                                  <button
                                    type="button"
                                    disabled={
                                      processingPayment === item.id
                                    }
                                    onClick={() =>
                                      updateInvestment(item, "verified")
                                    }
                                    className="flex-1 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-bold hover:bg-green-500 disabled:opacity-50"
                                  >
                                    {processingPayment === item.id
                                      ? "Processing..."
                                      : "✓ Approve Investment"}
                                  </button>

                                  <button
                                    type="button"
                                    disabled={
                                      processingPayment === item.id
                                    }
                                    onClick={() =>
                                      updateInvestment(item, "rejected")
                                    }
                                    className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-bold hover:bg-red-500 disabled:opacity-50"
                                  >
                                    ✕ Reject
                                  </button>

                                </div>
                              )}

                            </div>
                          ) : (
                            (item.payment_utr || item.attachment_url) && (
                              <div className="mt-3 rounded-xl border border-yellow-500/30 bg-yellow-500/5 p-4">

                                <p className="font-bold text-yellow-400">
                                  💰 Payment Details
                                </p>

                                {item.payment_utr && (
                                  <div className="mt-3">
                                    <p className="text-xs text-slate-400">
                                      UTR / Transaction ID
                                    </p>
                                    <p className="mt-1 break-all font-bold">
                                      {item.payment_utr}
                                    </p>
                                  </div>
                                )}

                                {item.attachment_url && (
                                  <div className="mt-3">
                                    <a
                                      href={`/api/chat/file?path=${encodeURIComponent(
                                        item.attachment_url
                                      )}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-block rounded-lg bg-yellow-500 px-4 py-2 text-xs font-bold text-black hover:bg-yellow-400"
                                    >
                                      👁 View Payment Screenshot
                                    </a>
                                  </div>
                                )}

                                {item.sender_type === "client" && (
                                  <div className="mt-4 border-t border-yellow-500/20 pt-4">

                                    <p className="mb-2 text-xs font-semibold text-slate-400">
                                      Select Paid VIP Plan
                                    </p>

                                    <select
                                      value={selectedPlan}
                                      onChange={(e) =>
                                        setSelectedPlan(e.target.value)
                                      }
                                      className="mb-3 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none"
                                    >
                                      {plans.map((plan) => (
                                        <option
                                          key={plan.id}
                                          value={plan.id}
                                        >
                                          {plan.name} — ₹
                                          {plan.price.toLocaleString("en-IN")}
                                        </option>
                                      ))}
                                    </select>

                                    <div className="flex flex-col gap-2 sm:flex-row">

                                      <button
                                        type="button"
                                        disabled={
                                          processingPayment === item.id
                                        }
                                        onClick={() =>
                                          updatePayment(item, "verified")
                                        }
                                        className="flex-1 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-bold hover:bg-green-500 disabled:opacity-50"
                                      >
                                        {processingPayment === item.id
                                          ? "Processing..."
                                          : "✓ Verify & Activate VIP"}
                                      </button>

                                      <button
                                        type="button"
                                        disabled={
                                          processingPayment === item.id
                                        }
                                        onClick={() =>
                                          updatePayment(item, "rejected")
                                        }
                                        className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-bold hover:bg-red-500 disabled:opacity-50"
                                      >
                                        ✕ Reject
                                      </button>

                                    </div>
                                  </div>
                                )}

                              </div>
                            )
                          )}

                          <p className="mt-2 text-[10px] opacity-60">
                            {new Date(item.created_at).toLocaleString(
                              "en-IN"
                            )}
                          </p>
                        </div>
                      </div>
                    ))
                  )}

                </div>

                <form
                  onSubmit={sendMessage}
                  className="flex gap-2 border-t border-slate-800 p-4"
                >
                  <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Reply to client..."
                    className="min-w-0 flex-1 rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-sm outline-none focus:border-blue-500"
                  />

                  <button
                    type="submit"
                    disabled={sending || !text.trim()}
                    className="rounded-lg bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-500 disabled:opacity-50"
                  >
                    {sending ? "..." : "Send"}
                  </button>
                </form>
              </>
            )}

          </div>
        </div>
      </div>
    </main>
  );
}

export default function AdminChatPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-slate-950 px-4 py-8 text-white">
          <div className="mx-auto max-w-4xl text-center text-slate-400">
            Loading admin chat...
          </div>
        </main>
      }
    >
      <AdminChatContent />
    </Suspense>
  );
}
