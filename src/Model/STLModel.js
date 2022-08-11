import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { useLoader } from '@react-three/fiber';
import { useRef } from 'react';

const STLModel = ({ file, color}) => {
    const geometry = useLoader(STLLoader, file.url)

    // set initial position
    var middle = new THREE.Vector3();
    geometry.computeBoundingBox();
    geometry.boundingBox.getCenter(middle);

    const position = {position: [-middle.x, -middle.y, -middle.z]}

    // want to add auto-scaling so that the model displays at an appropriate size on load
    // const scale = 200 / Math.max(geometry.boundingBox.max.x, geometry.boundingBox.max.y, geometry.boundingBox.max.z);
    // const position = {position: [-middle.x * scale, -middle.y * scale, -middle.z * scale]}

    const ref = useRef();

    // const [hovered, hover] = useState(false)

    return (
        <mesh
            {...position}
            ref={ref}
            // scale={scale}
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