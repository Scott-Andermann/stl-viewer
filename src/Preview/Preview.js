import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import STLModel from '../Model/STLModel';

const Preview = ({ file, loadElement, setFileList }) => {

    const [zPosition, setZPosition] = useState(100);

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
        <div>
        <Canvas
            onClick={onClick}
            camera={{ position: [0, 10, zPosition], fov: 100 }}
            style={{
                backgroundColor: '#676f85',
                width: '150px',
                height: '150px',
            }}
        >
            <ambientLight intensity={1} />
            <directionalLight intensity={1.5} position={[10, 10, 10]} />
            <pointLight position={[10, 10, 0]} intensity={0.5} />
            <Suspense fallback={null}>
                <STLModel file={file} color={'#696969'} setZPosition={setZPosition}/>
            </Suspense>
        </Canvas>
        <button onClick={removeFile}>Remove</button>
        </div>
    )
}

export default Preview;