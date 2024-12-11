import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import jsPDF from "jspdf";
import './Invoice.css'
import html2canvas from 'html2canvas'
import Footer from "../footer/Footer";
import { toast } from "react-toastify";
import { orderCompleted } from "../../slices/cartSlice";
import { createOrder } from "../../actions/orderActions";
import { clearError as clearOrderError } from "../../slices/orderSlice";
import { validateShipping } from "./Shipping";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Payment = () => {
  const { shippingInfo, items: cartItems } = useSelector((state) => state.cartState);
  const { user } = useSelector((state) => state.authState);
  const { error: orderError, orderDetail } = useSelector((state) => state.orderState); // Added orderDetail
  const [invoiceUploaded, setInvoiceUploaded] = useState(false);
  const [orderCreated, setOrderCreated] = useState(false);
  const invoiceRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const uploadTriggered = useRef(false);
    const calculateTotal = () =>
      cartItems?.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0;
  
    const calculateDiscount = () =>
      cartItems?.reduce((acc, item) => acc + (item.discount || 0) * item.quantity, 0) || 0;
  
    const calculateNetTotal = () => calculateTotal() - calculateDiscount();
  
    const generateAndUploadInvoice = async () => {
      const invoiceElement = invoiceRef.current;
      if (!invoiceElement) {
        console.error("Invoice element not found!");
        return;
      }
      try {
        const canvas = await html2canvas(invoiceElement);
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("portrait", "mm", "a4");
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, "PNG", 10, 10, pdfWidth - 20, pdfHeight - 20);
  
        // Convert PDF to Blob
        const pdfBlob = pdf.output("blob");
  
        const formData = new FormData();
        formData.append("invoice", pdfBlob, "invoice.pdf");
        formData.append("orderId", orderDetail?._id);
  
        // Upload PDF
        const response = await axios.post(
          "https://smtraders.onrender.com/api/v1/admin/upload-invoice",
          formData,{
            headers: {
              "Content-Type": "application/json", // Adjust if sending files
            },
          }
        );
  
        console.log("Invoice uploaded successfully:", response.data);
        toast("Invoice uploaded successfully!", { type: "success" })
        ;
        setInvoiceUploaded(true);
      } catch (error) {
        console.error("Failed to upload the invoice:", error);
        toast("Failed to upload the invoice.", { type: "error" });
      }
    };
  
    const downloadPDF = async () => {
      const invoiceElement = invoiceRef.current;
  
      if (!invoiceElement) {
        console.error("Invoice element not found!");
        return;
      }
  
      const canvas = await html2canvas(invoiceElement);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("portrait", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 10, 10, pdfWidth - 20, pdfHeight - 20);
      pdf.save("invoice.pdf");
    };
  
    useEffect(() => {
      validateShipping(shippingInfo, navigate);
  
      if (orderError) {
        toast(orderError, {
          type: "error",
          onOpen: () => {
            dispatch(clearOrderError());
          },
        });
        return;
      }
  
      const order = {
        orderItems: cartItems,
        shippingInfo,
        totalPrice: calculateNetTotal(),
      };
   // Automatically upload the invoice on page load
   
  // Ensure the invoice is only uploaded once
  if (orderDetail && orderDetail._id && !uploadTriggered.current) {
    if (!invoiceUploaded) {
      
      console.log("Invoice is being generated...");
      generateAndUploadInvoice();
      uploadTriggered.current = true; // Mark upload as triggered
      return;
    }
  } 
  if (!orderCreated) {
    dispatch(createOrder(order));
    setOrderCreated(true); // Set the flag to true after order creation
  }
      
    }, [orderDetail,invoiceUploaded,dispatch, cartItems, shippingInfo, navigate, orderError]);
  
  return (
    <div>
      <div className="alert-box">
        <h3>Thank You For Your Enquiry. To Confirm the Order | <strong>Download the PDF and send</strong> . Gpay -
        8903359989 | Please Follow 
        8248450298 after the order.</h3>
      </div>
      <div className="invoice-container" ref={invoiceRef}>
        {/* Header */}
        <div className="invoice-header">
          <h1>SM CRACKERS</h1>
          <p>
            Address: 4/89 Vallalar Street, Abirami Nagar, Sennelur, Chennai 600056<br />
            Phone:  6381933039 /
            8248450298
          </p>
        </div>

        {/* Customer Details */}
        <div className="customer-details d-flex">
          <div className="left">
            <h5>Customer Details</h5>
            <p>To:</p>
            <p><strong>Name:</strong> {shippingInfo?.name || "Guest"}</p>
            <p><strong>Email:</strong> {user?.email || "Not Provided"}</p>
            <p><b>Phone:</b> {shippingInfo?.phoneNo || "not provided"}</p>
            <p className="mb-4"><b>Address:</b> {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.postalCode}, {shippingInfo.state}, {shippingInfo.country} </p>
          </div>
          <div className="invoice-details">
            <p><strong>Order Id:</strong> {orderDetail?._id || "Loading..."}</p> {/* Dynamically display order ID */}
            <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
          </div>
        </div>

        {/* Table */}
        <table className="invoice-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Rate</th>
              <th>Discount</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cartItems?.map((item, index) => (
              <tr key={item.product}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>${((item.discount || 0) * item.quantity).toFixed(2)}</td>
                <td>${(item.price * item.quantity - (item.discount || 0) * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Summary */}
        <div className="invoice-summary">
          <p><strong>Total Items:</strong> {cartItems?.reduce((acc, item) => acc + item.quantity, 0) || 0}</p>
          <p><strong>Total:</strong> ${calculateTotal().toFixed(2)}</p>
          <p><strong>Discount:</strong> -${calculateDiscount().toFixed(2)}</p>
          <p><strong>Net Total:</strong> ${calculateNetTotal().toFixed(2)}</p>
        </div>

        {/* Footer */}
        <div className="invoice-footer">
          <p>__________________________________________________________________</p>
          <p>THANK YOU FOR SHOPPING WITH US!</p>
          <p>NO: 3/1232/20, Sri Thirupathi Nagar, Parapatti, Sivakasi-89</p>
        </div>
      </div>
      <div className="button">
        <button onClick={downloadPDF}>Download PDF</button>
      </div>
      <Footer />
    </div>
  );
};



export default Payment;
