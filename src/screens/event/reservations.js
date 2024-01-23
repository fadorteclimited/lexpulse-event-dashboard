import {Badge, Button, Container, Image, Table} from "react-bootstrap";
import {IoDocumentOutline} from "react-icons/io5";
import {dateReader} from "../../podo/utils";
import {useDispatch, useSelector} from "react-redux";
import {
    addUser,
    getTickets, selectEvent, selectTickets, selectTicketsError, selectTicketsLoading, selectUsers, updateId
} from "./SingleEventSlice";
import {useParams} from "react-router";
import React, {useEffect, useState} from "react";
import LoadingScreen from "../../components/LoadingScreen";

import SweetAlert from "react-bootstrap-sweetalert";
import {getUserApi} from "../../podo/userData";


export default function Reservations() {
    let {id} = useParams();
    const dispatch = useDispatch();
    dispatch(updateId(id))
    const details = useSelector(selectEvent);
    const soldTickets = useSelector(selectTickets)
    const err = useSelector(selectTicketsError)
    const [show, setShow] = useState(false)
    const [ticketInfo, setTicketInfo] = useState({
        user: {}, ticket: {
            ticketInfo: []
        }
    })
    useEffect(() => {
        if (soldTickets === undefined && !err) {
            dispatch(getTickets(id))
        }
    }, [id, dispatch, soldTickets, err]);


    if (useSelector(selectTicketsLoading) || soldTickets === undefined || details === undefined) {
        return (<LoadingScreen className={'h-100'}/>)
    } else {
        return (<div className={'px-2'}>
            <Container className={'p-3 rounded-4 bg-body-tertiary mt-3 w-100'}>
                <div className={'d-md-flex flex-row mb-0 '}>
                    <h3 className={'text-primary'}>Reservations</h3>
                    <div className={'ms-auto d-flex flex-row'}>
                        <Button className={'ms-2'} variant={'outline-primary'}><IoDocumentOutline/> Print</Button>
                    </div>
                </div>

                <Table>
                    <thead>
                    <tr>
                        <th scope="col"><strong>#</strong></th>
                        <th scope="col"><strong>User</strong></th>
                        <th scope="col"><strong>Tickets</strong></th>
                        <th scope="col"><strong>Date</strong></th>
                        <th scope="col"><strong>Status</strong></th>
                        <th scope="col"><strong>Total</strong></th>
                        <th scope="col"><strong>Payment Method</strong></th>
                    </tr>
                    </thead>
                    <tbody>
                    {soldTickets.map((item, index) => {
                        return <TicketRow key={index} item={item} index={index} setInfo={setTicketInfo} setShow={setShow} currency={details.currency}/>
                    })
                    }
                    </tbody>
                </Table>
                <SweetAlert customClass={'bg-dark text-light rounded-4'} type={'default'}
                            onConfirm={setShow.bind(this,false)}
                            title={'Ticket'}
                            show={show}
                            custom={true}
                            customButtons={<Button variant={'outline-primary'} onClick={setShow.bind(this,false)}>Close</Button>}>
                    <span className={'d-flex flex-row'}>
                        <Image className={'ar-square bg-danger object-fit-cover'} src={ticketInfo.user.image} height={150} width={150} roundedCircle style={{
                            objectPosition: 'center'
                        }}/>
                        <div className={'verticalCenter ms-2'}>
                            <h5>{ticketInfo.user.firstName}  {ticketInfo.user.lastName}</h5>
                        <h6>{ticketInfo.user.email}</h6>
                        <p>Total: {details.currency}<small className={'text-primary'}>{ticketInfo.ticket.totalPrice}</small> </p>
                        </div>
                    </span>
                    <Table variant={'dark'} size={'sm'}>
                        <thead>
                        <tr>
                            <th scope={'col'}><strong>Name</strong></th>
                            <th scope={'col'}><strong>Number of Tickets</strong></th>
                        </tr>
                        </thead>
                        <tbody>
                        {ticketInfo.ticket.ticketInfo.map((value, index) => (<tr key={index}>
                            <td>
                                {value.ticketType}
                            </td>
                            <td>{value.numberOfTickets}</td>
                        </tr>))}
                        </tbody>
                    </Table>
                </SweetAlert>
            </Container>
        </div>)
    }
}

function TicketRow({item, index, setInfo, setShow, currency}) {
    const users = useSelector(selectUsers)
    const [user, setUser] = useState({})
    const [purchased, setPurchased] = useState(0)
    const dispatch = useDispatch();

    useEffect(() => {
        const localUser = users.find((value) => value.id === item.attendeeId)

        if (localUser === undefined){

            getUserApi(item.attendeeId).then((_user) => {
               setUser(_user)
                dispatch(addUser({
                    id: item.attendeeId,
                    ..._user
                }))
            });

        } else {
            setUser(localUser)
        }
            let total= 0;
            item.ticketInfo.forEach((option) => {
            total+=option.numberOfTickets;
        });

            setPurchased(total)
    },[item,dispatch,users])
    function showTicket() {
        setShow(true);
        setInfo({
            user: user,
            ticket: item,
        })
    }
    return (<tr key={item._id} onClick={showTicket.bind(this)}>
        <td>{index + 1}</td>
        <td><span><Image className={'me-1 object-fit-cover bg-danger ar-square'} style={{maxHeight: '35px'}}
                           src={user.image} alt={'avatar'} roundedCircle/>{user.firstName} {user.lastName}</span></td>
        <td>{purchased}</td>
        <td>{dateReader({date: item.createdAt})}</td>
        <td><Badge bg={'primary'}>{item.status}</Badge></td>
        <td>{currency} {item.totalPrice}</td>
        <td>{item.paymentMethod}</td>
    </tr>)
}

