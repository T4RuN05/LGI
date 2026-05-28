import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Shared Cart";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

async function getSharedCart(id) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/share/${id}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
}

export default async function Image({ params }) {
  const { id } = await params;
  const cart = await getSharedCart(id);

  if (!cart || !cart.items || cart.items.length === 0) {
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 64,
            background: "white",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div style={{ color: "#2D2319", fontWeight: "bold" }}>Shared Cart</div>
          <div style={{ color: "#8a7d71", fontSize: 32, marginTop: 20 }}>No items found</div>
        </div>
      ),
      { ...size }
    );
  }

  // Extract first image from each product
  const images = cart.items
    .map((item) => item.image)
    .filter((img) => img && img !== "");

  const totalProducts = cart.items.length;
  const moreCount = totalProducts > 4 ? totalProducts - 4 : 0;
  
  // Create a base white background container
  const containerStyle = {
    background: "#F9F7F4", // match site theme
    width: "100%",
    height: "100%",
    display: "flex",
    position: "relative",
  };

  const imageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  };

  const imageWrapperStyle = {
    display: "flex",
    background: "white",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  };

  let content;

  if (images.length === 1) {
    content = (
      <div style={{ ...imageWrapperStyle, width: "100%", height: "100%" }}>
        <img src={images[0]} style={imageStyle} />
      </div>
    );
  } else if (images.length === 2) {
    content = (
      <div style={{ display: "flex", width: "100%", height: "100%", gap: "4px", padding: "4px" }}>
        <div style={{ ...imageWrapperStyle, width: "50%", height: "100%", borderRadius: "12px" }}>
          <img src={images[0]} style={imageStyle} />
        </div>
        <div style={{ ...imageWrapperStyle, width: "50%", height: "100%", borderRadius: "12px" }}>
          <img src={images[1]} style={imageStyle} />
        </div>
      </div>
    );
  } else if (images.length === 3) {
    content = (
      <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", gap: "4px", padding: "4px" }}>
        <div style={{ display: "flex", width: "100%", height: "50%", gap: "4px" }}>
          <div style={{ ...imageWrapperStyle, width: "50%", height: "100%", borderRadius: "12px" }}>
            <img src={images[0]} style={imageStyle} />
          </div>
          <div style={{ ...imageWrapperStyle, width: "50%", height: "100%", borderRadius: "12px" }}>
            <img src={images[1]} style={imageStyle} />
          </div>
        </div>
        <div style={{ display: "flex", width: "100%", height: "50%", justifyContent: "center" }}>
          <div style={{ ...imageWrapperStyle, width: "50%", height: "100%", borderRadius: "12px" }}>
            <img src={images[2]} style={imageStyle} />
          </div>
        </div>
      </div>
    );
  } else {
    // 4 or more
    content = (
      <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", gap: "4px", padding: "4px", position: "relative" }}>
        <div style={{ display: "flex", width: "100%", height: "50%", gap: "4px" }}>
          <div style={{ ...imageWrapperStyle, width: "50%", height: "100%", borderRadius: "12px" }}>
            <img src={images[0]} style={imageStyle} />
          </div>
          <div style={{ ...imageWrapperStyle, width: "50%", height: "100%", borderRadius: "12px" }}>
            <img src={images[1]} style={imageStyle} />
          </div>
        </div>
        <div style={{ display: "flex", width: "100%", height: "50%", gap: "4px" }}>
          <div style={{ ...imageWrapperStyle, width: "50%", height: "100%", borderRadius: "12px" }}>
            <img src={images[2]} style={imageStyle} />
          </div>
          <div style={{ ...imageWrapperStyle, width: "50%", height: "100%", borderRadius: "12px" }}>
            {images[3] ? <img src={images[3]} style={imageStyle} /> : null}
          </div>
        </div>
      </div>
    );
  }

  const badge = moreCount > 0 ? (
    <div
      style={{
        position: "absolute",
        bottom: 40,
        right: 40,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        color: "white",
        width: 120,
        height: 120,
        borderRadius: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 42,
        fontWeight: "bold",
        boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
      }}
    >
      +{moreCount}
    </div>
  ) : null;

  return new ImageResponse(
    (
      <div style={containerStyle}>
        {content}
        {badge}
      </div>
    ),
    { ...size }
  );
}
