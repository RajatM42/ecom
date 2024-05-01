import { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Bannerr = () => {
  useEffect(() => {
    const intervalId = setInterval(() => {
      document.querySelector(".carousel-control-next").click(); // Simulate click on next button
    }, 1000); // Change slide every 3 seconds

    // Cleanup function to clear interval when component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 2500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false, // Disable pause on hover
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        <div>
          <img
            src="https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1714281371/Croma%20Assets/CMS/LP%20Page%20Banners/2024/Sanity/HP/April/28042024/HP_Rotating_Acc_28April24_y993ot.jpg"
            alt="First slide"
            className="block w-full h-auto"
          />
        </div>
        <div>
          <img
            src="https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1714281372/Croma%20Assets/CMS/LP%20Page%20Banners/2024/Sanity/HP/April/28042024/HP_Rotating_redmi_28April24_iqwtgg.jpg"
            alt="Second slide"
            className="block w-full h-auto"
          />
        </div>
        <div>
          <img
            src="https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1714281373/Croma%20Assets/CMS/LP%20Page%20Banners/2024/Sanity/HP/April/28042024/HP_Rotating_TWS_28April24_gfr1oc.jpg"
            alt="Third slide"
            className="block w-full h-auto"
          />
        </div>
      </Slider>
    </div>
  );
};

export default Bannerr;
