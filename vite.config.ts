import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    lib: {
      entry: 'src/main.tsx', // Entry file for your widget
      name: 'MortgageCalculator',
      fileName: () => 'mortgage-calculator.js',
      formats: ['umd'], // Use UMD for embeddable script
    },
    rollupOptions: {
      external: ['react', 'react-dom'], // Ensure React and React DOM are externalized
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});

