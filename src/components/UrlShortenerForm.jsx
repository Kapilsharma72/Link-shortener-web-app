import React, { useState } from 'react';
import { Box, Button, Grid, TextField, Typography, Paper, Alert, Stack } from '@mui/material';
// TODO: Maybe move these to a single utils file later
import { validateUrl, validateValidity, validateShortcode } from '../utils/validation';
import { generateShortcode, isShortcodeUnique } from '../utils/shortener';
import { saveUrl, getUrls } from '../utils/storage';
import { log } from '../utils/logger';

const DEFAULT_VALIDITY = 30; // fallback if user doesn't enter
const MAX_URLS = 5;

// Not the cleanest, but works for now
function getInitialRows() {
  let arr = [];
  for (let i = 0; i < MAX_URLS; i++) {
    arr.push({ url: '', validity: '', shortcode: '', error: '', result: null });
  }
  return arr;
}

export default function UrlShortenerForm() {
  const [rows, setRows] = useState(getInitialRows());
  const [submitting, setSubmitting] = useState(false);
  const [globalError, setGlobalError] = useState('');

  // function resetRow(idx) {
  //   // Unused function commented out to fix ESLint error
  // }

  // Not DRY, but clearer for beginners
  function handleChange(idx, field, value) {
    setRows(rws => {
      let copy = [...rws];
      copy[idx][field] = value;
      copy[idx].error = '';
      copy[idx].result = null;
      return copy;
    });
  }

  // Quick validation, not super strict
  function validateRow(row) {
    if (!row.url.trim()) return 'URL required!';
    if (!validateUrl(row.url.trim())) return 'URL looks wrong.';
    if (row.validity && !validateValidity(Number(row.validity))) return 'Validity? Needs to be a positive number.';
    if (row.shortcode && !validateShortcode(row.shortcode)) return 'Shortcode: 4-12 letters/numbers.';
    return '';
  }

  // This could be async, but not needed here
  function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setGlobalError('');
    let anyError = false;
    const urlsInStorage = getUrls();
    const usedShortcodes = new Set(urlsInStorage.map(u => u.shortcode));
    const now = new Date();
    let newRows = rows.map((row, idx) => {
      let error = validateRow(row);
      if (error) {
        anyError = true;
        log('error', 'Validation failed', { url: row.url, error });
        return { ...row, error };
      }
      // Shortcode logic
      let code = row.shortcode || '';
      if (code) {
        if (usedShortcodes.has(code) || !isShortcodeUnique(code)) {
          anyError = true;
          log('error', 'Shortcode collision', { code });
          return { ...row, error: 'Shortcode taken.' };
        }
      } else {
        // Not the best way, but works
        let tries = 0;
        do {
          code = generateShortcode();
          tries++;
        } while ((!isShortcodeUnique(code) || usedShortcodes.has(code)) && tries < 7);
        if (!code || !isShortcodeUnique(code)) {
          anyError = true;
          log('error', 'Shortcode gen fail', { url: row.url });
          return { ...row, error: 'Could not make shortcode.' };
        }
      }
      usedShortcodes.add(code);
      // Validity
      let validity = row.validity ? Number(row.validity) : DEFAULT_VALIDITY;
      let expiry = new Date(now.getTime() + validity * 60000);
      // Save
      let urlObj = {
        url: row.url.trim(),
        shortcode: code,
        createdAt: now.toISOString(),
        expiry: expiry.toISOString(),
        validity,
      };
      saveUrl(urlObj);
      log('info', 'Shortened URL created', { url: urlObj.url, code });
      return {
        ...row,
        result: {
          shortcode: code,
          expiry: expiry.toLocaleString(),
          url: row.url.trim(),
        },
        error: '',
        url: '',
        validity: '',
        shortcode: '',
      };
    });
    setRows(newRows);
    setSubmitting(false);
    if (anyError) setGlobalError('Some URLs failed. Check errors below.');
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      {/* Not the prettiest, but works */}
      <Stack spacing={2}>
        {globalError && <Alert severity="error">{globalError}</Alert>}
        {rows.map((row, idx) => (
          <Paper key={idx} sx={{ p: 2, mb: 1 }} elevation={2}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={5}>
                <TextField
                  label="Long URL"
                  value={row.url}
                  onChange={e => handleChange(idx, 'url', e.target.value)}
                  fullWidth
                  required
                  error={!!row.error && !row.result}
                  helperText={row.error && !row.result ? row.error : ''}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField
                  label="Validity (min)"
                  value={row.validity}
                  onChange={e => handleChange(idx, 'validity', e.target.value.replace(/[^0-9]/g, ''))}
                  fullWidth
                  size="small"
                  placeholder={DEFAULT_VALIDITY}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  label="Custom Shortcode"
                  value={row.shortcode}
                  onChange={e => handleChange(idx, 'shortcode', e.target.value)}
                  fullWidth
                  size="small"
                  inputProps={{ maxLength: 12 }}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                {row.result && (
                  <Box>
                    <Typography variant="body2" color="primary">
                      Short URL:
                    </Typography>
                    <Typography variant="body2">
                      <a href={`/${row.result.shortcode}`} target="_blank" rel="noopener noreferrer">
                        {window.location.origin}/{row.result.shortcode}
                      </a>
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Expires: {row.result.expiry}
                    </Typography>
                  </Box>
                )}
              </Grid>
            </Grid>
          </Paper>
        ))}
        <Button type="submit" variant="contained" color="primary" disabled={submitting}>
          Shorten URLs
        </Button>
      </Stack>
    </Box>
  );
} 