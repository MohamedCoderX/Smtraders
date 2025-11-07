import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearError,
  clearOrderDeleted,
  clearOrderUpdated,
} from "../../slices/orderSlice";
import Loader from "../Loader";
import { MDBDataTable } from "mdbreact";
import { Button, Modal } from "react-bootstrap";
import Sidebar from "./Sidebar";
import {
  deleteOrder,
  adminOrders as adminAction,
  updateOrder,
} from "../../actions/orderActions";
import html2pdf from "html2pdf.js";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import "./OrderList.css";

const OrderList = () => {
  const {
    adminOrders = [],
    loading = true,
    error,
    isOrderDeleted,
    isOrderUpdated,
  } = useSelector((state) => state.orderState);

  const dispatch = useDispatch();

  const [showInvoice, setShowInvoice] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleShowInvoice = (order) => {
    setSelectedOrder(order);
    setShowInvoice(true);
  };

  const handleCloseInvoice = () => {
    setShowInvoice(false);
    setSelectedOrder(null);
  };

  const handleDownloadInvoice = (order) => {
    const invoiceHtml = `
    <div id="invoice-container" style="
      width: 700px;
      margin: 0 auto;
      font-family: 'Poppins', Arial, sans-serif;
      color: #333;
      background: #fff;
      padding: 40px;
      box-sizing: border-box;
      border-radius: 10px;
      border: 1px solid #ddd;
    ">
      
      <!-- Header -->
      <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #007bff; padding-bottom: 15px;">
        <div>
          <img src="/images/logo.png" alt="Logo" style="width: 120px;"/>
        </div>
        <div style="text-align: right;">
          <h2 style="margin: 0; color: #007bff;">SM CRACKERS</h2>
          <p style="margin: 2px 0;">4/175/A Sattur to Sivakasi road, Veerapandiyapuram</p>
          <p style="margin: 2px 0;">Near Toll Gate, Sattur - 626203</p>
          <p style="margin: 2px 0;">📞 +91 8903359989 / 6381933039 / 8248450298</p>
        </div>
      </div>
  
      <!-- Invoice Info -->
      <div style="margin-top: 20px; display: flex; justify-content: space-between; font-size: 14px;">
        <div>
          <p><strong>Invoice No:</strong> ${order._id}</p>
          <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
        </div>
        <div style="text-align: right;">
          <p><strong>Customer:</strong> ${order.shippingInfo?.name || "N/A"}</p>
          <p><strong>Phone:</strong> ${order.shippingInfo?.phoneNo || "N/A"}</p>
          <p><strong>Address:</strong> ${order.shippingInfo?.address || ""}, ${order.shippingInfo?.city || ""}, ${order.shippingInfo?.state || ""}</p>
        </div>
      </div>
  
      <!-- Items Table -->
      <div style="page-break-inside: avoid; margin-top: 25px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <thead>
            <tr style="background: #007bff; color: #fff;">
              <th style="padding: 10px; border: 1px solid #ccc; text-align: left;">#</th>
              <th style="padding: 10px; border: 1px solid #ccc; text-align: left;">Product</th>
              <th style="padding: 10px; border: 1px solid #ccc; text-align: center;">Qty</th>
              <th style="padding: 10px; border: 1px solid #ccc; text-align: right;">Price (₹)</th>
              <th style="padding: 10px; border: 1px solid #ccc; text-align: right;">Total (₹)</th>
            </tr>
          </thead>
          <tbody>
            ${order.orderItems
              .map(
                (item, index) => `
                <tr style="page-break-inside: avoid;">
                  <td style="padding: 8px; border: 1px solid #ddd;">${index + 1}</td>
                  <td style="padding: 8px; border: 1px solid #ddd;">${item.name}</td>
                  <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${item.quantity}</td>
                  <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">₹${item.price.toFixed(2)}</td>
                  <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">₹${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              `
              )
              .join("")}
          </tbody>
        </table>
      </div>
  
      <!-- Total -->
      <div style="margin-top: 25px; text-align: right; page-break-inside: avoid;">
        <h3 style="margin: 0; color: #222;">Total Amount: ₹${order.totalPrice.toFixed(2)}</h3>
      </div>
  
      <!-- Footer -->
      <div style="margin-top: 40px; text-align: center; border-top: 1px solid #ddd; padding-top: 10px; font-size: 13px; color: #777; page-break-inside: avoid;">
        <p>Thank you for shopping with <strong>SM CRACKERS</strong> 🎉</p>
        <p>Please verify all items before dispatching.</p>
      </div>
    </div>
    `;
  
    const options = {
      margin: [20, 10, 20, 10], // Top, Right, Bottom, Left
      filename: `Invoice_${order._id}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "pt", format: "a4", orientation: "portrait" },
      pagebreak: { 
        mode: ['avoid-all', 'css', 'legacy'],
        before: '#invoice-footer', // ensures the footer starts on a new page if cut off
      }
    };
  
    html2pdf().set(options).from(invoiceHtml).save();
  };
  
  
  

  const handleStatusChange = (orderId, newStatus) => {
    dispatch(updateOrder(orderId, { orderStatus: newStatus }));
  };

  const setOrders = () => {
    const data = {
      columns: [
        { label: "Customer Name", field: "username" },
        { label: "Phone Number", field: "Phoneno" },
        { label: "Items", field: "noofItems" },
        { label: "Amount", field: "Amount" },
        { label: "Status", field: "status" },
        { label: "Invoice", field: "invoice" },
        { label: "Actions", field: "actions" },
      ],
      rows: [],
    };
    const sortedOrders = [...adminOrders].sort((a, b) => {
      const orderPriority = { Processing: 1, Completed: 2, Delivered: 3 };
      return (orderPriority[a.orderStatus] || 4) - (orderPriority[b.orderStatus] || 4);
    });
    sortedOrders.forEach((order) => {
      data.rows.push({
        username: order.shippingInfo?.name || "N/A",
        Phoneno: order.shippingInfo?.phoneNo || "N/A",
        noofItems: order?.orderItems?.length || 0,
        Amount: `₹${order?.totalPrice?.toFixed(2) || "0.00"}`,
        status: (
          <select
            value={order?.orderStatus || "Processing"}
            onChange={(e) => handleStatusChange(order._id, e.target.value)}
            className={`px-2 py-1 border rounded text-sm ${
              order?.orderStatus === "Completed"
                ? "text-green-600 font-semibold"
                : "text-gray-800"
            }`}
          >
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Completed">Completed</option>
          </select>
        ),
        invoice: (
          <div className="flex flex-col md:flex-row gap-2">
            <Button
              variant="info"
              className="!bg-blue-500 !border-none hover:!bg-blue-600 text-white"
              onClick={() => handleShowInvoice(order)}
            >
              View
            </Button>
            <Button
              variant="success"
              className="!bg-green-500 !border-none hover:!bg-green-600 text-white"
              onClick={() => handleDownloadInvoice(order)}
            >
              Download
            </Button>
          </div>
        ),
        actions: (
          <Button
            onClick={() => dispatch(deleteOrder(order._id))}
            className="!bg-red-500 !border-none hover:!bg-red-600 text-white px-3 py-1 rounded"
          >
            <i className="fa fa-trash"></i>
          </Button>
        ),
      });
    });
    return data;
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (isOrderDeleted) {
      toast.success("Order Deleted Successfully!");
      dispatch(clearOrderDeleted());
    }
    if (isOrderUpdated) {
      toast.success("Order Updated Successfully!");
      dispatch(clearOrderUpdated());
    }
    dispatch(adminAction);
  }, [dispatch, error, isOrderDeleted, isOrderUpdated]);

  const handleDownloadAllOrders = () => {
    if (!adminOrders.length) {
      toast.info("No orders to download");
      return;
    }
    const exportData = adminOrders.map((order, index) => ({
      "S.No": index + 1,
      "Customer Name": order.shippingInfo?.name || "N/A",
      "Phone Number": order.shippingInfo?.phoneNo || "N/A",
      Address: order.shippingInfo?.address || "N/A",
      City: order.shippingInfo?.city || "N/A",
      State: order.shippingInfo?.state || "N/A",
      "Postal Code": order.shippingInfo?.postalCode || "N/A",
      "Total Amount (₹)": order.totalPrice ? order.totalPrice.toFixed(2) : "0.00",
      Date: new Date(order.createdAt).toLocaleDateString(),
    }));
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const fileData = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(fileData, `All_Orders_${new Date().toLocaleDateString()}.xlsx`);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <div className="w-full md:w-64 bg-gray-900 text-white">
        <Sidebar />
      </div>

      <div className="flex-1 p-6 overflow-x-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Order List</h1>
          <button
            onClick={handleDownloadAllOrders}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
          >
            Download All Orders (Excel)
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader />
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg p-4 overflow-x-auto">
            <MDBDataTable
              data={setOrders()}
              bordered
              striped
              hover
              responsive
              className="text-sm"
            />
          </div>
        )}

        {/* Invoice Modal */}
        <Modal show={showInvoice} onHide={handleCloseInvoice} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Invoice</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedOrder ? (
              <div className="text-gray-700">
                <h3 className="text-xl font-semibold mb-2">SM CRACKERS</h3>
                <p className="text-sm mb-4">
                  4/175/A Sattur to Sivakasi road, Veerapandiyapuram<br />
                  Near toll gate, Sattur - 626203<br />
                  Phone: +91 8903359989 / 8248450298
                </p>
                <hr className="my-3" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                  <p><strong>Name:</strong> {selectedOrder.shippingInfo?.name}</p>
                  <p><strong>Phone:</strong> {selectedOrder.shippingInfo?.phoneNo}</p>
                  <p><strong>Address:</strong> {selectedOrder.shippingInfo?.address}</p>
                  <p><strong>Date:</strong> {new Date(selectedOrder.createdAt).toLocaleDateString()}</p>
                </div>
                <table className="w-full text-sm border border-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-2 border">#</th>
                      <th className="p-2 border">Product</th>
                      <th className="p-2 border">Qty</th>
                      <th className="p-2 border">Price</th>
                      <th className="p-2 border">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.orderItems.map((item, i) => (
                      <tr key={i} className="border-t">
                        <td className="p-2 border">{i + 1}</td>
                        <td className="p-2 border">{item.name}</td>
                        <td className="p-2 border">{item.quantity}</td>
                        <td className="p-2 border">₹{item.price}</td>
                        <td className="p-2 border">₹{item.price * item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="text-right mt-4 font-semibold text-lg">
                  Total: ₹{selectedOrder.totalPrice}
                </div>
                <Button
                  variant="success"
                  onClick={() => handleDownloadInvoice(selectedOrder)}
                  className="!bg-green-600 hover:!bg-green-700 text-white mt-3"
                >
                  Download Invoice
                </Button>
              </div>
            ) : (
              <p>No Invoice Available</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={handleCloseInvoice}
              className="!bg-gray-500 hover:!bg-gray-600 text-white"
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default OrderList;
