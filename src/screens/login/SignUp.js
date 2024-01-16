import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {signUpHost} from "../../podo/userData";
import {Button, Col, Container, Form, FormControl, FormGroup, FormLabel, FormText, Row} from "react-bootstrap";
import {LoginError} from "./index";
import {LinkContainer} from "react-router-bootstrap";
import {useDispatch} from "react-redux";
import {setLoading} from "./LoginSlice";


export default function SignUp() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [pass2, setPass2] = useState('');
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');

    const [show, setShow] = useState(false);
    const [errorMessage, setErrorMessage] = useState('0');

    let history = useNavigate();
    const dispatch = useDispatch();
    async function handleSignUp() {

        if (fName === '' || lName === '' || fName === undefined || lName === undefined || email === undefined || pass === undefined || email === '' || pass === '') {
            setShow(true);
            setErrorMessage('Please fill in all fields')
        } else {
            if (pass !== pass2){
                setShow(true);
                setErrorMessage('Passwords dont match')
            } else {
               dispatch( setLoading(true));
                let successObj = await signUpHost({
                    firstName: fName, lastName: lName, email: email, pass: pass,
                });
                dispatch(setLoading(false))
                if (successObj.success) {
                    history('/login');
                } else {
                    setShow(true);
                    setErrorMessage(successObj);
                }
            }
        }
    }
    return (<Container className=''>
        <LoginError show={show} setShow={setShow} errorMessage={errorMessage}/>
        <Form>
            <FormGroup>
                <Row>
                    <Col>
                        <FormLabel className="mt-3">First Name</FormLabel>
                        <FormControl className={'form-control-login'} id='firstNameId'
                                     placeholder='First Name'
                                     onChange={(e) => setFName(e.target.value)}/>
                        <FormText className="text-primary">First Name</FormText>
                    </Col>
                    <Col>
                        <FormLabel className="mt-3">Last Name</FormLabel>
                        <FormControl className={'form-control-login'} id='lastNameId'
                                     placeholder='Last Name'
                                     onChange={(e) => setLName(e.target.value)}/>
                        <FormText className="text-primary">Second Name</FormText>
                    </Col>
                </Row>
            </FormGroup>

            <FormGroup>
                <FormLabel htmlFor="exampleInputEmail1" className="mt-3">Email address</FormLabel>
                <FormControl type={'email'} className={'form-control-login'} id={'Email1'}
                             placeholder={'Enter Email'} onChange={(e) => setEmail(e.target.value)}/>
                <FormText id="emailHelp" className="text-primary">We'll never share your email
                    with anyone else.</FormText>
            </FormGroup>


            <FormGroup>
                <FormLabel htmlFor="exampleInputPassword1" className="mt-3">Password</FormLabel>
                <FormControl type="password" className="form-control-login" id="passId"
                             placeholder="Create Password" onChange={(e) => setPass(e.target.value)}/>
            </FormGroup>
            <FormGroup>
                <FormLabel htmlFor="exampleInputPassword2" className="mt-3">Confirm Password</FormLabel>
                <FormControl isInvalid={pass !== pass2} type="password" className="form-control-login" id="passId2"
                             placeholder="Confirm Password" onChange={(e) => setPass2(e.target.value)}/>
            </FormGroup>
            <FormGroup className='pt-3'>
                <Button variant={'primary'} className={'w-100'}
                        onClick={handleSignUp.bind(this)}>Create an Account</Button>
                <FormText className={'text-white'}>Already have an account? <LinkContainer to={'/login'}><strong
                    className={'btn btn-link p-0 m-0'}>Sign In</strong></LinkContainer></FormText>
            </FormGroup>
        </Form>
    </Container>)
}