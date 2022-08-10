
import { useState } from 'react';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { useLoader } from '@react-three/fiber';
import { useRef } from 'react';

const STLModel = ({ position, file, interact }) => {
    const geometry = useLoader(STLLoader, file)
    // const geometry = new THREE.BoxGeometry(1, 1, 1);

    const ref = useRef();

    const [hovered, hover] = useState(false)

    // useFrame((state, delta) => (ref.current.rotation.x += 0.01))

    return (
        <mesh
            {...position}
            ref={ref}
            // scale={clicked ? 2.5 : 1}
            onPointerOver={(event) => hover(true)}
            onPointerOut={(event) => hover(false)}
            geometry={geometry}>

            <meshStandardMaterial color={interact ? hovered ? 'purple' : '#696969' : '#696969'} />
        </mesh>
    )
}

export default STLModel;