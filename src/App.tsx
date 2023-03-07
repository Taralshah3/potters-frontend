import { useEffect, useState } from 'react';
import { constants, endpoints } from "./constants";
import { fileDictionary } from './types/constants';
import './App.css';
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

  const [dropdowns, setDropdowns] = useState<string[]>([]);
  const [fileListElements, setFileListElements] = useState<fileDictionary>({});
  const [activeFile, setActiveFile] = useState<string>("");


  const refreshRepo = async () => {
    console.log('resfreshing repo: ', activeFile);
    const response = await fetch(`${constants.apiUrl}${endpoints.refreshRepo}/${activeFile}`, {
      method: 'GET',
      headers: {
        "x-access-potter-auth-token": localStorage.getItem(constants.authHeader) || "",
        "Content-Type": 'application/json',
      }
    });
    const data = await response.json();
    console.log(data);
    const files: fileDictionary = data.files;
    setFileListElements(files);
  }

  const dropdownClick = async (fileName: string) => {
    console.log(fileName);
    const response = await fetch(`${constants.apiUrl}${endpoints.githubRepo}/${fileName}`, {
      method: 'GET',
      headers: {
        "x-access-potter-auth-token": localStorage.getItem(constants.authHeader) || "",
        "Content-Type": 'application/json',
      }
    });

    const data = await response.json();
    console.log(data);
    const files: fileDictionary = data.files;
    setFileListElements(files);
    setActiveFile(fileName);
  }


  useEffect(() => {
    isLoggedIn().then((res: boolean) => {
      if (res) {
        console.log('✅ The user is logged in');
      } else {
        console.log('❌ Not authenticated');
      }
    });
  }, []);




  return (
    <div>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">clay.ai</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
          </Nav>
          <AuthGoogle />
          <GithubAuth setDropdowns={setDropdowns} />
        </Container>
      </Navbar>
      <div style={{ marginTop: "3%", textAlign: 'center' }}>
        <h3 >My Projects</h3>
        <DropdownButton size="sm" id="dropdown-basic-button" title="Select Project" >
          {dropdowns.map((dropdown) => (
            <Dropdown.Item key={dropdown} onClick={() => { dropdownClick(dropdown) }}>
              {dropdown}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </div>

      <div>
        <button onClick={refreshRepo}>Refresh</button>
        <FilesList files={fileListElements} />
      </div>

    </div>
  );
}

export default App;
