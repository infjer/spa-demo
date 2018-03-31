import { Module } from './Module.js';

const update = Symbol('update');
const group = Symbol('group');

export class Group extends Module {
    build(options) {
        super.build(options);
        this.body = document.createElement('div');
        this[group] = document.createElement('p');
        this.body.appendChild(this[group]);
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
        this[user].innerHTML = `<p>大家好，我是分组${uid}</p>`
    }
}
