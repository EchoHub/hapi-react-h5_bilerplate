import { Component } from 'react';
export function track() {

}

export default function trackComponent(trackConfig: any, ) {
    return function <T extends { new(...args: any[]): Component }>(target: T) {
        return class extends target {

            componentDidMount() {
                console.log('componentDidMount')
                super.componentDidMount();
            }

            componentDidCatch(error, info) {
                console.log('componentDidCatch')
                super.componentDidCatch(error, info);
            }

            componentWillUnmount() {
                console.log('componentWillUnmount')
                super.componentWillUnmount();
            }

            public render() {
                console.log('render');
                return super.render();
            }
        }
    }
}