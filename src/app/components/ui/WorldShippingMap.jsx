"use client";

import { useEffect, useRef, useState } from "react";

export default function WorldShippingMap() {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);

  const [tooltip, setTooltip] = useState(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const hoveredCountryRef = useRef(null);
  const [start, setStart] = useState({ x: 0, y: 0 });

  const highlighted = {
    US: {
      name: "United States of America",
      selector: 'path[class="United States"]',
      color: "#9C846C",
      hoverColor: "#745F4D",
    },
    CA: {
      name: "Canada",
      selector: ".Canada",
      color: "#9C846C",
      hoverColor: "#745F4D",
    },
    ES: {
      name: "Spain",
      selector: "#ES",
      color: "#9C846C",
      hoverColor: "#745F4D",
    },
    FR: {
      name: "France",
      selector: "#FR",
      color: "#9C846C",
      hoverColor: "#745F4D",
    },
    DE: {
      name: "Germany",
      selector: "#DE",
      color: "#9C846C",
      hoverColor: "#745F4D",
    },
    IT: {
      name: "Italy",
      selector: "#IT",
      color: "#9C846C",
      hoverColor: "#745F4D",
    },
    GB: {
      name: "United Kingdom",
      selector: "#GB",
      color: "#9C846C",
      hoverColor: "#745F4D",
    },
    AE: {
      name: "United Arab Emirates",
      selector: "#AE",
      color: "#9C846C",
      hoverColor: "#745F4D",
    },
    SA: {
      name: "Saudi Arabia",
      selector: "#SA",
      color: "#9C846C",
      hoverColor: "#745F4D",
    },
    QA: {
      name: "Qatar",
      selector: "#QA",
      color: "#9C846C",
      hoverColor: "#745F4D",
    },
    KW: {
      name: "Kuwait",
      selector: "#KW",
      color: "#9C846C",
      hoverColor: "#745F4D",
    },
    BH: {
      name: "Bahrain",
      selector: "#BH",
      color: "#9C846C",
      hoverColor: "#745F4D",
    },
    OM: {
      name: "Oman",
      selector: "#OM",
      color: "#9C846C",
      hoverColor: "#745F4D",
    },

    // 🇮🇳 INDIA (BLUE)
    IN: {
      name: "India",
      selector: "#IN",
      color: "#A3B5C3",
      hoverColor: "#93CAEF",
      isMain: true,
    },
  };

  useEffect(() => {
    const wrapper = wrapperRef.current;

    const handleMouseMove = (e) => {
      if (!hoveredCountryRef.current) {
        setTooltip(null);
        return;
      }

      const rect = wrapper.getBoundingClientRect();

      setTooltip({
        name: hoveredCountryRef.current.name,
        isMain: hoveredCountryRef.current.isMain || false,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    wrapper.addEventListener("mousemove", handleMouseMove);

    return () => {
      wrapper.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // ---------- LOAD SVG ----------
  useEffect(() => {
    fetch("/world.svg")
      .then((res) => res.text())
      .then((svgText) => {
        const container = containerRef.current;
        container.innerHTML = svgText;

        const svg = container.querySelector("svg");

        // IMPORTANT: no transform on svg itself
        svg.style.width = "100%";
        svg.style.height = "100%";

        Object.values(highlighted).forEach((country) => {
          const elements = svg.querySelectorAll(country.selector);

          elements.forEach((el) => {
            el.style.fill = country.color;
            el.style.transition = "all 0.25s ease";
            el.style.cursor = "pointer";

            el.addEventListener("mouseenter", () => {
              hoveredCountryRef.current = country;

              setTooltip({
                name: country.name,
                isMain: country.isMain || false,
                x: 0,
                y: 0,
              });
            });

            el.addEventListener("mouseleave", () => {
              hoveredCountryRef.current = null;
              setTooltip(null);
            });

            el.addEventListener("mousemove", (e) => {
              const rect = wrapperRef.current.getBoundingClientRect();

              setTooltip({
                name: country.name,
                isMain: country.isMain || false,
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
              });
            });
          });
        });
      });
  }, []);

  // ---------- ZOOM + PAN ----------
  useEffect(() => {
    const wrapper = wrapperRef.current;

    const handleMouseLeave = () => {
      setTooltip(null);
    };

    wrapper.addEventListener("mouseleave", handleMouseLeave);

    const handleWheel = (e) => {
      e.preventDefault();
      const delta = e.deltaY * -0.0015;
      setScale((prev) => Math.min(Math.max(prev + delta, 1), 3));
    };

    const handleMouseDown = (e) => {
      setIsDragging(true);
      setStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;

      const newX = e.clientX - start.x;
      const newY = e.clientY - start.y;

      const containerRect = wrapper.getBoundingClientRect();
      const maxX = (containerRect.width * (scale - 1)) / 2;
      const maxY = (containerRect.height * (scale - 1)) / 2;

      setPosition({
        x: Math.min(maxX, Math.max(-maxX, newX)),
        y: Math.min(maxY, Math.max(-maxY, newY)),
      });
    };

    const handleMouseUp = () => setIsDragging(false);

    wrapper.addEventListener("wheel", handleWheel);
    wrapper.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      wrapper.removeEventListener("wheel", handleWheel);
      wrapper.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      wrapper.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, position, start, scale]);

  const getFlag = (name) => {
    const map = {
      Canada: "ca",
      "United States of America": "us",
      Spain: "es",
      France: "fr",
      Germany: "de",
      Italy: "it",
      "United Kingdom": "gb",
      "United Arab Emirates": "ae",
      "Saudi Arabia": "sa",
      Qatar: "qa",
      Kuwait: "kw",
      Bahrain: "bh",
      Oman: "om",
      India: "in",
    };
    return map[name] || "us";
  };

  return (
    <div className="relative w-full bg-[#F2F1EC] rounded-md overflow-hidden">
      <div
        ref={wrapperRef}
        className="w-full h-full overflow-hidden cursor-grab active:cursor-grabbing"
      >
        <div
          ref={containerRef}
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transition: isDragging ? "none" : "transform 0.2s ease",
            transformOrigin: "center center",
            width: "100%",
            height: "100%",
          }}
        />
      </div>
      {tooltip && (
        <div
          className="absolute bg-white shadow-xl px-5 py-3 rounded-lg flex flex-col gap-1 text-sm pointer-events-none"
          style={{
            left: tooltip.x,
            top: tooltip.y - 40,
            transform: "translate(-50%, -100%)",
          }}
        >
          <div className="flex items-center gap-3">
            <img
              src={`https://flagcdn.com/w40/${getFlag(tooltip.name)}.png`}
              className="w-6 h-4"
            />
            <span className="font-medium">{tooltip.name}</span>
          </div>

          {tooltip.isMain && (
            <span className="text-xs text-blue-600 font-semibold tracking-wide">
              Main Exporter
            </span>
          )}
        </div>
      )}
    </div>
  );
}
