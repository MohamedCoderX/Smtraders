import React from 'react'
import './Footer.css'
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate();
  return (
    <div>
    <div className="footer-full">
 <div className="logoss">
         <div className='logosimg'>
         <img src="../images/logo.png" alt="SM Crackers logo" loading='lazy'/>
         </div>
            <ul className="menu">
            <li onClick={()=>navigate('')}>Home</li>
         | <li onClick={()=>navigate('/products')}>Products</li> |
          <li onClick={()=>navigate('/About')}>About-us</li> |
          <li onClick={()=>navigate('/contact')} > Contact-us</li>
          </ul>
            <h3>SM Crackers @2015</h3>
        </div>
        <div className="contact">
        <h2>Contact us</h2>
            <div className="contact_s1">
                <a href="#"><i class="fa fa-map-marker" aria-hidden="true"></i></a>
                <p>4/175/A Sattur to Sivakasi road
                    <br /> Veerapandiyapuram 
                    <br />
                    Near by toll gate Sattur - 626203</p>
            </div>
            <div className="contact_s1">
                <a href="#"><i class="fa fa-mobile" aria-hidden="true"></i></a>
                <p>+91 8903359989</p>
            </div>
            <div className="contact_s1">
                <a href="#"><i class="fa fa-envelope-o" aria-hidden="true"></i></a>
                <p>smpyropark.2019@gmail.com</p>
            </div>
        </div>
        <div className="abtcom">
            <h2>About the company</h2>
            <p>At SM Crackers, customer satisfaction and safety are our top priorities. Our user-friendly online store allows you to browse, choose, and order crackers with ease, all while ensuring secure payments and reliable delivery.
            </p>
               
        </div>
<hr />

    </div>
    <div className="copyright">
    &copy; Copyright 2024 SM Crackers,Sattur , Made with <span className='her' >&hearts;</span>
</div>
</div>
  )
}

export default Footer