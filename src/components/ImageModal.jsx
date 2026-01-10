import { useEffect } from "react";

export default function ImageModal({ open, data, onClose }) {
  // ESC চাপলে close
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open || !data) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl
                   animate-[fadeIn_.2s_ease-out]"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Image */}
          <div className="group relative overflow-hidden bg-black">
            <img
              src={data.src}
              alt={data.title ?? "Image"}
              className="h-[320px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 md:h-full"
            />
          </div>

          {/* Right: Details */}
          <div className="p-6 md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold">{data.title}</h3>
                {data.location ? (
                  <p className="mt-1 text-sm text-gray-600">{data.location}</p>
                ) : null}
              </div>

              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-gray-200 px-3 py-1 text-sm hover:bg-gray-50"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {data.description ? (
              <p className="mt-5 text-sm leading-relaxed text-gray-700">
                {data.description}
              </p>
            ) : null}

            {/* Optional actions */}
            <div className="mt-6 flex gap-2">
              {data.primaryAction ? (
                <button
                  type="button"
                  onClick={data.primaryAction.onClick}
                  className="rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-gray-900"
                >
                  {data.primaryAction.label}
                </button>
              ) : null}

              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* smooth animation keyframes */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(.98); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
