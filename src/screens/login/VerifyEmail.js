import {Button, Container, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import React, {useState} from "react";
import {LoginError} from "./index";


export default function VerifyEmail() {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [show, setShow] = useState(false);
    const [errorMessage, setErrorMessage] = useState('0');

    return (<Container>
        <LoginError show={show} setShow={setShow} errorMessage={errorMessage}/>
        <Form>
            <FormGroup>
                <FormLabel htmlFor="email1" className="mt-0">Email address</FormLabel>
                <FormControl type={'email'} value={email} className={'form-control-login'} id={'email1'}
                             placeholder={'Enter Email'} onChange={(e) => setEmail(e.target.value)}/>
            </FormGroup>
            <FormGroup>
                <FormLabel htmlFor="codeInput" className="mt-3">Password</FormLabel>
                <FormControl className={'form-control-login'} id="codeInput"
                             placeholder="4 digit code" onChange={(e) => setCode(e.target.value)}/>
            </FormGroup>
            <FormGroup className={'mt-4'}>
                <Button className={'w-100'} variant={'primary'}>Confirm</Button>
            </FormGroup>
        </Form>
    </Container>)
}