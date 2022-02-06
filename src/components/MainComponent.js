import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import 'animate.css';
import {
    Typography, Container, Card, CardContent, CardActions, Button, Dialog, DialogContent
} from '@mui/material';
import Slide from '@mui/material/Slide';
import MobileComponent from './MobileComponent'
import TabletComponent from './TabletComponent';
import LargeScreenComponent from './LargeScreenComponent';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});



export default function MainComponent(props) {
    const [dialogOpen, setDialogOpen] = useState(false);

    const openReadme = () => {
        setDialogOpen(true)
    }

    const handleClose = (param) => {
        setDialogOpen(false);
    }

    return (
        <Container sx={{ display: 'flex', justifyContent: 'center', height: '100vh' }} >

            <Card sx={{
                mt: '5rem', mb: 'auto',
                width: (props.isMobile ? 320 : 800), textAlign: 'center', backgroundColor: "#E3F2FD", borderRadius: 3, py: 2
            }} className="animate__animated animate__slideInDown">

                <CardContent>
                    {props.isMobile && <MobileComponent />}

                    {props.isTablet && <TabletComponent />}

                    {(!props.isMobile && !props.isTablet) && <LargeScreenComponent />}

                    <Typography variant="h6" sx={{ mt: 4 }}>Change screen size to view component change</Typography>

                </CardContent>

                <CardActions sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Button variant="contained" sx={{ backgroundColor: '#009CDA', pt: 1, mr: 1, "&:hover": { background: '#2061AE' }, mb: (props.isMobile) ? 1 : 0 }} onClick={openReadme}>Read Me</Button>

                    <NavLink to="/api-test" style={{ textDecoration: "none", color: '#212121' }}>
                        <Button variant="contained" sx={{ backgroundColor: '#009CDA', pt: 1, "&:hover": { background: '#2061AE' } }}>Go To API Test Screen</Button>
                    </NavLink>
                </CardActions>

            </Card>


            {dialogOpen &&
                <Dialog
                    open={dialogOpen}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    fullWidth={true}>

                    <DialogContent sx={{ backgroundColor: "#E3F2FD" }} >
                        <Typography variant="h6" sx={{ color: "#2061AE" }}>
                            Font End Note:
                        </Typography>
                        <p>I have used React and React MUI Library.</p>
                        <p>There are two main pages, <b>the landing page</b> and <b>API test page</b> </p>
                        <p>On main page I am using three components. Based on the screen size the components are mounted  </p>
                        <p>One can test the APIs by navigating to API Test screen </p>
                        <p>github link: <b>https://github.com/orkhi/precily_frontend_demo</b> </p>
                        <Typography variant="h6" sx={{ color: "#2061AE" }}>
                            Back End Note:
                        </Typography>
                        <p>I have used express framework and Mongo DB atlas cloud for this demo. Also I am hosting the backend code in my digitalocean droplet</p>
                        <p>There are three APIs basically to <b>Add</b>, <b>Update</b> and <b>Count</b></p>
                        <p>Regarding the response time, I have used a middleware in express that sets a <b>X-Response-Time header</b> in the API response </p>
                        <p>github link: <b>https://github.com/orkhi/precily_demo_backend.git</b> </p>
                    </DialogContent>


                </Dialog>
            }
        </Container>

    );
}
