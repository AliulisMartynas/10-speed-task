import { useReducer, useEffect } from "react";

enum ReducerActionTypes {
  UNDO = "UNDO",
  REDO = "REDO",
  NEW_INPUT = "NEW_INPUT",
  UNDO_ACTIVATION = "UNDO_ACTIVATION",
}

interface ReducerAction {
  type: ReducerActionTypes;
  payload?: {
    newValue: string;
    resetRedos?: boolean;
  };
}

const reducer = (state: StateObject, action: ReducerAction) => {
  const { inputHistory, redosRemaining, undoActive, inputValue } = state;
  const { type, payload } = action;
  switch (type) {
    case ReducerActionTypes.UNDO: {
      const historyIndex = inputHistory.length - 2 - redosRemaining;
      if (historyIndex >= 0) {
        return {
          inputValue: inputHistory[historyIndex],
          redosRemaining: redosRemaining + 1,
          inputHistory: inputHistory,
          undoActive: undoActive,
        };
      } else {
        return {
          inputValue: "",
          redosRemaining: redosRemaining + 1,
          inputHistory: inputHistory,
          undoActive: undoActive,
        };
      }
    }
    case ReducerActionTypes.REDO: {
      return {
        inputValue: inputHistory[inputHistory.length - redosRemaining],
        redosRemaining: redosRemaining - 1,
        inputHistory: inputHistory,
        undoActive: undoActive,
      };
    }
    case ReducerActionTypes.NEW_INPUT: {
      return {
        inputValue: payload!.newValue,
        redosRemaining: payload!.resetRedos ? 0 : redosRemaining,
        inputHistory: [...inputHistory, payload!.newValue],
        undoActive: undoActive,
      };
    }
    case ReducerActionTypes.UNDO_ACTIVATION: {
      return {
        inputValue: inputValue,
        redosRemaining: redosRemaining,
        inputHistory: inputHistory,
        undoActive: payload?.newValue ? true : false,
      };
    }
    default:
      return state;
  }
};

interface StateObject {
  inputValue: string;
  redosRemaining: number;
  inputHistory: string[];
  undoActive: boolean;
}

const useUndoRedo = () => {
  const [state, dispatch] = useReducer(reducer, {
    inputValue: "",
    redosRemaining: 0,
    inputHistory: [],
    undoActive: false,
  } as StateObject);
  const { inputValue, inputHistory, redosRemaining } = state;

  useEffect(() => {
    if (
      (inputValue && inputValue.length > 0) ||
      (inputHistory.length > 0 && redosRemaining !== inputHistory.length)
    ) {
      dispatch({
        type: ReducerActionTypes.UNDO_ACTIVATION,
        payload: { newValue: "1" },
      });
    } else {
      dispatch({
        type: ReducerActionTypes.UNDO_ACTIVATION,
        payload: { newValue: "" },
      });
    }
  }, [inputHistory.length, inputValue, redosRemaining]);

  const newInput = (value: string) => {
    dispatch({
      type: ReducerActionTypes.NEW_INPUT,
      payload: { newValue: value, resetRedos: value.length > 0 },
    });
  };

  const undo = () => {
    dispatch({ type: ReducerActionTypes.UNDO });
  };

  const redo = () => {
    dispatch({ type: ReducerActionTypes.REDO });
  };

  return { state, newInput, undo, redo };
};

export default useUndoRedo;
