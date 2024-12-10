import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-dvh flex-col">
      <NavBar />
      <div className="flex h-full w-full items-center justify-center">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default HomeLayout;
