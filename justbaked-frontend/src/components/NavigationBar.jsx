import { Navbar, Nav, Container, Badge, Spinner } from 'react-bootstrap';
import "../css/NavigationBar.css";
import { useAuth } from '../contexts/AuthorizedContext';
import { useCart } from '../contexts/CartContext';


function NavigationBar() {    
    const { uid, loading } = useAuth();
    const { totalCartItems } = useCart();

    return (
        <div className="nav-bar">

            <Navbar expand="lg" className="custom-navbar">
                <Container>
                    <Navbar.Brand href="/"><h1>JustBaked</h1></Navbar.Brand>                    
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse  id="basic-navbar-nav">

                            { loading 
                                ? (<Spinner animation="border" role="status" size="sm"/>
                                ) 
                                : (uid === 'bBH42XaK9ihsJKxXXbqLooWNmRf2' 
                                    ? <Nav className="me-auto">
                                        <Nav.Link href="/">Home</Nav.Link>
                                        <Nav.Link className="nav-link" href="/menu">Menu</Nav.Link>
                                        <Nav.Link className="nav-link" href="/update-menu">Update Menu</Nav.Link>
                                        <Nav.Link className="nav-link" href="/manage-orders">Manage Orders</Nav.Link>
                                        <Nav.Link className="nav-link" href="/account">Account</Nav.Link>
                                        <Nav.Link className="nav-link" href="/cart">
                                            <p>
                                                Cart
                                                <Badge bg="secondary">{ totalCartItems }</Badge>
                                            </p>
                                            
                                        </Nav.Link>
                                    </Nav>

                                    : <Nav className="me-auto">
                                        <Nav.Link href="/">Home</Nav.Link>
                                        <Nav.Link className="nav-link" href="/menu">Menu</Nav.Link>
                                        <Nav.Link className="nav-link" href="/account">Account</Nav.Link>
                                        <Nav.Link className="nav-link" href="/cart">
                                            Cart
                                            <Badge bg="secondary">{ totalCartItems }</Badge>
                                        </Nav.Link>
                                    </Nav>)
                            }
                        
                    </Navbar.Collapse>
                </Container>
            </Navbar>




        </div>

    );
}

export default NavigationBar;