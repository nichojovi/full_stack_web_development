import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('Unicafe reducer functionality tests', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  };

  test('returns the initial state when called with an undefined state', () => {
    const state = {};
    const action = { type: 'DO_NOTHING' };

    const newState = counterReducer(undefined, action);
    expect(newState).toEqual(initialState);
  });

  test('increments the "good" count', () => {
    const action = { type: 'GOOD' };
    const state = initialState;

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({ good: 1, ok: 0, bad: 0 });
  });

  test('increments the "ok" count', () => {
    const action = { type: 'OK' };
    const state = initialState;

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({ good: 0, ok: 1, bad: 0 });
  });

  test('increments the "bad" count', () => {
    const action = { type: 'BAD' };
    const state = initialState;

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({ good: 0, ok: 0, bad: 1 });
  });

  test('resets the state', () => {
    const action = { type: 'ZERO' };
    const state = { good: 5, ok: 4, bad: 2 };

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({ good: 0, ok: 0, bad: 0 });
  });
});
