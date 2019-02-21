import * as fetchs from '../utils/fetch';
//登录
export function userLogin(params){
  return fetchs.creat_Token(fetchs.APIHost+"/index/user/login",fetchs.getAuth("/index/user/login",params.username,params.password),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}


//注册
export async function  register(params) {
  return fetchs.create(fetchs.APIHost+"/index/login/reg",params).then(response => response.json())
    .then(json => {return json});
}
//注册协议
export async function  zcxy(params) {
  return fetchs.create(fetchs.APIHost+"/index/total/ruzhu",params).then(response => response.json())
    .then(json => {return json});
}

// 外部获取验证码
export async function getCode(params) {
  return fetchs.create(fetchs.APIHost+"/index/total/send",params).then(response => response.json())
    .then(json => {return json});
}
//忘记密码
export async function changePwd(params) {
  return fetchs.create(fetchs.APIHost+"/index/login/forget",params).then(response => response.json())
    .then(json => {return json});
}
// 修改密码
export async function modifyPwd(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/user/pass",fetchs.getAuth("/index/user/pass"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 资金管理
export async function fund(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/profit/zi",fetchs.getAuth("/index/profit/zi"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//我的
export function mine(params){
  return fetchs.creat_Token(fetchs.APIHost+"/index/user/index",fetchs.getAuth("/index/user/index"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//提交审核
export function subcheck(params){
  return fetchs.creat_Token(fetchs.APIHost+"/index/user/shen",fetchs.getAuth("/index/user/shen"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 上传图片-文件对象
export async function  uploadImgs(params) {
  // console.log(params,'-')
  return fetchs.uploadImg_Token(fetchs.APIHost+"/index/total/uploads",params).then(response => response.json()).then(json => {return json});
}
// 注册-上传身份证-base64
export async function  uploadImg(params) {
  console.log(params,'-')
  return fetchs.create(fetchs.APIHost+"/index/total/upload",params).then(response => response.json()).then(json => {return json});
}
//二维码-背景图上传
export async function  bgpic(params) {
  return fetchs.uploadImg_Token(fetchs.APIHost+"/index/total/bgpic",params).then(response => response.json()).then(json => {return json});
}
//个人中心-背景图上传
export async function  life(params) {
  return fetchs.uploadImg_Token(fetchs.APIHost+"/index/total/bguser",params).then(response => response.json()).then(json => {return json});
}
// 个人信息
export async function PersonalInfo(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/user/login",fetchs.getAuth("/index/user/login"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//提交个人信息
export async function Agentuser(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/user/edit",fetchs.getAuth("/index/user/edit"),JSON.stringify(params)).then(response => response.json())
  .then(json => {return json});
}
//扫码支付
export async function szhifu(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/wechat/order",fetchs.getAuth("/index/wechat/order"),JSON.stringify(params)).then(response => response.json())
  .then(json => {return json});
}
//扫码注册
export async function sres(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/wechat/scan",fetchs.getAuth("/index/wechat/scan"),JSON.stringify(params)).then(response => response.json())
  .then(json => {return json});
}
// 首页 选择城市
export async function selectcity(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/prod/area",fetchs.getAuth("/index/prod/area"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 我的团队
export async function team(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/user/team",fetchs.getAuth("/index/user/team"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//速聘经理
export async function supin(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/user/dir_sp",fetchs.getAuth("/index/user/dir_sp"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//雅虎经理
export async function yahu(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/user/dir_yh",fetchs.getAuth("/index/user/dir_yh"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//工厂
export async function factory(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/prod/index",fetchs.getAuth("/index/prod/index"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//入职记录
export async function ruzhi(params) {
    return fetchs.creat_Token(fetchs.APIHost+"/index/user/ru",fetchs.getAuth("/index/user/ru"),JSON.stringify(params)).then(response => response.json())
    .then(json => { return json});
}
//雅虎赏金
export async function shangjin(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/profit/wal",fetchs.getAuth("/index/profit/wal"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//提现
export async function tixian(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/profit/tx",fetchs.getAuth("/index/profit/tx"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//转账
export async function trans(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/profit/trans",fetchs.getAuth("/index/profit/trans"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//转账记录
export async function tansrecord(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/profit/transfer",fetchs.getAuth("/index/profit/transfer"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//提现记录
export async function tixianrecord(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/profit/tx_list",fetchs.getAuth("/index/profit/tx_list"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//押金支付 -微信
export async function wechat(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/wechat/index",fetchs.getAuth("/index/wechat/index"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//押金支付 -支付宝
export async function alipay(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/alipay/index",fetchs.getAuth("/index/alipay/index"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//新闻公告
export async function news(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/news/index",fetchs.getAuth("/index/news/index"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//公告详情
export async function newsxq(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/news/xq",fetchs.getAuth("/index/news/xq"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 线下门店
export async function offline(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/user/qu",fetchs.getAuth("/index/user/qu"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 门店站长室
export async function zroom(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/user/qu_min",fetchs.getAuth("/index/user/qu_min"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 二维码
export async function erweima(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/red/share",fetchs.getAuth("/index/red/share"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//门店输送
export async function Storedelivery(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/user/mensong",fetchs.getAuth("/index/user/mensong"),JSON.stringify(params)).then(response => response.json())
  .then(json => {return json});
}

//工厂详情
export async function factorydetail(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/prod/detail",fetchs.getAuth("/index/prod/detail"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//摇一摇
export async function yao(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/red/yao",fetchs.getAuth("/index/red/yao"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//openid  接口
export async function openid(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/wechat/GetOpenid",fetchs.getAuth("/index/wechat/GetOpenid"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//摇一摇次数
export async function chance(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/red/index",fetchs.getAuth("/index/red/index"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//摇一摇领取红红包
export async function honhbao(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/red/ling",fetchs.getAuth("/index/red/ling"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 申请入职
export async function inJob(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/user/inJob",fetchs.getAuth("/index/user/inJob"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 添加商品
export function getAddr(params){
  return fetchs.creat_Token(fetchs.APIHost+"/addr/list",fetchs.getAuth("/addr/list"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}

// 添加商品
export function addGood(params){
  return fetchs.creat_Token(fetchs.APIHost+"/shop/add",fetchs.getAuth("/shop/add"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 领取商品协议
export async function xieyi(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/user/xieyi",fetchs.getAuth("/index/user/xieyi"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 领取礼包
export async function pack(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/user/inGift",fetchs.getAuth("/index/user/inGift"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 已领取商品
export async function yypack(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/user/gift",fetchs.getAuth("/index/user/gift"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 身份验证
export async function yan(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/user/card",fetchs.getAuth("/index/user/card"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 获取分类列表
export function getClassify(){
  return fetchs.read_Token(fetchs.APIHost+"/shop/type",fetchs.getAuth("/shop/type")).then(response => response.json())
  .then(json => { return json});
}

// 获取我的商品列表
export function getGoods(params){
  if(!params.page){
    params={page:1}
  }
  return fetchs.read_Token(fetchs.APIHost+"/good/list?page="+params.page,fetchs.getAuth("/good/list")).then(response => response.json())
  .then(json => { return json});
}



// 删除商品
export function deteteGood(params){
  return fetchs.creat_Token(fetchs.APIHost+"/good/delete",fetchs.getAuth("/good/delete"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}



// 获取轮播列表
export function getCarousel(){
  return fetchs.read_Token(fetchs.APIHost+"/shop/roll",fetchs.getAuth("/shop/roll")).then(response => response.json())
  .then(json => { return json});
}

// 获取商城商品列表
export function getShopList(params){  
  if(!params.page){
    params.page=1
  }
  if(params.search){
    return fetchs.read_Token(fetchs.APIHost+"/shop/list?page="+params.page+"&search="+params.search,fetchs.getAuth("/shop/list")).then(response => response.json())
    .then(json => { return json});
  }else if(params.type){
    return fetchs.read_Token(fetchs.APIHost+"/shop/list?page="+params.page+"&type="+params.type,fetchs.getAuth("/shop/list")).then(response => response.json())
    .then(json => { return json});
  }else if(params.is_hot){
    return fetchs.read_Token(fetchs.APIHost+"/shop/list?page="+params.page+"&is_hot="+params.is_hot,fetchs.getAuth("/shop/list")).then(response => response.json())
    .then(json => { return json});
  }else if(params.id){
    return fetchs.read_Token(fetchs.APIHost+"/shop/list?id="+params.id,fetchs.getAuth("/shop/list")).then(response => response.json())
    .then(json => { return json});
  }
}





// 结算
export function createOrder(params){
  return fetchs.creat_Token(fetchs.APIHost+"/good/buy",fetchs.getAuth("/good/buy"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}


// 商城交易记录
export function getOrder(params){
  if(!params.page){
    params.page=1
  }
  if(!params.type){
    params.type=0
  }
  if(params.id){
    return fetchs.read_Token(fetchs.APIHost+"/shop/Record?id="+params.id+"&type="+params.type,fetchs.getAuth("/shop/Record")).then(response => response.json())
    .then(json => { return json});
  }else{
    return fetchs.read_Token(fetchs.APIHost+"/shop/Record?page="+params.page+'&type='+params.type,fetchs.getAuth("/shop/Record")).then(response => response.json())
    .then(json => { return json});
  }
}


// 获取列表 
export function get_shop_list(params){


  return fetchs.read(fetchs.APIHost+"/good/suc/?page="+params.page+"size="+params.size).then(response => response.json())
  .then(json => { return json});
}


// 确认完成订单
export function endOrder(params){
  return fetchs.creat_Token(fetchs.APIHost+"/good/suc",fetchs.getAuth("/good/suc"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
