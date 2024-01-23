import {useDispatch, useSelector} from "react-redux";
import {resetErrorBlock, selectErrorBlock} from "../screens/login/LoginSlice";
import SweetAlert from "react-bootstrap-sweetalert";
import {Button} from "react-bootstrap";
import React from "react";

export default function ErrorDisplay(){
    const dispatch = useDispatch();
    const errorBlock = useSelector(selectErrorBlock)

    return (<SweetAlert customClass={'bg-dark text-light rounded-4'} type={'danger'}
                        onConfirm={dispatch.bind(this, resetErrorBlock())}
                        title={'an Error Occurred'}

                        show={errorBlock.show}
                        custom={true}
                        customButtons={<Button variant={'outline-primary'} onClick={dispatch.bind(this,resetErrorBlock())}>Close</Button> }>{errorBlock.message}</SweetAlert>)
}