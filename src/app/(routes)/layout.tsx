import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "../../components/app-sidebar";
import TopBar from "@/components/TopBar";

const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SidebarProvider>
        {/* App Sidebar */}
        <AppSidebar />
        <main className="m-2 w-full">
          <TopBar />

          <div className="h-4"></div>
          {/* Main content */}
          <div className="h-[calc(100dvh-5.4rem)] w-full overflow-y-auto rounded-md border border-sidebar-border bg-sidebar p-4 shadow">
            {children}
          </div>
        </main>
      </SidebarProvider>
    </>
  );
};
export default SidebarLayout;
