'use client'

import { useState } from 'react';
import { Button, TextField, Box, Typography, CircularProgress, LinearProgress } from '@mui/material';

export default function LinkCheckerForm({ onSubmit, isLoading, progress }) {
  const [url, setUrl] = useState('');
  const [options, setOptions] = useState({
    checkExternal: false,
    maxDepth: 1,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(url, options);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: '100%'}}>
      <TextField
        fullWidth
        label="Website URL"
        variant="outlined"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://example.com"
        required
        disabled={isLoading}
        sx={{ mb: 2 }}
      />

      {/* <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Options
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField
            label="Max Depth"
            type="number"
            value={options.maxDepth}
            onChange={(e) => setOptions({ ...options, maxDepth: parseInt(e.target.value) || 1 })}
            disabled={isLoading}
            sx={{ width: '120px' }}
            inputProps={{ min: 1, max: 5 }}
          />
        </Box>
      </Box> */}

      {isLoading && (
        <Box sx={{ width: '100%', mb: 2 }}>
          <LinearProgress variant="determinate" value={progress} />
          <Typography variant="body2" color="text.secondary" align="center">
            {progress}% Complete
          </Typography>
        </Box>
      )}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isLoading}
        startIcon={isLoading ? <CircularProgress size={20} /> : null}
        fullWidth
        size="large"
      >
        {isLoading ? 'Checking Links...' : 'Check Links'}
      </Button>
    </Box>
  );
}