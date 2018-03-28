import { Module } from './Module.js';

const update = Symbol('update');
const user = Symbol('user');

export class User extends Module {
    build(options) {
        super.build(options);
        this.body = document.createElement('div');
        this[user] = document.createElement('p');
        this.body.appendChild(this[user]);
    }
    show(context) {
        super.show(context);
        let req = context.request;
        this[update](req.restParams.uid);
    }
    refresh(context) {
        super.refresh(context);
        let req = context.request;
        this[update](req.restParams.uid);
    }
    [update](uid) {
        this[user].innerHTML = `<p>大家好，我是用户${uid}</p>`
    }
}
