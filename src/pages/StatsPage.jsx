import React from 'react';
import Typography from '@mui/material/Typography';
import StatsTable from '../components/StatsTable';

const StatsPage = () => (
  <div>
    <Typography variant="h4" gutterBottom>
      URL Shortener Statistics
    </Typography>
    <StatsTable />
  </div>
);

export default StatsPage; 