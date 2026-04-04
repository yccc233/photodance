import { albums } from "@/config/albums";
import { getAlbumsWithCoverThumbs } from "@/lib/photos";
import AlbumCard from "@/components/AlbumCard";
import ScrollReveal from "@/components/ScrollReveal";
import Countdown from "@/components/Countdown";
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

export default async function Home() {
  const albumsWithThumbs = await getAlbumsWithCoverThumbs(albums);

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
        <div className="home__meteor" />
        <div className="home__meteor" />
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
        <ScrollReveal className="home__gallery-header">
          <span className="home__gallery-label">映像</span>
          <span className="home__gallery-count">{albumsWithThumbs.length} Collections</span>
        </ScrollReveal>
        <div className="home__timeline">
          <div className="home__timeline-line" />
          {albumsWithThumbs.map((album, index) => (
            <div key={album.slug} className="home__timeline-item">
              <div className="home__timeline-node">
                <div className="home__timeline-dot" />
                <span className="home__timeline-date">{album.date}</span>
              </div>
              <ScrollReveal delay={index * 150}>
                <AlbumCard album={album} index={index} />
              </ScrollReveal>
            </div>
          ))}
          <div className="home__timeline-item home__timeline-future">
            <div className="home__timeline-node">
              <div className="home__timeline-dot home__timeline-dot--future" />
              <span className="home__timeline-date home__timeline-date--future">????.??</span>
            </div>
            <ScrollReveal delay={albumsWithThumbs.length * 150}>
              <div className="album-card album-card--future">
                <div className="album-card__future-content">
                  <div className="album-card__header">
                    <span className="album-card__index">Next</span>
                    <h2 className="album-card__title">未完待续</h2>
                    <p className="album-card__desc">更多故事，正在路上...</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </main>

      <footer className="home__footer">
        <p>每一张照片都是一个故事</p>
        <p className="home__credit">俞澄❤张昕</p>
        <div className="home__countdown">
          <Countdown />
        </div>
      </footer>
    </div>
  );
}
