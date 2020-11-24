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