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
import GithubAuth from '../auth/GithubAuth';
import LoadingIcon from "../components/LoadingIcon";
import "../styles/Dashboard.css";

function Dashboard() {

  //@ts-ignore
  const user: User = useOutletContext().user;
  const [dropdowns, setDropdowns] = useState<string[]>([]);
  const [fileListElements, setFileListElements] = useState<fileDictionary>({});
  const [activeRepo, setActiveRepo] = useState<string>("");
  const [accessGitHub, setAccessGitHub] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  useEffect(() => {
    if (user && user.githubId && dropdowns.length === 0) {
      //@ts-ignore
      const dropdowns: string[] = user.repositories.map((index) => { return index.name });
      dropDownSetter(dropdowns);
    }
  }, [user]);

  const dropDownSetter = (dropDowns: string[]): void => {
    setDropdowns(dropDowns);
    setAccessGitHub(true);
  }

  const refreshRepo = async () => {
    if (!isRefreshing) {
      setIsRefreshing(true);
      const response = await fetch(`${constants.apiUrl}${endpoints.refreshRepo}/${activeRepo}`, {
        method: 'GET',
        headers: {
          "x-access-potter-auth-token": localStorage.getItem(constants.authHeader) || "",
          "Content-Type": 'application/json',
        }
      });
      const data = await response.json();
      const files: fileDictionary = data.files;
      setFileListElements(files);
      setIsRefreshing(false);
    }
  }

  const dropdownClick = async (fileName: string) => {
    if (!isRefreshing) {
      setIsRefreshing(true);
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
      setActiveRepo(fileName);
      setIsRefreshing(false);
    }
  }

  return (
    <div className='Dashboard'>
      {(accessGitHub)
        ?
        <div className='Dashboard-body'>
          <header className='Dashboard-header'>
            <h3 >My Projects</h3>
            <div style={{ marginRight: '15px' }}>
              <DropdownButton size="sm" id="dropdown-basic-button" title={(activeRepo === "") ? "Select Project" : activeRepo} variant='dark'>
                {dropdowns.map((dropdown) => (
                  <Dropdown.Item key={dropdown} onClick={() => { dropdownClick(dropdown) }} variant='dark'>
                    {dropdown}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </div>
            {
              (activeRepo !== "")
                ?
                <Button size="sm" variant="outline-dark" onClick={refreshRepo} disabled={isRefreshing}>Refresh</Button>
                :
                <></>
            }
          </header>
          <FilesList files={fileListElements} />
          {(isRefreshing) ? <LoadingIcon /> : <></>}
        </div>
        :
        <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "50px" }}>
          <h3 style={{ textAlign: 'center', marginRight: '20px' }}>Sign in to view your projects</h3>
          <GithubAuth setDropdowns={dropDownSetter} />
        </div>
      }

    </div>
  );
}

export default Dashboard;
