import { IConfig, IPlugin } from 'umi-types';
import defaultSettings from './defaultSettings'; // https://umijs.org/config/

import webpackPlugin from './plugin.config';
import slash from 'slash2';
const { pwa, primaryColor } = defaultSettings;
const plugins: IPlugin[] = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        // default false
        enable: true,
        // default zh-CN
        default: 'zh-CN',
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
      },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },
      pwa: pwa
        ? {
            workboxPluginMode: 'InjectManifest',
            workboxOptions: {
              importWorkboxFrom: 'local',
            },
          }
        : false,
    },
  ],
  [
    'umi-plugin-pro-block',
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true,
    },
  ],
];
export default {
  plugins,
  hash: true,
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/zh/guide/router.html
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/admin',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/admin',
          component: '../layouts/BasicLayout',
          authority: ['admin', 'user'],
          routes: [
            {
              name: 'article',
              path: 'article',
              icon: 'read',
              routes: [
                {
                  name: 'create',
                  path: 'create',
                  component: './admin/article/create',
                },
                {
                  name: 'list',
                  path: 'list',

                  component: './admin/article/list',
                  routes: [
                    {
                      path: '/admin/article/list',
                      redirect: '/admin/article/list/release',
                    },
                    {
                      name: 'draft',
                      icon: 'smile',
                      path: '/admin/article/list/draft',
                      component: './admin/article/draft',
                    },
                    {
                      name: 'examination',
                      icon: 'smile',
                      path: '/admin/article/list/examination',
                      component: './admin/article/examination',
                    },
                    {
                      name: 'release',
                      icon: 'smile',
                      path: '/admin/article/list/release',
                      component: './admin/article/release',
                    },
                    {
                      component: './exception/403',
                    },
                    {
                      component: './exception/404',
                    },
                    {
                      component: './exception/500',
                    },
                  ],
                },
                {
                  name: 'tag',
                  path: 'tag',
                  component: './admin/tag',
                },
                {
                  name: 'category',
                  path: '/admin/article/category',
                  component: './admin/category',
                },
                {
                  component: './exception/403',
                },
                {
                  component: './exception/404',
                },
                {
                  component: './exception/500',
                },
              ],
            },
            {
              path: 'users',
              name: 'user',
              icon: 'team',
              routes: [
                {
                  name: 'users',
                  path: 'list',
                  component: './admin/users',
                },
                {
                  name: 'role',
                  path: '/admin/users/role',
                  component: './admin/role',
                },
                {
                  name: 'permission',
                  path: '/admin/users/permission',
                  component: './admin/permission',
                },
                {
                  component: './exception/403',
                },
                {
                  component: './exception/404',
                },
                {
                  component: './exception/500',
                },
              ],
            },
            {
              path: 'system',
              name: 'system',
              icon: 'setting',
              routes: [
                {
                  name: '查询表格',
                  icon: 'smile',
                  path: '/admin/system/menu',
                  component: './admin/menu',
                },
              ],
            },
            {
              name: 'project',
              icon: 'smile',
              path: '/admin/admin/project',
              component: './admin/project',
            },
            {
              path: 'admin',
              name: 'admin',
              icon: 'crown',
              component: './Admin',
            },
            {
              component: './exception/403',
            },
            {
              component: './exception/404',
            },
            {
              component: './exception/500',
            },
          ],
        },
        {
          component: './exception/403',
        },
        {
          component: './exception/404',
        },
        {
          component: './exception/500',
        },
      ],
    },
    {
      path: '/demos',
      component: '../layouts/BlankLayout',
      routes: [
        {
          path: 'yt-simplemde-editor',
          name: 'ytSimplemdeEditor',
          component: './demos/ytSimplemdeEditor',
        },
        {
          path: 'yt-emoji-picker',
          name: 'ytEmojiPicker',
          component: './demos/ytEmojiPicker',
        },
        {
          component: './404',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/HomeLayout',
      authority: ['admin', 'user'],
      routes: [
        {
          path: 'account',
          routes: [
            {
              path: '/account/center',
              component: './admin/account/center',
            },
            {
              path: '/account/settings',
              component: './admin/account/settings',
            },
            {
              component: './exception/403',
            },
            {
              component: './exception/404',
            },
            {
              component: './exception/500',
            },
          ],
        },
        {
          name: 'home',
          path: '/',
          component: './home/index',
        },
        {
          name: 'article',
          path: '/article',
          routes: [
            {
              path: '/article',
              redirect: '/article/list',
            },
            {
              path: '/article/list',
              component: './home/article/list',
            },
            {
              path: '/article/:id',
              component: './home/article/show',
            },
          ],
        },
        // {
        //   name: 'project',
        //   path: '/project',
        //   component: './home/project',
        // },
        {
          path: 'welcome',
          name: 'welcome',
          component: './Welcome',
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': primaryColor,
  },
  define: {
    API_URL: '/api/',
    USER_TOKEN_STORAGE_KEY: 'APP_USER_TOKEN',
    AUTHORITY_STORAGE_KEY: 'APP_AUTHORITY',
    SOCKET_ID_STORAGE_KEY: 'SOCKET_ID',
    // SOCKET_HOST: !prod ? 'https://api.blog.test' : 'https://www.einsition.com',
    UPLOAD_URL: '/api/attachments/upload',
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (
      context: {
        resourcePath: string;
      },
      _: string,
      localName: string,
    ) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map((a: string) => a.replace(/([A-Z])/g, '-$1'))
          .map((a: string) => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },
  manifest: {
    basePath: '/',
  },
  chainWebpack: webpackPlugin,
  proxy: {
    '/api/': {
      target: 'http://api.kzabc.com',
      changeOrigin: true,
      // pathRewrite: {
      //    '^/api': '',
      //  },
    },
  },
  extraBabelPlugins: [
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
  ],
  copy: [
    {
      from: 'node_modules/emoji-assets',
      to: 'emoji-assets',
      toType: 'dir',
    },
    {
      from: 'node_modules/font-awesome',
      to: 'font-awesome',
      toType: 'dir',
    },
  ],
} as IConfig;
