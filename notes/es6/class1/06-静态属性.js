/** 
 * 静态属性，Class本身的属性，而非定义在实例对象this上的属性。
 * static关键字
 * */
class Foo{
  static myStaticProp = 42
  constructor() {
    console.log(Foo.myStaticProp)
  }
}
Foo.prop = 1
console.log(Foo.prop);
