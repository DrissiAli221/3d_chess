import Header from "@/components/Header";
import "./fonts.css";
import "./globals.css";
import ViewCanvas from "@/components/ViewCanvas";
import LenisProvider from "@/utils/LenisProvider";
import localFont from "next/font/local";

// Array font configuration
const arrayFont = localFont({
  src: "../../public/fonts/array/Array-Regular.woff",
  weight: "100 900",
  variable: "--font-array",
  display: "swap",
});

export const metadata = {
  title: "3D Commercial",
  description: "Your 3D commercial application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${arrayFont.variable} antialiased overflow-x-hidden min-h-screen`}
      >
        <LenisProvider>
          <Header />
          <main>
            {children}
            <ViewCanvas />
          </main>
        </LenisProvider>
      </body>
    </html>
  );
}
