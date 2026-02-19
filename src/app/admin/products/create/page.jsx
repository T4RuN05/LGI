"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { FiUpload, FiX } from "react-icons/fi";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import MinimalEditor from "@/app/components/admin/MinimalEditor";
import toast from "react-hot-toast";

export default function CreateProductPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState("attributes");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [form, setForm] = useState({
    title: "",
    moq: "",
    moqUnit: "",
    priceMin: "",
    priceMax: "",
    category: "",
    attributes: "",
    description: "",
    faq: "",
  });
  const [uploading, setUploading] = useState(false);
  const thumbnailsRef = useRef(null);

  const scrollThumbs = (direction) => {
    if (!thumbnailsRef.current) return;

    thumbnailsRef.current.scrollBy({
      top: direction === "up" ? -120 : 120,
      behavior: "smooth",
    });
  };

  /* =========================
      IMAGE UPLOAD HANDLING
  ========================== */

  const uploadImages = async (files) => {
    if (!files?.length) return;

    const formData = new FormData();

    for (let file of files) {
      formData.append("images", file);
    }

    try {
      setUploading(true);
      const toastId = toast.loading("Uploading images...");

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error("Upload failed", { id: toastId });
        return;
      }

      setImages((prev) => [...prev, ...data]);

      toast.success("Images uploaded", { id: toastId });
    } catch (err) {
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e) => {
    uploadImages(e.target.files);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    uploadImages(e.dataTransfer.files);
  };

  const removeImage = (index) => {
    const updated = [...images];
    updated.splice(index, 1);
    setImages(updated);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`);
      const data = await res.json();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  /* =========================
      FORM HANDLING
  ========================== */

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Prevent negative values manually
    if (["moq", "priceMin", "priceMax"].includes(name)) {
      if (value < 0) return;
    }

    setForm({ ...form, [name]: value });
  };

  const handleEditorChange = (value) => {
    setForm({ ...form, [activeTab]: value });
  };

  /* =========================
      SUBMIT
  ========================== */

  const handleSubmit = async () => {
    if (!form.title) return toast.error("Title is required");

    if (!form.moq || form.moq <= 0)
      return toast.error("MOQ must be greater than 0");

    if (form.priceMin < 0 || form.priceMax < 0)
      return toast.error("Price cannot be negative");

    if (Number(form.priceMax) < Number(form.priceMin))
      return toast.error("Max price must be greater than Min price");

    if (!form.moqUnit) return toast.error("Please select MOQ Unit");

    if (images.length === 0)
      return toast.error("Please upload at least one image");

    try {
      setLoading(true);
      const toastId = toast.loading("Creating product...");

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({
          title: form.title,
          moq: Number(form.moq),
          moqUnit: form.moqUnit,
          priceRange: {
            min: Number(form.priceMin),
            max: Number(form.priceMax),
          },
          category: form.category,
          attributes: form.attributes,
          description: form.description,
          faq: form.faq,
          images: images,
        }),
      });

      if (!res.ok) {
        toast.error("Failed to create product", { id: toastId });
        return;
      }

      toast.success("Product created successfully", { id: toastId });

      setTimeout(() => {
        router.push("/admin/products");
      }, 800);
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
      UI
  ========================== */

  return (
    <section className="bg-[#EBE2DB] min-h-screen py-10">
      <div className="max-w-[1400px] mx-auto space-y-10">
        {/* TOP SECTION */}
        <div className="bg-[#F2F1EC] shadow-md p-8 rounded-md flex gap-10">
          {/* IMAGE GALLERY SECTION */}
          <div className="w-1/2 flex gap-6 h-[340px]">
            {/* LEFT: THUMBNAILS (SCROLLABLE) */}
            <div className="flex flex-col items-center">
              {/* UP ARROW */}
              <button
                onClick={() => scrollThumbs("up")}
                className="mb-2 p-2 bg-white rounded-full shadow hover:scale-105 transition"
              >
                <FaChevronUp size={12} />
              </button>

              {/* THUMBNAIL LIST */}
              <div
                ref={thumbnailsRef}
                className="flex flex-col gap-3 max-h-[360px] overflow-y-auto pr-2 no-scrollbar"
              >
                {images?.map((img, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={img.url}
                      onClick={() => setSelectedImage(index)}
                      className={`w-20 h-20 object-contain border rounded-md cursor-pointer transition hover:shadow-md ${
                        selectedImage === index
                          ? "border-black"
                          : "border-gray-300"
                      }`}
                    />

                    <button
                      onClick={(e) => {
                        e.stopPropagation();

                        const updated = images.filter((_, i) => i !== index);
                        setImages(updated);

                        if (selectedImage >= updated.length) {
                          setSelectedImage(updated.length - 1);
                        }
                      }}
                      className="absolute top-1 right-1 
                   bg-black text-white 
                   w-5 h-5 rounded-full text-xs 
                   flex items-center justify-center 
                   opacity-0 group-hover:opacity-100 
                   transition"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              {/* DOWN ARROW */}
              <button
                onClick={() => scrollThumbs("down")}
                className="mt-2 p-2 bg-white rounded-full shadow hover:scale-105 transition"
              >
                <FaChevronDown size={12} />
              </button>
            </div>

            {/* RIGHT: UPLOAD BOX (FIXED HEIGHT) */}
            <div
              className={`flex-1 border-2 border-dashed rounded-md 
bg-[#f7f5f2] flex items-center justify-center 
text-center cursor-pointer transition h-full
${uploading ? "opacity-60 pointer-events-none" : ""}
`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="imageUpload"
              />

              {uploading ? (
                <div className="flex flex-col items-center justify-center">
                  <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin mb-3" />
                  <p className="text-sm">Uploading...</p>
                </div>
              ) : (
                <label htmlFor="imageUpload" className="cursor-pointer">
                  <FiUpload size={28} className="mx-auto mb-3" />
                  <p>Add Photos</p>
                </label>
              )}
            </div>
          </div>

          {/* FORM FIELDS */}
          <div className="w-1/2 space-y-4">
            <input
              type="text"
              name="title"
              placeholder="ADD TITLE"
              value={form.title}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#e8ded5] outline-none"
            />

            <div className="flex gap-4">
              <input
                type="number"
                name="moq"
                min="1"
                value={form.moq}
                placeholder="Enter MOQ"
                onChange={handleChange}
                className="w-2/3 px-4 py-2 bg-[#e8ded5] outline-none"
              />
              <select
                name="moqUnit"
                value={form.moqUnit}
                onChange={handleChange}
                className="w-1/3 px-4 py-2 bg-[#e8ded5] outline-none"
              >
                <option value="">Select Unit</option>
                <option value="pieces">Pieces</option>
                <option value="dozens">Dozens</option>
                <option value="pairs">Pairs</option>
                <option value="set">Set</option>
              </select>
            </div>

            <div className="flex gap-4">
              <input
                type="number"
                min="0"
                name="priceMin"
                value={form.priceMin}
                placeholder="Min Price"
                onChange={handleChange}
                className="w-1/2 px-4 py-2 bg-[#e8ded5] outline-none"
              />
              <input
                type="number"
                min="0"
                name="priceMax"
                value={form.priceMax}
                placeholder="Max Price"
                onChange={handleChange}
                className="w-1/2 px-4 py-2 bg-[#e8ded5] outline-none"
              />
            </div>

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#e8ded5] outline-none"
            >
              <option value="">Select Category</option>

              {categories.flatMap((cat) => [
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>,
                ...(cat.children || []).map((child) => (
                  <option key={child._id} value={child._id}>
                    └ {child.name}
                  </option>
                )),
              ])}
            </select>
          </div>
        </div>

        {/* TABS + EDITOR */}
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

        {/* SAVE */}
        <div className="text-right">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-black text-white px-8 py-3 hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Saving..." : "SAVE PRODUCT"}
          </button>
        </div>
      </div>
    </section>
  );
}
