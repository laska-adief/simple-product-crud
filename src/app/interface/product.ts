export interface Product {
    id: String;
    title: String;
    price: Number;
    description: String;
    category: String;
    image: String;
    rating: Rating;
}

export interface Rating {
    rate: Number;
    count: Number;
}
