import gulp from 'gulp';
import { log, PluginError } from 'gulp-util';
import del from 'del';
import { spawn } from 'child_process';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackConfig from './webpack.config.babel';

// Config
const buildDir = `${__dirname}/public/assets/build`;

const phpServer = {
  port: 80,
  host: '0.0.0.0',
};

const webpackDevServer = {
  port: 8080,
  host: '0.0.0.0',
};

// Tasks
gulp.task('build', ['clean', 'webpack']);

gulp.task('clean', () => {
  return del([
    `${buildDir}/**/*`,
  ]);
});

gulp.task('webpack', ['clean'], (callback) => {
  const compiler = webpack(webpackConfig);
  compiler.run((err, stats) => {
    if (err) throw new PluginError('webpack', err);

    log('[webpack]', stats.toString({
      colors: true,
    }))

    callback();
  });
});

gulp.task('webpack-dev-server', (callback) => {
  const { port, host } = webpackDevServer;
  const url = `http://${host}:${port}/`;

  ['client', 'admin'].forEach((entry) => {
    webpackConfig.entry[entry].push(`webpack-dev-server/client?${url}`);
    webpackConfig.entry[entry].push('webpack/hot/only-dev-server');
  });

  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

  console.log(webpackConfig);

  const compiler = webpack(webpackConfig);
  new WebpackDevServer(compiler, {
    contentBase: 'public/assets/',
    hot: true,

    stats: { colors: true },
  }).listen(port, host, (err) => {
    if (err) throw new PluginError('webpack-dev-server', err);

    log('[webpack-dev-server]', url);
  })
});

gulp.task('php-server', (callback) => {
  const { port, host } = phpServer;
  const child = spawn('php', [
    '-S',
    `${host}:${port}`,
    '-t',
    `${__dirname}/public`,
    `${__dirname}/router.php`
  ], {
    shell: true,
    stdio: [
      process.stdin,
      process.stdout,
      process.stderr,
    ],
  });
});
