import {Button, Col, Container, Form, FormControl, FormGroup, FormLabel, FormText, Row} from "react-bootstrap";
import {faker} from "@faker-js/faker";
import {IoLogoTiktok} from "react-icons/io5";
import {AiOutlineCalendar, AiOutlineFacebook, AiOutlineInstagram, AiOutlineTwitter} from "react-icons/ai";
import {getRandomInt, serviceCountries} from "../podo/utils";
import {RxDividerVertical} from "react-icons/rx";
import React, {useEffect, useState} from "react";
import {LinkContainer} from "react-router-bootstrap";

function PublicInfo(){
    const profile = {
        id: getRandomInt(300),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        image: faker.image.avatar(),
        companyName: faker.company.buzzNoun(),
        dateJoined: faker.date.past({years: 1}),
        cover: faker.image.urlLoremFlickr({category: 'colorful'}),
        email: faker.internet.email(),
        followers: getRandomInt(2000),
        totalEvents: getRandomInt(50),
        description: faker.lorem.sentences(5)
    }
    return (<Form className={'mt-3'}>
        <Form.Group className={'mt-3'}>
            <Form.Label>Organization</Form.Label>
            <Form.Control className={'form-control-login '} placeholder={'Organization name'}/>
        </Form.Group>
        <Form.Group className={'mt-3'}>
            <Form.Label>Avatar</Form.Label>
           <div className={'border-1 border d-flex flex-row rounded-3'}>
               <img src={profile.image} alt={'current'} height={100}/>
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
            <Form.Control as={'textarea'} rows={5} className={'form-control-login'} placeholder={'Short description about your organization'}/>
        </Form.Group>

        <p className={'fw-semibold text-body-secondary mt-4 mb-0'}>Links to your social media</p>
        <Form.Group className={'mt-1'}>
            <Form.Label>Twitter handle</Form.Label>
            <Form.Control className={'form-control-login'} placeholder={'username'}/>
        </Form.Group>
        <Form.Group className={'mt-3'}>
            <Form.Label>Instagram profile</Form.Label>
            <Form.Control  className={'form-control-login'} placeholder={'username'}/>
        </Form.Group>
        <Form.Group className={'mt-3'}>
            <Form.Label>Facebook profile</Form.Label>
            <Form.Control  className={'form-control-login'} placeholder={'username'}/>
        </Form.Group>
        <Form.Group className={'mt-3'}>
            <Form.Label>Tiktok profile:</Form.Label>
            <Form.Control className={'form-control-login'} placeholder={'username'}/>
        </Form.Group>
        <Form.Group className={'mt-3'}>
            <Button variant={'primary'} type={'submit'}>Confirm</Button>
        </Form.Group>
    </Form>)
}

function PrivateInfo() {
    const service= serviceCountries();
    const [email, setEmail] = useState('');
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [country, setCountry] = useState('');
    const [countryIndex, setCountryIndex] = useState(0);
    const [gender, setGender] = useState('')
    return (<Form className={'mt-3'}>
        <FormGroup>
            <Row>
                <Col>
                    <FormLabel className="mt-3">First Name</FormLabel>
                    <FormControl required className={'form-control-login'} id='firstNameId'
                                 placeholder='First Name'
                                 onChange={(e) => setFName(e.target.value)}/>

                </Col>
                <Col>
                    <FormLabel className="mt-3">Last Name</FormLabel>
                    <FormControl required className={'form-control-login'} id='lastNameId'
                                 placeholder='Last Name'
                                 onChange={(e) => setLName(e.target.value)}/>
                </Col>
            </Row>
        </FormGroup>

        <FormGroup>
            <FormLabel htmlFor="exampleInputEmail1" className="mt-3">Email address</FormLabel>
            <FormControl autoComplete={'username'} required type={'email'} className={'form-control-login'} id={'Email1'}
                         placeholder={'Enter Email'} onChange={(e) => setEmail(e.target.value)}/>
        </FormGroup>
        <FormGroup className={'mt-3'}>
            <FormLabel htmlFor={''}>Gender</FormLabel>
            <FormControl autoComplete={'gender'} className={'form-control-login'} id={'gender'} placeholder={'Gender'}
                         onChange={(e) => setGender(e.target.value)}/>
        </FormGroup>
        <FormGroup className={'mt-3'}>
            <FormLabel htmlFor={''}>Country</FormLabel>
            <Form.Select value={countryIndex} onChange={(e) => {setCountryIndex(e.target.value); console.log(e.target)}}>
                {service.map((_serve, index) => (<option value={index}>{_serve.name}</option>))}
            </Form.Select>
        </FormGroup>
        <FormGroup className={'mt-3'}>
            <Button variant={'primary'} type={'button'}>Change Password</Button>
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
        followers: getRandomInt(2000),
        totalEvents: getRandomInt(50),
        description: faker.lorem.sentences(5)
    })

    useEffect(() => {
            let prof = JSON.parse(localStorage.getItem('user'))
            setProfile({
                companyName: faker.company.buzzNoun(),
                dateJoined: faker.date.past({years: 1}),
                cover: faker.image.urlLoremFlickr({category: 'colorful'}),
                email: faker.internet.email(),
                followers: getRandomInt(2000),
                totalEvents: getRandomInt(50),
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
                                <h6 className={'text-dark'}>{profile.followers} <small className={'text-body-secondary'}>Followers</small></h6>
                                <RxDividerVertical size={30}/>
                                <h6 className={'text-dark'}>{profile.totalEvents} <small className={'text-body-secondary'}>Events</small></h6>
                                    <RxDividerVertical size={30}/>
                                    <h6 className={'text-dark'}><AiOutlineCalendar size={19}/> 6 <small className={'text-body-secondary'}>months</small></h6>
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