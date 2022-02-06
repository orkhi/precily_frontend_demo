import React, { useState, useEffect } from 'react';
import './ApiTestComponent.css';
import {
    Typography, TextField,
    Container, Grid, Box, Card, CardContent, CardActions, Button, Snackbar, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
} from '@mui/material';
import Slide from '@mui/material/Slide';
import { appUrl, alphaNumericRegex } from '../constants/Constants';
import { NavLink } from 'react-router-dom';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});


export default function ApiTestComponent(props) {
    const [trigger, setTrigger] = useState(false);
    const [snackbarState, setSnackbarState] = useState({ open: false, vertical: 'top', horizontal: 'right', message: '' });
    const { vertical, horizontal, open, message } = snackbarState;
    const [type, setType] = useState();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [id, setId] = useState();
    const [quote, setQuote] = useState();
    const [quoteError, setQuoteError] = useState();
    const [quoteErrorText, setQuoteErrorText] = useState();


    // FOR API CALLS
    useEffect(() => {
        async function fetchQuotes() {
            try {
                const response = await fetch(`${appUrl}/api/quotes`,
                    {
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        }
                    })
                const data = await response.json();
                if (data.error) {
                    setSnackbarState({ open: true, vertical: 'top', horizontal: 'right', message: data.message })
                    setLoaded(true)
                }
                else {
                    let quotes = data.quotes;
                    if (quotes) {
                        setQuote(quotes.quote);
                        setId(quotes._id)
                    }
                    setLoaded(true)
                }

            } catch (err) {
                console.log(err)
            }
        }
        fetchQuotes();


        return () => { }
    }, [trigger])


    const onSnackbarClose = () => {
        setSnackbarState({ open: false, vertical: 'top', horizontal: 'right', message: '' });

    }

    const openForm = (type) => {
        if (type === 'add') {
            setType('add')
            setQuote('')
        }
        else {
            setType('update')
        }
        setQuoteErrorText();
        setQuoteError(false);
        setDialogOpen(true)
    }

    const addQuote = async () => {
        const response = await fetch(`${appUrl}/api/quotes`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
                body: JSON.stringify({ quotes: quote, clientDate: new Date() })
            })
        const data = await response.json();
        if (data.error) {
            setSnackbarState({ open: true, vertical: 'top', horizontal: 'right', message: data.message })
        }
        else {
            // setQuote('')
            setDialogOpen(false)
            setSnackbarState({ open: true, vertical: 'top', horizontal: 'right', message: data.message })

        }
    }


    const updateQuote = async () => {
        const response = await fetch(`${appUrl}/api/quotes/update`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
                body: JSON.stringify({ id: id, quotes: quote, clientDate: new Date() })
            })
        const data = await response.json();
        if (data.error) {
            setSnackbarState({ open: true, vertical: 'top', horizontal: 'right', message: data.message })
        }
        else {
            // setQuote('')
            setDialogOpen(false)
            setSnackbarState({ open: true, vertical: 'top', horizontal: 'right', message: data.message })
        }
    }

    const handleQuoteChange = (e) => {
        e.preventDefault();
        setQuoteErrorText();
        setQuoteError(false);
        setQuote(e.target.value);
    }

    const handleQuoteBlur = (e) => {
        e.preventDefault();
        let value = e.target.value;
        if (!value) {
            setQuoteErrorText('Field is empty!');
            setQuoteError(true);
        }
        else if (value.length > 200) {
            setQuoteErrorText('Limit to 200 characters');
            setQuoteError(true);
        }
        else if (!alphaNumericRegex.test(value)) {
            setQuoteErrorText('Accepts only aplphabets, numbers and symbols like ( & - _ , .)');
            setQuoteError(true);
        }
    }

    const handleClose = (param) => {
        setDialogOpen(false);
        setTrigger(!trigger)
    }

    const getCount = async () => {
        const response = await fetch(`${appUrl}/api/quotes/count`,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
        const data = await response.json();
        if (data.error) {
            setSnackbarState({ open: true, vertical: 'top', horizontal: 'right', message: data.message })
        }
        else {
            setSnackbarState({ open: true, vertical: 'top', horizontal: 'right', message: JSON.stringify(data.counts) })
        }
    }

    return (
        <Container sx={{ display: 'flex', justifyContent: 'center', height: '100vh' }} >

            {!loaded && "Wait"}
            {loaded &&
                <Card sx={{
                    mt: '5rem', mb: 'auto',
                    width: (props.isMobile ? 320 : 800), textAlign: 'center', backgroundColor: "#E3F2FD", borderRadius: 3, py: 2
                }} className="animate__animated animate__slideInDown">

                    <CardContent>

                        <Typography variant="h6" sx={{ mb: 1 }}>My Favourite quote:</Typography>
                        <Typography variant="h3" sx={{ color: "#2061AE" }}>{quote}</Typography>
                    </CardContent>

                    <CardActions sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Button variant="contained" size="small" sx={{ backgroundColor: '#009CDA', pt: 1, "&:hover": { background: '#2061AE' } }} onClick={() => openForm('add')}
                        >Add</Button>
                        <Button variant="outlined" size="small" sx={{ pt: 1 }} onClick={() => openForm('update')}>Update</Button>
                        <Button variant="outlined" size="small" sx={{ pt: 1 }} onClick={getCount}>Count</Button>
                    </CardActions>
                    <NavLink to="/" style={{ textDecoration: "none", color: '#212121' }}>
                        <Button variant="text" size="small" sx={{ pt: 1 }}>Back to Main page</Button>
                    </NavLink>

                </Card>
            }


            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                onClose={onSnackbarClose}
                message={message}
                autoHideDuration={5000}
                ContentProps={{
                    sx: { background: '#2E7D32' }
                }}
            />

            {
                dialogOpen &&
                <Dialog
                    open={dialogOpen}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    fullWidth={true}
                >

                    <DialogContent sx={{ backgroundColor: "#E3F2FD" }} >
                        <TextField
                            autoFocus
                            margin="dense"
                            placeholder='Enter New Quote!'
                            type="text"
                            value={quote}
                            onChange={handleQuoteChange}
                            onBlur={handleQuoteBlur}
                            error={quoteError}
                            helperText={quoteErrorText}
                            fullWidth
                            variant="outlined"
                            multiline
                            rows={3}
                            inputProps={{ maxLength: 100 }}
                        />
                        <Box sx={{ textAlign: "end" }}>
                            {(type === 'add') && <Button type="button" size="small" variant="contained" sx={{ pt: 1, backgroundColor: "#2061AE", "&:hover": { background: '#009CDA' } }} onClick={addQuote} disabled={quoteError ? true : false}>Add</Button>
                            }
                            {(type !== 'add') && <Button type="button" size="small" variant="contained" sx={{ pt: 1, backgroundColor: "#2061AE", "&:hover": { background: '#009CDA' } }} onClick={updateQuote} disabled={quoteError ? true : false}>Update</Button>
                            }
                        </Box>
                    </DialogContent>


                </Dialog>
            }
        </Container >


    );
}
