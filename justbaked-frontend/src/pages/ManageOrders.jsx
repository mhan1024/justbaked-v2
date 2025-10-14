import React, { useState, useEffect } from "react";
import NavigationBar from "../components/NavigationBar";
import { SearchProvider, SearchOrders } from "../contexts/Search";
import "../css/ManageOrders.css";

function ManageOrders() {
    const [ orders, setOrders ] = useState([]);
    const [ orderItems, setOrderItems ] = useState({});
    const [ statusUpdate, setStatusUpdate ] = useState({});
    const [ itemStatus, setItemStatus ] = useState({});

    useEffect(() => {
        const fetchAllOrders = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/customer-orders`);
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

        fetchAllOrders();

    }, []);

    const handleSelection = (orderId, e) => {
        const newStatus = e.target.value;
        setStatusUpdate((prev) => ({
            ...prev,
            [orderId] : newStatus
        }));

    };

    const handleItemSelection = (orderItemId, e) => {
        const newItemStatus = e.target.value;
        setItemStatus((prev) => ({
            ...prev, 
            [orderItemId] : newItemStatus
        }));
    }

    const handleSaveStatus = () => {
        Object.entries(statusUpdate).forEach(async ([id, stat]) => {

            try {
                await fetch(`http://localhost:8080/api/customer-orders/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ status: stat }),
                });

            } catch (error) {
                console.error(error);
            }
            
        });

        handleSaveItemStatus();
    };

    const handleSaveItemStatus = () => {
        Object.entries(itemStatus).forEach(async ([id, itemStat]) => {
            try {
                await fetch(`http://localhost:8080/api/order-items/cart-item-id/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ status: itemStat }),
                });
            } catch (error) {   
                console.error(error);
            }
        })
    };

    const handleDeleteItems = async () => {
        console.log(orders);

        for (const order of orders) {

            const orderRes = await fetch(`http://localhost:8080/api/order-items/order-id/${order.id}`);
            const orderData = await orderRes.json();

            orderData.forEach(async (orderItem) => {
                const itemRes = await fetch(`http://localhost:8080/api/order-items/${orderItem.id}`, {
                    method: "DELETE"
                });

                if (itemRes.ok) console.log("Successfully removed items in order");
            });

            const deleteRes = await fetch(`http://localhost:8080/api/customer-orders/${order.id}`, {
                method: "DELETE"
            });

            if (deleteRes.ok) console.log("Successfully removed order");
        }

        setOrders([]);
        setOrderItems([]);
    }

    return (
        <SearchProvider>
            <div className="manage-orders">
                <NavigationBar />
                <div className="manage-orders-box">

                    <SearchOrders orders={orders} orderItems={orderItems} staffOnly={true} statusUpdate={statusUpdate} handleSelection={handleSelection} itemStatus={itemStatus} handleItemSelection={handleItemSelection}/>
                    
                    <div className="button-group">
                        <button onClick={ handleSaveStatus }>Save Changes</button>
                        <button onClick={ handleDeleteItems }>Delete Orders</button>
                    </div>
                    
                </div>
                
            </div>
        </SearchProvider>
    );
}

export default ManageOrders;