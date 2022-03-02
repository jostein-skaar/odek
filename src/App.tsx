import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Header';
import { AnagramPuzzle } from './AnagramPuzzle';

function App() {
  return (
    <div className='App'>
      <Header />
      <main>
        <p>Hei og velkommen til Odek AS sine hjemmesider. Det kommer enda mer her snart.</p>
        <div className='anagram-puzzle'>
          <AnagramPuzzle anagram='ODEK' solution='KODE' />
        </div>
        <p>
          Bare ta kontakt med Jostein på <a href='mailto:jostein@odek.no'>jostein@odek.no</a> dersom du lurer på noe.
        </p>
      </main>
    </div>
  );
}

export default App;
