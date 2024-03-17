import React from 'react';
import { ChakraProvider } from '@chakra-ui/react'
import { ColorModeScript } from '@chakra-ui/react'
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';
import theme from './themes';

const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(
  <>
    <ChakraProvider>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </ChakraProvider>
  </>,
)
