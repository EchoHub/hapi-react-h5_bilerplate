import { Component } from 'react';
import cst from '@/public/constant/index';
import { post } from '@/public/http/request';
import { genRandomStr } from '@/public/utils/index';
/**
 * 开启上报开关
 */
const traceSwitch = process.env.TRACE;

/**
 * 上报地址
 */
export const TrackUrl = 'xxx';
export const ExcapturerUrl = 'xxx';
let sessionId = +new Date() + genRandomStr(16);
export interface TrackParams {
  eventId: string,
  eventName: string,
  duration?: number,
  extParams?: {
    [key: string]: any
  },
  [key: string]: any
}

/**
 * @desc 获取用户行为固定上报参数
 */
function getTrackStaticParams() {
  const timetamp = +new Date();
  return {
    sessionId,
    appKey: cst.appKey,
    datetime: timetamp,
    url: location.href
  }
}

/**
 * @desc 用户行为事件上报
 * @param trackParams
 */
export function track(trackParams: Partial<TrackParams>) {
  const params = {
    ...getTrackStaticParams(),
    level: this.props ? 2 : 3,
    ...trackParams
  };
  return traceSwitch ? post(TrackUrl, {
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    params,
  }).catch(e => console.error('%c上报数据：', 'color:#fff;font-weight:bold;background:#999;padding:2px;', e))
    : console.info('%c【上报数据】:', 'color:#fff;font-weight:bold;background:#999;padding:2px;', params);
}

/**
 * @desc 获取预警固定上报参数
 */
function getExcaptureStaticParams() {
  return {
    wrapApp: false,
    wrapRequest: 'axios',
    env: 'production',
    ...getTrackStaticParams(),
  }
}

/**
 * @desc 错误预警上报
 * @param trackConfig 
 */
export function excapture(excaptureConfig: any) {
  const params = {
    ...getExcaptureStaticParams(),
    ...excaptureConfig
  };
  return traceSwitch ? post(ExcapturerUrl, {
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    params,
  }).catch(e => console.error('%c上报数据：', 'color:#fff;font-weight:bold;background:#999;padding:2px;', e))
    : console.info('%c【上报数据】:', 'color:#fff;font-weight:bold;background:#999;padding:2px;', params);
}

/**
 * @desc http错误预警上报
 * @param trackConfig 
 */
export function httpExcapture(httpExcaptureConfig: any) {
  const {
    request,
    msg
  } = httpExcaptureConfig;
  let _request = {};
  if (request) {
    const { method, params, headers } = request;
    _request = {
      method,
      params,
      headers
    };
  }
  excapture({
    type: 'request',
    msg,
    request: _request
  })
}

/**
 * @desc 应用行为容器
 * @param trackConfig 
 */
export function trackApp(trackConfig: any = {}) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    // let __appDuration__ = +new Date();
    track.call(target, {
      eventId: 'onLaunch',
      eventName: '进入Web应用',
      level: 1,
      ...trackConfig
    })
    if (window && window.navigator) {
      const { onLine, userAgent, platform, appName, appVersion } = window.navigator;
      track.call(target, {
        eventId: 'systemInfo',
        eventName: '系统信息',
        level: 1,
        extParams: {
          systemInfo: JSON.stringify({
            onLine,
            userAgent,
            platform,
            appName,
            appVersion
          })
        }
      })
    }

    window.onerror = function (e) {
      excapture({
        type: 'syntax',
        msg: e
      })
    }
    // const listener = (document as any).attechEvent || document.addEventListener;
    // listener('visibilitychange', function (e) {
    //   const visibilityState = (document as any).webkitVisibilityState || document.visibilityState;
    //   if (!visibilityState) return;
    //   if (visibilityState === 'visible') {
    //     __appDuration__ = +new Date();
    //     track.call(target, {
    //       eventId: 'onLaunch',
    //       eventName: '进入Web应用',
    //       level: 1,
    //     })
    //     return;
    //   }
    //   track.call(target, {
    //     eventId: 'onUnload',
    //     eventName: '离开Web应用',
    //     level: 1,
    //     duration: ((+new Date()) - __appDuration__)/1000
    //   })
    // })
  };
}

/**
 * @desc 组件行为容器
 * @param trackConfig 
 */
export default function trackComponent(trackConfig?: any) {
  return function <T extends { new(...args: any[]): Component }>(target: T) {
    return class extends target {
      private __curUrl__: string;
      private __commingTime__: number;
      componentWillMount() {
        this.__curUrl__ = location.href;
        this.__commingTime__ = +new Date();
        track.call(this, {
          eventId: 'onLoad',
          eventName: '进入页面'
        })
        super.componentWillMount && super.componentWillMount();
      }

      componentWillUnmount() {
        track.call(this, {
          eventId: 'onUnload',
          eventName: '离开页面',
          url: this.__curUrl__,
          duration: (+new Date() - this.__commingTime__) / 1000
        })
        super.componentWillUnmount && super.componentWillUnmount();
      }

    }
  }
}