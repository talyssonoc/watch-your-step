import range from 'lodash.range';
import config from '../config';

const directions = {
  0: 'up',
  1: 'right',
  2: 'down',
  3: 'left'
};

const getRandomDirections = () => {
  return range(3).map(() => {
    return range(3).map(() => directions[Math.floor(Math.random() * 4)]);
  });
};

const pillowTransitions = {
  up: {
    cond: ({ line }) => line > 1,
    trans: ({ line }) => ({ line: line - 1 })
  },
  right: {
    cond: ({ column }) => column < (config.height - 2),
    trans: ({ column }) => ({ column: column + 1 })
  },
  down: {
    cond: ({ line }) => line < (config.height - 2),
    trans: ({ line }) => ({ line: line + 1 })
  },
  left: {
    cond: ({ column }) => column > 1,
    trans: ({ column }) => ({ column: column - 1 })
  }
};

const pillow = (state, { type, direction }) => {
  if(type === 'MOVE_PILLOW') {
    const newState = Object.assign({}, state);

    if(pillowTransitions[direction] && pillowTransitions[direction].cond(state)) {
      Object.assign(newState, pillowTransitions[direction].trans(state));
    }

    newState.directions = getRandomDirections();

    return newState;
  }

  return state;
};

pillow.initialState = {
  line: 1,
  column: 1,
  directions: getRandomDirections()
};

export default pillow;