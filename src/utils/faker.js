import { faker } from "@faker-js/faker";

const createProds = () => {
    return {
        id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        status: faker.datatype.boolean(),
        thumbnail: faker.image.url(),
        code: faker.commerce.isbn(),
        stock: faker.number.int(100),
        category: faker.commerce.productAdjective()

    }
}

export default createProds;