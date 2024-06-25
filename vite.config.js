import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build', // المجلد الذي يتم فيه إنتاج الملفات بعد البناء
    assetsDir: '.',
  },
  base: './',
})

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   build: {
//     outDir: 'build',  // تغيير المجلد الافتراضي للإخراج إلى 'build'
//   },
//   base: '/jeo/',
// });
