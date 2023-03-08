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
    console.log('FilesList useEffect: ', props.files);
    //looop through the props.files and keep only the code files with type of file
    const codeFiles: fileDictionary = {};
    for (const key in props.files) {
      if (props.files[key].type === "file") {
        codeFiles[key] = props.files[key];
      }
    }
    console.log('codeFiles: ', codeFiles);
    setCodeFiles(codeFiles);
  }, [props.files]);

  const getSummary = async (fileId: string) => {
    console.log('get summary: ', fileId);
    console.log('getSummary: ', fileId);
    const response = await fetch(`${constants.apiUrl}${endpoints.fileContents}/${fileId}`, {
      method: 'GET',
      headers: {
        "x-access-potter-auth-token": localStorage.getItem(constants.authHeader) || "",
        "Content-Type": 'application/json',
      }
    });
    const data = await response.json();
    console.log('we are back');
    console.log(data);
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
    <div style={{ padding: "3%" }}>
      <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1" >
        <Row>
          <Col sm={3}>
            <Form.Control style={{ marginBottom: "10px" }} type="text" placeholder="Search files..." onChange={(event) => { setSearchText(event.target.value) }} />
            <ListGroup>
              {filteredFiles.map((key, index) => (
                <ListGroup.Item key={key} style={{ cursor: "pointer" }} active={selectedFileKey === key} onClick={() => { getSummary(key) }}>
                  {codeFiles[key].name}
                </ListGroup.Item>
              ))
              }
            </ListGroup>
          </Col>
          <Col sm={5} >
            <CodeDisplay code={codeText} />
          </Col>
          <Col sm={4}>
            <h4>Summary</h4>
            <div style={{ whiteSpace: 'pre-line' }}>
              {`${summaryText}`}
            </div>

          </Col>
        </Row>
      </Tab.Container>
    </div>

  );
}

export default FilesList;
