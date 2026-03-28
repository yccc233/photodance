import "./globals.css";

export const metadata = {
  title: "PhotoDance",
  description: "我的照片墙",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
