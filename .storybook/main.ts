import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx|js|jsx)'],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  async viteFinal(config) {
    return mergeConfig(config, {
      define: {
        'process.env': {},
        global: 'globalThis',
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '../src'),
          'next/image': path.resolve(__dirname, './next-image-stub.tsx'),
        },
      },
      build: {
        rollupOptions: {
          external: (id: any) => id.startsWith('https://'),
        },
      },
    });
  },
};

export default config;
