import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { List } from 'antd-mobile';
// import ReactEcharts from 'echarts-for-react';
// import echarts from 'echarts/lib/echarts';
// 引入提示框和标题组件
// import 'echarts/lib/component/tooltip';
// import 'echarts/lib/component/title'
import {loggedIn, loginOut, APIHost} from '../utils/fetch';
import Highcharts from 'react-highcharts';
import MyNavBar from "../components/MyNavBar";
import MyTabBar from "../components/TabBar";
import styles from "./styles/Myteam.less";
import team1 from '../assets/images/m.png';

@connect(state => ({ shop: state.shop }))


export default class Myteam extends Component {
    
    // 构造函数
    constructor(props) {
        super(props);
        const { shop } = props;
        console.log(props,'000000@@@@dddddddddddddddd')
        this.state = {
            selectedTabBar: "trading",
            bilvNan:'',
            bilvNv:'',
            config:{},
               
        }; 
    }
    componentWillReceiveProps(newProps){
        const {shop} = newProps;
        const teamlist=shop.teamInfo;
        const _this = this;
        
        var initConfig = {
            config: {
                chart: {
                  type: 'column'
                },
                title: {
                  text: ''
                },
                subtitle: {
                  text: ''
                },
                legend: {
                    enabled: false,  // 隐藏图例
                    style:{
                        // fontSize:'54px'
                    },
                    // fontSize:'54px'
                  
                },
                tooltip: {
                  pointFormat: '{point.y}分</b>'
                },
                xAxis: {
                  lineColor: '#888888',
                  lineWidth: 1,   // 横向底部基准线
                  tickWidth:0,    // 隐藏横向每个单元格标尺
                  title:{
                    align: 'high',
                    offset: 0,
                    text: '',
                    rotation: 0,
                    y: -15,
                   
                  
                  },
                  categories: [ '男','女','',''],
                  labels: {
                    enabled: true ,  // 隐藏横向每个单元格备注('1', '2', '3', '4', '5'),
                    style:{
                        fontSize:'35px',
                     
                      },
                      
                      
                  },
                 
                },
                yAxis: {
                  startOnTick: true,
                  endOnTick: true,
                  lineWidth: 1,
                  gridLineWidth:0,    // 隐藏横向网格线
                  title:{
                    text: '',   
                  },
                  style:{
                    fontSize:'35px'
                  },
                
                labels: {
                    enabled: true,  // 隐藏纵向每个单元格备注(分数:10,20,30,40...)
                    style:{
                        fontSize:'35px'
                      },
                   
                  },
                  plotLines: [{
                    color: '#cdcdcd',  // 横向基准线
                    dashStyle: 'dot',
                    width: 2,
                    value: 60,         // 定义在60 
                    label: {
                      align: 'right',
                      style: {
                        fontStyle: 'italic',
                   
                      },
                      text: '60',
                      x:-5,
                      y: 5, 
                    },
                  
                    style:{
                        fontSize:'35px'
                      },
                    zIndex: 3,
                  }] 
                },
                plotOptions: {
                  column: {
                    dataLabels: {
                      enabled: true,
                      color:'#999',
                      fontSize:'35px',
                      style:{
                        fontSize:'35px'
                      }, 
                      y:6,
                      
                      
           
                    },
                    enableMouseTracking: false
                  }                 
                },
                series: [{
                  name: '',
                  data: [
                    {y:teamlist.man?teamlist.man:0,color:'#5D91A7'},
                    {y:teamlist.women?teamlist.women:0,color:'#4090FE'},
                    {y:'',color:''},
                    {y:'',color:''},
                   
                  ]
                  
                }],
                credits:{
                  enabled:false             // 隐藏右下角版权
                }
              },
        }   
        var initConfig2 = {
            config: {
                chart: {
                  type: 'column'
                },
                title: {
                  text: ''
                },
                subtitle: {
                  text: ''
                },
                legend: {
                    enabled: false,  // 隐藏图例
                   
                  
                },
                tooltip: {
                  pointFormat: '{point.y}分</b>'
                },
                xAxis: {
                  lineColor: '#888888',
                  lineWidth: 1,   // 横向底部基准线
                  tickWidth:0,    // 隐藏横向每个单元格标尺
                  title:{
                    align: 'high',
                    offset: 0,
                    text: '',
                    rotation: 0,
                    y: -15,
                  },
                  categories: ['16-20岁', '21-30岁','31-40岁','其他'],
                  labels: {
                    enabled: true ,  // 隐藏横向每个单元格备注('1', '2', '3', '4', '5'),
                    style:{
                        fontSize:'35px'
                      },
              
                  }
                },
                yAxis: {
                  startOnTick: true,
                  endOnTick: true,
                  lineWidth: 1,
                  gridLineWidth:0,    // 隐藏横向网格线
                  title:{
                    text: '', 
                  },
                  style:{
                    fontSize:'35px'
                  },
             
                labels: {
                    enabled: true,  // 隐藏纵向每个单元格备注(分数:10,20,30,40...)
                    style:{
                        fontSize:'35px'    //纵坐标字体大小
                      }, 
                  },
                  plotLines: [{
                    color: '#cdcdcd',  // 横向基准线
                    dashStyle: 'dot',
                    width: 2,
                    value: 60,         // 定义在60 
                    label: {
                      align: 'right',
                      style: {
                        fontStyle: 'italic',
                        fontSize:'35px'
                   
                      },
                      style:{
                        fontSize:'35px'
                      },
                      text: '60',
                      x:-5,
                      y: 5,
                 
                      
                    },
                
                    zIndex: 3,
                 
                  }]
                  
                },
                plotOptions: {
                  column: {
                    dataLabels: {
                      enabled: true,
                      color:'#999',
                      y:6,

                      // x:5, 
                      style:{
                        fontSize:'35px'
                      },
                      
           
                    },
                    enableMouseTracking: false
                  }                 
                },
                series: [{
                  name: '',
                  data: [
                    {y:teamlist.er?teamlist.er:0,color:'#E4A031'},
                    {y:teamlist.san?teamlist.san:0,color:'#25467C'},
                    {y:teamlist.si?teamlist.si:0,color:'#92AF54'},  // 大于60
                    {y:teamlist.wu?teamlist.wu:0,color:'#894739'},  // 小于60
                    // {y:88,color:'#18baa2'},
                  ]
                  
                }],
                credits:{
                  enabled:false             // 隐藏右下角版权
                }
              },
        }
        this.setState({ 
            bilvNan:teamlist.man,
            bilvNv:teamlist.women,
            config: initConfig.config,
            config2: initConfig2.config,
         })
    }
    //速聘经理
    btnspmanage(){
        const {dispatch}=this.props;
        dispatch(routerRedux.push('/Teamlist'));
    }
     //雅虎经理
     btnyhmanage(){
        const {dispatch}=this.props;
        dispatch(routerRedux.push('/Teamlist2'));
    }

