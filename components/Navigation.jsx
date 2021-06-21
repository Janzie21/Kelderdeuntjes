import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const Navigation = () => {
  const [navbar, setNavbar] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 90) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", changeBackground);
  }

  return (
    <div id="navbar" className={navbar ? "navbar top active" : "navbar top"}>
      <div className="logo">
        <Image
          src="/afbeeldingen/output-onlinepngtools.png"
          alt="navbar-logo"
          width="120"
          height="90"
          quality="100"
        />
      </div>
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/Artists/">
              <a>Artists</a>
            </Link>
          </li>

          <li>
            <Link href="/Events">
              <a>Events</a>
            </Link>
          </li>
          <li>
            <Link href="/Gallery">
              <a>Gallery</a>
            </Link>
          </li>
          <li>
            <Link href="/Podcasts">
              <a>Podcasts</a>
            </Link>
          </li>
          <li>
            <Link href="/Booking">
              <a>Booking</a>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
