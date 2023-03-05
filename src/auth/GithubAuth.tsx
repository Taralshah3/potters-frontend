import { getAuth, GoogleAuthProvider, signInWithPopup, OAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { constants, endpoints, firebaseConfig } from "../constants";
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';


const GithubAuth = () => {
    const CLIENT_ID = 'dd9aa4570f110091da24';
    const CLIENT_SECRET = 'fecf8ac7378fc3cdba2ec36c40a88b1ae5728be6';
    const REDIRECT_URI = 'http://localhost:3000/';

  function handleLogin() {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`;
  }

  useEffect(() => {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const codeParam = urlParams.get("code");
      console.log("CODE PARAM", codeParam);
      if(codeParam) {
          handleCallback();
      }
  }, [])

// Step 2: On the callback page, exchange the temporary code for an access token using GitHub's OAuth access token URL
function handleCallback() {
  const code = new URLSearchParams(window.location.search).get('code');

  const data = {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code: code,
      redirect_uri: REDIRECT_URI
  }
  fetch("http://localhost:4500/api/v1/auth/github", {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
        'Content-Type': 'application/json'
    }
  }).then(async (response) => {
    console.log("API: ", constants.apiUrl);
    if (response.ok) {
        console.log("heres the response: "  + response);
        console.log("endpoint hit successfully");
    }  else {
      console.log("Oops! Something went wrong. Please try again 2.");
    } 
  }).catch(() => {
    console.log("API: ", constants.apiUrl);
    console.log("There was an error logging inw ith github.");
  });
}

    return (
        <div>
            {<Button onClick={handleLogin} variant="primary">Sign in with github</Button> }
        </div>
    )
}

export default GithubAuth;


