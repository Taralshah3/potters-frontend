import { useEffect, useState } from 'react';
import { constants, endpoints } from "../constants";
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import { fileDictionary } from '../types/constants';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-core';
import 'prismjs/plugins/autoloader/prism-autoloader';
import CodeDisplay from './CodeDisplay';
import { Form } from 'react-bootstrap';


// import Sonnet from '../../components/Sonnet';

interface Props {
  files: fileDictionary;
}

function FilesList(props: Props) {

  const [codeFiles, setCodeFiles] = useState<fileDictionary>({});
  const [summaryText, setSummaryText] = useState<string>("No summary yet.");
  const [codeText, setCodeText] = useState<string>("No file selected yet.");
  const [searchText, setSearchText] = useState<string>("");
  const [selectedFileKey, setSelectedFileKey] = useState<String>("");

  useEffect(() => {
    Prism.highlightAll();
  }, [codeText])

  useEffect(() => {
    //looop through the props.files and keep only the code files with type of file
    const codeFiles: fileDictionary = {};
    for (const key in props.files) {
      if (props.files[key].type === "file") {
        codeFiles[key] = props.files[key];
      }
    }
    setCodeFiles(codeFiles);
  }, [props.files]);

  const getSummary = async (fileId: string) => {
    const response = await fetch(`${constants.apiUrl}${endpoints.fileContents}/${fileId}`, {
      method: 'GET',
      headers: {
        "x-access-potter-auth-token": localStorage.getItem(constants.authHeader) || "",
        "Content-Type": 'application/json',
      }
    });
    const data = await response.json();
    const content: string = data.content;
    const summary: string = data.summary;
    setCodeText(content);
    setSummaryText(summary);
    setSelectedFileKey(fileId);
  }

  const filteredFiles = Object.keys(codeFiles).filter(key =>
    codeFiles[key].name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className='FileList'>
      <div className='FileList-list'>
        <Form.Control type="text" placeholder="Search files..." onChange={(event) => { setSearchText(event.target.value) }} />
        <ListGroup variant='dark'>
          {filteredFiles.map((key, index) => (
            <ListGroup.Item key={key} style={{ cursor: "pointer" }} active={selectedFileKey === key} onClick={() => { getSummary(key) }}>
              {codeFiles[key].name}
            </ListGroup.Item>
          ))
          }
        </ListGroup>
      </div>

      <div className='FileList-code'>
        <CodeDisplay code={codeText} />
      </div>
      <div className='FileList-summary'>
        <h4>Summary</h4>
        <div style={{ whiteSpace: 'pre-line' }}>
          {`${summaryText}`}
        </div>

      </div>


    </div>

  );
}

export default FilesList;
