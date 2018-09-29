# 常用对话框

> 参考链接 ： https://github.com/victoriafrench/react-native-dialogbox

### 截面截图 && 参考代码
##### dialogbox.pop 
| 属性 | 类型 | 是否必须 |
| ------ | ------ | ------ |
| title | string | false |
| content | string\number\array<string\number> | true |
| btns | array<object> | false |

btns 取值：

| 属性 | 类型 | 是否必须 | 默认值 |
| ------ | ------ | ------ | ------ | 
| title | string | false | "OK" |
| style | object | false | null |
| callback | function | false | null |

* pop 三个按钮时 ， 显示有bug ，不建议使用
截图：

![效果预览](https://raw.githubusercontent.com/a805883237/react-native-components/master/impress_img/dialogbox_pop_3btns.jpg)

```js
this.dialogbox.pop({
		title: 'Animals',
		content: 'Which animal do you like?',
		btns: [
				{
						text: 'Frog',
						callback: () => {
								this.dialogbox.alert('Ribbit!');
						},
				},
				{
						text: 'Dog',
						callback: () => {
								this.dialogbox.alert('Woof!');
						},
				},
				{
						text: 'Cat',
						callback: () => {
								this.dialogbox.alert('Meow!');
						},
				}
		]
});
```
* pop 两个按钮时 ，显示正常
截图：

![效果预览](https://raw.githubusercontent.com/a805883237/react-native-components/master/impress_img/dialogbox_pop_2btns.jpg)

```js
this.dialogbox.pop({
		title: 'Animals',
		content: 'Which animal do you like?',
		btns: [
				{
						text: 'Frog',
						callback: () => {
								this.dialogbox.alert('Ribbit!');
						},
				},
				{
						text: 'Dog',
						callback: () => {
								this.dialogbox.alert('Woof!');
						},
				}
		]
});
```
* pop 一个按钮时 ，显示正常
截图：

![效果预览](https://raw.githubusercontent.com/a805883237/react-native-components/master/impress_img/dialogbox_pop_1btn.jpg)

```js
this.dialogbox.pop({
		title: 'Animals',
		content: 'Which animal do you like?',
		btns: [
				{
						text: 'Frog',
						callback: () => {
								this.dialogbox.alert('Ribbit!');
						},
				}
		]
});
```


##### dialogbox.alert
 
| 属性 | 类型 | 是否必须 |
| ------ | ------ | ------ |
| message | string | true |

**可以多个message ,多个间用, 分开**
* alert 显示两行text，底部只有一个按钮 "OK" , 无限竖行排列
截图：

![效果预览](https://raw.githubusercontent.com/a805883237/react-native-components/master/impress_img/dialogbox_alert_2text.jpg)

```js
this.dialogbox.alert('Ribbit!',"cccccc");
```



##### dialogbox.tip 
| 属性 | 类型 | 是否必须 | 默认值 |
| ------ | ------ | ------ | ------- |
| title | string | false | Tip |
| content | string\number\array<string\number> | true | null |
| btns | array<object> | false | "OK" |
* tip 显示两行text，底部只有一个按钮 "OK" , 无限竖行排列
截图：

![效果预览](https://raw.githubusercontent.com/a805883237/react-native-components/master/impress_img/dialogbox_tip_2text.jpg)

```js
this.dialogbox.tip({
	content: ['come on!', 'go!'],
	btn: {
		text: 'OKOK',
		callback: () => {
			this.dialogbox.alert('over!');
		},
	},
});
```


##### dialogbox.confirm 
| 属性 | 类型 | 是否必须 | 默认值 |
| ---------- | ---------- | ---------- | ----------- |
| title | string | false | Tip |
| content | string\number\array<string\number> | true | null |
| ok | object | false | {title:"OK"} |
| cancel | object | false | {title:"Cancel"} |

**ok 取值**

| 属性 | 类型 | 默认值 |
| ---------- | ---------- | ---------- |
| title | string | OK |
| style | object | null |
| callback | function | null |

**cancel 取值**

| 属性 | 类型 | 默认值 |
| ---------- | ---------- | ---------- |
| title | string | Cancel |
| style | object | null |
| callback | function | null |

截图：

![效果预览](https://raw.githubusercontent.com/a805883237/react-native-components/master/impress_img/dialogbox_confirm_all.jpg)

```js
this.dialogbox.confirm({
	title: 'title',
	content: ['come on!', 'go!'],
	ok: {
		text: 'Y',
		style: {
			color: 'red'
		},
		callback: () => {
			this.dialogbox.alert('Good!');
		},
	},
	cancel: {
		text: 'N',
		style: {
			color: 'blue'
		},
		callback: () => {
			this.dialogbox.alert('Hurry up！');
		},
	},
});
```

