import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import './styles/layout.css';
import './styles/navbar.css';
import './styles/footer.css';
import './styles/home.css';
import './styles/checklist.css';
import './styles/dashboard.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
