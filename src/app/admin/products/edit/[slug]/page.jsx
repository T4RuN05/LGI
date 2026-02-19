"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import MinimalEditor from "@/app/components/admin/MinimalEditor";
import { FiUpload, FiX } from "react-icons/fi";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import toast from "react-hot-toast";

export default function EditProductPage() {
  const { slug } = useParams();
  const router = useRouter();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [activeImage, setActiveImage] = useState(null);
  const [productId, setProductId] = useState(null);
  const [activeTab, setActiveTab] = useState("attributes");
  const thumbnailsRef = useRef(null);

  const [form, setForm] = useState({
    title: "",
    moq: "",
    moqUnit: "pieces",
    priceMin: "",
    priceMax: "",
    category: "",
    attributes: "",
    description: "",
    faq: "",
  });

  // ================= FETCH PRODUCT =================
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`http://localhost:5000/api/products/${slug}`);

      const data = await res.json();

      setProductId(data._id); // ⭐ store ID

      setForm({
        title: data.title || "",
        moq: data.moq || "",
        moqUnit: data.moqUnit || "",
        priceMin: data.priceRange?.min || "",
        priceMax: data.priceRange?.max || "",
        category: data.category?._id || "",
        attributes: data.attributes || "",
        description: data.description || "",
        faq: data.faq || "",
      });

      setImages(data.images || []);
      setActiveImage(data.images?.[0]?.url || null);
      setLoading(false);
    };

    if (slug) fetchProduct();
  }, [slug]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("http://localhost:5000/api/categories");
      const data = await res.json();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  // ================= IMAGE UPLOAD =================
  const uploadImages = async (files) => {
    const formData = new FormData();

    for (let file of files) {
      formData.append("images", file);
    }

    const res = await fetch("http://localhost:5000/api/products/upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
      body: formData,
    });

    const data = await res.json();

    setImages((prev) => [...prev, ...data]);

    if (!activeImage && data.length > 0) {
      setActiveImage(data[0].url);
    }
  };

const handleRemoveImage = async (index) => {
  const imageToDelete = images[index];

  try {
    // 🔥 Delete from Cloudinary
    if (imageToDelete.public_id) {
      await fetch(
        `http://localhost:5000/api/products/image/${imageToDelete.public_id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
    }

    // 🔥 Update local state
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);

    if (activeImage === imageToDelete.url) {
      setActiveImage(updated[0]?.url || null);
    }

    toast.success("Image removed successfully");

  } catch (error) {
    toast.error("Failed to delete image");
  }
};


  // ================= FORM =================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEditorChange = (value) => {
    setForm({ ...form, [activeTab]: value });
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/products/slug/${slug}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
          body: JSON.stringify({
            title: form.title,
            moq: form.moq,
            moqUnit: form.moqUnit,
            priceRange: {
              min: form.priceMin,
              max: form.priceMax,
            },
            category: form.category,
            attributes: form.attributes,
            description: form.description,
            faq: form.faq,
            images,
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to update product");
        return;
      }

      toast.success("Product updated successfully");

      // Optional redirect after small delay
      setTimeout(() => {
        router.push("/admin/products");
      }, 1000);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  return (
    <section className="bg-[#EBE2DB] min-h-screen py-10">
      <div className="max-w-[1400px] mx-auto space-y-10">
        {/* TOP SECTION */}
        <div className="bg-[#F2F1EC] shadow-md p-8 rounded-md flex gap-10">
          {/* LEFT IMAGE SECTION */}
          {/* LEFT IMAGE SECTION */}
          <div className="flex gap-6 w-1/2">
            {/* THUMBNAILS WITH ARROWS */}
            <div className="flex flex-col items-center">
              {/* UP ARROW */}
              <button
                onClick={() => {
                  thumbnailsRef.current?.scrollBy({
                    top: -120,
                    behavior: "smooth",
                  });
                }}
                className="mb-2 p-2 bg-white rounded-full shadow hover:scale-105 transition"
              >
                <FaChevronUp size={12} />
              </button>

              {/* THUMBNAIL LIST */}
              <div
                ref={thumbnailsRef}
                className="flex flex-col gap-3 max-h-[360px] overflow-hidden"
              >
                {images.map((img, index) => (
                  <div key={index} className="relative">
                    <img
                      src={img.url}
                      onClick={() => setActiveImage(img.url)}
                      className={`w-20 h-20 object-cover rounded-md cursor-pointer border transition hover:shadow-md ${
                        activeImage === img.url
                          ? "border-black"
                          : "border-gray-300"
                      }`}
                    />

                    <button
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-0 right-0 bg-black text-white p-1 text-xs rounded-sm"
                    >
                      <FiX size={12} />
                    </button>
                  </div>
                ))}
              </div>

              {/* DOWN ARROW */}
              <button
                onClick={() => {
                  thumbnailsRef.current?.scrollBy({
                    top: 120,
                    behavior: "smooth",
                  });
                }}
                className="mt-2 p-2 bg-white rounded-full shadow hover:scale-105 transition"
              >
                <FaChevronDown size={12} />
              </button>
            </div>

            {/* MAIN IMAGE PREVIEW */}
            <div className="flex-1 flex items-center justify-center bg-white rounded-lg shadow-inner overflow-hidden h-[420px] relative">
              {activeImage ? (
                <img
                  src={activeImage}
                  className="max-h-full max-w-full object-contain transition duration-500 hover:scale-105"
                />
              ) : (
                <span className="text-gray-400">No Image</span>
              )}

              {/* Upload Button */}
              <label className="absolute bottom-4 right-4 bg-black text-white px-3 py-2 text-sm cursor-pointer rounded-md hover:opacity-90 transition">
                <FiUpload />
                <input
                  type="file"
                  multiple
                  hidden
                  onChange={(e) => uploadImages(e.target.files)}
                />
              </label>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="w-1/2 space-y-4">
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#e8ded5]"
            />

            <div className="flex gap-4">
              <input
                name="moq"
                value={form.moq}
                onChange={handleChange}
                className="w-2/3 px-4 py-2 bg-[#e8ded5]"
              />

              <select
                name="moqUnit"
                value={form.moqUnit}
                onChange={handleChange}
                className="w-1/3 px-4 py-2 bg-[#e8ded5]"
              >
                <option value="pieces">Pieces</option>
                <option value="dozens">Dozens</option>
                <option value="pairs">Pairs</option>
                <option value="set">Set</option>
              </select>
            </div>

            <div className="flex gap-4">
              <input
                name="priceMin"
                value={form.priceMin}
                onChange={handleChange}
                className="w-1/2 px-4 py-2 bg-[#e8ded5]"
              />
              <input
                name="priceMax"
                value={form.priceMax}
                onChange={handleChange}
                className="w-1/2 px-4 py-2 bg-[#e8ded5]"
              />
            </div>

            {/* CATEGORY DROPDOWN */}
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#e8ded5]"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* EDITOR SECTION */}
        <div className="bg-[#F2F1EC] shadow-md p-6 rounded-md">
          <div className="flex gap-12 border-b mb-6">
            {["attributes", "description", "faq"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 capitalize ${
                  activeTab === tab
                    ? "border-b-2 border-black font-semibold"
                    : ""
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <MinimalEditor
            content={form[activeTab]}
            onChange={handleEditorChange}
          />
        </div>

        <div className="text-right">
          <button
            onClick={handleUpdate}
            className="bg-black text-white px-8 py-3 cursor-pointer hover:opacity-90 transition"
          >
            UPDATE PRODUCT
          </button>
        </div>
      </div>
    </section>
  );
}
