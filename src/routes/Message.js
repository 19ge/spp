import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import MyNavBar from "../components/MyNavBar";
import { Button, WhiteSpace, WingBlank ,Modal,Toast, Result} from 'antd-mobile';
import { List, InputItem } from 'antd-mobile';
import styles from "./styles/Message.less";
import gift06 from '../assets/images/g06.png';
import * as fetch from '../services/shop';
import {APIHost,loggedIn} from "../utils/fetch";
import * as shop from "../services/shop";
import { template } from 'handlebars';
var queryString = require('querystring');
@connect(state => ({ shop: state.shop }))

export default class Message extends Component {
    
    state={
        idcard:"",      //身份证号  
        data:''   ,
        Modal:0 
    }
    async componentDidMount(){
        const reault=await shop.PersonalInfo()
        this.setState({data:reault.data})
    }
    async tijiao(id){
        const alert = Modal.alert;
        const {data}=this.state;
        if(data.us_zt==1||data.us_zt==2){
            alert('', '你是报名状态，是否确定离开再选厂?', [
                { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
                { text: '确定', onPress: () => 
                {
                    const {location} = this.props;
                    const parse=queryString.parse(location.search.replace("?",""));
                 
                    shop.inJob(parse).then((results)=>{
                        if(results.code===0){
                            Toast.offline(results.msg,2);
                        }
                        if(results.code===1){
                            Toast.offline(results.msg,2);
                        }
                    })
                   
                }
             },
            ]);
        }else{
            const {location} = this.props;
            const parse=queryString.parse(location.search.replace("?",""));
            
            shop.inJob(parse).then((results)=>{
                if(results.code===0){
                    Toast.offline(results.msg,2);
                }
                if(results.code===1){
                    Toast.offline(results.msg,2);
                }
            })
                   
        }
        
    }
     
    render(){
        const {location,history} = this.props;
        const parse=queryString.parse(location.search.replace("?",""));
        const name=parse.name
        const {data,Modal}=this.state;
        // const data=shop.userInfo
        
        const navBarProps = {
            leftVisible:true,
            leftFunc(){
                history.go(-1)
              },
            titleName:"填写信息",
            rightContent:"",
        }
        
        return(
            <div className={styles.App}>
                {/* 样式 */}
                <style>
                    {`
                  
                    .am-list-item .am-input-label{
                        font-size:0.3rem;
                    }
                    .am-list-item.am-input-item{
                        height:1.08rem;
                        border-bottom: 1px solid #CECECE;
                    }
                    .btn{
                        position: relative;
                        bottom: -4rem;
                        width: 6.9rem;
                        margin-left:0.3rem;    
                    }
                    .am-button{
                        font-size: 0.34rem;
                    }
                    .am-button-primary{
                        background-color: #0187FC;
                    }
                    a:hover{
                        text-decoration: none;
                    }
                    .am-list-item .am-input-label.am-input-label-5{
                        width:2rem;
                    }
                    `}
                </style>
                {/*头部导航栏*/}
                <MyNavBar {...navBarProps}/>
                {
                    Modal?Modal:''
                }
                <div className={styles.content}>
                    {/* <div>当前：<span>工厂二号</span></div> */}
                    <List>
                    <InputItem                
                            clear
                            value={name}
                            ref={el => this.autoFocusInst = el}
                            
                        >当前工厂名称：</InputItem>
                        <InputItem
                            clear
                            type="number"
                            ref='tel'
                            value={data.us_tel}
                            maxLength='11'
                        >手机号码</InputItem>
                    </List>
                    <div className="btn">
                        <Button type="primary" onClick={()=>this.tijiao()} >申请进厂</Button><WhiteSpace />
                    </div>
                    
                </div>

            </div>
        )
    }
}