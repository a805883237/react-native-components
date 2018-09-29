# 倒计时组件

##### props取值
| 属性 | 类型 | 描述 | 默认值 |
| ------ | ------ | ------ |  ------ |
| showColon | boolean | true:显示冒号 , false:显示时间单位 | false |
| viewNumber | style:{} | 是控制倒计时 "数字" 样式， 否则圆角设置不管用, 用View 包裹起来。 | {} |
| viewNumberSpecial | style:{} | 特殊的处理天。 | {} |
| containerStyle | style:{} | 最外层的样式。 | {} |
| daysStyle | style:{} | 天数字体的style。 | {} |
| dayLabelStyles | style:{} | 后面的"天"的样式。 | {} |
| hoursStyle | style:{} | 小时 字体的style。 | {} |
| minsStyle | style:{} | 分钟 字体的style。 | {} |
| secsStyle | style:{} | 秒 字体的style。 | {} |
| firstColonStyle | style:{} | 从左向右 第一个冒号 字体的style。（小时和分钟之间的符号） | {} |
| secondColonStyle | style:{} | 从左向右 第一个冒号 字体的style。(时分、分秒的连接符) | {} |


##### 默认传入参数
```js
defaultProps = {
		date: new Date(),
		showColon: false, // true:显示冒号 , false:显示时间单位
		days: {
				plural: '天',
				singular: '天',
		},
		hours: ':',
		mins: ':',
		segs: ':',
		onEnd: () => {
		},  // 倒计时结束时执行的回调

		viewNumber: {},//viewNumber 的style
		viewNumberSpecial:{}, // 特殊的处理天
		containerStyle: styles.container,//container 的style
		daysStyle: styles.defaultTime,//天数 字体的style
		dayLabelStyles: styles.defaultTime,//天数 字体的style 后面的天的样式
		hoursStyle: styles.defaultTime,//小时 字体的style
		minsStyle: styles.defaultTime,//分钟 字体的style
		secsStyle: styles.defaultTime,//秒数 字体的style
		firstColonStyle: styles.defaultColon,//从左向右 第一个冒号 字体的style
		secondColonStyle: styles.defaultColon,//从左向右 第2个冒号 字体的style
};
```

###### 使用例子：
```
<CountDownTimer
	date={date || ""}
	days={{plural: '天', singular: '天'}}
	showColon={true}
	containerStyle={[styles.countDownTimerStyles]}
	daysStyle={[styles.daysStyle,]}
	hoursStyle={[styles.text_time_number]}
	minsStyle={[styles.text_time_number]}
	secsStyle={[styles.text_time_number]}
	firstColonStyle={[styles.text_time]}
	secondColonStyle={[styles.text_time]}/>
```