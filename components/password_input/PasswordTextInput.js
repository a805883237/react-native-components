import React, {Component} from 'react';
import{
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    TextInput,
} from 'react-native';
import Icon from './Iconfont';
class PasswordTextInput extends Component {
    constructor(props) {
        super(props);
        this.buttonChangeState = this.buttonChangeState.bind(this);
        this.state = {
            is_show_psw: true,
        }
    }

    buttonChangeState() {
        this.setState({
            is_show_psw: !this.state.is_show_psw
        })
    }

    render() {
        return (
            <View style={{flexDirection: 'row', height: 45, alignItems: 'center'}}>
                <TextInput
                    style={styles.input}
                    placeholder={this.props.placeholder}
                    placeholderTextColor="#aaaaaa"
                    underlineColorAndroid="transparent"
                    returnKeyType='done'
                    numberOfLines={1}
                    autoCorrect={false}//自动修正
                    autoCapitalize="none"
                    secureTextEntry={this.state.is_show_psw}
                    onChangeText={(text) => {
                        this.props.changePassword(text,this.props.position);
                    }}
                />
                <TouchableOpacity onPress={() => {
                    this.buttonChangeState(1)
                }} style={{width: 45, height: 45, alignItems: 'center', justifyContent: 'center'}}>
                    {
                        this.state.is_show_psw == false ?
                            (<Icon name={'icon-kejian'} color={'#999'} size={20} style={{marginLeft: 13}}/>)
                            :
                            (<Icon name={'icon-hide'} color={'#999'} size={20} style={{marginLeft: 13}}/>)
                    }
                </TouchableOpacity>
            </View>
        );
    }
}
const styles=StyleSheet.create({
    input :{
        height:30,
        marginTop:8,
        marginLeft:12,
        fontSize: 15,
        textAlign: 'left',
        paddingTop: 0,
        paddingBottom: 0,
        textAlignVertical:'center',
        flex:1
    }
});

export default PasswordTextInput;