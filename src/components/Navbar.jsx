import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router";
import AuthContext from "../context/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const { user, logOut } = useContext(AuthContext) || {};

  console.log(user);

  useEffect(() => {
    function onDocClick(e) {
      if (!profileRef.current) return;
      if (!profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  return (
    <header className="border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <span className="inline-block h-8 w-8 rounded-full bg-green-600" />
              <span className="text-lg font-semibold ">Plant</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-3">
            <Link
              to="/"
              className="btn btn-ghost btn-sm !text-inherit hover:!text-white"
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="btn btn-ghost btn-sm !text-inherit hover:!text-white"
            >
              Shop
            </Link>
            <Link
              to="/about"
              className="btn btn-ghost btn-sm !text-inherit hover:!text-white"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="btn btn-ghost btn-sm !text-inherit hover:!text-white"
            >
              Contact
            </Link>

            {user ? (
              <div className="relative ml-2" ref={profileRef}>
                <button
                  type="button"
                  className="btn btn-ghost btn-circle btn-sm !text-inherit hover:!text-white"
                  aria-haspopup="menu"
                  aria-expanded={profileOpen}
                  onClick={() => setProfileOpen((v) => !v)}
                  title="Profile"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-700">
                    {String(user?.user || user?.name || "U")
                      .charAt(0)
                      .toUpperCase()}
                  </span>
                </button>

                {profileOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 mt-2 w-56 rounded-md border bg-white p-3 shadow-lg z-50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-700">
                        {String(user?.user || user?.name || "U")
                          .charAt(0)
                          .toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-gray-900">
                          {user?.name || user?.user || "User"}
                        </p>
                        {user?.email && (
                          <p className="truncate text-xs text-gray-500">
                            {user.email}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="mt-3 grid gap-2">
                      <Link
                        to="/profile"
                        onClick={() => setProfileOpen(false)}
                        className="btn btn-ghost btn-sm justify-start !text-inherit hover:!text-white"
                      >
                        Profile
                      </Link>
                      <Link
                        to="/settings"
                        onClick={() => setProfileOpen(false)}
                        className="btn btn-ghost btn-sm justify-start !text-inherit hover:!text-white"
                      >
                        Settings
                      </Link>
                      <NavLink
                        onClick={logOut}
                        className="btn btn-outline btn-sm justify-start hover:!text-white"
                      >
                        Logout
                      </NavLink>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/cart" className="btn btn-success btn-sm ml-2">
                Buy Now
              </Link>
            )}
          </nav>
          <button
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        {open && (
          <div className="md:hidden pb-4">
            <div className="grid gap-2">
              <Link
                to="/"
                onClick={() => setOpen(false)}
                className="btn btn-ghost btn-sm justify-start !text-inherit hover:!text-white"
              >
                Home
              </Link>
              <Link
                to="/shop"
                onClick={() => setOpen(false)}
                className="btn btn-ghost btn-sm justify-start !text-inherit hover:!text-white"
              >
                Shop
              </Link>
              <Link
                to="/about"
                onClick={() => setOpen(false)}
                className="btn btn-ghost btn-sm justify-start !text-inherit hover:!text-white"
              >
                About
              </Link>
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="btn btn-ghost btn-sm justify-start !text-inherit hover:!text-white"
              >
                Contact
              </Link>
              <Link
                to="/cart"
                onClick={() => setOpen(false)}
                className="btn btn-primary btn-sm justify-start"
              >
                Buy Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
