import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearError, clearOrderDeleted } from "../../slices/orderSlice";
import Loader from "../Loader";
import { MDBDataTable } from "mdbreact";
import { Button, Modal } from "react-bootstrap";
import Sidebar from "./Sidebar";
import { deleteOrder, adminOrders as adminAction } from "../../actions/orderActions";
import html2pdf from "html2pdf.js";

const OrderList = () => {
    const { adminOrders, loading = true, error, isOrderDeleted } = useSelector((state) => state.orderState);
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
                <div style="text-align: center;">
                    <img src="/images/Logo.jpeg" alt="Logo" style="width: 150px;margin-bottom: 10px;" />

                    <h2>SM CRACKERS</h2>
                    <p>4/89 Vallalar Street, Abirami Nagar, Sennelur, Chennai - 600056</p>
                    <p>Office No : 8903359989 </p>
                    <p>☎ 6381933039 / 8248450298</p>
                </div>
                <hr/>
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
                        <tr style="background: #007bff; color: white;">
                            <th style="padding: 10px; border: 1px solid #ddd;">#</th>
                            <th style="padding: 10px; border: 1px solid #ddd;">Product</th>
                            <th style="padding: 10px; border: 1px solid #ddd;">Qty</th>
                            <th style="padding: 10px; border: 1px solid #ddd;">Price (₹)</th>
                            <th style="padding: 10px; border: 1px solid #ddd;">Total (₹)</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${order.orderItems.map((item, index) => `
                            <tr>
                                <td style="padding: 10px; border: 1px solid #ddd;">${index + 1}</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">${item.name}</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">${item.quantity}</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">₹ ${item.price.toFixed(2)}</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">₹ ${(item.price * item.quantity).toFixed(2)}</td>
                            </tr>
                        `).join('')}
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

    
    
    
    
    const setOrders = () => {
        const data = {
            columns: [
                { label: "Customer Name", field: "username", sort: "asc" },
                { label: "Phone Number", field: "Phoneno", sort: "asc" },
                { label: "Number of Items", field: "noofItems", sort: "asc" },
                { label: "Amount", field: "Amount", sort: "asc" },
                { label: "Invoice", field: "invoice", sort: "asc" },
                { label: "Actions", field: "actions", sort: "asc" },
            ],
            rows: [],
        };

        adminOrders.forEach((order) => {
            data.rows.push({
                username: order.shippingInfo?.name || "Not Provided",
                Phoneno: order.shippingInfo?.phoneNo || "Not Provided",
                noofItems: order?.orderItems?.length || 0,
                Amount: `₹${order?.totalPrice?.toFixed(2) || "0.00"}`,
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
                        <Button onClick={() => dispatch(deleteOrder(order._id))} className="btn btn-danger py-1 px-2 ml-2">
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

        dispatch(adminAction);
    }, [dispatch, error, isOrderDeleted]);

    return (
        <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar />
            </div>
            <div className="col-12 col-md-10">
                <h1 className="my-4">Order List</h1>
                {loading ? (
                    <Loader />
                ) : (
                    <MDBDataTable data={setOrders()} bordered striped hover className="px-3" />
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
                                    Address: 4/89 Vallalar Street, Abirami Nagar, Sennelur, Chennai 600056
                                    <br />
                                    Phone: 6381933039 / 8248450298
                                </p>
                                <hr />
                                <p><strong>Name:</strong> {selectedOrder.shippingInfo?.name}</p>
                                <p><strong>Phone:</strong> {selectedOrder.shippingInfo?.phoneNo}</p>
                                <p><strong>Address:</strong> {selectedOrder.shippingInfo?.address}</p>
                                <p><strong>Order ID:</strong> {selectedOrder._id}</p>
                                <p><strong>Date:</strong> {new Date(selectedOrder.createdAt).toLocaleDateString()}</p>
                                <hr />
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
                                <hr />
                                <p><strong>Total:</strong> ₹{selectedOrder.totalPrice.toFixed(2)}</p>
                                <Button variant="success" onClick={() => handleDownloadInvoice(selectedOrder)} className="mt-2">
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
