import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Register from './components/register';
import Home from './components/home';
import UsersPage from './components/usersPage';
import ChatPage from './components/chatPage';
import UserProfile from './components/userProfile';
import SpecificUser from './components/specificUser';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/profile/myProfile' element={<UserProfile />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/users' element={<UsersPage />} />
        <Route path="/chat/:id" element={<ChatPage/>}/>
        <Route path="/user/:email" element={<SpecificUser/>}/>
      </Routes>
    </Router>
  );
}

export default App;