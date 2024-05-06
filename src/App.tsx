import { Route, Routes } from 'react-router';
import classes from './App.module.css';
import Header from './components/Header/Header';
import Greeting from './pages/Greeting/Greeting';
import Main from './pages/Main/Main';
import NotFound from './pages/NotFound/NotFound';
import Profile from './pages/Profile/Profile';

function App() {
    return (
        <>
            <Header />
            <main className={classes.main}>
                <Routes>
                    <Route path='/' element={<Main />} />
                    <Route path='/greeting' element={<Greeting />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </main>
        </>
    );
}

export default App;
