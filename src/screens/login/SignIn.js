import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {SignInHost} from "../../podo/userData";
import {getEvents} from "../../podo/EventsSlice";
import {Button, Col, Container, Form, FormControl, FormGroup, FormLabel, FormText, Row} from "react-bootstrap";
import {LoginError} from "./index";
import {LinkContainer} from "react-router-bootstrap";
import {setLoading} from "./LoginSlice";


export default function SignIn() {
    const [email, setEmail] = useState('');
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
            dispatch(setLoading(true))
            let successObj = await SignInHost(email, pass);
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
    return (<Container className='mt-3' style={{}}>
        <LoginError show={show} setShow={setShow} errorMessage={errorMessage}/>
        <Form>
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
                <Link to={'/forgot-password'}><FormText className='text-right'>forgot
                    password?</FormText></Link>
            </FormGroup>
            <FormGroup>
                <Row className='mt-3'>
                    <Col>
                        <Button className={'w-100'} variant='primary'
                                onClick={handleSignIn.bind(this)}>Login</Button>
                    </Col>
                    <Col>
                       <LinkContainer to={'/signup'}>
                           <Button className={'w-100'} variant='outline-primary'>Sign Up</Button>
                       </LinkContainer>
                    </Col>
                </Row>
            </FormGroup>
        </Form></Container>)
}