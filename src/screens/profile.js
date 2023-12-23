import {Button, Col, Container, Row} from "react-bootstrap";
import {faker} from "@faker-js/faker";
import {IoLogoTiktok} from "react-icons/io5";
import {AiOutlineFacebook, AiOutlineInstagram, AiOutlineTwitter} from "react-icons/ai";
import {getRandomInt} from "../podo/utils";
import {RxDividerVertical} from "react-icons/rx";


export default function Profile() {
    let profile = {
        name: faker.person.fullName(),
        companyName: faker.company.buzzNoun(),
        dateJoined: faker.date.past({years: 1}),
        cover: faker.image.urlLoremFlickr({category: 'colorful'}),
        email: faker.internet.email(),
        followers: getRandomInt(2000),
        totalEvents: getRandomInt(50),
        description: faker.lorem.sentences(5)
    }

    return (<Container fluid className={'mt-5'}>
        <div className={'rounded-4'} style={{
            backgroundImage: `url("${profile.cover}")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: 'cover',

        }}>
            <div className={'rounded-4'}>
                <Container fluid className={'rounded-4 bg-blur px-0'} style={{
                     backgroundColor: 'hsla(244, 88%, 63%,0.6)'
                }}>
                    <Row className={'py-4 py-md-3 px-2 rounded-4 gy-2 m-0'} style={{
                        backgroundColor: 'hsla(0, 0%, 100%,0.7)'
                    }}>
                        <Col className={'mt-0'} md={'3'}>
                            <img className={'w-100 object-fit-cover rounded-4 ar-square'}
                                 src={faker.image.avatar()} alt={'avatar'}/>
                        </Col>
                        <Col md={''} className={'py-md-3 mt-0'}>
                           <div><h5 className={'fw-bold text-dark'}>{profile.companyName}</h5>
                               <p className={'fw-bold text-danger-emphasis'}>{profile.name}</p></div>
                            <span className={'d-flex flex-row'}>
                                <Button className={'ps-0'} variant={'link'}><AiOutlineTwitter size={30}/></Button>
                                <Button variant={'link'}><AiOutlineInstagram size={30}/></Button>
                                <Button variant={'link'}><AiOutlineFacebook size={30}/></Button>
                                <Button variant={'link'}><IoLogoTiktok size={30}/></Button>
                            </span>
                        </Col>
                        <Col className={'mt-0'}>
                            <p className={'text-dark limitLines'}>{profile.description}</p>
                            <span className={'d-flex flex-row flex-fill justify-content-between'}>
                                <h6 className={'text-dark'}>{profile.followers} <small className={'text-body-secondary'}>Followers</small></h6>
                                <RxDividerVertical size={30}/>
                                <h6 className={'text-dark'}>{profile.totalEvents} <small className={'text-body-secondary'}>Events</small></h6>
                            </span>
                        </Col>
                        <Col md={'auto'} className={'mt-0'}>
                            <Button variant={'outline-primary'}>Edit Profile</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
        <Container fluid className={'py-3 px-0'}>
            <Row>
                <Col>
                    <Container className={'rounded-4 bg-body-tertiary py-3'}>
                        <h6 className={'fw-bold'}>Platform Settings</h6>
                    </Container>
                </Col>
                <Col>
                    <Container className={'rounded-4 bg-body-tertiary py-3'}>
                        <h6 className={'fw-bold'}>Profile information </h6>
                    </Container>
                </Col>
                {/*<Col>*/}
                {/*    <Container className={'rounded-4 bg-body-tertiary py-3'}>*/}
                {/*        <h6 className={'fw-bold'}>Conversation </h6>*/}
                {/*    </Container>*/}
                {/*</Col>*/}
            </Row>
        </Container>
    </Container>)
}