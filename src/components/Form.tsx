import { useState } from "react";
import "../App.css";
import { Button, TextField, Stack } from "@mui/material";
import { Undo, Redo, Clear, Add } from "@mui/icons-material";

const Form = () => {
  const [inputValue, setInputValue] = useState<string>("");

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
      <Button variant="contained" startIcon={<Add />}>
        Save
      </Button>
    </div>
  );
};

export default Form;
