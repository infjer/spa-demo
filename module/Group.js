import { Module } from './Module.js';

const group = Symbol('group');

export class Group extends Module {
    build(options) {
        super.build(options);
        this.body = document.createElement('div');
        this[group] = document.createElement('p');
        this.body.appendChild(this[group]);
    }
    show(context) {
        
    }
}
