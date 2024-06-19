import FileInfo from "components/FileInfo";
import Cloudiy from "pages/HomePage";
import SignIn from "pages/SignIn";
import SignUp from "pages/SignUp";
import React from "react";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/Home/" element={<Cloudiy />}>
        <Route path="/Home/:id" element={<FileInfo />} />
      </Route>
    </Routes>
  );
}

export default App;
