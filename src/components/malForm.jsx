import React, { useState } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typo from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress'

import logo from '../logo.svg';
import oooh from './oooh.webp';
import goodGif from './good.gif';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
      minWidth: 650
    },
    button: {
        fontSize: 30,
    },
    name:{
        alignItems: 'right'
    },
    cell:{
        justiyContent:'center',
        size: 20,
        fontSize: 20,
        padding: '5px',
        border: '1px solid black',
    }
});

export function MalForm() {
    const classes = useStyles();

    const [values, setValues] = useState({
        url: '',
        urlRes: '',
        malicious: false,
        maliciousnessProbability: 0.0,
        responseReturned: false,
        loading: false,
        disabled: false
    })

    const handleChange = name => event => {
        setValues({
            ...values, [name]:event.target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        setValues({
            loading: true,
            disabled: true,
        })

        await axios.post('http://127.0.0.1:8000/urlDetector', {
            url: values.url,
        })
        .then(response => {
            console.log(response.data)
            setValues({
                url: '',
                urlRes: response.data.URL,
                malicious: response.data.Malicious,
                maliciousnessProbability: response.data.result,
                loading: false,
                disabled: false,
                responseReturned: true,
            });
        })
        .catch(error => {
            console.log(error);
            alert(error);
            setValues({
                loading: false,
                disabled: false,
            })
        })
    }

    const handleReset = (event) => {
        setValues({
            url: '',
            urlRes: '',
            malicious: false,
            maliciousnessProbability: 0.0,
            responseReturned: false,
            loading: false,
            disabled: false
        })
    }

    var loading = values.loading ? (
        <CircularProgress 
            color="primary"
        />
    ) : ('Check this URL!!')

    var resetLoading = values.loading ? (
        <CircularProgress 
            color="secondary"
        />
    ) : ('Reset this form')
   
    const tableResponse = values.responseReturned ? (
        <div>
            {values.malicious=== 'True' ? (
                <Typo variant="h4" style={{color:'white', backgroundColor:'red'}}>RESULTS</Typo>
            ):(
                <Typo variant="h4" style={{color:'white', backgroundColor:'green'}}>RESULTS</Typo>
            )}
            {/* {typo1} */}
            <TableContainer component={Paper}>
                <Table class={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell class={classes.cell}>URL</TableCell>
                            <TableCell class={classes.cell}>Is this URL Malicious?</TableCell>
                            <TableCell class={classes.cell}>Probability of Maliciousness</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell class={classes.cell}>{values.urlRes}</TableCell>
                            <TableCell class={classes.cell}>{values.malicious}</TableCell>
                            <TableCell class={classes.cell}>{values.maliciousnessProbability}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <br/>
            {values.malicious=== 'True' ? (
                <img src={oooh} style={{width:'400px'}}/>
            ):(
                <img src={goodGif} style={{width:'400px'}}/>
            )}
        </div>
    ) : (<img src={logo} className="App-logo" alt="logo" />)

    return(       


        <div>
            <form onSubmit={handleSubmit}>
                <Typo variant='h2'>Mal - U - Detect</Typo>
                <br/>
                <Typo variant="body">Enter the URL here:</Typo>
                
                <TextField 
                    variant="outlined"
                    value={values.url}
                    onChange={handleChange('url')}
                    fullWidth
                    required
                />
                <br/><br/>
                <Button
                    variant="contained"
                    color="primary"                    
                    size='large'
                    disabled={values.disabled}
                    class={classes.Button}
                    onClick={handleReset}
                >
                    {resetLoading}
                </Button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Button
                    variant="contained"
                    color="secondary"
                    type="submit"
                    size='large'
                    disabled={values.disabled}
                    class={classes.Button}
                >
                    {loading}
                </Button>
            
                
            </form>
            <br/>
            
            {tableResponse}
            
            <br/>
            
            
            
            
            
        </div>
            
    )
}

export default MalForm;