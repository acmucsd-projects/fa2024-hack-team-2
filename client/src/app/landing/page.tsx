"use client";

import NavBar from "./navbar";
import MainSection from "./main.section";
import FeaturesSection from "./features.section";
import AboutUs from "./aboutUs.section";
import Footer from "./footer.section";

const LandingPage = () => {
  return (
    <div>
      {/* Navigation Bar */}
      <NavBar />

      {/* Content Sections */}
      <div className="relative mt-96 lg:mt-[98rem]"> {/* Push the main section down */}
        <MainSection />
        <FeaturesSection />
        <AboutUs />
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
