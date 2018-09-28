import React, { PropTypes } from 'react';
import { Image, ImageBackground, ActivityIndicator, View } from 'react-native';

//clone from : https://github.com/TuNguyenThanh/react-native-image-placeholder

//placeholderSource	require('./Images/empty-image.png')	Show placeholderSource if the source can't be loaded or error.
//loadingStyle	size: 'small'; color: 'gray'	Style ActivityIndicator
//isShowActivity	true	Show ActivityIndicator loading
//placeholderStyle		Style placeholder image
//customImagePlaceholderDefaultStyle		Custom style image placeholder default
//borderRadius		Border radius

// 用法
//import ImageLoad from 'react-native-image-placeholder';


//<ImageLoad
//  style={{ width: 320, height: 250 }}
//  loadingStyle={{ size: 'large', color: 'blue' }}
//  source={{ uri: 'https://4.bp.blogspot.com/-lYq2CzKT12k/VVR_atacIWI/AAAAAAABiwk/ZDXJa9dhUh8/s0/Convict_Lake_Autumn_View_uhd.jpg' }}
///>
class ImageLoad extends React.Component {
  static propTypes = {
    isShowActivity: PropTypes.bool,
  };

  static defaultProps = {
    isShowActivity: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      isError: false
    };
  }

  onLoadEnd(){
    this.setState({
      isLoaded: true
    });
  }

  onError(){
    this.setState({
      isError: true
    });
  }

  render() {
    return(
      <Image
        onLoadEnd={this.onLoadEnd.bind(this)}
        onError={this.onError.bind(this)}
        style={[styles.backgroundImage, this.props.style]}
        source={this.props.source}
        resizeMode={this.props.resizeMode}
        borderRadius={this.props.borderRadius}
      >
        {
          (this.state.isLoaded && !this.state.isError) ? this.props.children :
            <View style={styles.viewImageStyles}>
              {
                this.props.isShowActivity &&
                <ActivityIndicator
                  style={styles.activityIndicator}
                  size={this.props.loadingStyle ? this.props.loadingStyle.size : 'small'}
                  color={this.props.loadingStyle ? this.props.loadingStyle.color : 'gray'}
                  resizeMod = { 'cover'}
                />
              }
              <Image
                style={this.props.placeholderStyle ? this.props.placeholderStyle : [styles.imagePlaceholderStyles, this.props.customImagePlaceholderDefaultStyle]}
                source={this.props.placeholderSource ? this.props.placeholderSource : require('./empty-image.png')}
              >
              </Image>
            </View>
        }
        {
          this.props.children &&
          <View style={styles.viewChildrenStyles}>
            {
              this.props.children
            }
          </View>
        }
      </Image>
    );
  }
}

const styles = {
  backgroundImage: {
    position: 'relative',
  },
  activityIndicator: {
    position: 'absolute',
    margin: 'auto',
    zIndex: 9,
  },
  viewImageStyles: {
    flex: 1,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8'
  },
  imagePlaceholderStyles: {
    flex:1,
    // width: 100,
    // height: 100,

    justifyContent: 'center',
    alignItems: 'center',
  },
  viewChildrenStyles: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    backgroundColor: 'transparent'
  }
}

export default ImageLoad;