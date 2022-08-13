import { useEffect, useState } from 'react';
import './ViewModel.css';
import Scene from '../Scene/Scene';
import Upload from '../Upload/Upload';
import Preview from '../Preview/Preview';

function ViewModel() {
  const [file, setFile] = useState(''); // set to empty string for full functionality
  const [fileList, setFileList] = useState([]);  //array of objects
  const [color, setColor] = useState('#696969');
  const [dragActive, setDragActive] = useState(false);
  const [newModel, setNewModel] = useState(true);



  const loadElement = (e) => {
    setFile(e);
    setNewModel(false)
  }

  useEffect(() => {
    if (file !== '') setFileList(prev => prev.findIndex(element => element.name === file.name) === -1 ? [...prev, file] : prev)
  }, [file])

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      if (e.dataTransfer.files[0].name.slice(-3) === 'stl') {
        setFile({ url: URL.createObjectURL(e.dataTransfer.files[0]), name: e.dataTransfer.files[0].name });
        setNewModel(true);
      }
      else alert('Please upload a valid STL file')
    }
  }

  // arr.findIndex(element => element.name === 'string 3'))
  return (
    <div className="ViewModel">
      {file && <Scene setFile={setFile} file={file} color={color} setColor={setColor} handleDrag={handleDrag} handleDrop={handleDrop} dragActive={dragActive} newModel={newModel} />}
      {file ? <></> : <Upload setFile={setFile} handleDrag={handleDrag} handleDrop={handleDrop} dragActive={dragActive} />}

      {fileList.length > 0 && <h2>Loaded Models</h2>}
      {fileList.length > 0 &&
        <div className='prev-models'>
          {fileList.length > 0 && fileList.map(element => <Preview loadElement={loadElement} file={element} setFileList={setFileList} />)}
        </div>
      }
    </div>
  );
}

export default ViewModel;
