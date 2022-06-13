import { defineConfig } from 'windicss/helpers';
import aspectRatio from 'windicss/plugin/aspect-ratio';
import forms from 'windicss/plugin/forms';
import lineClamp from 'windicss/plugin/line-clamp';
import typography from 'windicss/plugin/typography';

export default defineConfig({
  attributify: true,
  darkMode: 'class',
  preflight: true,
  plugins: [aspectRatio, forms, lineClamp, typography],
});
