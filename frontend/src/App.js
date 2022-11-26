import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import NeedAuth from "./Auth/NeedAuth";
import UserList from "./Component/UserList";
import Login from "./Auth/Login";
import UserProvider, { userContext } from "./Context/UserContext";
import NavbarMode from './Component/NavbarMode';
import { useState } from 'react';
import ConversationPage from './Component/ConversationPage';

function App() {

    const [userId, setUserId] = useState();
    const [loggedUserId, setLoggedUserId] = useState();
    const [channel, setChannel] = useState();

    return (
        <UserProvider>
            <div className='d-flex h-100 bg-black'>
                <NavbarMode />
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={
                            <NeedAuth>
                                <UserList setUserId={setUserId} userId={userId} loggedUserId={loggedUserId} setChannel={setChannel} />
                                {userId ? <ConversationPage userId={userId} loggedUserId={loggedUserId} channel={channel} /> : ''}
                            </NeedAuth>
                        }/>
                        <Route path='/login' element={<Login setLoggedUserId={setLoggedUserId} />}/>
                    </Routes>
                </BrowserRouter>
            </div>
        </UserProvider>
    );
}

export default App;
