import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 200,
  },
});

function createData(name, date) {
  return { name, date };
}

const rows = [
  createData("カレーの作り方！！", "2020年12月24日 17:00"),
  createData("カレーの作り方！！", "2020年12月24日 17:00"),
  createData("カレーの作り方！！", "2020年12月24日 17:00"),
  createData("カレーの作り方！！", "2020年12月24日 17:00"),
  createData("カレーの作り方！！", "2020年12月24日 17:00"),
  createData("カレーの作り方！！", "2020年12月24日 17:00"),
];

const DiscussionTable = () => {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>ディスカッションタイトル</TableCell>
            <TableCell align="right">開催日時</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DiscussionTable;
