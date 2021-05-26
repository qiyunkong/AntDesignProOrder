import qs from 'qs';
import { history } from 'umi';

interface LoadPageOption {
  isReplace?: boolean;
  saveQuery?: boolean;
}

export default function useRouter() {
  const routerBase = (pathname: string, query?: Record<string, any>, option?: LoadPageOption) => {
    const reloadQuery = option?.saveQuery ? { ...history.location.query, ...query } : { ...query };
    if (option?.isReplace) {
      history.replace(`${pathname}${reloadQuery ? `?${qs.stringify(reloadQuery)}` : ''}`);
    } else {
      history.push(`${pathname}${reloadQuery ? `?${qs.stringify(reloadQuery)}` : ''}`);
    }
  };

  const loadPage = (
    url?: string,
    query?: Record<string, string | number | undefined>,
    option?: LoadPageOption,
  ) => {
    const urlObj = (url || '').split('?');
    const pathName = urlObj[0] || history.location.pathname;

    routerBase(pathName, { ...qs.parse(urlObj[1]), ...query }, option);
  };

  const reloadPage = (query?: Record<string, any>, option: LoadPageOption = {}) => {
    const reloadQuery = { ...query, t: new Date().getTime() };
    option!.isReplace = option.isReplace == null ? true : option?.isReplace;
    option!.saveQuery = option.saveQuery == null ? true : option?.saveQuery;
    routerBase(history.location.pathname, reloadQuery, option);
  };
  const goHome = (query?: Record<string, any>, option: LoadPageOption = {}) => {
    routerBase('/', query, option);
  };
  const goBack = () => {
    history.goBack();
  };
  const push = (url:string) =>{
    history.push(url)
  }
  return {
    reloadPage,
    loadPage,
    goBack,
    goHome,
    push
  };
}
