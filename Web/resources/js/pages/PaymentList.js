import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import PaymentTable from '../table/PaymentTable'
import LeftSideBar from '../animations/LeftSideBar';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems:'center',
    justifyContent:'center',
    '& > *': {
      margin: theme.spacing(5),
      width: theme.spacing(200),
      height: theme.spacing(95),
    },
  },
}));

export default function PaymentList() {
  const classes = useStyles();

  return (
    <div>
      <LeftSideBar />
      <div className={classes.root}>
        <Paper variant="outlined" square>
            <PaymentTable />
        </Paper>
      </div>
    </div>
  );
}
