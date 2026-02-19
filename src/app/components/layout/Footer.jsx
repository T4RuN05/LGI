export default function Footer() {
  return (
    <footer className="bg-[var(--component-bg)] mt-20 shadow-md my-3">
      <div className="max-w-7xl mx-auto px-10 py-20 grid grid-cols-4 gap-16 text-[#2D2319]">

        <div>
          <h3 className="text-lg mb-6 tracking-wide">INFORMATION</h3>
          <ul className="space-y-3 text-sm">
            <li>Name</li>
            <li>Search</li>
            <li>About Us</li>
            <li>Blog</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg mb-6 tracking-wide">CUSTOMER SERVICE</h3>
          <ul className="space-y-3 text-sm">
            <li>Contact Us</li>
            <li>Report Issue</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg mb-6 tracking-wide">COLLECTIONS</h3>
          <ul className="space-y-3 text-sm">
            <li>Bangles</li>
            <li>Earrings</li>
            <li>Rosaries</li>
            <li>Necklaces</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg mb-6 tracking-wide">CONTACT US</h3>
          <ul className="space-y-3 text-sm">
            <li>example123@gmail.com</li>
            <li>+91 9876752789</li>
            <li>Mumbai, Maharashtra</li>
          </ul>
        </div>

      </div>
    </footer>
  );
}
