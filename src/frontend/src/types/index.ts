export type Product = {
    title: string,
    id: number,
    price: number,
    category: number,
}

export type Category = {
    name: string,
    id: number,
    slug: string,
}

export type ShippingAddress = {
    email: string,
    firstName: string,
    lastName: string,
    street: string,
    city: string,
    postCode: string,
    country: string,
    county: string | null,
}

export enum OrderStatus {
    INITIATED,
    WAITING_FOR_PAYMENT,
    CONFIRMED,
    FINISHED,
}

export type Order = {
    id: number,
    shippingAddress : ShippingAddress,
    products : Product[],
    totalPrice : number,
    status: OrderStatus,
    paymentAddress: string,
}

