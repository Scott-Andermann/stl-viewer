import React, { Suspense, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Model from '../Model/Model';
import STLModel from '../Model/STLModel';

const Scene = ({ file, setFile }) => {
    const [dragActive, setDragActive] = useState(false);

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
            // console.log('file ready for upload');
            console.log(e.dataTransfer.files[0].name);
            setFile({url: URL.createObjectURL(e.dataTransfer.files[0]), name: e.dataTransfer.files[0].name});
        }
    }

    const resetCamera = () => {
        
    }

    // console.log(dragActive);
    // console.log(file);

    return (
        <div>
            <h2>File Name: {file.name}</h2>
            <Canvas
                onDragEnter={handleDrag}
                camera={{ position: [10, 0, 120], fov: 100 }}
                style={{
                    backgroundColor: '#676f85',
                    width: '80vw',
                    height: '80vh',
                }}
            >
                <ambientLight intensity={.75} />
                <directionalLight intensity={1.75} position={[10, 20, 10]} />
                <pointLight position={[20, 10, -10]} intensity={0.75} />
                <Suspense fallback={null}>
                    <STLModel file={file.url} position={[0, 0, 0]} interact={true} />
                </Suspense>
                <OrbitControls />
            </Canvas>
            <button onClick={resetCamera}>Reset Camera</button>
            {dragActive && <div id='drag-file-element' onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop} />}
        </div>
    )
}

export default Scene;