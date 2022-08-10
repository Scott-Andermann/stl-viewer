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
            // console.log(e.dataTransfer.files);
            setFile(URL.createObjectURL(e.dataTransfer.files[0]));
        }
    }

    console.log(dragActive);

    return (
        <div>
            <Canvas
                onDragEnter={handleDrag}
                camera={{ position: [10, 0, 120], fov: 100 }}
                style={{
                    backgroundColor: '#111a21',
                    width: '80vw',
                    height: '80vh',
                }}
            >
                <ambientLight intensity={.75} />
                {/* <ambientLight intensity={0.1} /> */}
                {/* <directionalLight intensity={1.5} target-position={[1, 0, 0]}/> */}
                <directionalLight intensity={1.75} position={[10, 10, 10]} />
                <pointLight position={[10, 10, 0]} intensity={0.75} />
                <Suspense fallback={null}>
                    <STLModel file={file} position={[0, 0, 0]} interact={true} />
                </Suspense>
                <OrbitControls />

            </Canvas>
            {dragActive && <div id='drag-file-element' onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop} />}
        </div>
    )
}

export default Scene;