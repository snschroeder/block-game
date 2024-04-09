import React, { useState, useEffect, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './Piece.css';

interface Props {
    pieceData: number[],
}


const Piece: React.FC<Props> = ({ pieceData }) => {
    const posReducer = (pos: number[], action: any): any => {
        switch (action.type) {
            case 'updatedPos': {
                return [...action.pos]
            }
        }
    }

    const [pos, dispatch] = useReducer(posReducer, [0, 0])
    const [posX, setPosX] = useState<number>(0);
    const [posY, setPosY] = useState<number>(0);
    const [outerDims, setOuterDims] = useState(0);
    const [mouseDown, setMouseDown] = useState<boolean>(false);
    const [pieceId, setPieceId] = useState(uuidv4());
    const [activePiece, setActivePiece] = useState<boolean>(false);

    const isClickOnPiece = (mouseX: number, mouseY: number): boolean => {
        console.log('mouse ' + mouseX)
        console.log('posX ' + posX)
        console.log('width ' + outerDims)
        // console.log(mouseY)
        if (
                mouseX > posX
                && mouseX < (posX + outerDims)
                // mouseY > posY
                // && mouseY < (posY - 60)
            ) {
            console.log('hi')
            return true;
        }
        return false;
    }

    const handleMouseDown = (event: any) => {
        if (event.button === 0 && isClickOnPiece(event.screenX, event.screenY)) {
            console.log('clicked')
            setMouseDown(true);
        }
    }

    const handleMouseUp = (event: any) => {
        setMouseDown(false);
    }

    const handleMouseMove = (event: any) => {
        setTimeout(() => {
            if (mouseDown) {
                setPosX(event.screenX);
                setPosY(event.screenY);
            }
        }, 100)
    }

    useEffect(() => {
        setOuterDims(Math.sqrt(pieceData.length) * 40)
        const pieceElem = document.getElementById(pieceId);
        const rect = pieceElem?.getBoundingClientRect();
        if (rect) {
            console.log('attempting to set pos')
            console.log('left ' + rect.left)
            console.log('top ' + rect.top)
            setPosX(rect.left);
            setPosY(rect.top);
        }
    }, [posX, posY, outerDims, pieceId])

    useEffect(() => {
        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mousemove', handleMouseMove);
        return () => {
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mousemove', handleMouseMove);
        }
    }, []);

    const pieceStyle = {
        'display': 'grid',
        'gridTemplateColumns': `repeat(${Math.sqrt(pieceData.length)}, 40px)`,
        'left': `${posX - 60}px`,
        'top': `${posY - 60}px`,
    }

    const pieceTileStyle = {
        'border': '0.5px solid green',
    }

    return (
        <div className='piece' id={pieceId} style={pieceStyle}>
            {
                pieceData.map((val: number, ind: number) => (
                    val ? <div key={`${ind}`} className={'occupied tile'} style={pieceTileStyle}></div>
                    : <div key={`${ind}`} className={'tile'}></div>
                ))
            }
        </div>
    )
}

export default Piece;
