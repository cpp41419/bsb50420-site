import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
    test: {
        globals: true,
        environment: 'node',
        include: [
            'src/**/*.test.ts',
            'scripts/**/*.test.ts',
            '../packages/@cpp/ui/src/**/*.test.ts',
        ],
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@cpp/config': path.resolve(__dirname, '../packages/@cpp/config/src/index.ts'),
        },
    },
});
