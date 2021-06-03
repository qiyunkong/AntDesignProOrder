import React from 'react';
import styles from './index.less';
import { PageContainer } from '@ant-design/pro-layout';
import { PageHeaderProps } from 'antd/lib/page-header';

export default (): React.ReactNode => {
  return (
    <PageContainer
      header={
        {
          title:<div style={{fontSize:'14px', fontWeight:'normal'}}>应用中心</div>,
          children:<div/>,
          breadcrumb:undefined
        } as PageHeaderProps
      }
    >


    </PageContainer>
  );
};
