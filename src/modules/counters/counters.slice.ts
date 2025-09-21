import { createAction, createReducer } from "@reduxjs/toolkit";
import type { AppState } from "../../store";

export type CounterId = string;
export type CountersState = Record<CounterId, number | undefined>;

export const incrementAction = createAction<{ counterId: CounterId }>(
  "counters/increment"
);
export const decrementAction = createAction<{ counterId: CounterId }>(
  "counters/decrement"
);

const initialCountersState: CountersState = {};

export const countersReducer = createReducer(
  initialCountersState,
  (builder) => {
    builder.addCase(incrementAction, (state, { payload: { counterId } }) => {
      let current = state[counterId] ?? 0;
      current++;
      state[counterId] = current;
    });
    builder.addCase(decrementAction, (state, { payload: { counterId } }) => {
      let current = state[counterId] ?? 0;
      current--;
      state[counterId] = current;
    });
  }
);

export const selectCounter = (state: AppState, counterId: CounterId) =>
  state.counters[counterId];
