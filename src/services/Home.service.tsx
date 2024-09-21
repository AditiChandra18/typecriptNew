import axios from "axios";
import { GetWineDataItemType } from "./interface";

const BASE_URL = "https://api.sampleapis.com/wines/";

export const getWineData = async ( filter : string) : Promise<GetWineDataItemType[]> => {
    const { data } = await axios.get<GetWineDataItemType[]>(`${BASE_URL}${filter}`);
    return data;
};
