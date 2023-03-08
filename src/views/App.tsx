import { useEffect, useState } from 'react';
import { constants, endpoints } from "../constants";
import { fileDictionary } from '../types/constants';
import '../styles/App.css';
import FilesList from '../components/FilesList';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import { useOutletContext } from 'react-router-dom';
import { User } from "../types/constants";


function App() {

  //@ts-ignore
  const user: User = useOutletContext().user;
  const [dropdowns, setDropdowns] = useState<string[]>([]);
  const [fileListElements, setFileListElements] = useState<fileDictionary>({});
  const [activeFile, setActiveFile] = useState<string>("");


  useEffect(() => {

  }, []);

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
    const files: fileDictionary = data.files;
    setFileListElements(files);
    setActiveFile(fileName);
  }





  return (
    <div>
      <div style={{ marginTop: "3%", textAlign: 'center' }}>
        <h3 >My Projects</h3>
        <div style={{ display: "flex", justifyContent: "center", gap: '10px' }}>
          <DropdownButton size="sm" id="dropdown-basic-button" title="Select Project" >
            {dropdowns.map((dropdown) => (
              <Dropdown.Item key={dropdown} onClick={() => { dropdownClick(dropdown) }}>
                {dropdown}
              </Dropdown.Item>
            ))}
          </DropdownButton>
          <Button size="sm" variant="outline-primary" onClick={refreshRepo}>Refresh Summaries</Button>
        </div>
      </div>

      <div>
        <FilesList files={fileListElements} />
      </div>

    </div>
  );
}

export default App;
