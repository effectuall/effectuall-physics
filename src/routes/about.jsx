"use client"
import React, { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { useGLTF, Html, Environment, OrbitControls, Billboard, Text } from '@react-three/drei'
import Footer from '../components/footer'

function Model({ url, snap }) {
    const ref = useRef()
    const body = useRef()
    const pivot = useRef()
    const cap = useRef()
    const { nodes, materials } = useGLTF(url)
    return (
        <group ref={ref} scale={.85} position={[1, -0.5, 0]} >
            <mesh receiveShadow castShadow geometry={nodes.stand.geometry} material={materials.stand} position={[0, -16, 0]} />
            <group ref={pivot} rotation={[-0.2, -0.4, 0]}>
                <mesh receiveShadow castShadow geometry={nodes.pivot.geometry} material={materials.stand} position={[0, 0, 0]} />
                <group>
                    <mesh ref={body} receiveShadow castShadow geometry={nodes.telescope.geometry} material={materials.material} position={[0, 2, 0]} rotation={[0, 3.14, 0]} material-transparent={snap} material-opacity={!snap ? 1 : 0.5} />
                    <mesh ref={cap} receiveShadow castShadow geometry={nodes.cap.geometry} material={materials.lens} position={[0, 2, 0]} rotation={[0, 3.14, 0]} visible={!snap} />

                    <mesh receiveShadow castShadow geometry={nodes.incident.geometry} material={materials.stand} position={[0, 0.7, 0]} rotation={[0, 3.14, 0]} visible={snap} />
                    <mesh receiveShadow castShadow geometry={nodes.reflected.geometry} material={materials.lens} position={[0, 0.7, 0]} rotation={[0, 3.14, 0]} visible={snap} />

                    <mesh receiveShadow castShadow geometry={nodes.eye.geometry} material={materials.material} rotation={[0, 3.14, 0]} position={[0, 2, -11.4]} visible={snap} />
                    <mesh receiveShadow castShadow geometry={nodes.objective.geometry} material={materials.lens} position={[0, 2, 3]} visible={true} />
                    <mesh receiveShadow castShadow geometry={nodes.eyepiece.geometry} material={materials.lens} visible={true} position={[0, 2, -7]} />
                </group>
            </group>
        </group>
    )
}
const AboutPage = () => {
    const [snap, setSnap] = useState(false)
    const [visible, setVisible] = useState(false)
    let isSmallScreen;

    if (typeof window !== 'undefined') {
        isSmallScreen = window.innerWidth <= 568;
    }

    return (
        <div className="bg-white text-black min-h-screen">
            <div className="bg-cyan-900 text-white">
                <div className="bg-gradient-to-r from-cyan-900 to-cyan-500 h-screen " >
                    <Canvas shadows gl={{ preserveDrawingBuffer: true }} eventPrefix="client" camera={{ position: [35, 0, 35], fov: 35 }}>
                        <ambientLight intensity={0.5} />
                        <Environment preset="city" />
                        <OrbitControls enablePan={false} enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} target={[0, 0, 0]} />

                        <group rotation={[0, 0, 0]} position={[0, 0, 0]}>
                            <Model url="/model/telescope.glb" snap={snap} />
                            <group position={[0, -25, 0]} rotation={[0, 0, 0]}>
                                <mesh scale={[80, 50, 80]} position={[0, -10, 0]}>
                                    <sphereGeometry args={[0.45, 32, 16]} />
                                    <meshStandardMaterial color={"#2EB6FF"} />
                                </mesh>
                            </group>
                            <Html distanceFactor={35} position={[0, snap ? 0 : 0, snap ? 0 : 0]} transform sprite occlude={false} >
                                {!visible ? <div className=" cursor-pointer text-white hover:text-cyan-500 " onClick={() => (setSnap(!snap))} >
                                    <i className="fa-solid fa-angles-up"></i>
                                </div> : <p></p>}
                            </Html>
                        </group>
                    </Canvas>

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
                                <p className='pl-6'> Through the lens of technology, we bridge the vast expanse of knowledge.<br /> Unlocking the mysteries of learning one concept at a time.<br />
                                </p >
                                <p className='pl-6'>To know more </p>
                                <Link to="/contact" className="w-full"><button className="grotesk w-full lg:px-10 md:px-6 hover:bg-gray-200 hover:shadow px-4 md:py-3 py-2 font-medium lg:text-lg bg-white rounded-3xl text-black">Contact Us</button></Link>
                            </div>
                        </div>
                        <div className="absolute top-0 right-0" >
                            <div className=" font-bold text-white mr-4 pt-36 px-10"  >
                                <Link to="/dashboard" className='bg-cyan-600  hover:bg-cyan-400 p-2 rounded-full'>
                                    <i className="fa-solid fa-house"></i>
                                </Link>
                            </div>
                            <div className="cursor-pointer  text-sm font-bold text-white mr-4 pt-3 px-10" onClick={() => (setVisible(!visible))} >
                                {visible ? <i className="fa-regular fa-eye-slash bg-cyan-600  hover:bg-cyan-400 p-2 rounded-full"></i> : <i className="fa-regular fa-eye bg-cyan-600  hover:bg-cyan-400 p-2 rounded-full"></i>}
                            </div>
                        </div>
                    </div>
                    <CanvasComponent snap={visible} />
                </div>
            </div>
           <Footer/>
        </div>
    )
}


