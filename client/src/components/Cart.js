import axios from "axios";
import { toast } from "react-toastify";
import { MdAdd } from "react-icons/md";
import { FiMinus } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import { useState } from "react";
import { FaLock } from "react-icons/fa";


const Cart = ({
  cart,
  isCartOpen,
  toggleCart,
  handleRemove,
  setCart,
  handleAdd,
  removeFromCart,
  setClicked,
}) => {

  const [enterDetail, setEnterDetail] = useState(false);
  const [showPlaceOrder, setShowPlaceOrder] = useState(false);
  const [showCheckout, setShowCheckout] = useState(true);
  const [contact, setContact] = useState({
    name: '',
    phone: '',
    address: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderData = { items: cart, status: "Pending", customer: { name: contact.name, phone: contact.phone, address: contact.address, } };
    try {
      const res = await axios.post(
        "http://localhost:3001/api/order/postOrder",
        orderData
      );
      setCart([]);
      setClicked([]);
      toast.success(res.data.message);
      setEnterDetail(false);
      setShowPlaceOrder(false);
      setShowCheckout(true);
      setContact([]);
    } catch (err) {
      console.error("Error placing order:", err);
      toast.error(err);
    }
  };

  const getDetail = () => {
    setEnterDetail(true);
    setShowPlaceOrder(true);
    setShowCheckout(false);
  };

  return (
    <div
      className={` rounded-md fixed top-0 right-0 h-screen w-80 bg-white shadow-2xl shadow-primaryGreen transform transition-transform duration-300 z-50 flex flex-col
    ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}>
      <div className="p-4 flex justify-between items-center border-b border-gray-300 ">
        <h2 className="text-xl font-bold">Your Cart</h2>
        <button className="text-red-600" onClick={toggleCart}>
          <FaArrowRight />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {cart.length === 0 ? (
          <p className=" flex justify-center items-center text-lg font-extralight">No items in cart</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="flex justify-between py-2 border-b border-gray-400">
              <div className="m-1">
                <div className="flex flex-row gap-5">
                  <img
                    className="w-12 h-12 rounded-lg"
                    src={item.image}
                    alt="item"></img>
                  <div>
                    <p className="font-semibold text-md"> {item.name}</p>
                    <p className="font-medium ml-1n text-sm">${item.price}</p>
                  </div>
                </div>

                <div className="flex flex-row items-center  ">
                  <div className="flex gap-5 border border-primaryGreen h-8 flex-row rounded-md mt-4 bg-primaryGreen">
                    <button
                      className="text-sand text-lg flex items-center ml-5"
                      onClick={() => handleAdd(item.id)}>
                      <MdAdd />
                    </button>
                    <span className="bg-sand w-8 justify-center flex rounded-md items-center text-sm">
                      {item.quantity}
                    </span>
                    <button
                      className="text-sand text-lg flex items-center mr-5 "
                      onClick={() => handleRemove(item.id)}>
                      <FiMinus />
                    </button>
                  </div>
                  <button
                    className="justify-end flex mt-4 ml-4"
                    onClick={() => removeFromCart(item.id)}>
                    <MdDeleteForever className="w-6 h-6 text-red-500" />
                  </button>
                </div>
              </div>

              <p className="font-semibold text-md">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))
        )}
      </div>

      <div className="p-4 border-t border-gray-300 flex flex-col border-b ">
        <div className="justify-end flex gap-2 font-bold ">
          <span>Subtotal:</span>
          <span>
            ${cart.reduce((sum, i) => sum + i.price * i.quantity, 0).toFixed(2)}
          </span>
        </div>


        {/* PROCCEED TO CHECKOUT BUTTON */}
        {showCheckout && cart.length > 0 ? (
          <button
            onClick={getDetail}
            className={`${cart.length > 0
              ? "bg-primaryGreen  shadow-green-800 shadow-lg "
              : "bg-black bg-opacity-30 shadow-gray-300 "
              }  mt-2 w-full h-fit relative overflow-hidden px-6 py-3 rounded-lg  text-white font-semibold transition-colors duration-300 group`}>
            <span className="relative z-10 flex gap-4 justify-center items-center">
              {" "}
              Proceed to checkout
            </span>

            {cart.length > 0 ? (
              <span className="absolute inset-0 bg-green-800 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
            ) : (
              ""
            )}
          </button>
        ) : (
          ""
        )}

        {/* CUSTOMER DETAIL SECTION */}

        {enterDetail && (
          <div className="flex flex-col gap-3 mt-5 mb-5 ">
            <h4 className="font-bold text-lg mb-2">Contact Details</h4>

            <label className="text-sm font-semibold">Name:</label>
            <input
              type="text"
              value={contact.name}
              onChange={(e) => setContact({ ...contact, name: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1) })}
              className="border shadow-md border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-green-800"
              placeholder="Enter your name"
              maxLength={10}
            />

            <label className="text-sm font-semibold">Phone:</label>
            <input
              type="number"
              maxLength={10}
              value={contact.phone}
              onChange={(e) => setContact({ ...contact, phone: e.target.value })}
              className="border shadow-md border-gray-300  rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-green-800"
              placeholder="Enter your phone number"
            />

            <label className="text-sm font-semibold">Address:</label>
            <input
              type="text"
              value={contact.address}
              onChange={(e) => setContact({ ...contact, address: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1) })}
              className="border shadow-md border-gray-300  rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-green-800"
              placeholder="Enter your address"
            />
          </div>
        )}


        {/* PLACE ORDER SECTION */}
        {showPlaceOrder && enterDetail ? (

          <button
            onClick={handleSubmit}
            className={`${cart.length > 0
              ? "bg-primaryGreen  shadow-green-800 shadow-lg "
              : "bg-black bg-opacity-30 shadow-gray-300 "
              }  mt-2 w-full h-fit relative overflow-hidden px-6 py-3 rounded-lg  text-white font-semibold transition-colors duration-300 group`}>
            <span className="relative z-10 flex gap-4 justify-center items-center">
              Place Order {contact.name && contact.address && contact.phone ? '' : <FaLock />}
            </span>
            {contact.name && contact.address && contact.phone ?
              <span className="absolute inset-0 bg-green-800 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
              : ''}
          </button>
        ) : (
          ""
        )}


      </div>
    </div>
  );
};

export default Cart;
