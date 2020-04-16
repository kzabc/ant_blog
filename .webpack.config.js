/* eslint-disable */
export default {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  node: {
    setImmediate: false,
    process: 'mock',
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  output: {
    path: '/Users/zkay/coding/WEB/new/ant_blog/dist',
    filename: '[name].js',
    chunkFilename: '[name].async.js',
    publicPath: '/',
    devtoolModuleFilenameTemplate: function() {
      /* omitted long function */
    },
    pathinfo: true,
  },
  resolve: {
    symlinks: true,
    alias: {
      dva: '/Users/zkay/coding/WEB/new/ant_blog/node_modules/dva',
      'dva-loading':
        '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_dva-loading@3.0.6@dva-loading/dist/index.js',
      'path-to-regexp':
        '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_path-to-regexp@1.7.0@path-to-regexp/index.js',
      'object-assign':
        '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_object-assign@4.1.1@object-assign/index.js',
      'umi/locale':
        '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_umi-plugin-locale@2.11.5@umi-plugin-locale/lib/locale.js',
      'react-intl': '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_react-intl@2.7.2@react-intl',
      react: '/Users/zkay/coding/WEB/new/ant_blog/node_modules/react',
      'react-dom': '/Users/zkay/coding/WEB/new/ant_blog/node_modules/react-dom',
      'react-router':
        '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_react-router@5.1.2@react-router',
      'react-router-dom':
        '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_react-router-dom@5.1.2@react-router-dom',
      'react-router-config':
        '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_react-router-config@5.1.1@react-router-config',
      history: '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_umi-history@0.1.2@umi-history',
      '@': '/Users/zkay/coding/WEB/new/ant_blog/src/',
      '@tmp': '/Users/zkay/coding/WEB/new/ant_blog/src/pages/.umi',
      '@@': '/Users/zkay/coding/WEB/new/ant_blog/src/pages/.umi',
      umi: '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_umi@2.13.12@umi',
      'regenerator-runtime':
        '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_regenerator-runtime@0.13.2@regenerator-runtime',
      antd: '/Users/zkay/coding/WEB/new/ant_blog/node_modules/antd',
      'antd-mobile':
        '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_antd-mobile@2.3.1@antd-mobile',
    },
    extensions: [
      '.web.js',
      '.wasm',
      '.mjs',
      '.js',
      '.web.jsx',
      '.jsx',
      '.web.ts',
      '.ts',
      '.web.tsx',
      '.tsx',
      '.json',
    ],
    modules: [
      'node_modules',
      '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_af-webpack@1.14.9@af-webpack/node_modules',
      '/Users/zkay/coding/WEB/new/ant_blog/node_modules/',
    ],
  },
  resolveLoader: {
    modules: [
      'node_modules',
      '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_af-webpack@1.14.9@af-webpack/node_modules',
    ],
  },
  module: {
    rules: [
      /* config.module.rule('exclude') */
      {
        exclude: [
          /\.json$/,
          /\.(js|jsx|ts|tsx|mjs|wasm)$/,
          /\.(graphql|gql)$/,
          /\.(css|less|scss|sass|styl(us)?)$/,
        ],
        use: [
          /* config.module.rule('exclude').use('url-loader') */
          {
            loader:
              '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_umi-url-pnp-loader@1.1.2@umi-url-pnp-loader/dist/cjs.js',
            options: {
              limit: 10000,
              name: 'static/[name].[hash:8].[ext]',
            },
          },
        ],
      },
      /* config.module.rule('mjs-require') */
      {
        test: /\.mjs$/,
        type: 'javascript/auto',
        include: ['/Users/zkay/coding/WEB/new/ant_blog'],
      },
      /* config.module.rule('mjs') */
      {
        test: /\.mjs$/,
        include: ['/Users/zkay/coding/WEB/new/ant_blog'],
        use: [
          /* config.module.rule('mjs').use('babel-loader') */
          {
            loader:
              '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_babel-loader@8.0.6@babel-loader/lib/index.js',
            options: {
              presets: [
                [
                  '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_babel-preset-umi@1.8.4@babel-preset-umi/lib/index.js',
                  {
                    targets: {
                      chrome: 49,
                      firefox: 64,
                      safari: 10,
                      edge: 13,
                      ios: 10,
                      ie: 11,
                    },
                    env: {
                      useBuiltIns: 'entry',
                      corejs: 2,
                    },
                  },
                ],
              ],
              plugins: [
                '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_umi-build-dev@1.18.5@umi-build-dev/lib/plugins/afwebpack-config/lockCoreJSVersionPlugin.js',
                [
                  '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_babel-plugin-import@1.13.0@babel-plugin-import/lib/index.js',
                  {
                    libraryName: 'antd',
                    libraryDirectory: 'es',
                    style: true,
                  },
                  'antd',
                ],
                [
                  '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_babel-plugin-import@1.13.0@babel-plugin-import/lib/index.js',
                  {
                    libraryName: 'antd-mobile',
                    libraryDirectory: 'es',
                    style: true,
                  },
                  'antd-mobile',
                ],
                [
                  '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_babel-plugin-import@1.13.0@babel-plugin-import/lib/index.js',
                  {
                    libraryName: 'ant-design-pro',
                    libraryDirectory: 'lib',
                    style: true,
                    camel2DashComponentName: false,
                  },
                  'ant-design-pro',
                ],
                [
                  '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_umi-build-dev@1.18.5@umi-build-dev/lib/plugins/commands/block/sdk/flagBabelPlugin/index.js',
                  {
                    doTransform(filename) {
                      return routeComponents.includes(api.winPath(filename));
                    },
                  },
                ],
                [
                  'prismjs',
                  {
                    languages: [
                      'markup',
                      'markup-templating',
                      'css',
                      'less',
                      'scss',
                      'clike',
                      'javascript',
                      'typescript',
                      'jsx',
                      'tsx',
                      'php',
                      'java',
                      'bash',
                      'ini',
                      'json',
                      'sql',
                      'yaml',
                    ],
                    plugins: ['line-numbers', 'show-language', 'copy-to-clipboard'],
                    theme: 'okaidia',
                    css: true,
                  },
                ],
                '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_babel-plugin-dva-hmr@0.4.2@babel-plugin-dva-hmr/lib/index.js',
                [
                  '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_babel-plugin-named-asset-import@0.3.2@babel-plugin-named-asset-import/index.js',
                  {
                    loaderMap: {
                      svg: {
                        ReactComponent:
                          '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_af-webpack@1.14.9@af-webpack/lib/svgr.js?-prettier,-svgo![path]',
                      },
                    },
                  },
                ],
              ],
              sourceType: 'unambiguous',
              cacheDirectory: true,
              babelrc: false,
              customize:
                '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_babel-preset-umi@1.8.4@babel-preset-umi/lib/webpack-overrides.js',
            },
          },
        ],
      },
      /* config.module.rule('js') */
      {
        test: /\.js$/,
        include: ['/Users/zkay/coding/WEB/new/ant_blog'],
        exclude: [/node_modules/],
        use: [
          /* config.module.rule('js').use('babel-loader') */
          {
            loader:
              '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_babel-loader@8.0.6@babel-loader/lib/index.js',
            options: {
              presets: [
                [
                  '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_babel-preset-umi@1.8.4@babel-preset-umi/lib/index.js',
                  {
                    targets: {
                      chrome: 49,
                      firefox: 64,
                      safari: 10,
                      edge: 13,
                      ios: 10,
                      ie: 11,
                    },
                    env: {
                      useBuiltIns: 'entry',
                      corejs: 2,
                    },
                  },
                ],
              ],
              plugins: [
                '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_umi-build-dev@1.18.5@umi-build-dev/lib/plugins/afwebpack-config/lockCoreJSVersionPlugin.js',
                [
                  '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_babel-plugin-import@1.13.0@babel-plugin-import/lib/index.js',
                  {
                    libraryName: 'antd',
                    libraryDirectory: 'es',
                    style: true,
                  },
                  'antd',
                ],
                [
                  '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_babel-plugin-import@1.13.0@babel-plugin-import/lib/index.js',
                  {
                    libraryName: 'antd-mobile',
                    libraryDirectory: 'es',
                    style: true,
                  },
                  'antd-mobile',
                ],
                [
                  '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_babel-plugin-import@1.13.0@babel-plugin-import/lib/index.js',
                  {
                    libraryName: 'ant-design-pro',
                    libraryDirectory: 'lib',
                    style: true,
                    camel2DashComponentName: false,
                  },
                  'ant-design-pro',
                ],
                [
                  '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_umi-build-dev@1.18.5@umi-build-dev/lib/plugins/commands/block/sdk/flagBabelPlugin/index.js',
                  {
                    doTransform(filename) {
                      return routeComponents.includes(api.winPath(filename));
                    },
                  },
                ],
                [
                  'prismjs',
                  {
                    languages: [
                      'markup',
                      'markup-templating',
                      'css',
                      'less',
                      'scss',
                      'clike',
                      'javascript',
                      'typescript',
                      'jsx',
                      'tsx',
                      'php',
                      'java',
                      'bash',
                      'ini',
                      'json',
                      'sql',
                      'yaml',
                    ],
                    plugins: ['line-numbers', 'show-language', 'copy-to-clipboard'],
                    theme: 'okaidia',
                    css: true,
                  },
                ],
                '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_babel-plugin-dva-hmr@0.4.2@babel-plugin-dva-hmr/lib/index.js',
                [
                  '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_babel-plugin-named-asset-import@0.3.2@babel-plugin-named-asset-import/index.js',
                  {
                    loaderMap: {
                      svg: {
                        ReactComponent:
                          '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_af-webpack@1.14.9@af-webpack/lib/svgr.js?-prettier,-svgo![path]',
                      },
                    },
                  },
                ],
              ],
              sourceType: 'unambiguous',
              cacheDirectory: true,
              babelrc: false,
              customize:
                '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_babel-preset-umi@1.8.4@babel-preset-umi/lib/webpack-overrides.js',
            },
          },
        ],
      },
      /* config.module.rule('jsx') */
      {
        test: /\.jsx$/,
        include: ['/Users/zkay/coding/WEB/new/ant_blog'],
        use: [
          /* config.module.rule('jsx').use('babel-loader') */
          {
            loader:
              '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_babel-loader@8.0.6@babel-loader/lib/index.js',
            options: {
              presets: [
                [
                  '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_babel-preset-umi@1.8.4@babel-preset-umi/lib/index.js',
                  {
                    targets: {
                      chrome: 49,
                      firefox: 64,
                      safari: 10,
                      edge: 13,
                      ios: 10,
                      ie: 11,
                    },
                    env: {
                      useBuiltIns: 'entry',
                      corejs: 2,
                    },
                  },
                ],
              ],
              plugins: [
                '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_umi-build-dev@1.18.5@umi-build-dev/lib/plugins/afwebpack-config/lockCoreJSVersionPlugin.js',
                [
                  '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_babel-plugin-import@1.13.0@babel-plugin-import/lib/index.js',
                  {
                    libraryName: 'antd',
                    libraryDirectory: 'es',
                    style: true,
                  },
                  'antd',
                ],
                [
                  '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_babel-plugin-import@1.13.0@babel-plugin-import/lib/index.js',
                  {
                    libraryName: 'antd-mobile',
                    libraryDirectory: 'es',
                    style: true,
                  },
                  'antd-mobile',
                ],
                [
                  '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_babel-plugin-import@1.13.0@babel-plugin-import/lib/index.js',
                  {
                    libraryName: 'ant-design-pro',
                    libraryDirectory: 'lib',
                    style: true,
                    camel2DashComponentName: false,
                  },
                  'ant-design-pro',
                ],
                [
                  '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_umi-build-dev@1.18.5@umi-build-dev/lib/plugins/commands/block/sdk/flagBabelPlugin/index.js',
                  {
                    doTransform(filename) {
                      return routeComponents.includes(api.winPath(filename));
                    },
                  },
                ],
                [
                  'prismjs',
                  {
                    languages: [
                      'markup',
                      'markup-templating',
                      'css',
                      'less',
                      'scss',
                      'clike',
                      'javascript',
                      'typescript',
                      'jsx',
                      'tsx',
                      'php',
                      'java',
                      'bash',
                      'ini',
                      'json',
                      'sql',
                      'yaml',
                    ],
                    plugins: ['line-numbers', 'show-language', 'copy-to-clipboard'],
                    theme: 'okaidia',
                    css: true,
                  },
                ],
                '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_babel-plugin-dva-hmr@0.4.2@babel-plugin-dva-hmr/lib/index.js',
                [
                  '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_babel-plugin-named-asset-import@0.3.2@babel-plugin-named-asset-import/index.js',
                  {
                    loaderMap: {
                      svg: {
                        ReactComponent:
                          '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_af-webpack@1.14.9@af-webpack/lib/svgr.js?-prettier,-svgo![path]',
                      },
                    },
                  },
                ],
              ],
              sourceType: 'unambiguous',
              cacheDirectory: true,
              babelrc: false,
              customize:
                '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_babel-preset-umi@1.8.4@babel-preset-umi/lib/webpack-overrides.js',
            },
          },
        ],
      },
      /* config.module.rule('extraBabelInclude_0') */
      {
        test: /\.jsx?$/,
        include: [
          '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_umi-plugin-ui@1.5.3@umi-plugin-ui/bubble',
        ],
        use: [
          /* config.module.rule('extraBabelInclude_0').use('babel-loader') */
          {
            loader:
              '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_babel-loader@8.0.6@babel-loader/lib/index.js',
            options: {
              presets: [
                [
                  '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_babel-preset-umi@1.8.4@babel-preset-umi/lib/index.js',
                  {
                    targets: {
                      chrome: 49,
                      firefox: 64,
                      safari: 10,
                      edge: 13,
                      ios: 10,
                      ie: 11,
                    },
                    env: {
                      useBuiltIns: 'entry',
                      corejs: 2,
                    },
                  },
                ],
              ],
              plugins: [
                '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_umi-build-dev@1.18.5@umi-build-dev/lib/plugins/afwebpack-config/lockCoreJSVersionPlugin.js',
                [
                  '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_babel-plugin-import@1.13.0@babel-plugin-import/lib/index.js',
                  {
                    libraryName: 'antd',
                    libraryDirectory: 'es',
                    style: true,
                  },
                  'antd',
                ],
                [
                  '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_babel-plugin-import@1.13.0@babel-plugin-import/lib/index.js',
                  {
                    libraryName: 'antd-mobile',
                    libraryDirectory: 'es',
                    style: true,
                  },
                  'antd-mobile',
                ],
                [
                  '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_babel-plugin-import@1.13.0@babel-plugin-import/lib/index.js',
                  {
                    libraryName: 'ant-design-pro',
                    libraryDirectory: 'lib',
                    style: true,
                    camel2DashComponentName: false,
                  },
                  'ant-design-pro',
                ],
                [
                  '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_umi-build-dev@1.18.5@umi-build-dev/lib/plugins/commands/block/sdk/flagBabelPlugin/index.js',
                  {
                    doTransform(filename) {
                      return routeComponents.includes(api.winPath(filename));
                    },
                  },
                ],
                [
                  'prismjs',
                  {
                    languages: [
                      'markup',
                      'markup-templating',
                      'css',
                      'less',
                      'scss',
                      'clike',
                      'javascript',
                      'typescript',
                      'jsx',
                      'tsx',
                      'php',
                      'java',
                      'bash',
                      'ini',
                      'json',
                      'sql',
                      'yaml',
                    ],
                    plugins: ['line-numbers', 'show-language', 'copy-to-clipboard'],
                    theme: 'okaidia',
                    css: true,
                  },
                ],
                '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_babel-plugin-dva-hmr@0.4.2@babel-plugin-dva-hmr/lib/index.js',
                [
                  '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_babel-plugin-named-asset-import@0.3.2@babel-plugin-named-asset-import/index.js',
                  {
                    loaderMap: {
                      svg: {
                        ReactComponent:
                          '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_af-webpack@1.14.9@af-webpack/lib/svgr.js?-prettier,-svgo![path]',
                      },
                    },
                  },
                ],
              ],
              sourceType: 'unambiguous',
              cacheDirectory: true,
              babelrc: false,
              customize:
                '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_babel-preset-umi@1.8.4@babel-preset-umi/lib/webpack-overrides.js',
            },
          },
        ],
      },
      /* config.module.rule('extraBabelInclude_1') */
      {
        test: /\.jsx?$/,
        include: [
          function() {
            /* omitted long function */
          },
        ],
        use: [
          /* config.module.rule('extraBabelInclude_1').use('babel-loader') */
          {
            loader:
              '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_babel-loader@8.0.6@babel-loader/lib/index.js',
            options: {
              presets: [
                [
                  '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_babel-preset-umi@1.8.4@babel-preset-umi/lib/index.js',
                  {
                    targets: {
                      chrome: 49,
                      firefox: 64,
                      safari: 10,
                      edge: 13,
                      ios: 10,
                      ie: 11,
                    },
                    env: {
                      useBuiltIns: 'entry',
                      corejs: 2,
                    },
                  },
                ],
              ],
              plugins: [
                '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_umi-build-dev@1.18.5@umi-build-dev/lib/plugins/afwebpack-config/lockCoreJSVersionPlugin.js',
                [
                  '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_babel-plugin-import@1.13.0@babel-plugin-import/lib/index.js',
                  {
                    libraryName: 'antd',
                    libraryDirectory: 'es',
                    style: true,
                  },
                  'antd',
                ],
                [
                  '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_babel-plugin-import@1.13.0@babel-plugin-import/lib/index.js',
                  {
                    libraryName: 'antd-mobile',
                    libraryDirectory: 'es',
                    style: true,
                  },
                  'antd-mobile',
                ],
                [
                  '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_babel-plugin-import@1.13.0@babel-plugin-import/lib/index.js',
                  {
                    libraryName: 'ant-design-pro',
                    libraryDirectory: 'lib',
                    style: true,
                    camel2DashComponentName: false,
                  },
                  'ant-design-pro',
                ],
                [
                  '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_umi-build-dev@1.18.5@umi-build-dev/lib/plugins/commands/block/sdk/flagBabelPlugin/index.js',
                  {
                    doTransform(filename) {
                      return routeComponents.includes(api.winPath(filename));
                    },
                  },
                ],
                [
                  'prismjs',
                  {
                    languages: [
                      'markup',
                      'markup-templating',
                      'css',
                      'less',
                      'scss',
                      'clike',
                      'javascript',
                      'typescript',
                      'jsx',
                      'tsx',
                      'php',
                      'java',
                      'bash',
                      'ini',
                      'json',
                      'sql',
                      'yaml',
                    ],
                    plugins: ['line-numbers', 'show-language', 'copy-to-clipboard'],
                    theme: 'okaidia',
                    css: true,
                  },
                ],
                '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_babel-plugin-dva-hmr@0.4.2@babel-plugin-dva-hmr/lib/index.js',
                [
                  '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_babel-plugin-named-asset-import@0.3.2@babel-plugin-named-asset-import/index.js',
                  {
                    loaderMap: {
                      svg: {
                        ReactComponent:
                          '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_af-webpack@1.14.9@af-webpack/lib/svgr.js?-prettier,-svgo![path]',
                      },
                    },
                  },
                ],
              ],
              sourceType: 'unambiguous',
              cacheDirectory: true,
              babelrc: false,
              customize:
                '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_babel-preset-umi@1.8.4@babel-preset-umi/lib/webpack-overrides.js',
            },
          },
        ],
      },
      /* config.module.rule('ts') */
      {
        test: /\.tsx?$/,
        use: [
          /* config.module.rule('ts').use('babel-loader') */
          {
            loader:
              '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_babel-loader@8.0.6@babel-loader/lib/index.js',
            options: {
              presets: [
                [
                  '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_babel-preset-umi@1.8.4@babel-preset-umi/lib/index.js',
                  {
                    targets: {
                      chrome: 49,
                      firefox: 64,
                      safari: 10,
                      edge: 13,
                      ios: 10,
                      ie: 11,
                    },
                    env: {
                      useBuiltIns: 'entry',
                      corejs: 2,
                    },
                  },
                ],
              ],
              plugins: [
                '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_umi-build-dev@1.18.5@umi-build-dev/lib/plugins/afwebpack-config/lockCoreJSVersionPlugin.js',
                [
                  '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_babel-plugin-import@1.13.0@babel-plugin-import/lib/index.js',
                  {
                    libraryName: 'antd',
                    libraryDirectory: 'es',
                    style: true,
                  },
                  'antd',
                ],
                [
                  '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_babel-plugin-import@1.13.0@babel-plugin-import/lib/index.js',
                  {
                    libraryName: 'antd-mobile',
                    libraryDirectory: 'es',
                    style: true,
                  },
                  'antd-mobile',
                ],
                [
                  '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_babel-plugin-import@1.13.0@babel-plugin-import/lib/index.js',
                  {
                    libraryName: 'ant-design-pro',
                    libraryDirectory: 'lib',
                    style: true,
                    camel2DashComponentName: false,
                  },
                  'ant-design-pro',
                ],
                [
                  '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_umi-build-dev@1.18.5@umi-build-dev/lib/plugins/commands/block/sdk/flagBabelPlugin/index.js',
                  {
                    doTransform(filename) {
                      return routeComponents.includes(api.winPath(filename));
                    },
                  },
                ],
                [
                  'prismjs',
                  {
                    languages: [
                      'markup',
                      'markup-templating',
                      'css',
                      'less',
                      'scss',
                      'clike',
                      'javascript',
                      'typescript',
                      'jsx',
                      'tsx',
                      'php',
                      'java',
                      'bash',
                      'ini',
                      'json',
                      'sql',
                      'yaml',
                    ],
                    plugins: ['line-numbers', 'show-language', 'copy-to-clipboard'],
                    theme: 'okaidia',
                    css: true,
                  },
                ],
                '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_babel-plugin-dva-hmr@0.4.2@babel-plugin-dva-hmr/lib/index.js',
                [
                  '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_babel-plugin-named-asset-import@0.3.2@babel-plugin-named-asset-import/index.js',
                  {
                    loaderMap: {
                      svg: {
                        ReactComponent:
                          '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_af-webpack@1.14.9@af-webpack/lib/svgr.js?-prettier,-svgo![path]',
                      },
                    },
                  },
                ],
              ],
              sourceType: 'unambiguous',
              cacheDirectory: true,
              babelrc: false,
              customize:
                '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_babel-preset-umi@1.8.4@babel-preset-umi/lib/webpack-overrides.js',
            },
          },
          /* config.module.rule('ts').use('ts-loader') */
          {
            loader:
              '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_ts-loader@6.0.3@ts-loader/index.js',
            options: {
              configFile: '/Users/zkay/coding/WEB/new/ant_blog/tsconfig.json',
              transpileOnly: true,
              errorFormatter: function() {
                /* omitted long function */
              },
            },
          },
        ],
      },
      /* config.module.rule('graphql') */
      {
        test: /\.(graphql|gql)$/,
        exclude: [/node_modules/],
        use: [
          /* config.module.rule('graphql').use('graphql-tag-loader') */
          {
            loader: 'graphql-tag/loader',
          },
        ],
      },
      /* config.module.rule('cssModulesExcludes_0') */
      {
        test: function() {
          /* omitted long function */
        },
        use: [
          /* config.module.rule('cssModulesExcludes_0').use('extract-css-loader') */
          {
            loader:
              '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_mini-css-extract-plugin@0.7.0@mini-css-extract-plugin/dist/loader.js',
            options: {
              publicPath: '/',
              hmr: true,
            },
          },
          /* config.module.rule('cssModulesExcludes_0').use('css-loader') */
          {
            loader:
              '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_css-loader-1@2.0.0@css-loader-1/index.js',
            options: {
              importLoaders: 1,
              sourceMap: true,
              modules: true,
              getLocalIdent: function() {
                /* omitted long function */
              },
            },
          },
          /* config.module.rule('cssModulesExcludes_0').use('postcss-loader') */
          {
            loader:
              '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_postcss-loader@3.0.0@postcss-loader/src/index.js',
            options: {
              ident: 'postcss',
              plugins: function() {
                /* omitted long function */
              },
            },
          },
        ],
      },
      /* config.module.rule('cssModulesExcludes_1') */
      {
        test: function() {
          /* omitted long function */
        },
        use: [
          /* config.module.rule('cssModulesExcludes_1').use('extract-css-loader') */
          {
            loader:
              '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_mini-css-extract-plugin@0.7.0@mini-css-extract-plugin/dist/loader.js',
            options: {
              publicPath: '/',
              hmr: true,
            },
          },
          /* config.module.rule('cssModulesExcludes_1').use('css-loader') */
          {
            loader:
              '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_css-loader-1@2.0.0@css-loader-1/index.js',
            options: {
              importLoaders: 1,
              sourceMap: true,
              modules: true,
              getLocalIdent: function() {
                /* omitted long function */
              },
            },
          },
          /* config.module.rule('cssModulesExcludes_1').use('postcss-loader') */
          {
            loader:
              '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_postcss-loader@3.0.0@postcss-loader/src/index.js',
            options: {
              ident: 'postcss',
              plugins: function() {
                /* omitted long function */
              },
            },
          },
        ],
      },
      /* config.module.rule('cssModulesExcludes_2') */
      {
        test: function() {
          /* omitted long function */
        },
        use: [
          /* config.module.rule('cssModulesExcludes_2').use('extract-css-loader') */
          {
            loader:
              '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_mini-css-extract-plugin@0.7.0@mini-css-extract-plugin/dist/loader.js',
            options: {
              publicPath: '/',
              hmr: true,
            },
          },
          /* config.module.rule('cssModulesExcludes_2').use('css-loader') */
          {
            loader:
              '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_css-loader-1@2.0.0@css-loader-1/index.js',
            options: {
              importLoaders: 1,
              sourceMap: true,
              modules: true,
              getLocalIdent: function() {
                /* omitted long function */
              },
            },
          },
          /* config.module.rule('cssModulesExcludes_2').use('postcss-loader') */
          {
            loader:
              '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_postcss-loader@3.0.0@postcss-loader/src/index.js',
            options: {
              ident: 'postcss',
              plugins: function() {
                /* omitted long function */
              },
            },
          },
        ],
      },
      /* config.module.rule('cssModulesExcludes_3') */
      {
        test: function() {
          /* omitted long function */
        },
        use: [
          /* config.module.rule('cssModulesExcludes_3').use('extract-css-loader') */
          {
            loader:
              '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_mini-css-extract-plugin@0.7.0@mini-css-extract-plugin/dist/loader.js',
            options: {
              publicPath: '/',
              hmr: true,
            },
          },
          /* config.module.rule('cssModulesExcludes_3').use('css-loader') */
          {
            loader:
              '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_css-loader-1@2.0.0@css-loader-1/index.js',
            options: {
              importLoaders: 1,
              sourceMap: true,
              modules: true,
              getLocalIdent: function() {
                /* omitted long function */
              },
            },
          },
          /* config.module.rule('cssModulesExcludes_3').use('postcss-loader') */
          {
            loader:
              '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_postcss-loader@3.0.0@postcss-loader/src/index.js',
            options: {
              ident: 'postcss',
              plugins: function() {
                /* omitted long function */
              },
            },
          },
        ],
      },
      /* config.module.rule('cssModulesExcludes_4') */
      {
        test: function() {
          /* omitted long function */
        },
        use: [
          /* config.module.rule('cssModulesExcludes_4').use('extract-css-loader') */
          {
            loader:
              '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_mini-css-extract-plugin@0.7.0@mini-css-extract-plugin/dist/loader.js',
            options: {
              publicPath: '/',
              hmr: true,
            },
          },
          /* config.module.rule('cssModulesExcludes_4').use('css-loader') */
          {
            loader:
              '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_css-loader-1@2.0.0@css-loader-1/index.js',
            options: {
              importLoaders: 1,
              sourceMap: true,
              modules: true,
              getLocalIdent: function() {
                /* omitted long function */
              },
            },
          },
          /* config.module.rule('cssModulesExcludes_4').use('postcss-loader') */
          {
            loader:
              '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_postcss-loader@3.0.0@postcss-loader/src/index.js',
            options: {
              ident: 'postcss',
              plugins: function() {
                /* omitted long function */
              },
            },
          },
          /* config.module.rule('cssModulesExcludes_4').use('less-loader') */
          {
            loader:
              '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_less-loader@5.0.0@less-loader/dist/cjs.js',
            options: {
              modifyVars: {
                'primary-color': '#13C2C2',
              },
              javascriptEnabled: true,
            },
          },
        ],
      },
      /* config.module.rule('cssModulesExcludes_5') */
      {
        test: function() {
          /* omitted long function */
        },
        use: [
          /* config.module.rule('cssModulesExcludes_5').use('extract-css-loader') */
          {
            loader:
              '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_mini-css-extract-plugin@0.7.0@mini-css-extract-plugin/dist/loader.js',
            options: {
              publicPath: '/',
              hmr: true,
            },
          },
          /* config.module.rule('cssModulesExcludes_5').use('css-loader') */
          {
            loader:
              '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_css-loader-1@2.0.0@css-loader-1/index.js',
            options: {
              importLoaders: 1,
              sourceMap: true,
              modules: true,
              getLocalIdent: function() {
                /* omitted long function */
              },
            },
          },
          /* config.module.rule('cssModulesExcludes_5').use('postcss-loader') */
          {
            loader:
              '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_postcss-loader@3.0.0@postcss-loader/src/index.js',
            options: {
              ident: 'postcss',
              plugins: function() {
                /* omitted long function */
              },
            },
          },
        ],
      },
      /* config.module.rule('css') */
      {
        test: /\.css$/,
        exclude: [
          function() {
            /* omitted long function */
          },
        ],
        use: [
          /* config.module.rule('css').use('extract-css-loader') */
          {
            loader:
              '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_mini-css-extract-plugin@0.7.0@mini-css-extract-plugin/dist/loader.js',
            options: {
              publicPath: '/',
              hmr: true,
            },
          },
          /* config.module.rule('css').use('css-loader') */
          {
            loader:
              '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_css-loader-1@2.0.0@css-loader-1/index.js',
            options: {
              importLoaders: 1,
              sourceMap: true,
              modules: true,
              getLocalIdent: function() {
                /* omitted long function */
              },
              localIdentName: '[name]__[local]___[hash:base64:5]',
            },
          },
          /* config.module.rule('css').use('postcss-loader') */
          {
            loader:
              '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_postcss-loader@3.0.0@postcss-loader/src/index.js',
            options: {
              ident: 'postcss',
              plugins: function() {
                /* omitted long function */
              },
            },
          },
        ],
      },
      /* config.module.rule('css-in-node_modules') */
      {
        test: /\.css$/,
        include: [/node_modules/],
        use: [
          /* config.module.rule('css-in-node_modules').use('extract-css-loader') */
          {
            loader:
              '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_mini-css-extract-plugin@0.7.0@mini-css-extract-plugin/dist/loader.js',
            options: {
              publicPath: '/',
              hmr: true,
            },
          },
          /* config.module.rule('css-in-node_modules').use('css-loader') */
          {
            loader:
              '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_css-loader-1@2.0.0@css-loader-1/index.js',
            options: {
              importLoaders: 1,
              sourceMap: true,
              modules: true,
              getLocalIdent: function() {
                /* omitted long function */
              },
            },
          },
          /* config.module.rule('css-in-node_modules').use('postcss-loader') */
          {
            loader:
              '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_postcss-loader@3.0.0@postcss-loader/src/index.js',
            options: {
              ident: 'postcss',
              plugins: function() {
                /* omitted long function */
              },
            },
          },
        ],
      },
      /* config.module.rule('less') */
      {
        test: /\.less$/,
        exclude: [
          function() {
            /* omitted long function */
          },
        ],
        use: [
          /* config.module.rule('less').use('extract-css-loader') */
          {
            loader:
              '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_mini-css-extract-plugin@0.7.0@mini-css-extract-plugin/dist/loader.js',
            options: {
              publicPath: '/',
              hmr: true,
            },
          },
          /* config.module.rule('less').use('css-loader') */
          {
            loader:
              '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_css-loader-1@2.0.0@css-loader-1/index.js',
            options: {
              importLoaders: 1,
              sourceMap: true,
              modules: true,
              getLocalIdent: function() {
                /* omitted long function */
              },
              localIdentName: '[name]__[local]___[hash:base64:5]',
            },
          },
          /* config.module.rule('less').use('postcss-loader') */
          {
            loader:
              '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_postcss-loader@3.0.0@postcss-loader/src/index.js',
            options: {
              ident: 'postcss',
              plugins: function() {
                /* omitted long function */
              },
            },
          },
          /* config.module.rule('less').use('less-loader') */
          {
            loader:
              '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_less-loader@5.0.0@less-loader/dist/cjs.js',
            options: {
              modifyVars: {
                'primary-color': '#13C2C2',
              },
              javascriptEnabled: true,
            },
          },
        ],
      },
      /* config.module.rule('less-in-node_modules') */
      {
        test: /\.less$/,
        include: [/node_modules/],
        use: [
          /* config.module.rule('less-in-node_modules').use('extract-css-loader') */
          {
            loader:
              '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_mini-css-extract-plugin@0.7.0@mini-css-extract-plugin/dist/loader.js',
            options: {
              publicPath: '/',
              hmr: true,
            },
          },
          /* config.module.rule('less-in-node_modules').use('css-loader') */
          {
            loader:
              '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_css-loader-1@2.0.0@css-loader-1/index.js',
            options: {
              importLoaders: 1,
              sourceMap: true,
              modules: true,
              getLocalIdent: function() {
                /* omitted long function */
              },
            },
          },
          /* config.module.rule('less-in-node_modules').use('postcss-loader') */
          {
            loader:
              '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_postcss-loader@3.0.0@postcss-loader/src/index.js',
            options: {
              ident: 'postcss',
              plugins: function() {
                /* omitted long function */
              },
            },
          },
          /* config.module.rule('less-in-node_modules').use('less-loader') */
          {
            loader:
              '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_less-loader@5.0.0@less-loader/dist/cjs.js',
            options: {
              modifyVars: {
                'primary-color': '#13C2C2',
              },
              javascriptEnabled: true,
            },
          },
        ],
      },
      /* config.module.rule('sass') */
      {
        test: /\.(sass|scss)$/,
        exclude: [
          function() {
            /* omitted long function */
          },
        ],
        use: [
          /* config.module.rule('sass').use('extract-css-loader') */
          {
            loader:
              '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_mini-css-extract-plugin@0.7.0@mini-css-extract-plugin/dist/loader.js',
            options: {
              publicPath: '/',
              hmr: true,
            },
          },
          /* config.module.rule('sass').use('css-loader') */
          {
            loader:
              '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_css-loader-1@2.0.0@css-loader-1/index.js',
            options: {
              importLoaders: 1,
              sourceMap: true,
              modules: true,
              getLocalIdent: function() {
                /* omitted long function */
              },
              localIdentName: '[name]__[local]___[hash:base64:5]',
            },
          },
          /* config.module.rule('sass').use('postcss-loader') */
          {
            loader:
              '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_postcss-loader@3.0.0@postcss-loader/src/index.js',
            options: {
              ident: 'postcss',
              plugins: function() {
                /* omitted long function */
              },
            },
          },
        ],
      },
      /* config.module.rule('sass-in-node_modules') */
      {
        test: /\.(sass|scss)$/,
        include: [/node_modules/],
        use: [
          /* config.module.rule('sass-in-node_modules').use('extract-css-loader') */
          {
            loader:
              '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_mini-css-extract-plugin@0.7.0@mini-css-extract-plugin/dist/loader.js',
            options: {
              publicPath: '/',
              hmr: true,
            },
          },
          /* config.module.rule('sass-in-node_modules').use('css-loader') */
          {
            loader:
              '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_css-loader-1@2.0.0@css-loader-1/index.js',
            options: {
              importLoaders: 1,
              sourceMap: true,
              modules: true,
              getLocalIdent: function() {
                /* omitted long function */
              },
            },
          },
          /* config.module.rule('sass-in-node_modules').use('postcss-loader') */
          {
            loader:
              '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_postcss-loader@3.0.0@postcss-loader/src/index.js',
            options: {
              ident: 'postcss',
              plugins: function() {
                /* omitted long function */
              },
            },
          },
        ],
      },
      /* config.module.rule('stylus') */
      {
        test: /\.styl(us)?$/,
        exclude: [
          function() {
            /* omitted long function */
          },
        ],
        use: [
          /* config.module.rule('stylus').use('extract-css-loader') */
          {
            loader:
              '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_mini-css-extract-plugin@0.7.0@mini-css-extract-plugin/dist/loader.js',
            options: {
              publicPath: '/',
              hmr: true,
            },
          },
          /* config.module.rule('stylus').use('css-loader') */
          {
            loader:
              '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_css-loader-1@2.0.0@css-loader-1/index.js',
            options: {
              importLoaders: 1,
              sourceMap: true,
              modules: true,
              getLocalIdent: function() {
                /* omitted long function */
              },
              localIdentName: '[name]__[local]___[hash:base64:5]',
            },
          },
          /* config.module.rule('stylus').use('postcss-loader') */
          {
            loader:
              '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_postcss-loader@3.0.0@postcss-loader/src/index.js',
            options: {
              ident: 'postcss',
              plugins: function() {
                /* omitted long function */
              },
            },
          },
        ],
      },
      /* config.module.rule('stylus-in-node_modules') */
      {
        test: /\.styl(us)?$/,
        include: [/node_modules/],
        use: [
          /* config.module.rule('stylus-in-node_modules').use('extract-css-loader') */
          {
            loader:
              '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_mini-css-extract-plugin@0.7.0@mini-css-extract-plugin/dist/loader.js',
            options: {
              publicPath: '/',
              hmr: true,
            },
          },
          /* config.module.rule('stylus-in-node_modules').use('css-loader') */
          {
            loader:
              '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_css-loader-1@2.0.0@css-loader-1/index.js',
            options: {
              importLoaders: 1,
              sourceMap: true,
              modules: true,
              getLocalIdent: function() {
                /* omitted long function */
              },
            },
          },
          /* config.module.rule('stylus-in-node_modules').use('postcss-loader') */
          {
            loader:
              '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_postcss-loader@3.0.0@postcss-loader/src/index.js',
            options: {
              ident: 'postcss',
              plugins: function() {
                /* omitted long function */
              },
            },
          },
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      name: 'vendors',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendors: {
          test: function() {
            /* omitted long function */
          },
          name: function() {
            /* omitted long function */
          },
        },
      },
    },
    runtimeChunk: false,
  },
  plugins: [
    /* config.plugin('extract-css') */
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].chunk.css',
    }),
    /* config.plugin('define') */
    new DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"',
      },
      'process.env.BASE_URL': '"/"',
      __IS_BROWSER: 'true',
      __UMI_BIGFISH_COMPAT: undefined,
      __UMI_HTML_SUFFIX: 'false',
      API_URL: '"/api/"',
      USER_TOKEN_STORAGE_KEY: '"APP_USER_TOKEN"',
      AUTHORITY_STORAGE_KEY: '"APP_AUTHORITY"',
      SOCKET_ID_STORAGE_KEY: '"SOCKET_ID"',
      UPLOAD_URL: '"/api/attachments/upload"',
    }),
    /* config.plugin('progress') */
    new WebpackBarPlugin({
      color: 'green',
      reporters: ['fancy'],
    }),
    /* config.plugin('ignore-moment-locale') */
    new IgnorePlugin(/^\.\/locale$/, /moment$/),
    /* config.plugin('copy-public') */
    new CopyPlugin([
      {
        from: '/Users/zkay/coding/WEB/new/ant_blog/public',
        to: '/Users/zkay/coding/WEB/new/ant_blog/dist',
        toType: 'dir',
      },
    ]),
    /* config.plugin('copy-0') */
    new CopyPlugin([
      {
        from: 'node_modules/emoji-assets',
        to: 'emoji-assets',
        toType: 'dir',
      },
    ]),
    /* config.plugin('copy-1') */
    new CopyPlugin([
      {
        from: 'node_modules/font-awesome',
        to: 'font-awesome',
        toType: 'dir',
      },
    ]),
    /* config.plugin('filter-css-conflicting-warnings') */
    new FilterCSSConflictingWarning(),
    /* config.plugin('friendly-errors') */
    new FriendlyErrorsWebpackPlugin({
      clearConsole: false,
    }),
    /* config.plugin('hmr') */
    new HotModuleReplacementPlugin(),
    /* config.plugin('umi-ui-compile-status') */
    new CompileStatusWebpackPlugin(),
    /* config.plugin('webpack-theme-color-replacer') */
    new ThemeColorReplacer({
      fileName: 'css/theme-colors-[contenthash:8].css',
      matchColors: [
        '#13c2c2',
        '#2bc8c8',
        '#42cece',
        '#5ad4d4',
        '#71dada',
        '#89e1e1',
        '#a1e7e7',
        '#b8eded',
        '#d0f3f3',
        '#e6fffb',
        '#b5f5ec',
        '#87e8de',
        '#5cdbd3',
        '#36cfc9',
        '#13c2c2',
        '#08979c',
        '#006d75',
        '#00474f',
        '#002329',
      ],
      changeSelector: function() {
        /* omitted long function */
      },
    }),
  ],
  entry: {
    umi: [
      '/Users/zkay/coding/WEB/new/ant_blog/node_modules/_af-webpack@1.14.9@af-webpack/lib/webpackHotDevClient.js',
      '/Users/zkay/coding/WEB/new/ant_blog/src/pages/.umi/umi.js',
    ],
  },
};
