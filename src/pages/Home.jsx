import React from "react";
import Hero from "../components/Hero";
import FeaturedGroups from "../components/FeaturedGroups";
import WhyJoinGroup from "../components/WhyJoinGroup";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";

const Home = () => {
  return (
    <>
      <Hero />
      <FeaturedGroups />
      <WhyJoinGroup />
      <Testimonials />
      <Newsletter />
    </>
  );
};

export default Home;
