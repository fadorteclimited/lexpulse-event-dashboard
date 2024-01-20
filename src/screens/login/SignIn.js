import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {SignInHost} from "../../podo/userData";
import {getEvents} from "../../podo/EventsSlice";
import {Button, Col, Container, Form, FormControl, FormGroup, FormLabel, FormText, Row} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {selectEmail, setEmail, setErrorBlock, setLoading} from "./LoginSlice";
import axios from "axios";
import {common} from "../../podo/utils";


export default function SignIn() {
    const [email, setEmailLocal] = useState(useSelector(selectEmail));
    const [pass, setPass] = useState('');


    let history = useNavigate();
    const dispatch = useDispatch();

    async function handleSignIn(event) {
        event.preventDefault();
        event.stopPropagation();

        dispatch(setEmail(email))
        dispatch(setLoading(true))
        let successObj = await SignInHost(email, pass);
        console.log(successObj)
        dispatch(setLoading(false));
        if (successObj.success) {
            dispatch(getEvents());
            history('/');
        } else {
            dispatch(setErrorBlock({
                show: true,
                message: successObj.message
            }))

        }


    }

    async function resetPass() {
        if (email === '' || email === undefined) {
            dispatch(setErrorBlock({
                show: true,
                message: 'Enter your email'
            }))


        } else {
            const res = await axios.post(`${common.baseUrl}api/v1/auth/reset-password`, {
                email: email
            }).catch(
                (reason) => {
                    console.log(reason);
                    dispatch(setErrorBlock({
                        show: true,
                        message: reason.response.data.msg
                    }))
                }
            );
            if (res !== undefined) {
                if (res.status === 200) {
                    dispatch(setEmail(email));
                    history('/update-pass')
                }
            }
        }
    }

    return (<Container className='mt-3' style={{}}>
        <Form onSubmit={handleSignIn}>
            <FormGroup>
                <FormLabel htmlFor="email1" className="mt-0">Email address</FormLabel>
                <FormControl autoComplete={'username'} required type={'email'} className={'form-control-login'} id={'email1'}
                             placeholder={'Enter Email'} onChange={(e) => setEmailLocal(e.target.value)}/>
                <FormText id="emailHelp" className="text-primary">We'll never share your email
                    with anyone else.</FormText>
            </FormGroup>
            <FormGroup>
                <FormLabel htmlFor="password1" className="mt-3">Password</FormLabel>
                <FormControl autoComplete={'current-password'} required type="password" className={'form-control-login'} id="password1"
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