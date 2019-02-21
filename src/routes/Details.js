import React, {Component} from 'react';
import {connect} from 'dva';
import { Button, Modal,Carousel, Toast, WingBlank} from 'antd-mobile';
import {loggedIn, loginOut, APIHost} from '../utils/fetch';
import * as fetch from '../services/shop';
import {routerRedux} from 'dva/router';
import styles from "./styles/Details.less";
import back  from '../assets/images/back.png';
import icon1  from '../assets/images/p1.png';
import icon2  from '../assets/images/p2.png';
import icon9 from '../assets/images/p9.png';
import icon10 from '../assets/images/p10.png';
import icon11 from '../assets/images/p11.png';
import icon12 from '../assets/images/p12.png';
// import {login} from '../utils/fetch';
var queryString = require('querystring');
@connect(state => ({shop: state.shop}))
export default class Details extends Component {  
    state = {
        data: ['1', '2', '3'],
        imgHeight: 3.6+"rem",
      } 
    constructor(props) {
        super(props);
        this.state = {
            modal1: false,
            modal2: false,
            DATA:'',
            imgHeight: 3.6+"rem",
        };
    }
    //弹框
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

    btnclick(){
        const {history,dispatch,shop}=this.props;
        const factinfo=shop.factoryInfo;
        const name=factinfo.prod_name;
        const {location} = this.props;
        const parse=queryString.parse(location.search.replace("?",""));
        
        if(parse && parse.id){
            const { dispatch } = this.props;
            if(loggedIn() && loggedIn().username){
                dispatch(routerRedux.push('/Message?id='+parse.id+'&name='+name));
            }else{
                if(window.confirm("请您先登录"))
                {
                    // return true;
                    dispatch(routerRedux.push('/login'))
                }else
                {
                    return false;
                }
            }
        }else{
            Toast.offline("参数有无，请返回重试");
            return;
        }
    }
    //我来推荐
    btntuijian(){
        const { dispatch } = this.props;
        const user = loggedIn();
        if(!user){
            if(window.confirm('请先登录')){
                dispatch(routerRedux.push('/login'))
            }
          
        }else{

            dispatch(routerRedux.push('/Code'))
        }
        
    }
    //返回首页
    btnindex(){
        const {dispatch}=this.props;
        dispatch(routerRedux.push('/'))
    }

