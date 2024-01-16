import React from 'react'
import {
    Col, Container, Modal, Row
} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import LoginImage from '../../assets/reshot-0.png'
import {Outlet} from 'react-router-dom'
import Logo from '../../assets/logo.png'
import LoadingScreen from "../../components/LoadingScreen";
import {useSelector} from "react-redux";
import {selectLoadingState} from "./LoginSlice";


export default function Login() {
    const loading = useSelector(selectLoadingState)
    if (loading) {
        return (<Container fluid={'bg-dark mx-0 vh-100'}><LoadingScreen className={'vh-100'}/></Container> )
    } else return (<Container fluid className={'bg-dark mx-0 vh-100 '}>
        <Row>
            <Col className={'vh-100 verticalCenter text-white bg-dark overflow-y-auto'}>
                <LinkContainer to={'/'}>
                    <span className={'mt-2 ff-montserrat text-uppercase h3 text-center fw-light'}>
                        <img src={Logo} alt={'logo'} height={80}/>Lexpulse
                    </span>
                </LinkContainer>
                <Outlet/>
            </Col>
            <Col md={'8'} className={'desktopOnly py-2 vh-100'}>
                <div className={'h-100 w-100 bg-dark-2'}>
                    <img src={LoginImage} alt='login' style={{
                        width: '100%', height: '100%', objectFit: 'cover',
                    }}/>
                </div>
            </Col>
        </Row>
    </Container>)
}






export function LoginError({show,setShow,errorMessage}) {

    return (<Modal show={show} className={'panel-warning alert-danger '} onHide={setShow.bind(this, false)}>
        <Modal.Header className={'panel-heading alert-danger'} closeButton>
            <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{errorMessage}</Modal.Body>
    </Modal>)
}
// function CompleteProfile() {
//     const [phone, setPhone] = useState();
//     const [cName, setCName] = useState();
//     console.log(phone, cName);
//     return (<Form>
//         <FormGroup className={''}>
//             <FormGroup>
//                 <FormLabel className="mt-3">Company Name</FormLabel>
//                 <FormControl className={'form-control-login'} id='companyId' placeholder='Event Brand Name'
//                              onChange={(e) => setCName(e.target.value)}/>
//                 <FormText className="text-primary">Event Company Name</FormText>
//             </FormGroup>
//
//             <FormLabel className="mt-3">Phone Number</FormLabel>
//             <FormControl type={'tel'} className={'form-control-login'} id='phoneId' placeholder='Phone Number'
//                          onChange={(e) => setPhone(e.target.value)}/>
//             <FormText className="text-primary">Phone Number</FormText>
//
//         </FormGroup>
//     </Form>)
// }