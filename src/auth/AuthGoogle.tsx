import { getAuth, GoogleAuthProvider, signInWithPopup, OAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { constants, endpoints, firebaseConfig } from "../constants";
import { useState } from "react";

interface OAuthReturn {
    accessToken: string;
    success: boolean;
    email: string;
}


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();




const AuthGoogle = () => {

    const [error, setError] = useState<string>('');

    const successfulLogin = (token: string) => {
        window.localStorage.setItem(constants.authHeader, token);
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
            fetch(`${constants.apiUrl}${endpoints.googleAuth}`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(async (response) => {
                if (response.ok) {
                    const data: any = await response.json();
                    const token: string = data.token;
                    successfulLogin(token);
                } else {
                    setError("Oops! Something went wrong. Please try again.");
                }
            })
        }).catch(() => {
            setError('There was an error logging in with Google');
        });
    }
    return (
        <div>
            <button onClick={handleGoogle}>User Google Auth</button>
        </div>
    )
}

export default AuthGoogle;


