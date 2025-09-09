import React from "react";
import "./TermsAndConditions.css";
import Footer from "./footer/Footer";

const Termsandcondition = () => {
  return (
    <div>
    <div className="terms-container">
      <h1 className="terms-title">Terms & Conditions</h1>
      <div className="terms-content">
        <p>
          Welcome to <strong>SM Sivakasi Crackers</strong>. By accessing and
          purchasing from our website{" "}
          <a href="https://smsivakasicrackers.com" target="_blank" rel="noreferrer">
            smsivakasicrackers.com
          </a>
          , you agree to the following terms and conditions. Please read them
          carefully before placing your order.
        </p>

        <h2>1. Order Process</h2>
        <ul>
          <li>
            Customers can browse our cracker products and create their order
            list.
          </li>
          <li>
            Once the order is finalized, you must{" "}
            <strong>download the PDF invoice</strong> from our website.
          </li>
          <li>
            Send the invoice to our official number{" "}
            <strong>+91 82484 50298 / +91 89033 59989</strong> for confirmation.
          </li>
        </ul>

        <h2>2. Payment</h2>
        <ul>
          <li>
            We do <strong>not</strong> provide online payment gateway facilities.
          </li>
          <li>
            Payment must be made via <strong>Google Pay / UPI / Bank Transfer</strong> to the details shared after order confirmation.
          </li>
          <li>
            Orders will only be processed once the payment is confirmed.
          </li>
        </ul>

        <h2>3. Shipping & Delivery</h2>
        <ul>
          <li>
            Delivery timelines will be communicated after order confirmation and
            payment.
          </li>
          <li>
            Shipping charges (if applicable) will be informed prior to delivery.
          </li>
        </ul>

        <h2>4. Cancellations & Refunds</h2>
        <ul>
          <li>
            Orders once confirmed and paid are <strong>non-refundable</strong>.
          </li>
          <li>
            In case of cancellation before payment, no charges will apply.
          </li>
        </ul>

        <h2>5. Legal Disclaimer</h2>
        <ul>
          <li>
            Crackers will only be sold to customers above{" "}
            <strong>18 years of age</strong>.
          </li>
          <li>
            Buyers must comply with all local laws and regulations related to
            the purchase and use of fireworks.
          </li>
          <li>
            SM Sivakasi Crackers is not liable for misuse of products after
            delivery.
          </li>
        </ul>

        <h2>6. Contact Information</h2>
        <p>
          For order confirmation, payment, or queries, please contact us at:{" "}
          <br />
          <strong>Phone:</strong> +91 82484 50298 / +91 89033 59989 <br />
          <strong>Email:</strong> smpyropark.2019@gmail.com
        </p>
      </div>
    </div>
<Footer/>
    </div>
  );
};

export default Termsandcondition;