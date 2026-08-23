import { useEffect } from 'react';
import { useInverter } from '../context/InverterContext';

export const useKeyboardControls = () => {
  const { dispatch } = useInverter();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ignora se o usuário estiver digitando em um input de texto/slider com foco
      const target = event.target as HTMLElement;
      if (target.tagName === 'INPUT' && target.getAttribute('type') === 'text') {
        return;
      }

      const key = event.key.toLowerCase();

      switch (key) {
        case 'p':
        case 'enter':
          event.preventDefault();
          dispatch({ type: 'PRESS_PROG' });
          break;

        case 'arrowup':
          event.preventDefault();
          dispatch({ type: 'PRESS_UP' });
          break;

        case 'arrowdown':
          event.preventDefault();
          dispatch({ type: 'PRESS_DOWN' });
          break;

        case 'i':
        case 'r':
          event.preventDefault();
          dispatch({ type: 'PRESS_RUN' });
          break;

        case 'o':
        case ' ':
        case 'escape':
          event.preventDefault();
          dispatch({ type: 'PRESS_STOP' });
          break;

        case 'l':
          event.preventDefault();
          dispatch({ type: 'PRESS_LOCREM' });
          break;

        case 'd':
          event.preventDefault();
          dispatch({ type: 'PRESS_DIRECTION' });
          break;

        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [dispatch]);
};