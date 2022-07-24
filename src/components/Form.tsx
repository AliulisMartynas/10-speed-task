import { useState } from "react";
import "../App.css";
import { Button, TextField, Stack, Typography } from "@mui/material";
import { Undo, Redo, Clear, Add } from "@mui/icons-material";

const Form = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [inputList, setInputList] = useState<string[]>([]);

  const saveToList = () => {
    setInputList([...inputList, inputValue]);
  };

  const onInputChange = (value: string) => {
    setInputValue(value);
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
        <Button variant="contained" startIcon={<Clear />}>
          Clear
        </Button>
      </Stack>
      <div className="text-field">
        <TextField
          value={inputValue}
          onChange={(event) => onInputChange(event.target.value)}
        />
      </div>
      <Button variant="contained" startIcon={<Add />} onClick={saveToList}>
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
