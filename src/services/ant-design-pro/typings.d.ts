// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUser = {
    name?: string;
    avatar?: string;
    id?: string;
    email?: string;
    signature?: string;
    title?: string;
    group?: string;
    tags?: { key?: string; label?: string }[];
    notifyCount?: number;
    unreadCount?: number;
    country?: string;
    access?: string;
    geographic?: {
      province?: { label?: string; key?: string };
      city?: { label?: string; key?: string };
    };
    address?: string;
    phone?: string;
  };

  type LoginResult = {
    status?: string;
    type?: string;
    currentAuthority?: string;
    data?: {
      accessToken?: string;
      refreshToken?: string;
    };
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    username?: string;
    password?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
  interface MenuDataItem {
    authority?: string[] | string;
    children?: MenuDataItem[];
    hideChildrenInMenu?: boolean;
    hideInMenu?: boolean;
    icon?: React.ReactNode;
    locale?: string | false;
    name?: string;
    key?: string;
    path?: string;
    [key: string]: any;
    parentKeys?: string[];
  }
  type MenuItem = {
    path: string;                // 路径
    component: string;           // 组件
    name: string;                // 菜单的名称或国际化 key
    icon?: string;               // 图标名称
    access?: string;             // 权限标识
    hideChildrenInMenu?: boolean; // 是否隐藏子菜单
    routes?: MenuItem[];         // 子菜单项
    hideInMenu?: boolean;        // 是否在菜单中隐藏
    hideInBreadcrumb?: boolean;  // 是否在面包屑中隐藏
    headerRender?: boolean;      // 是否展示顶栏
    footerRender?: boolean;      // 是否展示页脚
    menuRender?: boolean;        // 是否展示菜单
    menuHeaderRender?: boolean;  // 是否展示菜单顶栏
    parentKeys?: string[];       // 父节点 key
    flatMenu?: boolean;          // 子项上提，不展示父菜单
  };

}
