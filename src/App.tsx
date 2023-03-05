import React from 'react';
import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Configuration, OpenAIApi } from "openai";
import { isLoggedIn, logout } from './auth/helpers'
import AuthGoogle from './auth/AuthGoogle'
import FilesList from './FilesList';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import GithubAuth from './auth/GithubAuth';

function App() {
  useEffect(() => {
    isLoggedIn().then((res: boolean) => {
      if (res) {
        console.log('✅ The user is logged in');
      } else {
        console.log('❌ Not authenticated');
      }
    });
  }, []);


  const configuration = new Configuration({
    apiKey: "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",
  });
  const openai = new OpenAIApi(configuration);

  async function handleFileChange(event: any) {
    const file = event.target.files.item(0);
    const text = await file.text();
    document.getElementById("output")!.innerText = text;
    handleOpenAIAPICall(text);
  }

  async function handleOpenAIAPICall(fileText: any) {
    try {
      const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: 'give me a summary of this file: ' + fileText,
        temperature: 0.6,
        max_tokens: 100,
      });
      document.getElementById("summarized_output")!.innerText = completion.data.choices[0].text!;

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">clay.ai</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
          </Nav>
          <AuthGoogle />
          <GithubAuth/>
        </Container>
      </Navbar>
      <div style={{marginTop: "3%", textAlign: 'center'}}>
        <h3 >My Projects</h3>
        <DropdownButton size="sm" id="dropdown-basic-button" title="Select Project" >
          <Dropdown.Item href="#/action-1">Project 1</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Project 2</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Project 3</Dropdown.Item>
        </DropdownButton> 
      </div>
      <FilesList/>
    </div>
  );
}

export default App;
