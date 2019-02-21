import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import MyNavBar from "../components/MyNavBar";
import * as Shop from "../services/shop";
import { List, InputItem,ImagePicker, Button,Picker, Toast } from 'antd-mobile';
import {APIHost,loggedIn} from "../utils/fetch";
import { Icon, Grid} from 'antd-mobile';
import styles from "./styles/Renzheng.less";
import { list } from 'postcss';
import mine02 from '../assets/images/b.png';
@connect(state => ({ shop: state.shop }))
export default class Renzheng extends Component {
    state={
        data:'',
        name:'',
        idcard:'',
        headimg:'',
        headimgb:'',
        imgUrlc:'',
        imgUrlc2:'',
        fan:'',
        zheng:''

    }
    async componentDidMount(){
        // let idcard=this.state.idcard?this.state.idcard:this.refs.idcard.state.placeholder;//身份证号
        // let name=this.state.name?this.state.name:this.refs.name.state.placeholder; //姓名
        
        const result=await Shop.yan();
        this.setState({
            data:result.data,
            zheng:result.data.us_card_zheng,
            fan:result.data.us_card_fan
        

        })
        console.log(result.data,'resuktdata')
    }
     //姓名
     inputName(val){
        this.setState({
            name:val
        })
    }
    //身份证号
    inputCard(val){
        this.setState({
            idcard:val
        })
    }
    //身份证正面
    getLocalImgc2(e) {
        // Toast.info("加载中...")
        if(!e.target.files[0]){
        return
        }
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0])
        reader.onload = function (e) {
            // this.setState({
            //     imgUrlc2: e.target.result,       
            // })
            Shop.uploadImg({imgaaaa:e.target.result}).then((result)=>{
                if(result.code===1){
                    this.setState({
                        zheng:result.data
                    })
                    Toast.success(result.msg,1);
                }else{
                    Toast.offline(result.msg,1)
                }
            })
            return this.result
        }.bind(this)
    }
    //身份证反面
    getLocalImgc(e) {
        // Toast.info("加载中...")
        if(!e.target.files[0]){
        return
        }
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0])
        reader.onload = function (e) {
            // this.setState({
            //         imgUrlc: e.target.result,       
            // })
            Shop.uploadImg({imgaaaa:e.target.result}).then((result)=>{
                if(result.code===1){
                    this.setState({
                        fan:result.data
                    })
                    Toast.success(result.msg,1);
                }else{
                    Toast.offline(result.msg,1)
                }
            })
            return this.result
        }.bind(this)
    }
    //提交审核
    async btnsub(){
        const {data}=this.state;
        let fan=this.state.fan?this.state.fan:this.state.imgUrlc;  //背面
        let zheng=this.state.zheng;  //头像
        // console.log(fan,'fan')  
        // console.log(zheng,'zheng')  
        let idcard=this.state.idcard?this.state.idcard:this.refs.idcard.state.placeholder;//身份证号
        let name=this.state.name?this.state.name:this.refs.name.state.placeholder; //姓名
        
        data.us_card_id=idcard;
        data.us_real_name=name;
        data.us_card_fan=fan;
        data.us_card_zheng=zheng;
        const result=await Shop.subcheck(data);
        if(result.code==0){
            Toast.offline(result.msg,2)
        }else{
            Toast.success(result.msg,2,()=>{
                data.us_is_shen=1
                this.setState({
                    data:data
                })
            });
        }
    }
    render(){
        const {history}=this.props;
        const {data,headimg,headimgb}=this.state;
        const navBarProps = {
            leftVisible:true,
            leftVisible:true,
            leftFunc(){
              history.go(-1)
            },
            titleName:"身份认证",
            rightContent:"",
           
        }
        return(
            <div className={styles.App}>
                <style>
                    {`
                    .fengmianDiv input{ display:none;}
                    .id_card{
                        width: 2.75rem;
                        height: 1.62rem;
                    }
                    .touxiang label{
                        font-size: 0.3rem;
                        padding-left: 0.3rem;
                    }
                    .touxiang{
                        margin-top: 0.5rem;
                    }
                    .am-button{
                        width: 80%;
                        margin: auto;
                    }
                    .btn{
                        margin-top: 4rem;
                    }
                    .status{
                        font-size: 0.3rem;
                        color: red;
                        margin-top: 0.5rem;
                        margin-left: 0.3rem;
                    }
                    .am-button-primary{
                        background-color:#0766E0;                                                                                                                                                                                                                                                                                   
                    }
                    `}
                </style>
            {/*头部导航栏*/}
               
                <MyNavBar {...navBarProps}/>
                <InputItem
                    type='text'
                    placeholder={data.us_real_name}
                    // disabled='disabled'
                    maxLength={10}
                    ref="name"
                    clear
                    onChange={(val)=>this.inputName(val)}
                    onBlur={(v) => { console.log('onBlur', v); }}
                    
                    >真实姓名</InputItem>
                    <InputItem
                        type='text'
                        placeholder={data.us_card_id}
                        // disabled='disabled'
                        ref="idcard"
                        clear
                        onChange={(val)=>this.inputCard(val)}
                        onBlur={(v) => { console.log('onBlur', v); }}
                       
                    >身份证号</InputItem>
                    <div className="touxiang">
                        <label>身份证正面</label>
                        <label className="fengmianDiv">
                            <input id="imgURl" name="from" type="file" onChange={(e) => this.getLocalImgc2(e)}  accept="image/*"  />
                            <img className="id_card" ref="headIm"  src={this.state.zheng ?APIHost+this.state.zheng :mine02} />
                        </label>
                    </div>
                    <div className="touxiang">
                        <label>手持大头照</label>
                        <label className="fengmianDiv">
                            <input id="imgURl" name="from" type="file" onChange={(e) => this.getLocalImgc(e)}  accept="image/*"  />
                            <img className="id_card" ref="headIm"  src={this.state.fan ?APIHost+this.state.fan :mine02} />
                        </label>
                    </div>
                    <div className='status'>
                        验证状态：
                        {
                            data.us_is_shen==0?'待提交':data.us_is_shen==1?'待审核':data.us_is_shen==2?'审核通过':''
                        }
                    </div>
                    <div className='btn'>
                        {
                            data.us_is_shen==0?<div>
                                <Button type="primary" onClick={()=>this.btnsub()}>重新提交</Button>   
                            </div>:''
                        }
                    </div>
                    
            </div>
        )
    }
}