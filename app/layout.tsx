import { Montserrat } from "@next/font/google";
import "../styles/global.css";
const montserrat = Montserrat({ subsets: ["latin"], display: "swap" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={montserrat.className}>
      <body>{children}</body>
    </html>
  );
}
export const metadata = {
  title: "Cocktails",
};
