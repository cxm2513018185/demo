/**
 * 寄生组合式继承
 * @param {*} subClass 子类
 * @param {*} superClass 父类
 */
function inherit(subClass, superClass) {
  function F() {
    this.constructor = subClass;
  };
  F.prototype = superClass.prototype;
  subClass.prototype = new F();
}

function Btn(title, bgColor = 'btn-default', size = 'btn-default') {
  this.title = title;
  this.bgColor = bgColor;
  this.size = size;
}

Btn.prototype.renderHTML = function() {
  return `<button class="btn ${this.bgColor} ${this.size}">${this.title}</button>`
}

function MyBtn(title, bgColor, size) {
  Btn.call(this, title, bgColor, size);
};
inherit(MyBtn, Btn);