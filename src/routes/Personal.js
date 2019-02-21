import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Modal, List, Button, WhiteSpace, WingBlank,Toast } from 'antd-mobile';
import MyTabBar from "../components/TabBar";
import {loggedIn, loginOut, APIHost} from '../utils/fetch';
import * as Shop from '../services/shop';
import styles from "./styles/Personal.less";
import mine1 from '../assets/images/mine.png';
import mine01 from '../assets/images/mine01.png';
import mine02 from '../assets/images/mine02.png';
import mine03 from '../assets/images/mine03.png';
import mine04 from '../assets/images/mine04.png';
import mine05 from '../assets/images/mine05.png';
import mine06 from '../assets/images/mine06.png';
import mine07 from '../assets/images/mine07.png';
import mine08 from '../assets/images/mine08.png';
import mine09 from '../assets/images/mine09.png';
import gift from '../assets/images/gift.png';
import qq from '../assets/images/q.jpg';
import tel from '../assets/images/tel.png';
import icon01 from '../assets/images/t01.png';
import yao from '../assets/images/yao.png';
@connect(state => ({ shop: state.shop }))

export default class Personal extends Component {
       
     // 构造函数
     constructor(props) {
        
        super(props);
        this.state = {
            selectedTabBar: "mine",
            modal1: false,
            modal2: false,
            check:1,
            imgUrl:"",
            codelist:''
        }     
    }
    
    componentDidMount(){
        const {shop}=this.props;
        const codelist=shop.userInfo;
        this.setState({codelist:codelist})
    }
    UNSAFE_componentWillReceiveProps(props){
        const {shop}=props;
        const codelist=shop.userInfo;
        if(codelist.us_live_pic){
          this.setState({
            imgUrl:codelist.us_live_pic,
          })
        }
    }
      //背景图上传
      async getLocalImg(e){
        const {shop}=this.props;
        const codelist=shop.userInfo;
        var formData = new FormData();
        console.log(e.target.files[0],'@@@@@@123');
        formData.append("imgaaaa",e.target.files[0]);
        formData.append("id",codelist.id);
        // console.log()
        // formData.append("id",e.target.files[0]);
        Toast.loading("正在上传背景图", 0);
        const result =await Shop.life(formData);
        // console.log(result,'oooooooooooooooooooooo')
        Toast.hide();
        if(result.code == 1){
            this.setState({
                imgUrl:result.data
            })
            Toast.success('上传成功!',1);
        }else{
            Toast.offline("上传失败请重新尝试",1);
        }
    }
    //    //营业执照
    //    getLocalImgc4(e) {
    //     // Toast.info("加载中...")
    //     if(!e.target.files[0]){
    //     return
    //     }
    //     var reader = new FileReader();
    //     reader.readAsDataURL(e.target.files[0])
    //     reader.onload = function (e) {
    //         this.setState({
    //                 imgUrlc: e.target.result,
                    
    //         })
    //         Shop.uploadImg({img:this.state.imgUrlc}).then((result)=>{
    //             if(result.code===1){
    //                 Toast.success(result.msg,1,()=>{
    //                     this.setState({t4:result.data})
    //                 //   dispatch(routerRedux.push('/member'))
    //                 });
    //             }else{
    //                 Toast.offline(result.msg,1)
    //             }
    //         })
    //         return this.result
    //     }.bind(this)
    // }
    //雅虎赏金
    btnReward(){		
		const{dispatch}=this.props;
		dispatch(routerRedux.push('/Reward'));
    }
     //入职记录
     btnfound(){		
		const{dispatch}=this.props;
		dispatch(routerRedux.push('/Presentrecord'));
    }
    //入职礼包
 async ruzhi(){
    const{dispatch}=this.props;
    const gifts=await Shop.PersonalInfo();
    const data=gifts.data;
    console.log(data,'data')
// us_zt==0 ,不能领取
    if(data.us_ling=='0'){
        this.setState({
            modal1:true ,
         })
    }else{
        dispatch(routerRedux.push('/Gifttan?us_ling='+data.us_ling));
    }
}
    btngift(){		
		const{dispatch}=this.props;
		dispatch(routerRedux.push('/Packagegifts'));
    }
     //线下门店
     btnstore(){		
        const{dispatch,shop}=this.props;
        dispatch(routerRedux.push('/Store')); 	
    }
    //门店站长室
    btnoffice(){	
        const{dispatch,shop}=this.props;
        const mineInfo=shop.mineList;
        if(mineInfo.us_is_agency!==1){
            Toast.offline('你还不是区带!!!', 1);
            return false;
        }else{
            dispatch(routerRedux.push('/Office')); 
        }	
    }
    //通知公告
    btnotice(){		
		const{dispatch}=this.props;
		dispatch(routerRedux.push('/Notice'));
    }
    //推广二维码
    btncode(){		
		const{dispatch}=this.props;
		dispatch(routerRedux.push('/Code'));
    }
     //推广二维码
     btntiaozhuan(){		
		const{dispatch}=this.props;
		dispatch(routerRedux.push('/Packagegifts'));
    }
     //摇一摇
     btnyao(){
        const{dispatch}=this.props;
        dispatch(routerRedux.push('/Yao'));
    }
  
