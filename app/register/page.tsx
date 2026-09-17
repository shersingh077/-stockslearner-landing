"use client";

import { FormEvent, useState } from "react";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    // Form ko async request se pehle save kar rahe hain
    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      full_name: String(formData.get("full_name") || "").trim(),
      mobile: String(formData.get("mobile") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      city: String(formData.get("city") || "").trim(),
      requirement: String(formData.get("requirement") || "").trim(),
      password: String(formData.get("password") || ""),
    };

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "Registration failed.");
        return;
      }

      // Registration successful
      setMessage(
        "Registration successful! Your account has been created."
      );

      // Form reset
      form.reset();
    } catch (error) {
      console.error("Registration error:", error);
      setError("Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-12 text-white">
      <div className="mx-auto max-w-xl">

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold sm:text-4xl">
            Client Registration
          </h1>

          <p className="mt-3 text-slate-400">
            Create your client account
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl sm:p-8">

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Full Name */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Full Name
              </label>

              <input
                required
                name="full_name"
                type="text"
                placeholder="Enter your full name"
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            {/* Mobile */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Mobile Number
              </label>

              <input
                required
                name="mobile"
                type="tel"
                inputMode="numeric"
                pattern="[0-9]{10}"
                maxLength={10}
                placeholder="10 digit mobile number"
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Email Address

                <span className="ml-2 text-xs text-slate-500">
                  Optional
                </span>
              </label>

              <input
                name="email"
                type="email"
                placeholder="Enter email address"
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            {/* City */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                City
              </label>

              <input
                required
                name="city"
                type="text"
                placeholder="Enter your city"
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            {/* Requirement */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Requirement
              </label>

              <select
                required
                name="requirement"
                defaultValue=""
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500"
              >
                <option value="" disabled>
                  Select requirement
                </option>

                <option value="consultation">
                  Consultation
                </option>

                <option value="investment">
                  Investment
                </option>

                <option value="service">
                  Service
                </option>

                <option value="other">
                  Other
                </option>
              </select>
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Password
              </label>

              <input
                required
                name="password"
                type="password"
                minLength={6}
                placeholder="Minimum 6 characters"
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-lg bg-red-500/10 p-3 text-sm text-red-400">
                {error}
              </div>
            )}

            {/* Success */}
            {message && (
              <div className="rounded-lg bg-green-500/10 p-3 text-sm text-green-400">
                {message}
              </div>
            )}

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-blue-600 px-5 py-3.5 font-semibold hover:bg-blue-500 disabled:opacity-60"
            >
              {loading
                ? "Creating Account..."
                : "Register Now"}
            </button>

            <p className="text-center text-xs text-slate-500">
              No OTP required. Login will use mobile number and password.
            </p>

          </form>
        </div>
      </div>
    </main>
  );
}