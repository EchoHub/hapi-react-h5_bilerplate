import { createHashHistory } from 'history';
import Index from '@/pages/Index';

export const history = createHashHistory();

const R = [
  {
    path: '/',
    component: Index
  }
]
export type RouterConfigParams = {
  path: string,
  component: any
}
export default R;