import { useState } from 'react';
import './App.css';
import {ReadCSV, ReadRemoteFile} from './Components/ParsingObj'

function App() {
  const [inputLink, setInputLink] = useState("")

  const handleChange = (e) => {setInputLink(e.target.value)}
  return (
    <section>
      <ReadCSV />
      <label htmlFor='inputLink'>Paste your remote file link here</label>
      <input 
        type='url' 
        id="inputLink" 
        name="inputLink"
        value={inputLink}
        onChange={handleChange}
      />
      <ReadRemoteFile link={inputLink}/>
    </section>
  );
}

export default App