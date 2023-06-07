
import { Montserrat } from "@next/font/google";
import "../styles/global.css";
import Header from "@/components/Header";
const montserrat = Montserrat({ subsets: ["latin"], display: "swap" });
import Provider from "./Provider";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={montserrat.className}>
      <body>
        <Provider>
          {/* @ts-expect-error Async Server Component */}
          <Header />
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
}
export const metadata = {
  title: "Cocktails",
};
