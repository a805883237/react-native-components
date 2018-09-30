# 发送验证码按钮 
经常使用，所以进行封装，使用时方便一些


* 效果预览图

_因为此次使用的手机号是错误的，所以发送有报错，在30s的时候就重置状态了。正常情况是倒计时到0s在重置。_

![效果预览](https://raw.githubusercontent.com/a805883237/react-native-components/master/impress_img/smsbutton.gif)


| 属性 | 类型 | 描述 | 默认值 | 是否必须 |
| ---------- | ---------- | ---------- | ---------- | ---------- |
| phone | string | 要发送的手机号 | null | true |
| check_present | boolean | 是否不用检查 | null |
| check_not_present | boolean | 是否不用检查 | null |
| old_phone | boolean | 是否是已注册用户 | null |
| disabled | boolean | 显示是否是 | null |
| isSended | boolean | 是否可以发送 | null |