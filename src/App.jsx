import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [pdfBase64, setPdfBase64] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlBase64 = params.get('pdf');
    if (urlBase64) {
      setPdfBase64(urlBase64);
    }
  }, []);

  const handlePrint = () => {
    if (!pdfBase64.startsWith('data:application/pdf;base64,')) {
      alert('Please provide a valid base64 PDF string.');
      return;
    }

    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = pdfBase64;
    document.body.appendChild(iframe);

    iframe.onload = function () {
      setTimeout(() => {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
      }, 100);
    };
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Base64 PDF Preview & Print</h2>
        <textarea
          rows={6}
          cols={80}
          placeholder="Paste your base64 PDF string here..."
          value={pdfBase64}
          onChange={(e) => setPdfBase64(e.target.value)}
        />
        {pdfBase64.startsWith('data:application/pdf;base64,') && (
          <iframe
            title="PDF Preview"
            src={pdfBase64}
            width="100%"
            height="500px"
            style={{ border: '1px solid #ccc', marginTop: '1rem' }}
          />
        )}
      </header>
    </div>
  );
}

export default App;
