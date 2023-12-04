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