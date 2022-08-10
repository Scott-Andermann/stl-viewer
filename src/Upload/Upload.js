import {useState} from 'react';
import './Upload.css'

const Upload = ({setFile}) => {
    const [dragActive, setDragActive] = useState(false);
    

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if(e.type ==='dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    }

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]){
            // console.log('file ready for upload');
            // console.log(e.dataTransfer.files);
            setFile({url: URL.createObjectURL(e.dataTransfer.files[0]), name: e.dataTransfer.files[0].name});
        }
    }

    const handleChange = (e) => {
        e.preventDefault();
        console.log(e.target.files);
        if (e.target.files && e.target.files[0]){
            // console.log('file ready for upload');
            // console.log(e.dataTransfer.files);
            console.log('were in' )
            setFile({url: URL.createObjectURL(e.target.files[0]), name: e.target.files[0].name});
        }
    }

    return (
        <form id='upload-form' onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
            <input type='file' id='input-upload' multiple={false} onChange={handleChange}/>
            <label id='label-upload' htmlFor='input-upload' className={dragActive ? 'drag-active' : ''}>
                <div>
                    <p>Drag and drop your file here or</p>
                    <button className='upload-button'>Upload a file</button>
                </div>
            </label>
            {dragActive && <div id='drag-file-element' onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop} />}
        </form>
    );
};

export default Upload;