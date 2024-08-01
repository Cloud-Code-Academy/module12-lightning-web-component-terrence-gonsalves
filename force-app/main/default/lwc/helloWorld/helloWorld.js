import { LightningElement } from 'lwc';

export default class HelloWorld extends LightningElement {
    greeting = 'Jackson';

    changeHandler(e) {
        this.greeting = e.target.value;
    }
}