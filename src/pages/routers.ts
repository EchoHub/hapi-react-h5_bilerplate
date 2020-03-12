import { createHashHistory } from 'history';
import Index from '@/pages/Index';
import Demo from '@/pages/Demo';

export const history = createHashHistory();

const R = [
  {
    path: '/',
    component: Index
  },
  {
    path: '/demo',
    component: Demo
  }
]
export type RouterConfigParams = {
  path: string,
  component: any
}
export default R;