import { useEffect, useState } from 'react';
import { Route, Switch, Link, useHistory } from 'react-router-dom';

import Profile from './Profice';
import './App.css';

function App() {
  const [dropDownData, setDropDownData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const fetchFun = async () => {
      const responce = await fetch('https://swapi.dev/api/');
      const responceData = await responce.json();

      let responceArray = [];
      for (let mykey in responceData) {
        let obj = {
          key: mykey,
          link: responceData[mykey]
        }
        responceArray.push(obj);
      }
      setDropDownData(responceArray);
      firstHandler(responceArray[0]);
    };
    fetchFun();
  }, []);

  const selecterHandler = async (event = null) => {
    let value = event.target.value;
    const responce = await fetch(`https://swapi.dev/api/${value}`);
    const responceData = await responce.json();
    setTableData(responceData);
  };

  const nextHandler = async () => {
    const responce = await fetch(tableData.next);
    const responceData = await responce.json();
    setTableData(responceData);
  }

  const prevHandler = async () => {
    const responce = await fetch(tableData.previous);
    const responceData = await responce.json();
    setTableData(responceData);
  }

  const firstHandler = async (obj) => {
    let value = obj.key;
    const responce = await fetch(`https://swapi.dev/api/${value}`);
    const responceData = await responce.json();
    setTableData(responceData);
  };

  const formatDate = (date) => {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;
    return [year, month, day].join('-');
  }

  const home = <div className={dark ? 'App dark-mode' : 'App white-mode'}>
    <h1>Play with API</h1>
    <button onClick={() => setDark(!dark)}> Switch to {dark ? 'Light mode' : 'Dark mode'}</button><br />
    <span>Select dropDownData : </span>
    <select onChange={selecterHandler}>
      {dropDownData.map((item, index) => <option selected={index === 0 && true} key={index} value={item.key}>{item.key}</option>)}
    </select>
    <h1>Table</h1>
    <table>
      <tr>
        <th>Name</th>
        <th>Created</th>
        <th>Edited</th>
      </tr>
      {tableData.results && tableData.results.map((item, index) => {
        return (
          <tr key={index}  >
            <Link to={item.url.substring(21)} className="link">
              <td>{item.name ? item.name : item.title}</td>
            </Link>
            <td>{formatDate(item.created)}</td>
            <td>{formatDate(item.created)}</td>
          </tr>
        )
      })}
    </table>

    {tableData.previous && <button onClick={prevHandler}>prev</button>}
    {tableData.next && <button onClick={nextHandler}>next</button>}
  </div>;

  return (
    <Switch>
      <Route path='/' exact>
        {home}
      </Route>
      <Route path='/:data/:id'>
        <Profile />
      </Route>
    </Switch>
  );
}

export default App;
