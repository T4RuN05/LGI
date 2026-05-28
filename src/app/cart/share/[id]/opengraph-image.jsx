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

  // Extract first image from each product and forcefully optimize for Satori (must be JPG, small size)
  const images = cart.items
    .map((item) => {
      let url = item.image;
      if (!url) return null;
      
      // Satori crashes on WebP and large images. Cloudinary allows us to force JPG and downscale.
      if (url.includes("res.cloudinary.com")) {
        url = url.replace("/upload/", "/upload/w_600,h_600,c_fill,f_jpg,q_80/");
        url = url.replace("f_auto,q_auto/", "");
        url = url.replace("f_auto/", "");
      }
      return url;
    })
    .filter(Boolean);

  const totalProducts = cart.items.length;
  const moreCount = totalProducts > 4 ? totalProducts - 4 : 0;
  
  // Create a base background container
  const containerStyle = {
    background: "#ffffff",
    width: "100%",
    height: "100%",
    display: "flex",
    padding: "8px",
    position: "relative",
  };

  const imageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  };

  const imageWrapperStyle = {
    display: "flex",
    background: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  };

  let content;

  if (images.length === 1) {
    content = (
      <div style={{ ...imageWrapperStyle, width: "100%", height: "100%", borderRadius: "16px" }}>
        <img src={images[0]} style={imageStyle} />
      </div>
    );
  } else if (images.length === 2) {
    content = (
      <div style={{ display: "flex", width: "100%", height: "100%", gap: "8px" }}>
        <div style={{ ...imageWrapperStyle, width: "50%", height: "100%", borderRadius: "16px" }}>
          <img src={images[0]} style={imageStyle} />
        </div>
        <div style={{ ...imageWrapperStyle, width: "50%", height: "100%", borderRadius: "16px" }}>
          <img src={images[1]} style={imageStyle} />
        </div>
      </div>
    );
  } else if (images.length === 3) {
    content = (
      <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", gap: "8px" }}>
        <div style={{ display: "flex", width: "100%", height: "50%", gap: "8px" }}>
          <div style={{ ...imageWrapperStyle, width: "50%", height: "100%", borderRadius: "16px" }}>
            <img src={images[0]} style={imageStyle} />
          </div>
          <div style={{ ...imageWrapperStyle, width: "50%", height: "100%", borderRadius: "16px" }}>
            <img src={images[1]} style={imageStyle} />
          </div>
        </div>
        <div style={{ display: "flex", width: "100%", height: "50%", justifyContent: "center" }}>
          <div style={{ ...imageWrapperStyle, width: "50%", height: "100%", borderRadius: "16px" }}>
            <img src={images[2]} style={imageStyle} />
          </div>
        </div>
      </div>
    );
  } else {
    // 4 or more
    content = (
      <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", gap: "8px" }}>
        <div style={{ display: "flex", width: "100%", height: "50%", gap: "8px" }}>
          <div style={{ ...imageWrapperStyle, width: "50%", height: "100%", borderRadius: "16px" }}>
            <img src={images[0]} style={imageStyle} />
          </div>
          <div style={{ ...imageWrapperStyle, width: "50%", height: "100%", borderRadius: "16px" }}>
            <img src={images[1]} style={imageStyle} />
          </div>
        </div>
        <div style={{ display: "flex", width: "100%", height: "50%", gap: "8px" }}>
          <div style={{ ...imageWrapperStyle, width: "50%", height: "100%", borderRadius: "16px" }}>
            <img src={images[2]} style={imageStyle} />
          </div>
          <div style={{ ...imageWrapperStyle, width: "50%", height: "100%", borderRadius: "16px", position: "relative" }}>
            {images[3] ? <img src={images[3]} style={imageStyle} /> : null}
            {moreCount > 0 && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: 64,
                  fontWeight: "bold",
                }}
              >
                +{moreCount}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return new ImageResponse(
    (
      <div style={containerStyle}>
        {content}
      </div>
    ),
    { ...size }
  );
}
