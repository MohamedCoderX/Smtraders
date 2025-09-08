import React from "react";
import "./About-us.css";

const About = () => {
  return (
    <div className="about">
      <h2>About-Us</h2>
      <div className="about-page">
        <div className="about-left">
          <img src="./images/about.JPEG" alt="img" loading="lazy" />
        </div>
        <div className="about-right">
          <p className="para">
            Welcome to SM Crackers, your one-stop destination for high-quality
            crackers that light up every celebration! We specialize in offering
            a wide range of fireworks, from dazzling sparklers to grand aerial
            shells, ensuring that your festivities shine brighter than ever.
            With years of experience in the fireworks industry, we take pride in
            providing only the safest and most spectacular crackers, sourced
            from trusted manufacturers. Whether you're celebrating Diwali, New
            Year's Eve, weddings, or any special occasion, our collection is
            curated to add excitement and joy to your moments. At SM Crackers,
            customer satisfaction and safety are our top priorities. Our
            user-friendly online store allows you to browse, choose, and order
            crackers with ease, all while ensuring secure payments and reliable
            delivery. Light up the sky and make every occasion memorable with SM
            Crackers!
          </p>
          <div className="icons">
            <div className="icon">
              <div className="ion_1">
                <i class="fa-solid fa-truck"></i>
                <p>Fast Delivery</p>
              </div>
              <div className="ion_1">
                <i class="fa-solid fa-tag"></i>
                <p>Genuine Price</p>
              </div>
            </div>
            <div className="icon">
              <div className="ion_1">
                <i class="fa-solid fa-star"></i>
                <p>Best Quality</p>
              </div>
              <div className="ion_1">
                <i class="fa-solid fa-headset"></i>
                <p>24/7 Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
