"use client";

import { Mail, Phone, Instagram, ExternalLink } from "lucide-react";
import toast from "react-hot-toast";
import { useLocale } from "@/context/LocaleContext";

export default function ContactPage() {

  const { t } = useLocale();
  const handleMail = async (e) => {
    e.preventDefault();

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
        },
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
    <div className="min-h-screen py-3">
      <div className="max-w-[1800px] mx-auto">
        {/* TITLE STRIP */}
        <div
          className="bg-[var(--component-bg)]
            flex items-center justify-center
            px-6 py-4 mb-8
            shadow-md"
        >
          <h2 className="tracking-[0.3em] text-2xl font-semibold uppercase">
            {t("contact")}
          </h2>
        </div>

        {/* Main Content Area */}
        <main className="bg-[var(--component-bg)] shadow-md p-10 md:p-14">
          <div
            className="grid grid-cols-2 gap-0"
            style={{ alignItems: "stretch" }}
          >
            {/* LEFT SIDE — uses flex with flex-1 spacers to vertically center content */}
            <div className="flex flex-col pr-12 border-r border-black/10">
              <div className="flex-1" />

              <div className="flex flex-col space-y-6">
                <p className="text-4xl text-[var(--primary)] uppercase mb-3 tracking-tight">
                  {t("getInTouch")}
                </p>
                <div>
                  <p className="text-[var(--primary)]/70 text-base max-w-sm leading-relaxed">
                    {t("contactDescription")}
                  </p>
                </div>

                <div className="space-y-4">
                  <a
                    href="tel:+918286280499"
                    className="flex w-fit items-center gap-3 text-[var(--primary)] hover:opacity-70 transition-opacity whitespace-nowrap"
                  >
                    <Phone size={16} strokeWidth={1.5} />
                    <span className="text-sm w-fit underline underline-offset-4 whitespace-nowrap">
                      +91 82862 80499
                    </span>
                  </a>
                  <a
                    href="https://instagram.com/lordganeshaimpex"
                    target="_blank"
                    className="flex w-fit items-center gap-3 text-[var(--primary)] hover:opacity-70 transition-opacity whitespace-nowrap"
                  >
                    <Instagram size={16} strokeWidth={1.5} />
                    <span className="text-sm w-fit underline underline-offset-4 whitespace-nowrap">
                      @lordganeshaimpex
                    </span>
                  </a>
                  <a
                    href="mailto:www.lordganeshaimpex1980@gmail.com"
                    className="flex items-center w-fit gap-3 text-[var(--primary)] hover:opacity-70 transition-opacity whitespace-nowrap"
                  >
                    <Mail size={16} strokeWidth={1.5} />
                    <span className="text-sm underline w-fit underline-offset-4 whitespace-nowrap">
                      www.lordganeshaimpex1980@gmail.com
                    </span>
                  </a>
                  <a
                    href="https://in900422812.trustpass.alibaba.com"
                    target="_blank"
                    className="flex items-center w-fit gap-3 text-[var(--primary)] hover:opacity-70 transition-opacity whitespace-nowrap"
                  >
                    <ExternalLink size={16} strokeWidth={1.5} />
                    <span className="text-sm underline w-fit underline-offset-4 break-all whitespace-nowrap">
                      https://in900422812.trustpass.alibaba.com
                    </span>
                  </a>
                </div>
              </div>

              <div className="flex-1" />
            </div>

            {/* RIGHT SIDE: Contact Form */}
            <div className="flex flex-col justify-center pl-12">
              <form onSubmit={handleMail} className="flex flex-col gap-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-base font-serif text-[var(--primary)]">
                      {t("firstName")}
                    </label>
                    <input
                      name="firstName"
                      type="text"
                      className="bg-[var(--page-bg)] border border-black/10 p-3 focus:outline-none focus:ring-1 focus:ring-[var(--primary)]/30 transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-base font-serif text-[var(--primary)]">
                      {t("lastName")}
                    </label>
                    <input
                      name="lastName"
                      type="text"
                      className="bg-[var(--page-bg)] border border-black/10 p-3 focus:outline-none focus:ring-1 focus:ring-[var(--primary)]/30 transition-all"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-base font-serif text-[var(--primary)]">
                   {t("email")}
                  </label>
                  <input
                    name="email"
                    type="email"
                    className="bg-[var(--page-bg)] border border-black/10 p-3 focus:outline-none focus:ring-1 focus:ring-[var(--primary)]/30 transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-base font-serif text-[var(--primary)]">
                    {t("message")}
                  </label>
                  <textarea
                    name="message"
                    rows={8}
                    className="bg-[var(--page-bg)] border border-black/10 p-3 focus:outline-none focus:ring-1 focus:ring-[var(--primary)]/30 transition-all resize-none"
                  />
                </div>

                <div className="flex justify-center mt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 
                  border border-black px-6 py-2
               hover:bg-black hover:text-white transition cursor-pointer"
                  >
                    {t("sendMessage")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
