interface RatingType {
    average : number | string,
    reviews : string

}

export interface GetWineDataItemType{
    winery: string,
    wine: string,
    rating: RatingType,
    location: string,
    image: string,
    id: string
}