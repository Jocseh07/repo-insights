import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import Rates from "@/components/Rates";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-dvh flex-col space-y-2">
      <NavBar />
      <Rates />
      <div className="box">{children}</div>
      <Footer />
    </div>
  );
};

export default HomeLayout;
