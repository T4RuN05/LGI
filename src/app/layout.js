import "./globals.css";
import { Noto_Serif } from "next/font/google";
import TopHeader from "./components/layout/TopHeader";
import Navbar from "./components/layout/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import ToastProvider from "./providers/ToastProvider";

import Footer from "./components/layout/Footer";

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Lord Ganesha Impex",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={notoSerif.className}>
        <AuthProvider>
          <TopHeader />
          <Navbar />
          <ToastProvider />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
