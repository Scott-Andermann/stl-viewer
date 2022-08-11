import { useEffect, useState } from 'react';
import './App.css';
import Scene from './Scene/Scene';
import Upload from './Upload/Upload';
import Preview from './Preview/Preview';

function App() {
  const [file, setFile] = useState(''); // set to empty string for full functionality
  const [fileList, setFileList] = useState([]);  //array of objects
  const [color, setColor] = useState('#696969');
  const colorList = ['#696969', '#fcba03', '#1c68ff']

  const onClick = () => {
    setFile('');
  }

  const loadElement = (e) => {
    setFile(e);
  }

  useEffect(() => {
    if (file !== '') setFileList(prev => prev.findIndex(element => element.name === file.name) === -1 ? [...prev, file] : prev)
  }, [file])

  // arr.findIndex(element => element.name === 'string 3'))
  return (
      <div className="App">
        <header className="App-header">
          <h1>STL viewer App</h1>
        </header>
        {file && <Scene setFile={setFile} file={file} color={color}/>}
        {file ? <></> : <Upload setFile={setFile} />}
        {file ? <button onClick={onClick}>Upload a new file</button> : <></>}
        {colorList.map(element => <button onClick={() => setColor(element)}>{element}</button>)}
        <h3>Previous Models</h3>
        <div className='prev-models'>

          {fileList.length > 0 && fileList.map(element => <Preview loadElement={loadElement} file={element} setFileList={setFileList} />)}
        </div>
      </div>
  );
}

export default App;
