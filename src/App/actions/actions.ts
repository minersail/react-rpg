import { createAction } from 'typesafe-actions';
import { } from '../utils/types';

export const updateMap = createAction("actions/game/UPDATEMAP", (resolve) => {
    return (x: number, y: number) => resolve({ x, y });
});