import "./globals.css";
import HeartMagic from "@/components/HeartMagic";
import MusicPlayerWrapper from "@/components/MusicPlayerWrapper";

export const metadata = {
  title: "PhotoDance",
  description: "我的照片墙",
};

export default function RootLayout({ children, modal }) {
  return (
    <html lang="zh-CN">
      <body className="font-sans antialiased">
        {children}
        {modal}
        <HeartMagic />
        <MusicPlayerWrapper />
      </body>
    </html>
  );
}
