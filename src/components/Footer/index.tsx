import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => (
  <DefaultFooter
    copyright="2021 江湖干饭庄团体验技术部出品"
    links={[
      {
        key: 'Ant Design Pro',
        title: 'Gan Fan Zhang',
        href: 'https://pro.ant.design',
        blankTarget: true,
      },
      {
        key: 'github',
        title: <GithubOutlined />,
        href: 'https://github.com/qiyunkong',
        blankTarget: true,
      },
      {
        key: 'Ant Design',
        title: '干饭庄',
        href: 'https://ant.design',
        blankTarget: true,
      },
    ]}
  />
);
