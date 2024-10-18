import { useReducer } from "react";

type State = {
  count: number;
};

type Action = {
  type: "increment" | "decrement";
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      return state;
  }
}

export default function TimerAbout(): JSX.Element {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <p>Счетчик: {state.count}</p>
      <button onClick={() => dispatch({ type: "decrement" })}>--</button>
      <button onClick={() => dispatch({ type: "increment" })}>++</button>
    </div>
  );
}
