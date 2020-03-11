import axios from 'axios';
import { stringify } from 'query-string';
import CONSTANT from '@/public/constant';
import Cookie from 'js-cookie';
import { history } from '@/pages/routers';
const { URL } = CONSTANT;
type AxiosType = {
    params?: {
        [key: string]: any
    }
    headers?: HeadersType
};
type HeadersType = {
    [key: string]: any
};
export type ResponseType = {
    code: number | string,
    data: any,
    msg: string,
    success: boolean
}


function normalizeContentyType(headers: HeadersType) {
    const contentType = (headers && headers['Content-Type']);
    return contentType || 'application/x-www-form-urlencoded';
}

const showErrorMessage = (data: any) => console.error(data && data.msg ? data.msg : '请求错误', 4);
axios.interceptors.response.use(
    (response: any) => {
        if(response.data.code === 50102) {
            Cookie.remove('token');
            location.href = '/login';
            return;
        }else if(response.data.code != 0){
            showErrorMessage(response.data);
        }
        return response.data;
    },
    error => {
        showErrorMessage(error.data);
        return Promise.reject(error.data)
    }
)
function setCommonAxiosCinfig() {
    axios.defaults.timeout = 5000;
    axios.defaults.baseURL = URL;
    axios.defaults.headers.common.Accept = 'application/json';
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    const token = Cookie.get('token');
    if (token) {
        axios.defaults.headers.common["token"] = token;
    }
}
export function get(url: string, config?: AxiosType) {
    setCommonAxiosCinfig()
    return new Promise((resolve, reject) => {
        axios.get(url, config).then(resp => {
            if ((resp as any).code === 0) resolve(resp)
            else reject(resp);
        }).catch(reject)
    });
}

export function post(url: string, config?: AxiosType) {
    setCommonAxiosCinfig()
    let contentType = config && config.headers ? normalizeContentyType(config.headers) : null;
    // @ts-ignore
    let params = config.params;
    if (config && config.params) {
        delete config.params;
    }
    switch (contentType) {
        case 'application/json':
            // @ts-ignore
            params = JSON.stringify(params);
            break;
        case 'application/x-www-form-urlencoded':
            // @ts-ignore
            params = stringify(params);
            break;
        default:
            break;
    }

    return new Promise((resolve, reject) => {
        axios.post(url, params, config).then(resp => {
            if ((resp as any).code === 0) resolve(resp)
            else reject(resp);
        }).catch(reject)
    });
}
