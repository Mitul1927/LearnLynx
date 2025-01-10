import React from 'react'

export default function Button(props) {
  return (
    <>
            <button className={`${props.className}`}>
            <p className="enroll">
              {props.name} <span class="arrow">➔</span>
            </p>
          </button>
    </>
  )
}
