import Typography from "@mui/material/Typography";
import "../App.css";

interface ListProps {
  inputList: string[];
  newInput: (value: string) => void;
}

const List = ({ inputList, newInput }: ListProps) => {
  return (
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
  );
};

export default List;
