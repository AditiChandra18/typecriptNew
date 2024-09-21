import { Box, CircularProgress,Table,TableBody,TableCell,TableContainer,TableHead,TableRow } from "@mui/material";
import { column, CustomTableProps } from "./interface";
import { GetWineDataItemType } from "../../services/interface";

const CustomTable: React.FC<CustomTableProps> = ({
  data,
  columns,
  loading,
}: CustomTableProps) => {

  return (
    <div>
      <TableContainer className="table-container" sx={{ width: '100%' }}>
        <Table className="table" sx={{ width: '100%' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((col: column) => (
                <TableCell>{col.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
              <TableCell colSpan={columns.length}>
                <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                  <CircularProgress size="3rem" />
                </Box>
              </TableCell>
            </TableRow>
            ) : (
              data?.map((rowData: GetWineDataItemType) => (
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
