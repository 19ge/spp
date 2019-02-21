import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Icon, Button ,Toast,Checkbox} from 'antd-mobile';
import {loggedIn, loginOut, APIHost} from '../utils/fetch';
import MyNavBar from "../components/MyNavBar";
import * as Shop from '../services/shop';
// import styles from "./styles/Code.less";
import t01 from '../assets/images/zhidao.jpg';

@connect(state => ({ shop: state.shop }))


export default class Zcxy extends Component {
    state={
        checked:false
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
    // btngift(){
    //     const{dispatch}=this.props;
    //     dispatch(routerRedux.push('/Res'))
    // }
    tiao(){
        this.setState({checked: !this.state.checked});
        const{dispatch}=this.props;
        dispatch(routerRedux.push('/Res'))
    }
    render(){
        const { history, dispatch, shop } = this.props;
        const zcinfo=shop.zclist;
        let value=zcinfo.me_content?zcinfo.me_content:"";
        const html=this.htmlspecialchars_decode(value,APIHost);
        const navBarProps = {
            leftVisible: true,
            leftFunc(){
                history.go(-1)
            },
            titleName: "注册协议",
            rightContent: "",
            rightFunc(){
              
                dispatch(routerRedux.push('/Xieyi'))
            }
        }
        return(
            <div>
                <style>
                    {`
                    .am-button{
                        border-radius:0.44rem;
                        margin: auto;
                        margin-top: 0.7rem;
                        width: 80%;
                       
                    } 
                    .am-button-primary{
                        background:#0187FC;
                        font-size: 0.36rem;
                    } 
                    a:hover{
                        text-decoration: none;
                    }
                    .am-checkbox.am-checkbox-checked .am-checkbox-inner{
                        background: #0187FC;
                        border: 0;
                    }
                    .am-checkbox-inner:after{
                        right:0.15rem;
                    }
                    .am-checkbox{
                        top: -0.07rem;
                    }
                    .anniu{
                        margin-top: 0.2rem;
                        font-size: 0.3rem;
                        margin-bottom: 0.35rem;
                        text-align: center;
                    }
                    `
                    }
                </style>
                <MyNavBar {...navBarProps} />
                <div className="way">
                        <div className='style' 
                        dangerouslySetInnerHTML={{
                        __html: html
                        }}>
                            
                        </div>
                </div>
                {/* <Button type='primary'  onClick={() => this.btngift()}>同意</Button> */}
                <div className='anniu' style={{marginTop:'0.2rem'}}>
                    <Checkbox  onClick={() => this.tiao()}>
                        <span style={{color:'#333',marginLeft:'0.15rem',paddingTop:'0.2rem'}}>我已阅读并同意</span>  
                    </Checkbox>
                    <span style={{color:'#FF3D3D',paddingTop:'0.2rem'}}>《注册协议》</span>
                </div>
            </div>
        )
    }
}