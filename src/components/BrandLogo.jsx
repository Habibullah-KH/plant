import { Link } from "react-router";

export default function BrandLogo({ variant = "navbar" }) {
  const isAuth = variant === "auth";

  return (
    <Link to="/" className="inline-flex items-center gap-2">
      <span
        className={
          isAuth
            ? "inline-block h-14 w-14 rounded-2xl bg-green-600 shadow-sm"
            : "inline-block h-8 w-8 rounded-full bg-green-600"
        }
        aria-hidden="true"
      />
      <span
        className={
          isAuth
            ? "text-xl font-semibold tracking-tight text-gray-900"
            : "text-lg font-semibold text-gray-900"
        }
      >
        Plant
      </span>
    </Link>
  );
}
