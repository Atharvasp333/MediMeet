import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MediMeet - Doctors Appointment App",
  description: "Connect with Doctors anytime, anywhere",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{
      baseTheme: 'dark',
    }}>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >

            {/* {header} */}
            <Header>

            </Header>
            <main className="min-h-screen">
              {children}
            </main>
            <Toaster richColors />

            {/* {footer} */}
            <footer className="bg-muted/50 py-12">
              <div className="conatiner mx-auto px-4 text-center text-gray-200">
                <p>
                  I am the footer
                </p>
              </div>
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
