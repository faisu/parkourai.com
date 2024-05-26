'use client'
import React from 'react'
import { a } from '@react-spring/web'

export default function Overlay({ fill }) {
  return (
    <div className=" bg-opacity-30 mt-2">
      <div className='grid justify-items-center'>
        <div className='mt-24'>
          <a.span style={{ color: fill }} className='font-mono grid justify-items-center text-sm'>Introducing</a.span>
          <a.span style={{ color: fill }} className='mt-4 font-mono grid justify-items-center'>Experience</a.span>
          <a.span style={{ color: fill }} className='font-mono grid justify-items-center'>Engineering</a.span>
          <a.span style={{ color: fill }} className='mt-4 font-mono grid justify-items-center text-sm'>by</a.span>
        </div>
      </div>
      <div className='grid justify-items-center'>
        <div className='m-8 flex-row space-x-16'>
          <a.span style={{ color: fill }} className='font-mono'>Bridge IT</a.span>
        </div>
      </div>
    </div>
  );
}