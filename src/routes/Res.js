import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import * as Shop from '../services/shop';
import { Button, WhiteSpace, ImagePicker,InputItem,Toast} from 'antd-mobile';
import MyNavBar from "../components/MyNavBar";
import styles from "./styles/Res.less";
import {loggedIn, loginOut, APIHost} from '../utils/fetch';
import logo06 from '../assets/images/logo06.png';
import logo02 from '../assets/images/logo02.png';
import logo04 from '../assets/images/logo04.png';
import logo05 from '../assets/images/logo05.png';
import logo07 from '../assets/images/logo6.png';
import logo08 from '../assets/images/logo7.png';
var queryString = require('querystring');
@connect(state => ({ shop: state.shop }))
export default class Res extends Component {
    state={
        val:"获取验证码",
        codeflag:0,
        jname:"",
        name:"",
        phone:"",
        code:"",
        loginpsw:"",
        passpsw:"",
        idcard:"",
        p_acc:"",
        addviceVal:"",
        tt:"",
        check:1,
        files:[],
        files1: [],
        files2: [],
        zimg:'',
        fimg:''
        // xdata:'',
    }
    // onChange1 = (files, type, index) => {
    //     console.log(files, type, index);
    //     this.setState({
    //       files1:files,
    //     });
    //   }
    
