import { useState, useEffect } from "react";
import NavigationBar from "../components/NavigationBar";
import { useAuth } from "../contexts/AuthorizedContext";
import { SearchProvider, SearchOrders } from "../contexts/Search";
import Login from "./Login";
import "../css/Account.css";

function Account() {
    const [ orders, setOrders ] = useState([]);
    const [ orderItems, setOrderItems ] = useState({});
    const { uid, email, displayName, photoUrl, handleLogout } = useAuth();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/customer-orders/customer/${uid}`);
                const data = await response.json();

                setOrders(data);

                data.forEach(async (order) => {
                    const orderRes = await fetch(`http://localhost:8080/api/order-items/order-id/${order.id}`);
                    const orderData = await orderRes.json();

                    setOrderItems(prev => ({...prev, [order.id]: orderData }));
                });

            } catch (error) {
                console.error(error);
            }
        };

        if (uid) {
            fetchOrders();
        }

    }, [ uid ]);

    return (
        <SearchProvider>
            <div className="account">
                <NavigationBar />

                <div className="account-box">
                    { uid === "" ? 
                        <div className="login-box">
                            <Login />
                        </div>
                        : 
                        <div className="profile-box"> 
                            <div className="profile-left">
                                <img src={photoUrl} alt="pfp" referrerPolicy="no-referrer"/>
                                <h3>{displayName}</h3>
                                <p>{email}</p>
                                <button onClick={ handleLogout }>Logout</button>
                            </div>

                            <div className="profile-right">
                                <SearchOrders orders={orders} orderItems={orderItems} staffOnly={false} statusUpdate={null} handleSelection={null}/>
                            </div>                    
                        </div>
                        
                    }
                </div>
                

            </div>
        </SearchProvider>
    );
}

export default Account;