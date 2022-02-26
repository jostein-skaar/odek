import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Header';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='App'>
      <Header />
      <main>
        <p>Hei og velkommen til Odek AS sine hjemmesider. Det kommer mer her snart.</p>
        <p>
          Bare ta kontakt med <a href='mailto:post@odek.no'>post@odek.no</a> dersom du lurer på noe.
        </p>
      </main>
    </div>
  );
}

export default App;