    render() {
        const navBarProps = {
            leftVisible: false,
            titleName: "我的团队",
            rightContent: "",
         
        }
        const {type}=this.state
        const { history, dispatch, shop } = this.props;
        const teamlist=shop.teamInfo;
        // 传入tabBar参数
        // selectedTabBar:活动的tab,string
        // history ,传入history用于点击跳转
        const tabBarProps = {
            selectedTabBar: this.state.selectedTabBar,
            history
        }
        const Item = List.Item;
        const Brief = Item.Brief;
        return (
            <div className={styles.App}>
                {/* 样式 */}
                <style>
                    {`
                   
                    
                    `}
                </style>
                {/*头部导航栏*/}
                <MyNavBar {...navBarProps} />
                {/*底部标签栏*/}
                <MyTabBar {...tabBarProps} />
                {/* <div className={styles.header}>
                    我的团队
                </div> */}
                <div className={styles.imgbox}>
                    <div className={styles.bgimg}>
                        <img src={APIHost+teamlist.team_bgpic} alt="" />
                    </div>
                </div>
                <List className="my-list">
                    <Item
                        arrow="horizontal"
                        multipleLine
                        onClick={() =>this.btnspmanage() }
                        platform="android"
                    >
                        速聘经理
                        <span style={{paddingLeft:'1.8rem'}}>总人数 <label>{teamlist.sp}</label>人</span>
                    </Item>
                    <Item
                        arrow="horizontal"
                        multipleLine
                        onClick={() =>this.btnyhmanage() }
                        platform="android"
                    >
                         速聘总监
                        <span style={{paddingLeft:'1.8rem'}}>总人数<label>{teamlist.yh}</label>人</span>
                    </Item>
                </List>
                {
                  teamlist.man||teamlist.women?<div className={styles.teambot}>
                  <div className={styles.percent}>
                      <p>男女比例：<span>{teamlist.man}</span>:<span>{teamlist.women}</span></p>
                      {/* <p>男女比例：</p> */}
                      {/* <p>年龄比例：<span>9:1</span></p> */}
                      {/* <p>2018-10月注册指标：</p> */}
                  </div>
                  <div className="chart" >
                      {
                          this.state.config&&this.state.config.chart?(<Highcharts config={this.state.config} style={{ height: "auto" }}></Highcharts>):""
                      } 
                      <div className={styles.percent}>
                      {/* <p>年龄比例：</p> */}

                      <p>年龄比例：<span>{teamlist.er}</span>:<span>{teamlist.san}</span>:<span>{teamlist.si}</span>:<span>{teamlist.wu}</span></p>
                      {/* <p>2018-10月注册指标：</p> */}
                  </div> 
                      {
                          this.state.config2&&this.state.config2.chart?(<Highcharts config={this.state.config2} style={{ height: "auto" }}></Highcharts>):""
                      }   
                  </div>
                  
              </div>:''
                }
                
            </div>
        )
    }
}