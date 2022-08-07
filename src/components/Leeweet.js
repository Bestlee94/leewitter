import React, { useState } from "react";
import { dbService } from "../fbase";

const Leeweet = ({ leeweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newLeeweet, setNewLeeweet] = useState(leeweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this?");
    if (ok) {
      await dbService.doc(`leeweets/${leeweetObj.id}`).delete();
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`leeweets/${leeweetObj.id}`).update({
      text: newLeeweet,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewLeeweet(value);
  };
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit new Leeweet"
              value={newLeeweet}
              required
              onChange={onChange}
            />
            <input type="submit" value="Update Leeweet" />
          </form>
          <button onClick={toggleEditing}>cancle</button>
        </>
      ) : (
        <>
          <h4>{leeweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete</button>
              <button onClick={toggleEditing}>Edit</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Leeweet;
