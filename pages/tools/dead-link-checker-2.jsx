'use client'

import { useState } from 'react';
import Head from 'next/head';
import LinkCheckerForm from './components/LinkCheckerForm';
import ResultsTable from './components/ResultsTable';
import styles from './styles/Home.module.css';

export default function DeadLinkChecker() {

    console.log("dlc 2.0")
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState();

  const handleCheckLinks = async (url, options) => {
    setIsLoading(true);
    setProgress(0);
    setResults([]);
    setError(null);
  
    try {
      const response = await fetch('/api/check-links', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, options }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
  
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
  
        buffer += decoder.decode(value, { stream: true });
        
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';
  
        for (const line of lines) {
          if (!line.startsWith('data:')) continue;
  
          try {
            const dataStr = line.substring(5).trim();
            if (!dataStr) continue;
  
            const data = JSON.parse(dataStr);
            
            if (data.progress !== undefined) {
              setProgress(data.progress);
            }
            
            if (data.result) {
              setResults(prev => [...prev, data.result]);
            }
            
            if (data.error) {
              throw new Error(data.error);
            }
            
            if (data.complete) {
              setProgress(100);
            }
          } catch (e) {
            console.error('Error parsing JSON chunk:', e, 'Line:', line);
            // Continue processing even if one message fails
          }
        }
      }
    } catch (error) {
      console.error('Error checking links:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>404 Link Checker</title>
        <meta name="description" content="Check for broken links on your website" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>404 Link Checker</h1>
        <p className={styles.description}>
          Find broken links on your website
        </p>

        <LinkCheckerForm onSubmit={handleCheckLinks} isLoading={isLoading} progress={progress} />
       {console.log(results.length)}
        {results.length > 0 && (
          <ResultsTable results={results} isLoading={isLoading} />
        )}
      </main>
    </div>
  );
}