function CanvasComponent({ snap }) {

    // const [snap, setSnap] = useState(false);

    // const [isSmallScreen, setIsSmallScreen] = useState(500);
    const isSmallScreen = window.innerWidth <= 568;
    const [circlePosition, setCirclePosition] = useState({ x: isSmallScreen ? window.innerWidth - 120 : 350, y: 250 });
    const [ellipsePosition, setEllipsePosition] = useState({ x: isSmallScreen ? window.innerWidth - 120 : 380, y: 250 });
    //set the focal length of the objective lens
    const [focalObj, setFocalObj] = useState(circlePosition.x * 10);
    const [focalEye, setFocalEye] = useState(isSmallScreen ? window.innerWidth - 120 : 280);
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        context.clearRect(0, 0, canvas.width, canvas.height);
        // Set the fill style to white with 0.75 opacity
        context.fillStyle = 'rgba(255, 255, 255, 0.95)';

        // Draw the rectangle
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Draw the circle
        context.beginPath();
        context.arc(circlePosition.x, circlePosition.y, 5, 0, 2 * Math.PI, false);
        context.fillStyle = 'black';
        context.fill();

        // Draw the line
        context.beginPath();
        context.moveTo(0, canvas.height / 2);
        context.lineTo(canvas.width, canvas.height / 2);
        context.strokeStyle = 'black';
        context.stroke();
        // Add text label
        context.font = '18px Arial';
        context.fillStyle = 'black';
        context.fillText('Objective', 10, canvas.height / 2 - 70);
        // Draw the first ellipse
        context.beginPath();
        context.ellipse(50, canvas.height / 2, 5, 50, 0, 0, 2 * Math.PI);
        context.fillStyle = 'skyblue';
        context.fill();
        // Add text label
        context.font = '18px Arial';
        context.fillStyle = 'black';
        context.fillText('Eyepiece', ellipsePosition.x - 40, ellipsePosition.y - 40);
        //add focal length lables for input
        context.font = '12px Arial';
        context.fillText('Focal of objective', (canvas.width / 2) - 60, canvas.height - 65);
        context.fillText('Focal of eyepiece', (canvas.width / 2) - 60, canvas.height - 30);
        // Draw the second ellipse
        context.beginPath();
        context.ellipse(ellipsePosition.x, ellipsePosition.y, 2.5, 20, 0, 0, 2 * Math.PI);
        context.fillStyle = 'blue';
        context.fill();

        // Draw the lines
        context.beginPath();
        context.moveTo(0, (canvas.height / 2) - 10);
        context.lineTo(50, canvas.height / 2);
        context.moveTo(50, canvas.height / 2);
        context.lineTo(circlePosition.x, circlePosition.y + 10);
        context.moveTo(0, 200);
        context.lineTo(50, 210);
        context.moveTo(50, 210);
        context.lineTo(circlePosition.x, circlePosition.y + 10);
        context.moveTo(0, 280);
        context.lineTo(50, 290);
        context.moveTo(50, 290);
        context.lineTo(circlePosition.x, circlePosition.y + 10);
        context.strokeStyle = 'red';
        context.stroke();

        setFocalObj(circlePosition.x * 10)
        lensFormula(focalObj)

        // console.log(focalObj, circlePosition.x, ellipsePosition.x)
        // Calculate the slope of the line
        const slope1 = (circlePosition.y + 10 - 210) / (circlePosition.x - 50);
        const slope2 = (circlePosition.y + 10 - 250) / (circlePosition.x - 50);
        const slope3 = (circlePosition.y + 10 - 290) / (circlePosition.x - 50);
        // Calculate the y-coordinate of the point at ellipsePosition.x
        const y1 = slope1 * (ellipsePosition.x - circlePosition.x) + circlePosition.y + 10;
        const y2 = slope2 * (ellipsePosition.x - circlePosition.x) + circlePosition.y + 10;
        const y3 = slope3 * (ellipsePosition.x - circlePosition.x) + circlePosition.y + 10;
        // Draw the lines
        context.beginPath();
        context.moveTo(circlePosition.x, circlePosition.y + 10);
        context.lineTo(ellipsePosition.x, y1);
        context.moveTo(circlePosition.x, circlePosition.y + 10);
        context.lineTo(ellipsePosition.x, y2);
        context.moveTo(circlePosition.x, circlePosition.y + 10);
        context.lineTo(ellipsePosition.x, y3);
        context.strokeStyle = 'red';
        context.stroke();

        if (ellipsePosition.x - circlePosition.x >= 60) {
            console.log('snap', circlePosition.x - ellipsePosition.x, focalEye)

        } else {
            console.log('snap', circlePosition.x - ellipsePosition.x, focalEye)

            context.beginPath();
            context.moveTo(ellipsePosition.x, y3);
            context.lineTo(0, 100 + y3);
            context.strokeStyle = 'green';
            context.stroke();
            context.beginPath();
            context.moveTo(ellipsePosition.x, y2);
            context.lineTo(0, 100 + y2);
            context.strokeStyle = 'green';
            context.stroke();
            context.beginPath();
            context.moveTo(ellipsePosition.x, y1);
            context.lineTo(0, 100 + y1);
            context.strokeStyle = 'green';
            context.stroke();

            const eyeIcon = new Image();
            eyeIcon.src = '/images/img/eyeIconR.png';

            eyeIcon.onload = () => {
                const resizedWidth = 50; // Specify the desired width
                const resizedHeight = 50; // Specify the desired height
                context.drawImage(eyeIcon, ellipsePosition.x + 5, ellipsePosition.y - (resizedHeight / 2), resizedWidth, resizedHeight);
            };

        }

    }, [circlePosition, ellipsePosition, focalEye, focalObj]);

    // console.log(window.innerWidth, window.innerHeight)
    return (
        <>
            <div style={{
                display: snap ? 'block' : 'none'
            }}>
                <canvas
                    ref={canvasRef}
                    width={isSmallScreen ? window.innerWidth - 10 : "500"}
                    height="500"
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        border: '1px solid black',
                    }}
                />
                {/* Input determines the focal length of the objective lens */}
                <input
                    type="range"
                    min="150"
                    max={ellipsePosition.x}
                    value={circlePosition.x}
                    onChange={(e) => setCirclePosition({ ...circlePosition, x: parseInt(e.target.value) })}
                    style={{ position: 'absolute', top: '75%', left: '50%', transform: 'translateX(-50%)' }}
                />
                {/* Input determines the focal length of the eyepiece lens */}

                <input
                    type="range"
                    min={circlePosition.x}
                    max={isSmallScreen ? window.innerWidth - 30 : 450}
                    value={ellipsePosition.x}
                    onChange={(e) => (setEllipsePosition({ ...ellipsePosition, x: parseInt(e.target.value) }), setFocalEye(isSmallScreen ? window.innerWidth - 20 : ellipsePosition.x - 100))}
                    style={{ position: 'absolute', top: '80%', left: '50%', transform: 'translateX(-50%)' }}
                />
                <div style={{ position: 'absolute', top: '65%', left: '50%', transform: 'translateX(-50%)', cursor: 'pointer' }}>

                    {ellipsePosition.x - circlePosition.x >= 60 ? "Real Image" : "Virtual Image"}
                </div>
            </div>
            {/* <div className="absolute top-0 right-0" >
                <div className="text-sm font-bold text-white mr-4 pt-36 px-10 hover:text-cyan-400"  >
                    <Link to="/">
                        Home

                    </Link>
                </div>
                <div className="cursor-pointer  text-sm font-bold text-white mr-4 pt-3 px-10 hover:text-cyan-400" onClick={() => (setSnap(!snap))} >
                    {snap ? <i className="fa-regular fa-eye-slash"></i> : <i className="fa-regular fa-eye"></i>}
                </div>
            </div> */}


        </>
    );
}

function lensFormula(f) {
    let u = -500000
    let v = (u * f) / (u + f)

    return v
}

export default AboutPage