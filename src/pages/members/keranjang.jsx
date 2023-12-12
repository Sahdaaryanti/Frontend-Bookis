import {  useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { instance } from '../../modules/axios';
import { useNavigate } from 'react-router-dom';

const CartItem = ({ product, onIncrease, onDecrease, onDelete }) => {
  const { id, image, name, price, quantity } = product;
  const [itemQuantity, setItemQuantity] = useState(quantity);

  const handleIncrease = () => {
    setItemQuantity(itemQuantity + 1);
    onIncrease(id);
  };

  const handleDecrease = () => {
    if (itemQuantity > 1) {
      setItemQuantity(itemQuantity - 1);
      onDecrease(id);
    }
  };

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <tr className="border-b-2 py-4 bg-[#FDF9EC]">
      <td className="px-4 py-2 bg-[#FDF9EC]">
        <img src={image} alt={name} className="w-30 h-25 object-cover rounded" />
      </td>
      <td className="px-4 py-2">
        <div className="flex flex-col">
          <span className="font-semibold">{name}</span>
          <span className="text-gray-500">Harga: Rp. {price}</span>
        </div>
      </td>
      <td className="px-4 py-2">
      <div className="flex items-center justify-center max-w-[100px] h-full border text-primary font-medium">
        <button className="px-4 py-2 mr-2" onClick={handleDecrease}>
          <span className="text-lg font-bold">-</span>
        </button>
        <span className="text-lg font-semibold">{itemQuantity}</span>
        <button className="px-4 py-2 ml-2" onClick={handleIncrease}>
          <span className="text-lg font-bold">+</span>
        </button>
      </div>
      </td>
      <td className="px-3 py-2 text-left">
        <span className="font-semibold">Rp. {price * itemQuantity}</span>
      </td>
      <td className="px-4 py-2">
        <div className="flex items-center">
          <button className="mr-2 text-red-500 border border-red-500 py-1 px-3 rounded" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

CartItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  onIncrease: PropTypes.func.isRequired,
  onDecrease: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const Cart = ({ cart, onCheckout, onUpdateCart }) => {
  
  const handleDelete = async (productId) => {
    await instance.delete(`/cart/cart/remove/${productId}`);
    const updatedCart = cart.filter((product) => product.id !== productId);
    onUpdateCart(updatedCart);
    
  };

  useEffect(() => {
    const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    console.log(cartTotal)
  }, [cart]);

  return (
    <div className="min-h-screen max-w-3xl mx-auto my-8 p-8 border rounded">
      <h1 className="text-2xl font-semibold mb-4">Keranjang</h1>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2">
              <th className="px-4 py-2 text-left" >Produk</th>
              <th className="px-4 py-2 text-left" >Nama</th>
              <th className="px-4 py-2 text-left" >Jumlah</th>
              <th className="px-3 py-2 text-left" >Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((product) => (
              <CartItem
                key={product.id}
                product={product}
                onIncrease={() => {}}
                onDecrease={() => {}}
                onDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-10 flex justify-end">
        <button className="bg-[#677C52] text-white py-2 px-4 rounded" onClick={onCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );
};

Cart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  onCheckout: PropTypes.func.isRequired,
  onUpdateCart: PropTypes.func.isRequired,
};

const Keranjang = () => {
  const [cart, setCart] = useState([
    // Your initial state
  ]);

  const navigate = useNavigate()

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await instance.get('/cart/cart');

        // Check if the response is successful and has data
        if (response.status === 200 && response.data && Array.isArray(response.data.data)) {
          // Map over the API response and format it according to your needs
          const formattedCart = response.data.data.map(cartItem => ({
            id: cartItem.id,
            name: cartItem.bukus.judul,
            image: cartItem.bukus.imageUrl || 'https://via.placeholder.com/150', // Replace with the actual image URL if available
            price: parseFloat(cartItem.bukus.harga),
            quantity: cartItem.jumlah,
          }));

          // Update the local state with the formatted cart data
          setCart(formattedCart);

        }
      } catch (error) {
        // Handle errors
        console.error('Error fetching cart:', error);
      }
    };

    fetchCart();
  }, []); // Empty dependency array to run the effect only once


  const handleCheckout = () => {
    navigate('/users/checkout',{state: {cart: cart }})
  };

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
  };

  return (
    <div className="App">
        {cart.length !== 0 && (
          <Cart cart={cart} onCheckout={handleCheckout} onUpdateCart={updateCart} />
        )}
      
    </div>
  );
};

export default Keranjang;