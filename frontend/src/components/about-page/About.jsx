import React from 'react'
import './About.css'
import Footer from '../footer/Footer'

const About = () => {
  return (
    <div>
        
    <div className="about-head">
    <img src="../images/logo2.jpg" alt="logo img"/> 
    </div>
    <div className="about-header">
        <div className="header-image">
    <img src="../images/about.jpg" alt="shop img"/>
</div>
<div className="header-content-about">
    <h1>SM Crackers</h1>
    <h2>ABOUT US</h2>
    <p>Welcome to SM Crackers, your one-stop destination for high-quality
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
            Crackers!</p>

     <div className="header-contentimg">
     <img src="../images/wholesale.jpg" alt=" wholesale"/>
     <img src="../images/retail.jpg" alt="Retail"/>
    </div>
    </div>
    </div>
   
     <div className="brand">
     <h2 className='text-center'>Brands we handle</h2> 
     <div className="brand-image">
     <img src="../images/brand1.png" alt="Maruti"/>
     <img src="../images/brand2.png" alt="Moro"/>
    </div>
    </div>
    
      <div className="footeras mt-5">
     <h2 className='text-center'>Our Vision and Mission</h2>
     <p>To maintain quality of crackers in every aspect by offering sale,unique  and environmental-friendly Sparklers
     To be the first className wholesome & retail company,producing safe and compliant crackers with HIGHEST QUALITY at low price enabling you to spread joy and happiness </p>
    </div>
    <Footer/>

    </div>
  )
}

export default About