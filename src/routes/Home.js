import React, { useState, useEffect } from "react";
import Leeweet from "../components/Leeweet";
import { dbService } from "../fbase";

// eslint-disable-next-line import/no-anonymous-default-export
const Home = ({ userObj }) => {
  const [leeweet, setLeeweet] = useState("");
  const [leeweets, setLeeweets] = useState([]);

  useEffect(() => {
    dbService.collection("leeweets").onSnapshot((snapshot) => {
      const leeweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLeeweets(leeweetArray);
    });
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("leeweets").add({
      text: leeweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setLeeweet("");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setLeeweet(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={leeweet}
          onChange={onChange}
          type="text"
          placeholder="What`s on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Leeweet" />
      </form>
      <div>
        {leeweets.map((leeweet) => (
          <Leeweet
            key={leeweet.id}
            leeweetObj={leeweet}
            isOwner={leeweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
