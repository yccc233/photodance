"use client";

import Link from "next/link";
import "./AlbumCard.css";

export default function AlbumCard({ album, index = 0 }) {
  return (
    <Link href={`/albums/${album.slug}`} className="album-card-link">
      <article
        className="album-card"
        style={{ "--delay": `${index * 0.1}s` }}
      >
        <div className="album-card__media">
          <img
            src={album.cover}
            alt={album.title}
            className="album-card__image"
          />
          <div className="album-card__overlay">
            <span className="album-card__index">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h2 className="album-card__title">{album.title}</h2>
            <p className="album-card__desc">{album.description}</p>
            <div className="album-card__meta">
              <span className="album-card__layout">{album.layout}</span>
              <span className="album-card__arrow">→</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
