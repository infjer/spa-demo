import { Module } from './Module.js';

export class NotFound extends Module {
    build(options) {
        super.build(options);
        this.body = document.createElement('div');
        this.body.innerHTML = `<p>模块找不到</p>`;
    }
}
