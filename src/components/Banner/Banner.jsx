import React, { useState } from "react";
import Slider from "react-slick";
import {
  bannerImgOne,
  bannerImgTwo,
  bannerImgThree,
} from "../../assets/images/index.jsx";

const CustomSlide = ({ imgSrc }) => (
  <div className="flex justify-center items-center">
    <img src={imgSrc} alt="Slide" className="max-w-full h-96 object-cover" />
  </div>
);

export default function Banner() {
  const [dotActive, setDocActive] = useState(0);
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 7000,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    arrows: false,
    beforeChange: (next) => {
      setDocActive(next);
    },
    appendDots: (dots) => (
      <div className="absolute top-1/2 left-7 transform -translate-y-1/2">
        <ul className="m-0"> {dots} </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        className={`w-8 h-8 flex items-center justify-center cursor-pointer ${
          i === dotActive
            ? "text-black border-r-2 border-black"
            : "text-transparent border-r-2 border-white"
        }`}
      ></div>
    ),
    responsive: [
      {
        breakpoint: 576,
        settings: {
          dots: true,
          appendDots: (dots) => (
            <div className="absolute top-1/2 left-2 transform -translate-y-1/2">
              <ul className="m-0"> {dots} </ul>
            </div>
          ),
          customPaging: (i) => (
            <div
              className={`w-6 h-6 flex items-center justify-center cursor-pointer text-xs ${
                i === dotActive
                  ? "text-black border-r-2 border-black"
                  : "text-transparent border-r-2 border-white"
              }`}
            ></div>
          ),
        },
      },
    ],
  };

  const slides = [
    { imgSrc: bannerImgOne },
    { imgSrc: bannerImgTwo },
    { imgSrc: bannerImgThree },
  ];

  return (
    <div className="w-full bg-white">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <CustomSlide key={index} imgSrc={slide.imgSrc} />
        ))}
      </Slider>
    </div>
  );
}
