import './App.css';
import Layout from './component/Layout';
import { Route, Routes } from "react-router-dom";
import { UserContextProvider } from './component/UserContext';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreatePostePage from './pages/CreatePostePage';
import PostPage from './pages/PostPage';
import EditPostPage from './pages/EditPostPage';



function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/create' element={<CreatePostePage />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path='/edit/:id' element={<EditPostPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App;
