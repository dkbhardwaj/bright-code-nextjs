'use client'

import { useState } from 'react';
import Head from 'next/head';
import LinkCheckerForm from './components/LinkCheckerForm';
import ResultsTable from './components/ResultsTable';
import styles from './styles/Home.module.css';

export default function DeadLinkChecker() {

    
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  console.log(results);
  

  const handleCheckLinks = async (url, options) => {
    setIsLoading(true);
    setProgress(0);
    setResults([]);
  
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

     
  
      // Handle the stream
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
  
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
  
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n').filter(line => line.startsWith('data:'));
        
        for (const line of lines) {
          try {
            const data = JSON.parse(line.substring(5).trim());
            if (data.progress) {
              setProgress(data.progress);
            } else if (data.result) {

               
              setResults(prev => [...prev, data.result]);
            } else if (data.error) {
              throw new Error(data.error);
            }
          } catch (e) {
            console.error('Error parsing JSON:', e);
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
        
        {results.length > 0 && (
          <ResultsTable results={results} isLoading={isLoading} />
        )}
      </main>
    </div>
  );
}
