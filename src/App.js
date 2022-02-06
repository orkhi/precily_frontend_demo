import React from 'react';
import { NavLink, Route, Routes, Navigate } from 'react-router-dom';
import 'animate.css';
import {
  useTheme, useMediaQuery, Typography,
  Container, Grid, Card, CardContent, CardActions, Button
} from '@mui/material';
import MainComponent from './components/MainComponent';
import ApiTestComponent from './components/ApiTestComponent';


function App() {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  return (

    <Routes>
      <Route path="/" element={<MainComponent isMobile={isMobile} isTablet={isTablet} />} />
      <Route path="/api-test" element={<ApiTestComponent isMobile={isMobile} isTablet={isTablet} />} />
    </Routes>

  );
}

export default App;
