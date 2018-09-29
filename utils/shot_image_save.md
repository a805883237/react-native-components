# 截图保存方案

使用第三方库 [react-native-view-shot](https://github.com/gre/react-native-view-shot)


##### 使用：
```js
import {captureRef} from "react-native-view-shot";

class ShotImage {
    
	saveImage(){
		captureRef(this.refs.shot_image_inner, {
			format: "png",
			quality: 1,
			result: "tmpfile",
			snapshotContentContainer: false
		}).then(url=>{
			console.log("图片缓存路径：", url);
			CameraRoll.saveToCameraRoll(url).then((local_uri) => {
				// 图片保存成功！ local_uri
				console.log("local success", local_uri)
			}).catch((err) => {
				// "图片保存失败 — -!";
				console.log("local err", err)
			})
		})
	}
	
	render(){
		return <View>
			<View ref="shot_image_inner">
				{/*在这里随便写*/}
			</View>
		</View>
	}
}
```
