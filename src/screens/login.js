import React, {useState} from 'react'
import {
    Alert, Button, Col, Container, Form, FormControl, FormGroup, FormLabel, FormText, Modal, Row
} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import LoginImage from '../assets/reshot-0.png'
import {Link, useNavigate} from 'react-router-dom'
import Logo from '../assets/logo.png'
import LoadingScreen from "../components/LoadingScreen";
async function signIn(email, pass) {

    return {
        success: true, errorMessage: {
            email: pass
        }
    }
}

async function createUser(param, pass) {

}

export default function Login() {
    const [second, setSecond] = useState(false);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('0');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [fName, setFName] = useState();
    const [lName, setLName] = useState();
    const [phone, setPhone] = useState();
    const [cName, setCName] = useState();

    let history = useNavigate();

    async function handleSignIn() {
        if (email === undefined || pass === undefined || email === '' || pass === '') {
            setShow(true);
            setErrorMessage('Can\'t sign in: Invalid Email or Password')

        } else {
            setLoading(true);
            var successObj = await signIn(email, pass);
            setLoading(false);
            if (successObj.success) {

                history('/');
            } else {
                setShow(true);
                setErrorMessage('Can\'t sign in: ' + successObj.errorMessage);

            }
        }

    }

    async function handleSignUp() {

        if (fName === '' || lName === '' || phone === '' || fName === undefined || lName === undefined || phone === undefined || cName === '' || cName === undefined) {
            setShow(true);
            setErrorMessage('Please fill in all fields')
        } else {
            setLoading(true);
            var successObj = await createUser({
                'firstName': fName, 'lastName': lName, 'phone': phone, 'email': email,
            }, pass);
            setLoading(false)
            if (successObj.success) {

                // history('/');
            } else {
                setShow(true);
                setErrorMessage(successObj.errorMessage);
            }
        }
    }

    function changePage() {
        setSecond(true);
    }
    if (loading) {

        return (<LoadingScreen className={'h-100'}/>)
    } else
    return (<Container fluid className={'bg-dark mx-0 vh-100 '}>
        <Modal show={show} className={'panel-warning alert-danger '} onHide={setShow.bind(this, false)}>
            <Modal.Header className={'panel-heading alert-danger'} closeButton>
                <Modal.Title>Error</Modal.Title>
            </Modal.Header>
            <Modal.Body>{errorMessage}</Modal.Body>
        </Modal>
        <Row>
            <Col className={'vh-100 verticalCenter text-white overflow-y-scroll'}>
                <LinkContainer to={'/'}>
                    <span className={'mt-2 ff-montserrat text-uppercase h3 text-center fw-light'}><img src={Logo} alt={'logo'}
                                                                              height={80}/>Lexpulse</span></LinkContainer>
                {(second) ? (<Container className=''>
                    <Form>
                        <FormGroup>
                            <Row>
                                <Col>
                                    <FormLabel className="mt-3">First Name</FormLabel>
                                    <FormControl className={'form-control-login'} id='firstNameId' placeholder='First Name'
                                                 onChange={(e) => setFName(e.target.value)}/>
                                    <FormText className="text-primary">First Name</FormText>
                                </Col>
                                <Col>
                                    <FormLabel className="mt-3">Last Name</FormLabel>
                                    <FormControl className={'form-control-login'} id='lastNameId' placeholder='Last Name'
                                                 onChange={(e) => setLName(e.target.value)}/>
                                    <FormText className="text-primary">Second Name</FormText>
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel className="mt-3">Company Name</FormLabel>
                            <FormControl className={'form-control-login'} id='companyId' placeholder='Event Brand Name'
                                         onChange={(e) => setCName(e.target.value)}/>
                            <FormText className="text-primary">Event Company Name</FormText>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel htmlFor="exampleInputEmail1" className="mt-3">Email address</FormLabel>
                            <FormControl type={'email'} className={'form-control-login'} id={'Email1'}
                                         placeholder={'Enter Email'} onChange={(e) => setEmail(e.target.value)}/>
                            <FormText id="emailHelp" className="text-primary">We'll never share your email
                                with anyone else.</FormText>
                        </FormGroup>

                        <FormGroup className={''}>
                            <FormLabel className="mt-3">Phone Number</FormLabel>
                            <FormControl type={'tel'} className={'form-control-login'} id='phoneId' placeholder='Phone Number'
                                         onChange={(e) => setPhone(e.target.value)}/>
                            <FormText className="text-primary">Phone Number</FormText>

                        </FormGroup>
                        <FormGroup>
                            <FormLabel htmlFor="exampleInputPassword1" className="mt-3">Password</FormLabel>
                            <FormControl type="password" className="form-control-login" id="passId"
                                         placeholder="Create Password" onChange={(e) => setPass(e.target.value)}/>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel htmlFor="exampleInputPassword2" className="mt-3">Confirm Password</FormLabel>
                            <FormControl type="password" className="form-control-login" id="passId"
                                         placeholder="Confirm Password" onChange={(e) => setPass(e.target.value)}/>
                        </FormGroup>
                        <FormGroup className='pt-3'>
                            <Button variant={'primary'} className={'w-100'}
                                    onClick={handleSignUp.bind(this)}>Create an Account</Button>
                            <FormText className={'text-white'}>Already have an account? <strong className={'btn btn-link p-0 m-0'}
                                                                       onClick={setSecond.bind(this, false)}>Sign
                                In</strong></FormText>
                        </FormGroup>
                    </Form>
                </Container>) : <Container className='mt-3' style={{}}>
                    <Form>
                        <FormGroup>
                            <Alert dismissible variant='secondary' id='dialog' show={show}>
                                <Button className='btn-close ' variant={'secondary'} data-bs-dismiss="alert"
                                        onClick={setShow.bind(this, false)}></Button>
                                <p className='mb-0'>{errorMessage}</p>
                            </Alert>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel htmlFor="exampleInputEmail1" className="mt-0">Email address</FormLabel>
                            <FormControl type={'email'} className={'form-control-login'} id={'Email1'}
                                         placeholder={'Enter Email'} onChange={(e) => setEmail(e.target.value)}/>
                            <FormText id="emailHelp" className="text-primary">We'll never share your email
                                with anyone else.</FormText>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel htmlFor="exampleInputPassword1" className="mt-3">Password</FormLabel>
                            <FormControl type="password" className={'form-control-login'} id="passId"
                                         placeholder="Password" onChange={(e) => setPass(e.target.value)}/>
                            <Link to={'/forgotpassword'}><FormText className='text-right'>forgot
                                password?</FormText></Link>
                        </FormGroup>
                        <FormGroup>
                            <Row className='mt-3'>
                                <Col>
                                    <Button className={'w-100'} variant='primary'
                                            onClick={handleSignIn.bind(this)}>Login</Button>
                                </Col>
                                <Col>
                                    <Button className={'w-100'} variant='outline-primary'
                                            onClick={changePage.bind(this)}>Sign Up</Button>
                                </Col>
                            </Row>

                        </FormGroup>
                    </Form></Container>}

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