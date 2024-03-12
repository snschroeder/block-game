import React, { useState, useEffect } from 'react';
import Piece from '../Piece/Piece';
import './PieceHolster.css';

const PieceHolster: React.FC = () => {
    const [loadedPieces, setLoadedPieces] = useState<number[][]>([]);

    const generatePiece = (): Array<number> => {
        const pieces = [
            // 1 block
            [
                0, 0, 0,
                0, 1, 0,
                0, 0, 0,
            ],
            // 2 block
            [
                0, 1, 0,
                0, 1, 0,
                0, 0, 0,
            ],
            // 3 Block
            [
                0, 1, 0,
                0, 1, 0,
                0, 1, 0,
            ],
            // 4 Block
            [
                0, 1, 0, 0,
                0, 1, 0, 0,
                0, 1, 0, 0,
                0, 1, 0, 0,
            ],
            // 5 Block
            [
                0, 0, 1, 0, 0,
                0, 0, 1, 0, 0,
                0, 0, 1, 0, 0,
                0, 0, 1, 0, 0,
                0, 0, 1, 0, 0,
            ],
            // small L - right
            [
                0, 1, 0,
                0, 1, 1,
                0, 0, 0,
            ],
            // large L - right
            [
                0, 1, 0,
                0, 1, 0,
                0, 1, 1,
            ],
            // XL L - right
            [ 
                1, 0, 0,
                1, 0, 0,
                1, 1, 1,
            ],
            // small L - left
            [
                0, 1, 0,
                1, 1, 0,
                0, 0, 0,
            ],
            // large L - left
            [
                0, 1, 0,
                0, 1, 0,
                1, 1, 0,
            ],
            // XL L - left
            [ 
                0, 0, 1,
                0, 0, 1,
                1, 1, 1,
            ],
            // wiggle left
            [
                1, 1, 0,
                0, 1, 1,
                0, 0, 0,
            ],
            // wiggle right
            [
                0, 1, 1,
                1, 1, 0,
                0, 0, 0,
            ],
            // square
            [
                1, 1, 0,
                1, 1, 0,
                0, 0, 0,
            ],
            // peg
            [
                0, 1, 0,
                1, 1, 1,
                0, 0, 0,
            ],
            // U
            [
                1, 0, 1,
                1, 1, 1,
                0, 0, 0,
            ],
        ];
        const pieceChoice = Math.floor(Math.random() * pieces.length);
        return pieces[pieceChoice];
    }

    const reloadPieces = (): number[][] => {
        const pieces = [];
        for (let i = 0; i < 3; i += 1) {
            pieces.push(generatePiece());
        }
        return pieces;
    }

    useEffect(() => {
        setLoadedPieces(reloadPieces());
    }, []);

    return (
        <div className='piece-holster'>
            {
                loadedPieces.map((val: number[], ind: number) => (
                    <Piece key={`${ind}`} pieceData={val} />
                ))
            }
        </div>
    )
}

export default PieceHolster;
