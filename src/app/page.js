import { albums } from "@/config/albums";
import AlbumCard from "@/components/AlbumCard";
import { Playfair_Display, Lora } from "next/font/google";
import "./home.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-lora",
  display: "swap",
});

function StarsBackground() {
  const stars = [];
  for (let i = 0; i < 50; i++) {
    const style = {
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${3 + Math.random() * 4}s`,
    };
    stars.push(
      <div
        key={i}
        className={`home__star ${Math.random() > 0.8 ? "home__star--large" : ""}`}
        style={style}
      />
    );
  }

  return <div className="home__stars">{stars}</div>;
}

export default function Home() {
  return (
    <div className={`home ${playfair.variable} ${lora.variable}`}>
      <div className="home__bg-grain" />
      <StarsBackground />

      <div className="home__frame">
        <div className="home__meteor" />
        <div className="home__meteor" />
        <div className="home__meteor" />
        <div className="home__meteor" />
        <div className="home__meteor" />
        <div className="home__corner home__corner--tl" />
        <div className="home__corner home__corner--tr" />
        <div className="home__corner home__corner--bl" />
        <div className="home__corner home__corner--br" />
        <div className="home__corner-outer home__corner-outer--tl" />
        <div className="home__corner-outer home__corner-outer--tr" />
        <div className="home__corner-outer home__corner-outer--bl" />
        <div className="home__corner-outer home__corner-outer--br" />
      </div>

      <header className="home__header">
        <div className="home__badge">Gallery</div>
        <h1 className="home__title">
          <span className="home__title-photo">Photo</span>
          <span className="home__title-dance">Dance</span>
        </h1>
        <p className="home__subtitle">用镜头捕捉时光的流转</p>
      </header>

      <main className="home__gallery">
        <div className="home__gallery-header">
          <span className="home__gallery-label">映像</span>
          <span className="home__gallery-count">{albums.length} Collections</span>
        </div>
        <div className="home__grid">
          {albums.map((album, index) => (
            <AlbumCard key={album.slug} album={album} index={index} />
          ))}
        </div>
      </main>

      <footer className="home__footer">
        <p>每一张照片都是一个故事</p>
      </footer>
    </div>
  );
}
