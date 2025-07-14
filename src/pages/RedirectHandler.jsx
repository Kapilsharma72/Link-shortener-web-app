import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, CircularProgress, Box, Alert, Link as MuiLink } from '@mui/material';
import { getUrls, addClick } from '../utils/storage';
import { getMockLocation } from '../utils/geo';
import { log } from '../utils/logger';

// TODO: Maybe add a retry button for expired/failed
export default function RedirectHandler() {
  const { shortcode } = useParams();
  const [status, setStatus] = useState('loading'); // loading, error, expired, success
  const [msg, setMsg] = useState('');
  const [target, setTarget] = useState('');

  useEffect(() => {
    // Not using a backend, so just localStorage
    const urls = getUrls();
    const found = urls.find(u => u.shortcode === shortcode);
    if (!found) {
      setStatus('error');
      setMsg('Short URL not found.');
      log('error', 'Shortcode not found', { shortcode });
      return;
    }
    const now = new Date();
    const expiry = new Date(found.expiry);
    if (now > expiry) {
      setStatus('expired');
      setMsg('This short URL has expired.');
      log('error', 'Shortcode expired', { shortcode });
      return;
    }
    // Log the click
    const location = getMockLocation();
    const click = {
      timestamp: now.toISOString(),
      source: document.referrer || '-',
      ...location,
    };
    addClick(shortcode, click);
    log('info', 'Short URL clicked', { shortcode, ...location });
    setTarget(found.url);
    setStatus('success');
    // Not the best UX, but works
    setTimeout(() => {
      window.location.href = found.url;
    }, 1200);
  }, [shortcode]);

  if (status === 'loading') {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 6 }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>Redirecting...</Typography>
      </Box>
    );
  }
  if (status === 'error' || status === 'expired') {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 6 }}>
        <Alert severity="error" sx={{ mb: 2 }}>{msg}</Alert>
        <MuiLink href="/" variant="body2">Go to URL Shortener</MuiLink>
      </Box>
    );
  }
  // success
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 6 }}>
      <Alert severity="success" sx={{ mb: 2 }}>
        Redirecting to: <MuiLink href={target} target="_blank" rel="noopener noreferrer">{target}</MuiLink>
      </Alert>
      <Typography variant="body2" color="text.secondary">If you are not redirected, <MuiLink href={target}>click here</MuiLink>.</Typography>
    </Box>
  );
} 