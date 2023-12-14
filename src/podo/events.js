import {faker} from "@faker-js/faker";
import data from './events.json'

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

export const getEvent = (id) => {
    // let address = faker.location;
    //
    // let max = getRandomInt(3, 1)
    // let prices = [];
    // let totalTickets = 0;
    // for (let i = 0; i<=max; i++){
    //     let count = getRandomInt(400);
    //     let sold = getRandomInt(count);
    //     totalTickets= totalTickets + sold;
    //     prices.push({
    //         id: 0,
    //         name: faker.company.buzzNoun(),
    //         price: parseInt(faker.commerce.price({min: 0, max: 20})),
    //         count: count,
    //         sold: sold
    //     })
    // }
    // return   {
    //     id: id,
    //     poster: faker.image.urlLoremFlickr({category: 'colorful'}),
    //     name: faker.company.buzzAdjective(),
    //     description: faker.lorem.paragraph(),
    //     status: statuses.at(getRandomInt(statuses.length)),
    //     genre: faker.music.genre(),
    //     venue: {
    //         id: 0,
    //         name: faker.company.name(),
    //         address: {
    //             line1: address.street(),
    //             line2: address.secondaryAddress(),
    //             district: address.state(),
    //             City: address.city(),
    //             Country: address.country(),
    //         },
    //         mobile: faker.phone.number()
    //     },
    //     time: faker.date.soon({days: 5}),
    //     date: faker.date.soon({days: 5}),
    //     contact: faker.phone.number() ,
    //     prices: prices,
    //     interested: getRandomInt(totalTickets) + totalTickets,
    //     sold: totalTickets,
    // }

    return data.filter(e => e.id === id);
}

export const getSoldTickets = (tickets) => {

    let list = [];
    for (let j = 0; j<tickets.length; j++){
        let ticket = tickets.at(j)
        for (let i = 0; i < ticket.sold; i++){
            list.push(
                {
                    name: faker.person.fullName(),
                    phone: faker.phone.number(),
                    userId: i,
                    date: faker.date.past({years: 1}),
                    option: j,
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