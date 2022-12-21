export interface Trip {
    "id": number,
    "tittle": string,
    "country": string,
    "startdate": any,
    "enddate": any,
    "price": number,
    "description": string,
    "places": number,
    "cart": number,
    "ImageLink": string,
    "rating": number,
    "nor": number,
    "rat": number,
}

export interface CartTrip{
    "id": number,
    "quantity": number,
}