import React from 'react'
import { FaWhatsapp } from 'react-icons/fa';

const Whatsapp = () => {
  return (
    <div>
        {/* WhatsApp Button */}
        <a 
  href="https://wa.me/+918903359989" 
  target="_blank" 
  rel="noopener noreferrer"
  className="whatsapp-float">
  <FaWhatsapp className="whatsapp-icon" />
</a>


    </div>
  )
}

export default Whatsapp