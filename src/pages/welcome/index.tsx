import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { PageHeaderProps } from 'antd/lib/page-header'
import { Typography } from 'antd';
import { useIntl } from 'umi';
import styles from './index.less';

export default (): React.ReactNode => {
  //国际化
  const intl = useIntl();
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