     //退出登录
    btnout(){
        const {dispatch}=this.props;
        loginOut()
        dispatch(
         routerRedux.push('/login')
       )
   }
    
  

    //
        showModal = key => (e) => {
            e.preventDefault(); // 修复 Android 上点击穿透
            this.setState({
            [key]: true,
            });
        }
        onClose = key => () => {
            this.setState({
            [key]: false,
            });
        }
        //
        tankuang(){
            // alert('0000')
           this.setState({
               check:0
           }) 
        }
        quxiao(){
            this.setState({
                check:1
            }) 
        }
       
    
	render(){
        const {imgUrl,codelist}=this.state;
        const {history,dispatch,shop,user}=this.props;
		const tabBarProps = {
            selectedTabBar: this.state.selectedTabBar,
            history
        }
        const displaynone={
			display:"none"
		}
		const displayblock={
			display:"block"
		}
        const mineInfo=shop.mineList;
        const check=this.state.check;
		return(
			<div className={styles.App}>  
			{/* 样式 */}
                <style>
                    {`
                    .am-modal-body dt{
                        width:0.45rem;
                        height:0.45rem;
                        float: right;
                    }
                    .am-modal-body dt img{
                        width:100%;
                        height:100%;
                    }
                    .am-modal-body dd{
                        width:7.13rem;
                        {/* height:4.2rem; */}
                       
                    }
                    .am-modal-body dd img{
                        width:100%;
                        height:100%;
                    }
                    .am-modal-body dl{
                        width: 7.13rem;
                        
                    }
                    .am-modal-transparent .am-modal-content .am-modal-body{
                        padding:0
                    }
                   
                    .am-modal-content{
                        background-color: transparent;
                    }
                    .am-modal-transparent{
                        width:7.13rem;
                        
                    }
                    .am-modal-mask{
                        background-color: #000000;
                        opacity:0.6;
                    }
                    .am-modal-close-x{
                        width: 0.2rem;
                        height: 0.2rem;
                    }
                    .am-modal-close{
                        border-radius: 50%;
                        border: 1px solid white;
                    }
                    .am-button-primary{
                        background-color: #0187FC;
                        width: 90%;
                        margin: auto;
                        outline: none;
                        border-radius: 0.44rem;
                        margin-top: 0.5rem;
                        margin-bottom: 1.55rem;
                    }
                    a:hover{
                        text-decoration: none;
                    }
                    a{
                        color:#333333;
                    }

                    .cc{
                        width: 100%;
                        height: 100%;
                        background-color: #000000;
                        opacity: 0.6;
                        position: fixed;
                        top: 0;
                    }
                    .content{
                        position: fixed;
                        width: 70%;
                        margin: auto;
                        height: 3rem;
                        background: white;
                        top: 30%;
                        left: 50%;
                        transform: translate(-50%);
                        border-radius: 0.25rem;
                       
                    }
                    .content h2{
                        text-align: center;
                        font-size: 0.36rem;
                        font-weight: bold;
                        padding: 0.3rem;
                        
                    }
                    .way{
                        padding:0.5rem;
                        display:flex;
                        justify-content: space-between;
                    }
                    .way a{
                        display:flex;
                    }
                    .imgqq{
                        width:0.54rem;
                        height:0.54rem;    
                    }
                    .imgqq img{
                        width:100%;
                        height:100%;   
                    }
                    .imgtel{
                        width:0.44rem;
                        height:0.44rem;    
                    }
                    .imgtel img{
                        width:100%;
                        height:100%;   
                    }
                    .way span{
                        font-size: 0.28rem;
                        padding-top: 10px;
                        padding-left: 0.1rem;
                    }
                    .fengmianDiv input{ display:none;}
                    .fengmianDiv img{ 
                    width: 100%;
                    height: 4.5rem
                    }  
                    `}
                </style>
                {/*底部标签栏*/}
                <MyTabBar {...tabBarProps}/>
                <label className="fengmianDiv">
                        <input id="imgURl" name="from" type="file" onChange = {this.getLocalImg.bind(this)}  accept="image/*"  />
                        <img className="id_card" ref="cover" name="enter_imgsPath" src={APIHost+imgUrl} />
                </label>
                <div className={styles.topimg}> 
                    <div className={styles.topimg2}>
                        <img src={mine1} alt=""/>
                    </div>
                    <dl>
                        <dt>
                            <img src={APIHost+mineInfo.pic} alt=""/>
                        </dt>
                        <dd>
                            <div>
                                <p className={styles.name}>
                                    {mineInfo.real}
                                    <span>{mineInfo.level}</span>
                                </p>
                                <p className={styles.jianjie}>{mineInfo.tel}</p>
                            </div>
                        </dd>
                    </dl>
                </div> 
                <div className={styles.conbox}>
                    <div className={styles.notices}>
                        <dl>
                            <dt style={{width:'2.28rem'}}>{mineInfo.income}</dt>
                            <dd>本月收入</dd>
                        </dl>
                        <dl>
                            <dt style={{width:'2.28rem'}}>{mineInfo.qualified}</dt>
                            <dd>本月合格</dd>
                        </dl>
                        <dl onClick={()=>history.push('/Foundmanage')}>
                            <dt style={{width:'2.28rem'}}>{mineInfo.yue}</dt>
                            <dd>钱包余额</dd>
                        </dl>
                    </div> 
                    <div className={styles.boxtop}>
                        <dl onClick={()=>history.push('/Personaldata')}>
                            <dt>
                                <img src={mine01} alt=""/>
                            </dt>
                            <dd>个人信息</dd>
                        </dl>
                        <dl onClick={()=>this.btnReward()}>
                            <dt>
                                <img src={mine02} alt=""/>
                            </dt>
                            <dd>速聘赏金</dd>
                        </dl>
                        <dl onClick={()=>this.tankuang()}>
                            <a >
                                <dt>
                                    <img src={mine03} alt=""/>
                                </dt>
                                <dd>联系客服</dd>
                            </a>
                        </dl>
                        <div style={{clear:"both"}}></div>
                    </div>                    
                    <div className={styles.boxbottom}>
                        <dl onClick={()=>this.btnfound()}>
                            <dt>
                                <img src={mine04} alt=""/>
                            </dt>
                            <dd>入职记录</dd>
                        </dl>
                        <dl 
                          onClick={()=>this.ruzhi()}
                        >
                            <dt>
                                <img src={mine05} alt=""/>
                            </dt>
                            <dd>入职礼包</dd>
                        </dl>
                        <dl onClick={()=>this.btnotice()}>
                            <dt>
                                <img src={mine06} alt=""/>
                            </dt>
                            <dd>早八点</dd>
                        </dl>
                        <dl onClick={()=>this.btnstore()}>
                            <dt>
                                <img src={mine07} alt=""/>
                            </dt>
                            <dd>线下门店</dd>
                        </dl>
                        <dl onClick={()=>this.btnoffice()}>
                            <dt>
                                <img src={mine08} alt=""/>
                            </dt>
                            <dd>门店站长室</dd>
                        </dl>
                        <dl onClick={()=>this.btncode()}>
                            <dt>
                                <img src={mine09} alt=""/>
                            </dt>
                            <dd>推广二维码</dd>
                        </dl>
                        <dl onClick={()=>this.btnyao()}>
                            <dt>
                                <img src={yao} alt=""/>
                            </dt>
                            <dd>摇一摇</dd>
                        </dl>
                        <div style={{clear:"both"}}></div>
                    </div>
                    <Modal
                        visible={this.state.modal1}
                        transparent
                        closable={true}
                        maskClosable={false}
                        onClose={this.onClose('modal1')}                       
                        wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                        >
                        <div style={{}}>
                            <dl>
                                <dd>
                                <img src={gift}
                                    id="img_map"
                                    border="0"  useMap="#planetmap" alt="Planets" />
                                    <div onClick={()=>this.btntiaozhuan()} style={{width:"2rem",height:"0.8rem",background:"transparent",position:"relative",bottom:"1.2rem",left:"50%",marginLeft:"-1rem"}}></div>
                                </dd>
                            </dl>
                        </div>
                    </Modal>
                    {/* <div className="tankuang">
                        <Modal
                            visible={this.state.modal2}
                            transparent
                            maskClosable={true}
                            onClose={this.onClose('modal1')}
                            title="免费咨询电话"
                            wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                            >
                            <div style={{color:"#666666"}}>
                                <dl>
                                    <dt>拨打官方热线</dt>
                                    <dd>ddd</dd>
                                </dl>
                            </div>
                            <div style={{marginTop:'0.4rem',textAlign:'center',color:'#58F023',fontSize:'0.4rem'}}>呼</div>
                        </Modal>
                    </div> */}     
                    
                </div>
                <Button type="primary" onClick={()=>this.btnout()}>退出登录</Button><WhiteSpace />   
                <div className='cc' style={check===1?displaynone:displayblock} onClick={()=>this.quxiao()}></div>
                <div className='content' style={check===1?displaynone:displayblock}>
                    <h2>咨询方式</h2>
                    <div className="way">
                    {/* <a href='http://wpa.qq.com/msgrd?v=3&uin=1057044334&site=qq&menu=yes'><div className='imgqq'><img src={qq} /></div><span>qq咨询</span></a> */}
                    <a href={"tel:"+mineInfo.web_phone}><div className='imgtel'><img src={tel} /></div><span>电话咨询</span></a>
                    </div>
                </div>
                  
            </div>
			
		)
    }
}