    async onChange1(files1, type, index) {
        if(files1!==[]){
          this.setState({files1: (files1.length > 0 ? files1 : [])});
          const value = await Shop.uploadImg({imgaaaa:files1.length>0?files1[0].url:null}); 
            if(value.code == 1){
                this.setState({
                    zimg:value.data
                })
                Toast.success('上传成功',2)
            }else{
                  Toast.fail(value.msg,2)
                  return;
            }
        }
        this.setState({
          files1,
          
        });
    }
    async onChange2(files2, type, index) {
        if(files2!==[]){
          this.setState({files2: (files2.length > 0 ? files2 : [])});
          const value = await Shop.uploadImg({imgaaaa:files2.length>0?files2[0].url:null}); 
            if(value.code == 1){
                this.setState({
                    fimg:value.data
                })
                  Toast.success('上传成功',2)
              }else{
                  Toast.fail(value.msg,2)
                  return;
              }
        }
        this.setState({
          files2,
        });
    }
    // onChange2 = (files, type, index) => {
    //     console.log(files, type, index);
    //     this.setState({
    //       files2:files,
    //     });
    // }
    //昵称
    inputj(val){
        this.setState({
            jname:val
        })
    }
    inputName(val){
        this.setState({
            name:val
        })
    }
    inputPhone(val){
        this.setState({
            phone:val
        })
    }
    inputCode(val){
        this.setState({
            code:val
        })
    }
    inputPwd(val){
        this.setState({
            loginpsw:val
        })
    }
    // inputPass(val){
    //     this.setState({
    //         passpsw:val
    //     })
    // }
    // inputCard(val){
    //     this.setState({
    //         idcard:val
    //     })
    // }
    btnval(val){
        this.setState({
            addviceVal:val
        })
        
    }
    tankuang(){
        this.setState({
            check:0
        }) 
     }
     quxiao(){
        this.setState({
            check:1
        }) 
    }
     //处理富文本
     htmlspecialchars_decode(str, APIHost){
        str = str.replace(/&amp;/g, '&');
        str = str.replace(/&lt;/g, '<');
        str = str.replace(/&gt;/g, '>');
        str = str.replace(/&quot;/g, '"');
        str = str.replace(/&#039;/g, "'");
        str = str.replace(/\/ueditor/g,APIHost+'/ueditor' );
        return str;
    }
    

   
    //获取验证码
    async codeClick(){
        let tel=this.state.phone;
        const us_tel = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;    
        if(us_tel.test(this.state.phone)){
            let fortime=60;
            const _this=this;
            const value =await Shop.getCode({us_tel:tel,type:"reg"});
            if(value.code===1){
                this.setState({
                    codeflag:1,
                })
                if(_this.state.codeflag){
                let secon=setInterval(function(){
                    _this.setState({
                    val:`${fortime--}s`
                    })
                    if(_this.state.codeflag===0||fortime<=-1){
                    clearInterval(secon);
                    _this.setState({
                        val:"再次获取",
                        codeflag:0
                    })
                    }
                },1000)
                }
            }else{
                Toast.offline(value.msg,1);
            }
        }else{
          Toast.offline("请输入11位手机号",1);
          return;
        }
      }
      //注册
      async register(){
        const {dispatch,register}=this.props;
        let jname=this.state.jname;   //昵称
        // let name=this.state.name;   //姓名
        let phone=this.state.phone;  //手机号
        let code=this.state.code;    //验证码
        let loginpsw=this.state.loginpsw;   //登录密码
        // let passpsw=this.state.passpsw;     //确认登录密码
        // let idcard=this.state.idcard;    //身份证号
        // let zimg=this.state.zimg;  //身份证正面
        // let fimg=this.state.fimg;  //身份证反面
        var aas =localStorage.getItem('key');
        aas = eval('(' + aas + ')');
        let addviceVal=aas;   
        //let addviceVal=this.state.addviceVal?this.state.addviceVal:this.refs.xx.state.placeholder;   
        // console.log(addviceVal,'ooooooooooooo');
        if(jname===""){
            Toast.offline("请填写昵称", 2);
            return;
        }
        if(phone===""){
            Toast.offline("请输入11位手机号", 2);
            return;
        }
        if(code===""){
            Toast.offline("请输入验证码", 2);
            return;
        }
        if(loginpsw===""){
            Toast.offline("请输入登录密码", 2);
            return;
        }
        // if(passpsw===""){
        //     Toast.offline("请再次输入密码", 2);
        //     return;
        // }
        // if(this.state.checked!=true){
        //     Toast.offline('请阅读协议',1.5);
        //     return;
        // }
        let data = {
            "us_nick": jname,
            "us_tel":phone,
            "sode" :code,
            "us_pwd" :loginpsw,
            // "us_card_id":idcard,
            "p_acc":addviceVal?addviceVal:'',
           
            
        }
        Toast.loading("正在注册", 0);

        // console.log(data);
        const value =await Shop.register(data);
        console.log(data)

        Toast.hide();
       
        if(value.code===1){
            Toast.success('注册成功 !!!', 1,await function(){
                // return false;
                dispatch(routerRedux.push('/login'))
            });
            
        }else{
            Toast.fail(value.msg, 2);
        }
    }
    render(){
        // const {xdata}=this.state;
        // let value=xdata.me_content?xdata.me_content:"";
        // const html=this.htmlspecialchars_decode(value,APIHost);
        const {files1,files2}=this.state;
        
       var aas =localStorage.getItem('key');
       aas = eval('(' + aas + ')');
        const navBarProps = {
            leftVisible: true,
            leftFunc(){
                history.go(-1)
            },
            titleName: "立即注册",
            rightContent: "",
        }
        const { history, dispatch, shopData } = this.props;
        const {val}=this.state
   

        return(
            <div className={styles.App}>
                <style>
                    {`
                        .am-list-item{
                            padding-top:0.3rem;
                        }
                        .am-navbar-right {
                            font-size: 0.34rem !important;
                            font-weight: bold;
                        }
                        .am-button{
                            border-radius:0.44rem;
                            margin-top: 0.7rem;   
                        } 
                        html:not([data-scale]) .am-button-primary{
                            // margin-top:2rem;
                            margin-bottom: 0.7rem
                        }
                        .am-button-primary{
                            background:#0187FC;
                            width: 6.3rem;
                            margin-left: 0.6rem;
                            font-size: 0.36rem;
                            
                        } 
                        a:hover{
                            text-decoration: none;
                        } 
                        input{
                            font-size:0.3rem !important;
                        }

                        .am-list-item .am-input-label.am-input-label-5 {
                            
                            width: 0.5rem;
                            height: 0.5rem;
                        }
                        .am-list-item img {
                            width: auto;
                            height: 100%;
                            /* vertical-align: middle; */
                        } 
                        .am-list-item.am-input-item{
                            padding-left:0;
                        } 
                        .am-list-item.am-input-item {
                            height: 1.1rem;
                            border-bottom: .01rem solid #C7C7C7;
                            padding-left: .1rem;
                        }
                        .am-list-item .am-input-control input::-webkit-input-placeholder {
                            color:#666666;
                            font-size:.3rem;
                            text-align:left;
                        }
                        .am-list-item .am-input-extra{
                            color: #0187FC;
                            font-size: 0.26rem;
                        }
                        .am-list-item .am-input-clear-active{
                            background-color:#0187FC;
                        } 
                        .am-checkbox-inner{
                            width: 0.32rem;
                            height: 0.32rem;
                        }
                        .am-checkbox-inner:after{
                            top: -0.04rem;
                            right: 0.08rem;
                        }
                        .am-checkbox{
                            width: 0.32rem;
                            height: 0.32rem
                        }
                        .cc{
                            width: 100%;
                            height: 100%;
                            background-color: #000000;
                            opacity: 0.6;
                            position: fixed;
                            top: 0;
                        }
                        .content{
                            position: fixed;
                            width: 70%;
                            margin: auto;
                            height: auto;
                            background: white;
                            top: 5%;
                            left: 50%;
                            transform: translate(-50%);
                            border-radius: 0.25rem;    
                        }
                        .am-checkbox.am-checkbox-checked .am-checkbox-inner{
                            background: #0187FC;
                            border: 0;
                        }
                        .style{
                            padding:0.2rem;     
                        }
                        .style img{
                            width:100%;
                        }
                        .imgc{
                            position: relative;
                            top: -0.6rem;
                            text-align: center;
                            color:#A9A9A9;
                            font-size:0.2rem;
                        }
                        
                        .renzheng{
                            font-size: 0.28rem;
                            color:#444343;
                            padding: 0.25rem;
                            padding-bottom: 0.1rem;
                        }
                        .kuang{
                            display: flex;
                            justify-content: space-between;
                            padding-left: 0.44rem;
                            padding-right: 0.44rem;
                        }  
                        .am-flexbox-item{
                            width:2.75rem;
                            height:1.62rem;
                            
                        }
                        .am-flexbox .am-flexbox-item{
                            min-width:2.75rem;
                        } 
                        .am-image-picker-list .am-image-picker-upload-btn:after{
                            width: 0.86rem;
                            height: 0.02rem;
                        }
                        .am-image-picker-list .am-image-picker-upload-btn:before, .am-image-picker-list .am-image-picker-upload-btn:after{
                            top: 42%;
                            background-color: #B1B1B1;
                        }
                        .am-image-picker{
                            width:2.75rem;    
                        }
                        .am-image-picker-list{
                            padding:0
                        }
                        html:not([data-scale]) .am-button-primary{
                            // margin-top:0.2rem;
                        }
                        .beizhu{
                            font-size:0.25rem;
                            color:red;
                            padding-left: 0.5rem;
                            display: flex;
                            padding-bottom: 0.2rem;
                        }
                        .beizhu h5{
                            padding-bottom: 0.1rem;
                        }
                    `}
                </style>
                {/*头部导航栏*/}
                <MyNavBar {...navBarProps} />
                <div className={styles.input}>
                    <InputItem
                        placeholder="请输入昵称"
                        clear
                        maxLength="11"
                        onChange={this.inputj.bind(this)}
                        ><img src={logo07} alt=""/></InputItem>
                    <InputItem
                        type="number"
                        placeholder="请填写手机号"
                        clear
                        maxLength="11"
                        onChange={this.inputPhone.bind(this)}
                        ><img src={logo02} alt=""/></InputItem>
                    
                    <InputItem
                        type="password"
                        placeholder="登录密码"
                        clear
                        maxLength="16"
                        onChange={this.inputPwd.bind(this)}                      
                        ><img src={logo05} alt=""/></InputItem>
                 
                    <InputItem
                        type="number"
                        placeholder="请输入验证码"
                        clear
                        maxLength="6"
                        extra={<div onClick={this.state.codeflag===0?()=>this.codeClick():()=>{}}>{val}</div>}
                        onChange={this.inputCode.bind(this)}
                        ><img src={logo04} alt=""/></InputItem>
                       
                </div>
                <Button type="primary" onClick={()=>this.register()}>注册</Button><WhiteSpace />
            </div>
        )
    }
}