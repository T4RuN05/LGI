import "./globals.css";
import { Noto_Serif } from "next/font/google";
import TopHeader from "./components/layout/TopHeader";
import Navbar from "./components/layout/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import ToastProvider from "./providers/ToastProvider";
import { Analytics } from "@vercel/analytics/react";
import RouteProgressBar from "./components/ui/RouteProgressBar";
import Footer from "./components/layout/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { LocaleProvider } from "@/context/LocaleContext";
import SiteLoader from "./components/ui/SiteLoader";
import ImagePrefetcher from "./components/ui/ImagePrefetcher";

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Lord Ganesha Impex | Premium Jewelry Manufacturer & Global Supplier",
  description:
    "Lord Ganesha Impex is a global supplier of premium gold-finished jewelry including bangles, bridal collections, rosaries, chains, and earrings crafted with over three decades of expertise.",
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={notoSerif.className}>
        <SiteLoader />
        <ImagePrefetcher
          images={[
            "https://res.cloudinary.com/dc2qtmg05/image/upload/f_auto,q_auto/v1774034517/Untitled_design_68_qcdbxc.png",
            "https://res.cloudinary.com/dc2qtmg05/image/upload/f_auto,q_auto/v1774091919/Untitled_design_69_ohrfwq.png",
            "https://res.cloudinary.com/dc2qtmg05/image/upload/f_auto,q_auto/v1774032792/Untitled_design_67_x9pivj.png",
            "https://res.cloudinary.com/dc2qtmg05/image/upload/f_auto,q_auto/v1774032682/Untitled_design_66_kb0txv.png",
            "https://res.cloudinary.com/dc2qtmg05/image/upload/f_auto,q_auto/v1773407909/Untitled_design_53_bml2dh.png",
            "https://res.cloudinary.com/dc2qtmg05/image/upload/f_auto,q_auto/v1773426537/Untitled_design_57_fotae0.png",
            "https://res.cloudinary.com/dc2qtmg05/image/upload/f_auto,q_auto/v1773405883/Gemini_Generated_Image_ogsa6zogsa6zogsa_aygxqf.png",
            "https://res.cloudinary.com/dc2qtmg05/image/upload/f_auto,q_auto/v1773427062/Untitled_design_60_hd7nnq.png",
            "https://res.cloudinary.com/dc2qtmg05/image/upload/f_auto,q_auto/v1773405876/Untitled_design_35_extrm8.png",
          ]}
        />

        <LocaleProvider>
          <AuthProvider>
            <TopHeader />
            <Navbar />
            <RouteProgressBar />
            <ToastProvider />
            <SpeedInsights />
            <Analytics />
            {children}
            <Footer />
          </AuthProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
