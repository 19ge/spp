import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import MyNavBar from "../components/MyNavBar";
import {loggedIn, loginOut, APIHost} from '../utils/fetch';
import { List } from 'antd-mobile';
import styles from "./styles/Noticedetails.less";
import found01 from '../assets/images/foun.png';
@connect(state => ({ shop: state.shop }))

export default class Noticedetails extends Component {
     
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
    render(){
        const navBarProps = {
            leftVisible:true,
            leftFunc(){
                history.go(-1)
              },
          
            titleName:"公告详情",
            rightContent:"",
        }
        const {history,dispatch,shop}=this.props;
        const newxlist=shop.newxqlist;


        let value=newxlist.me_content?newxlist.me_content:"";
        const html=this.htmlspecialchars_decode(value,APIHost);
        return(
            <div className={styles.App}>
                {/* 样式 */}
                <style>
                    {`
                    #root{
                        background: white;
                    }
                    .am-list-item .am-list-line .am-list-content{
                        font-size:0.35rem;
                    }
                    .am-list-item .am-list-line .am-list-brief{
                        color:#9E9E9E;
                        font-size:0.3rem;

                    }
                    .am-list-item .am-list-line .am-list-arrow{
                        width:0.21rem;
                        height:0.37rem;
                    }
                    
                    `}
                </style>
                {/*头部导航栏*/}
                <MyNavBar {...navBarProps}/>
                {

                }
                <div className={styles.conbox}>
                    <div className={styles.title}>
                        <h5>【{newxlist.me_title}】</h5>
                        <span>{newxlist.me_add_time}</span>
                    </div>   
                    <p dangerouslySetInnerHTML={{
                        __html: `${html}`
                        }}
                    ></p>
                </div>
            </div>
        )
    }
}