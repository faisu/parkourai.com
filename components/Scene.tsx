import React, { Suspense, useEffect, useState, useRef } from 'react'
import { useFrame, extend } from '@react-three/fiber'
import { PerspectiveCamera, Environment, ContactShadows, Html, useProgress } from '@react-three/drei'
import { useSpring } from '@react-spring/core'
import { a } from '@react-spring/three'


function Loader() {
    const { active, progress, errors, item, loaded, total } = useProgress();
    return <Html center>{progress} % loaded</Html>;
}

// React-spring animates native elements, in this case <mesh/> etc,
// but it can also handle 3rd–party objs, just wrap them in "a".
// const AnimatedMaterial = a(MeshDistortMaterial)

export default function Scene({ setBg }) {
    const sphere = useRef()
    const light = useRef()
    const [mode, setMode] = useState(false)
    const [down, setDown] = useState(false)
    const [hovered, setHovered] = useState(false)

    // Change cursor on hovered state
    useEffect(() => {
        document.body.style.cursor = hovered
            ? 'none'
            : `url('data:image/svg+xml;base64,${btoa(
                '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="10" fill="#E8B059"/></svg>'
            )}'), auto`
    }, [hovered])

    // Make the bubble float and follow the mouse
    // This is frame-based animation, useFrame subscribes the component to the render-loop
    // useFrame((state) => {
    //     light.current.position.x = state.mouse.x * 20
    //     light.current.position.y = state.mouse.y * 20
    //     if (sphere.current) {
    //         sphere.current.position.x = THREE.MathUtils.lerp(sphere.current.position.x, hovered ? state.mouse.x / 2 : 0, 0.2)
    //         sphere.current.position.y = THREE.MathUtils.lerp(
    //             sphere.current.position.y,
    //             Math.sin(state.clock.elapsedTime / 1.5) / 6 + (hovered ? state.mouse.y / 2 : 0),
    //             0.2
    //         )
    //     }
    // })

    // Springs for color and overall looks, this is state-driven animation
    // React-spring is physics based and turns static props into animated values
    const [{ wobble, coat, color, ambient, env }] = useSpring(
        {
            wobble: down ? 1.2 : hovered ? 1.05 : 1,
            coat: mode && !hovered ? 0.04 : 1,
            ambient: mode && !hovered ? 1.5 : 0.5,
            env: mode && !hovered ? 0.4 : 1,
            color: hovered ? '#E8B059' : mode ? '#202020' : 'white',
            config: (n) => n === 'wobble' && hovered && { mass: 2, friction: 10 }
        },
        [mode, hovered, down]
    )

    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 4]} fov={75}>
                <a.ambientLight intensity={ambient as any} />
                <a.pointLight ref={light} position-z={-15} intensity={env as any} color="#F8C069" />
            </PerspectiveCamera>
            <Suspense fallback={<Loader />}>
                <mesh
                    position={[-1, 0, 0]}
                    ref={sphere}
                    // scale={wobble}
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)}
                    onPointerDown={() => setDown(true)}
                    onPointerUp={() => {
                        setDown(false)
                        // Toggle mode between dark and bright
                        setMode(!mode)
                        setBg({ background: !mode ? '#202020' : '#f0f0f0', fill: !mode ? '#f0f0f0' : '#202020' })
                    }}>
                    <boxGeometry args={[0.9, 0.9, 0.2]} />
                    <meshBasicMaterial color={'#E8B059'} />
                </mesh>
                <mesh
                    position={[-1, -1, 0]}
                    ref={sphere}
                    // scale={wobble}
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)}
                    onPointerDown={() => setDown(true)}
                    onPointerUp={() => {
                        setDown(false)
                        // Toggle mode between dark and bright
                        setMode(!mode)
                        setBg({ background: !mode ? '#202020' : '#f0f0f0', fill: !mode ? '#f0f0f0' : '#202020' })
                    }}>
                    <boxGeometry args={[0.9, 0.9, 0.2]} />
                    <meshBasicMaterial color={'#E8B059'} />
                </mesh>
                <mesh
                    position={[0, -1, 0]}
                    ref={sphere}
                    // scale={wobble}
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)}
                    onPointerDown={() => setDown(true)}
                    onPointerUp={() => {
                        setDown(false)
                        // Toggle mode between dark and bright
                        setMode(!mode)
                        setBg({ background: !mode ? '#202020' : '#f0f0f0', fill: !mode ? '#f0f0f0' : '#202020' })
                    }}>
                    <boxGeometry args={[0.9, 0.9, 0.2]} />
                    <meshBasicMaterial color={'#E8B059'} />
                </mesh>
                <mesh
                    position={[0.5, 1, 0]}
                    ref={sphere}
                    // scale={wobble}
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)}
                    onPointerDown={() => setDown(true)}
                    onPointerUp={() => {
                        setDown(false)
                        // Toggle mode between dark and bright
                        setMode(!mode)
                        setBg({ background: !mode ? '#202020' : '#f0f0f0', fill: !mode ? '#f0f0f0' : '#202020' })
                    }}>
                    <boxGeometry args={[1.9, 0.9, 0.2]} />
                    <meshBasicMaterial color={'#E8B059'} />
                </mesh>
                <mesh
                    position={[1, 0.1, 0]}
                    ref={sphere}
                    // scale={wobble}
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)}
                    onPointerDown={() => setDown(true)}
                    onPointerUp={() => {
                        setDown(false)
                        // Toggle mode between dark and bright
                        setMode(!mode)
                        setBg({ background: !mode ? '#202020' : '#f0f0f0', fill: !mode ? '#f0f0f0' : '#202020' })
                    }}>
                    <boxGeometry args={[0.9, 1, 0.2]} />
                    <meshBasicMaterial color={'#E8B059'} />
                </mesh>
                <Environment preset="warehouse" />
                <ContactShadows
                    rotation={[Math.PI / 2, 0, 0]}
                    position={[0, -2, 0]}
                    opacity={mode ? 0.8 : 0.4}
                    blur={1.2}
                    far={2}
                />
            </Suspense>
        </>
    )
}
