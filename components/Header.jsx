import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <header className="mainheader">
      <div className="content">
        <h1>Kelderdeuntjes</h1>
        <div className="logo">
          <Image
            src="/afbeeldingen/output-onlinepngtools.png"
            alt="logo"
            width="200"
            height="200"
          />
        </div>
        <Link href="/Booking">
          <a className="btn btn-outline-light">Hire us</a>
        </Link>
      </div>
    </header>
  );
};

export default Header;
