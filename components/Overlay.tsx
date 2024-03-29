'use client'
import React from 'react'
import { a } from '@react-spring/web'
import { ChatWindow } from './ChatWindow'
import TransitionLink from './TransitionLink';

function AgentsPage({ fill}) {
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
            <div className="grid justify-items-center grid-flow-row md:grid-flow-col h-1/2">
                <div className='mt-8 w-1/2 md:w-1/3'>
                  <div className='justify-center'>
                    <a.span style={{ color: fill }} className='font-mono'>Break through</a.span>
                  </div>
                  <div className='justify-center'>
                    <a.span style={{ color: fill }} className='font-mono'>product wireframes</a.span>
                  </div>
                </div>
                <div className='mt-8 w-1/2 md:w-1/3'>
                <div>
                    <a.span style={{ color: fill }} className='font-mono'>Start creating</a.span>
                  </div>
                  <div>
                    <a.span style={{ color: fill }} className='font-mono'>digital experiences</a.span>
                  </div>
                </div>
            </div>
            
            <ChatWindow
              endpoint="api/"
              emptyStateComponent={InfoCard}
              titleText="Noor"
              emoji="👩"
              showIntermediateStepsToggle={true}
            ></ChatWindow>
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
            <AgentsPage fill={fill}/>
            </>
    )
}
