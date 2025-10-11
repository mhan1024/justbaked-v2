import  { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [ cartItems, setCartItems ] = useState(localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []);

    const [ cartTotal, setCartTotal ] = useState(0.0);
    const [ totalCartItems, setTotalCartItems ] = useState(0);

    const addToCart = (item) => {
        const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

        if (existingItem) {
            setCartItems(
                cartItems.map((cartItem) => 
                cartItem.id === item.id 
                    ? {...cartItem, quantity : cartItem.quantity + 1, itemTotal: ((cartItem.quantity + 1) * item.price) }
                    : cartItem 
                )
            );
        } else {
            setCartItems([...cartItems, {...item, quantity: 1, itemTotal: item.price }]);
        }
    };

    const minusOne = (item) => {
        const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

        if (existingItem) {
            setCartItems(
                cartItems.map((cartItem) => 
                cartItem.id === item.id
                    ? {...cartItem, quantity: cartItem.quantity - 1, itemTotal: ((cartItem.quantity - 1) * item.price)} 
                    : cartItem
                ).filter(cartItem => cartItem.quantity > 0)
            );
        }
    };

    const removeFromCart = (id) => {
        setCartItems((prevCart) => prevCart.filter((i) => i.id !== id));
    };

    const clearCart = () => setCartItems([]);

    const submitCart = async (orderId) => {

        for (const item of cartItems) {

            try {
                const response = await fetch(`http://localhost:8080/api/order-items`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        order : { id: orderId },
                        item : { id: item.id },
                        quantity : item.quantity,
                        price : item.itemTotal
                    }),
                });

                const data = await response.json();
                console.log(data);

            } catch (error) {
                console.error(error);
            }
            
        };
    };


    useEffect(() => {
        const newTotalItems = cartItems.reduce((sum, item) => sum + (item.quantity), 0);

        setTotalCartItems(newTotalItems);
    }, [cartItems]);

    useEffect(() => {
        const newTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0.0);

        setCartTotal(newTotal);
    }, [cartItems]);

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        const cartItems = localStorage.getItem("cartItems");
        if (cartItems) {
          setCartItems(JSON.parse(cartItems));
        }
      }, []);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, minusOne, removeFromCart, cartTotal, clearCart, submitCart, totalCartItems }}>
            { children }
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);