import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {login} from '../utils/fetch';
import { Button, WhiteSpace, Toast,InputItem } from 'antd-mobile';
import * as Shop from '../services/shop';
import MyNavBar from "../components/MyNavBar";
import styles from "./styles/Login.less";
import logo01 from '../assets/images/logo01.png';
import logo02 from '../assets/images/logo02.png';
import logo03 from '../assets/images/logo03.png';

var store=  require('store')

@connect(state => ({ shopData: state.shop }))
export default class Login extends Component {
    state={
        username:"",
        password:""
    }
    
    btnpsw(){
        const {dispatch}=this.props;
        dispatch(routerRedux.push('/Forgetpsw'))
    }
    inputUsername(value){
        if(value!==""&&this.state.username!==""){
            this.setState({username:value});
          }else{
            this.setState({username:value});
          }
    }
    inputUserpwd(value){
        if(value!==""&&this.state.password!==""){
            this.setState({password:value});
        }else{
            this.setState({password:value});
        }
    }
    async login(){
        const {dispatch}=this.props;
        let name=this.state.username;
        let pwd=this.state.password;
        // let name = this.refs.username.value;
        // let pwd = this.refs.password.value;
        // console.log(name,pwd,'@@@@@@@@@@@@')
        // console.log(this.state.username,'@@@@@@@@@@@@1111')
        if(name===""){
            Toast.offline("请输入账号",2);
            return;
        }
        if(!(/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(name))){
            Toast.fail("手机号格式不正确!", 2);
            return;
        }
        if(pwd===""){
            Toast.offline("请输入密码",2);
            return;
        }
        Toast.loading("正在登录", 0);
        // const value = await user.login({username,password});
        const result=await Shop.userLogin({username:name,password:pwd});
        Toast.hide();
        if(result.code===1){
            login(name,pwd);
            Toast.success('登录成功!', 1,await function(){
                dispatch(routerRedux.push('/'))
            });
            
        }else{
            Toast.fail(result.msg, 2);
        }
        
    }
    render(){
        const { history, dispatch, shopData } = this.props;
        const navBarProps = {
            leftVisible: false,
            
            titleName: "登录",
            rightContent: "注册",
            rightFunc(){
                dispatch(routerRedux.push('/Zcxy'))
            }
          
        }
        
        return(
            <div className={styles.App}>
                <style>
                    {`
                        .am-navbar-right {
                            font-size: 0.34rem !important;
                            font-weight: bold;

                        }
                        .am-button{
                            border-radius:0.44rem;
                            margin-top: 0.7rem;
                        } 
                        .am-button-primary{
                            background:#0187FC;
                            font-size: 0.36rem;
                        } 
                        a:hover{
                            text-decoration: none;
                        }
                        .am-list-item .am-input-label.am-input-label-5 {
                            width: 0.5rem;
                            height: 0.5rem;
                        }
                        .am-list-item img {
                            width: auto;
                            height: 100%;
                            vertical-align: middle;
                        }
                        .am-list-item.am-input-item {
                            height: 1rem;
                            border-bottom: .01rem solid #C7C7C7;
                            padding-left: .1rem;
                        }
                        .am-list-item .am-input-clear-active{
                            background-color:#0187FC;
                        }
                        .am-list-item .am-input-control input::-webkit-input-placeholder {
                            color:#666666;
                            font-size:.3rem;
                            text-align:left;
                        }
                                        
                    `}
                </style>
                {/*头部导航栏*/}
                <MyNavBar {...navBarProps} />
                <div className={styles.imglogo}>
                    <div className={styles.logos}>
                        <img src={logo01} alt=""/>
                    </div>
                    
                    <p>为你入职安排贴心模式</p>
                </div>
                <div className={styles.input}>
                    <InputItem
                        // type="number"
                        placeholder="请输入手机号"
                        clear
                        maxLength="11"
                        ref='username'
                        onChange={this.inputUsername.bind(this)}
                        ><img src={logo02} alt=""/></InputItem>
                    <InputItem
                        type="password"
                        placeholder="请输入密码"
                        clear
                        maxLength="16"
                        ref='password'
                        onChange={this.inputUserpwd.bind(this)}
                        ><img src={logo03} alt=""/></InputItem>
                    <Button type="primary" onClick={()=>this.login()}>登录</Button><WhiteSpace /> 
                    <div className={styles.psw} onClick={()=>this.btnpsw()}>忘记密码</div>  
                </div>
            </div>
        )
    }
}