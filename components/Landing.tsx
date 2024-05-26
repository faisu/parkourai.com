"use client"
import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useSpring } from '@react-spring/core'
import { a } from '@react-spring/web'
import Overlay from './Overlay'
import Scene from './Scene'


export default function App() {
  // This spring controls the background and the svg fill (text color)
  const [{ background, fill }, set] = useSpring({ background: '#f0f0f0', fill: '#202020' }, [])
  return (
    <a.main style={{ backgroundColor: background as any }} className="w-screen pt-16">
      <nav className='absolute top-0 w-full place-content-between'>
        <div className='flex items-stretch ml-8 my-8'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="40 40 30 30" width="24" height="24" className='self-center mr-4'>
            <path fill="#E8B059" d="M40 61h9v9h-9zM40 50.5h9v9h-9zM50.5 61h9v9h-9z" />
            <path fillRule="evenodd" clipRule="evenodd" d="M61 40H50.5v9H61v10.5h9V40h-9z" fill="#E8B059" />
          </svg>
          <a.span className={'self-center font-mono'} style={{ color: fill }}>BRIDGE IT</a.span>
        </div>
      </nav>
      <div className="flex flex-col lg:flex-row">
        <div className='mt-8 lg:mt-0 items-center w-[100vw] lg:w-[30vw] content-center'>
          <a.span style={{ color: fill }} className='font-mono grid justify-items-center'>Break through</a.span>
          <a.span style={{ color: fill }} className='font-mono grid justify-items-center'>product wireframes</a.span>
        </div>
        <div className="h-[70vh] w-[100vw] lg:w-[40vw]">
          <Canvas dpr={[1, 2]}>
            <Scene setBg={set} />
            <OrbitControls enablePan={false} enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
          </Canvas>
        </div>
        <div className='mt-8 lg:mt-0 items-center w-[100vw] lg:w-[30vw] content-center'>
          <a.span style={{ color: fill }} className='font-mono grid justify-items-center'>Start creating</a.span>
          <a.span style={{ color: fill }} className='font-mono grid justify-items-center'>digital experiences</a.span>
        </div>
      </div>
      <Overlay fill={fill} />
    </a.main>
  )
}
