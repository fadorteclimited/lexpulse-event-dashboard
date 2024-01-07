import React, {useEffect, useState} from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import {LineChart} from "../components/trendChart";
import Poster from "../components/poster";
import {getEvents} from "../podo/events";
import {IoCardOutline, IoCartOutline, IoPeople, IoTicket} from "react-icons/io5";
import {LinkContainer} from "react-router-bootstrap";
import LoadingScreen from "../components/LoadingScreen";

export function HomeScreenItem({title, subtitle, icon}) {

    return (<Container fluid className={'rounded-3 bg-body-tertiary p-3 d-flex flex-row justify-content-between h-100'}>
        <div>
            <h6><small className={'text-body-secondary fw-bold'}>{title}</small></h6>
            <p className={'m-0 fw-bold'}>{subtitle}</p>
        </div>
        <div className={'rounded-3 bg-primary   p-3 ms-auto text-white ar-square h-100 text-center'}>
            {icon}
        </div>

    </Container>)
}

export default function HomeScreen() {
    const [events, setEvents] = useState(null);
    useEffect(() => {
        getEvents().then((successObj) => {
            if (successObj.success){
                setEvents(successObj.data)
            }
        })
    }, [])
    if (events === null) {
        return (<LoadingScreen className={'h-100'}/>)
    } else return (<Container fluid className={''}>
        <Container fluid className={'mt-3'}>
            <Row lg={'4'} md={'2'} sm={'1'} xs={'1'} className={'gy-3 h-100 justify-content-around'}>
                <Col className={'d-flex'}><HomeScreenItem title={'Your Balance'}
                                                             subtitle={'$15,000'}
                                                             icon={<IoCardOutline
                                                                 className={'h-100 w-100'}/>}/></Col>
                <Col className={'d-flex'}><HomeScreenItem title={'Today\'s Sales'}
                                                             subtitle={'$2,000'}
                                                             icon={<IoCartOutline
                                                                 className={'h-100 w-100'}/>}/></Col>
                <Col className={'d-flex'}><HomeScreenItem title={'Tickets Sold'}
                                                             subtitle={'147'}
                                                             icon={<IoTicket
                                                                 className={'h-100 w-100'}/>}/>
                </Col>
                <Col className={'d-flex'}> <HomeScreenItem title={'Visitors'}
                                                              subtitle={'312'}
                                                              icon={<IoPeople size={25}
                                                                  className={'h-100 w-100 '}/>}/>
                </Col>

            </Row>
        </Container>

        <Container fluid className={'mt-3 rounded-4 bg-body-tertiary p-md-3 p-sm-0 h-100'}>
            <h4 className={'text-primary'}>Earnings</h4>
            <div className={'ar-chart'}><LineChart/></div>
        </Container>


        <Container fluid className={' my-3 py-3 bg-body rounded-4 text-primary'}>
            <div className={'d-flex flex-row justify-content-between px-2 mb-3'}>
                <h4>Your Events</h4>
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