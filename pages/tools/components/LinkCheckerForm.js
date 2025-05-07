"use client";

import { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  CircularProgress,
  LinearProgress,
} from "@mui/material";

export default function LinkCheckerForm({ onSubmit, isLoading, progress }) {
  const [url, setUrl] = useState("");
  console.log(url, "LinkCheckerForm");

  const [options, setOptions] = useState({
    checkExternal: false,
    maxDepth: 1,
  });

  // Optional: Reset URL and options when not loading
  useEffect(() => {
    if (!isLoading && progress === 100) {
      setUrl(""); // Clear after success
    }
  }, [isLoading, progress]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url) return;

    // Reset progress on new submission if needed
    onSubmit(url.trim(), options);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: "100%" }}>
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

      {isLoading && (
        <Box sx={{ width: "100%", mb: 2 }}>
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
        disabled={isLoading || !url}
        startIcon={isLoading ? <CircularProgress size={20} /> : null}
        fullWidth
        size="large"
      >
        {isLoading ? "Checking Links..." : "Check Links"}
      </Button>
    </Box>
  );
}
