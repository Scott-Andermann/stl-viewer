import { useRef} from 'react';
import './Upload.css'

const Upload = ({setFile, handleDrag, handleDrop, dragActive}) => {
    
    const inputRef = useRef(null);

    const handleChange = (e) => {
        e.preventDefault();
        console.log(e.target.files[0]);
        if (e.target.files && e.target.files[0]){
            setFile({url: URL.createObjectURL(e.target.files[0]), name: e.target.files[0].name});
        }
    }

    const onButtonClick = () => {
        inputRef.current.click();
    }

    return (
        <form id='upload-form' onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
            <input ref={inputRef} type='file' id='input-upload' accept='.stl' multiple={false} onChange={handleChange}/>
            <label id='label-upload' htmlFor='input-upload' className={dragActive ? 'drag-active' : ''}>
                <div>
                    <p>Drag and drop your file here or</p>
                    <button className='upload-button' onClick={onButtonClick}>Upload a file</button>
                </div>
            </label>
            {dragActive && <div id='drag-file-element' onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop} />}
        </form>
    );
};

export default Upload;