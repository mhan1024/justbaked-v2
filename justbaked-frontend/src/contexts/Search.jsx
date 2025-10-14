import  { createContext, useState, useContext } from "react";
import { Accordion, Form } from 'react-bootstrap';
import "../css/Search.css"

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [search, setSearch] = useState('');

    return (
        <SearchContext.Provider value={{ search, setSearch }}>
          {children}
        </SearchContext.Provider>
    );
};

export const SearchOrders = ({ orders, orderItems, staffOnly, statusUpdate, handleSelection, itemStatus, handleItemSelection }) => {
    const {search, setSearch} = useContext(SearchContext);
    const [ showActive, setShowActive ] = useState(true);

    const filteredOrders = orders.filter(order => {
        const searchLower = search.toLowerCase();

        const idMatch = order.id.toString().includes(searchLower);
        const nameMatch = order.customer.displayName.toLowerCase().includes(searchLower);
        const emailMatch = order.customer.email.toLowerCase().includes(searchLower);

        const isActive = order.status !== 'CANCELLED' && order.status !== 'DELIVERED';

        return (idMatch || nameMatch || emailMatch) && (showActive ? isActive : true);
    });

    const handleToggle = (e) => {
        setShowActive(e.target.checked);
    };

    return (
        <div className="search">
            <input type="text" placeholder="Search for orders..." value={ search } onChange={ e => setSearch(e.target.value) } className="search-bar"/>

            <Form>
                <Form.Check 
                    type="switch"
                    label="Show Active Orders"
                    checked={ showActive }
                    onChange={ handleToggle }
                />
            </Form>

            <Accordion alwaysOpen>
                {filteredOrders.map(order => (

                    <Accordion.Item eventKey={order.id.toString()} key={order.id}>
                        <Accordion.Header>
                            <p>Order #: <strong>{order.id}</strong> - </p>
                            { staffOnly ? 

                                <p>Status: 
                                    <select value={ statusUpdate[order.id] || order.status } onChange={ (e) => handleSelection(order.id, e) }>
                                        <option value="current" disabled>{order.status}</option>
                                        <option value="SUBMITTED">SUBMITTED</option>
                                        <option value="PREPARING">PREPARING</option>
                                        <option value="PACKAGING">PACKAGING</option>
                                        <option value="OUT FOR DELIVERY">OUT FOR DELIVERY</option>
                                        <option value="DELIVERED">DELIVERED</option>
                                        <option value="CANCELLED">CANCELLED</option>
                                    </select>
                                </p> 
                                :
                                <p>Status: <strong>{order.status}</strong></p>
                                
                            }
                        </Accordion.Header>
                        <Accordion.Body>
                            <div>
                                Name: {order.customer.displayName} <br/>
                                Email: {order.customer.email} <br/>
                                Submitted At: {order.createdAt}
                            </div>
                            <br/>
                            <div>
                                <h6>Order Total:</h6>
                                <ul>
                                    { orderItems[order.id]?.map((item) => (
                                        <li key={ item.id }>
                                           ({ item.quantity }) { item.item.dessertName } - ${ Number(item.price).toFixed(2) }

                                           { staffOnly ? 
                                           <p>Status:
                                             <select value={ itemStatus[item.id] || item.status } onChange={ (e) => handleItemSelection(item.id, e)}>
                                                <option value="BAKING">BAKING</option>
                                                <option value="READY">READY</option>
                                             </select>
                                           </p> 
                                           : <br/> }
                                        </li>
                                    ))}
                                </ul>
                                <hr/>
                                Total: ${ Number(order.total).toFixed(2) }
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                    
                ))}
            </Accordion>
            
        </div>
    );
}