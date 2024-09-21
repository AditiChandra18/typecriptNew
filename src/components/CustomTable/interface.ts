import { GetWineDataItemType } from "../../services/interface";

export interface column {
    id:string,
    label: string
}

export interface CustomTableProps {
  data: GetWineDataItemType[] | null;
  columns: column[];
  loading: boolean;
}
