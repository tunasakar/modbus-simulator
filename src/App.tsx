import React, { useEffect, useState } from 'react';
import { ModbusSimulator } from './components/ModbusSimulator';
import { Footer } from './components/Footer';

function App() {
  const [countdown, setCountdown] = useState(180);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          window.location.reload();
          return 180;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(countdownInterval);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 gradient-bg">
        <ModbusSimulator countdown={countdown} />
      </main>
      <Footer />
    </div>
  );
}

export default App;