import React, {useState, useEffect} from 'react';
import {Grid, TextField, Button, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import MUIDataTable from "mui-datatables";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles({

    container: {
        marginTop: '5%'
    },
    textCenter: {
        textAlign: 'center'
    }
});

const columns = ["Bus Number", "Operator Name", "Arrival", "Departure", "Source City", "Destination City", "Duration(in mins)", "Fare"];

export const BusSearch = () => {
    
    const classes = useStyles();
    const [searchCriteria, setSearchCriteria] = useState({sourceCity: '', destinationCity: '', 
    travelDate: null, returnDate: null});
    const [busResults, setBusResults] = useState([]);
    
    const handleSearchClick = () => {

        fetch('http://localhost:8080/api/searchBuses', {method: 'POST', body: searchCriteria})
        .then(res => res.json()).then(data => setBusResults(data)).catch(err => console.log(err));
    }
    
    return (
        <div className={classes.container}>
        <Grid container spacing={2} justify='center' alignItems='flex-end'> 
        <Grid item xs={12} className={classes.textCenter}>
                <Typography variant='h3'>Bus Search</Typography>
            </Grid>
            <Grid item xs={6} md={2}>
                <TextField label='Source City' onChange={event => setSearchCriteria({...searchCriteria, sourceCity: event.target.value})}
                value={searchCriteria.sourceCity}
                />
            </Grid>
            <Grid item xs={6} md={2}>
                <TextField label='Destination City' onChange={event => setSearchCriteria({...searchCriteria, destinationCity: event.target.value})}
                value={searchCriteria.destinationCity}/>
            </Grid>
            <Grid item xs={6} md={2}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                disablePast
                id="date-picker-inline"
                label="Travel Date"
                value={searchCriteria.travelDate}
                onChange={date => setSearchCriteria({...searchCriteria, travelDate: date})}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
                />
            </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={6} md={2}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                disablePast
                id="date-picker-inline"
                label="Return Date(Optional)"
                value={searchCriteria.returnDate}
                onChange={date => setSearchCriteria({...searchCriteria, returnDate: date})}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
                />
            </MuiPickersUtilsProvider>

            </Grid>
            <Grid item xs={6} md={2}>
                <Button variant='outlined' onClick={handleSearchClick}
                disabled={searchCriteria.sourceCity === '' && searchCriteria.destinationCity === ''}
                >Search Bus</Button>
            </Grid>
            <Grid item md={10}>
                <div style={{ marginTop: '32px' }}>
                <MUIDataTable 
                    title={"Bus List"} 
                    data={busResults}
                    columns={columns} 
                />
                </div>
            </Grid>
        </Grid>
        </div>
    );

}