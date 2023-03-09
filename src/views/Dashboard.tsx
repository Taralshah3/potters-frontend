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
import { time } from 'console';

function Dashboard() {

  //@ts-ignore
  const user: User = useOutletContext().user;
  const [dropdowns, setDropdowns] = useState<string[]>([]);
  const [fileListElements, setFileListElements] = useState<fileDictionary>({});
  const [activeFile, setActiveFile] = useState<string>("");
  const [accessGitHub, setAccessGitHub] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  useEffect(() => {
    console.log('at use effect');
    console.log(user);
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
      //have a ten second timeout
      const timeout = setTimeout(() => {
        setIsRefreshing(false);
      }, 10000);
      // const response = await fetch(`${constants.apiUrl}${endpoints.refreshRepo}/${activeFile}`, {
      //   method: 'GET',
      //   headers: {
      //     "x-access-potter-auth-token": localStorage.getItem(constants.authHeader) || "",
      //     "Content-Type": 'application/json',
      //   }
      // });
      // const data = await response.json();
      // const files: fileDictionary = data.files;
      // setFileListElements(files);
      // setIsRefreshing(false);
    }
  }

  const dropdownClick = async (fileName: string) => {
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

      {(accessGitHub)
        ?
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
              <Button size="sm" variant="outline-primary" onClick={refreshRepo} disabled={isRefreshing}>Refresh Current Repo</Button>
            </div>
          </div>

          <div>
            <FilesList files={fileListElements} />
          </div>
          {(isRefreshing) ? <LoadingIcon /> : <></>}
        </div>
        :
        <GithubAuth setDropdowns={dropDownSetter} />
      }

    </div>
  );
}

export default Dashboard;
