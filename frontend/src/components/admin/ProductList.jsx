import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearError } from "../../slices/authslice";
import Loader from "../Loader";
import { deleteProduct, getAdminProducts } from "../../actions/productActions";
import { MDBDataTable } from "mdbreact";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import Sidebar from "./Sidebar";
import { clearProductDeleted } from "../../slices/productSlice";

export default function ProductList() {
  const { products = [], loading = true, error } = useSelector((state) => state.productsState);
  const { isProductDeleted, error: productError } = useSelector((state) => state.productState);
  const dispatch = useDispatch();

  const deleteHandler = (e, id) => {
    e.target.disabled = true;
    dispatch(deleteProduct(id));
  };

  const setProducts = () => {
    const data = {
      columns: [
        {
          label: "Product",
          field: "product",
          sort: "asc",
        },
        {
          label: "Price",
          field: "price",
          sort: "asc",
        },
        {
          label: "Stock",
          field: "stock",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    products.forEach((product) => {
      data.rows.push({
        product: (
          <div className="d-flex align-items-center">
            <img
              src={product.image}
              alt={product.name}
              className="rounded img-thumbnail me-3"
              style={{ width: "50px", height: "50px", objectFit: "cover" }}
            />
            <span className="fw-bold">{product.name}</span>
          </div>
        ),
        price: <span className="text-success fw-bold">₹{product.price}</span>,
        stock: <span className="fw-medium">{product.stock}</span>,
        actions: (
          <Fragment>
            <Button variant="danger" className="py-1 px-2 ms-2" onClick={(e) => deleteHandler(e, product._id)}>
              <i className="fa fa-trash"></i>
            </Button>
          </Fragment>
        ),
      });
    });

    return data;
  };

  useEffect(() => {
    if (error || productError) {
      toast(error || productError, {
        type: "error",
        onOpen: () => {
          dispatch(clearError());
        },
      });
      return;
    }
    if (isProductDeleted) {
      toast("Product Deleted Successfully!", {
        type: "success",
        onOpen: () => dispatch(clearProductDeleted()),
      });
      return;
    }

    dispatch(getAdminProducts);
  }, [dispatch, error, isProductDeleted]);

  return (
    <Container fluid>
      <Row>
        {/* Sidebar */}
        <Col md={2} className="bg-light vh-100">
          <Sidebar />
        </Col>

        {/* Product List Content */}
        <Col md={10}>
          <Card className="my-4 p-4 shadow-sm">
            <Card.Title className="text-center text-primary fw-bold fs-3">Product List</Card.Title>
            <Card.Body>
              {loading ? (
                <Loader />
              ) : (
                <MDBDataTable data={setProducts()} bordered striped hover className="px-3" />
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
