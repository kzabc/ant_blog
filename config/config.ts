import { defineConfig } from 'umi';

import webpackPlugin from './plugin.config';
import slash from 'slash2';
export default defineConfig({
  hash: true,
  antd: {},
  analytics: false,
  dva: {
    hmr: true,
  },
  locale: {
    default: 'zh-CN',
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
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
                      name: 'release',
                      path: '/admin/article/list/release',
                      component: './admin/article/release',
                    },
                    {
                      name: 'draft',
                      path: '/admin/article/list/draft',
                      component: './admin/article/draft',
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
  define: {
    API_URL: '/api/',
    USER_TOKEN_STORAGE_KEY: 'APP_USER_TOKEN',
    AUTHORITY_STORAGE_KEY: 'APP_AUTHORITY',
    SOCKET_ID_STORAGE_KEY: 'SOCKET_ID',
    // SOCKET_HOST: !prod ? 'https://api.blog.test' : 'https://www.einsition.com',
    UPLOAD_URL: '/api/attachments/upload',
  },
  ignoreMomentLocale: true,
  lessLoader: {
    javascriptEnabled: true,
  },
  cssLoader: {
    modules: {
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
  },
  manifest: {
    basePath: '/',
  },
  chainWebpack: webpackPlugin,
  proxy: {
    '/api/': {
      target: 'http://test.kzabc.com',
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
});
