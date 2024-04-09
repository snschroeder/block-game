import React, { useEffect, useReducer } from 'react'
import './ReducerLearner.css'

type Move = {
  type: 'update_pos'
  payload: { x: number, y: number }
}

type Grab = {
  type: 'update_active'
}

type PieceActions = Grab | Move

interface PieceState {
  x: number
  y: number
  isActivePiece: boolean
}

function reducer(state: PieceState, action: PieceActions) {
  switch(action.type) {
    case 'update_pos': {
      return {
        ...state,
        x: action.payload.x,
        y: action.payload.y
      }
    }
    case 'update_active': {
      return {
        ...state,
        isActivePiece: !state.isActivePiece
      }
    }
    default:
      return state
  }
}

export default function ReducerLearner() {
  const [state, dispatch] = useReducer(reducer, { x: 0, y: 0, isActivePiece: false })

  useEffect(() => {
    const handleMouseMove = (e: any) => {
      if (state.isActivePiece) {
        dispatch({ type: 'update_pos', payload: { x: e.clientX, y: e.clientY }})
      }
    }
  
    const handleMouseDown = (e: any) => {
      dispatch({ type: 'update_active' })
    }

    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mousemove', handleMouseMove)
    return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mousedown', handleMouseDown)
    }
  }, [state])

  const pieceStyle = {
    'left': `${state.x}px`,
    'top': `${state.y}px`,
}


  return (
    <div>
      <div className='piece' style={pieceStyle}></div>
      {/* <button onClick={() => dispatch({ type: 'update_active' })}>Grab</button> */}
    </div>
  )
}