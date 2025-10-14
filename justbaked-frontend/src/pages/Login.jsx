import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, FloatingLabel, Form } from "react-bootstrap";
import GoogleButton from 'react-google-button';

import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider, appleProvider } from "../utils/FirebaseConfig.jsx";

function Login() {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [message, setMessage] = useState("");
    let idToken;

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            idToken = await userCredential.user.getIdToken();

            await sendIdTokenToBackEnd(idToken);

            navigate("/");

        } catch (error) {
            console.error(error);
            setMessage("Email or password is incorrect. Please try again.");
            setEmail("");
            setPassword("");
        }
    };

    const handleGoogleSignIn = async (e) => {
        e.preventDefault();

        try {
            const googleUser = await signInWithPopup(auth, googleProvider);
            idToken = await googleUser.user.getIdToken();

            await sendIdTokenToBackEnd(idToken);
            
            navigate("/");

        } catch (error) {
            console.error(error);
            setMessage(error.message);
        }
    }

    const handleAppleSignIn = async (e) => {
        e.preventDefault();

        try {
            const appleUser = await signInWithPopup(auth, appleProvider);
            idToken = await appleUser.user.getIdToken();

            await sendIdTokenToBackEnd(idToken);
            
            navigate("/");

        } catch (error) {
            console.error(error);
            setMessage(error.message);
        }
    }

    const sendIdTokenToBackEnd = async (idToken) => {
        const response = await fetch(`http://localhost:8080/api/customers/protected`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${idToken}`
            }
        });

        await response.text();
    }

    

  return (
    <div className="login-form">

        <h1>Sign In</h1>

        <div className="provider-buttons">
            <GoogleButton onClick={ handleGoogleSignIn }>
                Sign in with Google
            </GoogleButton>
            <button onClick={ handleAppleSignIn } className="apple-login">
                &#63743; Sign in with Apple
            </button>
            
        </div>

        <hr />

        <Form onSubmit={ handleLogin }>
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

            <button type="submit" className="login-button">Login</button>
        </Form>
        <br/>

        <p>
            Don't have an account? 
            <Link to="/signup"> Create one</Link>
        </p>

        <br/>

        {message && 
            <Alert variant="danger" >
                <Alert.Heading>Login Failed</Alert.Heading>
                <p>{ message }</p>
            </Alert>
        }
        
    </div>
  );
}

export default Login;