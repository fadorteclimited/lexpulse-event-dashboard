import axios from "axios";
import {common, createFile, getCountry} from "./utils";
import Logo from '../assets/logo.png'
import {redirect} from "react-router-dom";


export async function signUpHost({firstName, lastName, email, pass}){
    const country = await getCountry();
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    const image = await createFile(Logo);
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("country", country);
    formData.append("gender", "Unset");
    formData.append("password", pass);
    formData.append("userType", "host");
    formData.append("image", image, "profile.jpg");
    let successObj;
    const res = await axios.post(`${common.baseUrl}api/v1/users`, formData, config).catch((e) => {
        successObj = {
            success: false,
            status: e.response.status,
            message: e.response.data.msg,
        }
    })
    if (res !== undefined){
        if (res.status === 200){

            successObj = await SignInHost(email, pass);
        }
    }

    return successObj;
}

export async function SignInHost(email, pass){

    const raw = JSON.stringify({
        email: email,
        password: pass,
    });
    const config = {
        headers: {
            'content-type': 'application/json'
        },
        data: raw
    }
    let successObj;
    const res = await axios.post(`${common.baseUrl}api/v1/auth`, raw, config).catch((e) => {

        successObj = {
            success: false,
            status: e.response.status,
            message: e.response.data.msg,
        }
    })

    if (res !== undefined){
        if (res.status === 200){
            localStorage.setItem('token',res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            successObj = {
                success: true,
                status: res.status,
                data: res.data,
            }
        }
    }

    return successObj;
}

export async function getUserApi(id) {
    try {
        const token = localStorage.getItem('token');


        const config = {
            headers: {
                authorization: `Bearer ${token}`
            },

        }
        let res = await axios.get(`${common.baseUrl}api/v1/users/${id}`, config)
        console.log(res)
        return res.data.data.user
    } catch (error) {
        console.log(error)
        if (error.response.status === 403){
            localStorage.clear();
            redirect('/login');
        }

    }
}

