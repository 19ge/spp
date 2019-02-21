import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import MyNavBar from "../components/MyNavBar";
import * as Shop from '../services/shop';
import { Button, WhiteSpace, WingBlank ,Toast} from 'antd-mobile';
import styles from "./styles/Packagegifts.less";
import gift01 from '../assets/images/g01.png';
import gift02 from '../assets/images/g02.png';
import gift03 from '../assets/images/g03.png';
import gift04 from '../assets/images/g04.png';
import gift05 from '../assets/images/g05.png';
import gift06 from '../assets/images/g06.png';
import { APIHost } from '../utils/fetch';
import { Item } from '_antd-mobile@2.2.6@antd-mobile/lib/tab-bar';
@connect(state => ({ shopData: state.shop }))
export default class Packagegifts extends Component {
    state={
        AttrA:4,
        data:'',
        data2:'',
        id:'',
    }
    chgAttr=(e,i)=>{
        // console.log('当前选择',e)
        this.setState({
            AttrA:e,
        })  
    }
    async componentDidMount(){
        const result=await Shop.pack();
        
        const result2=await Shop.xieyi();
        this.setState({
            data:result.data,
            data2:result2.data,
        });
        
    }
    async  btngift(){
        const {AttrA}=this.state;
        // dispatch(routerRedux.push('/Xieyi'))
        const{dispatch}=this.props;
		dispatch(routerRedux.push('/Xieyi?id='+AttrA));
    }
    //礼包详情
    btnxgift(id,name){
        const{dispatch}=this.props;
		dispatch(routerRedux.push('/libao?id='+id));
    }
    render(){
        const navBarProps = {
            leftVisible:true,
            leftFunc(){
                history.go(-1)
              },
            titleName:"入职礼包",
            rightContent:"",
            rightFunc(){
           
            }
        }
        const {data,data2}=this.state;
        const {history,dispatch,shopData}=this.props;
        return(
            <div className={styles.App}>
                {/* 样式 */}
                <style>
                    {`
                    .am-button-primary{
                        font-size:0.34rem;
                        background-color: #0187FC;
                        margin-top:1rem;
                        margin-bottom:0.5rem;
                    }
                    a{
                        text-decoration-line: none;
                       
                    }
                    .active{
                        background:lightblue;
                    }

                    `}
                </style>
                {/*头部导航栏*/}
                <MyNavBar {...navBarProps}/>
                <div className={styles.gifts}>
                    {
                        data?data.map((item,index)=>{
                            const id=item.id;
                            const name=item.cate_detail
                            return(
                                    <dl style={{background:this.state.AttrA===id?'lightblue':'' }}  onClick={()=>this.chgAttr(id)}>
                                        <dt>{item.cate_name}<span onClick={()=>this.btnxgift(id,name)} style={{fontSize:'0.25rem',color:'red',paddingLeft:'0.2rem'}}>(点击查看礼包详情)</span></dt>
                                        <dd className={styles.img}>
                                            <img src={APIHost+item.cate_pic} />
                                        </dd>
                                    </dl> 
                            )
                        }):''
                    }     
                </div>
                <div className={styles.giftread}>
                    <div className={styles.readtop}>
                        <h5>(领取入职礼包详读）</h5>
                        {/* <div>
                        面试前享有入职礼包二款套组自愿选择服务每款商超
                        采购价约247元经由平台服务只需提交100元选购提
                        领，凡入职在岗满30天奖励80元到余额。
                        </div> */}
                    </div>
                    <div className={styles.readbot}>
                        <h5>提示：</h5>
                        <div>
                            <p>{data2.me_intro}</p>
                            {/* <p>2. 领取后不能更换物品或退款申请.未满工时的不能申请退回押金,</p>
                            <p>3. 入职礼包尚未全部厂区完善服务供应，请与客服先做确认.</p>
                            <p>4. 未提交选购者，不能参与满岗奖励金。</p>                                                        */}
                        </div>
                    </div>
                    <Button type='primary'  onClick={() => this.btngift()}>领取礼包</Button> 
                </div>
            </div>
        )
    }
}