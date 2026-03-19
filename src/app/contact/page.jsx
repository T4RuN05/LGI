"use client";

import { Mail, Phone, Instagram, ExternalLink } from "lucide-react";
import toast from "react-hot-toast";
import { useLocale } from "@/context/LocaleContext";
import { useAuth } from "@/context/AuthContext";
import AuthModal from "../components/AuthModal";
import { useState } from "react";
import { motion } from "framer-motion";

const blurReveal = {
  hidden: { opacity: 0, filter: "blur(10px)", y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
      delay,
    },
  }),
};

export default function ContactPage() {
  const { t } = useLocale();
  const { user, hydrated } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const handleMail = async (e) => {
    e.preventDefault();
    if (!hydrated) return;

    if (!user) {
      setShowModal(true);
      return;
    }

    const form = e.currentTarget;
    const formData = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      email: form.email.value,
      message: form.message.value,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/contact`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success("Message sent successfully!");
        form.reset();
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Server error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen py-3 px-4 md:px-6">
      <div className="max-w-[1800px] mx-auto">

        {/* TITLE STRIP */}
        <motion.div
          variants={blurReveal}
          initial="hidden"
          animate="visible"
          custom={0.1}
          className="bg-[var(--component-bg)] flex items-center justify-center px-6 py-4 mb-8 shadow-md rounded-md"
        >
          <h2 className="tracking-[0.3em] text-sm md:text-2xl font-semibold uppercase">
            {t("contact")}
          </h2>
        </motion.div>

        {/* MAIN */}
        <motion.main
          variants={blurReveal}
          initial="hidden"
          animate="visible"
          custom={0.2}
          className="bg-[var(--component-bg)] shadow-md p-10 md:p-14 rounded-md"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0">

            {/* LEFT SIDE */}
            <div className="flex flex-col md:pr-12 border-black/10 pb-8 md:pb-0 border-b md:border-b-0 md:border-r">
              <div className="flex-1" />

              <div className="flex flex-col space-y-6">

                <motion.p
                  variants={blurReveal}
                  initial="hidden"
                  animate="visible"
                  custom={0.3}
                  className="text-4xl text-[var(--primary)] uppercase mb-3 tracking-tight"
                >
                  {t("getInTouch")}
                </motion.p>

                <motion.div
                  variants={blurReveal}
                  initial="hidden"
                  animate="visible"
                  custom={0.35}
                >
                  <p className="text-[var(--primary)]/70 text-base max-w-sm leading-relaxed">
                    {t("contactDescription")}
                  </p>
                </motion.div>

                <motion.div
                  variants={blurReveal}
                  initial="hidden"
                  animate="visible"
                  custom={0.4}
                  className="space-y-4"
                >
                  <a
                    href="tel:+918286280499"
                    className="flex w-fit items-center gap-3 text-[var(--primary)] hover:opacity-70 transition-opacity whitespace-nowrap"
                  >
                    <Phone size={16} strokeWidth={1.5} />
                    <span className="text-sm underline underline-offset-4">
                      +91 82862 80499
                    </span>
                  </a>

                  <a
                    href="https://instagram.com/lordganeshaimpex"
                    target="_blank"
                    rel="noreferrer"
                    className="flex w-fit items-center gap-3 text-[var(--primary)] hover:opacity-70 transition-opacity whitespace-nowrap"
                  >
                    <Instagram size={16} strokeWidth={1.5} />
                    <span className="text-sm underline underline-offset-4">
                      @lordganeshaimpex
                    </span>
                  </a>

                  <a
                    href="mailto:www.lordganeshaimpex1980@gmail.com"
                    className="flex items-center w-fit gap-3 text-[var(--primary)] hover:opacity-70 transition-opacity"
                  >
                    <Mail size={16} strokeWidth={1.5} />
                    <span className="text-sm underline underline-offset-4 break-all">
                      www.lordganeshaimpex1980@gmail.com
                    </span>
                  </a>

                  <a
                    href="https://in900422812.trustpass.alibaba.com"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center w-fit gap-3 text-[var(--primary)] hover:opacity-70 transition-opacity"
                  >
                    <ExternalLink size={16} strokeWidth={1.5} />
                    <span className="text-sm underline underline-offset-4 break-all">
                      https://in900422812.trustpass.alibaba.com
                    </span>
                  </a>
                </motion.div>
              </div>

              <div className="flex-1" />
            </div>

            {/* RIGHT SIDE */}
            <motion.div
              variants={blurReveal}
              initial="hidden"
              animate="visible"
              custom={0.45}
              className="flex flex-col justify-center md:pl-12"
            >
              <form onSubmit={handleMail} className="flex flex-col gap-5">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    name="firstName"
                    placeholder={t("firstName")}
                    className="bg-[var(--page-bg)] border border-black/10 p-3"
                  />
                  <input
                    name="lastName"
                    placeholder={t("lastName")}
                    className="bg-[var(--page-bg)] border border-black/10 p-3"
                  />
                </div>

                <input
                  name="email"
                  type="email"
                  defaultValue={user?.email || ""}
                  readOnly={!!user}
                  placeholder={t("email")}
                  className={`bg-[var(--page-bg)] border border-black/10 p-3 ${
                    user ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                />

                <textarea
                  name="message"
                  rows={8}
                  placeholder={t("message")}
                  className="bg-[var(--page-bg)] border border-black/10 p-3 resize-none"
                />

                <div className="flex justify-center mt-2">
                  <button
                    type="submit"
                    className="border border-black px-6 py-2 hover:bg-black hover:text-white transition"
                  >
                    {t("sendMessage")}
                  </button>
                </div>

              </form>
            </motion.div>

          </div>
        </motion.main>

        {showModal && (
          <AuthModal
            onClose={() => setShowModal(false)}
            message="Please login to send a message"
          />
        )}
      </div>
    </div>
  );
}