import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearError } from "../../slices/authslice";
import Loader from "../Loader";
import { deleteProduct, getAdminProducts } from "../../actions/productActions";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Sidebar from "./Sidebar";
import { clearProductDeleted } from "../../slices/productSlice";

export default function ProductList() {
  const {
    products = [],
    loading = true,
    error,
  } = useSelector((state) => state.productsState);
  const { isProductDeleted, error: productError } = useSelector(
    (state) => state.productState
  );
  const dispatch = useDispatch();

  const deleteHandler = (e, id) => {
    e.target.disabled = true;
    dispatch(deleteProduct(id));
  };

  const setProducts = () => {
    const data = {
      columns: [
        { label: "ID", field: "id", sort: "asc" },
        { label: "Name", field: "name", sort: "asc" },
        { label: "Price", field: "price", sort: "asc" },
        { label: "Stock", field: "stock", sort: "asc" },
        { label: "Actions", field: "actions", sort: "asc" },
      ],
      rows: [],
    };

    const sortedProducts = [...products].sort((a, b) => {
      if (a.stock === 0 && b.stock !== 0) return -1;
      if (a.stock !== 0 && b.stock === 0) return 1;
      return 0;
    });

    sortedProducts.forEach((product, index) => {
      data.rows.push({
        id: index + 1,
        name: product.name,
        price: `₹${product.price}`,
        stock: product.stock,
        actions: (
          <Fragment>
            <Link
              to={`/admin/product/${product._id}`}
              className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-md px-3 py-2 transition-all duration-200 shadow-sm"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <Button
              onClick={(e) => deleteHandler(e, product._id)}
              className="bg-red-600 hover:bg-red-700 border-none text-white rounded-md px-3 py-2 ml-3 transition-all duration-200 shadow-sm"
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
  }, [dispatch, error, isProductDeleted , productError]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-1/5 bg-white border-r">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 overflow-x-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-3 md:mb-0">
            🛍️ Product List
          </h1>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-[50vh]">
            <Loader />
          </div>
        ) : (
          <div className="bg-white shadow-md rounded-2xl overflow-hidden border border-gray-200">
            <div className="p-3 md:p-5">
              <div className="overflow-x-auto">
                <MDBDataTable
                  data={setProducts()}
                  bordered
                  striped
                  hover
                  className="table-auto text-sm md:text-base"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
