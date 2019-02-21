import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import MyNavBar from "../components/MyNavBar";
import styles from "./styles/Foundmanage.less";
import * as Shop from "../services/shop";
import InfiniteScroll from 'react-infinite-scroller';
import found01 from '../assets/images/foun.png';
import {loggedIn, loginOut, APIHost} from '../utils/fetch';

@connect(state => ({ shop: state.shop }))

export default class Foundmanage extends Component {
    state={
        datalogin:''
    }
    async componentDidMount(){
        const datalogin = await Shop.fund();
        console.log(datalogin,"ppppppppp123pppppp")
        const data=datalogin.data;
        this.setState({datalogin:data})
       
    }
    //加载更多的方法,写法固定,只需替换变量名
        loadFunc(e){
            const {dispatch,shop}=this.props;
            let page=shop.pagination.current_page*1+1;
            dispatch({
            type:"shop/shangjin",     //方法
            payload:{       //参数
                is_hot:true,
                size:12,
                type:0,
                page
            }
            })
        }
    //提现
    btntixian(){		
		const{dispatch}=this.props;
		dispatch(routerRedux.push('/Tixian'));
    }
    //转账
    transacc(){		
		const{dispatch}=this.props;
		dispatch(routerRedux.push('/TransAcc'));
    }
    render(){
        const navBarProps = {
            leftVisible:true,
            leftFunc(){
                history.go(-1)
              },
            
            titleName:"资金管理",
            rightContent:"",
           
        }
        const {history,dispatch,shop,}=this.props;
        const datalogin=this.state.datalogin;
        const datalist=shop.monlist;
        
        let hasMore=shop.pagination.hasMore; // 是否加载更多 ture/false
        return(
            <div className={styles.App}>
                {/*头部导航栏*/}
                <MyNavBar {...navBarProps}/>
                <div className={styles.bgtop}>
                    <img src={APIHost+datalogin.zi_bgpic} alt=""/>
                </div>
                <div className={styles.account}>
                    <span className={styles.accountleft}>账户余额</span>
                    <span className={styles.accountright}>{datalogin.us_wal}元</span>
                 
                </div>
                <div className={styles.account2}>
                    <div className={styles.divleft}>
                        <div style={{clear:"both"}}></div>
                        <div className={styles.btn} onClick={()=>this.transacc()}>
                            立即转账
                        </div>
                    </div>                    
                    <div className={styles.btn} onClick={()=>this.btntixian()}>
                        立即提现
                    </div>
                    <div style={{clear:"both"}}></div>
                    
                </div>
                <div className={styles.tishi}>
                *可直接提现支付宝、微信。
                </div>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={(e)=>this.loadFunc(e)}
                    hasMore={hasMore}
                    threshold={100}
                    loader={<div className="loader" style={{fontSize:".28rem",lineHeight:".86rem",textAlign:"center",marginBottom:".3rem"}} key={0}>加载中
                    ...</div>}
                    >
                <div className={styles.mingxi}>
                    <h5>收支明细</h5>
                    {
                        datalist?datalist.map((item,index)=>{
                            console.log(index,'oooooooo4444')
                            return(
                            <div key={index} className={styles.ruzhi}>
                                <div className={styles.mingxicont}>
                                    <div style={{textAlign:'center',display:'inline'}}>{item.wal_note}</div>
                                    <div>{item.wal_add_time}</div>
                                    <div>{item.wal_num}</div>
                                </div>
                            </div>
                            )
                        }):''
                        
                    }
                </div>
                </InfiniteScroll>
            </div>
        )
    }
}