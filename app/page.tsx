'use client';

import React, { useState } from 'react';
import styles from './page.module.css';

export default function Page() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setSelectedFile(file);
  };

  const handleProcessClick = async () => {
    if (!selectedFile) {
      alert('Please select a file to process.');
      return;
    }

    setIsProcessing(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log('Processing', selectedFile);
      alert('Processing complete');
    } catch (error) {
      console.error('Processing failed', error);
      alert('Processing failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className={styles.container}>
      <img src="/back.png" alt="Logo" className={styles.logo} />
      <h1 className={styles.title}>Memories Brought Back</h1>
      <p className={styles.description}>
        Restore your cherished memories with our advanced image restoration app.
        Upload your old or damaged photos and watch them come back to life!
      </p>
      <div className={styles.uploadSection}>
      <input
          id="file_upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className={styles.fileInput}
          aria-label="File upload"
        />
        <label htmlFor="file_upload" className={styles.uploadButton}>
          Choose file
        </label>
      </div>
      <button
        className={`${styles.processButton} ${isProcessing ? styles.processing : ''}`}
        onClick={handleProcessClick}
        disabled={isProcessing}
      >
        {isProcessing ? 'Processing...' : 'Process'}
      </button>
    </div>
    
  );
}