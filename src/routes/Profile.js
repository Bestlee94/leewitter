import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService, dbService } from "../fbase";

// eslint-disable-next-line import/no-anonymous-default-export
const Profile = ({ userObj, refreshUser }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const navigate = useNavigate();
  const onLogOut = () => {
    authService.signOut();
    navigate("/");
  };

  const getMyLeeweets = async () => {
    const leeweets = await dbService
      .collection("leeweets")
      .where("createrId", "==", userObj.uid)
      .orderBy("createdAt")
      .get();
    console.log(leeweets.docs.map((doc) => doc.data()));
  };
  useEffect(() => {
    getMyLeeweets();
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };
  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          onChange={onChange}
          type="text"
          autoFocus
          placeholder="Display name"
          value={newDisplayName}
          className="formInput"
        />
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{
            marginTop: 10,
          }}
        />
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogOut}>
        Log Out
      </span>
    </div>
  );
};
export default Profile;
