const baseConfig = {
  entry: {
    admin: [`${__dirname}/src/admin/entry.js`],
    client: [`${__dirname}/src/client/entry.js`],
  },

  output: {
    path: `${__dirname}/public/assets/build`,
    filename: '[name].bundle.js',
  },

  devtool: 'source-map',

  plugins: [],

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        query: {
          presets: [
            'es2015-native-modules',
            'react',
          ],
          plugins: [
            'transform-object-rest-spread',
          ],
        },
      },
      {
        test: /\.scss$/,
        loaders: [
          'style',
          'css?modules&localIdentName=[name]--[local]--[hash:base64:5]',
          'sass',
        ],
      }
    ],
  },
};

const productionConfig = {
  ...baseConfig,
};

const developmentConfig = {
  ...baseConfig,
};

export default process.env.NODE_ENV === 'production' ? productionConfig : developmentConfig;
