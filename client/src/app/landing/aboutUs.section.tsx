const AboutUs = () => {
  return (
    <section
      id="about"
      className="about-section min-h-screen flex flex-col items-center justify-center gap-9 bg-white p-8"
    >
      <h2 className="text-4xl font-bold text-blue-500">
        <span className="text-gray-800 font-bold">What is </span>
        <span className="text-blue-500 font-bold">Swipe Style</span>
        <span className="text-gray-800 font-bold">?</span>
      </h2>
      <p className="text-xl text-black-700 font-normal text-start w-[60%]">
        A website designed and created by a group of college students
        dedicated to providing users the fashion they enjoy with just a
        swipe of a finger. Users can explore different types of fashion 
        styles and use posts as inspirations for their own aesthetics.
        Swipe Style encourages its users to be true to themselves
        through the clothes they find interesting.
      </p>
    </section>
  );
};

export default AboutUs;
