import React, {
    Component,
    PropTypes,
} from 'react';

import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native';
import _ from 'lodash'


const styles = StyleSheet.create({
    flex: {
        flex: 1
    },
    flexDirection: {
        flexDirection: 'row'
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 30,
        //color: '#FFF',
        //marginLeft: 7,
    },
    container: {
        flexDirection: 'row',
    },
    //时间文字
    defaultTime: {
        // paddingHorizontal: 3,
        // backgroundColor: '#f000',
        fontSize: 14,
        // color: 'rgba(85, 85, 85, 1)',
        // marginHorizontal: 3,
        // borderRadius: 2,
    },
    // 天、时、分、秒
    defaultColon: {}
});

class CountDown extends Component {
    static displayName = 'Simple countDown';
    static propTypes = {
        date: PropTypes.string,
        showColon: PropTypes.bool,
        days: PropTypes.objectOf(PropTypes.string),
        hours: PropTypes.string,
        mins: PropTypes.string,
        segs: PropTypes.string,
        onEnd: PropTypes.func,

        containerStyle: View.propTypes.style,
        viewNumber: View.propTypes.style,
        viewNumberSpecial: View.propTypes.style,//特殊的处理天
        daysStyle: Text.propTypes.style,
        hoursStyle: Text.propTypes.style,
        minsStyle: Text.propTypes.style,
        secsStyle: Text.propTypes.style,
        firstColonStyle: Text.propTypes.style,
        secondColonStyle: Text.propTypes.style,

    };
    static defaultProps = {
        date: new Date(),
        showColon: false,
        days: {
            plural: '天',
            singular: '天',
        },
        hours: ':',
        mins: ':',
        segs: ':',
        onEnd: () => {
        },

        viewNumber: {},//viewNumber 的style
        viewNumberSpecial:{},
        containerStyle: styles.container,//container 的style
        daysStyle: styles.defaultTime,//天数 字体的style
        dayLabelStyles: styles.defaultTime,//天数 字体的style 后面的天的样式
        hoursStyle: styles.defaultTime,//小时 字体的style
        minsStyle: styles.defaultTime,//分钟 字体的style
        secsStyle: styles.defaultTime,//秒数 字体的style
        firstColonStyle: styles.defaultColon,//从左向右 第一个冒号 字体的style
        secondColonStyle: styles.defaultColon,//从左向右 第2个冒号 字体的style

    };
    state = {
        days: 0,
        hours: 0,
        min: 0,
        sec: 0,
    };

