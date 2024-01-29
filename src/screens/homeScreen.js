import React, {useEffect, useState} from "react";
import {Badge, Button, Col, Container, Image, Row} from "react-bootstrap";
import {LineChart} from "../components/trendChart";
import Poster from "../components/poster";
import {IoCardOutline, IoCartOutline, IoPeople, IoTicket} from "react-icons/io5";
import {LinkContainer} from "react-router-bootstrap";
import LoadingScreen from "../components/LoadingScreen";
import {useDispatch, useSelector} from "react-redux";
import {selectEvents, selectLoadingState} from "../podo/EventsSlice";
import {getRandomInt} from "../podo/utils";
import {IoIosCash} from "react-icons/io";
import {getDashboardItems, selectDashboardStats} from "../podo/DashboardSlice";

export function HomeScreenItem({title, subtitle, icon, bg='primary'}) {

    return (<Container fluid className={'rounded-3 bg-body p-3 d-flex flex-row justify-content-between h-100'}>
        <div>
            <h6><small className={'text-body-secondary fw-bold'}>{title}</small></h6>
            <p className={'m-0 fw-bold'}>{subtitle}</p>
        </div>
        <div className={`rounded-3 bg-${bg}  p-3 ms-auto text-white ar-square h-100 text-center`}>
            {icon}
        </div>

    </Container>)
}

export default function HomeScreen() {

    const events = useSelector(selectEvents)


    if (useSelector(selectLoadingState)){
        return (<LoadingScreen className={'h-100'}/>)
    } else return (<Container fluid className={''}>
        <Container fluid className={'mt-3 px-0'}>

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
        <Container fluid className={'mt-3 rounded-4 bg-body py-3 px-md-3 px-sm-0 h-100'}>
            <h4 className={'text-primary'}>Earnings</h4>
            <div className={'ar-chart'}><LineChart/></div>
        </Container>

        {(events.length >= 1)? <div>
            <FeaturedEvent eventDetails={events.at(0)}/>
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
        </div> : <Container fluid className={' my-3 py-3 bg-body rounded-4'}>
            <div className={'d-flex flex-row justify-content-between px-2 mb-3'}>
                <h4 className={'text-primary'}>Your Events</h4>


            </div>
           <div className={'text-center my-5 py-5'}>
               <h4>No events</h4>
               <p className={'text-primary'}>Create your first Event</p>
               <LinkContainer to={'/events/new'}>
                   <Button variant={'outline-primary'}>Create New</Button>
               </LinkContainer>
           </div>
        </Container>}


    </Container>)
}

function FeaturedEvent({eventDetails}){
    const [date, setDate] = useState(Date.now());
    const [unSold, setUnsold] = useState(0);
    const [sold, setSold] = useState(0);

    useEffect(() => {




            let _date = new Date(eventDetails.eventDate);
            setDate(_date);
            let count = 0;
            let count2 = 0;

            for (let index in eventDetails.ticketInfo) {
                count += eventDetails.ticketInfo.at(index).ticketsLeft
                count2 += eventDetails.ticketInfo.at(index).ticketsAvailable
                setUnsold(count);
                setSold(count2 - count)
            }

            // setSoldTickets(getSoldTickets(dets.ticketInfo, _date))
        }

    , [eventDetails]);
    let status;
    let variant;

    if (eventDetails.approved){
        status = 'Selling';
        variant = 'success';
    } else {
        status = 'Reviewing';
        variant = 'info';
    }
    return (<Container fluid className={'my-3 py-3 px-0'}>
        <div className={'d-flex flex-row justify-content-between mx-2 mb-1'}>
            <span className={'d-flex flex-row'}><h4 className={'text-primary'}>Featured Event </h4>
                <div className={'ms-2'}><Badge className={'py-2'}
                            bg={variant}>{status}</Badge></div></span>
        </div>
        <Row lg={'auto'} md={'1'} sm={'1'} xs={'1'} className={'gy-3'}>
            <Col lg={'8'}>
                <Container fluid className={'h-100 py-3 bg-body rounded-4 '}>
                    <Row md={'2'} sm={'1'} xs={'1'} className={'gy-3'}>
                        <Col>
                            <Image className={'w-100 ar-square rounded-4'} src={eventDetails.image.at(0)} rounded/>
                        </Col>
                        <Col>
                            <h5 className={'text-primary'}>Name</h5>
                            <h6>{eventDetails.eventName}</h6>
                            <h5 className={'text-primary pt-2'}>Date</h5>
                            <p>{date.toString()}</p>
                            <h5 className={'text-primary'}>Location</h5>
                            <p>{eventDetails.location}</p>
                            <h5 className={'text-primary'}>Country</h5>
                            <p>{eventDetails.country}</p>
                            <LinkContainer to={'/events/' + eventDetails._id}>
                                <Button variant={'outline-primary'}>View event</Button>
                            </LinkContainer>
                        </Col>

                    </Row>
                </Container>
            </Col>
            <Col lg={'4'}>
                <Row lg={'1'} md={'2'} sm={'1'} xs={'1'} className={'h-100 justify-content-between gy-3'}>
                    <Col className={'d-flex'}><HomeScreenItem title={'Tickets Sold'}
                                                              subtitle={sold}
                                                              icon={<IoTicket
                                                                  className={'h-100 w-100'}/>} bg={'success'}/></Col>
                    <Col className={'d-flex'}><HomeScreenItem title={'Interested'}
                                                              subtitle={getRandomInt(200)}
                                                              icon={<IoPeople
                                                                  className={'h-100 w-100'}/>}/></Col>
                    <Col className={'d-flex'}><HomeScreenItem title={'Unsold Tickets'}
                                                              subtitle={unSold}
                                                              icon={<IoTicket
                                                                  className={'h-100 w-100'} />} bg={'danger'}/>
                    </Col>
                    <Col className={'d-flex'}> <HomeScreenItem title={'Income'}
                                                               subtitle={`${eventDetails.currency} ${getRandomInt(1000)}`}
                                                               icon={<IoIosCash size={25}
                                                                               className={'h-100 w-100 '}/>}/>
                    </Col>

                </Row>
            </Col>
        </Row>
    </Container> )
}