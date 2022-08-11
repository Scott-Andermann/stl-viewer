import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import STLModel from '../Model/STLModel';
import {Box, Box2} from '../Model/Box'



const Scene = ({ file, setFile, color }) => {
    const [dragActive, setDragActive] = useState(false);
    const [zPosition, setZPosition] = useState(100);
    // console.log('file', file);

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
            // console.log(e.dataTransfer.files[0].name);
            setFile({ url: URL.createObjectURL(e.dataTransfer.files[0]), name: e.dataTransfer.files[0].name });
        }
    }

    console.log(zPosition);

    return (
        <div>
            <h2>File Name: {file.name}</h2>
            <Canvas
                onDragEnter={handleDrag}
                camera={{ position: [0, 0, 100], fov: 100 }}
                style={{
                    backgroundColor: 'lightblue',
                    width: '80vw',
                    height: '80vh',
                }}
            >
                <ambientLight />
                <directionalLight intensity={1.75} position={[10, 20, 10]} />
                <pointLight position={[20, -10, -10]} intensity={0.75} />
                <Suspense fallback={null}>
                    <STLModel file={file} interact={true} color={color} setZPosition={setZPosition}/>
                    <Box />
                    <Box2 />
                </Suspense>
                <OrbitControls />
                {/* <OrbitControls autoRotate={true} autoRotateSpeed={5}/> */}
            </Canvas>
            {dragActive && <div id='drag-file-element' onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop} />}
        </div>
    )
    // return (
    //     <Canvas>
    //       <ambientLight intensity={0.5} />
    //       <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
    //       <pointLight position={[-10, -10, -10]} />
    //       <Box position={[-1.2, 0, 1]} />
    //       <Box position={[1.2, 0, 1]} />
    //       <STLModel position={[0,0,-1]} />
    //       <OrbitControls />
    //     </Canvas>
    //   )
}

export default Scene;