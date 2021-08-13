# vs-bubble

气泡

## 使用

```js
import VsBubble from 'vs-bubble';
const vsBubble = new VsBubble();

vsBubble.start([10, 100]);
vsBubble.start(
  100,
  (current) => {},
  () => {}
);
```

## 参数

| 参数名      | 描述     | 可选值 | 默认值 |
| ----------- | -------- | ------ | ------ |
| animateTime | 动画时长 | number | 3000   |
| fps         | 帧数     | number | 30     |

# 方法

| 方法名 | 描述     | 参数                         |
| ------ | -------- | ---------------------------- |
| start  | 开始动画 | value,onAnimate,onEndAnimate |

1. value 可以为数字或二位数组

- 30 结束值为 30
- [30, 100] 开始值为 30 结束值为 100

2. onAnimate 进行中回调

- current, frameIndex, values

3. onEndAnimate 结束回调