import { Outlet } from "react-router";

import Header from "./Header";
import Footer from "./Footer";
import AuthModal from "../auth/AuthModal";

const MainLayout = () => {
  return (
     <div className="min-h-screen bg-paper text-ink">
      <Header />

      <main className="mx-auto w-full max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>

      <Footer />
      <AuthModal/>
    </div>
  );
};

export default MainLayout;