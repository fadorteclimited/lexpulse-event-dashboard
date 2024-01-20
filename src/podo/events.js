import {faker} from "@faker-js/faker";
import data from './events.json'
import axios from "axios";
import {common} from "./utils";



export const statuses = [
    'Selling',
    'Sold Out',
    'Low stock',
    'Action Needed',
    'Unreleased'
]
export const Events = () => {
  // let list = [];
  //
  // for (let i = 0; i <= 25; i++){
  //
  //     list.push(
  //        getEvent({id: i})
  //     )
  // }
  //   list.sort(function(a,b){
  //       return new Date(b.date) - new Date(a.date);
  //   });
    return data;
}



export const getSoldTickets = (tickets, date) => {

    let list =    [];
    console.log(tickets)
    for (let j = 0; j<tickets.length; j++){
        let ticket = tickets.at(j)
        let sold = ticket.ticketsAvailable-ticket.ticketsLeft;
        for (let i = 0; i < sold; i++){
            list.push(
                {
                    name: faker.person.fullName(),
                    phone: faker.phone.number(),
                    userId: i,
                    date: faker.date.betweens({
                        from: date, to: Date.now(),
                    }),
                    option: ticket.ticketType,
                }
            )
        }
    }
    list.sort(function(a,b){
        return new Date(b.date) - new Date(a.date);
    });
    return list;
}


export function getTransactions(num){
    let list = [];
    for (let i = 0;i < num; i++){
        list.push({
            date: faker.date.past({years: 1}),
            amount: faker.finance.amount({min: 100, dec: 2, symbol: '$'}),
            description: faker.company.catchPhrase(),
        })
    }
    list.sort(function(a,b){
        return new Date(b.date) - new Date(a.date);
    });
    return list
}


export async function getEvent(id){
    const token = localStorage.getItem('token');


    const config = {
        headers: {
            authorization: `Bearer ${token}`
        },

    }
    console.log(id)
    let successObj;
    let res = await axios.get(`${common.baseUrl}api/v1/events/${id}`, config).catch((e) => {

        successObj = {
            success: false,
            status: e.response.status,
            message: e.response.data.msg,
        }
    })
    if (res !== undefined){
        if (res.status === 200){
            successObj = {
                success: res.data.success,
                status: res.status,
                data: res.data.data,
            }
        }
    }

    return successObj;
}
export async function handleUpload({name, location, category,currency, date, description, image, country, ticketInfo, update = false,eventId }){

    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    const config = {
        headers: {
            authorization: `Bearer ${token}`
        },

    }

    const formData = new FormData();
    formData.append("eventHostId", user.id);
    formData.append("eventName", name);
    formData.append("location", location);
    formData.append("category", category);
    formData.append("currency", currency);
    formData.append("eventDate", date);
    formData.append("description", description);
    formData.append("image", image );
    formData.append("country", country);


    let successObj;
    let res;
    try {
        if (update){
            res = await axios.patch(`${common.baseUrl}api/v1/events/${eventId}`, formData, config)
        } else {
            ticketInfo.forEach((ticket, index) => {
                formData.append(`ticketInfo[${index}][ticketType]`, ticket.name);
                formData.append(`ticketInfo[${index}][price]`, ticket.price);
                formData.append(`ticketInfo[${index}][ticketsAvailable]`, ticket.count);
                formData.append(`ticketInfo[${index}][ticketsLeft]`, ticket.count);
            })
            res = await axios.post(`${common.baseUrl}api/v1/events`, formData, config)
        }
    } catch (e) {
        successObj = {
            success: false,
            status: e.response.status,
            message: e.response.data.msg,
        }
    }


    if (res !== undefined){
        if (res.status === 200){
            successObj = {
                success: res.data.success,
                status: res.status,
                data: res.data.data,
            }
        }
    }

    return successObj;
}