import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Link } from "react-router";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import bannerOne from "../assets/banner-1.jpg";
import bannerTwo from "../assets/banner-2.jpg";
import bannerThree from "../assets/banner-3.jpg";

const slides = [
  {
    image: bannerOne,
    title: "Members are active in a wide variety of outdoor activities",
    description:
      "From casual hiking to mountaineering and everything in between. From beginner to expert, all levels of experience are welcome.",
  },
  {
    image: bannerTwo,
    title: "Explore hidden trails and stunning landscapes",
    description:
      "Join guided adventures or blaze your own path. Adventure is waiting for everyone with a curious spirit.",
  },
  {
    image: bannerThree,
    title: "Build lasting memories with outdoor communities",
    description:
      "Share the journey with people who love nature, challenge themselves, and grow together outdoors.",
  },
];

const Hero = () => {
  return (
    <div className="w-full">
      <Swiper
        pagination={{ dynamicBullets: true }}
        navigation={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        modules={[Pagination, Autoplay, Navigation]}
        className="mySwiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="w-full relative">
            <img
              src={slide.image}
              className="w-full h-[70vh] object-cover"
              alt={`Slide ${index + 1}`}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/70 z-10" />

            {/* Animated Content */}
            <div className="absolute flex items-center h-[70vh] left-0 top-0 w-full p-10 z-20 max-w-screen-7xl mx-auto px-4 md:px-12 lg:px-16 xl:px-24">
              <motion.div
                key={slide.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
                className="text-white max-w-xl"
              >
                <h2 className="text-3xl md:text-5xl font-bold mb-2 text-accent">
                  {slide.title}
                </h2>
                <p className="mb-4 text-sm md:text-base text-gray-100">
                  {slide.description}
                </p>
                <Link
                  to="/all-groups"
                  className="btn btn-secondary text-black btn-sm md:btn-md"
                >
                  Explore Now
                </Link>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;
