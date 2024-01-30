import {Button, Col, Container, Form, FormControl, FormGroup, FormLabel, Row} from "react-bootstrap";
import {faker} from "@faker-js/faker";
import {IoLogoTiktok} from "react-icons/io5";
import {AiOutlineFacebook, AiOutlineInstagram, AiOutlineTwitter} from "react-icons/ai";
import {getRandomInt, serviceCountries} from "../podo/utils";
import {RxDividerVertical} from "react-icons/rx";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {selectDashboardStats} from "../podo/DashboardSlice";
import {requestCode} from "./login/LoginSlice";
import {useNavigate} from "react-router-dom";

function PublicInfo(){
    let profile = JSON.parse(localStorage.getItem('user'))
    return (<Form className={'mt-3'}>
        <Form.Group className={'mt-3'}>
            <Form.Label>Organization</Form.Label>
            <Form.Control className={'form-control-custom'} placeholder={'Organization name'}/>
        </Form.Group>
        <Form.Group className={'mt-3'}>
            <Form.Label>Avatar</Form.Label>
           <div className={'border-1 border d-flex flex-row rounded-3'}>
               <img src={profile.image} alt={'current'} className={'border-1 border'} height={100}/>
               <div className={'justify-content-center d-flex flex-column ps-3'}>
                   <p className={'mb-0 text-body-secondary'}>JPG, GIF or PNG. Max size of 700KB</p>
                   <div className={'d-flex flex-row'}>
                        <Button variant={'link'}>Update Photo</Button>
                        <Button variant={'link'}>Delete Photo</Button>
                    </div>
               </div>
           </div>
        </Form.Group>
        <Form.Group className={'mt-3'}>
            <Form.Label>About</Form.Label>
            <Form.Control as={'textarea'} rows={5} className={'form-control-custom'} placeholder={'Short description about your organization'}/>
        </Form.Group>

        <p className={'fw-semibold text-body-secondary mt-4 mb-0'}>Links to your social media</p>
        <Form.Group className={'mt-1'}>
            <Form.Label>Twitter handle</Form.Label>
            <Form.Control className={'form-control-custom'} placeholder={'username'}/>
        </Form.Group>
        <Form.Group className={'mt-3'}>
            <Form.Label>Instagram profile</Form.Label>
            <Form.Control  className={'form-control-custom'} placeholder={'username'}/>
        </Form.Group>
        <Form.Group className={'mt-3'}>
            <Form.Label>Facebook profile</Form.Label>
            <Form.Control  className={'form-control-custom'} placeholder={'username'}/>
        </Form.Group>
        <Form.Group className={'mt-3'}>
            <Form.Label>Tiktok profile:</Form.Label>
            <Form.Control className={'form-control-custom'} placeholder={'username'}/>
        </Form.Group>
        <Form.Group className={'mt-3'}>
            <Button variant={'primary'} type={'submit'}>Confirm</Button>
        </Form.Group>
    </Form>)
}

function PrivateInfo() {
    let profile = JSON.parse(localStorage.getItem('user'))
    const service= serviceCountries();
    const [email, setEmail] = useState(profile.email);
    const [fName, setFName] = useState(profile.firstName);
    const [lName, setLName] = useState(profile.lastName);
    const [country, setCountry] = useState(profile.country);
    const [countryIndex, setCountryIndex] = useState(service.findLastIndex((value) => value.name === country));
    const [gender, setGender] = useState(profile.gender)
    let history = useNavigate();
    useEffect(() => setCountry(service.at(countryIndex)), [countryIndex])
    async function handleChangePassword() {
        await requestCode(profile.email);
        history('/update-pass')
    }
    return (<Form className={'mt-3'}>
        <FormGroup>
            <Row>
                <Col>
                    <FormLabel className="mt-3">First Name</FormLabel>
                    <FormControl value={fName} required className={'form-control-custom'} id='firstNameId'
                                 placeholder='First Name'
                                 onChange={(e) => setFName(e.target.value)}/>

                </Col>
                <Col>
                    <FormLabel className="mt-3">Last Name</FormLabel>
                    <FormControl value={lName} required className={'form-control-custom'} id='lastNameId'
                                 placeholder='Last Name'
                                 onChange={(e) => setLName(e.target.value)}/>
                </Col>
            </Row>
        </FormGroup>

        <FormGroup>
            <FormLabel htmlFor="exampleInputEmail1" className="mt-3">Email address</FormLabel>
            <FormControl value={email} autoComplete={'username'} required type={'email'} className={'form-control-custom'} id={'Email1'}
                         placeholder={'Enter Email'} onChange={(e) => setEmail(e.target.value)}/>
        </FormGroup>
        <FormGroup className={'mt-3'}>
            <FormLabel htmlFor={''}>Gender</FormLabel>
            <FormControl value={gender} autoComplete={'gender'} className={'form-control-custom'} id={'gender'} placeholder={'Gender'}
                         onChange={(e) => setGender(e.target.value)}/>
        </FormGroup>
        <FormGroup className={'mt-3'}>
            <FormLabel htmlFor={''}>Country</FormLabel>
            <Form.Select value={countryIndex} onChange={(e) => {setCountryIndex(e.target.value); console.log(e.target)}}>
                {service.map((_serve, index) => (<option value={index}>{_serve.name}</option>))}
            </Form.Select>
        </FormGroup>
        <FormGroup className={'mt-3'}>
            <Button onClick={handleChangePassword.bind(this)} variant={'primary'} type={'button'}>Change Password</Button>
        </FormGroup>
       <FormGroup className={'mt-3'}>
           <Button variant={'primary'} type={'submit'}>Confirm</Button>
       </FormGroup>
    </Form>)
}

