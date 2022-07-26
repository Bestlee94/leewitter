import React from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../fbase";

// eslint-disable-next-line import/no-anonymous-default-export
const Profile = () => {
  const navigate = useNavigate();
  const onLogOut = () => {
    authService.signOut();
    navigate("/");
  };
  return (
    <>
      <button onClick={onLogOut}>LogOut</button>
    </>
  );
};
export default Profile;
