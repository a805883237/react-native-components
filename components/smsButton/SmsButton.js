// 验证码 按钮


import React from 'react';
import{
    Text,
    TouchableOpacity,
} from 'react-native';

import {connect} from 'react-redux';
import { sendCaptcha } from '../reducers/actions/auth';

class SmsButton extends React.Component {

    state = {
        secondsElapsed: 30, sendText: '发送验证码', sended: false
    };

    componentWillMount() {
        const { isSended } = this.props;
        if ( isSended ) {
            this.setState({sended: isSended});
            this.interval = setInterval(this.tick.bind(this), 1000);
        }
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }
    tick() {
        if (!!this.state.secondsElapsed) {
            this.setState({secondsElapsed: this.state.secondsElapsed - 1});
        } else {
            clearInterval(this.interval);
            this.setState({sended: false, secondsElapsed: 30});
        }
    }

    btnClick() {
        this.setState({sended: true});
        this.interval = setInterval(this.tick.bind(this), 1000);
        let {phone,check_present,check_not_present , old_phone = false}=this.props;
        this.props.dispatch(sendCaptcha({phone: phone,check_present: check_present,check_not_present: check_not_present ,old_phone : old_phone})).catch(()=>{
            let that = this;
            setTimeout(function(){
                that.setState({sended: false, secondsElapsed: 30});
            },2500)
            clearInterval(this.interval);
        })
    }

    render() {
        // 新增 当电话为0  按钮不可用字段 判断 表达式  this.state.sended ? this.state.sended : (this.props.disabled || false)
        const text = this.state.sended ? (this.state.secondsElapsed + 's后重新获取') : this.state.sendText;
        let bgc=
            (this.state.sended
                ? this.state.sended
                : (this.props.disabled || false) )
                ? {backgroundColor:"lightgray"}
                : {backgroundColor:  "#d74047"};
        return (
            <TouchableOpacity onPress={() => {this.btnClick()}}
                        style={[{width:100,height:39,marginVertical:3,marginRight:10
                            ,borderRadius:5,
                            alignItems:'center',justifyContent:'center'},bgc]}
                              disabled={this.state.sended ? this.state.sended : (this.props.disabled || false)}>
                <Text style={{fontSize:13,color:'#fff'}}>{text}</Text>
            </TouchableOpacity>
        );
    }

}
export default connect()(SmsButton)
