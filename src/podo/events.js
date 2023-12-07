import {faker} from "@faker-js/faker";
import {getRandomInt} from "./utils";


export const statuses = [
    'Selling',
    'Sold Out',
    'Low stock',
    'Action Needed'
]
export const Events = () => {
  let list = [];

  for (let i = 0; i <= 10; i++){

      list.push(
          {
              poster: faker.image.urlLoremFlickr({category: 'colorful'}),
              name: faker.company.buzzAdjective(),
              description: faker.lorem.paragraph(),
              status: statuses.at(getRandomInt(statuses.length)),
              id: i,
          }
      )
  }
    return list
}

export const getEvent = ({id}) => {
    let address = faker.address;
    return   {
        id: id,
        poster: faker.image.urlLoremFlickr({category: 'colorful'}),
        name: faker.company.buzzAdjective(),
        description: faker.lorem.paragraph(),
        status: statuses.at(getRandomInt(statuses.length)),
        venue: {
            id: 0,
            name: faker.company.name(),
            address: {
                line1: address.street(),
                line2: address.secondaryAddress(),
                district: address.state(),
                City: address.city(),
                Country: address.country(),
            },
            mobile: faker.phone.number()
        },
        time: faker.date.soon({days: 5}),
        date: faker.date.soon({days: 5}),
        contact: faker.phone.number() ,
        options: [
            {
                id: 0,
                name: '',
                price: parseInt(faker.commerce.price(0,20)),
            }
        ]
    }
}