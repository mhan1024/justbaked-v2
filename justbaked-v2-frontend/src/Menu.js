import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";

import NavigationBar from "./NavigationBar";
import { useCart } from "./CartContext";

import "./CSS/Menu.css";

function Menu() {
    const [ items, setItems ] = useState([]);
    const [ imageUrls, setImageUrls ] = useState({});
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/items`);
                const data = await response.json();
                setItems(data);

                const images = await Promise.all(
                    data.map(async item => {
                        if (!item.imageUrl) return [item.id, null];
                        const response = await fetch(`http://localhost:8080/api/images/${item.imageUrl}`);

                        if (!response.ok) return [item.id, null];

                        const blob = await response.blob();
                        return [item.id, URL.createObjectURL(blob)];
                    })
                );

                setImageUrls(Object.fromEntries(images));

            } catch (error) {
                console.error(error);
            }
        };

        fetchItems();

    }, []);

    // const fetchImage = async (imgName) => {
    //     try {
    //         const response = await fetch(`${API_BASE}/api/images/${imgName}`);

    //         if (!response.ok) throw new Error("Failed to fetch image");

    //         const blob = await response.blob();
    //         const url = URL.createObjectURL(blob);

    //         return url;

    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    return (
        <div className="menu">
            <NavigationBar />
            <div className="menu-grid">
                { items.map((item) => (
                    <Card style={{ width: '18rem' }} key={item.id}>
                        <Card.Img variant="top" src={imageUrls[item.id] || "no image"}></Card.Img>
                        <Card.Title>
                            {item.dessertName} - ${Number(item.price).toFixed(2)}
                        </Card.Title>
                        <Card.Text>{item.ingredients}</Card.Text>
                        <button className="add-button" onClick={ () => addToCart(item) }>Add to Cart</button>
                    </Card>
                )) }
            </div>
        </div>
    );
}

export default Menu;