    componentDidMount() {
        this.interval = setInterval(() => {
            const date = this.getDateData(this.props.date);
            if (date) {
                this.setState(date);
            } else {
                this.stop();
                this.props.onEnd();
            }
        }, 1000);
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.status!==this.props.status){
            this.interval = setInterval(() => {
                const date = this.getDateData(nextProps.date);
                if (date) {
                    this.setState(date);
                } else {
                    this.stop();
                    this.props.onEnd();
                }
            }, 1000);
        }

    }
    componentWillMount() {
        const date = this.getDateData(this.props.date);
        if (date) {
            this.setState(date);
        }

    }

    componentWillUnmount() {
        this.stop();
    }

    getDateData(endDate) {
        var regEx = new RegExp("\\-","gi");
        let endTime=new Date(Date.parse(endDate.replace(regEx,"/")));
        let curTime=new Date();
        let diff = Math.round((endTime - curTime) / 1000);

        if (diff <= 0) {
            return false;
        }

        const timeLeft = {
            years: 0,
            days: 0,
            hours: 0,
            min: 0,
            sec: 0,
            millisec: 0,
        };
            if (diff >= (365.25 * 86400)) {
                timeLeft.years = Math.floor(diff / (365.25 * 86400));
                diff -= timeLeft.years * 365.25 * 86400;
            }
        if (!_.isEmpty(this.props.daysStyle)) {
            if (diff >= 86400) {
                timeLeft.days = Math.floor(diff / 86400);
                diff -= timeLeft.days * 86400;
            }
        }
        if (diff >= 3600) {
            timeLeft.hours = Math.floor(diff / 3600);
            diff -= timeLeft.hours * 3600;
        }
        if (diff >= 60) {
            timeLeft.min = Math.floor(diff / 60);
            diff -= timeLeft.min * 60;
        }
        timeLeft.sec = diff || 0;
        return timeLeft;
    }

    render() {
        const countDown = this.state;
        const { viewNumber,viewNumberSpecial } = this.props;
        /**
         *  ☆☆☆☆☆  ？？？ Android 不支持 Text 包裹 View. Android 不能用。 ☆☆☆☆☆
         *
         * showColon 控制 "数字" 后显示 "冒号" 或者是 "时间单位"
         *  showColon true      // 显示冒号
         *  showColon false      // 显示时间单位
         *
         *  viewNumber （由于再次封装，viewNumber 可以忽略。）
         * viewNumber 是控制倒计时 "数字" 样式， 否则圆角设置不管用, 用View 包裹起来.
         *   viewNumber 必须有 width 属性    width: 50 * scrnRatioX （如果 fontSize: 24 * scrnRatioX  ====参考）
         *   viewNumber 必须有 height 属性   height: 35 * scrnRatioY（如果 fontSize: 24 * scrnRatioX  ====参考）
         *   包含Text 组件的父级必须具有 宽 高 属性。
         *     viewNumber 会导致后边的 "冒号" 或者 "时间单位" 样式变形，（整体偏下。 "冒号" 已经有过调整，不过不太完美。）
         *
         * renderDayNumber 和 renderOrder 将样式提取出来， 是通过 viewNumber 来显示是否自定义 number
         *  如果自定义 （会导致后边的 "冒号" 或者 "时间单位" 样式变形，）同上。
         *
         * */

        const renderDayNumber = () => {
            if ( !_.isEmpty(viewNumber)) {
                return (
                    <View style={[viewNumber,viewNumberSpecial]}><Text
                        style={this.props.daysStyle}>{countDown.days > 0 ? this.leadingZeros(countDown.days) : "0"}</Text></View>
                )
            }
            return <Text style={this.props.daysStyle}>{ this.leadingZeros(countDown.days)}</Text>
        };

        let timeAndStyle = [
            {style: this.props.hoursStyle, time: countDown.hours},
            {style: this.props.minsStyle, time: countDown.min},
            {style: this.props.secsStyle, time: countDown.sec},
        ];

        const renderOrder = (timeAndStyle) => {
            if ( !_.isEmpty(viewNumber)) {
                return <View style={[viewNumber]}>
                            <Text style={timeAndStyle.style}>{ this.leadingZeros(timeAndStyle.time)}</Text>
                        </View>
            }
            return <Text style={timeAndStyle.style}>{ this.leadingZeros(timeAndStyle.time)}</Text>
        };

        return (

        <View style={[styles.flexDirection, styles.containerStyle, {alignItems: 'center'},this.props.containerStyle]}>
            { !_.isEmpty(this.props.daysStyle) ? renderDayNumber() : null}
            { !_.isEmpty(this.props.daysStyle) ?
                <Text style={[this.props.firstColonStyle , this.props.dayLabelStyles]}>{" 天 "}</Text> : null}
            {renderOrder(timeAndStyle[0])}
            <Text style={this.props.firstColonStyle}>{this.props.showColon ? " : " : " 时 "}</Text>

            {renderOrder(timeAndStyle[1])}
            <Text style={this.props.secondColonStyle}>{this.props.showColon ? " : " : " 分 "}</Text>

            {renderOrder(timeAndStyle[2])}
            <Text style={this.props.secondColonStyle}>{this.props.showColon ? "" : " 秒"}</Text>

        </View>
        );
    }

    stop() {
        clearInterval(this.interval);
    }

    leadingZeros(num, length = null) {

        let length_ = length;
        let num_ = num;
        if (length_ === null) {
            length_ = 2;
        }
        num_ = String(num_);
        while (num_.length < length_) {
            num_ = '0' + num_;
        }
        return num_;
    }
}

export default CountDown;