import { notFound } from "next/navigation";
import Link from "next/link";
import { FiShoppingBag, FiInfo } from "react-icons/fi";

async function getSharedCart(id) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/share/${id}`, {
      next: { revalidate: 60 } // cache for 1 minute
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const cart = await getSharedCart(id);
  
  if (!cart) {
    return {
      title: "Cart Not Found",
    };
  }

  const title = `Shared Cart (${cart.items.length} items)`;
  const description = `View this shared cart with an estimated total of $${cart.totals.min.toFixed(2)} - $${cart.totals.max.toFixed(2)}.`;

  const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL || "https://www.lordganeshaimpex.com";
  const imageUrl = `${baseUrl}/cart/share/${id}/opengraph-image`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    }
  };
}

export default async function SharedCartPage({ params }) {
  const { id } = await params;
  const cart = await getSharedCart(id);

  if (!cart) {
    notFound();
  }

  const { items, totals, createdAt } = cart;
  const expiresAt = new Date(new Date(createdAt).getTime() + 7 * 24 * 60 * 60 * 1000);

  return (
    <div className="min-h-screen bg-[#F9F7F4] py-12 md:py-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-[#e0dbd4] mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold text-[#2D2319] flex items-center gap-3">
                <FiShoppingBag className="text-[#8a7d71]" />
                Shared Cart
              </h1>
              <p className="text-sm text-[#6b5e52] mt-2">
                This is a static shareable cart inquiry. It will expire on {expiresAt.toLocaleDateString()}.
              </p>
            </div>
            <div className="bg-[#f9f5f0] border border-[#e0dbd4] px-5 py-4 rounded-xl text-right">
              <p className="text-sm text-[#8a7d71] mb-1">Estimated Total Range</p>
              <p className="text-xl md:text-2xl font-bold text-[#2D2319]">
                ${totals.min.toFixed(2)} – ${totals.max.toFixed(2)}
              </p>
            </div>
          </div>
          
          <div className="bg-blue-50 text-blue-800 p-4 rounded-lg flex items-start gap-3 text-sm">
            <FiInfo className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <p>
              Prices shown are estimates based on standard USD rates at the time the cart was shared. Actual final pricing may vary based on bulk negotiations, customization, and current exchange rates.
            </p>
          </div>
        </div>

        {/* Items List */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-[#2D2319] ml-2">
            Items ({items.length})
          </h2>
          
          {items.map((item, index) => {
            const itemMin = item.priceRange.min * item.quantity;
            const itemMax = item.priceRange.max * item.quantity;
            
            return (
              <div key={index} className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-[#e0dbd4] flex flex-col sm:flex-row gap-6">
                {/* Image */}
                <div className="w-full sm:w-32 h-32 bg-[#F9F7F4] rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0 border border-[#e0dbd4]">
                  {item.image ? (
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="max-w-full max-h-full object-contain mix-blend-multiply"
                    />
                  ) : (
                    <FiShoppingBag size={32} className="text-[#b0a89e]" />
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <Link href={`/products/${item.slug}`} className="text-lg font-medium text-[#2D2319] hover:underline line-clamp-2">
                      {item.title}
                    </Link>
                    
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <p className="text-xs text-[#8a7d71] mb-0.5">Quantity Requested</p>
                        <p className="text-sm font-medium text-[#2D2319]">{item.quantity} {item.moqUnit}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#8a7d71] mb-0.5">Minimum Order (MOQ)</p>
                        <p className="text-sm font-medium text-[#2D2319]">{item.moq} {item.moqUnit}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#8a7d71] mb-0.5">Unit Price Range</p>
                        <p className="text-sm font-medium text-[#2D2319]">
                          ${item.priceRange.min.toFixed(2)} - ${item.priceRange.max.toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-[#8a7d71] mb-0.5">Subtotal Range</p>
                        <p className="text-sm font-medium text-[#2D2319]">
                          ${itemMin.toFixed(2)} - ${itemMax.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer actions */}
        <div className="mt-8 flex justify-center">
          <Link href="/" className="px-8 py-3 bg-[#2D2319] text-white rounded-xl font-medium hover:bg-[#1a140f] transition shadow-md">
            Return to Store
          </Link>
        </div>
      </div>
    </div>
  );
}
