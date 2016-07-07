import autoprefixer from 'autoprefixer';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

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

  plugins: [
    new ExtractTextPlugin('[name].css'),
  ],

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
        loaders: ExtractTextPlugin.extract('style', [
          'css?modules&localIdentName=[name]--[local]--[hash:base64:5]',
          'postcss',
          'sass',
        ]),
      },
      {
        test: /\.css$/,
        loaders: ExtractTextPlugin.extract('style', [
          'css',
          'postcss',
        ]),
      }
    ],
  },

  postcss: () => [autoprefixer],
};

const productionConfig = {
  ...baseConfig,
};

const developmentConfig = {
  ...baseConfig,
};

export default process.env.NODE_ENV === 'production' ? productionConfig : developmentConfig;
