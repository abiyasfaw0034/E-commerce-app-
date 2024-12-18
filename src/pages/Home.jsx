import { useNavigate } from "react-router-dom";
import NavBar2 from "../ui/NavBar2";
import groceryImage from "../assets/groceryImage.jpg";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Navigation */}
      <NavBar2 />

      {/* Hero Section */}
      <section
        className="h-[70vh] bg-cover bg-center flex items-center justify-center text-white"
        style={{
          backgroundImage: `url(${groceryImage})`,
        }}
      >
        <div className="bg-black bg-opacity-50 p-8 rounded-lg text-center max-w-3xl">
          <h1 className="text-5xl font-bold mb-4">
            We Bring the Store to Your Door
          </h1>
          <p className="text-lg mb-6">
            Get fresh, organic produce and sustainably sourced groceries
            delivered to your doorstep.
          </p>
          <button
            onClick={() => navigate("/product")}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded transition"
          >
            Shop Now
          </button>
        </div>
      </section>

      {/* About Us Preview */}
      <section className="py-12 px-6">
        <h2 className="text-3xl font-bold text-center mb-6">About Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 bg-white shadow-md rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
            <p>
              Deliver fresh, sustainable groceries and provide a seamless
              shopping experience.
            </p>
          </div>
          <div className="p-5 bg-white shadow-md rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
            <p>
              Empower healthy living through organic, high-quality food and
              reliable delivery.
            </p>
          </div>
          <div className="p-5 bg-white shadow-md rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Our Team</h3>
            <p>
              A passionate group of people dedicated to enhancing your grocery
              shopping experience.
            </p>
          </div>
        </div>
        <div className="text-center mt-6">
          <button
            onClick={() => navigate("/about")}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition"
          >
            Learn More
          </button>
        </div>
      </section>

      {/* Contact Preview */}
      <section className="py-12 px-6 bg-gray-100 dark:bg-gray-800">
        <h2 className="text-3xl font-bold text-center mb-6">Get in Touch</h2>
        <p className="text-center mb-8">
          Connect with us on social media or send us an email for inquiries.
        </p>
        <div className="flex justify-center gap-6">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Facebook
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500 transition"
          >
            Twitter
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition"
          >
            Instagram
          </a>
          <a
            href="mailto:info@mamuye-shop.com"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            Email Us
          </a>
        </div>
        <div className="text-center mt-6">
          <button
            onClick={() => navigate("/contact")}
            className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded transition"
          >
            Contact Us
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-sm bg-gray-200 dark:bg-gray-800">
        &copy; {new Date().getFullYear()} Mamuye Shop. All Rights Reserved.
      </footer>
    </div>
  );
}

export default Home;
