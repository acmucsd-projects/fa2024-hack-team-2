"use client";

import NavBar from "./navbar";
import MainSection from "./main.section";
import FeaturesSection from "./features.section";
import AboutUs from "./aboutUs.section";
import Footer from "./footer.section";

const LandingPage = () => {
  return (
    <div className="flex h-screen w-screen flex-col justify-center items-center">
      {/* Navigation Bar */}
      <NavBar />

      {/* Content Sections */}
      <div className="overflow-y-scroll w-full h-[90%]"> {/* Push the main section down */}
        <MainSection />
        <FeaturesSection />
        <AboutUs />
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
