export class ClientDetail{
    id: string;
    fname: string;
    lname: string;
    email: string;
    password: string;
    cardDetails: string;
    bankBalance: number;
    userPortfolio: [];
    _links: { self: { href: string }, clients: {href: string } };
}

export class ClientOrders{
    orderId: string;
    userId: string;
    unitPrice: number;
    tickerSymbol: string;
    statusId: number;
    quantity: number;
    transactionId: number;
    dateCreated: string
    dateModified: string;
    orderTypeId: number;
}

export class ClientLogin{
    userId:any;
}

// 'https://trade-client-connectivity.herokuapp.com/client/login'
// {
//     "email": "sedem.amekpewu.3@.com",
//     "password": "qwerty"
// }