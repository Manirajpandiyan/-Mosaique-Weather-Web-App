import './App.css';
import LOGO from './mosaique.png';
import HOME from './Mosaiquehome.png'
import { GiHamburgerMenu } from 'react-icons/gi';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [opendiv, setOpenDiv] = useState(false);
  const [climate, setclimate] = useState([])
  const [tem_check, settem_check] = useState(false)
  const [hum_check, sethum_check] = useState(false)
  const [rain_check, setrain_check] = useState(false)
  const [filter_select, setfilter_select] = useState(false)
  const [is_Hover, setis_Hover] = useState(false)
  const [hover_text, sethover_text] = useState('')


  const handleClick = () => {
    if (opendiv === false) {
      setOpenDiv(true)
    }
    else if (opendiv === true) {
      setOpenDiv(false)
    }
  }
  // API AND CONDITIONS 
  useEffect(() => {
    // TEMPERATURE 
    if (tem_check === true && hum_check === false && rain_check === false) {
      setfilter_select(true)
      axios.get(`http://103.7.8.89:8001/data/sensor/`, { params: { "sensor_id": 'temperature' } })
        .then(res => {
          const persons = res.data.context;
          setclimate(res.data.context)
          console.log('response', persons);
        })
    }
    // HUMIDITY 
    else if (tem_check === false && hum_check === true && rain_check === false) {
      setfilter_select(true)

      axios.get(`http://103.7.8.89:8001/data/sensor/`, { params: { "sensor_id": 'humidity' } })
        .then(res => {
          const persons = res.data.context;
          setclimate(res.data.context)
          console.log('response', persons);
        })
    }
    // RAIN FALL 
    else if (tem_check === false && hum_check === false && rain_check === true) {
      setfilter_select(true)

      axios.get(`http://103.7.8.89:8001/data/sensor/`, { params: { "sensor_id": 'rainfall' } })
        .then(res => {
          const persons = res.data.context;
          setclimate(res.data.context)
          console.log('response', persons);
        })
    }
    // TEMPERATURE AND HUMIDITY
    else if (tem_check === true && hum_check === true && rain_check === false) {
      setfilter_select(true)

      axios.get(`http://103.7.8.89:8001/data/sensor/`, { params: { "sensor_id": "temperature,humidity" } })
        .then(res => {
          const persons = res.data.context;
          setclimate(res.data.context)
          console.log('response', persons);
        })
    }
    // TEMPERATURE AND RAIN
    else if (tem_check === true && hum_check === false && rain_check === true) {
      setfilter_select(true)

      axios.get(`http://103.7.8.89:8001/data/sensor/`, { params: { "sensor_id": "temperature,rainfall" } })
        .then(res => {
          const persons = res.data.context;
          setclimate(res.data.context)
          console.log('response', persons);
        })
    }
    // HUMIDITY AND RAINFALL 
    else if (tem_check === false && hum_check === true && rain_check === true) {
      setfilter_select(true)

      axios.get(`http://103.7.8.89:8001/data/sensor/`, { params: { "sensor_id": "humidity,rainfall" } })
        .then(res => {
          const persons = res.data.context;
          setclimate(res.data.context)
          console.log('response', persons);
        })
    }
    // BOTH 
    else if (tem_check === true && hum_check === true && rain_check === true) {
      setfilter_select(true)

      axios.get(`http://103.7.8.89:8001/data/sensor/`, { params: { "sensor_id": "temperature,humidity,rainfall" } })
        .then(res => {
          const persons = res.data.context;
          setclimate(res.data.context)
          console.log('response', persons);
        })
    }
    // WITHOUT SELECT 
    else {
      setfilter_select(false)
    }
  }, [tem_check, hum_check, rain_check])



  return (
    <div className="app">
      <header className="appHeader">
        <img className="headerLogo" src={LOGO} alt="Logo" />
        <div className="menuBarIconDiv">
          <GiHamburgerMenu className="menuBarIcon" size={30} onClick={() => handleClick()} />
          {opendiv === true ?
            <div className="homeMenu">
              Home
            </div>
            : null}
        </div>
      </header>
      <div>
        <img className="homeImage" src={HOME} alt="Home Img" />
      </div>
      <div className="mainHeading">
        Agriculture Sensor data
      </div>
      <form action="/action_page.php" className="CheckBoxForm">
        <input type="checkbox" id="Temperature" name="Temperature" value="1" onChange={() => { settem_check(tem_check === false ? true : false) }} />
        <label for="Temperature"> Temperature</label>
        <input type="checkbox" id="Temperature" name="Temperature" value="2" onChange={() => { sethum_check(hum_check === false ? true : false) }} />
        <label for="Temperature"> Humidity</label>
        <input type="checkbox" id="Rainfall" name="Rainfall" value="3" onChange={() => { setrain_check(rain_check === false ? true : false) }} />
        <label for="Rainfall"> Rainfall</label>
      </form>
      <div className="mainContainer">
        {filter_select ? climate.length > 0 && climate.map(({ sensor, icon, date, value }, i) => {
          return (
            <div key={i} data-info={"Very Hot"} onMouseEnter={() => { setis_Hover(true); sethover_text(i) }} onMouseLeave={() => { setis_Hover(false); sethover_text('') }} className="parts">
              <img className="weatherIconImage" alt="Weather icon" src={icon.replace('localhost', '103.7.8.89:8001')} />
              <div>{sensor}</div>
              <div>{date}</div>
              <div>{value}</div>
              {
                is_Hover && (
                  <div className="weatherInfoText" key={i}>
                    {hover_text === i ? sensor === "Temperature" ? JSON.stringify("Very hot") : sensor === "Humidity" ? JSON.stringify("Chances") : sensor === "Rainfall" ? JSON.stringify("Heavy Rain") : null : null}
                  </div>
                )
              }
            </div>
          )
        }) : <div className="infoText">Select Filter to display Data</div>}
      </div>
      <footer className="appFooter">
        Copyright Mosaique 2022
      </footer>
    </div>
  );
}

export default App;
