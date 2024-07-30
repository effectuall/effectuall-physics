import React, { Suspense, useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { easing } from 'maath'
import { MathUtils, Vector3 } from 'three';
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Stage, Grid, Html, Environment, OrbitControls, Billboard, Text, Loader } from '@react-three/drei'
import { EffectComposer, Bloom, ToneMapping } from '@react-three/postprocessing'
import Footer from '../components/footer';

function Model({ click, value }) {

    const size = value
    const boxL = size * 2.5
    const boxB = size * 2
    const holder = useRef()
    const box = useRef()
    const rotor1 = useRef()
    const rotor2 = useRef()
    const rotor3 = useRef()
    const rotor4 = useRef()
    const head = useRef()
    const stripe = useRef()
    const light = useRef()
    const sensor = useRef()
    const glow = useRef()
    const { nodes, materials } = useGLTF('/model/drone.glb')
    const vec = new Vector3()
    console.log(nodes)
    useFrame((state, delta) => {
        head.current.position.y = 2.5
        easing.dampE(head.current.rotation, [state.pointer.y / 7, state.pointer.x, 0], 0.25, delta)
        const t = (1 + Math.sin(state.clock.elapsedTime * 2)) / 2
        stripe.current.color.setRGB(2 + t * 20, 2, 20 + t * 50)
        easing.dampE(head.current.rotation, [0, state.pointer.x * (state.camera.position.z > 1 ? 1 : -1), 0], 0.4, delta)
        light.current.intensity = 1 + t * 4

        sensor.current.color.setRGB(15 + t * 5, 0, 0)
        easing.dampE(head.current.rotation, [state.pointer.y * (state.camera.position.z > 1 ? 0.5 : -0.5), state.pointer.x * (state.camera.position.z > 1 ? 1 : -1), 0], 0.4, delta)
        glow.current.intensity = 1 + t * 4

        rotor1.current.rotation.y = rotor2.current.rotation.y += 0.12
        rotor3.current.rotation.y = rotor4.current.rotation.y += 0.12
        // holder.current.morphTargetInfluences[1] = MathUtils.lerp(holder.current.morphTargetInfluences[1], click ? 1 : 0, 0.3)
        // holder.current.morphTargetInfluences[0] = MathUtils.lerp(holder.current.morphTargetInfluences[0], click ? 1 : 0, 0.1)

        if (click) {
            state.camera.lookAt(head.current.position)
            state.camera.position.lerp(vec.set(8, 8, 8), 0.01)
            state.camera.updateProjectionMatrix
        } else {
            state.camera.lookAt(head.current.position)
            state.camera.position.lerp(vec.set(20, 20, 20), 0.01)
            state.camera.updateProjectionMatrix
        }

    })
    return (
        <group  >
            <group ref={head} rotation={[0, Math.PI, 0]}>
                <mesh castShadow receiveShadow geometry={nodes.Body.geometry} material={materials.body} />
                <mesh castShadow receiveShadow geometry={nodes.Engine.geometry} material={materials.engine} />
                <mesh castShadow receiveShadow geometry={nodes.Motor.geometry} material={materials.engine} />
                <mesh ref={box} position={[0, -0.72, 0]} castShadow receiveShadow geometry={nodes.Box.geometry} material={materials.brown} />
                <group>
                    <group ref={rotor1} position={[1.4, 0.35, 1.9]}>
                        <mesh castShadow receiveShadow geometry={nodes.Rotor.geometry} material={materials.engine} />
                    </group>
                    <group ref={rotor2} position={[1.4, 0.35, -1.9]}>
                        <mesh castShadow receiveShadow geometry={nodes.Rotor.geometry} material={materials.engine} />
                    </group>
                </group>
                <group >
                    <group ref={rotor3} position={[-1.4, 0.35, -1.9]}>
                        <mesh castShadow receiveShadow geometry={nodes.Rotor.geometry} material={materials.engine} />
                    </group>
                    <group ref={rotor4} position={[-1.4, 0.35, 1.9]}>
                        <mesh castShadow receiveShadow geometry={nodes.Rotor.geometry} material={materials.engine} />
                    </group>
                </group>
                <group>
                    <mesh ref={holder} castShadow receiveShadow geometry={nodes.Holder.geometry} material={materials.engine} morphTargetDictionary={nodes.Holder.morphTargetDictionary}
                        morphTargetInfluences={nodes.Holder.morphTargetInfluences} />
                </group>

                {/* <group rotation={[0, 0, 0]}>
                    <mesh position={[0, -0.7, 0]} scale={[boxL, 1, boxB]}>
                        <boxGeometry args={[1, 0.74, 1]} />
                        <meshStandardMaterial color={"#2EB6FF"} />
                    </mesh>
                </group> */}

                {/* <group position={[0.67, -0.7, (boxB / 2)]} rotation={[0, 0.7, 0]}>
                    <mesh castShadow receiveShadow geometry={nodes.Holder.geometry} material={materials.engine} />
                </group>

                <group position={[-0.67, -0.7, (boxB / 2)]}>
                    <mesh castShadow receiveShadow geometry={nodes.Holder.geometry} material={materials.engine} />
                </group>
                <group rotation={[0, -3.14, 0]}>
                    <group position={[0.67, -0.7, (boxB / 2)]}>
                        <mesh castShadow receiveShadow geometry={nodes.Holder.geometry} material={materials.engine} />
                    </group>
                    <group position={[-0.67, -0.7, (boxB / 2)]}>
                        <mesh castShadow receiveShadow geometry={nodes.Holder.geometry} material={materials.engine} />
                    </group>

                </group> */}
                {/* <mesh castShadow receiveShadow geometry={nodes.HolderR.geometry} material={materials.engine} /> */}
                <mesh castShadow receiveShadow geometry={nodes.Sensor.geometry}>
                    <meshBasicMaterial ref={sensor} toneMapped={false} />
                    <pointLight ref={glow} intensity={1} color={[10, 2, 15]} distance={2.5} />
                </mesh>
                <mesh castShadow receiveShadow geometry={nodes.Light.geometry}>
                    <meshBasicMaterial ref={stripe} toneMapped={false} />
                    <pointLight ref={light} intensity={1} color={[10, 2, 5]} distance={2.5} />
                </mesh>
            </group>
        </group>
    )
}

