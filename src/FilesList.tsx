import React from 'react';
import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Configuration, OpenAIApi } from "openai";
import { isLoggedIn, logout } from './auth/helpers'
import AuthGoogle from './auth/AuthGoogle'
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';

// import Sonnet from '../../components/Sonnet';



function FilesList() {
  const codeFiles = [
    {
      name: 'App.tsx', code: ` return (
          <div style={{padding: "3%"}}>
            <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
                      <Row>
                        <Col sm={3}>
                          <ListGroup>
                            { codeFiles.map((file, index) => (
                              <ListGroup.Item action href={"#link" + (index+1)}>
                                {file.name}
                              </ListGroup.Item>
                            ))
                            }
                          </ListGroup>
                        </Col>
                        <Col sm={5}>
                          <Tab.Content>
                            {codeFiles.map((file, index) => (
                              <Tab.Pane eventKey={"#link" + (index+1)}>
                                {file.code}
                              </Tab.Pane>
                            ))
                            }
                          </Tab.Content>
                        </Col>
                        <Col sm={4}>
                          <Tab.Content>
                          {codeFiles.map((file, index) => (
                              <Tab.Pane eventKey={"#link" + (index+1)}>
                                {file.summary}
                              </Tab.Pane>
                            ))
                            }
                          </Tab.Content>
                        </Col>          
                      </Row>
                    </Tab.Container>
          </div>`, summary: `This is a React component that uses the react-bootstrap library to create a tabbed view for displaying multiple code files. The component takes an array of codeFiles as input, which contains objects with three properties: name, code, and summary.  
                         
          The Tab.Container component creates the tabbed view, with each tab corresponding to a code file. The ListGroup component is used to create a list of clickable tabs on the left side of the view, with each tab displaying the name of a code file.
          \n  
          The Tab.Content component is used to display the actual code and summary for each file. The code and summary are rendered in separate columns on the right side of the view. The Tab.Pane component is used to create the content of each tab, with the eventKey prop used to link the tab to the corresponding code and summary.
          \n  
          Finally, the entire tabbed view is wrapped in a div with some padding applied to it.` },
    {
      name: 'App.css', code: `.App {
          text-align: center;
        }
        
        .App-logo {
          height: 40vmin;
          pointer-events: none;
        }
        
        @media (prefers-reduced-motion: no-preference) {
          .App-logo {
            animation: App-logo-spin infinite 20s linear;
          }
        }
        
        .App-header {
          background-color: #282c34;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size: calc(10px + 2vmin);
          color: white;
        }
        
        .App-link {
          color: #61dafb;
        }
        
        @keyframes App-logo-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        `, summary: `This is a CSS file that provides styling for a React application. The .App class is used to center the content of the application horizontally. The .App-logo class is used to set the height of the logo image and disable pointer events on it.

        The @media rule is used to apply additional styling when the user has not expressed a preference for reduced motion. Specifically, the .App-logo class is animated to spin infinitely for 20 seconds using the animation property.
        
        The .App-header class is used to style the header section of the application. It sets the background color to a dark gray, sets the minimum height of the header to the full viewport height, and centers the content of the header both horizontally and vertically. It also sets the font size and text color of the header text.
        
        The .App-link class is used to set the color of any links in the application to a light blue.
        
        Finally, the @keyframes rule is used to define the spinning animation used by the .App-logo class. It defines a from and to state for the rotation transform property, causing the image to make a full rotation over the course of the animation.` },
    {
      name: 'package.json', code: `{
          "name": "app-name",
          "version": "0.1.0",
          "private": true,
          "dependencies": {
            "@testing-library/jest-dom": "^5.16.5",
            "@testing-library/react": "^13.4.0",
            "@testing-library/user-event": "^13.5.0",
            "@types/jest": "^27.5.2",
            "@types/node": "^16.18.13",
            "@types/react": "^18.0.28",
            "@types/react-dom": "^18.0.11",
            "firebase": "^9.17.1",
            "openai": "^3.1.0",
            "react": "^18.2.0",
            "react-bootstrap": "^2.7.2",
            "react-dom": "^18.2.0",
            "react-scripts": "5.0.1",
            "typescript": "^4.9.5",
            "web-vitals": "^2.1.4"
          },
          "scripts": {
            "start": "react-scripts start",
            "build": "react-scripts build",
            "test": "react-scripts test",
            "eject": "react-scripts eject"
          },
          "eslintConfig": {
            "extends": [
              "react-app",
              "react-app/jest"
            ]
          },
          "browserslist": {
            "production": [
              ">0.2%",
              "not dead",
              "not op_mini all"
            ],
            "development": [
              "last 1 chrome version",
              "last 1 firefox version",
              "last 1 safari version"
            ]
          }
        }
        `, summary: `This is a package.json file that provides configuration information for a React project. It includes information such as the name and version of the project, as well as a list of dependencies required by the project, such as React, Firebase, and React Bootstrap.

        The scripts section includes commands that can be run from the command line to start the development server, build the project for production, run tests, and eject the project from the create-react-app boilerplate.
        
        The eslintConfig section includes configuration for the ESLint tool, which is used for linting and enforcing code quality standards.
        
        The browserslist section specifies the browsers that the project should be compatible with in production and development environments. In production, it specifies that the project should be compatible with browsers that make up more than 0.2% of global browser usage, excluding browsers that are considered "dead" or have very low usage. In development, it specifies compatibility with the latest versions of Chrome, Firefox, and Safari.` },
  ];

  return (
    <div style={{ padding: "3%" }}>
      <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
        <Row>
          <Col sm={3}>
            <ListGroup>
              {codeFiles.map((file, index) => (
                <ListGroup.Item key={index} action href={"#link" + (index + 1)}>
                  {file.name}
                </ListGroup.Item>
              ))
              }
            </ListGroup>
          </Col>
          <Col sm={5}>
            <pre>
              <Tab.Content>
                {codeFiles.map((file, index) => (

                  <Tab.Pane eventKey={"#link" + (index + 1)}>
                    {file.code}
                  </Tab.Pane>
                ))
                }
              </Tab.Content>
            </pre>

          </Col>
          <Col sm={4}>
            <h4>Summary</h4>
            <Tab.Content>
              {codeFiles.map((file, index) => (
                <Tab.Pane eventKey={"#link" + (index + 1)}>
                  {file.summary}
                </Tab.Pane>
              ))
              }
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>

  );
}

export default FilesList;
