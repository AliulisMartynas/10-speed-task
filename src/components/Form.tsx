import { useEffect, useState } from "react";
import "../App.css";
import { Button, TextField, Stack, Typography } from "@mui/material";
import { Undo, Redo, Clear, Add } from "@mui/icons-material";
import useLocalStorage from "../hooks/useLocalStorage";
import useUndoRedo from "../hooks/useUndoRedo";

const Form = () => {
  const [inputList, setInputList] = useState<string[]>([]);
  const { initialValues: initialStoredList, setNewValue: setStoredList } =
    useLocalStorage("inputList");

  const { state, newInput, undo, redo } = useUndoRedo();
  const { inputValue, redosRemaining, undoActive } = state;

  useEffect(() => {
    setInputList(initialStoredList);
  }, [initialStoredList]);

  useEffect(() => {
    setInputList(initialStoredList);
  }, [initialStoredList]);

  const saveToList = () => {
    setInputList([...inputList, state.inputValue]);
    setStoredList(JSON.stringify([...inputList, state.inputValue]));
    newInput("");
  };

  return (
    <div className="App">
      <Stack direction="row" spacing={1}>
        <Button
          variant="contained"
          onClick={undo}
          disabled={undoActive === false}
          endIcon={<Undo />}
        >
          Undo
        </Button>
        <Button
          variant="contained"
          onClick={redo}
          disabled={redosRemaining < 1}
          endIcon={<Redo />}
        >
          Redo
        </Button>
        <Button
          variant="contained"
          onClick={() => newInput("")}
          disabled={inputValue.length === 0}
          endIcon={<Clear />}
        >
          Clear
        </Button>
      </Stack>
      <div className="text-field">
        <TextField
          value={inputValue}
          onChange={(event) => newInput(event.target.value)}
        />
      </div>
      <Button
        variant="contained"
        onClick={saveToList}
        endIcon={<Add />}
        disabled={inputValue.length === 0}
      >
        Save
      </Button>
      <div>
        {inputList.map((listItem, index) => (
          <div
            key={index}
            onClick={() => newInput(listItem)}
            className="list-item"
          >
            <Typography>{listItem}</Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Form;
