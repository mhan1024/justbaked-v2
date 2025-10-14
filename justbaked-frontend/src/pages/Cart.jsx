import NavigationBar from "../components/NavigationBar";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthorizedContext";
import { useState } from "react";
import { Button, Modal, Toast } from "react-bootstrap";
import "../css/Cart.css";

function Cart() {
    const { cartItems, addToCart, minusOne, removeFromCart, cartTotal, clearCart, submitCart } = useCart();
    const { uid } = useAuth();
    const [ showClearModal, setShowClearModal ] = useState(false);
    const [ showCheckoutModal, setShowCheckoutModal ] = useState(false);
    const [ showToast, setShowToast ] = useState(false);

    const apiUrl = import.meta.env.VITE_API_URL;

    const handleCheckout = async (e) => {
        const response = await fetch(`${apiUrl}/api/customer-orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                status: "SUBMITTED",
                total: cartTotal,
                customer: { uid: uid }
            }),
        });

        const data = await response.json();
        console.log(data);
        
        await submitCart(data.id);

        clearCart();

        setShowToast(true);
    };

    return (
        <div className="cart">
            <NavigationBar />

            <div className="cart-box">
                <h1>My Cart</h1>

                <ul className="cart-list">
                    { cartItems.map((item) => (
                        <li key={ item.id }>
                            <h4>{ item.dessertName } - ${ Number(item.itemTotal).toFixed(2) }</h4>

                            <div className="item-quantity">
                                <button onClick={ () => addToCart( item) }>+</button>
                                <p>QTY: { item.quantity } </p>
                                <button onClick={ () => minusOne(item) }>-</button>
                                <button onClick={ () => removeFromCart(item.id) }>Remove</button>
                            </div>
                        </li>
                    ))}
                </ul>
                        
                { uid === "" ? 
                    <p>
                        You need an <a href="/signup">account</a> or <a href="/account">sign in</a>.
                    </p>
                    : 
                    <div >
                        { cartItems.length === 0 
                            ? <p>Cart is empty</p> 
                            : <div className="cart-total-box">
                                <hr/>
                                <h5>Total: ${ Number(cartTotal).toFixed(2) }</h5>

                                <div className="cart-group">
                                    <button onClick={ () => setShowClearModal(true) }>Clear Cart</button>
                                    <button onClick={ () => setShowCheckoutModal(true) }>Checkout</button>
                                </div>

                                { showClearModal && (
                                    <Modal show={showClearModal} onHide={() => setShowClearModal(false)}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Clear your cart?</Modal.Title>
                                        </Modal.Header>
                            
                                        <Modal.Body>
                                            <p>This action cannot be undone.</p>
                                        </Modal.Body>
                            
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={ () => setShowClearModal(false) }>Close</Button>
                                            <Button variant="danger" onClick={ clearCart }>Clear</Button>
                                        </Modal.Footer>
                                </Modal>
                                )}

                                { showCheckoutModal && (
                                    <Modal show={showCheckoutModal} onHide={() => setShowCheckoutModal(false)}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Ready to checkout?</Modal.Title>
                                        </Modal.Header>

                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={() => setShowCheckoutModal(false)}>Continue to shop</Button>
                                            <Button variant="primary" onClick={handleCheckout}>Checkout</Button>
                                        </Modal.Footer>
                                    
                                    </Modal>
                                )}
                            </div>
                        }
                    
                    <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
                            <Toast.Header>
                                Thank you!
                            </Toast.Header>
                            <Toast.Body>
                                Your purchase was successful. We're baking it now!
                            </Toast.Body>
                    </Toast>
                    </div>
                }
            </div>

        </div>
    );
}

export default Cart;