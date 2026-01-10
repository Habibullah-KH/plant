import { Link } from "react-router";
import demo from "../assets/images/demo.jpg";

export default function Card({ title, subtitle, image, url, className = "" }) {
  return (
    <div
      className={`group overflow-hidden rounded-lg border bg-white shadow-sm transition hover:shadow-md ${className}`}
    >
      <Link to={url} className="block">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
          <img
            src={image || demo}
            alt={title || "Card image"}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.05]"
            loading="lazy"
          />
        </div>
      </Link>

      <div className="p-4">
        <Link to={url} className="block">
          <h3 className="text-base font-semibold text-gray-900">
            {title || "title"}
          </h3>
        </Link>

        <p className="mt-1 text-sm text-gray-600">{subtitle || "subtitle"}</p>

        <div className="mt-3">
          <Link to="/cart" className="btn btn-primary btn-sm">
            Buy Now
          </Link>
        </div>
      </div>
    </div>
  );
}
