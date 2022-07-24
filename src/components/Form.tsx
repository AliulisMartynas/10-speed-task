import { useEffect, useState } from "react";
import "../App.css";
import { Button, TextField, Stack, Typography } from "@mui/material";
import { Undo, Redo, Clear, Add } from "@mui/icons-material";

const Form = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [inputList, setInputList] = useState<string[]>([]);
  const [inputHistory, setInputHistory] = useState<string[]>([]);
  const [undoActive, setUndoActive] = useState<boolean>(false);
  const [redosRemaining, setRedosRemaining] = useState<number>(0);

  useEffect(() => {
    const storedInputs = localStorage.getItem("inputList");
    if (storedInputs) {
      setInputList(JSON.parse(storedInputs));
    }
  }, []);

  useEffect(() => {
    if (
      (inputValue && inputValue.length > 0) ||
      (inputHistory.length > 0 && redosRemaining !== inputHistory.length)
    ) {
      setUndoActive(true);
    } else {
      setUndoActive(false);
    }
  }, [inputHistory, inputValue, redosRemaining]);

  const saveToList = () => {
    setInputList([...inputList, inputValue]);
    localStorage.setItem(
      "inputList",
      JSON.stringify([...inputList, inputValue])
    );
    handleClear();
  };

  const onInputChange = (value: string) => {
    setInputValue(value);
    setInputHistory((currentHistory) => [...currentHistory, value]);
    setRedosRemaining(0);
  };

  const handleUndo = () => {
    const historyIndex = inputHistory.length - 2 - redosRemaining;
    if (historyIndex >= 0) {
      setInputValue(inputHistory[historyIndex]);
    } else {
      setInputValue("");
    }
    setRedosRemaining(redosRemaining + 1);
  };

  const handleRedo = () => {
    setInputValue(inputHistory[inputHistory.length - redosRemaining]);
    setRedosRemaining(redosRemaining - 1);
  };

  const handleClear = () => {
    setInputValue("");
    setInputHistory((currentHistory) => [...currentHistory, ""]);
  };

  return (
    <div className="App">
      <Stack direction="row" spacing={1}>
        <Button
          variant="contained"
          startIcon={<Undo />}
          onClick={handleUndo}
          disabled={undoActive === false}
        >
          Undo
        </Button>
        <Button
          variant="contained"
          startIcon={<Redo />}
          onClick={handleRedo}
          disabled={redosRemaining < 1}
        >
          Redo
        </Button>
        <Button
          variant="contained"
          startIcon={<Clear />}
          onClick={handleClear}
          disabled={inputValue.length === 0}
        >
          Clear
        </Button>
      </Stack>
      <div className="text-field">
        <TextField
          value={inputValue}
          onChange={(event) => onInputChange(event.target.value)}
        />
      </div>
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={saveToList}
        disabled={inputValue.length === 0}
      >
        Save
      </Button>
      <div>
        {inputList.map((listItem, index) => (
          <div
            key={index}
            onClick={() => setInputValue(listItem)}
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
