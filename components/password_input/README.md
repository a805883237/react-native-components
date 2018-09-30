# 密码输入框，带遮掩功能

使用条件： 图标使用 Iconfont ，可自行更换图标

截图：

![效果预览](https://raw.githubusercontent.com/a805883237/react-native-components/master/impress_img/passwordInput.gif)

使用例子：
```js
class example{
	 getPassword(item) {
	    //item 就是输入框的值
	}
	render(){
		return (<PasswordTextInput placeholder={"请输入密码(6位以上字符)"}
															 changePassword={(text) => {this.getPassword(text) }}/>)
	}
}
```