import React from 'react'
import { a } from '@react-spring/web'

export default function Overlay({ fill }) {
    // Just a Figma export, the fill is animated
    return (
        <div className="overlay">
            <a.svg viewBox="0 0 583 720" fill={fill} xmlns="http://www.w3.org/2000/svg">
                <path fill="#E8B059" d="M40 61h9v9h-9zM40 50.5h9v9h-9zM50.5 61h9v9h-9z" />
                <path fillRule="evenodd" clipRule="evenodd" d="M61 40H50.5v9H61v10.5h9V40h-9z" fill="#E8B059" />

                <text style={{ whiteSpace: 'pre' }} fontFamily="Inter" fontSize={10.5} fontWeight="bold" letterSpacing="-.02em">
                    <tspan x={328} y={46.182}>10/03/24</tspan>
                </text>
                <text style={{ whiteSpace: 'pre' }} fontFamily="Inter" fontSize={10.5} fontWeight="bold" letterSpacing="-.02em">
                    <tspan x={392} y={46.182}>BRIDGE</tspan>
                    <tspan x={392} y={58.182}>IT</tspan>
                </text>
                <text style={{ whiteSpace: 'pre' }} fontFamily="Inter" fontSize={10.5} fontWeight={500} letterSpacing="0em">
                    <tspan x={40} y={175.318}>INTRODUCING</tspan>
                    <tspan x={40} y={188.318}>EXPERIENCE ENGINEERING BY</tspan>
                </text>
                <text fill="#E8B059" style={{ whiteSpace: 'pre' }} fontFamily="Inter" fontSize={52} fontWeight="bold" letterSpacing="0em">
                    <tspan x={40} y={257.909}>Bridge IT</tspan>
                </text>
                <text style={{ whiteSpace: 'pre' }} fontFamily="Inter" fontSize={12} fontWeight="bold" letterSpacing="0em">
                    <tspan x={40} y={270.909} />
                </text>
                <text style={{ whiteSpace: 'pre' }} fontFamily="Inter" fontSize={48} fontWeight="bold" letterSpacing="0em">
                    <tspan x={40} y={321.909}></tspan>
                    <tspan x={40} y={372.909}>Break through</tspan>
                    <tspan x={40} y={423.909}>product wireframes</tspan>
                    <tspan x={40} y={474.909}></tspan>
                    <tspan x={40} y={525.909}>Start creating</tspan>
                    <tspan x={40} y={576.909}>digital experiences</tspan>
                </text>
                <text style={{ whiteSpace: 'pre' }} fontFamily="Inter" fontSize={10.5} fontWeight={500} letterSpacing="0em">
                    <tspan x={326} y={640.318}>Next Gen Technology Services</tspan>
                </text>
            </a.svg>
        </div>
    )
}
