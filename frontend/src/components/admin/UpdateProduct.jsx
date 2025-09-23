import { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct, updateProduct } from "../../actions/productActions";
import { clearError, clearProductUpdated } from "../../slices/productSlice";
import { toast } from "react-toastify";

export default function UpdateProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);

  const { id: productId } = useParams();

  const { loading, isProductUpdated, error, product } = useSelector(
    (state) => state.productState
  );

  const categories = [
    "Sound crackers",
    "Twinkling star",
    "Flower pot",
    "Ground chakkara",
    "Bijli crackers",
    "Bomb",
    "Rockets",
    "Continue crackers",
    "Special wala",
    "Fancy show",
    "Sky shot rider",
    "Multi colour shot",
    "Branded sky shot",
    "Flying crackers",
    "Standard fountain",
    "Mega fountain",
    "Flash novalties",
    "Varities",
    "Colour matches",
    "Gift box",
    'Sparklers',
    "Peacock",
    "Pencil",
    "New Arrivals"
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
  
    // 🔹 Prepare product object (JSON)
    const updatedProduct = {
      name: name.trim(),                         // remove extra spaces
      price: price !== "" ? Number(price) : 0,   // convert to number
      originalPrice: originalPrice !== "" ? Number(originalPrice) : 0,
      stock: stock !== "" ? Number(stock) : 0,
      description: description.trim(),
      category: category,
    };
  
    // 🔹 Debug: check what is being sent
    console.log("Submitting product:", updatedProduct);
  
    // 🔹 Dispatch Redux action
    dispatch(updateProduct(productId, updatedProduct));
  };
  

  // 🔹 Handle success/error/fetch
  useEffect(() => {
    if (isProductUpdated) {
        toast('Updated  Succesfully!',{
            type: 'success',
        onOpen: () => dispatch(clearProductUpdated()),
      });
      navigate("/admin/products");
      return;
    }
  
    if (error) {
      toast(error, {
        
        type: "error",
        onOpen: () => {
          dispatch(clearError());
        },
      });
      return;
    }
  
    dispatch(getProduct(productId));
  }, [isProductUpdated, error, dispatch, navigate, productId]);
  
  useEffect(() => {
    console.log("Product data:", product);
    if (product) {
      setName(product.name || "");
      setPrice(product.price || "");
      setStock(product.stock || 0);
      setDescription(product.description || "");
      setOriginalPrice(product.originalPrice || "");
      setCategory(product.category || "");
    }
  }, [product]);

  return (
    <div className="row">
      <div className="col-12 col-md-2">
        <Sidebar />
      </div>
      <div className="col-12 col-md-10">
        <Fragment>
          <div className="wrapper my-5">
            {loading ? (
              <h2>Loading product...</h2>
            ) : (
              <form
                onSubmit={submitHandler}
                className="shadow-lg"
                encType="multipart/form-data"
              >
                <h1 className="mb-4">Update Product</h1>

                <div className="form-group">
                  <label htmlFor="name_field">Name</label>
                  <input
                    type="text"
                    id="name_field"
                    className="form-control"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="price_field">Discounted Price</label>
                  <input
                    type="text"
                    id="price_field"
                    className="form-control"
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="originalPrice_field">Original Price</label>
                  <input
                    type="text"
                    id="originalPrice_field"
                    className="form-control"
                    onChange={(e) => setOriginalPrice(e.target.value)}
                    value={originalPrice}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description_field">Description</label>
                  <textarea
                    className="form-control"
                    id="description_field"
                    rows="8"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                  ></textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="category_field">Category</label>
                  <select
                    onChange={(e) => setCategory(e.target.value)}
                    className="form-control"
                    id="category_field"
                    value={category}
                  >
                    <option value="">Select</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="stock_field">Stock</label>
                  <input
                    type="number"
                    id="stock_field"
                    className="form-control"
                    onChange={(e) => setStock(e.target.value)}
                    value={stock}
                  />
                </div>

                <button
                  id="login_button"
                  type="submit"
                  disabled={loading}
                  className="btn btn-block py-3"
                >
                  Update
                </button>
              </form>
            )}
          </div>
        </Fragment>
      </div>
    </div>
  );
}
