import { useState, useEffect } from 'react';
import './App.css';
import ReadCSV from './Components/ParsingObj'
import ReadRemoteFile from './Components/ReadRemoteFile';
import SelectXY from './Components/SelecyXY';

function App() {
  const [inputLink, setInputLink] = useState("");
  const [colHeads, setColHeads] = useState([]);
  const [csvData, setCsvData] = useState([]);
  const [values, setValues] = useState({
    xvalues: '',
    yvalues: '',
  });

  function handleXYValues(e) {
    e.preventDefault();
    const {name, value} = e.target;
    setValues(prev => (
      {...prev, [name]: value}
    ))
  }

  const getColumnValues = val => {
    return csvData.slice(1).map(r => r[val]);
  }

  useEffect(() => {
    console.log(`X values: ${getColumnValues(values.xvalues)}`);
    console.log(`Y values: ${getColumnValues(values.yvalues)}`);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values, csvData]);

   
  const handleChange = (e) => {
    setInputLink(e.target.value)
  }

  return (
    <section>
      <ReadCSV
        getColumns={setColHeads}
        getData={setCsvData}
      />
      
      <label htmlFor='inputLink'>
        Paste your remote file link here
      </label>
      <input 
        type='url' 
        id="inputLink" 
        name="inputLink"
        value={inputLink}
        onChange={handleChange}
      />

      <ReadRemoteFile 
        link={inputLink}
        getColumns={setColHeads}
        getData={setCsvData}
      />

      <SelectXY 
        columns={colHeads}
        handleXYValues={handleXYValues}
        xyValues={values}
        getColumnValues={getColumnValues}
      />
    </section>
  );
}

export default App