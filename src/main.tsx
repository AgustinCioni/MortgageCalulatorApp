import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Keep track of root instances
const roots = new Map<string, ReactDOM.Root>();

class MortgageCalculatorWidget {
  private elementId: string;

  constructor(elementId: string) {
    this.elementId = elementId;
    this.initialize();
  }

  private initialize() {
    const container = document.getElementById(this.elementId);
    if (!container) {
      console.warn(`Element with id "${this.elementId}" not found`);
      return;
    }

    // Check if a root already exists for this container
    if (!roots.has(this.elementId)) {
      roots.set(this.elementId, ReactDOM.createRoot(container));
    }
    
    this.render();
  }

  private render() {
    const root = roots.get(this.elementId);
    if (!root) return;
    
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }

  destroy() {
    const root = roots.get(this.elementId);
    if (root) {
      root.unmount();
      roots.delete(this.elementId);
    }
  }
}

// Export initialization function
export function initMortgageCalculator(elementId: string) {
  return new MortgageCalculatorWidget(elementId);
}

// Make it globally available
(window as any).initMortgageCalculator = initMortgageCalculator;

// Initialize in development mode
if (import.meta.env.DEV) {
  const elementId = 'mortgage-calculator';
  const existingWidget = (window as any).mortgageCalculatorInstance;
  
  if (existingWidget) {
    existingWidget.destroy();
  }
  
  (window as any).mortgageCalculatorInstance = initMortgageCalculator(elementId);
}