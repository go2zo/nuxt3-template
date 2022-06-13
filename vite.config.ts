import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import windicss from 'vite-plugin-windicss';

export default defineConfig({
  plugins: [eslint(), windicss()],
});
