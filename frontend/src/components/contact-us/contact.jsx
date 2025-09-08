import React from 'react'
import './contact.css'
import Footer from '../footer/Footer'
import MetaData from "../../Pages/Home/MetaData";
const Contact = () => {
  return (
    <div>
       <section>
       </section>
       <MetaData title={"Contact"} />
    <div className="contact-section">
        <div className="contact_head">
            <h1>Get in Touch</h1>
            <p>Send your query about products and other queries | Contact us</p>
        </div>
        <div className="contact_inputs">
            <div className="contact_1">
                <div>
                    <p>FIRST NAME</p>
                    <input type="text" name="" id="" placeholder="Please enter first Name"/>
                </div>
                <div>
                    <p>LAST NAME</p>
                    <input type="text" name="" id="" placeholder="Please enter last Name"/>
                </div>

                <div>
                    <p>EMAIl</p>
                    <input type="email" name="" id="" placeholder="Please enter Email"/>
                </div>
                <div>
                    <p>PHONE NUMBER</p>
                    <input type="text" name="" id="" placeholder="Please enter Phn No"/>
                </div>
            </div>
            <div >
                <p>WRITE YOUR QUERY</p>
                <textarea name="" id="" placeholder="Please enter Query"></textarea>
            </div>

        </div>
        <button>Submit</button>
    </div>
    <div className="map-container">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3936.3778127552728!2d77.9098025!3d9.3881994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b06cbf39a3eab71%3A0xd9fb1439ac0c587e!2ssm%20crackers!5e0!3m2!1sen!2sin!4v1757345080519!5m2!1sen!2sin"
        className="map-iframe"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="SM Crackers Location"
      ></iframe>
    </div>
    <Footer/>
    </div>
  )
}

export default Contact