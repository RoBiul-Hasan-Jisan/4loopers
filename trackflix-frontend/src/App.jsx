import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  // ✅ Declare isLoggedIn here
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      {/* ✅ Pass isLoggedIn to Header */}
      <Header isLoggedIn={isLoggedIn} />

      <main className="flex-grow">
        {/* ✅ Pass context to child routes */}
        <Outlet context={{ isLoggedIn, setIsLoggedIn }} />
      </main>

      <Footer />
    </div>
  );
}

export default App;
