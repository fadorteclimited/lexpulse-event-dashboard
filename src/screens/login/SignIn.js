import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {SignInHost} from "../../podo/userData";
import {getEvents} from "../../podo/EventsSlice";
import {Button, Col, Container, Form, FormControl, FormGroup, FormLabel, FormText, Row} from "react-bootstrap";
import {LoginError} from "./index";
import {LinkContainer} from "react-router-bootstrap";
import {setEmail, setLoading} from "./LoginSlice";
import axios from "axios";
import {common} from "../../podo/utils";


export default function SignIn() {
    const [email, setEmailLocal] = useState('');
    const [pass, setPass] = useState('');

    const [show, setShow] = useState(false);

    const [errorMessage, setErrorMessage] = useState('0');

    let history = useNavigate();
    const dispatch = useDispatch();
    async function handleSignIn() {
        if (email === undefined || pass === undefined || email === '' || pass === '') {
            setShow(true);
            setErrorMessage('Invalid Email or Password')

        } else {
            dispatch(setEmail(email))
            dispatch(setLoading(true))
            let successObj = await SignInHost(email, pass);
            console.log(successObj)
            dispatch(setLoading(false));
            if (successObj.success) {
                dispatch(getEvents());
                history('/');
            } else {
                setShow(true);
                setErrorMessage('Can\'t sign in: ' + successObj.message);

            }
        }

    }
    async function resetPass(){
        if (email === '' || email === undefined){
            setErrorMessage('Enter your email');
            setShow(true);
        } else {
            const res = await axios.post(`${common.baseUrl}api/v1/auth/reset-password`, {
                email: email
            }).catch(
                (reason) =>{
                    console.log(reason);
                    setErrorMessage(reason.response.data.msg);
                    setShow(true);
                }
            );
            if (res !== undefined){
                if (res.status === 200){
                    dispatch(setEmail(email));
                    history('/update-pass')
                }
            }
        }
    }
    return (<Container className='mt-3' style={{}}>
        <LoginError show={show} setShow={setShow} errorMessage={errorMessage}/>
        <Form onSubmit={handleSignIn.bind(this)}>
            <FormGroup>
                <FormLabel htmlFor="exampleInputEmail1" className="mt-0">Email address</FormLabel>
                <FormControl required type={'email'} className={'form-control-login'} id={'Email1'}
                             placeholder={'Enter Email'} onChange={(e) => setEmailLocal(e.target.value)}/>
                <FormText id="emailHelp" className="text-primary">We'll never share your email
                    with anyone else.</FormText>
            </FormGroup>
            <FormGroup>
                <FormLabel htmlFor="exampleInputPassword1" className="mt-3">Password</FormLabel>
                <FormControl required type="password" className={'form-control-login'} id="passId"
                             placeholder="Password" onChange={(e) => setPass(e.target.value)}/>
                <FormText className='text-right' onClick={resetPass.bind(this)}>forgot
                    password?</FormText>
            </FormGroup>
            <FormGroup>
                <Row className='mt-3'>
                    <Col>
                        <Button className={'w-100'} variant='primary' type={'submit'}>Login</Button>
                    </Col>
                    <Col>
                       <LinkContainer to={'/signup'}>
                           <Button type={'button'} className={'w-100'} variant='outline-primary'>Sign Up</Button>
                       </LinkContainer>
                    </Col>
                </Row>
            </FormGroup>
        </Form></Container>)
}