export default function Profile() {
    const [profile,setProfile] = useState({
        id: getRandomInt(300),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        image: faker.image.avatar(),
        companyName: faker.company.buzzNoun(),
        dateJoined: faker.date.past({years: 1}),
        cover: faker.image.urlLoremFlickr({category: 'colorful'}),
        email: faker.internet.email(),
        description: faker.lorem.sentences(5)
    })
    const stats = useSelector(selectDashboardStats)
    useEffect(() => {
            let prof = JSON.parse(localStorage.getItem('user'))

            setProfile({
                companyName: faker.company.buzzNoun(),

                description: faker.lorem.sentences(5),
                ...prof
            })
    },[])

    return (<Container fluid className={'py-3'}>
        <div className={'rounded-4 bg-body-tertiary'}>
            <Container fluid className={'rounded-4 px-0'}>
                <Row className={'py-4 py-md-3 px-2 rounded-4 gy-2 m-0 h-100'}>
                    <Col className={'mt-0 py-2'} md={'3'}>
                        <img className={'w-100 object-fit-cover rounded-4 ar-square bg-dark'}
                             src={profile.image} alt={'avatar'}/>
                    </Col>
                    <Col md={''} className={'py-md-3 mt-0 justify-content-between d-flex flex-column'}>
                        <div><h5 className={'fw-bold text-dark'}>{profile.companyName}</h5>
                            <p className={'fw-bold text-primary-emphasis mb-0'}>{profile.firstName + ' ' + profile.lastName}</p>
                            <p className={'text-primary-emphasis'}>{profile.email}</p>
                        </div>
                        <span className={'d-flex flex-row'}>
                                <Button className={'ps-0'} variant={'link'}><AiOutlineTwitter size={30}/></Button>
                                <Button variant={'link'}><AiOutlineInstagram size={30}/></Button>
                                <Button variant={'link'}><AiOutlineFacebook size={30}/></Button>
                                <Button variant={'link'}><IoLogoTiktok size={30}/></Button>
                            </span>
                        <div className={'mt-auto mt-sm-3'}>
                                <span className={'d-flex flex-row flex-fill justify-content-between'}>
                                <h6 className={'text-dark'}>{stats.followers} <small className={'text-body-secondary'}>Followers</small></h6>
                                <RxDividerVertical size={30}/>
                                <h6 className={'text-dark'}>{stats.events} <small className={'text-body-secondary'}>Events</small></h6>
                            </span>
                        </div>

                    </Col>
                    <Col className={'mt-0'}>
                        <h6>About</h6>
                        <p className={'text-dark '}>{profile.description}</p>
                    </Col>
                </Row>
            </Container>
        </div>
        <Container fluid className={'py-3 px-0'}>
            <Row className={'gy-3'}>
                <Col>
                    <Container className={'rounded-4 bg-body-tertiary p-3'}>
                        <h6 className={'fw-bold'}>Public Info</h6>
                        <small>This information will be publicly displayed and visible for all users.</small>
                        <PublicInfo/>
                    </Container>
                </Col>
                <Col>
                    <Container className={'rounded-4 bg-body-tertiary p-3'}>
                        <h6 className={'fw-bold'}>Profile Information </h6>
                        <PrivateInfo/>
                    </Container>
                </Col>
            </Row>
        </Container>
    </Container>)
}