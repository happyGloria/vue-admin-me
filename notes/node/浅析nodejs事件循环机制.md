[1. 简介](#1)

[2. 什么是event loop ?](#2)

[3. event Loop 运行原理](#3)

<h2 id="1">1. 前言</h2>
本文阐述的是Node.js的Event Loop事件循环机制。

<h2 id="2">2 什么是event loop ?</h3>

> 如果想弄清楚Event Loop 需要先明白JS引擎的运行原理，请参见我的另外一篇文章 [浅析JavaScript引擎 运行机制](https://zhuanlan.zhihu.com/p/33135623)；当然，你也可以直接参见阮一峰大神的文章[JavaScript 运行机制详解：再谈Event Loop](http://www.ruanyifeng.com/blog/2014/10/event-loop.html)

- eventLoop是一种事件处理模型；
- node.js实现了`单线程高效的异步IO`,这里的单线程是指的执行JS代码部分的线程；
- 异步IO部分nodeJS是利用`线程池`去执行的；

<h3 id="3">3 event Loop 运行原理</h3>

先来看一道题，猜猜它的结果是什么?

![image](https://note.youdao.com/yws/api/personal/file/5B0E5B234DCF415BBD87BB32EF57EA4E?method=download&shareKey=7af88e3aed341652c4df90c18ad4747d)

问者 ：你答对了吗？ 

答者 ：没有

问者 ：没关系...，平常心..., 接下来，先上一道硬菜......

下面就结合这个原理图，根据问题，来一步一步分析：

![image](https://note.youdao.com/yws/api/personal/file/097D7685FBD7436F8162D07BF3551FB9?method=download&shareKey=7af88e3aed341652c4df90c18ad4747d)

我们代码的开始执行都是从script（全局任务）开始，这个全局任务属于宏任务；代码由上向下执行；
1. 第1行，遇到了一个timer异步任务，属于宏任务，放入宏任务队列；
2. 第8行，遇到log,内部没有其它函数，直接输出`main1`;
3. 第10行，函数的定义，不执行；
4. 第17行，遇到new Promise()，进入回调函数内部:

    1） 遇到promise.nextTick,属于微任务，放入微任务队列`nextTick3`;
    
    2） 遇到log,内部没有其它函数，直接输出`promise 1`;
    
    3） 遇到resolve回调，属于微任务，放入微任务队列`promise then`;
5. 第27行，遇到log,内部没有其它函数，直接输出`main2`;
6. 第29行，遇到promise.nextTick,属于微任务，放入微任务队列`nextTick4`;

7. 第33行，执行say()：

    1）遇到log,内部没有其它函数，直接输出`hello`;
    
    2）遇到promise.nextTick,属于微任务，放入微任务队列`nextTick2`;


    到此为止，我们已经做了如下事情：
    
    1）宏任务队列中放入了一个timer函数；
    
    2）输出了`main1`，`promise 1`，`main2`，`hello1`；
    
    3）微任务队列中已经放入了`promise then`,`nextTick3`,`nextTick4`,`nextTick2`;

> 此时，我们的全局任务已执行完成了，就要马上执行完整个微任务队列。但是在微任务中，**process.nextTick 是一个特殊的任务，它会被直接插入到微任务的队首（当然了，多个process.nextTick 之间也是先入先出的），优先级最高**。所以，依次输出`nextTick3`,`nextTick4`,`nextTick2`,`promise then`


8. 这时，执行栈为空了，可是别忘了，我们的宏任务队列还放者一个timer函数待执行，进入timer函数：

    1）遇到log,内部没有其它函数，直接输出`setTimeout`;
    
    2）遇到promise.nextTick,属于微任务，放入微任务队列`nextTick1`;
    
9. 这个timer宏任务也执行完了，就马上执行完整个微任务队列，微任务队列目前只有一个任务，直接输出`nextTick1`；

10. 这时，执行栈又为空了，还有其它任务吗? 没有了，大功告成；

以上的这种当函数执行栈为空，从任务队列中去一个任务来执行。再次为空，再取一个任务来执行，如此循环，这就是Event Loop，事件循环机制；




 
 
参考资料：
https://segmentfault.com/a/1190000011198232
