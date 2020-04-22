export class Concert{
    name:string;
    genre:string;
    date:string;
    location:string;
    venue:string;
    time:string;
    celebrities: {name:string,imgUrl:string}[];
    about:{
        description:string,
        terms:string
    };
    imgUrl:string;
    price?:number;
}