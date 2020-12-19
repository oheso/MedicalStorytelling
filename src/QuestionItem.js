import React from "react";
import { db } from "./firebase";
import DeleteIcon from '@material-ui/icons/Delete';

const QuestionItem = ({ id, title, contents }) => {
  const DeleteInputData = () => {
    db.collection("group").doc(id).delete();
  };
  return (
    <div key={id}>
      <h2>{title}</h2>
      <h3>{contents}</h3>
      <button onClick={DeleteInputData}>
        削除<DeleteIcon />
      </button>
    </div>
  );
};

export default QuestionItem;
