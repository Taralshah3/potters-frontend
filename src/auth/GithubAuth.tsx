import { constants, endpoints, firebaseConfig } from "../constants";
import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';

//create an interface for githubauth that has an function which takes in a string[] and returns void
interface GithubAuthProps {
  setDropdowns: (value: string[]) => void;
}

const GithubAuth = (props: GithubAuthProps) => {
  const { setDropdowns } = props;
  const CLIENT_ID = 'dd9aa4570f110091da24';
  const REDIRECT_URI = 'http://localhost:3000/';

  function handleLogin() {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=repo,read:org`;
  }

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get("code");
    if (codeParam) {
      handleCallback();
    }
  }, [])

  // Step 2: On the callback page, exchange the temporary code for an access token using GitHub's OAuth access token URL
  function handleCallback() {
    const code = new URLSearchParams(window.location.search).get('code');

    const data = {
      code: code,
    }

    fetch(`${constants.apiUrl}${endpoints.githubConnect}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        "x-access-potter-auth-token": localStorage.getItem(constants.authHeader) || "",
        "Content-Type": 'application/json',
      }
    }).then(async (response) => {
      console.log("API: ", constants.apiUrl);
      if (response.ok) {
        const data = await response.json();
        console.log('data: ', data);
        const dropdowns: string[] = data.names;
        setDropdowns(dropdowns);
      }
    })
  }

  return (
    <div>
      {<Button onClick={handleLogin} variant="primary">Sign in with github</Button>}
    </div>
  )
}

export default GithubAuth;


