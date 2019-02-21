import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import * as Shop from '../services/shop';
// 登出方法,当前服务器网址
import { loggedIn, loginOut, APIHost } from '../utils/fetch';
// 本页样式
// import styles from "./styles/IndstexPage.less";
import styles from "./styles/IndexPage.less";
import "video-react/dist/video-react.css"; // import css
// 引入ANTD组件
import { Button, Toast, WhiteSpace, WingBlank, Card, Modal, Result } from 'antd-mobile';
import { SearchBar, Tabs } from 'antd-mobile';
import { Player } from 'video-react';
// TabBar,引入底部标签栏组件
import MyTabBar from "../components/TabBar";
// navVbar,引入头部导航栏组件
import MyNavBar from "../components/MyNavBar";
// 本页可能用的请求
import * as fetch from '../services/shop';
// 商品列表组件
import GoodItem from '../components/GooodItem';
// 无限滚动组件
import InfiniteScroll from 'react-infinite-scroller';
// 临时商品图
import good01 from '../assets/images/good01.png';
import icon1 from '../assets/images/icon1.png';
import { useAsPath } from '_tslint@5.11.0@tslint/lib/configuration';
import { userInfo } from 'os';
var queryString = require('querystring');
var no_props=1
// 设置alert,非必要,可直接使用Modal.alert,效果相同
const alert = Modal.alert;
// 把model 传入props
@connect(state => ({ shop: state.shop }))
export default class IndexPage extends Component {
    // 构造函数
    constructor(props) {
        super(props);
        this.state = {
            selectedTabBar: "shop",
            value: '',
            labelStr: "的撒",
            DATA: [],
            infos: '',
            gong: '',
            selectedValue: 0,
            prod_name:"",
            data: {
                name: "123",
                img: "4234",
                gongzi: "http://47.92.145.141:1004/uploads/pd/1539758582.jpg",
                huanjing: "周边环境好、包吃住、买社保"
            },
            id:'1'
            

        };
    }
    //详情
    btnxq(id) {
        const { dispatch } = this.props;
        dispatch(routerRedux.push('/Details?id=' + id));
    }
  
   
    componentWillReceiveProps(newProps) {
        const { shop } = newProps;
        if(no_props==3){
            return
        }
        this.setState({ DATA: shop.infoList })
        console.log("22211199999",shop.infoList)
    }
    onChange = (value) => {
        this.setState({ value });
        console.log(value, '222111')
    };
    clear = () => {
        this.setState({ value: '' });
    };
    handleClick = () => {
        this.manualFocusInst.focus();
    }


