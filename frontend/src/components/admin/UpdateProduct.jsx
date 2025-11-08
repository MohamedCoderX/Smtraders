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
  const [images, setImages] = useState([]); // store actual File objects
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const { id: productId } = useParams();
  const { loading, isProductUpdated, error, product } = useSelector(
    (state) => state.productState
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  // 🖼 Handle image input (multiple)
  const onImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]); // for preview only
          setImages((old) => [...old, file]); // store actual file object
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // 🧾 Form submit handler
  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("price", price);
    formData.set("originalPrice", originalPrice);
    formData.set("stock", stock);
    formData.set("description", description);
    formData.set("category", category);

    images.forEach((img) => {
      formData.append("images", img);
    });

    dispatch(updateProduct(productId, formData));
  };

  // 🧠 Fetch product details initially
  useEffect(() => {
    dispatch(getProduct(productId));
  }, [dispatch, productId]);

  // ✅ Handle success/error
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

  // 🧠 Fill state when product is loaded
  useEffect(() => {
    if (product) {
      setName(product.name || "");
      setPrice(product.price || "");
      setStock(product.stock || 0);
      setDescription(product.description || "");
      setOriginalPrice(product.originalPrice || "");
      setCategory(product.category || "");
      setOldImages(product.images || []);
    }
  }, [product]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      <div className="w-full md:w-1/5 bg-white shadow-md border-r">
        <Sidebar />
      </div>

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
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Prices */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Discounted Price
                    </label>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Original Price
                    </label>
                    <input
                      type="number"
                      value={originalPrice}
                      onChange={(e) => setOriginalPrice(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    rows="4"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 resize-none"
                  ></textarea>
                </div>

                {/* Category & Stock */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Stock
                    </label>
                    <input
                      type="number"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Images
                  </label>
                  <input
                    type="file"
                    name="images"
                    accept="image/*"
                    multiple
                    onChange={onImagesChange}
                    className="w-full border border-gray-300 rounded-lg p-3"
                  />

                  <div className="flex flex-wrap gap-3 mt-3">
                    {/* Old Images */}
                    {oldImages &&
                      oldImages.map((img, i) => (
                        <img
                          key={i}
                          src={img.image || img.url}
                          alt="Old Product"
                          className="h-20 w-20 object-cover rounded-md border"
                        />
                      ))}

                    {/* New Previews */}
                    {imagesPreview.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt="Preview"
                        className="h-20 w-20 object-cover rounded-md border"
                      />
                    ))}
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
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
