import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TheraGrowth AI",
  description: "AI growth assistant for therapists and private practices",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}

        <script
          src="//code.tidio.co/7fqkkcirnsv6d9lpc9dh8qiyfwpuu8f5.js"
          async
        ></script>
      </body>
    </html>
  );
}