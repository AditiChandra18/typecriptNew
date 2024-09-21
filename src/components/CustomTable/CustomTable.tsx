import { Box, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from "@mui/material";
import { column, CustomTableProps } from "./interface";
import { GetWineDataItemType } from "../../services/interface";
import { useState } from "react";

const CustomTable: React.FC<CustomTableProps> = ({
  data,
  columns,
  loading,
}: CustomTableProps) => {

  const [orderDirection, setOrderDirection] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<string | null>(null);

  const handleSort = (property: string) => {
    let isAsc = orderBy === property && orderDirection === 'asc'
    setOrderDirection(isAsc ? 'desc' : "asc")
    setOrderBy(property)
  }

  const sortData = (data: GetWineDataItemType[]) => {
    if (!orderBy) {
      return data;
    }

    return data.sort((a, b) => {
      let aVal, bVal;

      if (orderBy === "rating.average") {
        aVal = a.rating.average;
        bVal = b.rating.average;
      } else if (orderBy === "rating.reviews") {
        aVal = parseInt(a.rating.reviews, 10);
        bVal = parseInt(b.rating.reviews, 10);
      } else {
        aVal = a[orderBy as keyof GetWineDataItemType];
        bVal = b[orderBy as keyof GetWineDataItemType];
      }

      if (typeof aVal === "number" && typeof bVal === "number") {
        return (aVal - bVal) * (orderDirection === "asc" ? 1 : -1);
      }

      if (aVal === undefined || bVal === undefined) {
        return aVal == null ? 1 : -1;
      }

      return (
        (aVal as string).localeCompare(bVal as string) *
        (orderDirection === "asc" ? 1 : -1)
      );
    });
  };

  return (
    <div>
      <TableContainer sx={{ width: "100%" }}>
        <Table sx={{ width: "100%" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((col: column) => (
                <TableCell>
                  <TableSortLabel
                    active={orderBy === col.id}
                    direction={orderBy === col.id ? orderDirection : "asc"}
                    onClick={() => handleSort(col.id)}
                  >
                    {col.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                  >
                    <CircularProgress size="3rem" />
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              data && sortData(data)?.map((rowData: GetWineDataItemType) => (
                <TableRow key={rowData.id}>
                  <TableCell>{rowData.winery}</TableCell>
                  <TableCell>{rowData.wine}</TableCell>
                  <TableCell>{rowData.rating.average}</TableCell>
                  <TableCell>{rowData.rating.reviews}</TableCell>
                  <TableCell>{rowData.location}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CustomTable;
