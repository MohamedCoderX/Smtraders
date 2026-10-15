import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { saveShippingInfo } from "../../slices/cartSlice";
import CheckoutSteps from "./CheckoutSteps";
import "./shipping.css";

export const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

export const UNION_TERRITORIES = [
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

export const TAMIL_NADU_DISTRICTS = [
  "Ariyalur",
  "Chengalpattu",
  "Chennai",
  "Coimbatore",
  "Cuddalore",
  "Dharmapuri",
  "Dindigul",
  "Erode",
  "Kallakurichi",
  "Kanchipuram",
  "Kanyakumari",
  "Karur",
  "Krishnagiri",
  "Madurai",
  "Mayiladuthurai",
  "Nagapattinam",
  "Namakkal",
  "Nilgiris",
  "Perambalur",
  "Pudukkottai",
  "Ramanathapuram",
  "Ranipet",
  "Salem",
  "Sivaganga",
  "Tenkasi",
  "Thanjavur",
  "Theni",
  "Thoothukudi",
  "Tiruchirappalli",
  "Tirunelveli",
  "Tirupathur",
  "Tiruppur",
  "Tiruvallur",
  "Tiruvannamalai",
  "Tiruvarur",
  "Vellore",
  "Viluppuram",
  "Virudhunagar",
];

export const validateShipping = (shippingInfo, navigate) => {
  if (
    !shippingInfo.address ||
    !shippingInfo.city ||
    !shippingInfo.state ||
    !shippingInfo.phoneNo ||
    !shippingInfo.postalCode
  ) {
    toast.error("Please fill the shipping information");
    navigate("/shipping");
  }
};

export default function Shipping() {
  const { shippingInfo = {} } = useSelector((state) => state.cartState);

  const [address, setAddress] = useState(shippingInfo.address || "");
  const [city, setCity] = useState(shippingInfo.city || "");
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo || "");
  const [postalCode, setPostalCode] = useState(shippingInfo.postalCode || "");
  const [state, setState] = useState(shippingInfo.state || "");
  const [name, setName] = useState(shippingInfo.name || "");

  const [isCustomCity, setIsCustomCity] = useState(() => {
    if (shippingInfo.state === "Tamil Nadu" && shippingInfo.city) {
      return !TAMIL_NADU_DISTRICTS.includes(shippingInfo.city);
    }
    return false;
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setState(selectedState);
    if (selectedState === "Tamil Nadu") {
      if (city && !TAMIL_NADU_DISTRICTS.includes(city)) {
        setIsCustomCity(true);
      } else {
        setIsCustomCity(false);
      }
    } else {
      setIsCustomCity(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!city || !city.trim()) {
      toast.error("Please provide a city or district");
      return;
    }
    dispatch(saveShippingInfo({ name, address, city: city.trim(), phoneNo, postalCode, state }));
    navigate("/order/confirm");
  };

  const isTamilNadu = state === "Tamil Nadu";

  return (
    <Fragment>
      <CheckoutSteps shipping />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form onSubmit={submitHandler} className="shadow-lg shippii">
            <h1 className="mb-4">Shipping Info</h1>
            <div className="form-group">
              <label htmlFor="name_field">Full Name</label>
              <input
                type="text"
                id="name_field"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone_field">Phone No</label>
              <input
                type="tel"
                id="phone_field"
                className="form-control"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="address_field">Address</label>
              <input
                type="text"
                id="address_field"
                className="form-control"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="state_field">State / Union Territory</label>
              <select
                id="state_field"
                className="form-control"
                value={state}
                onChange={handleStateChange}
                required
              >
                <option value="">Select State / UT</option>
                <optgroup label="States">
                  {INDIAN_STATES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Union Territories">
                  {UNION_TERRITORIES.map((ut) => (
                    <option key={ut} value={ut}>
                      {ut}
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="city_field">{isTamilNadu ? "District / City" : "City"}</label>
              {isTamilNadu && !isCustomCity ? (
                <div>
                  <select
                    id="city_field"
                    className="form-control"
                    value={city}
                    onChange={(e) => {
                      if (e.target.value === "__custom__") {
                        setIsCustomCity(true);
                        setCity("");
                      } else {
                        setCity(e.target.value);
                      }
                    }}
                    required
                  >
                    <option value="">Select Tamil Nadu District (38 Districts)</option>
                    {TAMIL_NADU_DISTRICTS.map((dist) => (
                      <option key={dist} value={dist}>
                        {dist}
                      </option>
                    ))}
                    <option value="__custom__">✏️ Other City / Town (Enter manually)</option>
                  </select>
                </div>
              ) : (
                <div>
                  <input
                    type="text"
                    id="city_field"
                    className="form-control"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder={isTamilNadu ? "Enter town / city name" : "City"}
                    required
                  />
                  {isTamilNadu && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsCustomCity(false);
                        setCity("");
                      }}
                      className="btn btn-link btn-sm p-0 mt-1"
                    >
                      ← Choose from 38 Tamil Nadu districts list
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="postal_code_field">Postal Code (PIN Code)</label>
              <input
                type="number"
                id="postal_code_field"
                className="form-control"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
              />
            </div>

            <button id="shipping_btn" type="submit" className="btn btn-block py-3">
              CONTINUE
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
}