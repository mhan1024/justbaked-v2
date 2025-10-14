import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/FirebaseConfig.jsx";

export const useAuth = () => {
    const [ uid, setUid ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ displayName, setDisplayName ] = useState("");
    const [ photoUrl, setPhotoUrl ] = useState("");
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        const auth = getAuth();

        const handleUser = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUid(user.uid);
                setEmail(user.email);
                setDisplayName(user.displayName);
                setPhotoUrl(user.photoURL ?? "/images/account.png");

            } else {
                setUid("");
                setEmail("");
                setDisplayName("");
                setPhotoUrl('/account.png');
            }

            setLoading(false);
        });

        return () => handleUser();
    }, []); 

    const handleLogout = async (e) => {
        e.preventDefault();

        try {
            await signOut(auth);
        } catch (error) {
            console.error(error);
        }
    }

    return { uid, email, displayName, photoUrl, handleLogout, loading };
};