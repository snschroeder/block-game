import React, {useEffect, useState } from 'react';
import PieceHolster from '../PieceHolster/PieceHolster';
import './Board.css';

const Board: React.FC = () => {
    const [boardState, setBoardState] = useState<Array<number>>([]);

    const initBoard = () => {
        setBoardState([
            0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0,
        ]);
    }

    const testFitBoard = (affectedPositions: Array<number>) => {
        let boardClone = [ ...boardState];
        affectedPositions.forEach((val: number) => {
            boardClone[val] = 1;
        });
        return boardClone;
    }

    const isValidPlacement = (affectedPositions: Array<number>) => {
        // Create a test fit of the proposed move 
        // Then find out the sum of the board after the change
        const testPlacement = testFitBoard(affectedPositions);
        const testPlacementSum = testPlacement.reduce((sum: number, a: number) => sum + a); 

        const orignalSum = boardState.reduce((sum: number, val: number) => sum + val);
        const numberChanged = testPlacementSum - orignalSum;

        // If the board has changed by the same amount as the size of the piece it is valid
        return affectedPositions.length === numberChanged;
    }

    const handleRestart = (e: any) => {
        initBoard();
    }

    useEffect(() => {
        initBoard()
    }, [])

    return (
        <div className='game-container'>
            <div className='board'>
            {
                boardState.map((val: number, ind: number) => (
                    val ? <div key={`${ind}`} className={`occupied tile ${Math.floor(ind / 9)}`}></div>
                    : <div key={`${ind}`} className={`unoccupied tile ${Math.floor(ind / 9)}`}></div>
                ))
            }
            </div>
            <PieceHolster />
            <button className='button' onClick={() => handleRestart}>New Game</button>
        </div>
    )
}

export default Board;
