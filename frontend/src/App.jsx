import "./App.css";
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
import Search from "./components/SearchComponents/Search.jsx";
import ProfileHeaderLayout from "./components/Profile/ProfileHeaderLayout.jsx";
import ProfileUpVoted from "./components/Profile/ProfileUpVoted.jsx";
import ProfileDownVoted from "./components/Profile/ProfileDownVoted.jsx";
import ProfilePosts from "./components/Profile/ProfilePosts.jsx";
import ProfileSaved from "./components/Profile/ProfileSaved.jsx";
import ProfileComments from "./components/Profile/ProfileComments.jsx";


function App() {
  
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
              <Route element={<ProfileHeaderLayout/>}> 
                  <Route exact path="/reddit/user/:id" element={<ProfilePosts/>}/>
                  <Route exact path="/reddit/user/:id/upvoted" element={<ProfileUpVoted/>}/>
                  <Route exact path="/reddit/user/:id/downvoted" element={<ProfileDownVoted/>}/>
                  <Route exact path="/reddit/user/:id/saved" element={<ProfileSaved/>}/>
                  <Route exact path="/reddit/user/:id/posts" element={<ProfilePosts/>}/>
                  <Route exact path="/reddit/user/:id/comments" element={<ProfileComments/>}/>
              </Route>
            </Route>

          </Routes>
        </BrowserRouter>
      </Provider>

    </>
  );
}

export default App;
