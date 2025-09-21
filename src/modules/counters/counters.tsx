import { useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { useAppSelector } from "../../store";
import {
  selectCounter,
  type CounterId,
  incrementAction,
  decrementAction,
} from "./counters.slice";

export function Counters() {
  return (
    <div className="flex flex-row items-center justify-center gap-5">
      <Counter counterId="first" />
      <Counter counterId="second" />
    </div>
  );
}

export function Counter({ counterId }: { counterId: CounterId }) {
  const dispatch = useDispatch();

  const value = useAppSelector((state) => selectCounter(state, counterId) ?? 0);

  const actions = bindActionCreators(
    { incrementAction, decrementAction },
    dispatch
  );

  return (
    <div className="flex flex-row items-center justify-center gap-5 ">
      counter {value}
      <button
        onClick={() => actions.incrementAction({ counterId })}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        increment
      </button>
      <button
        onClick={() => actions.decrementAction({ counterId })}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        decrement
      </button>
    </div>
  );
}
