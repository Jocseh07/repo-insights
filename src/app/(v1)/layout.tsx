import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import Rates from "@/components/Rates";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-dvh flex-col">
      <NavBar />
      <Rates />
      <div className="container mx-auto p-2">{children}</div>
      <Footer />
    </div>
  );
};

export default HomeLayout;
