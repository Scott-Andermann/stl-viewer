import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import STLModel from '../Model/STLModel';
// import { Box, Box2 } from '../Model/Box';
import { HexColorPicker } from 'react-colorful';
import './Scene.css'



const Scene = ({ file, setFile, color, setColor, handleDrag, handleDrop, dragActive, newModel}) => {

    const [rotate, setRotate] = useState(false)
    const [init, setInit] = useState(true);

    const handleRotate = () => {
        setRotate(!rotate);
    }

    const onClick = () => {
        setFile('');
      }

    const resetView = () => {
        setInit(true);
    }

    return (
        <div>
            <h2>File Name: {file.name}</h2>
            <div className='model-window'>
            <Canvas
                onDragEnter={handleDrag}
                camera={{ position: [0,0,0], fov: 50 }}
                style={{
                    backgroundColor: '',
                    width: '80vw',
                    height: '80vh',
                    border: '2px dashed #cbd5e1',
                    borderRadius: '1rem',
                    marginBottom: '2rem'
                }}
            >
                <ambientLight />
                <directionalLight intensity={1.75} position={[10, 20, 10]} />
                <pointLight position={[20, -10, -10]} intensity={0.75} />
                {/* <hemisphereLight /> */}
                <Suspense fallback={null}>
                    <STLModel file={file} color={color} newModel={newModel} init={init} setInit={setInit}/>
                    {/* Boxes can show origin at intersection of points <Box />
                    <Box2 /> */}
                </Suspense>
                <OrbitControls autoRotate={rotate} autoRotateSpeed={5} />
            </Canvas>
            <HexColorPicker className='color-picker' color={color} onChange={setColor} />
            <div className='button-container'>
                
                <button className='toggle-button' onClick={resetView}>Reset Camera</button>
                <button className='toggle-button' onClick={handleRotate}>Toggle Auto Rotate</button>
                <button className='toggle-button' onClick={onClick}>Upload a new file</button>
            </div>
            {dragActive && <div id='drag-file-element' onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop} />}
            </div>
        </div>
    )
}

export default Scene;