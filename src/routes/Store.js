import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import MyNavBar from "../components/MyNavBar";
import { Button, WhiteSpace, WingBlank } from 'antd-mobile';
import { loggedIn, loginOut, APIHost } from '../utils/fetch';
import InfiniteScroll from 'react-infinite-scroller';
import * as shop from '../services/shop';
import styles from "./styles/Store.less";
import gift06 from '../assets/images/g06.png';
@connect(state => ({ shop: state.shop }))

export default class Store extends Component {

    loadFunc(e){
        const {dispatch,shop}=this.props;
        let page=shop.pagination.current_page*1+1;
        dispatch({
        type:"shop/tixianjl",     //方法
        payload:{       //参数
            is_hot:true,
            size:12,
            page
        }
        })
    }
    render(){
       
        const navBarProps = {
            leftVisible:true,
            leftFunc(){
                history.go(-1)
              },
            titleName:"线下门店",
            rightContent:"",
            
        }
        const {history,dispatch,shop}=this.props;
        let hasMore=shop.pagination.hasMore; // 是否加载更多 ture/false
        const offlist=shop.offinfo;
        console.log(offlist,"oooooooooooooo------------")
        return(
            <div className={styles.App}>
                {/* 样式 */}
                <style>
                    {`
                    
                    `}
                </style>
                {/*头部导航栏*/}
                <MyNavBar {...navBarProps}/>
                <div className={styles.content}>
                <InfiniteScroll
                    pageStart={0}
                    initialLoad={false}
                    loadMore={(e)=>this.loadFunc(e)}
                    hasMore={hasMore}
                    threshold={100}
                    loader={<div className="loader" style={{fontSize:".28rem",lineHeight:".86rem",textAlign:"center",marginBottom:".3rem"}} key={0}>加载中
                    ...</div>}
                    >
                    {
                        offlist?offlist.map((item,index)=>{
                            return(
                                <dl>
                                    <dt>
                                        <img src={APIHost+item.age_biao} alt=""/>
                                    </dt>
                                    <dd>
                                        <p className={styles.ptop}>
                                            <span className={styles.sname}>联系人：{item.age_name}</span>
                                            {/* <span className={styles.mendian}>门店</span> */}
                                        </p>
                                        <p className={styles.pbot}>联系电话：<span>{item.age_tel}</span></p>
                                        <p className={styles.pbot} style={{overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',width:'4.5rem'}}>地址：<span>{item.age_area}</span></p>
                                    </dd>
                                    <div style={{clear:'both'}}></div>
                                </dl>
                                
                            )
                        }):''
                    }
                    
                </InfiniteScroll>
                </div>
            </div>
        )
    }
}