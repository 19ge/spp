import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import MyNavBar from "../components/MyNavBar";
import * as Shop from '../services/shop';
import {loggedIn, loginOut, APIHost} from '../utils/fetch';
import { Button, WhiteSpace, WingBlank } from 'antd-mobile';
import styles from "./styles/Gifttan.less";
import gift01 from '../assets/images/g01.png';;
// import * as APIhost  from '../utils/fetch';
var queryString = require('querystring');
@connect(state => ({ shop: state.shop }))
export default class Gifttan extends Component {
    state={
        data:''
    }
    async componentDidMount(){
        const {location} = this.props;
        const parse=queryString.parse(location.search.replace("?",""));
        const result=await Shop.yypack({id:parse.us_ling});
        this.setState({
            data:result.data,
        })
    }
    render(){
        const navBarProps = {
            leftVisible:true,
            leftFunc(){
                history.go(-1)
              },
            titleName:"已领取礼包",
            rightContent:"",
        }
        const {history,dispatch,shopData,shop}=this.props;
        const {data}=this.state;
      

        return(
            <div className={styles.App}>
                {/* 样式 */}
                {/*头部导航栏*/}
                <MyNavBar {...navBarProps}/>
                <div className={styles.gifts}>       
                    <dl>
                        <dt>{data.cate_name}</dt>
                        <dd className={styles.img}>
                            <img src={APIHost+data.cate_pic} />
                        </dd>
                    </dl>     
                </div>
            </div>
        )
    }
}