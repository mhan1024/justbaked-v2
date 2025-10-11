import React, { useState, useEffect } from "react";

import NavigationBar from "./NavigationBar";
import { useAuth } from "./AuthorizedUser"; 
import { SearchProvider, SearchOrders } from "./Search";

import "./CSS/Orders.css";

function Orders() {
    const [ orders, setOrders ] = useState([]);
    const [ orderItems, setOrderItems ] = useState({});
    const { uid } = useAuth();

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
            <div className="orders">
                <NavigationBar />

                <div className="orders-box">
                    <h1>Your Orders</h1>

                    { uid === "" ? 
                        <p>You need an account or sign in</p> : 
                        <SearchOrders orders={orders} orderItems={orderItems} staffOnly={false} statusUpdate={null} handleSelection={null}/>
                    }
                </div>    
            </div>
        </SearchProvider>
    );
}

export default Orders;