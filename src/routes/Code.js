import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Icon, List ,Toast} from 'antd-mobile';
import {loggedIn, loginOut, APIHost} from '../utils/fetch';
import MyNavBar from "../components/MyNavBar";
import * as Shop from '../services/shop';
import styles from "./styles/Code.less";
import t01 from '../assets/images/zhidao.jpg';
import tx from '../assets/images/tx.png';
import t04 from '../assets/images/t04.png';
import t05 from '../assets/images/t05.png';
import t03 from '../assets/images/t03.png';
import t02 from '../assets/images/jian.png';
// import domtoimage from 'dom-to-image';
var queryString = require('querystring');



var QRCode = require('qrcode.react');
@connect(state => ({ shop: state.shop }))


export default class Code extends Component {
    state={
        imgUrl:"",
        check:1,
        codelist:''
    }
    async componentDidMount(){
        const {location,dispatch} = this.props;
        const results=await Shop.PersonalInfo();
        this.setState({
            codelist:results.data
        })
        
        let isIOS = function() {
            var isIphone = navigator.userAgent.includes('iPhone');
            var isIpad = navigator.userAgent.includes('iPad');
            return isIphone || isIpad;
        };
        //判断是否是 ios 系统
        if (isIOS()) {
            const _not_first_invite = sessionStorage.getItem('not_first_invite');
            if ( !_not_first_invite ) {
                sessionStorage.setItem('not_first_invite', '1');
                window.location.reload();
            }else{
                sessionStorage.setItem('not_first_invite', '0');
            }
        } else {
            
        }
        var d=window.location.href.replace(window.location.hash, "");
        if(navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1){    
            const result=await Shop.erweima({url:d});
            //判断是在微信内部打开,还是浏览器里打开
            if(result.code===0){
                Toast.offline(result.msg, 2);
            }else{
                    window.wx.config({
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: result.data.appId, // 必填，公众号的唯一标识
                        timestamp: result.data.timestamp, // 必填，生成签名的时间戳
                        nonceStr: result.data.nonceStr, // 必填，生成签名的随机串
                        signature: result.data.signature,// 必填，签名
                        request_url:d,
                        jsApiList: ['onMenuShareAppMessage','onMenuShareTimeline'] // 必填，需要使用的JS接口列表
                    });
                    window.wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
                        window.wx.onMenuShareAppMessage({ 
                            title: '安职啦', // 分享标题
                            desc: '安职啦，帮你找工作！', // 分享描述
                            link: "https://www.yahoosp.cn/?id="+results.data.us_account, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            imgUrl: "https://www.yahoosp.cn/static/logo01.7df767d7.png", // 分享图标

                            success: function () {
                            // 设置成功
                            }
                        });
                        window.wx.onMenuShareTimeline({ 
                            title: "安职啦", // 分享标题
                            link: "https://www.yahoosp.cn/?id="+results.data.us_account, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            imgUrl:"https://www.yahoosp.cn/static/logo01.7df767d7.png" , // 分享图标
                            success: function () {
                            // 设置成功
                            }
                        });
                    });
            }
        }
    }
    UNSAFE_componentWillReceiveProps(props){
        const {codelist}=this.state;
        // const {shop}=props;
        // const codelist=shop.userInfo;
        if(codelist.us_person_pic){
          this.setState({
            imgUrl:codelist.us_person_pic,
          
          })
        }
    }
    //背景图上传
    async getLocalImg(e){
        // const {shop}=this.props;
        // const codelist=shop.userInfo;
        const {codelist}=this.state;
        var formData = new FormData();
        formData.append("imgaaaa",e.target.files[0]);
        formData.append("id",codelist.id);
        
        Toast.loading("正在上传背景图", 0);
        const result =await Shop.bgpic(formData);
       
        Toast.hide();
        if(result.code == 1){
            this.setState({
                imgUrl:result.data
            })
            Toast.success('上传成功!',1);
        }else{
            Toast.offline("上传失败请重新尝试",1);
        }
    }
    quxiao(){
        this.setState({
            check:1
        }) 
    }
    block(){
        this.setState({
            check:0
        })
    }
    
    render(){
        
        const {history,dispatch,shop}=this.props;
        // const codelist=shop.userInfo;
        const {imgUrl,check,codelist}=this.state;
        const displaynone={
			display:"none"
		}
		const displayblock={
			display:"block"
		}
        return(
            <div className={styles.App}>
                <style>
                    {`
                    .fengmianDiv input{ display:none;}
                    .fengmianDiv img{ 
                    width: 100%;
                    height: 4.5rem
                    } 
                    .am-icon-md{
                        position: absolute;
                        color: white;
                        margin-left: 0.3rem;
                        margin-top: 0.3rem;
                    }
                    .left{
                        color:#333333;
                    }
                    .cc{
                        width: 100%;
                        height: 100%;
                        background-color: #000000;
                        opacity: 0.6;
                        position: fixed;
                        top: 0;
                    }
                    .ss{
                        position: fixed;
                        display: block;
                        top: 48%;
                        width: 100%;
                        text-align: center;
                        font-size: 0.5rem;
                        color: white;
                    }
                    .sss{
                        position: fixed;
                        display: block;
                        top: 8%;
                        left: 46%;
                        width: 41%;
                        text-align: center;
                        font-size: 0.4rem;
                        color: white;
                    }
                    `}
                </style>
                 {/*头部导航栏*/}
                 {/* <MyNavBar {...navBarProps}/> */}
                <div className={styles.bgimg}>
                    <Icon type="left" className="left" onClick={ ()=>history.go(-1)} />
                    <label className="fengmianDiv">
                        <input id="imgURl" name="from" type="file" onChange = {this.getLocalImg.bind(this)}  accept="image/*"  />
                        <img className="id_card" ref="cover" name="enter_imgsPath" src={APIHost+imgUrl} />
                    </label>   
                    <div className={styles.imgps}>
                        <dl>
                            <dt>
                                <img src={APIHost+codelist.us_head_pic} alt=""/>
                            </dt>
                            <dd>
                                <h5><span>{codelist.us_real_name}</span><span style={{paddingLeft:'0.2rem'}}>{codelist.us_account}</span></h5>
                                <p>我推荐的准没错！</p>
                            </dd>
                            <div style={{clear:"both"}}></div>
                        </dl>
                    </div> 
                    <div  ref="my_img" className={styles.imgcode}>
                        <img className={styles.mama} src={"http://qr.liantu.com/api.php?text=https://www.yahoosp.cn/?id="+codelist.us_account} />
                    </div> 
                    <div className={styles.bottom}>
                        <dl onClick={()=>this.block()}>
                            <dt>
                                <img src={t05} alt=""/>
                            </dt>
                            <dd>微信好友</dd>
                        </dl>
                        <dl onClick={()=>this.block()}>
                            <dt>
                                <img src={t03} alt=""/>
                            </dt>
                            <dd>朋友圈</dd>
                        </dl>
                     
                    </div>         
                </div>
                <div className='cc' style={check===1?displaynone:displayblock} onClick={()=>this.quxiao()}></div>
                <img  className='sss'  src={t02} style={check===1?displaynone:displayblock} />
                <div className='ss' style={check===1?displaynone:displayblock}>
                请在微信浏览器中打开
                </div>
            </div>
        )
    }
}