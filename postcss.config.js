import path from 'path';

export default {
  plugins: {
    tailwindcss: {
      config: path.resolve(__dirname, './tailwind.config.ts')
    },
    autoprefixer: {},
  },
}
