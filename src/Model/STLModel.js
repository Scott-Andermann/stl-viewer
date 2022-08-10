import * as THREE from 'three'
import { useState } from 'react';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { useLoader, useThree, useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';

const url = './lever.stl'



const STLModel = ({ position, file, interact }) => {
    const geometry = useLoader(STLLoader, file)
    // const geometry = new THREE.BoxGeometry(1, 1, 1);
    const wireframeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true, transparent: true });

    const ref = useRef();

    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)

    // useFrame((state, delta) => (ref.current.rotation.x += 0.01))

    return (
        <mesh
            {...position}
            ref={ref}
            // scale={clicked ? 2.5 : 1}
            onClick={(event) => click(!clicked)}
            onPointerOver={(event) => hover(true)}
            onPointerOut={(event) => hover(false)}
            geometry={geometry}>

            <meshStandardMaterial color={interact ? clicked ? 'green' : hovered ? 'purple' : '#696969' : '#696969'} />
        </mesh>
    )
}

export default STLModel;