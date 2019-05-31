import * as actions from '../actions/actions';
import { ActionType, getType } from 'typesafe-actions';
import { State } from '../utils/types';

const initialState: State = {
    map: new Array(100).fill(0).map((_, i) => (i + 1) % 5 === 0 ? 2 : (i + 2) % 5 === 0 ? 1 : 0),
}

export type Action = ActionType<typeof actions>;

function reducer(state = initialState, action: Action) {
    switch (action.type) {
        case getType(actions.updateMap):
            state = {
                ...state,
                map: state.map.map((x, i) => i === action.payload.y * 10 + action.payload.x ? (x + 1) % 3 : x),
            }
            break;
    }

    return state;
}


export default reducer;