import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import Header from "@/components/header";
import { dark } from "@clerk/themes";
import { ThemeProvider } from "@/components/theme-provider";
import Link from "next/link";
import { Stethoscope, Mail, Phone, MapPin } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Doctors Appointment App",
  description: "Connect with doctors anytime, anywhere",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/logo.png" sizes="any" />
        </head>
        <body className={`${inter.className}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className="min-h-screen">{children}</main>
            <Toaster richColors />

            <footer className="bg-muted/50 border-t border-emerald-900/20 py-12">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                  {/* Brand Section */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Stethoscope className="h-6 w-6 text-emerald-400" />
                      <span className="text-xl font-bold text-white">MediMeet</span>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Connect with doctors anytime, anywhere. Your health, our priority.
                    </p>
                  </div>

                  {/* Quick Links */}
                  <div>
                    <h3 className="font-semibold text-white mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                      <li>
                        <Link href="/doctors" className="text-muted-foreground hover:text-emerald-400 transition-colors text-sm">
                          Find Doctors
                        </Link>
                      </li>
                      <li>
                        <Link href="/onboarding" className="text-muted-foreground hover:text-emerald-400 transition-colors text-sm">
                          Get Started
                        </Link>
                      </li>
                      <li>
                        <Link href="#pricing" className="text-muted-foreground hover:text-emerald-400 transition-colors text-sm">
                          Pricing
                        </Link>
                      </li>
                      <li>
                        <Link href="/about" className="text-muted-foreground hover:text-emerald-400 transition-colors text-sm">
                          About Us
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Support */}
                  <div>
                    <h3 className="font-semibold text-white mb-4">Support</h3>
                    <ul className="space-y-2">
                      <li>
                        <Link href="/help" className="text-muted-foreground hover:text-emerald-400 transition-colors text-sm">
                          Help Center
                        </Link>
                      </li>
                      <li>
                        <Link href="/contact" className="text-muted-foreground hover:text-emerald-400 transition-colors text-sm">
                          Contact Us
                        </Link>
                      </li>
                      <li>
                        <Link href="/privacy" className="text-muted-foreground hover:text-emerald-400 transition-colors text-sm">
                          Privacy Policy
                        </Link>
                      </li>
                      <li>
                        <Link href="/terms" className="text-muted-foreground hover:text-emerald-400 transition-colors text-sm">
                          Terms of Service
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Contact Info */}
                  <div>
                    <h3 className="font-semibold text-white mb-4">Contact</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start space-x-2 text-sm">
                        <Mail className="h-4 w-4 text-emerald-400 mt-0.5" />
                        <span className="text-muted-foreground">support@medimeet.com</span>
                      </li>
                      <li className="flex items-start space-x-2 text-sm">
                        <Phone className="h-4 w-4 text-emerald-400 mt-0.5" />
                        <span className="text-muted-foreground">+1 (555) 123-4567</span>
                      </li>
                      <li className="flex items-start space-x-2 text-sm">
                        <MapPin className="h-4 w-4 text-emerald-400 mt-0.5" />
                        <span className="text-muted-foreground">123 Health St, Medical City</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-emerald-900/20 pt-8 flex flex-col md:flex-row justify-between items-center">
                  <p className="text-muted-foreground text-sm">
                    © {new Date().getFullYear()} MediMeet. All rights reserved.
                  </p>
                  <div className="flex space-x-6 mt-4 md:mt-0">
                    <Link href="/privacy" className="text-muted-foreground hover:text-emerald-400 transition-colors text-sm">
                      Privacy
                    </Link>
                    <Link href="/terms" className="text-muted-foreground hover:text-emerald-400 transition-colors text-sm">
                      Terms
                    </Link>
                    <Link href="/cookies" className="text-muted-foreground hover:text-emerald-400 transition-colors text-sm">
                      Cookies
                    </Link>
                  </div>
                </div>
              </div>
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}