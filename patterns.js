// Декоратор ==========================================================
function MyClass() {}

MyClass.prototype.doSomething = () => 2;

function addDecorator(inst) {
    let value = inst.doSomething();
    inst.doSomething = () => value + 1;
}

let instance = new MyClass();
addDecorator(instance);
console.log(instance.doSomething());

// Singleton (практика Замыканий) =============================
let Singleton = (function singleton() {
    let instance;
    return function ConstructSingleton() {
        if (instance) return instance;
        instance = this;
    };
})();
let a = new Singleton();
let b = new Singleton();

console.log(a === b);

// Observer Pattern =============================

class Observable {
    constructor() {
        this.observers = [];
    }

    subscribe(f) {
        this.observers.push(f);
    }

    unsubscribe(f) {
        this.observers = this.observers
            .filter(subscriber => subscriber !== f);
    }

    notify(data) {
        this.observers.forEach(observer => observer(data));
    }
}

const input = document.querySelector('.js-input');
const p = document.querySelector('.js-p');
const buttonSubscribe = document.querySelector('.bSubscribe');
const buttonUnsubscribe = document.querySelector('.bUnsubscribe');

const observer = new Observable();

const updateP = text => p.textContent = text;
observer.subscribe(updateP);

input.addEventListener('keyup', e =>
    observer.notify(e.target.value));

buttonSubscribe.addEventListener('click', () =>
    observer.subscribe(updateP));

buttonUnsubscribe.addEventListener('click', () =>
    observer.unsubscribe(updateP));

// Factory =============================
class Factory {
    create(type) {
        let factory;
        if (type === '1') factory = new FirstType();
        if (type === '2') factory = new SecondType();

        factory.type = type;
    }
}

class FirstType {
    construct() {
        this.value = 1;
    }
}

class SecondType {
    construct() {
        this.value = 2;
    }
}