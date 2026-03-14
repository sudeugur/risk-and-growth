import "./globals.css";

export const metadata = {
  title: "Risk&Growth – DeFi Risk Analytics Platform",
  description:
    "Advanced blockchain risk analytics platform that monitors, evaluates, and scores DeFi protocols in real-time. Protect your digital assets with institutional-grade risk intelligence.",
  keywords: "DeFi, blockchain, risk, analytics, crypto, smart contract, security, audit",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
