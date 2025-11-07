import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearProductCreated, clearError } from "../../slices/productSlice";
import { toast } from "react-toastify";
import { Fragment, useEffect, useState } from "react";
import { createNewProduct } from "../../actions/productActions";
import Sidebar from "./Sidebar";

export default function NewProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);

  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const { loading, isProductCreated, error } =
    useSelector((state) => state.productState || {});

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

  const onImagesChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, file]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("originalPrice", originalPrice);
    formData.append("description", description);
    formData.append("category", category);
    images.forEach((image) => formData.append("images", image));
    dispatch(createNewProduct(formData));
  };

  useEffect(() => {
    if (isProductCreated) {
      toast("Product Created Successfully!", {
        type: "success",
        onOpen: () => dispatch(clearProductCreated()),
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
  }, [isProductCreated, error, dispatch, navigate]);

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
            <h1 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
              Create New Product
            </h1>

            <form
              onSubmit={submitHandler}
              encType="multipart/form-data"
              className="space-y-6"
            >
              {/* Name */}
              <div>
                <label
                  htmlFor="name_field"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  id="name_field"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Prices */}
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

              {/* Images */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Images
                </label>
                <input
                  type="file"
                  id="customFile"
                  name="images"
                  multiple
                  onChange={onImagesChange}
                  className="block w-full text-gray-700 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                <div className="flex flex-wrap mt-3 gap-3">
                  {imagesPreview.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt="Preview"
                      className="w-16 h-16 object-cover rounded-md shadow-sm border border-gray-200"
                    />
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-200 shadow-md disabled:opacity-50"
              >
                {loading ? "Creating..." : "Create Product"}
              </button>
            </form>
          </div>
        </Fragment>
      </div>
    </div>
  );
}
