import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ChakraProvider, ColorModeProvider, extendTheme } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const colorModeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({ config: { initialColorMode: colorModeConfig.initialColorMode } });

const DarkModeWrapper = ({ children }) => {
  React.useEffect(() => {
    localStorage.setItem('chakra-ui-color-mode', 'light');
    localStorage.removeItem('chakra-ui-color-mode');
    localStorage.setItem('chakra-ui-color-mode', 'light');
  });
  return <>{children}</>;
};


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DarkModeWrapper>
      <ColorModeProvider options={colorModeConfig}>
        <Provider store={store}>
          <ChakraProvider theme={theme}>
            <App />
          </ChakraProvider>
        </Provider>
      </ColorModeProvider>
    </DarkModeWrapper>
  </React.StrictMode>
);
