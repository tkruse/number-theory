import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/style.css';
import App from './App';
import {nonNull} from "./utils/collectionUtils";

createRoot(nonNull(document.getElementById('root'))).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
