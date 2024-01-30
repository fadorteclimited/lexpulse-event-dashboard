import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {requestCode, selectEmail, setErrorBlock} from "./LoginSlice";
import {Button, Container, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {common} from "../../podo/utils";


export default function ChangePassword() {
    const email = useSelector(selectEmail);
    const [pass, setPass] = useState('');
    const [pass2, setPass2] = useState('');
    const [code, setCode] = useState('');
    let history = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (email === '' || email === undefined){
            history('/login')
        }
    })

    async function updatePass(event){
        event.preventDefault();
        event.stopPropagation();
       const res = await axios.post(`${common.baseUrl}api/v1/auth/change-password`,{
           email: email,
           code: code,
           password: pass,
            confirmPassword: pass2
    }).catch(
           (reason) =>{
               console.log(reason);
               dispatch(setErrorBlock({
                   show: true,
                   message: reason.response.data.msg
               }))
           }
       );
        if (res !== undefined){
            if (res.status === 200){
                history('/login')
            }
        }
    }

    return (<Container>

        <Form onSubmit={updatePass}>
            <FormGroup>
                <FormLabel htmlFor="email1" className="mt-0">Email address</FormLabel>
                <FormControl type={'email'} value={email} readOnly plaintext className={'form-control-login'} id={'email1'}/>
            </FormGroup>
            <FormGroup>
                <FormLabel htmlFor="codeInput" className="mt-3">Password</FormLabel>
                <FormControl required className={'form-control-login'} id="codeInput"
                             placeholder="4 digit code" onChange={(e) => setCode(e.target.value)}/>
            </FormGroup>
            <FormGroup>
                <FormLabel htmlFor="passId" className="mt-3">Password</FormLabel>
                <FormControl required type="password" className={'form-control-login'} id="passId"
                             placeholder="Password" onChange={(e) => setPass(e.target.value)}/>
            </FormGroup>
            <FormGroup>
                <FormLabel htmlFor="passId2" className="mt-3">Confirm Password</FormLabel>
                <FormControl required type="password" className={'form-control-login'} id="passId2"
                             placeholder="Password" onChange={(e) => setPass2(e.target.value)}/>
            </FormGroup>
            <FormGroup className={'mt-4'}>
                <Button type={'submit'} variant={'primary'}>Confirm</Button>
                <Button type={'button'} className={'ms-2'} variant={'outline-primary'} onClick={requestCode.bind(this,email)}>Request Code</Button>
            </FormGroup>
        </Form>
    </Container>)
}