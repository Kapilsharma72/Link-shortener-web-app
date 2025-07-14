import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton, Collapse, Box
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { getUrls, getClicks } from '../utils/storage';
import { log } from '../utils/logger';

// TODO: Maybe add pagination if too many URLs
function ClickDetails({ code }) {
  const [open, setOpen] = useState(false);
  const [clicks, setClicks] = useState([]);

  useEffect(() => {
    if (open) {
      // Not the most efficient, but fine for small data
      setClicks(getClicks(code));
      log('info', 'Viewed click details', { code });
    }
  }, [open, code]);

  return (
    <>
      <IconButton size="small" onClick={() => setOpen(o => !o)}>
        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </IconButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box sx={{ margin: 1 }}>
          <Typography variant="subtitle2">Click Details</Typography>
          {clicks.length === 0 ? (
            <Typography variant="body2" color="text.secondary">No clicks yet.</Typography>
          ) : (
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Timestamp</TableCell>
                  <TableCell>Source</TableCell>
                  <TableCell>Location</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clicks.map((click, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{new Date(click.timestamp).toLocaleString()}</TableCell>
                    <TableCell>{click.source || '-'}</TableCell>
                    <TableCell>{click.city}, {click.country}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Box>
      </Collapse>
    </>
  );
}

export default function StatsTable() {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    // Not using a state manager, just localStorage
    setUrls(getUrls());
    log('info', 'Viewed statistics page');
  }, []);

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Short URL</TableCell>
            <TableCell>Original URL</TableCell>
            <TableCell>Created</TableCell>
            <TableCell>Expires</TableCell>
            <TableCell>Clicks</TableCell>
            <TableCell>Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {urls.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} align="center">
                <Typography variant="body2" color="text.secondary">No URLs shortened yet.</Typography>
              </TableCell>
            </TableRow>
          ) : (
            urls.map((url, idx) => {
              // Not the best for performance, but fine for demo
              const clicks = getClicks(url.shortcode);
              return (
                <TableRow key={idx}>
                  <TableCell>
                    <a href={`/${url.shortcode}`} target="_blank" rel="noopener noreferrer">
                      {window.location.origin}/{url.shortcode}
                    </a>
                  </TableCell>
                  <TableCell style={{ maxWidth: 200, overflowWrap: 'break-word' }}>{url.url}</TableCell>
                  <TableCell>{new Date(url.createdAt).toLocaleString()}</TableCell>
                  <TableCell>{new Date(url.expiry).toLocaleString()}</TableCell>
                  <TableCell>{clicks.length}</TableCell>
                  <TableCell><ClickDetails code={url.shortcode} /></TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
} 