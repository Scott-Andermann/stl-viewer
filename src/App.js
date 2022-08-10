import logo from './logo.svg';
import {useEffect, useState} from 'react';
import './App.css';
import Scene from './Scene/Scene';
import Upload from './Upload/Upload';
import Preview from './Preview/Preview';


function App() {
  const [file, setFile] = useState(''); // set to empty string for full functionality
  const [fileList, setFileList] = useState([]);
  // console.log(fileList.length);
  // console.log(fileList);

  const onClick = () => {
    setFile('');
  }

  const loadElement = (e) => {
    setFile(e);
  }

  useEffect(() => {
    if (file !== '') setFileList(prev => prev.indexOf(file) === -1 ? [...prev, file] : prev)
  }, [file])

  return (
    <div className="App">
      {/* <header className="App-header">
        <h1>STL viewer App</h1>
      </header> */}
      {file && <Scene file={file} setFile={setFile}/>}
      {file ? <></>: <Upload setFile={setFile}/>}
      {file ? <button onClick={onClick}>Upload a new file</button> : <></>}
      <div className='prev-models'>
        {fileList.length > 0 && fileList.map(element => <Preview loadElement={loadElement} file={element} setFileList={setFileList} />)}
      </div>
    </div>
  );
}

export default App;
