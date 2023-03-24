import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createClient } from '@supabase/supabase-js';
import { SessionContextProvider } from '@supabase/auth-helpers-react';

const supabase = createClient(
  "https://yklsvomzfeffdejjzgnl.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrbHN2b216ZmVmZmRlamp6Z25sIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzc1MjM2NzcsImV4cCI6MTk5MzA5OTY3N30.U44sv9NK3aq895gyGkH0kMW5aMXHkRUwlaMEozJ3E2w"
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SessionContextProvider supabaseClient={supabase}>
      <App />
    </SessionContextProvider>
  </React.StrictMode>
);

reportWebVitals();
