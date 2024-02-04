import { useEffect, useState,  } from 'react';
import './App.css';
import ReadCSV from './Components/ParsingObj'
import ReadRemoteFile from './Components/ReadRemoteFile';
import SelectXY from './Components/SelecyXY';
import Diagram from './Components/ChartVisuals';


export default function App() {
  const [inputLink, setInputLink] = useState(""); //state for managing the url input
  const [colHeads, setColHeads] = useState([]); // state for storing the data columns heads
  const [csvData, setCsvData] = useState([]); // state for storing the csv data values
  const [resData, setResData] = useState(null);
  const [values, setValues] = useState({
    xvalues: '',
    yvalues: '',
  }); // state for keeping track of the x & y columns head chosen by the user in the dropdown menu
  

  // an object to store the x & y values in the respective arrays;
  const storeXYValues = {
    x:[],
    y:[]
  }

  /**
   * @name: postData
   * description: to send x and y values for cleaning
   * return: null
   */
  const postData = () => {
    if (!storeXYValues.x || !storeXYValues.y) {return undefined}
    fetch('http://127.0.0.1:5000/api/data', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(storeXYValues)
    })
    .then(response => response.json())
    .then(data => setResData(data))
    .catch(error => console.error('Error:', error));
  }

  //hook for managing the postData() when the x and y values changes
  useEffect(()=> {
    postData()
  }, [storeXYValues.x, storeXYValues.y])

  /**
   * Retrieves the x and y column head from the select  option
   * @name: handleXYValues
   * @param {*} e - The event
   */
  function handleXYValues(e) {
    e.preventDefault();
    const {name, value} = e.target;
    setValues(prev => (
      {...prev, [name]: value}
    ))
  }


/**
 * Retrieves values from the specified column in a CSV dataset based on the selected column.
 * @param {*} column - The original column (not used in the current implementation).
 * @param {*} selectedColumn - The column for which values will be retrieved.
 * @returns {Array} - An array of values from the selected column.
 */
  const getColumnValues = (column, selectedColumn) => {
    const columnIndex = colHeads.indexOf(selectedColumn);
    return csvData.map(row => row[columnIndex]);
  }


  if (values.xvalues && values.yvalues) {
    storeXYValues.x.push(getColumnValues('x', values.xvalues))
    storeXYValues.y.push(getColumnValues('y', values.yvalues))
  }

  const handleChange = (e) => {
    setInputLink(e.target.value)
  }

  return (
    <section className='mainSection'>
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

      <Diagram 
        datavalues = {storeXYValues}
      />
    </section>
  );
}