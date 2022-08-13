import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { useLoader, useFrame, useThree } from '@react-three/fiber';
import { useRef, useEffect } from 'react';

const STLModel = ({ file, color, newModel, init, setInit }) => {
    // const [init, setInit] = useState(true);
    const ref = useRef();
    const vec = new THREE.Vector3();
    const {camera } = useThree();



    
    const geometry = useLoader(STLLoader, file.url);
    useEffect(() => {

        // setZPosition(Math.max(geometry.boundingBox.max.x, geometry.boundingBox.max.y, geometry.boundingBox.max.z) * 1.25);
        // console.log(zPosition);
        setInit(true);
        // console.log(typeof geometry);
        if(newModel) {
            geometry.rotateX(-Math.PI / 2)
        }
    }, [geometry, newModel, setInit])


    useFrame(() => {
        if (init) {
            camera.position.lerp(vec.set(150, 100, 150), 0.25);
            setTimeout(() => setInit(false), 500);
            // console.log('test')
            // setInit(false);
        }
    })



    // set initial position
    var middle = new THREE.Vector3();
    geometry.computeBoundingBox();
    geometry.boundingBox.getCenter(middle);
    const position = {position: [-middle.x, -middle.y, -middle.z]}

    // want to add auto-scaling so that the model displays at an appropriate size on load
    // const scale = 200 / Math.max(geometry.boundingBox.max.x, geometry.boundingBox.max.y, geometry.boundingBox.max.z);
    // const position = {position: [-middle.x * scale, -middle.y * scale, -middle.z * scale]}



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