import React, {useEffect, useState} from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import TrendChart from "../components/trendChart";
import Poster from "../components/poster";
import {Events} from "../podo/events";
import {IoCardOutline, IoCartOutline} from "react-icons/io5";

export function HomeScreenItem({title, subtitle, icon}) {
    return (<Container fluid className={'rounded-3 bg-body-tertiary p-3 d-flex justify-content-between'}>
        <div className={'rounded-3 bg-primary p-3 me-1 text-white ar-square h-100 text-center'}>
            {icon}
        </div>
        <div>
            <h5><small className={'text-body-secondary fw-bold'}>{title}</small></h5>
            <p className={'m-0 fw-bolder'}>{subtitle}</p>
        </div>
    </Container>)
}

export default function HomeScreen() {
    const [events, setEvents] = useState(Events);
    useEffect(() => {
        setEvents(Events())

    }, [])
    return (<Container fluid className={'py-3'}>
        <Row>
            <Col md={'9'} className={''}>
                <Container fluid className={'rounded-4 bg-body-tertiary p-3  overflow-hidden '}>
                    <h2>Earnings</h2>
                    <div style={{
                        height: '300px'
                    }}><TrendChart/></div>
                </Container>
            </Col>
            <Col md={'3'} className={'justify-content-around d-flex flex-column'}>
                <HomeScreenItem title={'Your Balance'} subtitle={'$15,000'}
                                icon={<IoCardOutline className={'h-100 w-100'}/>}/>

                <HomeScreenItem title={'Today\'s Sales'} subtitle={'$2,000'}
                                icon={<IoCartOutline className={'h-100 w-100'}/>}/>

            </Col>
        </Row>

        <Container fluid className={' my-3 py-3 bg-body rounded-4 text-primary'}>
            <div className={'d-flex flex-row justify-content-between px-2 mb-3'}>
                <h2>Your Events</h2>
                <Button variant={'outline-primary'}>Create New Event</Button>
            </div>
            <Row className={'gy-3'}>
                {events.map((event) => (<Col md={'4'}><Poster eventDetails={event}/></Col>))}
            </Row>
        </Container>
    </Container>)
}