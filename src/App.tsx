import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { useDispatch } from "react-redux";
import { useAppSelector } from "./store";
import type { AppDispatch } from "./store";
import {
  selectCounter,
  type CounterId,
  incrementAction,
  decrementAction,
} from "./modules/counters/counters.slice";
import UsersList from "./modules/users/UsersList";

function App() {
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>

      <Counter counterId="first" />
      <Counter counterId="second" />

      <div className="card">
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <UsersList />
    </>
  );
}

export function Counter({ counterId }: { counterId: CounterId }) {
  const dispatch = useDispatch<AppDispatch>();
  const value = useAppSelector((state) => selectCounter(state, counterId) ?? 0);

  return (
    <>
      counter {value}
      <button onClick={() => dispatch(incrementAction({ counterId }))}>
        increment
      </button>
      <button onClick={() => dispatch(decrementAction({ counterId }))}>
        decrement
      </button>
    </>
  );
}

export default App;
