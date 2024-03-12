import React, { useState, useEffect, useCallback } from 'react';
import './Piece.css';

interface Props {
    pieceData: number[],
}

const Piece: React.FC<Props> = ({ pieceData }) => {
    const [posX, setPosX] = useState<number>(0);
    const [posY, setPosY] = useState<number>(0);
    const [mouseDown, setMouseDown] = useState<boolean>(false);
    const [activePiece, setActivePiece] = useState<boolean>(false);

    const isClickOnPiece = (): boolean => {
        let pieceClicked = false;
        // Detect click collision
        return pieceClicked;
    }

    useEffect(() => {
        const handleMouseDown = (event: any) => {
            if (event.button === 0 && isClickOnPiece()) {
                setMouseDown(true);
            }
        }

        const handleMouseUp = (event: any) => {
            setMouseDown(false);
        }

        const handleMouseMove = (event: any) => {
            setTimeout(() => {
                if (mouseDown) {
                    setPosX(event.pageX);
                    setPosY(event.pageY);
                }
            }, 100)
        }

        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mousemove', handleMouseMove);
        return () => {
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mousemove', handleMouseMove);
        }
    }, [mouseDown]);

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
        <div className='piece' style={pieceStyle}>
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
