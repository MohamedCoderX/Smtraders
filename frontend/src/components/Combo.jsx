import React from "react";
import "./Combo.css"; // external css
import img1 from "../../public/images/combo/SM-1.jpg";
import img2 from "../../public/images/combo/SM-2.jpg";
import img3 from "../../public/images/combo/SM-3.jpg";
import img4 from "../../public/images/combo/SM-4.jpg";
const Combo = () => {
  const combos = [
    {
      id: 1,
      img: img1,
    },
    {
      id: 2,
      img: img2,
    },
    {
      id: 3,
      img: img3,
    },
    {
      id: 4,
      img: img4,
    },
  ];

  return (
    <div className="combo-container">
      <h2 className="combo-heading">Our Combo Packs</h2>
      <div className="combo-gallery">
        {combos.map((combo) => (
          <div key={combo.id} className="combo-item">
            <img src={combo.img} alt={combo.title} className="combo-img" />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Combo;
