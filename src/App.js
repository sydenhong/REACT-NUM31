import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import logo from './logo.svg';
import './App.css';
import Register from "./pages/Register";
import Login from "./pages/Login";
import MyTask from "./pages/MyTask";
import CreateTask from "./pages/createTask";
import EditTask from "./pages/editTask";

import { Context, ContextProvider } from "./auth/Context";
import { useContext } from "react";

function App() {
  const { user, dispatch } = useContext(Context);

  return (
    <BrowserRouter>
      <ContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="contact" element={<Contact />} />
            {user ?
              <>
                <Route path="mytask" element={ <MyTask /> } />
                <Route path="create/task" element={ <CreateTask /> } />
                <Route path="edit/task/:id" element={ <EditTask /> } />
              </>
            : 
              <>
                <Route path="register" element={ <Register /> } />
                <Route path="login" element={ <Login /> } />
              </>
            }
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </ContextProvider>
    </BrowserRouter>
  );
}

export default App;
