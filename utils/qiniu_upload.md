# 图片上传到七牛方案处理：
结合第三方包：


```js
import React, {Component} from 'react';
import {
	StyleSheet,
	View,
	PixelRatio,
	Platform,
	Image,
	TouchableOpacity,
} from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';  // 上传图片格式转换成blob格式
var ImagePicker = require('react-native-image-picker');

import Icon from '../component/Iconfont'; //此处用到选择图片的icon
import { getUpToken } from '../utils/CommonUtils'; // 获取七牛上传token
import { API_CONFIG } from '../config/api';  // 拼接上传后显示图片的url


class PicturePicker extends Component {
	static defaultProps = {
		style: {
			borderRadius: 35,
			width: 70,
			height: 70
		}
	};

	constructor(prop) {
		super(prop);
        this.selectPhotoTapped=this.selectPhotoTapped.bind(this);
		this.state = {
			avatarSource: null,
			videoSource: null
		}
	}
// 显示选择图片 ， 选中后上传
	selectPhotoTapped() {
		let {isAvatar}= this.props;
		const options = {
			title: '选择', // specify null or empty string to remove the title
			cancelButtonTitle: '取消',
			takePhotoButtonTitle: '拍摄', // specify null or empty string to remove this button
			chooseFromLibraryButtonTitle: '选择照片', // specify null or empty string to remove this button
			mediaType: "photo",
			maxWidth: isAvatar?200:620,
			maxHeight: isAvatar?200:620,
			//storageOptions:true,// 图片路径,不是临时路径
			noData: true,
			quality: 1
		};
		var res_url={} ;
		var that = this;
		ImagePicker.showImagePicker(options, (response) => {
			if (response.didCancel) {
				console.log('User cancelled photo picker');
			}
			else if (response.error) {
				console.log('ImagePicker Error: ', response.error);
			}
			else if (response.customButton) {
				console.log('User tapped custom button: ', response.customButton);
			}
			else {
				//设置传递参数
				let source = {uri: response.uri};
				let image_type; // 图片类型 安卓ios 路径不一样
				if(Platform.OS === 'ios') {
					// uri (on iOS)
					source = {uri: response.uri.replace('file://', '')};
					image_type =response.uri.split(".").pop()
				}else{
				// uri (on android)
					source = {uri: response.uri};
					image_type=response.type.split("/").pop();
				}
				var timestamp = (new Date()).valueOf();
				var key = timestamp + Math.random() + "." + image_type;
				source["key"]=key;
				//图片上传
				let url = "http://upload.qiniu.com";
				getUpToken().then(function (res_token) {
					return RNFetchBlob.fetch('POST',url, {
						'Content-Type' : 'multipart/form-data'
					}, [
						{ name: 'file',
							filename: response.fileName||'未命名文件.jpg',
							type: "image/jpeg",
							data: RNFetchBlob.wrap(source.uri)},
						{ name : 'key', data : source["key"] },
						{ name : 'token', data : res_token}
					]).then((res)=>{
						let response1 = JSON.parse(res.data);
						res_url["key"] = response1.key ;
						res_url["url"] = API_CONFIG.qiniu + "/" + response1.key +"-thumb";
						console.log("155555551" ,res_url ,that)

						// 设置本地图片
						that.setState({
							avatarSource: {uri:res_url["url"]}
						});

						if (that.props.getImageKey) {
							that.props.getImageKey(res_url["key"]);
						}
						// res.data 是个字符串 转换成json 之后 , 有key 和 hash 两个值,其中key值需要回传
					}).catch((err)=>{
						console.log("出错",err)
					});
				}).catch((err)=>{console.log("erro",err)})

			}
		});
	}

	_avatarStyle() {
		return this.props.style
	}
	//空头像
	renderEmptyUserPic(size = 32){
		let styles=this._avatarStyle();
		// 从设定的图片大小中,提取宽度(高度) *0.8 得到的是icon 所对应的大小,如果都没有就是默认值 32 ,也就是图片大小为40
		let iconSize= (styles.width || styles.height)? (styles.width || styles.height)* 0.8 : size;
		return(
			<View style={[styles,{alignItems:'center',justifyContent:'center',backgroundColor:"#ccc"}]}>
				<Icon name="icon-xuanzetupian" color="rgba(235, 235, 235, 1)" size={iconSize}/>
			</View>
		)
	}

	render() {
		let default_img = this.props.default_url ? { uri : this.props.default_url} : undefined;
		let imageContainer;
		if (this.state.avatarSource === null) {
			if(default_img){
			imageContainer = (
				<Image style={[this._avatarStyle(), {resizeMode: 'stretch'}]} source={default_img}/>
			);
			}else {
				imageContainer = this.renderEmptyUserPic()
			}
		} else {
			imageContainer = (
				<Image style={[this._avatarStyle(), {resizeMode: 'stretch'}]} source={ this.state.avatarSource }/>
			)
		}
		return (
			<TouchableOpacity
				disabled={ this.props.disabled }
				onPress={ this.selectPhotoTapped.bind(this)}
				style={styles.container}
			>
				<View style={[this._avatarStyle(), styles.avatarContainer]}>
					{
						imageContainer
					}
				</View>
			</TouchableOpacity>
		)
	}

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
		// ,
		// backgroundColor: '#F5FCFF'
	},
	avatarContainer: {
		borderColor: '#9B9B9B',
		borderWidth: 1 / PixelRatio.get(),
		justifyContent: 'center',
		alignItems: 'center'
	},
	avatar: {
		borderRadius: 35,
		width: 70,
		height: 70
	}
});

PicturePicker.defaultProps = {
    disabled: false,
};  // 注意这里有分号

PicturePicker.propTypes = {
    disabled: React.PropTypes.bool,
};  // 注意这里有分号
export default PicturePicker;
```