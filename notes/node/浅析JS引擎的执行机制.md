
### 1. 前言
1. 众所周知，JS的执行环境是单线程的，`（这个线程就是浏览器的JS引擎）`，一次只能执行做一件事情；这种方式的缺点就是如果需要进行一些耗时的操作的话，会阻塞，降低用户体验；从而setTimeout(),setInterval(),ajax，onClick()等这种异步操作应运而生；
2. 这时，你也许会误认为以上的这几个异步操作，就使得JS引擎具有了多个线程；答案是错的，JS引擎仍然是单线程的，是浏览器内核实现了多个线程异步执行,这些线程在内核的控制下相互配合从而保持同步；

那么问题来了，JS引擎是如何配合浏览器处理这些定时器回调和事件的呢？那就需要了解浏览器内核的工作原理了；

### 2. 浏览器内核工作原理

1. 浏览器的线程
   
![image](https://note.youdao.com/yws/api/personal/file/7538ABB6FF0F44BAAD6407F36E407C1D?method=download&shareKey=7af88e3aed341652c4df90c18ad4747d)

- 这些异步线程会产生不同的异步事件；

    
2. 工作原理

![image](https://note.youdao.com/yws/api/personal/file/16F28CD77E104E608AED514810E0DD54?method=download&shareKey=7af88e3aed341652c4df90c18ad4747d)

- JS引擎是基于**事件驱动**的；（浏览器派给的任务）
- 以上的任务可以来自如下callbackFn： 
    - 界面元素鼠标点击事件；
    - 定时触发器时间到达通知；
    - 异步请求状态变更通知；
- JS引擎一直等待任务队列中的任务到来，且由于JS的单线程，这些任务需要排队进行处理 **（任务队列）** ；


相信上述内容看过之后，对于JS内核执行原理，已经有了深刻的印象。另外关于这个任务队列的执行，请参看我的另外一篇文章[浅析eventLoop]()


参考资料：
https://www.cnblogs.com/hksac/p/6596105.html
http://www.ruanyifeng.com/blog/2014/10/event-loop.html








