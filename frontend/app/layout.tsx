import "./globals.css";

export const metadata = {
  title: "TheraGrowth AI",
  description: "Client acquisition system for therapists",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}