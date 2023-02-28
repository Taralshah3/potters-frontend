import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ClientRequest } from 'http';
import { fileURLToPath } from 'url';
import { textChangeRangeNewSpan } from 'typescript';
import { Configuration, OpenAIApi } from "openai";

function App() {

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
  
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <div style={{marginLeft: "10%", marginTop: "5%"}}>
      <h1> File Summarizer ting </h1>
      <input type="file" onChange={handleFileChange} />
      <div style={{display: "flex"}}>
        <div>
          <h3>Your Text File</h3>
        <pre id="output"></pre> 
        </div>
        <div style={{marginLeft: "10%"}}>
          <h3>Summarized Output</h3>
          <div style={{maxWidth: "500px"}}>
            <div id="summarized_output"></div>
          </div>
        </div>
      </div>
    
    </div>
  );
}

export default App;
