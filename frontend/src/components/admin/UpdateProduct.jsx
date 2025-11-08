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
  const [image, setImage] = useState(""); // single image
  const [oldImage, setOldImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");

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
    "Sparklers",
    "Peacock",
    "Pencil",
    "New Arrivals",
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle image change (single)
  const onChangeImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
        setImagePreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Submit form handler
  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name.trim());
    formData.set("price", price !== "" ? Number(price) : 0);
    formData.set("originalPrice", originalPrice !== "" ? Number(originalPrice) : 0);
    formData.set("stock", stock !== "" ? Number(stock) : 0);
    formData.set("description", description.trim());
    formData.set("category", category);

    if (image) {
      formData.append("images", image);
    }

    dispatch(updateProduct(productId, formData));
  };

  // ✅ Fetch product details only once
  useEffect(() => {
    dispatch(getProduct(productId));
  }, [dispatch, productId]);

  // ✅ Handle success/error separately
  useEffect(() => {
    if (isProductUpdated) {
      toast("Product Updated Successfully!", {
        type: "success",
        onOpen: () => dispatch(clearProductUpdated()),
      });
      navigate("/admin/products");
    }

    if (error) {
      toast(error, {
        type: "error",
        onOpen: () => dispatch(clearError()),
      });
    }
  }, [isProductUpdated, error, dispatch, navigate]);

  // ✅ Set product details in state when loaded
  useEffect(() => {
    if (product) {
      setName(product.name || "");
      setPrice(product.price || "");
      setStock(product.stock || 0);
      setDescription(product.description || "");
      setOriginalPrice(product.originalPrice || "");
      setCategory(product.category || "");
      if (product.images && product.images.length > 0) {
        setOldImage(product.images[0].image || product.images[0].url || "");
      }
    }
  }, [product]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Sidebar */}
      <div className="w-full md:w-1/5 bg-white shadow-md border-r">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-10 overflow-y-auto">
        <Fragment>
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10 border border-gray-200">
            {loading ? (
              <h2 className="text-center text-gray-600 text-lg">Loading product...</h2>
            ) : (
              <form
                onSubmit={submitHandler}
                encType="multipart/form-data"
                className="space-y-6"
              >
                <h1 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
                  Update Product
                </h1>

                {/* Name */}
                <div>
                  <label
                    htmlFor="name_field"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name_field"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                {/* Price */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="price_field"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Discounted Price
                    </label>
                    <input
                      type="text"
                      id="price_field"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="originalPrice_field"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Original Price
                    </label>
                    <input
                      type="text"
                      id="originalPrice_field"
                      value={originalPrice}
                      onChange={(e) => setOriginalPrice(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label
                    htmlFor="description_field"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Description
                  </label>
                  <textarea
                    id="description_field"
                    rows="5"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                  ></textarea>
                </div>

                {/* Category & Stock */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="category_field"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Category
                    </label>
                    <select
                      id="category_field"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option value="">Select</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="stock_field"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Stock
                    </label>
                    <input
                      type="number"
                      id="stock_field"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <label
                    htmlFor="formFile"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Product Image
                  </label>
                  <input
                    type="file"
                    id="formFile"
                    name="images"
                    accept="image/*"
                    onChange={onChangeImage}
                    className="w-full border border-gray-300 rounded-lg p-3"
                  />

                  <div className="flex flex-wrap gap-3 mt-3">
                    {/* Old image */}
                    {oldImage && (
                      <img
                        src={oldImage}
                        alt="Old Product"
                        className="h-20 w-20 object-cover rounded-md border"
                      />
                    )}

                    {/* New image preview */}
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="h-20 w-20 object-cover rounded-md border"
                      />
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-200 shadow-md disabled:opacity-50"
                >
                  {loading ? "Updating..." : "Update Product"}
                </button>
              </form>
            )}
          </div>
        </Fragment>
      </div>
    </div>
  );
}
