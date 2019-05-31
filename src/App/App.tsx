import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import spriteSheet from '../spritesheet.svg';
import './App.css';
import { State } from './utils/types';
import { updateMap } from './actions/actions';

const img = new Image();
img.src = spriteSheet;

const TILE_SIZE = 64;

function App() {
    const map = useSelector((state: State) => state.map);
    const dispatch = useDispatch();

    useEffect(() => {
        const canvas: HTMLCanvasElement | null = canvasRef.current;
        const ctx = canvas!.getContext('2d');

        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                const tile = map[i * 10 + j];

                ctx!.drawImage(img, 0, 0, TILE_SIZE, TILE_SIZE, j * TILE_SIZE, i * TILE_SIZE, TILE_SIZE, TILE_SIZE);
                if (tile === 1) {
                    ctx!.drawImage(img, 0, 64, TILE_SIZE, TILE_SIZE, j * TILE_SIZE, i * TILE_SIZE, TILE_SIZE, TILE_SIZE);
                }
                else if (tile === 2) {
                    ctx!.drawImage(img, 64, 64, TILE_SIZE, TILE_SIZE, j * TILE_SIZE, i * TILE_SIZE, TILE_SIZE, TILE_SIZE);
                }
            }
        }
    });
    
    const canvasRef = useRef(null);

      return (
        <div className="App">
            <canvas 
                ref={ canvasRef } 
                width={ TILE_SIZE * 10 }
                height={ TILE_SIZE * 10 }
                onClick={ e => {
                    const canvas: HTMLCanvasElement | null = canvasRef.current;
                    dispatch(updateMap(
                        Math.floor((e.clientX - canvas!.offsetLeft) / TILE_SIZE), 
                        Math.floor((e.clientY - canvas!.offsetTop) / TILE_SIZE)
                    ));
                }}
            />
        </div>
      );
}

export default App;
