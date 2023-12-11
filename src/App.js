import './styles/App.scss';
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import {Col, Container, Row} from "react-bootstrap";
import HomeScreen from "./screens/homeScreen";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Payouts from "./screens/payouts";
import NewEvent from "./screens/newEvent";
import EventScreen from "./screens/eventScreen";
import EventsScreen from "./screens/eventsScreen";

function App() {
  return (
    <BrowserRouter className="App text-primary">
        <Container fluid >
            <Row>
                <Col  lg={'2'} className={'p-0 m-0 desktopOnly'}>
                    <Sidebar/>
                </Col>
                <Col md={'auto'} lg={'10'} className={'p-0 m-0 '}  >
                    <Container fluid className={'p-0 bg-body-secondary h-100 d-flex flex-column'} style={{
                        height: '100vh'
                    }}>
                        <Header/>
                        <div className={'fillSpace'}>
                            <Routes>
                                <Route path={'/'} element={<HomeScreen/>}/>
                                <Route path={'/payouts'} element={<Payouts/>}/>
                                <Route path={'/events/new'} element={<NewEvent/>}/>
                                <Route path={'/events/:id'} element={<EventScreen/>}/>
                                <Route path={'/events'} element={<EventsScreen/>}/>
                            </Routes>

                        </div>
                    </Container>
                </Col>
            </Row>
        </Container>
    </BrowserRouter>
  );
}

export default App;
