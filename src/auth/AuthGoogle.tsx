import { getAuth, GoogleAuthProvider, signInWithPopup, OAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { constants, endpoints, firebaseConfig } from "../constants";
import { useState } from "react";
import Button from 'react-bootstrap/Button';


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();




const AuthGoogle = () => {

    console.log(constants.apiUrl);

    const [error, setError] = useState<string>('');
    const [userLoggedIn, setUserLoggedIn] = useState(false);

    const successfulLogin = (token: string) => {
        window.localStorage.setItem(constants.authHeader, token);
        setUserLoggedIn(true);
    };

    const handleGoogle = async () => {
        signInWithPopup(auth, provider).then((result) => {

            const data = {
                idToken: result.user.uid,
                email: result.user.email,
                profilePicture: result.user.photoURL,
                name: result.user.displayName
            }
            // const credential = GoogleAuthProvider.credentialFromResult(result);
            console.log(data.profilePicture);
            fetch(`${constants.apiUrl}${endpoints.googleAuth}`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(async (response) => {
                console.log("API: ", constants.apiUrl);
                if (response.ok) {
                    const data: any = await response.json();
                    const token: string = data.token;
                    successfulLogin(token);
                } else {
                    setError("Oops! Something went wrong. Please try again.");
                }
            })
        }).catch(() => {
            console.log("API: ", constants.apiUrl);
            setError('There was an error logging in with Google');
        });
    }
    return (
        <div>
            {userLoggedIn ? "Logged In" : <Button onClick={handleGoogle} variant="primary">Sign in</Button>}
        </div>
    )
}

export default AuthGoogle;


