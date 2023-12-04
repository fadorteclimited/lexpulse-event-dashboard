import './styles/App.scss';
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import {Col, Container, Row} from "react-bootstrap";
import HomeScreen from "./screens/homeScreen";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
  return (
    <BrowserRouter className="App text-primary">
        <Container fluid >
            <Row>
                <Col md={'2'} className={'p-0 m-0'}>
                    <Sidebar/>
                </Col>
                <Col md={'10'} className={'p-0 m-0'}>
                    <Container fluid className={'ps-0 bg-body-secondary'}>
                        <Header/>
                        <Routes>
                            <Route path={'/'} element={<HomeScreen/>}/>
                        </Routes>

                    </Container>
                </Col>
            </Row>
        </Container>
    </BrowserRouter>
  );
}

export default App;
