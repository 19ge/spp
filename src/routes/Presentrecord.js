import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import MyNavBar from "../components/MyNavBar";
import styles from "./styles/Presentrecord.less";
import { SearchBar, Button, WhiteSpace, WingBlank } from 'antd-mobile';
import InfiniteScroll from 'react-infinite-scroller';
import * as shop from '../services/shop';
import * as fetch from '../services/shop';
import { Accordion, List } from 'antd-mobile';
import iconTou from '../assets/images/tx.png';


@connect(state => ({ shop: state.shop }))
export default class Presentrecord extends Component {

  state = {
    value: '美食',
    list:[],
  };

  //加载更多的方法,写法固定,只需替换变量名
  loadFunc(e){
    const {dispatch,shop}=this.props;
    let page=shop.pagination.current_page*1+1;
    dispatch({
      type:"shop/inrecord",     //方法
      payload:{       //参数
        is_hot:true,
        size:12,
        page
      }
    })
}
async componentDidMount() {
    //  const {shop,dispatch}=this.props;   
     
    //  const result=await fetch.ruzhi();
    //  const data=result.data.data;
    //  console.log(data,'222')
    //  this.setState({list:data});     
  }




render() {
  const {history,dispatch,shop}=this.props;
   // 列表是否有下一页
   let hasMore=shop.pagination.hasMore; // 是否加载更多 ture/false
  const navBarProps = {
    leftVisible: true,
    leftFunc(){
      history.go(-1)
    },
    // leftFunc(){
    //     alert('提示', '你点击了左侧???', [
    //         { text: 'Cancel', onPress: () => console.log('cancel') },
    //         { text: 'Ok', onPress: () => console.log('ok') },
    //     ])
    // },
    titleName: "入职记录",
    rightContent: "",
    // rightFunc(){
    //     alert('提示', '你点击了右侧???', [
    //         { text: 'Cancel', onPress: () => console.log('cancel') },
    //         { text: 'Ok', onPress: () => console.log('ok') },
    //     ])
    // }
  }
  // const {history, dispatch, shopData } = this.props;
  // const list= this.state.list;
  console.log("$%%%%===",shop);
  const list = shop.ruzhilist;
  return (
    <div className={styles.App}>
      {/* 样式 */}
      <style>
        {`                  
       `}
      </style>
      {/*头部导航栏*/}
      <MyNavBar {...navBarProps} />
      <InfiniteScroll
          pageStart={0}
          initialLoad={false}
          loadMore={(e)=>this.loadFunc(e)}
          hasMore={hasMore}
          threshold={100}
          loader={<div className="loader" style={{fontSize:".28rem",lineHeight:".86rem",textAlign:"center",marginBottom:".3rem"}} key={0}>加载中
          ...</div>}
          >
        <div>
          {list.length>0?list.map((v, k) => {
            return (
                <div key={k} className={styles.myrecord}>
                  <div className={styles.time}>
                  {v.rec_add_time}
                  </div>
                  <div className={styles.do}>
                     {v.note}
                  </div>
                </div>         
            )
          }):''}
        </div>
      </InfiniteScroll>
    </div>
  )
}
}