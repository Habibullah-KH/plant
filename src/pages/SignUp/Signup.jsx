import { useContext, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Apple, ArrowLeft, Eye, EyeOff, Facebook, MapPin } from "lucide-react";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";

import BrandLogo from "../../components/BrandLogo";
import heroImage from "../../assets/images/demo.jpg";
import ImageModal from "../../components/ImageModal";
import AuthContext from "../../context/AuthContext";

export default function Signup() {
  const navigate = useNavigate();
  const { createUser, updateUser, googleSignIn, user } =
    useContext(AuthContext) || {};

  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      setPreviewUrl("");
      return;
    }
    setImageFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;

    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    if (!createUser) {
      Swal.fire({ icon: "error", title: "Auth not ready" });
      return;
    }

    try {
      setSubmitting(true);
      await createUser(email, password);
      if (updateUser) {
        await updateUser({
          displayName: name,
          photoURL: "",
        });
      }

      Swal.fire({
        icon: "success",
        title: "Account created",
        timer: 1400,
        showConfirmButton: false,
      });
      navigate("/", { replace: true });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Signup failed",
        text: error?.message || "Please try again.",
      });
    } finally {
      setSubmitting(false);
      form.reset();
      setPasswordValue("");
      setPreviewUrl("");
      setImageFile(null);
    }
  };

  console.log(user);
  const handleGoogleSignIn = async () => {
    if (!googleSignIn) {
      Swal.fire({ icon: "error", title: "Google sign-in not ready" });
      return;
    }

    try {
      setSubmitting(true);
      await googleSignIn();
      Swal.fire({
        icon: "success",
        title: "Welcome!",
        timer: 1200,
        showConfirmButton: false,
      });
      navigate("/", { replace: true });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Google sign-in failed",
        text: error?.message || "Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const passwordStrength = useMemo(() => {
    const password = passwordValue ?? "";
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    if (!password) return { label: "", color: "text-gray-500" };
    if (score <= 1) return { label: "Weak", color: "text-red-600" };
    if (score === 2) return { label: "Okay", color: "text-yellow-600" };
    if (score === 3) return { label: "Good", color: "text-emerald-600" };
    return { label: "Strong", color: "text-emerald-700" };
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
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm">
                <MapPin className="h-4 w-4" />
                <span className="font-medium">Bangladesh</span>
                <span aria-hidden="true">BD</span>
              </div>
            </div>

            {/* Header */}
            <div className="mt-10 flex flex-col items-center text-center">
              <BrandLogo variant="auth" />
              <h1 className="mt-4 text-2xl font-semibold tracking-tight">
                Join Explore
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                This is the start of something good.
              </p>

              <div className="mt-5 inline-flex rounded-full bg-gray-100 p-1">
                <button
                  type="button"
                  aria-current="page"
                  className={`rounded-full px-5 py-2 text-sm font-medium transition ${"bg-black text-white shadow"}`}
                >
                  Register
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className={`rounded-full px-5 py-2 text-sm font-medium transition ${"text-gray-700 hover:text-black"}`}
                >
                  Login
                </button>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <button
                  type="button"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm hover:bg-gray-50"
                  aria-label="Continue with Google"
                  onClick={handleGoogleSignIn}
                  disabled={submitting}
                >
                  <span className="text-base font-semibold">
                    <FcGoogle />
                  </span>
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
                  Username
                </label>
                <input
                  name="name"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none shadow-sm focus:border-gray-400"
                  type="text"
                  placeholder="Robert Fox"
                  autoComplete="username"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-gray-700">
                  Upload your image
                </label>
                <div className="flex items-center gap-3">
                  <input
                    name="image"
                    type="file"
                    accept="image/*"
                    className="file-input file-input-bordered w-full rounded-xl"
                    onChange={handleImageChange}
                  />

                  {previewUrl ? (
                    <button
                      type="button"
                      onClick={() => setOpenModal(true)}
                      className="group h-10 w-12 overflow-hidden rounded-full border border-gray-800 bg-gray-50"
                    >
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
                      />
                    </button>
                  ) : null}
                </div>

                <p className="mt-1 text-xs text-gray-500">JPG, PNG accepted</p>
              </div>

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
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 pr-24 text-sm outline-none shadow-sm focus:border-gray-400"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    minLength={6}
                    required
                  />

                  <div className="absolute inset-y-0 right-3 flex items-center gap-2">
                    {passwordStrength.label ? (
                      <span
                        className={`text-xs font-medium ${passwordStrength.color}`}
                      >
                        {passwordStrength.label}
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
              </div>

              <button
                type="submit"
                className="mt-2 w-full rounded-2xl bg-black px-4 py-4 text-sm font-semibold text-white shadow hover:bg-gray-900"
                disabled={submitting}
              >
                {submitting ? "Creating account…" : "Start your adventure"}
              </button>

              <p className="text-center text-xs text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="font-medium text-black underline">
                  Login
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


          {/* Floating gallery card */}
          <div className="absolute left-6 top-20 w-60 rounded-3xl bg-black/35 p-3 text-white shadow backdrop-blur">
            <div className="flex gap-3">
              <div className="h-20 w-20 overflow-hidden rounded-2xl bg-white/10">
                <img
                  src={heroImage}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="grid flex-1 grid-cols-2 gap-2">
                <div className="h-9 overflow-hidden rounded-xl bg-white/10" />
                <div className="h-9 overflow-hidden rounded-xl bg-white/10" />
                <div className="h-9 overflow-hidden rounded-xl bg-white/10" />
                <div className="h-9 overflow-hidden rounded-xl bg-white/10" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs text-white/90">
              <MapPin className="h-3.5 w-3.5" />
              <span>Vintage Bulli from 1975</span>
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
              Discover the best RV, camper van or travel trailer rental for your
              next vacation.
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

      <ImageModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        data={{
          src: previewUrl,
          title: "Profile Image",
          description: imageFile
            ? `${imageFile.name} • ${(imageFile.size / 1024).toFixed(1)} KB`
            : "",
        }}
      />
    </div>
  );
}
