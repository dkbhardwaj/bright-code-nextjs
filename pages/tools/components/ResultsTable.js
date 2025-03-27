import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip } from '@mui/material';
import { CheckCircle, Error } from '@mui/icons-material';

export default function ResultsTable({ results, isLoading }) {
  return (
    <TableContainer component={Paper} sx={{ mt: 4, width: '100%', maxWidth: '1200px' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Status</TableCell>
            <TableCell>URL</TableCell>
            <TableCell>Link Text</TableCell>
            <TableCell>Source Page</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results?.map((result, index) => (
            <TableRow key={index}>
              <TableCell>
                {result.isBroken ? (
                  <Chip icon={<Error />} label={result.status || 'Error'} color="error" />
                ) : (
                  <Chip icon={<CheckCircle />} label={result.status} color="success" />
                )}
              </TableCell>
              <TableCell>
                <a href={result.url} target="_blank" rel="noopener noreferrer">
                  {result.url}
                </a>
              </TableCell>
              <TableCell>{result.text || '(no text)'}</TableCell>
              <TableCell>
                <a href={result.sourceUrl} target="_blank" rel="noopener noreferrer">
                  {result.sourceUrl}
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}