    //处理富文本
    htmlspecialchars_decode(str, APIHost){
        str = str.replace(/&amp;/g, '&');
        str = str.replace(/&lt;/g, '<');
        str = str.replace(/&gt;/g, '>');
        str = str.replace(/&quot;/g, '"');
        str = str.replace(/&#039;/g, "'");
        str = str.replace(/\/ueditor/g,APIHost+'/ueditor' );
        return str;
    }
    

    render(){
        //领取赏金弹框
        const alert = Modal.alert;
        const showAlert = () => {
        const alertInstance = alert('Delete', 'Are you sure???', [
            { text: 'Cancel', onPress: () => console.log('cancel'), style: 'default' },
            { text: 'OK', onPress: () => console.log('ok') },
        ]);
        setTimeout(() => {
            // 可以调用close方法以在外部close
            console.log('auto close');
            alertInstance.close();
        }, 500000);
        };
        //
        const {history,dispatch,shop}=this.props;
        const factinfo=shop.factoryInfo;
        const imgArr=factinfo.pic;
        //头部背景图
     
        let value=factinfo.prod_describe?factinfo.prod_describe:"";
        const html=this.htmlspecialchars_decode(value,APIHost);
        return(
            <div className={styles.App}>
                 {/* 样式 */}
                 <style>
                    {`
                    
                    * { touch-action: pan-y; }
                    .am-button-small{
                        height:0.76rem;
                        line-height:0.76rem;
                        border-radius:0.1rem;
                        padding: 0 0.14rem;
                        font-size:0.24rem;
                        background:#0187FC;
                      
                        }
                    .height{
                        height:0.2rem;
                        background:#f5f5f9;
                        margin-left: -0.3rem;
                        margin-right: -0.24rem;
                    }
                    .am-modal-transparent{
                        width: 5.87rem;
                        height: 3.9rem;
                    }
                    .am-modal-title{
                        font-size:0.52rem;
                        text-align: left;
                    }
                    .am-modal-body{
                        height:auto;
                    }
                    .am-modal-body dt{
                        font-size: 0.4rem;
                    }
                    .am-modal-body dd{
                        font-size: 0.36rem;
                    }
                    .am-modal-header{
                        padding: 0.12rem 0.55rem 0.5rem;
                    }
                    .am-modal-transparent .am-modal-content .am-modal-body{
                        padding: 0 0.57rem 0.3rem;
                    }
                    .am-modal-content{
                        text-align: left;
                    }
                    .am-modal-button-group-v .am-modal-button{
                        color: #58F023;
                        font-size: 0.4rem;
                        border-top: 1px solid #ddd;
                    }
                    .am-button{
                        margin-right:0.1rem;
                    }
                    .am-wingblank.am-wingblank-lg{
                        height: 3.6rem;
                    }
                    .slider-list{
                        width: 100% !important;
                        // height: 3.6rem !important;
                    }
                    .am-carousel{
                        height: auto;
                    }
                    .am-wingblank-lg{
                        margin:0 !important;
                    }
                    .am-carousel-wrap-dot > span{
                        background: #0187FC;
                    }
                    .am-carousel-wrap-dot-active > span {
                        background: #888;
                    }
                    .slider-frame,.slider-list{
                        height:3.6rem !important;
                    }
                    .maomao{
                        padding-bottom:0.8rem;
                    }
                    .maomao img{
                        width:100%;
                    }
                    `}
                </style>
                <div className={styles.contentop} >
                    <WingBlank>
                        <Carousel
                        autoplay={true}
                        infinite
                        beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                        afterChange={index => console.log('slide to', index)}
                        >
                        { imgArr?imgArr.map((item,index) => (
                            <div
                            key={index}
                            style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                            >
                            <img
                                src={APIHost+item}
                                alt=""
                                style={{ width: '100%', verticalAlign: 'top',height:'100%' }}
                            />
                            </div>
                        )):""
                        }
                        </Carousel>
                    </WingBlank>
                    <img className={styles.back} src={back} alt="" onClick={ ()=>history.go(-1)}/>
                </div>
                <div className={styles.contenmid}>
                    <div className={styles.cname}>
                        <div className={styles.title}>
                            <p>{factinfo.prod_name}</p>
                            {
                                factinfo.prod_is_hot==0?<div className={styles.icon}>
                                <img src={icon2} alt=""/>
                            </div>:''
                            }
                            
                        </div>
                        <p className={styles.xinzi}>{factinfo.prod_daiyu}/月</p>
                    </div>
                    <div className='maomao'
                       dangerouslySetInnerHTML={{
                        __html: html
                        }}
                     >
                    </div>
                    <div className="height"></div>
                    <div className={styles.btn}>
                        <Button className={styles.topbtn} style={{background:'#FE0000'}} type="primary" inline size="small" onClick={() =>this.btnclick()
                                
                            }>
                            <dl className={styles.mao}>
                                <div className={styles.dt}><img src={icon9} alt=""/></div>
                                <div className={styles.dd}>报名入厂</div>
                            </dl>
                        </Button>
                        <Button type="primary" inline size="small"  onClick={()=>this.btntuijian()}>
                            <dl className={styles.mao}>
                                <div className={styles.dt}><img src={icon10} alt=""/></div>
                                <div className={styles.dd}>我来推荐</div>
                            </dl>
                        </Button>
                        <Button type="primary" inline size="small" onClick={this.showModal('modal1')}>
                            <dl className={styles.mao}>
                                <div className={styles.dt}><img src={icon11} alt=""/></div>
                                <div className={styles.dd}>电话咨询</div>
                            </dl>
                        </Button>
                        <Button type="primary" inline size="small" onClick={()=>this.btnindex()}>
                            <dl className={styles.mao}>
                                <div className={styles.dt}><img src={icon12} alt=""/></div>
                                <div className={styles.dd}>速聘首页</div>
                            </dl>
                        </Button>
                    </div> 
                    <Modal
                        visible={this.state.modal1}
                        transparent
                        maskClosable={true}
                        onClose={this.onClose('modal1')}
                        title="免费咨询电话"
                        wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                        >
                        <div style={{color:"#666666"}}>
                            <dl>
                                <dt>拨打官方热线</dt>
                                <dd>{factinfo.prod_tel}</dd>
                            </dl>
                        </div>
                        <div style={{marginTop:'0.4rem',textAlign:'center',color:'#58F023',fontSize:'0.4rem'}}><a style={{color:'#58F023'}} href={"tel:"+factinfo.prod_tel}>呼叫</a></div>
                    </Modal>                                                                                                
                </div>
                <div style={{marginBottom:"0.3rem"}}></div>
            </div>
        )
    }
}