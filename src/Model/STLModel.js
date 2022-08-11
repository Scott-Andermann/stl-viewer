import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { useLoader } from '@react-three/fiber';
import { useRef } from 'react';

const STLModel = ({ file, color, setZPosition}) => {
    // console.log(file)
    const geometry = useLoader(STLLoader, file.url)

    // set initial position
    var middle = new THREE.Vector3();
    geometry.computeBoundingBox();
    geometry.boundingBox.getCenter(middle);
    // console.log(middle);
    const position = {position: [-middle.x, -middle.y, -middle.z]}
    setZPosition(Math.max(geometry.boundingBox.max.x, geometry.boundingBox.max.y, geometry.boundingBox.max.z) * 1.5);

    const ref = useRef();

    // const [hovered, hover] = useState(false)

    return (
        <mesh
            {...position}
            ref={ref}
            // hovered state change causes lag on complex models
            // onPointerOver={(event) => hover(true)}
            // onPointerOut={(event) => hover(false)}
            geometry={geometry}
            >
            <meshStandardMaterial color={color} />
        </mesh>
    )
}

export default STLModel;