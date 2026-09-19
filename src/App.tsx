import { ToastProvider } from './components/Toast';
import { HorrorGamePage } from './pages/HorrorGamePage';

export default function App() {
  return (
    <ToastProvider>
      <HorrorGamePage />
    </ToastProvider>
  );
}
