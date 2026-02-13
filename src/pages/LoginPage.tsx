import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Mail, Lock, PawPrint, ArrowRight, AlertCircle } from "lucide-react";

import { ClientContext } from "../context/ClientContext";
import { LoginClient } from "../services/Client.service";

const LoginPage = () => {
  const clientContext = useContext(ClientContext);
  const navigate = useNavigate();

  const [email, set_email] = useState("");
  const [password, set_password] = useState("");
  const [is_loading, set_is_loading] = useState(false);
  const [error, set_error] = useState<string | null>(null);

  if (clientContext.clientID !== "-1") {
    return <Navigate to={"/"} />;
  }

  const handle_submit = async (e: React.FormEvent) => {
    e.preventDefault();
    set_error(null);
    set_is_loading(true);

    try {
      const normalized_email = email.trim();

      if (!normalized_email) {
        set_error("Please enter your email.");
        return;
      }

      if (!password.trim()) {
        set_error("Please enter your password.");
        return;
      }

      const foundID:string|null = await LoginClient(normalized_email,password);

      if (!foundID) {
        set_error("No account found with this email address.");
        return;
      }

      clientContext?.setClientID(foundID);

      navigate("/");
    } finally {
      set_is_loading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-purple-600/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[420px] w-[420px] rounded-full bg-fuchsia-500/10 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-[420px] w-[420px] rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl items-center px-6 py-10">
        <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          <div className="hidden lg:block">
            <div className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 backdrop-blur">
              <div className="relative">
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-purple-500/40 to-fuchsia-500/20 ring-1 ring-white/10">
                  <PawPrint className="h-5 w-5 text-purple-200" />
                </div>
                <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-black" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold tracking-wide text-white">
                    VetPet
                  </p>
                  <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-semibold text-white/70">
                    Client Portal
                  </span>
                </div>

                <p className="text-xs text-white/55">
                  Clinical Management • Appointments • History • Billing
                </p>
              </div>
            </div>

            <h1 className="mt-8 text-4xl font-bold tracking-tight">
              Welcome back 👋
            </h1>
            <p className="mt-3 max-w-md text-white/70">
              Log in to access your pets, upcoming appointments, medical
              history, and billing.
            </p>

            <div className="mt-10 grid max-w-md grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-semibold">Appointments</p>
                <p className="mt-1 text-sm text-white/60">
                  Reminders and organized scheduling.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-semibold">Medical History</p>
                <p className="mt-1 text-sm text-white/60">
                  Vaccines and visits at your fingertips.
                </p>
              </div>
            </div>
          </div>

          <div className="mx-auto w-full max-w-md">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/60">Client Portal</p>
                  <h2 className="mt-1 text-2xl font-bold">Sign in</h2>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/10">
                  <svg
                    className="h-6 w-6 text-purple-300/80"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 3v6a4 4 0 0 0 8 0V3" />
                    <path d="M10 15a6 6 0 0 0 6 6" />
                    <circle cx="16" cy="9" r="2" />
                  </svg>
                </div>
              </div>

              {error && (
                <div className="mt-5 flex items-start gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  <p>{error}</p>
                </div>
              )}

              <form
                noValidate
                onSubmit={handle_submit}
                className="mt-6 space-y-4"
              >
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/80">
                    Email
                  </label>
                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/40 px-4 py-3">
                    <Mail className="h-4 w-4 text-white/50" />
                    <input
                      value={email}
                      onChange={(e) => set_email(e.target.value)}
                      type="email"
                      placeholder="ana.lopez@example.com"
                      className="w-full bg-transparent text-sm text-white outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-white/80">
                    Password
                  </label>
                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/40 px-4 py-3">
                    <Lock className="h-4 w-4 text-white/50" />
                    <input
                      value={password}
                      onChange={(e) => set_password(e.target.value)}
                      type="password"
                      placeholder="••••••••"
                      className="w-full bg-transparent text-sm text-white outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={is_loading}
                  className="group mt-2 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-purple-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-500 disabled:opacity-70"
                >
                  {is_loading ? "Signing in..." : "Sign in"}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </button>
              </form>
            </div>

            <p className="mt-6 text-center text-xs text-white/35">
              © {new Date().getFullYear()} VetPet. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
