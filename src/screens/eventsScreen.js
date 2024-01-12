import {Button, Col, Container, Dropdown, DropdownButton, Row} from "react-bootstrap";
import Poster from "../components/poster";
import React from "react";

import {LinkContainer} from "react-router-bootstrap";
import LoadingScreen from "../components/LoadingScreen";
import {useSelector} from "react-redux";
import {selectEvents, selectLoadingState} from "../podo/EventsSlice";



export default function EventsScreen() {

    const events = useSelector(selectEvents)

    if (useSelector(selectLoadingState)) {
        return (<LoadingScreen className={'h-100'}/>)
    } else
        return (<Container fluid className={'py-3 h-100'}>
        <div className={'d-flex flex-row justify-content-between mb-3'}>
            <h4 className={'text-primary'}>Events</h4>
            <div className={'d-flex'}>
            <DropdownButton title={'Sort'} variant={'outline-primary'} >
                <Dropdown.Item onClick={() => console.log(events)}>Name</Dropdown.Item>
                <Dropdown.Item>Price</Dropdown.Item>
                <Dropdown.Item>Date</Dropdown.Item>
            </DropdownButton>
                <LinkContainer to={'/events/new'}>
                    <Button variant={'outline-primary'} className={'ms-2'}>Create</Button>
                </LinkContainer>
            </div>
        </div>
            {(events.length === 0)? <div className={'text-center mt-5 verticalCenter h-75 top-50'}>
               <div >
                   <h6>Get Started and create your first event</h6>
                   <LinkContainer to={'/events/new'}>
                       <Button variant={'outline-primary'} className={'ms-2'}>Create</Button>
                   </LinkContainer>
               </div>
            </div>: <Row className={'gy-3'}>
                {events.map((event, index) => (<Col key={index}  md={'4'}><Poster eventDetails={event}/></Col>))}
            </Row>}

    </Container>)
}