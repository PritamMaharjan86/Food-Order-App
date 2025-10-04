import axios from "axios";
import { toast } from "react-toastify";
import { MdAdd } from "react-icons/md";
import { FiMinus } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

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

  const handleSubmit = async (e) => {
    setEnterDetail(false);
    setShowPlaceOrder(false);
    setShowCheckout(true);
    e.preventDefault();
    const orderData = { items: cart, status: "Pending" }; // ✅ send selected items, not menu

    try {
      const res = await axios.post(
        "http://localhost:3001/api/order/postOrder",
        orderData
      );
      setCart([]);
      setClicked([]);
      toast.success(res.data.message);
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
      className={`fixed top-0 right-0 h-fit w-80 bg-white shadow-2xl transform transition-transform duration-300 z-50 
    ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}>
      <div className="p-4 flex justify-between items-center border-b border-purple-300 ">
        <h2 className="text-xl font-bold">Your Cart</h2>
        <button className="text-red-600" onClick={toggleCart}>
          <FaArrowRight />
        </button>
      </div>

      <div className="p-4 overflow-y-auto h-[80%] ">
        {cart.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="flex justify-between py-2 border-b">
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

                <div className="flex flex-row items-center ">
                  <div className="flex gap-5 border border-purple-500 h-8 flex-row rounded-md mt-4 bg-purple-500">
                    <button
                      className="text-white text-lg flex items-center ml-5"
                      onClick={() => handleAdd(item.id)}>
                      <MdAdd />
                    </button>
                    <span className="bg-white w-8 justify-center flex rounded-md items-center text-sm">
                      {item.quantity}
                    </span>
                    <button
                      className="text-white text-lg flex items-center mr-5 "
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

      <div className="p-4 border-t  border-purple-300 flex flex-col ">
        <div className="justify-end flex gap-2 font-bold">
          <span>Subtotal:</span>
          <span>
            ${cart.reduce((sum, i) => sum + i.price * i.quantity, 0).toFixed(2)}
          </span>
        </div>

        {showCheckout && cart.length > 0 ? (
          <button
            onClick={getDetail}
            className={`${
              cart.length > 0
                ? "bg-purple-500  shadow-purple-300 "
                : "bg-black bg-opacity-30 shadow-gray-300 "
            } mt-2 w-full h-fit relative overflow-hidden px-6 py-3 rounded-lg bg-purple-600 text-white font-semibold transition-colors duration-300 group`}>
            <span className="relative z-10 flex gap-4 justify-center items-center">
              {" "}
              Proceed to checkout
            </span>

            {cart.length > 0 ? (
              <span className="absolute inset-0 bg-purple-800 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
            ) : (
              ""
            )}
          </button>
        ) : (
          ""
        )}

        {enterDetail ? (
          <div>
            <h4 className="font-bold">Contact</h4>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch", height: "50px" },
              }}
              noValidate
              autoComplete="off">
              <TextField
                required
                id="outlined-required"
                label="First name"
                inputProps={{
                  maxLength: 15,
                  style: {
                    textTransform: "capitalize",
                    height: "10px",
                  },
                }}
              />
              <TextField
                required
                id="outlined-required"
                label="Last name"
                inputProps={{
                  maxLength: 15,
                  style: {
                    textTransform: "capitalize",
                    height: "10px",
                  },
                }}
              />
              <TextField
                required
                id="outlined-required"
                label="Address"
                inputProps={{
                  maxLength: 50,
                  style: {
                    textTransform: "capitalize",
                    height: "10px",
                  },
                }}
              />
              <TextField
                required
                type="number"
                id="outlined-required"
                label="Phone"
              />
            </Box>
          </div>
        ) : (
          ""
        )}

        {showPlaceOrder ? (
          <button
            onClick={handleSubmit}
            className={`${
              cart.length > 0
                ? "bg-purple-500  shadow-purple-300 "
                : "bg-black bg-opacity-30 shadow-gray-300 "
            } mt-2 w-full h-fit relative overflow-hidden px-6 py-3 rounded-lg bg-purple-600 text-white font-semibold transition-colors duration-300 group`}>
            <span className="relative z-10 flex gap-4 justify-center items-center">
              {" "}
              Place Order
            </span>
            {enterDetail ? (
              <span className="absolute inset-0 bg-purple-800 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
            ) : (
              ""
            )}
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Cart;
