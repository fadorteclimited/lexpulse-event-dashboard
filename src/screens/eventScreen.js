import {
    Badge,
    Button,
    Col,
    Container,
    Dropdown,
    DropdownButton,
    Row,
    Table
} from "react-bootstrap";
import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {Events} from "../podo/events";
import {IoEllipsisHorizontalOutline, IoShareOutline} from "react-icons/io5";
import LoadingScreen from "../components/LoadingScreen";
import {getRandomInt} from "../podo/utils";
import {useNavigate} from "react-router-dom";
import {LinkContainer} from "react-router-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {getEvent, selectFullState, selectLoadingState, updateId} from '../podo/SingleEventSlice'

export default function EventScreen() {
    let {id} = useParams();
    const dispatch = useDispatch();
    const full = useSelector(selectFullState)
    if (full.id !== id || full.value === null){
        console.log(full)
        dispatch(updateId(id))
        dispatch(getEvent(id))
    }
    const [details, setDetails] = useState(null);
    const [date, setDate] = useState(Date.now());
    const [unsold, setUnsold] = useState(0);
    const [sold, setSold] = useState(0);
    let history = useNavigate();


    useEffect(() => {
        const filler = Events().at(0);

           if (!full.isLoading){
               if (!full.hasError || full.value !== null){
                   let _details = full.value.at(0);
                   setDetails({
                       ...filler,
                       ..._details,
                   })
                   let _date = new Date(_details.eventDate);
                   setDate(_date);
                   let count = 0;
                   let count2 = 0;
                   for (let index in _details.ticketInfo) {
                       count += _details.ticketInfo.at(index).ticketsLeft
                       count2 += _details.ticketInfo.at(index).ticketsAvailable
                       setUnsold(count);
                       setSold(count2 - count);
                   }

                   // setSoldTickets(getSoldTickets(dets.ticketInfo, _date))
               } else {
                   history('/events')
               }
           }


    }, [full, history])

    if (useSelector(selectLoadingState) || details === null) {

        return (<LoadingScreen className={'h-100'}/>)
    } else {
        let status;
        let variant;
        if (details.approved){
            status = 'Selling';
            variant = 'success';
        } else {
            status = 'Reviewing';
            variant = 'info';
        }

        // const exportData = () => {
        //     const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
        //         JSON.stringify(Events())
        //     )}`;
        //     const link = document.createElement("a");
        //     link.href = jsonString;
        //     link.download = "data.json";
        //
        //     link.click();
        // };

        return (<div>

            <Container fluid className={'py-3 px-2'}>
                <div className={''}>
                    <div className={'d-md-flex flex-row mb-0 px-3'}>
               <span className={'d-flex flex-row '}>
                   <h3 className={'text-primary mb-sm-1  '}>{details.eventName}</h3>
                   <div className={'ms-2 verticalCenter desktopOnly'}><Button size={'sm'} variant={'outline-secondary'}>{details.category}</Button></div>
                     <div className={'mobileOnly ms-auto'}>
                                <DropdownButton title={<IoEllipsisHorizontalOutline/>} menuVariant={'dark'} >
                                    <Dropdown.Item>Edit</Dropdown.Item>
                                    <Dropdown.Item><IoShareOutline/> Share</Dropdown.Item>
                                    <Dropdown.Item>Visit</Dropdown.Item>
                                </DropdownButton>
                            </div>
               </span>
                        <div className={'ms-auto'}>
                            <div className={'desktopOnly'}><LinkContainer to={`/edit/${id}`}>
                                <Button variant={'outline-primary'} >Edit</Button>
                            </LinkContainer>
                                <Button className={'ms-2'} variant={'outline-primary'}><IoShareOutline/> Share</Button>
                                <Button className={'ms-2'} variant={'primary'}>Visit</Button></div>
                        </div>
                    </div>
                </div>

                <Container fluid className={'rounded-2 '}>
                    <Row  md={'1'} sm={'1'} xs={'1'}>
                        <Col lg={'5'}>
                            <Container fluid className={'mt-3 rounded-4 w-100 ar-square p-0'}>
                                <img src={details.image.at(0)} alt={details.eventName}
                                     className={'ar-square w-100 object-fit-cover rounded-3'}/>
                            </Container>
                            <Container fluid className={'p-3 rounded-4 bg-body-tertiary mt-3 d-flex flex-column mb-3'}>
                                <h5>Date</h5>
                                <p>{date.toString()}</p>
                            </Container>
                        </Col>

                        <Col lg={'7'}>
                            <Container fluid className={'p-0 pt-3'}>
                                <Row md={'2'} sm={'1'} xs={'1'} className={'gy-3'}>
                                    <Col>
                                        <Container fluid className={'p-3 rounded-4 bg-body-tertiary'}>
                                            <h5>Stats</h5>
                                            <span className={'d-flex flex-row justify-content-between'}><small
                                                className={'fw-bold'}>Attending: </small>{sold}</span>
                                            <span className={'d-flex flex-row justify-content-between'}><small
                                                className={'fw-bold'}>Interested: </small>{getRandomInt(200)}</span>
                                            <span className={'d-flex flex-row justify-content-between'}><small
                                                className={'fw-bold'}>Unsold Tickets: </small>{unsold}</span>
                                            <span className={'d-flex flex-row justify-content-between'}><small
                                                className={'fw-bold'}>Status: </small><Badge className={' py-2'}
                                                                                             bg={variant}>{status}</Badge></span>
                                        </Container>
                                    </Col>
                                    <Col>
                                        <Container fluid className={'p-3 rounded-4 bg-body-tertiary  h-100'}>
                                            <h5>Location</h5>
                                            <span className={'d-flex flex-row justify-content-between mb-1'}><small
                                                className={'fw-bold'}>venue: </small>{details.location}</span>
                                            <span className={'d-flex flex-row justify-content-between'}><small
                                                className={'fw-bold'}>Country: </small>{details.country}</span>

                                        </Container>
                                    </Col>
                                </Row>
                            </Container>
                            <Container fluid className={'p-3 rounded-4 bg-body-tertiary mt-3'}>
                                <h5>Description</h5>
                                <p className={'limitLines-4'}>{details.description}</p>
                            </Container>
                            <Container fluid className={' p-3 rounded-4 bg-body-tertiary mt-3'}>
                                <h5>Tickets</h5>
                                <Table size={'sm'} className={''} responsive>
                                    <thead>
                                    <tr>
                                        <td><strong>Name</strong></td>
                                        <td><strong>Price</strong></td>
                                        <td><strong>Available</strong></td>
                                        <td><strong>Left</strong></td>
                                    </tr>
                                    </thead>
                                    <tbody>

                                    {details.ticketInfo.map((_price) => (<tr key={_price._id}>
                                        <td>{_price.ticketType}</td>
                                        <td>{details.currency} {_price.price.toFixed(2)}</td>
                                        <td>{_price.ticketsAvailable}</td>
                                        <td>{_price.ticketsLeft}</td>
                                    </tr>))}
                                    </tbody>
                                </Table>
                            </Container>

                        </Col>

                    </Row>
                </Container>

            </Container>
        </div>);
    }
}