import React from 'react';
import Typography from '@mui/material/Typography';
import UrlShortenerForm from '../components/UrlShortenerForm';

const ShortenerPage = () => (
  <div>
    <Typography variant="h4" gutterBottom>
      URL Shortener
    </Typography>
    <UrlShortenerForm />
  </div>
);

export default ShortenerPage; 