import { useState } from "react";

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="bg-green-700 text-white px-4 py-2 rounded w-full">
        All Mart Supermarket
      </button>
      {isOpen && (
        <ul className="absolute left-0 mt-1 w-full bg-white border border-gray-300 rounded shadow-lg z-10">
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
            Canned & Bottled
          </li>
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
            Local Flours & Grains
          </li>
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
            Water & Beverages
          </li>
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
            Milk & Dairy Products
          </li>
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
            Pasta & Rice
          </li>
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
            Nuts & Seeds
          </li>
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
            Spices & Herbs
          </li>
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
            Baking Essentials
          </li>
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
