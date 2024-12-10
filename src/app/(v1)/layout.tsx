import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import OctokitProvider from "@/app/(v1)/_components/OctokitProvider";
import Rates from "@/components/Rates";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <OctokitProvider>
      <div className="flex min-h-dvh flex-col space-y-2">
        <div className="flex min-h-dvh flex-col space-y-2">
          <NavBar />
          <Rates />
          <div className="box">{children}</div>
          <Footer />
        </div>
      </div>
    </OctokitProvider>
  );
};

export default HomeLayout;
