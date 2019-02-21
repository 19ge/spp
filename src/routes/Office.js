import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import MyNavBar from "../components/MyNavBar";
import { Button, WhiteSpace, WingBlank } from 'antd-mobile';
import * as Shop from '../services/shop';
import { loggedIn, loginOut, APIHost } from '../utils/fetch';
import { DatePicker, List } from 'antd-mobile';
import InfiniteScroll from 'react-infinite-scroller';
import styles from "./styles/Office.less";
import gift06 from '../assets/images/foun.png';
import ruRU from 'antd-mobile/lib/locale-provider/ru_RU';
@connect(state => ({ shop: state.shop }))


export default class Office extends Component {
    //加载更多的方法,写法固定,只需替换变量名
    loadFunc(e){
        const {dispatch,shop}=this.props;
        let page=shop.pagination.current_page*1+1;
        dispatch({
        type:"shop/store",     //方法
        payload:{       //参数
            // size:12,
            page
        }
        })
    }
   
    state = {
        date: '',
        dpValue: null,
        customChildValue: null,
        visible: true,
        DATA:''
      }
      datetab(val){
        console.log(val,"!!!")
      }
      async  componentDidMount(){
        const data=await Shop.zroom();
        console.log(data,'信息？');
        this.setState({DATA:data.data}); 
      }
      
    render(){       
        const navBarProps = {
            leftVisible:true,
            leftFunc(){
                history.go(-1)
              },
            titleName:"门店站长室",
            rightContent:"",
        }
        const {history,dispatch,shop}=this.props;
        const storelist=shop.storeInfo;
        let hasMore=shop.pagination.hasMore; // 是否加载更多 ture/false
        return(

            <div className={styles.App}>
                {/* 样式 */}
                <style>
                    {`
                    .am-list-item{
                        width: 100%;
                        padding-left: 0;
                    }
                    .am-list-item .am-list-line{
                        padding-right: 0rem;
                    }
                    .am-list-item .am-list-line .am-list-extra{
                        flex-basis: 100%;
                        color:#0187FC;
                    }
                    .am-picker-popup-item{
                        color:#0187FC;
                    }
                    .date-picker-list{
                        width:33.333%;
                        text-align:center;
                    }
                    `}
                </style>
                {/*头部导航栏*/}
                <MyNavBar {...navBarProps}/>
                <div className={styles.content}>
                    <div className={styles.topimg}>
                        <img src={APIHost+this.state.DATA.age_pic} alt=""/>
                    </div>
                    <div className={styles.mid}>
                        {/* <div className={styles.midtop}>
                            <span className={styles.spanleft}>账户余额</span>
                            <span className={styles.spanright}>668元</span>
                        </div> */}
                        {/* <div className={styles.account2}>
                            <div className={styles.divleft}>
                                <div>
                                    <span className={styles.account2left}>账户可提现余额</span>
                                    <span className={styles.account2right}>888元</span>
                                </div>
                                <div>
                                    <span className={styles.account2left}>累计收入</span>
                                    <span className={styles.account2right}>888元</span>
                                </div>
                            </div>                    
                            <div className={styles.btn}>
                                立即提现
                            </div>
                            
                        </div> */}
                        {/* <div className={styles.tishi}>
                        *可直接提现支付宝、微信。
                        </div> */}
                        <div className={styles.details}>
                            <div className={styles.title}>
                               <h5>门店输送</h5>
                               {/* <List className="date-picker-list" style={{ backgroundColor: 'white' }}>
                                    <DatePicker
                                    mode="month"
                                    locale=""
                                    title="Select Date"
                                    extra="请选择年月"
                                    value={this.state.date}
                                    onChange={date => this.setState({ date })}
                                    >
                                    <List.Item arrow="horizontal"></List.Item>
                                    </DatePicker>                                                                                                           
                                </List> */}
                                <div>输送时间</div>
                                <div className={styles.status}>入职状态</div> 
                            </div>
                            <InfiniteScroll
                                pageStart={0}
                                loadMore={(e)=>this.loadFunc(e)}
                                hasMore={hasMore}
                                threshold={100}
                                loader={<div className="loader" style={{fontSize:".28rem",lineHeight:".86rem",textAlign:"center",marginBottom:".3rem"}} key={0}>加载中
                                ...</div>}
                                >
                                <div className={styles.datalist}>
                                    {
                                        storelist?storelist.map((item,index)=>{
                                            return(
                                                <div key={index} className={styles.data}>
                                                    <div className={styles.name} style={{textAlign:'left'}}>{item.us_account}</div>
                                                    <div className={styles.tel}>{item.us_agency_time}</div>
                                                    <div className={styles.money} style={{textAlign:'right'}}>
                                                        {
                                                            item.in_zt==0?'未申请':item.in_zt==1?'未报道':item.in_zt==2?'未入职':item.in_zt==3?'已入职':item.in_zt==4?'已满工':item.in_zt==5?'被淘汰':''
                                                        }
                                                        <div style={{clear:"both"}}></div>
                                                    </div>
                                                </div>
                                            )

                                        }):''
                                    }       
                                </div> 
                            </InfiniteScroll>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}