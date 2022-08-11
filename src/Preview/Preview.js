import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import STLModel from '../Model/STLModel';
import './Preview.css';

const Preview = ({ file, loadElement, setFileList }) => {

    const onClick = () => {
        // console.log(file);
        loadElement(file);
    }

    const removeFile = () => {
        // setFileList(prev => prev.filter(element => element !== file))
        setFileList(prev => prev.filter(element => element.name !== file.name))
        console.log(file);
    }

    return (
        <div className='preview'>
            <button className='remove-button' onClick={removeFile}>Remove</button>
            <Canvas
                onClick={onClick}
                camera={{ position: [60, 20, 100], fov: 50 }}
                style={{
                    backgroundColor: '',
                    width: '150px',
                    height: '150px',
                }}
            >
                <ambientLight intensity={1} />
                <directionalLight intensity={1.5} position={[10, 10, 10]} />
                <pointLight position={[10, 10, 0]} intensity={0.5} />
                <Suspense fallback={null}>
                    <STLModel file={file} color={'#696969'} />
                </Suspense>
            </Canvas>
            <p>{file.name}</p>
        </div>
    )
}

export default Preview;