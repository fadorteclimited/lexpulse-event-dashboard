import './App.scss';
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import {Col, Container, Row} from "react-bootstrap";
import HomeScreen from "./screens/homeScreen";
import {BrowserRouter, Outlet, Route, Routes, useNavigate} from "react-router-dom";
import Payouts from "./screens/payouts";
import NewEvent from "./screens/newEvent";
import EventScreen from "./screens/eventScreen";
import EventsScreen from "./screens/eventsScreen";
import Login from "./screens/login";
import {useEffect} from "react";
import Profile from "./screens/profile";
import EditEvent from "./screens/editEvent";
import {useDispatch, useSelector} from "react-redux";
import {getEvents, selectFullState} from "./podo/EventsSlice";


function App() {

    return (<BrowserRouter className="App text-primary" basename={'/'}>
        <Routed/>
    </BrowserRouter>);
}

function FullLayout() {

    return (<div className={'vh-100 bg-dark '}>
            <Container fluid className={'h-100'}>
                <Row className={'h-100'}>
                    <Col lg={'2'} sm={'0'} className={'p-0 m-0 desktopOnly h-100'}>
                        <Sidebar/>
                    </Col>
                    <Col md={'auto'} lg={'10'} className={'p-0 m-0 h-100'}>
                        <Container fluid className={'p-0 bg-body-secondary d-flex flex-column h-100'}>
                            <Header/>
                            <div className={'h-100 overflow-y-scroll'}>
                                <Outlet/>
                            </div>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </div>)
}

function Routed() {

    let history = useNavigate();
    const dispatch = useDispatch();
    const full = useSelector(selectFullState)



    useEffect(() => {

        if (localStorage.getItem('user') === null) {
            history('/login')
        } else {
            if (!full.hasError && full.value.length === 0 && !full.hasRun) {
                dispatch(getEvents());
                console.log(full)
            }
        }


    }, [history, full, dispatch])

    return (<div className={'vh-100 bg-dark '}>
            <Routes>
                <Route path={'/login'} element={<Login/>}/>
                <Route element={<FullLayout/>}>
                    <Route path={'/events/new'} element={<NewEvent/>}/>
                    <Route path={'/events/:id'} element={<EventScreen/>}/>
                    <Route path={'/events'} element={<EventsScreen/>}/>
                    <Route path={'/'} element={<HomeScreen/>}/>
                    <Route path={'/payouts'} element={<Payouts/>}/>
                    <Route path={'/profile'} element={<Profile/>}/>
                    <Route path={'/events/edit/:id'} element={<EditEvent/>}/>
                </Route>
            </Routes>

        </div>

    );
}

export default App;
