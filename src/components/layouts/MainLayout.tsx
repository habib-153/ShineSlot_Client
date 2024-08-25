import Header from "../ui/Home/Header";
import Footer from "../ui/Home/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="max-w-[1200px] mx-auto">
          <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
