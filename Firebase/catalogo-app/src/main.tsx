import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ConsultaTitulos from './components/ConsultaTitulos';

createRoot(document.getElementById('app')!).render(
    <StrictMode>
        <ConsultaTitulos />
    </StrictMode>
);