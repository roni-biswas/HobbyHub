import React from "react";
import Hero from "../components/Hero";
import FeaturedGroups from "../components/FeaturedGroups";
import WhyJoinGroup from "../components/WhyJoinGroup";
import Testimonials from "../components/Testimonials";

const Home = () => {
  return (
    <>
      <Hero />
      <FeaturedGroups />
      <WhyJoinGroup />
      <Testimonials />
    </>
  );
};

export default Home;
