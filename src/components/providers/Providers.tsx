"use client";
import dynamic from "next/dynamic";
import { dark } from "@clerk/themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const ThemeProvider = dynamic(
  () => import("./theme-provider").then((mod) => mod.ThemeProvider),
  {
    ssr: false,
  },
);
import { ClerkProvider } from "@clerk/nextjs";
import OctokitProvider from "./OctokitProvider";

export const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <ClerkProvider
          appearance={{ baseTheme: dark }}
          afterSignOutUrl="/sign-out"
        >
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />

            <OctokitProvider>{children}</OctokitProvider>
          </QueryClientProvider>
        </ClerkProvider>
      </ThemeProvider>
    </>
  );
}