function Overlay() {
    return (

        <div >
            <div className="absolute top-0 left-0" >

                <h1 className="text-5xl text-bold text-white pt-36 pl-12">
                    Future <span className="text-sm">with</span>
                    <br />
                    <span>EffectualL</span>
                </h1>
            </div>
            <div className="absolute bottom-0 left-0" >
                <div className="text-sm text-bold text-white p-12 md:p-6 ">
                 
                    <Link className="md:mt-0 mt-2" to="mailto:info@effectuall.com">
                    <button className="grotesk w-full lg:px-10 md:px-6 hover:bg-gray-200 hover:shadow px-4 md:py-3 py-2 font-medium lg:text-lg bg-white rounded-3xl text-black"> info@effectuall.com</button>
             
            </Link>
                   
                </div>
            </div>

        </div>



    )
}

export default function ContactPage() {
    const [clicked, setClicked] = useState(false)

    return (
        <>
          <div className="bg-white text-black min-h-screen">
            <div className="bg-cyan-900 text-white">
            
                <div className="bg-gradient-to-r from-cyan-900 to-cyan-500 h-screen " >
                    <Suspense fallback={null}>
                        <Canvas flat shadows camera={{ position: [15, 10, 10], fov: 25 }}>
                            <Stage intensity={0.05} environment="city" shadows={{ type: 'accumulative', bias: 4, intensity: Math.PI }} adjustCamera={false}>
                                <Model value={0.48} click={clicked} />
                            </Stage>
                            <Grid renderOrder={-1} position={[0, 0, 0]} infiniteGrid cellSize={0.6} cellThickness={0.6} sectionSize={3.3} sectionThickness={1.5} sectionColor={[0.5, 0.5, 10]} fadeDistance={30} />
                            <OrbitControls enablePan={true} enableZoom={false} target={[0, 2, 0]} />

                            <EffectComposer disableNormalPass>
                                <Bloom luminanceThreshold={2} mipmapBlur />
                                <ToneMapping />
                            </EffectComposer>
                        </Canvas>
                    </Suspense>
                    <Loader />
                    <Overlay />
                    <div className="absolute top-0 right-0" >
                    
                        <div className=" font-bold text-white mr-4 pt-36 px-10"  >
                            <Link to="/dashboard" className='bg-cyan-600 p-2 rounded-full'>
                            <i className="fa-solid fa-house"></i>
                            </Link>
                        </div>
                        <div className="cursor-pointer font-bold text-white mr-4 pt-3 px-10" onClick={() => (setClicked(!clicked))} >
                          <div className=' bg-cyan-600 p-2 rounded-full'>
                          <i className="fa-solid fa-play"></i>
                          </div>
                       
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
            
        </div>
    );

        </>
    );
}