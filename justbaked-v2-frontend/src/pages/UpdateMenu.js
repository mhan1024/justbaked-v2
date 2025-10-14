import { useState, useEffect, useRef } from "react";
import { Card, ListGroup, FloatingLabel, Form } from "react-bootstrap";
import NavigationBar from "./NavigationBar";
import "./CSS/UpdateMenu.css";

function UpdateMenu() {
    const [ dessertName, setDessertName ] = useState("");
    const [ price, setPrice ] = useState(0.0);
    const [ ingredients, setIngredients ] = useState("");
    const [ items, setItems ] = useState([]);
    const [ selectedItems, setSelectedItems ] = useState([]);
    const [ selectedImages, setSelectedImages ] = useState([]);
    const [ previewImg, setPreviewImg ] = useState(null);

    const fileInputRef = useRef();

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/items`);
                const data = await response.json();
                setItems(data);

            } catch (error) {
                console.error(error);
            }
        };

        fetchItems();

    }, []);

    const handleItem = async (e) => {   
        e.preventDefault();
        
        try {
            let uploadedImageName = "";

            if (fileInputRef.current?.files[0]) {
                const file = fileInputRef.current.files[0];
                const formData = new FormData();
                formData.append("image", file);

                const uploadResponse = await fetch(`http://localhost:8080/api/images`, {
                    method: "POST",
                    body: formData
                });

                if (!uploadResponse.ok) throw new Error("Image upload failed");

                const uploadData = await uploadResponse.json();
                uploadedImageName = uploadData.name;

                // fetchImage(uploadedImageName);
            }

            const response = await fetch(`http://localhost:8080/api/items`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    dessertName: dessertName,
                    price: price,
                    ingredients: ingredients, 
                    imageUrl: uploadedImageName,
                }),

            });

            await response.json();
            
            if (!response.ok) throw new Error("Failed to save dessert");

            const updatedRes = await fetch(`http://localhost:8080/api/items`);
            const data = await updatedRes.json();
            setItems(data);

            handleReset();

        } catch (error) {
            console.error(error);
        }
        
    };

    const handleReset = () => {
        setDessertName("");
        setPrice(0.0);
        setIngredients("");
        setPreviewImg(null);
    };

    const handleDeleteItems = async () => {

        selectedItems.forEach(async (id) => {
            try {
                const response = await fetch(`http://localhost:8080/api/items/${id}`, {
                    method: "DELETE"
                });

                if (response.ok) console.log("Successfully removed");

                const updatedRes = await fetch(`http://localhost:8080/api/items`);
                const data = await updatedRes.json();
                setItems(data);

            } catch (error) {
                console.error(error);
            }
        });

        setSelectedItems([]);

        selectedImages.forEach(async (imageUrl) => {
            try {
                const imageResponse = await fetch(`http://localhost:8080/api/images/${imageUrl}`, {
                    method: "DELETE"
                });

                if (imageResponse.ok) console.log("Image removed");

            } catch (error) {
                console.error(error);
            }
        });

        setSelectedImages([]);
    };

    // const fetchImage = async (imgName) => {
    //     try {
    //         const response = await fetch(`${API_BASE}/api/images/${imgName}`);

    //         if (!response.ok) throw new Error("Failed to fetch image");

    //         const blob = await response.blob();
    //         const url = URL.createObjectURL(blob);

    //         console.log(url);

    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    const handlePreview = (e) => {
        const file = e.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setPreviewImg(previewUrl);
        }
    };



    return (
        <div className="update-menu">
            <NavigationBar />

            <div className="update-menu-box">
                <div className="update-inline">
                    <div className="add-dessert-section">
                        <h3>Add a dessert</h3>

                        <Form onSubmit={ handleItem }>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Dessert Name"
                                className="mb-3"
                            >
                                <Form.Control type="text" value={ dessertName } onChange={ e => setDessertName(e.target.value) } required/>
                            </FloatingLabel>

                            <FloatingLabel
                                controlId="floatingInput"
                                label="Price"
                                className="mb-3"
                            >
                                <Form.Control type="number" value={ price.toFixed(2) } onChange={ e => setPrice(Number(e.target.value)) } step="0.25" min={0.0}/>
                            </FloatingLabel>

                            <FloatingLabel
                                controlId="floatingTextarea"
                                label="Ingredients"
                                className="mb-3"
                            >
                                <Form.Control as="textarea" value={ ingredients } onChange={ e => setIngredients(e.target.value) } required/>
                            </FloatingLabel>

                            <FloatingLabel
                                label="Image"
                                className="mb-3"
                            >
                                <Form.Control type="file" accept="image/*" ref={fileInputRef} onChange={handlePreview} required/>
                            </FloatingLabel>

                            <div className="button-group">
                                <button type="submit">Add Dessert</button>
                                <button onClick={ handleReset }>Clear All</button>
                            </div>
                        </Form>
                    </div>

                    <div className="preview-section">
                        <Card style={{ width: '18rem' }}>
                            { previewImg && <Card.Img variant="top" src={previewImg} /> }
                            
                            <Card.Body>
                                <Card.Title>{dessertName} - ${Number(price).toFixed(2)}</Card.Title>
                                <Card.Text>{ingredients}</Card.Text>
                                <button className="add-button">Add to Cart</button>
                            </Card.Body>
                        </Card>
                    </div>
                </div>

                <br/>
                
                <div className="preview-menu-section">
                    <h3>Preview Menu</h3>

                    <ListGroup>
                        { items.map((item) => {
                            const isSelected = selectedItems.includes(item.id);

                            return (
                            <ListGroup.Item 
                                key={item.id} 
                                action 
                                active={isSelected} 
                                onClick={() => {
                                    if (isSelected) {
                                        setSelectedItems(selectedItems.filter(id => id !== item.id));
                                        setSelectedImages(selectedImages.filter(name => name !== item.imageUrl));
                                    } else {
                                        setSelectedItems([...selectedItems, item.id]);
                                        setSelectedImages([...selectedImages, item.imageUrl]);
                                    }
                            }}>
                                {item.dessertName}
                            </ListGroup.Item>);
                            
                        }) }
                    </ListGroup>

                    <button onClick={ handleDeleteItems } className="delete-button">Delete Items</button>
                </div>
                    

                
            </div>
        </div>
    );
}

export default UpdateMenu;