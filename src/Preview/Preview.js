import React, { Suspense } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import Model from '../Model/Model';
import STLModel from '../Model/STLModel';

const Preview = ({ file, loadElement, setFileList }) => {

    const onClick = () => {
        // console.log(file);
        loadElement(file);
    }

    const removeFile = () => {
        setFileList(prev => prev.filter(element => element !== file))
    }

    return (
        <div>
        <Canvas
            onClick={onClick}
            camera={{ position: [0, 10, 100], fov: 100 }}
            style={{
                backgroundColor: '#111a21',
                width: '150px',
                height: '150px',
            }}
        >
            <ambientLight intensity={1} />
            {/* <ambientLight intensity={0.1} /> */}
            {/* <directionalLight intensity={1.5} target-position={[1, 0, 0]}/> */}
            <directionalLight intensity={1.5} position={[10, 10, 10]} />
            <pointLight position={[10, 10, 0]} intensity={0.75} />
            <Suspense fallback={null}>
                <STLModel file={file} position={[0.025, -0.9, 0]} interact={false} />
            </Suspense>
        </Canvas>
        <button onClick={removeFile}>Remove</button>
        </div>
    )
}

export default Preview;