import { useEffect, useState } from 'react';
import './App.css';
import {Row, Col} from "antd";
import axios from "axios";

function App() {
  const [data, setData] = useState([])

  useEffect(() => {
    axios.get("https://lnqt46vr-3000.asse.devtunnels.ms/api?result=10&page=1")
    .then(response => {
      console.log(response);
      setData(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  }, []);

  return (
    <div className="App">
      <h1><b>List</b></h1>
      <Row>
        <Col span={8}>col-8</Col>
        <Col span={8} offset={8}>
          col-8
        </Col>
      </Row>
    </div>
  );
}

export default App;
