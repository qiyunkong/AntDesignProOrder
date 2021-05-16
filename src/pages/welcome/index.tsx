import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { PageHeaderProps } from 'antd/lib/page-header'
import { Card, Alert, Typography } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import styles from './index.less';
import HeaderContent from './HeaderContent'

const CodePreview: React.FC = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);

export default (): React.ReactNode => {
  const intl = useIntl();
  return (
    <PageContainer
      header={
        {
          title:<div style={{fontSize:'14px', fontWeight:'normal'}}>应用中心</div>,
          children:<HeaderContent/>,
          breadcrumb:undefined
        } as PageHeaderProps
      }
    > 
      

    </PageContainer>
  );
};
