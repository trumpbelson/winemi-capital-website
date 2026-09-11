import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import Login from './pages/Login';
import Legal from './pages/Legal';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-primary text-ivory">
        <Routes>
          <Route path="/" element={<><Navigation /><Home /><Footer /><WhatsAppButton /></>} />
          <Route path="/login" element={<><Navigation /><Login /><Footer /><WhatsAppButton /></>} />
          <Route path="/register" element={<><Navigation /><Login mode="register" /><Footer /><WhatsAppButton /></>} />
          <Route path="/privacy" element={<><Navigation /><Legal type="privacy" /><Footer /><WhatsAppButton /></>} />
          <Route path="/terms" element={<><Navigation /><Legal type="terms" /><Footer /><WhatsAppButton /></>} />
          <Route path="/risk-disclosure" element={<><Navigation /><Legal type="risk" /><Footer /><WhatsAppButton /></>} />
          <Route path="/disclaimer" element={<><Navigation /><Legal type="disclaimer" /><Footer /><WhatsAppButton /></>} />
          <Route path="/cookie-policy" element={<><Navigation /><Legal type="cookie" /><Footer /><WhatsAppButton /></>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
