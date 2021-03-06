import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import MyNavBar from "../components/MyNavBar";
import InfiniteScroll from 'react-infinite-scroller';
import styles from "./styles/Tixianrecord.less";
@connect(state => ({ shop: state.shop }))

export default class Transrecord extends Component {

    //加载更多的方法,写法固定,只需替换变量名
        loadFunc(e){
            const {dispatch,shop}=this.props;
            let page=shop.pagination.current_page*1+1;
            dispatch({
            type:"shop/transjl",     //方法
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
            // leftFunc(){
           
            // },
            titleName:"转账记录",
            rightContent:"",
            // rightFunc(){
          
            // }
        }
        const {history,dispatch,shop}=this.props;
        let hasMore=shop.pagination.hasMore; // 是否加载更多 ture/false
        const transList=shop.transList;
        console.log(transList,'pppppppppppppppppp00000000000000000')
        return(
            <div className={styles.App}>
                 {/*头部导航栏*/}
                <MyNavBar {...navBarProps}/>
                <InfiniteScroll
                    pageStart={0}
                    initialLoad={false}
                    loadMore={(e)=>this.loadFunc(e)}
                    hasMore={hasMore}
                    threshold={100}
                    loader={<div className="loader" style={{fontSize:".28rem",lineHeight:".86rem",textAlign:"center",marginBottom:".3rem"}} key={0}>加载中
                    ...</div>}
                    >
                    <div className={styles.content}>
                        {
                            transList?transList.map((item ,index)=>{
                                return(
                                    <div key={index} className={styles.contbox}>
                                        <div className={styles.boxtop}>
                                            <dl>
                                                <dt>
                                                    转出：
                                                
                                                {
                                                    item.user.us_account// item.tx_type==1?"提现到银行卡":item.tx_type==2?"提现到支付宝":item.tx_type==3?"提现到微信":''
                                                }
                                                <div style={{paddingTop:'20px'}}>
                                                {
                                                    // item.tx_status==0?"未审核":item.tx_status==1?"审核通过":item.tx_status==2?"被驳回":''
                                                    item.userto.us_account
                                                }
                                                </div>
                                                </dt>
                                                <dd>
                                                
                                                    <div className={styles.boxbottom}>{item.tr_num}</div>
                                                    <p>{item.tr_add_time}</p>
                                                </dd>
                                            </dl>
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