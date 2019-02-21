import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import MyNavBar from "../components/MyNavBar";
import * as Shop from '../services/shop';
import { Button, Icon, WingBlank ,Toast} from 'antd-mobile';
import styles from "./styles/liebiao.less";
import { APIHost } from '../utils/fetch';
import { Item } from '_antd-mobile@2.2.6@antd-mobile/lib/tab-bar';
var queryString = require('querystring');
@connect(state => ({ shopData: state.shop }))
export default class Libao extends Component {
    state={
        data:''
    }
    async componentDidMount(){
        const {location} = this.props;
        const parse=queryString.parse(location.search.replace("?",""));
        const id=parse.id;
        const result=await Shop.yypack({id:id});
        this.setState({
            data:result.data
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
    render(){
        const {history}=this.props;
        const {data}=this.state;
        const navBarProps = {
            leftVisible:true,
            leftFunc(){
                history.go(-1)
              },
            titleName:"礼包详情",
            rightContent:"",
            rightFunc(){
           
            }
        }
        // const {data}=this.state;
        let value=data.cate_detail?data.cate_detail:"";
        const html=this.htmlspecialchars_decode(value,APIHost);
        return(
                <div className={styles.App}>
                    <style>
                        {`
                        .am-icon-md{
                            margin-left: 0.3rem;
                        }
                        `}
                    </style>
                    <div className={styles.nav}>
                        <Icon type="left" className="left" onClick={ ()=>history.go(-1)} />
                        <span className={styles.center}>{data.cate_name}</span>
                        {/* <span className={styles.right}></span> */}
                    </div>
                    <div
                       dangerouslySetInnerHTML={{
                        __html: html
                        }}
                     >
                    </div>
                </div>
                
    
        )
    }
}