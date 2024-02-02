import { useState,  } from 'react';
import './App.css';
import ReadCSV from './Components/ParsingObj'
import ReadRemoteFile from './Components/ReadRemoteFile';
import SelectXY from './Components/SelecyXY';

export default function App() {
  const [inputLink, setInputLink] = useState("");
  const [colHeads, setColHeads] = useState([]);
  const [csvData, setCsvData] = useState([]);
  const [values, setValues] = useState({
    xvalues: '',
    yvalues: '',
  });
  const storeXYValues = {
    x:[],
    y:[]
  }

  function handleXYValues(e) {
    e.preventDefault();
    const {name, value} = e.target;
    setValues(prev => (
      {...prev, [name]: value}
    ))
  }

  const getColumnValues = (column, selectedColumn) => {
    const columnIndex = colHeads.indexOf(selectedColumn);
    return csvData.map(row => row[columnIndex]);
  }

  storeXYValues.x.push(getColumnValues('x', values.xvalues))
  storeXYValues.y.push(getColumnValues('y', values.yvalues))

  console.log(storeXYValues)
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