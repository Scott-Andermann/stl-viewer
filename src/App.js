import logo from './logo.svg';
import {useEffect, useState} from 'react';
import './App.css';
import Scene from './Scene/Scene';
import Upload from './Upload/Upload';
import Preview from './Preview/Preview';


function App() {
  const [file, setFile] = useState(''); // set to empty string for full functionality
  const [fileList, setFileList] = useState([]);  //array of objects
  // console.log(fileList.length);
  // console.log(fileList);

  const onClick = () => {
    setFile('');
  }

  const loadElement = (e) => {
    setFile(e);
  }

  console.log(fileList);

  useEffect(() => {
    if (file !== '') setFileList(prev => prev.findIndex(element => element.name === file.name) === -1 ? [...prev, file] : prev)
  }, [file])

  // arr.findIndex(element => element.name === 'string 3'))
  return (
    <div className="App">
      <header className="App-header">
        <h1>STL viewer App</h1>
      </header>
      {file && <Scene file={file} setFile={setFile}/>}
      {file ? <></>: <Upload setFile={setFile}/>}
      {file ? <button onClick={onClick}>Upload a new file</button> : <></>}
      <h3>Previous Models</h3>
      <div className='prev-models'>

        {fileList.length > 0 && fileList.map(element => <Preview loadElement={loadElement} file={element} setFileList={setFileList} />)}
      </div>
    </div>
  );
}

export default App;
