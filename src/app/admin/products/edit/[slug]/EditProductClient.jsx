"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import MinimalEditor from "@/app/components/admin/MinimalEditor";
import { FiUpload, FiX } from "react-icons/fi";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import toast from "react-hot-toast";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

function SortableImage({
  img,
  index,
  activeImage,
  setActiveImage,
  handleRemoveImage,
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: img.url });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative group">
      {/* IMAGE */}
      <img
        src={img.url}
        onClick={() => setActiveImage(img.url)}
        className={`w-20 h-20 object-cover rounded-md border transition hover:shadow-md ${
          activeImage === img.url ? "border-black" : "border-gray-300"
        }`}
      />

      {/* DELETE BUTTON */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handleRemoveImage(index);
        }}
        className="absolute top-1 right-1 
          bg-black text-white 
          w-5 h-5 rounded-full text-xs 
          flex items-center justify-center 
          z-10"
      >
        ✕
      </button>

      {/* DRAG HANDLE */}
      <div
        {...attributes}
        {...listeners}
        className="absolute bottom-1 left-1 bg-white/80 text-xs px-2 py-0.5 rounded cursor-grab active:cursor-grabbing"
      >
        ☰
      </div>
    </div>
  );
}

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
  const sensors = useSensors(useSensor(PointerSensor));

  // ================= FETCH PRODUCT =================
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products/${slug}`,
      );

      const data = await res.json();
      if (!res.ok) {
        router.push("/admin/products");
        return;
      }

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
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/categories`,
      );
      const data = await res.json();
      if (!res.ok) {
        router.push("/admin/products");
        return;
      }
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

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products/upload`,
      {
        method: "POST",
        credentials: "include",
        body: formData,
      },
    );

    const data = await res.json();
    if (!res.ok) {
      router.push("/admin/products");
      return;
    }

    setImages((prev) => [...prev, ...data]);

    if (!activeImage && data.length > 0) {
      setActiveImage(data[0].url);
    }
  };

const handleRemoveImage = (index) => {
  const updated = images.filter((_, i) => i !== index);
  const removedImage = images[index];

  setImages(updated);

  if (activeImage === removedImage.url) {
    setActiveImage(updated[0]?.url || null);
  }

  toast.success("Image removed");
};

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = images.findIndex((img) => img.url === active.id);
    const newIndex = images.findIndex((img) => img.url === over.id);

    const updated = arrayMove(images, oldIndex, newIndex);
    setImages(updated);
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
        `${process.env.NEXT_PUBLIC_API_URL}/api/products/slug/${slug}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
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
        router.push("/admin/products");
        return;
      }

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
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={images.map((img) => img.url)}
                  strategy={verticalListSortingStrategy}
                >
                  <div
                    ref={thumbnailsRef}
                    className="flex flex-col gap-3 max-h-[360px] overflow-hidden"
                  >
                    {images.map((img, index) => (
                      <SortableImage
                        key={img.url}
                        img={img}
                        index={index}
                        activeImage={activeImage}
                        setActiveImage={setActiveImage}
                        handleRemoveImage={handleRemoveImage}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>

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
