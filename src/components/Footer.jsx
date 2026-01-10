import React from "react";
import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-8 w-8 rounded-full bg-green-600" />
              <span className="text-lg font-semibold text-gray-900">Plant</span>
            </div>
            <p className="mt-4 text-sm text-gray-600">
              Healthy plants for every space. Grow with us.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Shop</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link className="text-gray-600 hover:text-gray-900" to="/shop">
                  All Plants
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-600 hover:text-gray-900"
                  to="/categories/indoor"
                >
                  Indoor
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-600 hover:text-gray-900"
                  to="/categories/air-purifying"
                >
                  Air Purifying
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-600 hover:text-gray-900"
                  to="/categories/succulents"
                >
                  Succulents
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Company</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link className="text-gray-600 hover:text-gray-900" to="/about">
                  About
                </Link>
              </li>
              <li>
                <Link className="text-gray-600 hover:text-gray-900" to="/blog">
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-600 hover:text-gray-900"
                  to="/contact"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-600 hover:text-gray-900"
                  to="/privacy"
                >
                  Privacy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Newsletter</h3>
            <p className="mt-4 text-sm text-gray-600">
              Subscribe for tips and promos.
            </p>
            <form className="mt-4 flex gap-2">
              <input
                className="w-full rounded-md border px-3 py-2 text-sm"
                type="email"
                placeholder="you@example.com"
                aria-label="Email"
              />
              <button
                className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                type="submit"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="mt-12 border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Plant. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs">
            <Link className="text-gray-500 hover:text-gray-900" to="/terms">
              Terms
            </Link>
            <Link className="text-gray-500 hover:text-gray-900" to="/privacy">
              Privacy
            </Link>
            <Link className="text-gray-500 hover:text-gray-900" to="/contact">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