    //加载更多的方法,写法固定,只需替换变量名
    loadFunc(e) {
        const { dispatch, shop } = this.props;
        console.log("当前的页数====", shop.pagination.current_page);
        const { value, selectedValue, gong, prod_name } = this.state
        let page = shop.pagination.current_page * 1 + 1;
        dispatch({
            type:"shop/factory",     //方法
            payload:{       //参数
              prod_area: selectedValue,
              page,
              prod_name: prod_name,
              ishot:'1'
            }
          })
    }
    //公告链接
    xq(id){
        const {dispatch}=this.props;
        dispatch(routerRedux.push('/Noticedetails?id='+id));
    }
    //工种选择
    async changeData(id,name) {
        const {dispatch}=this.props;
        dispatch(routerRedux.push('/Gong?id='+ id+'&name='+name ));
    }
    //搜索框
    async searchFunc(value) {
        // console.log(value,'输入的值')
        const { dispatch, shop } = this.props;
        console.log(value)
        if(value==""){
            return Toast.offline("请输入内容",1.5)
        }
        this.setState({
            prod_name: value
        })
        dispatch({
            type: "shop/getUser",     //方法
            payload: {       //参数
                infoList: [],
                pagination: {
                    current_page: 0,
                    last_page: 1,
                    per_page: 0,
                    total: 0,
                    hasMore: false
                }
            }
        })
        const { selectedValue,index } = this.state;
        const page = 1;
        dispatch({
            type: "shop/factory",     //方法
            payload: {       //参数
           
                page,
                prod_area: selectedValue,
                prod_name: value,//地域
                is_hot:'1'
                
            }
        })
    }
    //select 选择框
    onChanges(v) {
        // console.log(v.target.value, '999999999999999666666')
        const { dispatch, shop } = this.props;
        const { value, gong } = this.state
        const number = v.target.value * 1;
        // console.log(number,"$$$$$$$$43333")
        this.setState({ selectedValue: number })
        // console.log("66666")
        dispatch({
            type: "shop/getUser",     //方法
            payload: {       //参数
                infoList: [],
                pagination: {
                    current_page: 0,
                    last_page: 1,
                    per_page: 0,
                    total: 0,
                    hasMore: false
                }
            }
        })
        var page = 1;
        console.log(v.target.value == "全部")
        const {index}=this.state;
        if (v.target.value == "全部"){
            dispatch({
                type: "shop/factory",     //方法
                payload: {       //参数             
                    page,
                    is_hot:'1'
                }
            })
        }else {
            dispatch({
                type: "shop/factory",     //方法
                payload: {                //参数
                    page,
                    prod_area: number,//地域
                    gong:index,
                    prod_name: value,
                    is_hot:'1'
                    
                }
            })
        }
    }
    render() {
        const { history, dispatch, shop } = this.props;
        // console.log(shop,'------------=============')
        const {location} = this.props;
        const parse=queryString.parse(location.search.replace("?","")); 

        const tt=parse.id;
       
        if(tt){
            localStorage.setItem('key', JSON.stringify(tt));
            console.log(tt,'ooooo')
        }
        var aas =localStorage.getItem('key');
        aas = eval('(' + aas + ')');
        console.log(aas,'aas')
        
       



        // 列表是否有下一页
        let hasMore = shop.pagination.hasMore; // 是否加载更多 ture/false
        const area = shop.areaInfo;
        const arealist = area[0];
        const video = area[1];
        const gong=area[2];
        const news=area[3];
        const newlist=news?news.me_title:'';
        const vid = video ? video.vedo_path : '';   //视频;
        const pic = video ? video.vedo_pic : '';   //视频封面;
        const data = this.state.DATA;  //  
        const tabBarProps = {
            selectedTabBar: this.state.selectedTabBar,
            history
        }
        return (
            <div>
                {/* 样式 */}
                <style>
                    {`
                        .am-search{
                            height:0.7rem;
                            border-radius:0.1rem;
                        };
                        .am-search-cancel{
                            color:#0187FC !important;
                        }
                        .video-react .video-react-big-play-button{
                            width:0.92rem;
                            height:0.92rem;
                            line-height:0.92rem;
                            border-radius: 50%;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%,-50%);
                            border: 1px solid #0187FC;
                        }
                        .video-react .video-react-big-play-button:before, .video-react .video-react-control:before{
                            color:#0187FC;
                        }
                        .video-react .video-react-control-bar{
                            height:0.5rem;
                            line-height:0.5rem;
                        }
                        .video-react .video-react-control:before{
                            font-size: 0.3rem;
                            
                        }
                        .video-react .video-react-time-control{
                            font-size:0.3rem;
                            line-height: 1.67;
                        }
                        .am-search-input input[type="search"]{
                            font-size:0.3rem !important;
                        }
                        dl:hover{
                            background: lightblue;
                        }
                        select{
                            // width:1rem;/*要显示文字的宽度*/
                            overflow:hidden; /*超出的部分隐藏起来。*/ 
                            white-space:nowrap;/*不显示的地方用省略号...代替*/
                            text-overflow:ellipsis;/* 支持 IE */
                        }
                        .am-search-cancel{
                            color: #0187FC !important;
                        }
                    `}
                </style>
                {/*头部导航栏*/}
                {/* <MyNavBar {...navBarProps}/> */}
                {/*底部标签栏*/}
                <MyTabBar {...tabBarProps} />
                <div className={styles.main}>
                    {/* 头部搜索 */}
                    <div className={styles.top}>
                        <div className={styles.topleft}>
                            <img src={icon1} alt="" />
                            <select name="" id="" className={styles.city}
                                onChange={(v) => this.onChanges(v)}
                            >
                                <option>全部</option>
                                {
                                    arealist ? arealist.map((item, index) => {
                                        return (

                                            <option key={index} value={item.id}>{item.cate_name}</option>
                                        )
                                    }) : ''
                                }
                            </select>
                        </div>
                        <div className={styles.topright}>
                            <SearchBar  onSubmit={(val) => this.searchFunc(val)} placeholder="请输入您要搜索的工厂" />
                        </div>
                    </div>
                    {/* 视频播放*/}
                    <Player
                        playsInline
                        poster={APIHost + pic
                        }
                        src={APIHost + vid}
                    />
                    <div className={styles.list}>
                    {
                        gong ? gong.map((item, index) => {
                            const id=item.id;
                            const name=item.gong_name; 
                            return (
                               
                                <dl onClick={() => { this.changeData(id,name) }}>
                                    <dt>
                                        <img src={APIHost+item.gong_pic} alt="" />
                                    </dt>
                                    <dd>
                                        {item.gong_name}
                                    </dd>
                                </dl>
                                )
                        }) : ''
                    }
                    <div style={{ clear: "both" }}></div>
                    </div>
                    <marquee className={styles.title}>
                        <p onClick={()=>this.xq(news.id)}>{newlist}</p>
                    </marquee>
                    <InfiniteScroll
                        pageStart={0}
                        initialLoad={false}
                        loadMore={(e) => this.loadFunc(e)}
                        hasMore={hasMore}
                        threshold={100}
                        loader={<div className="loader" style={{ fontSize: ".28rem", lineHeight: ".86rem", textAlign: "center", marginBottom: ".3rem" }} key={0}>加载中
                        ...</div>}
                    >
                        <div className={styles.moshi} >
                            {

                                data.length > 0 ? data.map((item, index) => {
                                    return (
                                        <dl key={index} onClick={() => this.btnxq(item.id)}>
                                            <dt><img src={APIHost + item.prod_lpic} alt="" /></dt>
                                            <dd>
                                                <div className={styles.p1}>
                                                    <p className={styles.pname} style={{textAlign:'left'}}>{item.prod_name}</p>
                                                    <p className={styles.gongl} style={{color:'#CE2127'}}>安职啦奖励{item.prod_gao}元</p>
                                                </div>
                                                <div style={{clear:'both'}}></div>
                                                <div style={{display:'flex',height:'0.4rem',marginTop:'0.3rem',fontSize:'0.3rem'}}>
                                                    <div className={styles.p4}>{item.prod_daiyu}</div>
                                                    <label style={{position:'absolute',right:'0.3rem'}}>可领取入职礼包</label>
                                                </div>
                                            </dd>
                                        </dl>)
                                }) : ''
                            }
                        </div>
                    </InfiniteScroll>
                    {/*商品列表 自动刷新*/}
                    {/*无限滚动插件NPM地址,https://www.npmjs.com/package/react-infinite-scroller*/}
                </div>
            </div>
        )
    }
}
