import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import MyNavBar from "../components/MyNavBar";
import styles from "./styles/Teamlist.less";
import * as Shop from '../services/shop';
import { APIHost } from '../utils/fetch';
import { SearchBar, Button, WhiteSpace, Toast } from 'antd-mobile';
import { Accordion, List } from 'antd-mobile';
import iconTou from '../assets/images/tx.png';
import * as fetch from '../services/shop';

@connect(state => ({ shop: state.shop }))
export default class Teamlist extends Component {

  state = {
    value: '美食',
    list: [{ name: "mingc1", id: "1" }, { name: "mingc2", id: "2" }],
    DATA:'',
    name:'',
  };
  onChange = (value) => {
    this.setState({ value });
  };
  clear = () => {
    this.setState({ value: '' });
  };
  handleClick = () => {
    this.manualFocusInst.focus();
  }
  onChange = (key) => {
    console.log(key);
  };
  d() {
    this.setState({

    })
  }
  getOtion() {

  }

   //搜索框
   async searchFunc(value){
    console.log(value,'输入的值')
    const {dispatch}=this.props;
    this.setState({
      name: value
  })
  // const a = await fetch.supin({name:value})
  Shop.supin({name: value }).then((result) => {
    console.log(result.data,'xxx')
    if (result.code == 1) {
        this.setState({
            DATA: result.data
        })
        
    } else {
        Toast.offline(result.msg, 2);
        return;
    }

});
}

async componentDidMount(){
  const dataInfo = await fetch.supin({})
  console.log(dataInfo,'.......')
  this.setState({
    DATA:dataInfo.data
  })
}
render() {
  console.log(this.state.name,'maom0000')
  console.log(this.state.DATA,'333')

  const supinlist=this.state.DATA;
  const navBarProps = {
    leftVisible: true,
    leftFunc(){
      history.go(-1)
    },
    titleName: "速聘经理",
    rightContent: "",
  }
  const { history, dispatch, shop} = this.props;
  // const supinlist=shop.supinInfo;
  const displaynone={
    display:"none"
  }
  const displayblock={
    display:"block"
  }
  return (
    <div className={styles.App}>
      {/* 样式 */}
      <style>
        {`                  
          .am-search{
              width:85%;
              margin:auto;
              height:0.6rem;
              border-radius:0.3rem;
          }
          .am-accordion-item{
            margin-bottom:0.3rem;
            background-color:white !important;
          }
          .am-accordion .am-accordion-item .am-accordion-header{
              // background-color: #0187FC;
              opacity:0.8;
              height:1.6rem;
              box-shadow:-1px 8px 10px 0px rgba(132,132,132,0.1);
              line-height:0.3rem;
          }
          .am-accordion .am-accordion-item .am-accordion-header:hover{
            background-color: #0187FC;
            color:white;
          }
          .am-accordion .am-accordion-item .am-accordion-header i{
            top:0.69rem;
          }
          .am-list-item .am-list-line .am-list-content{
          	font-size:0.26rem;
          	padding-right: 0.7rem;
          }
          .am-list-item{
          	padding-left:0.7rem;
          	min-height: 0.78rem;

          }
          .info{
            {/* display:flex; */}
            
          }
          .info dt{
            margin-left:0.38rem;
            margin-top:0.32rem;
            width:0.96rem;
            height:0.96rem;
            float:left;
          }  
          .info  dt>img{
            width:100%;
            height:100%;
          }   
          dd{
            float:left;
            font-size:0.26rem;
            
            padding-left:0.5rem;
            padding-top: 0.09rem;
            
            
          } 
          dd p{
            padding-top:0.15rem;
          }
          dd span{
          	padding-left:0.2rem;
          
          }
          .my-list span{
          	    float: right;
          	    display:flex;
          }
          .am-search-cancel{
            color:#0187FC !important;
          }
       `}
      </style>
      {/*头部导航栏*/}
      <MyNavBar {...navBarProps} />
      <div className={styles.search}>
        <SearchBar onSubmit={(value)=>this.searchFunc(value)} placeholder="请输入您要搜索的内容" />
      </div>
      <div style={{ marginTop: 10, marginBottom: 10 }}>
        <Accordion accordion openAnimation={{}} className="my-accordion" onChange={this.onChange}>
          {
            supinlist?supinlist.map((v,k)=>(
              <Accordion.Panel style={{ backgroundColor: "#ccc" }} key={k} header={
                <div className="info">
                  <dl>
                    <dt>
                      <img src={APIHost+v.us_head_pic} alt=""/>
                    </dt>
                    <dd>
                      <p>姓名<span>{v.us_real_name}</span></p>
                      <p>手机<span>{v.us_tel}</span></p>
                      <p>团队人数<span>{v.team}</span>人</p>
                    </dd>
                  </dl>
                </div>
                }>


                 
                <List className="my-list">
                {
                  v.in.prod_id?
                  <div>
                   <List.Item>
                      注册时间
                    <span>{v.us_add_time}</span>
                  </List.Item>
                  <List.Item>
                  参加面试
                  <span>
                    {
                      v.us_zt==0?'未申请':v.us_zt==1?'未报道':v.us_zt==2?'未入职':v.us_zt==3?'已入职':v.us_zt==4?'已满工':v.us_zt==5?'被淘汰':''
                    }
                  </span>
                  </List.Item>
                  <List.Item>
                      入职企业
                      <span>{v.in.prod_name}</span>
                    </List.Item>
                    <List.Item>
                    申请时间
                    <span>{v.in.in_ij_time}</span>
                    </List.Item>
                    
                    <List.Item>
                    报到时间
                    <span>{v.in.in_bd_time}</span>
                    </List.Item>
                    <List.Item>
                    入职时间
                    <span>{v.in.in_ru_time}</span>
                    </List.Item>
                    <List.Item>
                    满工时间
                    <span>{v.in.in_man_time}</span>
                    </List.Item>
                    <List.Item>
                    上级编号
                    <span>1362xxx4000</span>
                    </List.Item>
                </div>
                  :
                 <div>
                   <List.Item>
                      注册时间
                    <span>{v.us_add_time}</span>
                  </List.Item>
                  <List.Item>
                  参加面试
                  <span>
                    {
                      v.us_zt==0?'未申请':v.us_zt==1?'未报道':v.us_zt==2?'未入职':v.us_zt==3?'已入职':v.us_zt==4?'已满工':v.us_zt==5?'被淘汰':''
                    }
                  </span>
                  </List.Item>
                </div>
                  
                }              
              </List>
              </Accordion.Panel>
            )):''
          }
        </Accordion>
      </div>
      
    </div>
  )
}
}