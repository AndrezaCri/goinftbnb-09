
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

// Smooth scroll to top on page load
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
};

// Execute scroll to top after DOM is ready and content is loaded
window.addEventListener('load', () => {
  // Small delay to ensure all content is rendered
  setTimeout(scrollToTop, 100);
});

// Fallback for cases where window.load doesn't fire
if (document.readyState === 'complete') {
  setTimeout(scrollToTop, 100);
} else {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(scrollToTop, 100);
  });
}

const root = createRoot(rootElement);
root.render(<App />);
