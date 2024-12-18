import { Footer, Question, SelectLang, AvatarDropdown, AvatarName } from '@/components';
import { LinkOutlined } from '@ant-design/icons';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { SettingDrawer } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { history, Link } from '@umijs/max';
import defaultSettings from '../config/defaultSettings';
import { errorConfig } from './requestErrorConfig';
import { currentUser as queryCurrentUser, currentMenu as queryCurrentMenu } from '@/services/ant-design-pro/api';
import React from 'react';

import type { MenuDataItem as APIMenuDataItem } from '@ant-design/pro-layout';
import * as AllIcons from '@ant-design/icons';

// Fix从后端接口获取的菜单数据时，icon 类型不匹配的问题
const fixMenuItemIcon = (menuData: APIMenuDataItem[], iconType:string ='Outlined') =>   {
    menuData.forEach((item) => {
      const {icon,children} = item;
       if (typeof icon === 'string') {
          const  fixIconName = `${item.icon}${iconType}`;
          item.icon = React.createElement(AllIcons[fixIconName]|| AllIcons[item.icon] ||AllIcons.SmileOutlined);

       }
       if(item.children){
           fixMenuItemIcon(item.children, iconType);
       }
  });
  return menuData;
};


const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
  menuData?: API.MenuDataItem[];
  fetchMenuData?: () => Promise<API.MenuDataItem[] | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser({
        skipErrorHandler: true,
      });
      return msg.data;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  const fetchMenuData = async () => {
    try {
      const msg = await queryCurrentMenu({});
      return msg.data;
    } catch (error) {
      history.push(loginPath);
      return undefined;

    }
  };
  // 如果不是登录页面，执行
  const { location } = history;
  if (location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      fetchMenuData,
      settings: defaultSettings as Partial<LayoutSettings>,
    };
  }
  return {
    fetchUserInfo,
    fetchMenuData,
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    actionsRender: () => [<Question key="doc" />, <SelectLang key="SelectLang" />],
    avatarProps: {
      src: initialState?.currentUser?.avatar || 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
      title: <AvatarName />,
      render: (_, avatarChildren) => {
        return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
      },
    },
    waterMarkProps: {
      content: initialState?.currentUser?.name,
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    bgLayoutImgList: [
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr',
        left: 85,
        bottom: 100,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr',
        bottom: -68,
        right: -45,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr',
        bottom: 0,
        left: 0,
        width: '331px',
      },
    ],
    links: isDev
      ? [
        <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
          <LinkOutlined />
          <span>OpenAPI 文档</span>
        </Link>,
      ]
      : [],
    menuHeaderRender: undefined,
    // menuDataRender: (menuData:APIMenuDataItem[] ) =>     fixMenuItemIcon(menuData),
    // 每当 initialState?.currentUser?.userid 发生修改时重新执行 request
    menu: {
      locale: false,
      // params: {
      //   userId: initialState?.currentUser?.id,
      // },
      // request: async (params, defaultMenuData) => {
      //   // initialState.currentUser 中包含了所有用户信息
      //   if (initialState?.menuData) {
      //     return initialState?.menuData;
      //   }
      //   const menuData = await initialState?.fetchMenuData?.();
      //   if (menuData) {
      //     return [...menuData, ...defaultMenuData];
      //   }
      //   if (!menuData && !initialState?.currentUser) {
      //     // history.push(loginPath);
      //   }
      //   return defaultMenuData || [];
      // },
    },
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {isDev && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = {
  ...errorConfig,
};
