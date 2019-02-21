import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Modal, List, Button, WhiteSpace, WingBlank,Toast } from 'antd-mobile';
import MyTabBar from "../components/TabBar";
import MyNavBar from "../components/MyNavBar";
import {loggedIn, loginOut, APIHost} from '../utils/fetch';
import {$} from 'jquery';
import * as Shop from '../services/shop';
import t01 from '../assets/images/5012.wav';
import t02 from '../assets/images/bao.png';
import t03 from '../assets/images/back.png';

import styles from "./styles/Yao.less";

@connect(state => ({ shop: state.shop }))

export default class Yao extends Component {
    state={
        check:1,
        num:'',
        data:'',
        data2:''
    }
    quxiao(){
        this.setState({
            check:1
        }) 
    }
    async componentDidMount(){
       
        const result=await Shop.chance();
        const data=result.data;
        // console.log(data,'pppppppppppp')
        this.setState({data:data})
        // 摇一摇
        init();
        var speed;
        var SHAKE_THRESHOLD = 3000;
        var last_update = 0;
        var x =0, y =0, z = 0,last_x =0, last_y = 0,last_z = 0;
        var _this=this;
        function init() {
            if (window.DeviceMotionEvent) {
                //移动浏览器支持运动传感事件
                window.addEventListener('devicemotion', deviceMotionHandler, false);
            } else {
                alert('您的设备不支持摇一摇功能,系统将自动为您摇动手机^_^');
                speed=888;
            }
        }

        function deviceMotionHandler(eventData) {
            var acceleration = eventData.accelerationIncludingGravity;
            var curTime = new Date().getTime();
            if ((curTime - last_update) > 100) {
                var diffTime = curTime - last_update;
                last_update = curTime;
                x = acceleration.x;
                y = acceleration.y;
                z = acceleration.z;
                speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;
                if(speed > SHAKE_THRESHOLD) {                 //当速度高于阈值时
                    var media = document.getElementById("musicBox"); //获取音频控件
                    media.setAttribute("src", t01);
                    media.load(); //加载音频
                    media.play(); //播放音频  
                    _this.setState({check:0})                  // 弹框显示
                    Shop.yao({}).then((result)=>{              //请求接口
                    
                        _this.setState({num:result.data.num,data2:result.data})
                    })
                    window.removeEventListener('devicemotion', deviceMotionHandler, false);
                  
                } 
                         
                last_x = x;
                last_y = y;
                last_z = z;
            }    
        }
        if(data.us_red_time==0){
            Toast.offline('您已经没有摇奖机会了',2);       
            window.removeEventListener('devicemotion', deviceMotionHandler, false);           
        } 
    }
    lingqu(){
        Toast.success('领取成功',2,()=>{
            const {dispatch}=this.props;
            dispatch(routerRedux.push('/Personal'))
        })
    }
    render(){
        const {check,num,data}=this.state;
        console.log(data,'dddddddddd')
        const {history}=this.props;
        const navBarProps = {
            leftVisible:true,
            leftFunc(){
                history.go(-1)
              },
            titleName:"摇一摇",
            rightContent:"",
        }
        const displaynone={
			display:"none"
		}
		const displayblock={
			display:"block"
		}
        return(
            <div className={styles.App}>  
                <audio id="musicBox" src=""></audio>     
                <style>
                    {`
                    .cc{
                        width: 100%;
                        height: 100%;
                        background-color: #000000;
                        opacity: 0.6;
                        position: fixed;
                        top: 0;
                    }
                    .box{
                        position: fixed;
                        width: 100%;
                        top: 20%;
                        border-radius: 0.25rem;
                       
                    }
                    .box img{
                        width: 100%;  
                    }
                    .tankuang{
                        width: 100%;
                        height: 100%;
                        background-color: #000000;
                        opacity: 0.6;
                        position: fixed;
                        top: 0;
                    }
                    .ss{
                        position: absolute;
                        top: 52%;
                        left: 50%;
                        font-size: 0.8rem;
                        color: #FFE56F;
                        font-weight: bold;
                        transform: translate(-50%)
                    }
                    .dianji{
                        // background:transparent;
                        // background:black;
                        width: 2.5rem;
                        height: 0.55rem;
                        position: absolute;
                        top: 74%;
                        left: 33%;
                    }
                    `}
                </style>
                {/*头部导航栏*/}
                <MyNavBar {...navBarProps}/>
                <div className={styles.ybg}>
                    <div className={styles.chance}>今天还有{data.us_red_time}次摇奖机会哦！</div>
                </div>
                <div className='cc' style={check===1?displaynone:displayblock} onClick={()=>this.quxiao()}></div>
                <div style={check===1?displaynone:displayblock} onClick={()=>this.quxiao()}>
                    <img src={t03} style={{position:'absolute',right:"8%",top:'4%',width:'0.5rem',height:'0.5rem'}} />
                </div>
                <div className='box' style={check===1?displaynone:displayblock}>
                    <img src={t02}   />
                    <div className='ss'>{num}￥</div>
                    <p className='dianji' onClick={()=>this.lingqu()}></p>   
                </div>
            </div>
        )
    }
} 