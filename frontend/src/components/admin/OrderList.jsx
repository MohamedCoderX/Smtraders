import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearError, clearOrderDeleted, clearOrderUpdated } from "../../slices/orderSlice";
import Loader from "../Loader";
import { MDBDataTable } from "mdbreact";
import { Button, Modal, Form } from "react-bootstrap";
import Sidebar from "./Sidebar";
import { deleteOrder, adminOrders as adminAction } from "../../actions/orderActions";
import { updateOrder } from "../../actions/orderActions";
import html2pdf from "html2pdf.js";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import "./OrderList.css";

const OrderList = () => {
  const { adminOrders = [] , loading = true, error, isOrderDeleted, isOrderUpdated } =
    useSelector((state) => state.orderState);

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
      <div style="width: 800px; margin: auto; padding: 20px; border: 1px solid #ddd; font-family: Arial, sans-serif;">
       <div style="display: flex; align-items: center; justify-content: space-between;  margin: 0 auto; padding: 15px;">
  <div style="flex-shrink: 0;">
    <img src="/images/logo.png" alt="Logo" style="width: 150px; margin-right: 20px;" />
  </div>
  <div style="text-align: left; flex: 1;">
    <h2 style="margin: 0 0 8px 0; font-size: 24px; color: #333;">SM CRACKERS</h2>
    <p style="margin: 4px 0; color: #555; line-height: 1.4;">
      4/175/A Sattur to Sivakasi road, Veerapandiyapuram, Near by toll gate, Sattur - 626203
    </p>
    <p style="margin: 4px 0; color: #555; font-weight: 500;">
      Office No: +91 8903359989 / 6381933039 / 8248450298
    </p>
  </div>
</div>

        <hr/>
        <h2>Invoice Bill </h2>
        <div style="display: flex; justify-content: space-between;">
          <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
        </div>
        <div>
          <p><strong>Name:</strong> ${order.shippingInfo?.name}</p>
          <p><strong>Phone:</strong> ${order.shippingInfo?.phoneNo}</p>
          <p><b>Address:</b> ${order.shippingInfo?.address}, ${order.shippingInfo?.city}, ${order.shippingInfo?.postalCode}, ${order.shippingInfo?.state} </p>
        </div>
        <hr/>
        <table style="width: 100%; border-collapse: collapse; text-align: center;">
      <thead>
        <tr style="background: #007bff; color: white; page-break-inside: avoid; break-inside: avoid-page;">
          <th style="padding: 10px; border: 1px solid #ddd;">S.No</th>
          <th style="padding: 10px; border: 1px solid #ddd;">Product</th>
          <th style="padding: 10px; border: 1px solid #ddd;">Qty</th>
          <th style="padding: 10px; border: 1px solid #ddd;">Price (₹)</th>
          <th style="padding: 10px; border: 1px solid #ddd;">Total (₹)</th>
        </tr>
      </thead>
      <tbody>
        ${order.orderItems
          .map(
            (item, index) => `
              <tr style="page-break-inside: avoid; break-inside: avoid-page; display: table-row;">
                <td style="padding: 10px; border: 1px solid #ddd; page-break-inside: avoid; break-inside: avoid-page;">${index + 1}</td>
                <td style="padding: 10px; border: 1px solid #ddd; page-break-inside: avoid; break-inside: avoid-page;">${item.name}</td>
                <td style="padding: 10px; border: 1px solid #ddd; page-break-inside: avoid; break-inside: avoid-page;">${item.quantity}</td>
                <td style="padding: 10px; border: 1px solid #ddd; page-break-inside: avoid; break-inside: avoid-page;">₹ ${item.price.toFixed(2)}</td>
                <td style="padding: 10px; border: 1px solid #ddd; page-break-inside: avoid; break-inside: avoid-page;">₹ ${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            `
          )
          .join("")}
      </tbody>
    </table>

        <hr/>
        <div style="text-align: right; font-size: 18px; font-weight: bold;">
          <p>Total Amount: ₹ ${order.totalPrice.toFixed(2)}</p>
        </div>
        <hr/>
        <p style="text-align: center; font-style: italic;">Thank you for your purchase! Please verify items before dispatching.</p>
      </div>
    `;

    html2pdf().from(invoiceHtml).save(`Invoice_${order._id}.pdf`);
  };

  const handleStatusChange = (orderId, newStatus) => {
    dispatch(updateOrder(orderId, { orderStatus: newStatus }));
  };

  
  const setOrders = () => {
    const data = {
      columns: [
        { label: "Customer Name", field: "username", sort: "asc" },
        { label: "Phone Number", field: "Phoneno", sort: "asc" },
        { label: "Number of Items", field: "noofItems", sort: "asc" },
        { label: "Amount", field: "Amount", sort: "asc" },
        { label: "Status", field: "status", sort: "asc" },
        { label: "Invoice", field: "invoice", sort: "asc" },
        { label: "Actions", field: "actions", sort: "asc" },
      ],
      rows: [],
    };
    const sortedOrders = [...adminOrders].sort((a, b) => {
        const orderPriority = { Processing: 1, Completed: 2, Delivered: 3 };
        return (orderPriority[a.orderStatus] || 4) - (orderPriority[b.orderStatus] || 4);
      });
    sortedOrders.forEach((order) => {
      data.rows.push({
        username: order.shippingInfo?.name || "Not Provided",
        Phoneno: order.shippingInfo?.phoneNo || "Not Provided",
        noofItems: order?.orderItems?.length || 0,
        Amount: `₹${order?.totalPrice?.toFixed(2) || "0.00"}`,
        status: (
            <Fragment>
             <select
    value={order?.orderStatus || "Processing"}
    onChange={(e) => handleStatusChange(order._id, e.target.value)}
    className={`form-select form-select-sm ${
      order?.orderStatus === "Completed"
        ? "text-success fw-bold"
        : ""
    }`}
   
  >
    <option value="Pending">Pending</option>
    <option value="Processing">Processing</option>
    <option value="Completed">Completed</option>

  </select>
          </Fragment>
        ),
        invoice: (
          <Fragment>
            <Button variant="info" onClick={() => handleShowInvoice(order)}>
              View
            </Button>
            <Button variant="success" onClick={() => handleDownloadInvoice(order)} className="ml-2">
              Download
            </Button>
          </Fragment>
        ),
        actions: (
          <Fragment>
            <Button
              onClick={() => dispatch(deleteOrder(order._id))}
              className="btn btn-danger py-1 px-2 ml-2"
            >
              <i className="fa fa-trash"></i>
            </Button>
          </Fragment>
        ),
      });
    });

    return data;
  };

  useEffect(() => {
    if (error) {
      toast(error, {
        type: "error",
        onOpen: () => {
          dispatch(clearError());
        },
      });
      return;
    }
    if (isOrderDeleted) {
      toast("Order Deleted Successfully!", {
        type: "success",
        onOpen: () => dispatch(clearOrderDeleted()),
      });
      return;
    }
    // if (isOrderUpdated) {     
    //   toast("Order Status Updated!", {
    //     type: "success",
    //     onOpen: () => dispatch(clearOrderUpdated()),
    //   });
    //   return;
    // }
    dispatch(adminAction);
  }, [dispatch, error, isOrderDeleted, isOrderUpdated]);

  const handleDownloadAllOrders = () => {
    if (!adminOrders || adminOrders.length === 0) {
      toast("No orders available to download", { type: "info" });
      return;
    }
  
    // Prepare data for Excel
    const exportData = adminOrders.map((order, index) => ({
      "S.No": index + 1,
      "Customer Name": order.shippingInfo?.name || "Not Provided",
      "Phone Number": order.shippingInfo?.phoneNo || "Not Provided",
      Address: order.shippingInfo?.address || "Not Provided",
      City: order.shippingInfo?.city || "Not Provided",
      State: order.shippingInfo?.state || "Not Provided",
      "Postal Code": order.shippingInfo?.postalCode || "Not Provided",
      "Total Amount (₹)": order.totalPrice ? order.totalPrice.toFixed(2) : "0.00",
      Date: new Date(order.createdAt).toLocaleDateString(),
    }));
  
    // Create a worksheet
    const worksheet = XLSX.utils.json_to_sheet(exportData);
  
    // Create a workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
  
    // Generate Excel file
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
  
    // Save file
    const fileData = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(fileData, `All_Orders_${new Date().toLocaleDateString()}.xlsx`);
  };
  
  return (
    <div className="row">
      <div className="col-12 col-md-2">
        <Sidebar />
      </div>
      <div className="col-12 col-md-10">
        <h1 className="my-4">Order List</h1>
        <Button variant="primary" onClick={handleDownloadAllOrders}>
    Download All Orders (Excel)
  </Button>
        {loading ? (
          <Loader />
        ) : (
          <div className="table-responsive">
            
            <MDBDataTable data={setOrders()} bordered striped hover className="px-3" />
          </div>
        )}

        {/* Modal for Invoice */}
        <Modal show={showInvoice} onHide={handleCloseInvoice} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Invoice</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedOrder ? (
              <div>
                <h3>SM CRACKERS</h3>
                <p>
                  Address: 4/175/A Sattur to Sivakasi road Veerapandiyapuram Near by toll gate
                  Sattur - 626203
                  <br />
                  Phone: +91 8903359989 / 8248450298
                </p>
                <hr />
                <p>
                  <strong>Name:</strong> {selectedOrder.shippingInfo?.name}
                </p>
                <p>
                  <strong>Phone:</strong> {selectedOrder.shippingInfo?.phoneNo}
                </p>
                <p>
                  <strong>Address:</strong> {selectedOrder.shippingInfo?.address}
                </p>
                <p>
                  <strong>Order ID:</strong> {selectedOrder.orderNumber}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(selectedOrder.createdAt).toLocaleDateString()}
                </p>
                <hr />
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Rate</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.orderItems.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.name}</td>
                          <td>{item.quantity}</td>
                          <td>₹{item.price.toFixed(2)}</td>
                          <td>₹{(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <hr />
                <p>
                  <strong>Total:</strong> ₹{selectedOrder.totalPrice.toFixed(2)}
                </p>
                <Button
                  variant="success"
                  onClick={() => handleDownloadInvoice(selectedOrder)}
                  className="mt-2"
                >
                  Download Invoice
                </Button>
              </div>
            ) : (
              <p>No Invoice Available</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseInvoice}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default OrderList;
