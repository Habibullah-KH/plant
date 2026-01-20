import { Outlet } from "react-router";
import "./style.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
export default function MainLayout() {
  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-391px)]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
