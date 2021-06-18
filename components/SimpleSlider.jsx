import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/image";

export default function SimpleSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
  };
  return (
    <Slider className="slider" {...settings}>
      <div>
        <Image
          src="/afbeeldingen/kelderdeuntjes1.jpg"
          alt="1"
          width="1036"
          height="547"
          objectFit="fill"
        />
      </div>
      <div>
        <Image
          src="/afbeeldingen/kelderdeuntjes6.jpg"
          alt="2"
          width="1034"
          height="684"
          objectFit="fill"
        />
      </div>
      <div>
        <Image
          src="/afbeeldingen/kelderdeuntjes3.jpg"
          alt="3"
          width="1033"
          height="687"
          objectFit="fill"
        />
      </div>
      <div>
        <Image
          src="/afbeeldingen/kelderdeuntjes4.jpg"
          alt="4"
          width="1040"
          height="690"
          objectFit="fill"
        />
      </div>
      <div>
        <Image
          src="/afbeeldingen/kelderdeuntjes5.jpg"
          alt="5"
          width="1000"
          height="auto"
          objectFit="fill"
        />
      </div>
    </Slider>
  );
}
