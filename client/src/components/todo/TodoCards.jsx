import React from "react";
import { GrUpdate } from "react-icons/gr";
import { MdDelete } from "react-icons/md";

const TodoCards = ({
  type,
  time,
  id,
  delId,
  display,
  updateId,
  toBeUpdated,
}) => {
  return (
    <div className="todo-cards p-3">
      <div>
        <pre className="todo-cards-pre">
          {type} - {time} mins
        </pre>
      </div>
      <div className="d-flex justify-content-around card-icon-head">
        <div
          className="cards-icon px-2 py-1"
          onClick={() => {
            display("block");
            toBeUpdated(updateId);
          }}
        >
          <GrUpdate /> Update
        </div>
        <div
          className="cards-icon px-2 py-1 del"
          onClick={() => {
            delId(id);
          }}
        >
          <MdDelete /> Delete
        </div>
      </div>
    </div>
  );
};

export default TodoCards;
