import styled from "@emotion/styled";
import { Paper } from "@mui/material";

const DataRow = styled(Paper)`
  display: inline-block;
  width: calc(100% - 16px);
  border-radius: 0.5rem;
  padding: 0.15rem 0.5rem;
  margin: 0.25rem auto;
  background: rgba(0, 0, 0, 0.76);
`;

export default DataRow;
