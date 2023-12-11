import React, {useEffect, useState} from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import {LineChart} from "../components/trendChart";
import Poster from "../components/poster";
import {Events} from "../podo/events";
import {IoCardOutline, IoCartOutline, IoPeople, IoTicket} from "react-icons/io5";
import {LinkContainer} from "react-router-bootstrap";
import LoadingScreen from "../components/LoadingScreen";

export function HomeScreenItem({title, subtitle, icon}) {

    return (<Container fluid className={'rounded-3 bg-body-tertiary p-3 d-lg-flex h-100'}>
        <div className={'rounded-3 bg-primary p-3 me-2 text-white ar-square h-100 text-center desktopOnly'}>
            {icon}
        </div>
        <div className={'rounded-3 bg-primary p-3 me-1 text-white ar-square text-center mobileOnly'}>
            {icon}
        </div>
        <div>
            <h6><small className={'text-body-secondary fw-bold'}>{title}</small></h6>
            <p className={'m-0 fw-bold'}>{subtitle}</p>
        </div>
    </Container>)
}

export default function HomeScreen() {
    const [events, setEvents] = useState(null);
    useEffect(() => {
        setEvents(Events())

    }, [])
    if (events === null) {
        return (<LoadingScreen className={'h-100'}/>)
    } else return (<Container fluid className={''}>
        <Row>
            <Col md={'9'} className={'mt-3'}>
                <Container fluid className={'rounded-4 bg-body-tertiary p-lg-3 p-sm-0 h-100  overflow-hidden'}>
                    <h2 className={'text-primary'}>Earnings</h2>
                    <div className={'h-100'}><LineChart/></div>
                </Container>
            </Col>
            <Col lg={'3'} className={'mt-3'}>
                <Container fluid className={'p-0 h-100'}>
                    <Row lg={'1'} md={'2'} className={'gy-3 h-100  justify-content-around'}>
                        <Col className={'d-lg-flex'}><HomeScreenItem title={'Your Balance'}
                                                                     subtitle={'$15,000'}
                                                                     icon={<IoCardOutline
                                                                         className={'h-100 w-100'}/>}/></Col>
                        <Col className={'d-lg-flex'}><HomeScreenItem title={'Today\'s Sales'}
                                                                     subtitle={'$2,000'}
                                                                     icon={<IoCartOutline
                                                                         className={'h-100 w-100'}/>}/></Col>
                        <Col className={'d-lg-flex'}><HomeScreenItem title={'Tickets Sold'}
                                                                     subtitle={'147'}
                                                                     icon={<IoTicket
                                                                         className={'h-100 w-100'}/>}/>
                        </Col>
                        <Col className={'d-lg-flex'}> <HomeScreenItem title={'Visitors'}
                                                                      subtitle={'312'}
                                                                      icon={<IoPeople
                                                                          className={'h-100 w-100'}/>}/>
                        </Col>

                    </Row>
                </Container>

            </Col>
        </Row>

        <Container fluid className={' my-3 py-3 bg-body rounded-4 text-primary'}>
            <div className={'d-flex flex-row justify-content-between px-2 mb-3'}>
                <h2>Your Events</h2>
                <LinkContainer to={'/events/new'}>
                    <Button variant={'outline-primary'}>Create New</Button>
                </LinkContainer>

            </div>
            <Row className={'gy-3'}>
                {events.map((event, index) => (<Col key={index} md={'4'}><Poster eventDetails={event}/></Col>))}
            </Row>
        </Container>

    </Container>)
}