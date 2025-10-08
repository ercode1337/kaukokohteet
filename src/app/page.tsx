"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import DatePicker from "../components/DatePicker";

export default function Home() {
  const [from, setFrom] = useState("");
  const [depart, setDepart] = useState("");
  const [ret, setRet] = useState("");
  const [showDestinations, setShowDestinations] = useState(false);
  
  const destinations = {
    "AASIA": [
      "Thaimaa",
      "Vietnam",
      "Indonesia (Bali)",
      "Sri Lanka",
      "Japani",
      "Etelä-Korea",
      "Kiina",
      "Hongkong",
      "Intia",
      "Malesia",
      "Singapore",
      "Filippiinit"
    ],
    "AFRIKKA": [
      "Tansania (Zanzibar)",
      "Kenia",
      "Etelä-Afrikka",
      "Marokko",
      "Egypti",
      "Kap Verde",
      "Mauritius",
      "Seychellit"
    ],
    "OSEANIA": [
      "Australia",
      "Uusi-Seelanti",
      "Fidži"
    ],
    "POHJOIS- JA ETELÄ-AMERIKKA": [
      "Yhdysvallat (Florida, Havaiji)",
      "Meksiko",
      "Kuuba",
      "Dominikaaninen tasavalta",
      "Costa Rica",
      "Brasilia",
      "Peru",
      "Chile"
    ],
    "LÄHI-ITÄ": [
      "Arabiemiraatit (Dubai, Abu Dhabi)",
      "Oman",
      "Qatar",
      "Jordania"
    ]
  };

  // Initialize with all destinations selected
  const allDestinations = Object.values(destinations).flat();
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>(allDestinations);
  const [to, setTo] = useState("Kaikki kohteet");
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  const topPills = ["Lennot", "Hotellit", "Autonvuokraus"];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDestinations(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDestinationSelect = (destination: string) => {
    const allDestinations = Object.values(destinations).flat();
    const isSelected = selectedDestinations.includes(destination);
    let newSelectedDestinations;
    
    if (isSelected) {
      newSelectedDestinations = selectedDestinations.filter(d => d !== destination);
    } else {
      newSelectedDestinations = [...selectedDestinations, destination];
    }
    
    setSelectedDestinations(newSelectedDestinations);
    
    // Show "Kaikki kohteet" if all destinations are selected, otherwise show the list
    if (newSelectedDestinations.length === allDestinations.length) {
      setTo("Kaikki kohteet");
    } else if (newSelectedDestinations.length === 0) {
      setTo("");
    } else {
      setTo(newSelectedDestinations.join(", "));
    }
  };

  const handleSelectAllDestinations = () => {
    const allDestinations = Object.values(destinations).flat();
    const isAllSelected = allDestinations.every(dest => selectedDestinations.includes(dest));
    
    if (isAllSelected) {
      setSelectedDestinations([]);
      setTo("");
    } else {
      setSelectedDestinations(allDestinations);
      setTo("Kaikki kohteet");
    }
  };

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

          <h1 className="hero-h">Miljoonia halpoja matkoja. Yksi yksinkertainen haku.</h1>

          <div className="search-card-wrapper">
            <form className="search-card" onSubmit={(e)=>{e.preventDefault(); alert(`Haku: ${from} -> ${to}`);}}>
              <div className="search-fields">
                <div className="input">
                  <label>Lähtöpaikka</label>
                  <input className="search-input" type="text" value={from} onChange={(e)=>setFrom(e.target.value)} placeholder="Helsinki (HEL)" />
                </div>

                <div className="input destination-input">
                  <label>Kohteeseen</label>
                  <div className="destination-wrapper" ref={dropdownRef}>
                    <input 
                      className="search-input" 
                      type="text" 
                      value={to} 
                      placeholder="Valitse kohde"
                      onFocus={() => setShowDestinations(true)}
                      onClick={() => setShowDestinations(true)}
                      readOnly
                    />
                    <button 
                      type="button" 
                      className="dropdown-btn"
                      onClick={() => setShowDestinations(!showDestinations)}
                    >
                      ▼
                    </button>
                    {showDestinations && (
                      <div className="destinations-dropdown">
                        <div className="select-all-option">
                          <input
                            type="checkbox"
                            checked={Object.values(destinations).flat().every(dest => selectedDestinations.includes(dest))}
                            onChange={handleSelectAllDestinations}
                          />
                          <span>Kaikki kohteet</span>
                        </div>
                        {Object.entries(destinations).map(([category, places]) => (
                          <div key={category} className="destination-category">
                            <div className="category-header">{category}</div>
                            {places.map((place) => (
                              <div 
                                key={place}
                                className="destination-option"
                                onClick={() => handleDestinationSelect(place)}
                              >
                                <input
                                  type="checkbox"
                                  checked={selectedDestinations.includes(place)}
                                  onChange={() => handleDestinationSelect(place)}
                                  onClick={(e) => e.stopPropagation()}
                                />
                                <span>{place}</span>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="input small">
                  <DatePicker
                    value={depart}
                    onChange={setDepart}
                    label="Lähtö"
                    placeholder="pp/kk/vvvv"
                  />
                </div>

                <div className="input small">
                  <DatePicker
                    value={ret}
                    onChange={setRet}
                    label="Paluu"
                    placeholder="pp/kk/vvvv"
                  />
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
            <Image src="/thailand-banner.jpg" alt="banner" width={920} height={340} />
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container">
          <div>© {new Date().getFullYear()} Kaukomatkat.fi</div>
          <div className="links">
            <a>Meistä</a>
            <a>Tietosuojaseloste</a>
            <a>Asiakastuki</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
