import React from "react";
import Footer from "../footer/Footer";

const About = () => {
  return (
    <div className="bg-gradient-to-b from-white via-indigo-50/40 to-white text-gray-800">
      {/* 🔹 Top Logo Section */}
      {/* <div className="flex justify-center py-8">
        <img
          src="../images/logo2.jpg"
          alt="SM Crackers Logo"
          className="h-20 w-auto object-contain"
        />
      </div> */}

      {/* 🔹 Header Section */}
      <section className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 px-6 py-10">
        {/* Left Image */}
        <div className="flex-1">
          <img
            src="../images/about.JPEG"
            alt="About SM Crackers"
            className="rounded-2xl shadow-md w-full object-cover h-80 md:h-[450px]"
          />
        </div>

        {/* Right Content */}
        <div className="flex-1 space-y-5">
          <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-700">
            SM Crackers
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold text-gray-700">
            About Us
          </h2>
          <p className="text-gray-600 leading-relaxed text-justify">
            Welcome to <span className="font-semibold">SM Crackers</span>, your
            one-stop destination for high-quality crackers that light up every
            celebration! We specialize in offering a wide range of fireworks —
            from dazzling sparklers to grand aerial shells — ensuring that your
            festivities shine brighter than ever.
          </p>
          <p className="text-gray-600 leading-relaxed text-justify">
            With years of experience in the fireworks industry, we take pride in
            providing only the safest and most spectacular crackers, sourced
            from trusted manufacturers. Whether you're celebrating Diwali, New
            Year’s Eve, weddings, or any special occasion, our collection is
            curated to add excitement and joy to your moments.
          </p>
          <p className="text-gray-600 leading-relaxed text-justify">
            At SM Crackers, customer satisfaction and safety are our top
            priorities. Our user-friendly online store allows you to browse,
            choose, and order crackers with ease — all while ensuring secure
            payments and reliable delivery. Light up the sky and make every
            occasion memorable with SM Crackers!
          </p>

          {/* Sub Images */}
          <div className="flex flex-wrap gap-4 justify-center md:justify-start mt-6">
            <img
              src="../images/wholesale.jpg"
              alt="Wholesale"
              className="h-40 w-52 rounded-xl shadow-sm hover:shadow-md transition-transform duration-300 hover:scale-105"
            />
            <img
              src="../images/retail.jpg"
              alt="Retail"
              className="h-40 w-52 rounded-xl shadow-sm hover:shadow-md transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>
      </section>

      {/* 🔹 Brands Section */}
      <section className="bg-white py-12 px-6">
        <h2 className="text-center text-2xl md:text-3xl font-bold text-gray-800 mb-8">
          Brands We Handle
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-8">
          <img
            src="../images/brand1.png"
            alt="Maruti Brand"
            className="h-20 md:h-24 object-contain hover:scale-105 transition-transform"
          />
          <img
            src="../images/brand2.png"
            alt="Moro Brand"
            className="h-20 md:h-24 object-contain hover:scale-105 transition-transform"
          />
        </div>
      </section>

      {/* 🔹 Vision & Mission Section */}
      <section className="max-w-5xl mx-auto text-center py-14 px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Our Vision & Mission
        </h2>
        <p className="text-gray-600 leading-relaxed">
          To maintain quality of crackers in every aspect by offering safe,
          unique, and environmentally-friendly sparklers.  
          Our mission is to be a first-class wholesale & retail company,
          producing safe and compliant crackers of the highest quality at the
          best prices — enabling you to spread joy and happiness.
        </p>
      </section>

      {/* 🔹 Footer */}
      <Footer />
    </div>
  );
};

export default About;
