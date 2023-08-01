import { Montserrat } from "@next/font/google";
import "../styles/global.css";
import Header from "@/components/Header";
const montserrat = Montserrat({ subsets: ["latin"], display: "swap" });
import { Toaster } from "react-hot-toast";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={montserrat.className}>
      <body>
        <Toaster />

        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
export const metadata = {
  title: "Cocktails",
};
