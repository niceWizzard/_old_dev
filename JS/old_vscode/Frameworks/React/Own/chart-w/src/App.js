import { useState, useEffect, useReducer } from 'react';
import './App.css';
import AddData from './components/AddData';
import Chart from './components/Chart';
import { putData, fetchData, setChartDataFunction, getObjectName, getObjectValue, getObjectNameColor } from './components/GenFunctions';

function App() {
  const url = 'http://localhost:8080/wetengData';

  const [mainData, dispatch] = useReducer((state, action) => {

    if (action.type === 'update') {
      return { state: action.newMainData }
    }
    return { state: action.res }
  }, {})

  const [isAdding, setIsAdding] = useState(false);
  const [inputData, setInputData] = useState('')
  const [heyLabel, setLabel] = useState([])
  const [selection, setSelection] = useState('By Pair')


  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: '',
      data: [],
    }],
  })

  useEffect(async () => {
    const res = await fetchData('http://localhost:8080/wetengData');
    dispatch({ res })
  }, [])

  useEffect(() => {
    setChartData({
      labels: getObjectName(mainData.state),
      datasets: [{
        ...chartData.datasets[0],
        data: getObjectValue(mainData.state),
        backgroundColor: getObjectNameColor(mainData.state),
      }]
    })

    setLabel(getObjectName(mainData.state))

  }, [mainData])



  const handleAddData = async (e) => {
    e.preventDefault();
    setInputData('');
    setIsAdding(false)
    let doesExist = false;
    const gotData = await fetchData(url)

    for (let key of chartData.labels) {
      if (key === inputData) {
        gotData[key]++;
        putData(url, gotData)
        doesExist = true;
        const newMainData = { ...mainData.state };
        newMainData[key] += 1;
        console.log(newMainData)
        dispatch({ newMainData, type: 'update' })
      }
    }
    if (!doesExist) {
      console.log('New !');
      gotData[inputData] = 1;
      putData(url, gotData)
      const newMainData = gotData
      dispatch({ newMainData, type: 'update' })
    }

  }


  return (
    <div className="App">
      <AddData handleAddData={handleAddData} setIsAdding={setIsAdding}
        isAdding={isAdding}
        inputData={inputData}
        setInputData={setInputData}
      />
      <select
        value={selection}
        onChange={(e) => setSelection(e.target.value.toLocaleLowerCase())}
      >
        <option value="by pair">By Pair</option>
        <option value="by single">By Single</option>
      </select>
      <Chart
        chartData={chartData} heyLabel={heyLabel} mainData={mainData.state}
        setChartData={setChartData}
        sortType={selection}
      />
    </div>
  );
}

export default App;
