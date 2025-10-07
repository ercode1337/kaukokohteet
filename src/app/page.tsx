"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [depart, setDepart] = useState("");
  const [ret, setRet] = useState("");

  const topPills = ["Lennot", "Hotellit", "Autonvuokraus"];

  return (
    <div className="landing-root">
      <header className="hero-dark">
        <div className="container header-inner">
          <div className="logo">
            <Image src="/travel/logo.png" alt="KaukoKohteet.fi" width={180} height={60} />
          </div>
          <div className="header-right">
            <div className="header-links">Ohjeet · ♥ · Kirjaudu sisään</div>
          </div>
        </div>

        <div className="container hero-content">
          <div className="pills">
            {topPills.map((p) => (
              <button className="pill" key={p}>{p}</button>
            ))}
          </div>

          <h1 className="hero-h">Miljoonia halpoja lentoja. Yksi yksinkertainen haku.</h1>

          <div className="search-card-wrapper">
            <form className="search-card" onSubmit={(e)=>{e.preventDefault(); alert(`Haku: ${from} -> ${to}`);}}>
              <div className="search-fields">
                <div className="input">
                  <label>Lähtöpaikka</label>
                  <input className="search-input" type="text" value={from} onChange={(e)=>setFrom(e.target.value)} placeholder="Helsinki (HEL)" />
                </div>

                <div className="input">
                  <label>Kohteeseen</label>
                  <input className="search-input" type="text" value={to} onChange={(e)=>setTo(e.target.value)} placeholder="Lontoo (LHR)" />
                </div>

                <div className="input small">
                  <label>Lähtö</label>
                  <input className="search-input" type="date" value={depart} onChange={(e)=>setDepart(e.target.value)} />
                </div>

                <div className="input small">
                  <label>Paluu</label>
                  <input className="search-input" type="date" value={ret} onChange={(e)=>setRet(e.target.value)} />
                </div>

                <button className="btn btn-search" type="submit">Hae</button>
              </div>
            </form>
          </div>

          <div className="subrow">
            <label><input type="checkbox" /> Lisää lähiseudun lentokentät</label>
            <label><input type="checkbox" /> Suorat lennot</label>
            <button className="btn btn-ghost">Kirjaudu sisään</button>
          </div>
        </div>
      </header>

      <section className="categories container">
        <div className="category-btn">Hotellit</div>
        <div className="category-btn">Autonvuokraus</div>
        <div className="category-btn">Tutki kaikkia kohteita</div>
      </section>

      <section className="destinations-section container">
        <div className="destinations-grid">
          <div className="destination-card">
            <div className="destination-image thailand1"></div>
            <div className="destination-info">
              <h3>Shaa Shin Bai Resort</h3>
              <p className="destination-price">€899</p>
              <p className="destination-date">1 week in December</p>
            </div>
          </div>
          
          <div className="destination-card">
            <div className="destination-image thailand2"></div>
            <div className="destination-info">
              <h3>Tropical Paradise Hotel</h3>
              <p className="destination-price">€1,299</p>
              <p className="destination-date">10 days in January</p>
            </div>
          </div>
          
          <div className="destination-card">
            <div className="destination-image costarica"></div>
            <div className="destination-info">
              <h3>Costa Rica Beach Resort</h3>
              <p className="destination-price">€1,599</p>
              <p className="destination-date">2 weeks in February</p>
            </div>
          </div>
        </div>
      </section>

      <section className="banner container">
        <div className="banner-inner">
          <div className="banner-text">
            <p className="kicker">Etkö osaa päättää minne matkustaisit?</p>
            <h2>Tutki kaikkia kohteita</h2>
            <button className="btn btn-primary">Hae lentoja kaikkiin kohteisiin</button>
          </div>
          <div className="banner-media">
            <Image src="/sun2.svg" alt="banner" width={920} height={340} />
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container">
          <div>© {new Date().getFullYear()} KaukoMatkat</div>
          <div className="links">
            <a>About</a>
            <a>Privacy</a>
            <a>Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
