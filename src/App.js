import './App.scss';
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import {Col, Container, Row} from "react-bootstrap";
import HomeScreen from "./screens/homeScreen";
import {BrowserRouter, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import Payouts from "./screens/payouts";
import NewEvent from "./screens/newEvent";
import EventScreen from "./screens/eventScreen";
import EventsScreen from "./screens/eventsScreen";
import Login from "./screens/login";
import {useEffect, useState} from "react";
import Profile from "./screens/profile";


function App() {

    return (
        <BrowserRouter className="App text-primary" basename={'/'}>
            <Routed/>
        </BrowserRouter>
    );
}

function Routed() {
    let location = useLocation();
    let history = useNavigate();
    const [hide, setHide] = useState(false);
    useEffect(() => {
        if (location.pathname === '/login' || location.pathname === '/confirm' || location.pathname === '/forgotpassword' || location.pathname === '/logout') {
            setHide(true);

        } else {

            setHide(false);

        }
        if (localStorage.getItem('user') === null){
            history('/login')
        }
    }, [location.pathname, history])

  return (
        <div className={'h-100'}>
            <Routes>
                <Route path={'/login'} element={<Login/>}/>
            </Routes>
            <Container fluid className={' h-100'}>
                <Row>
                    <Col  lg={'2'} className={'p-0 m-0 desktopOnly'}>
                        {!hide && <Sidebar/>}
                    </Col>
                    <Col md={'auto'} lg={'10'} className={'p-0 m-0 '}  >
                        <Container fluid className={'p-0 bg-body-secondary h-100 d-flex flex-column'} style={{
                            height: '100vh'
                        }}>
                            {!hide && <Header/>}
                            <div className={'fillSpace'}>
                                <Routes>
                                    <Route  path={'/events/new'} element={<NewEvent/>}/>
                                    <Route path={'/events/:id'} element={<EventScreen/>}/>
                                    <Route path={'/events'} element={<EventsScreen/>}/>
                                    <Route path={'/'} element={<HomeScreen/>}/>
                                    <Route path={'/payouts'} element={<Payouts/>}/>
                                    <Route path={'/profile'} element={<Profile/>}/>
                                </Routes>

                            </div>
                        </Container>
                    </Col>
                </Row>
            </Container>

        </div>

  );
}

export default App;
