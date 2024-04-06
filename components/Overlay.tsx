'use client'
import React from 'react'
import { a } from '@react-spring/web'
import { ChatWindow } from './ChatWindow'
import TransitionLink from './TransitionLink';
import Link from 'next/link';

function AgentsPage({ fill }) {
  const InfoCard = (
    <div className="justify-start">
      <a.h2 style={{ color: fill }} className="text-3xl font-mono sm:text-4xl">Noor</a.h2>
      <ul className='mt-6 items-center'>
        <a.li style={{ color: fill }} className="font-mono text-md leading-8">Highly configurable AI agent</a.li>
        <a.li style={{ color: fill }} className="font-mono text-md leading-8">Empowering sales round the clock</a.li>
        <a.li style={{ color: fill }} className="font-mono text-md leading-8">Engage customers directly</a.li>
      </ul>
    </div>
  );
  return (
    <div className=" bg-opacity-30 mt-2">
      <div className="grid justify-items-center grid-flow-row">
        <div className='mt-8'>
          <a.span style={{ color: fill }} className='font-mono grid justify-items-center'>Break through</a.span>
          <a.span style={{ color: fill }} className='font-mono grid justify-items-center'>product wireframes</a.span>
        </div>
        <div className='mt-8'>
          <a.span style={{ color: fill }} className='font-mono grid justify-items-center'>Start creating</a.span>
          <a.span style={{ color: fill }} className='font-mono grid justify-items-center'>digital experiences</a.span>
        </div>
      </div>
      <div className='grid justify-items-center'>
        <div className='mt-24'>
          <a.span style={{ color: fill }} className='font-mono grid justify-items-center text-sm'>Introducing</a.span>
          <a.span style={{ color: fill }} className='mt-4 font-mono grid justify-items-center'>Experience Engineering Services</a.span>
          <a.span style={{ color: fill }} className='mt-4 font-mono grid justify-items-center text-sm'>by</a.span>
        </div>
      </div>
      <div className='grid justify-items-center'>
        <div className='my-24 mx-8 flex-row space-x-16'>
          <Link href='/about'>
          <a.span style={{ color: fill }} className='font-mono'>Visual</a.span>
          </Link>
          <a.span style={{ color: fill }} className='font-mono'>Verbal</a.span>
          <a.span style={{ color: fill }} className='font-mono'>Decibel</a.span>
        </div>
      </div>
    </div>
  );
}


export default function Overlay({ fill }) {
  // Just a Figma export, the fill is animated
  return (
    <>
      <nav className='absolute top-0 w-full ml-8 place-content-between'>
        <div className='flex items-stretch my-8 ml-4'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="40 40 30 30" width="24" height="24" className='self-center mr-4'>
            <path fill="#E8B059" d="M40 61h9v9h-9zM40 50.5h9v9h-9zM50.5 61h9v9h-9z" />
            <path fillRule="evenodd" clipRule="evenodd" d="M61 40H50.5v9H61v10.5h9V40h-9z" fill="#E8B059" />
          </svg>
          <a.span className={'self-center font-mono'} style={{ color: fill }}>BRIDGE IT</a.span>
        </div>
      </nav>
      <AgentsPage fill={fill} />
    </>
  )
}
