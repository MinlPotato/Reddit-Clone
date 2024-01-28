import { useState } from "react";
import "./App.css";
import StackedList from "./components/stackedList.jsx";
import Header from "./components/headerComponents/Header.jsx";
import Main from "./components/Main.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';
import CommentSection from "./components/Comments.jsx";
import { Provider } from "react-redux";
import store from "./components/State/Store.jsx";
import LogIn from "./components/LogIn.jsx";
import HeaderLayout from "./components/headerComponents/HeaderLayOut.jsx";
import Register from "./components/Register.jsx";
import SubmitPost from "./components/SubmitComponents/SubmitPost.jsx";
import CommunityPage from "./components/Community/CommunityPage.jsx";
import Search from "./components/Search.jsx";
import ProfileMain from "./components/Profile/ProfileMain.jsx";


function App() {
  <script src="../path/to/flowbite/dist/flowbite.min.js"></script>

  

  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>

            <Route exact path="/login" element={<LogIn />} />
            <Route exact path="/register" element={<Register />} />

            <Route element={<HeaderLayout/>}>
              <Route path="/" element={<Navigate to="/reddit" />} />
              <Route exact path="/reddit" element={<Main />} />
              <Route exact path="/reddit/:id" element={<CommentSection />} />
              <Route exact path="/reddit/submit" element={<SubmitPost/>} />
              <Route exact path="/reddit/r/:id" element={<CommunityPage/>} />
              <Route exact path="/reddit/search" element={<Search/>}/>
              <Route exact path="/reddit/user/:id" element={<ProfileMain/>}/>
            </Route>

          </Routes>
        </BrowserRouter>
      </Provider>

    </>
  );
}

export default App;
