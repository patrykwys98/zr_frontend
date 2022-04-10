import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import useAxios from "../utils/useAxios";
import { useLocation } from "react-router-dom";
const HomePage = () => {
  const { state } = useLocation();
  console.log(state);
  return (
    <div>
      <p>You are logged to the Home page</p>
    </div>
  );
};

export default HomePage;
