import ReactDOM from 'react-dom/client';
import { Analytics } from '@vercel/analytics/react';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from './store/auth.tsx';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
    // <React.StrictMode>
    <BrowserRouter>
        <AuthProvider>
            <App />
            <Analytics />
        </AuthProvider>
    </BrowserRouter>
    //  </React.StrictMode>
);
