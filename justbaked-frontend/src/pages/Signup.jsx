import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, FloatingLabel, Form } from "react-bootstrap";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/FirebaseConfig";
import NavigationBar from "../components/NavigationBar";
import "../css/Account.css";

function SignUp() {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ message, setMessage ] = useState("");
    const [ displayName, setDisplayName ] = useState("");

    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const newUser = await createUserWithEmailAndPassword(auth, email, password);
            const idToken = await newUser.user.getIdToken();

            await updateProfile(newUser.user, { displayName });

            await sendIdTokenToBackEnd(idToken);

            navigate("/login");

        } catch (error) {
            console.error(error);
            setMessage("Failed to create an account. Please try again.");
        }
    };

    const sendIdTokenToBackEnd = async (idToken) => {
        const response = await fetch(`http://localhost:8080/api/customers/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${idToken}`
            },
            body: JSON.stringify({
                displayName: displayName,
            }),
        });

        const data = await response.json();
        console.log(data);
    }

    return (
        <div className="account-creation">
            <NavigationBar />

            <div className="account-box">
            
                <div className="login-form">
                    <h1>Create an Account</h1>

                    <br/>

                    <Form onSubmit={ handleSignUp }>

                        <FloatingLabel
                            controlId="floatingInput"
                            label="Display Name"
                            className="mb-3"
                        >
                            <Form.Control type="text" value={ displayName } onChange={ e => setDisplayName(e.target.value) } required/>
                        </FloatingLabel>

                        <FloatingLabel
                            controlId="floatingInput"
                            label="Email"
                            className="mb-3"
                        >
                            <Form.Control type="email" value={ email } onChange={ e => setEmail(e.target.value) } required/>

                        </FloatingLabel>

                        <FloatingLabel
                            controlId="floatingInput"
                            label="Password"
                            className="mb-3"
                        >
                            <Form.Control type="password" value={ password } onChange={ e => setPassword(e.target.value) } required/>

                        </FloatingLabel>

                        <button type="submit" className="login-button">Create</button>
                    </Form>
                    <br/>

                    <p>
                        Already have an account? 
                        <Link to="/account">Login</Link>
                    </p>

                    <br/>

                    {message && 
                        <Alert variant="danger" >
                            <Alert.Heading>Create Account Failed</Alert.Heading>
                            <p>{ message }</p>
                        </Alert>
                    }
                </div>

            </div>

        </div>
      );

}

export default SignUp;