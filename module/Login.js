import { Module } from './Module.js';

export class Login extends Module {
    build(options) {
        super.build(options);
        this.body = document.createElement('div');
        this.body.innerHTML = `<p>用户登录模块</p>`;
    }
}
