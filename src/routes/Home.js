import React, { useState, useEffect } from "react";
import Leeweet from "../components/Leeweet";
import { dbService } from "../fbase";
import LeeweetFactory from "../components/LeeweetFactory";

// eslint-disable-next-line import/no-anonymous-default-export
const Home = ({ userObj }) => {
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

  return (
    <div className="container">
      <LeeweetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
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
