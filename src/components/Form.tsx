import { useEffect, useState } from "react";
import "../App.css";
import { Button, TextField, Stack, Typography } from "@mui/material";
import { Undo, Redo, Clear, Add } from "@mui/icons-material";

const Form = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [inputList, setInputList] = useState<string[]>([]);

  useEffect(() => {
    const storedInputs = localStorage.getItem("inputList");
    if (storedInputs) {
      setInputList(JSON.parse(storedInputs));
    }
  }, []);

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
  };

  const handleClear = () => {
    setInputValue("");
  };

  return (
    <div className="App">
      <Stack direction="row" spacing={1}>
        <Button variant="contained" startIcon={<Undo />}>
          Undo
        </Button>
        <Button variant="contained" startIcon={<Redo />}>
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
