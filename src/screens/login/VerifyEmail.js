import {Button, Container, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import React, {useState} from "react";
import {LoginError} from "./index";
import axios from "axios";
import {common} from "../../podo/utils";
import {useNavigate} from "react-router-dom";


export default function VerifyEmail() {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [show, setShow] = useState(false);
    const [errorMessage, setErrorMessage] = useState('0');
    let history = useNavigate();

    async function confirmCode (){
        const res = await axios.post(`${common.baseUrl}api/v1/auth/confirm-code`,{
            email: email,
            code: code,
        }).catch(
            (reason) =>{
                console.log(reason);
                setErrorMessage(reason.response.data.msg);
                setShow(true);
            }
        );
        if (res !== undefined){
            if (res.status === 200){
                history('/login')
            }
        }
    }
    return (<Container>
        <LoginError show={show} setShow={setShow} errorMessage={errorMessage}/>
        <Form onSubmit={confirmCode.bind(this)}>
            <FormGroup>
                <FormLabel htmlFor="email1" className="mt-0">Email address</FormLabel>
                <FormControl required type={'email'} value={email} className={'form-control-login'} id={'email1'}
                             placeholder={'Enter Email'} onChange={(e) => setEmail(e.target.value)}/>
            </FormGroup>
            <FormGroup>
                <FormLabel htmlFor="codeInput" className="mt-3">Password</FormLabel>
                <FormControl required className={'form-control-login'} id="codeInput"
                             placeholder="4 digit code" onChange={(e) => setCode(e.target.value)}/>
            </FormGroup>
            <FormGroup className={'mt-4'}>
                <Button type={'submit'} className={'w-100'} variant={'primary'}>Confirm</Button>
            </FormGroup>
        </Form>
    </Container>)
}