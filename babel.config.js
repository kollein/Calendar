module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.jsx',
          '.js',
          '.json',
          '.html',
        ],
        alias: {
          '@': './src',
          '@screens': './src/screens',
          '@components': './src/components',
          '@assets': './src/assets',
        },
      },
    ],
  ],
};
