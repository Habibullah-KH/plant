import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  Apple,
  ArrowLeft,
  Eye,
  EyeOff,
  Facebook,
  Grid2X2,
  MapPin,
} from "lucide-react";

import BrandLogo from "../../components/BrandLogo";
import heroImage from "../../assets/images/demo.jpg";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    const email = form.email.value;
    const password = form.password.value;

    // Placeholder until you wire Firebase auth / backend login.
    // eslint-disable-next-line no-alert
    alert(`Login submitted: ${email}`);

    form.reset();
    setPasswordValue("");
  };

  const passwordHint = useMemo(() => {
    if (!passwordValue) return "";
    if (passwordValue.length < 6) return "Too short";
    return "";
  }, [passwordValue]);

  return (
    <div className="min-h-screen bg-[#e9ece5] p-4 sm:p-6">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-6xl items-stretch overflow-hidden rounded-[28px] bg-white shadow-[0_24px_80px_-40px_rgba(0,0,0,0.35)]">
        {/* Left */}
        <div className="relative w-full p-6 sm:p-10 lg:w-[52%]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, rgba(0,0,0,0.06) 0 1px, transparent 1px), radial-gradient(circle at 80% 30%, rgba(0,0,0,0.05) 0 1px, transparent 1px), radial-gradient(circle at 40% 80%, rgba(0,0,0,0.05) 0 1px, transparent 1px)",
              backgroundSize: "180px 180px, 220px 220px, 260px 260px",
            }}
          />

          <div className="relative">
            {/* Top controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm hover:bg-gray-50"
                  aria-label="Back"
                  onClick={() => navigate(-1)}
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>

                <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm">
                  <Grid2X2 className="h-4 w-4" />
                  <span className="font-medium">Menu</span>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm">
                <MapPin className="h-4 w-4" />
                <span className="font-medium">Canada</span>
                <span aria-hidden="true">🇨🇦</span>
              </div>
            </div>

            {/* Header */}
            <div className="mt-10 flex flex-col items-center text-center">
              <BrandLogo variant="auth" />
              <h1 className="mt-4 text-2xl font-semibold tracking-tight">
                Welcome back
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Log in to continue your journey.
              </p>

              <div className="mt-5 inline-flex rounded-full bg-gray-100 p-1">
                <button
                  type="button"
                  onClick={() => navigate("/signup")}
                  className="rounded-full px-5 py-2 text-sm font-medium text-gray-700 transition hover:text-black"
                >
                  Register
                </button>
                <button
                  type="button"
                  aria-current="page"
                  className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white shadow transition"
                >
                  Login
                </button>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <button
                  type="button"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm hover:bg-gray-50"
                  aria-label="Continue with Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm hover:bg-gray-50"
                  aria-label="Continue with Apple"
                >
                  <Apple className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm hover:bg-gray-50"
                  aria-label="Continue with Google"
                >
                  <span className="text-base font-semibold">G</span>
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="mt-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs text-gray-500">or</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="mt-6 mx-auto w-full max-w-md space-y-4"
            >
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-700">
                  Email
                </label>
                <input
                  name="email"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none shadow-sm focus:border-gray-400"
                  type="email"
                  placeholder="robert.fox@gmail.com"
                  autoComplete="email"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    name="password"
                    onChange={(e) => setPasswordValue(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 pr-14 text-sm outline-none shadow-sm focus:border-gray-400"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    minLength={6}
                    required
                  />

                  <div className="absolute inset-y-0 right-3 flex items-center gap-2">
                    {passwordHint ? (
                      <span className="text-xs font-medium text-red-600">
                        {passwordHint}
                      </span>
                    ) : null}
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-xs text-gray-600">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  Remember me
                </label>
                <button
                  type="button"
                  className="text-xs font-medium text-gray-700 hover:text-black"
                >
                  Forgot?
                </button>
              </div>

              <button
                type="submit"
                className="mt-2 w-full rounded-2xl bg-black px-4 py-4 text-sm font-semibold text-white shadow hover:bg-gray-900"
              >
                Start your adventure
              </button>

              <p className="text-center text-xs text-gray-600">
                Don&apos;t have an account?{" "}
                <Link to="/signup" className="font-medium text-black underline">
                  Register
                </Link>
              </p>

              <p className="pt-2 text-center text-xs text-gray-600">
                Go back to{" "}
                <Link to="/" className="font-medium text-black underline">
                  Home
                </Link>
              </p>
            </form>
          </div>
        </div>

        {/* Right */}
        <div className="relative hidden bg-black lg:block lg:w-[48%]">
          <img
            src={heroImage}
            alt="Nature"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/10 to-black/55" />

          {/* Top right location card */}
          <div className="absolute right-6 top-6 rounded-2xl bg-white/90 px-4 py-3 text-sm shadow backdrop-blur">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <MapPin className="h-3.5 w-3.5" />
              </span>
              <div className="leading-tight">
                <div className="font-semibold">
                  Pacific Rim National Park Reserve
                </div>
                <div className="text-xs text-gray-600">
                  Vancouver Island, British Columbia
                </div>
              </div>
            </div>
          </div>

          {/* Main hero text */}
          <div className="absolute bottom-10 left-8 right-8">
            <h2 className="text-4xl font-semibold tracking-tight text-white">
              Your next adventure
              <br />
              starts{" "}
              <span className="rounded-xl bg-emerald-200/90 px-2 py-1 text-black">
                here
              </span>
            </h2>
            <p className="mt-3 max-w-md text-sm text-white/85">
              Discover the best places and experiences for your next journey.
            </p>

            <div className="mt-6 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-white/20 px-3 py-2 text-white backdrop-blur">
                Destinations
              </span>
              <span className="rounded-full bg-white/20 px-3 py-2 text-white backdrop-blur">
                Banff
              </span>
              <span className="rounded-full bg-white/20 px-3 py-2 text-white backdrop-blur">
                Jasper
              </span>
              <span className="rounded-full bg-white/20 px-3 py-2 text-white backdrop-blur">
                Pacific Rim
              </span>
              <span className="rounded-full bg-white/20 px-3 py-2 text-white backdrop-blur">
                Gwaii Haanas
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
