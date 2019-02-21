import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import * as Shop from '../services/shop';
// 登出方法,当前服务器网址
import { loggedIn, loginOut, APIHost } from '../utils/fetch';
// 本页样式
// import styles from "./styles/IndstexPage.less";
import styles from "./styles/Gong.less";
import "video-react/dist/video-react.css"; // import css
// 引入ANTD组件
import { Button, Toast, WhiteSpace, WingBlank, Card, Modal, Result } from 'antd-mobile';
import { SearchBar, Tabs,Icon } from 'antd-mobile';
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
export default class Gong extends Component {

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
            }

        };
    }
    //详情
    btnxq(id) {
        const { dispatch } = this.props;
        dispatch(routerRedux.push('/Details?id=' + id));
    }
    //
    // async componentDidMount() {
    //     const { dispatch ,shop} = this.props;
    //     const aaa = await fetch.factory();
    //     const bbb = aaa.data.data;
    //     this.setState({ DATA: bbb })
    //     console.log(bbb, '.0.0.0.')
    // }
    componentWillReceiveProps(newProps) {
        const { shop } = newProps;
        if(no_props==3){
            return
        }
        this.setState({ DATA: shop.infoList })
        console.log("2221119999955555555",shop.infoList)
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
              
            }
          })
    }
    //工种选择
    async changeData(index) {

    }
    //搜索框
    async searchFunc(value) {
        // console.log(value,'输入的值')
        const {location} = this.props;
        const parse=queryString.parse(location.search.replace("?","")); 

        const tt=parse.id;
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
                gong:tt
                
                
            }
        })
    }
    //select 选择框
    onChanges(v) {
        // console.log(v.target.value, '999999999999999666666')
        const {location} = this.props;
        const parse=queryString.parse(location.search.replace("?","")); 

        const tt=parse.id;
        console.log(tt,'sssssssss')
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
                    gong:tt,
                  
                    
                }
            })
        }
    }
    render() {
        const { history, dispatch, shop } = this.props;

        const {location} = this.props;
        const parse=queryString.parse(location.search.replace("?","")); 
        console.log(parse,'pppppppppppppppppppp456');

        // 列表是否有下一页
        let hasMore = shop.pagination.hasMore; // 是否加载更多 ture/false
        const area = shop.areaInfo;
        console.log(area,"**************1asss11")
        const arealist = area[0];
        const video = area[1];
        const gong=area[2];
        let d= gong?gong[parse.id-1]:'';
        let name=parse.name
       
        console.log(d,'456');
        
        const vid = d ? d.gong_video : '';   //视频;
        const pic = d ? d.gong_video_pic : '';   //视频;
        const data = this.state.DATA;  // 
       
        console.log(data, '------222')
        const navBarProps = {
            leftVisible: true,
            
            titleName: "",
            rightContent: "",
           
        }
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

                    {/* .am-search-cancel{
                        color:red;
                        } */}
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
                        .am-icon-md{
                            width: 0.55rem;
                            height: 0.55rem;
                        }
                    
                    
                    `}
                </style>
                {/*头部导航栏*/}
                {/* <MyNavBar {...navBarProps}/> */}
                {/*底部标签栏*/}
                {/* <MyTabBar {...tabBarProps} /> */}
                <div className={styles.main}>
                    {/* 头部搜索 */}
                    <div className={styles.position}>
                        <Icon type="left" className="left" onClick={ ()=>history.go(-1)} />
                        <div className={styles.gongz}>{name}</div>
                    </div>
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
                </div>
            </div>
        )
    }
}
