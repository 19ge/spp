import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';
function RouterConfig({ history,app }) {
  // 首页
  const IndexPage = dynamic({
    app,
    models: () => [
      import('./models/shop'),
    ],
    component: () => import('./routes/IndexPage'),
  });
  //详情页
  const Details = dynamic({
    app,
    models: () => [
      import('./models/shop'),
    ],
    component: () => import('./routes/Details'),
  });
  // 我的团队
  const Myteam = dynamic({
    app,
    models: () => [
      import('./models/shop'),
    ],
    component: () => import('./routes/Myteam'),
  });
  // 摇一摇
  const Yao = dynamic({
    app,
    models: () => [
      import('./models/shop'),
    ],
    component: () => import('./routes/Yao'),
  });
  // 我的团队-速聘经理
  const Teamlist = dynamic({
    app,
    models: () => [
      import('./models/shop'),
    ],
    component: () => import('./routes/Teamlist'),
  });
  // 我的团队-雅琥经理
  const Teamlist2 = dynamic({
    app,
    models: () => [
      import('./models/shop'),
    ],
    component: () => import('./routes/Teamlist2'),
  });
   //个人中心
  const Personal = dynamic({
    app,
    models: () => [
      import('./models/shop'),
    ],
    component: () => import('./routes/Personal'),
  });
   //个人中心-个人资料
   const Personaldata = dynamic({
    app,
    models: () => [
      import('./models/shop'),
    ],
    component: () => import('./routes/Personaldata'),
  });
   //个人中心-雅琥赏金
   const Reward = dynamic({
    app,
    models: () => [
      import('./models/shop'),
    ],
    component: () => import('./routes/Reward'),
  });
  //个人中心-资金管理
  const Foundmanage = dynamic({
    app,
    models: () => [
      import('./models/shop'),
    ],
    component: () => import('./routes/Foundmanage'),
  });
   // 我的团队-入职礼包
   const Packagegifts = dynamic({
    app,
    models: () => [
      import('./models/shop'),
    ],
    component: () => import('./routes/Packagegifts'),
  });
   // 我的团队-线下门店
   const Store = dynamic({
    app,
    models: () => [
      import('./models/shop'),
    ],
    component: () => import('./routes/Store'),
  });

  // 我的团队-县级办公室
  const Office = dynamic({
    app,
    models: () => [
      import('./models/shop'),
    ],
    component: () => import('./routes/Office'),
  });
  // 我的团队-转账
  const TransAcc = dynamic({
    app,
    models: () => [
      import('./models/shop'),
    ],
    component: () => import('./routes/TransAcc'),
  });
  // 我的团队-转账记录
  const Transrecord = dynamic({
    app,
    models: () => [
      import('./models/shop'),
    ],
    component: () => import('./routes/Transrecord'),
  });
  // 我的团队-提现
  const Tixian = dynamic({
    app,
    models: () => [
      import('./models/shop'),
    ],
    component: () => import('./routes/Tixian'),
  });
  
  // 我的团队-提现记录
  const Tixianrecord = dynamic({
    app,
    models: () => [
      import('./models/shop'),
    ],
    component: () => import('./routes/Tixianrecord'),
  });
   // 我的团队-通知公告
   const Notice = dynamic({
    app,
    models: () => [
      import('./models/shop'),
    ],
    component: () => import('./routes/Notice'),
  });
  // 我的团队-通知公告-公告详情
  const Noticedetails = dynamic({
    app,
    models: () => [
      import('./models/shop'),
    ],
    component: () => import('./routes/Noticedetails'),
  });
  // 我的团队-个人信息-入职记录
  const Presentrecord = dynamic({
    app,
    models: () => [
      import('./models/shop'),
    ],
    component: () => import('./routes/Presentrecord'),
  });
  // 我的团队-个人信息-登录密码
  const Loginpsw = dynamic({
    app,
    models: () => [
      import('./models/shop'),
    ],
    component: () => import('./routes/Loginpsw'),
  });
  // 我的团队-推广二维码
  const Code = dynamic({
    app,
    models: () => [
      import('./models/shop'),
    ],
    component: () => import('./routes/Code'),
  });
  // 首页详情- 入职报名
  const Message = dynamic({
    app,
    models: () => [
      import('./models/shop'),
    ],
    component: () => import('./routes/Message'),
  });
  // 登录
  const Login = dynamic({
    app,
    models: () => [
      import('./models/shop'),
    ],
    component: () => import('./routes/Login'),
  });
  // 忘记密码
  const Forgetpsw = dynamic({
    app,
    models: () => [
      import('./models/shop'),
    ],
    component: () => import('./routes/Forgetpsw'),
  });
  // 立即注册
  const Res = dynamic({
    app,
    models: () => [
      import('./models/shop'),
    ],
    component: () => import('./routes/Res'),
  });
    // 礼包详情
    const Libao = dynamic({
      app,
      models: () => [
        import('./models/shop'),
      ],
      component: () => import('./routes/Libao'),
    });
  // 支付押金
  const Pay = dynamic({
    app,
    models: () => [
      import('./models/shop'),
    ],
    component: () => import('./routes/Pay'),
  });
  //已领取礼包
  const Gifttan = dynamic({
    app,
    models: () => [
      import('./models/shop'),
    ],
    component: () => import('./routes/Gifttan'),
  });
  //工种选择
  const Gong = dynamic({
    app,
    models: () => [
      import('./models/shop'),
    ],
    component: () => import('./routes/Gong'),
  });
    //领取礼包协议
    const Xieyi = dynamic({
      app,
      models: () => [
        import('./models/shop'),
      ],
      component: () => import('./routes/Xieyi'),
    });
       //注册协议
       const Zcxy = dynamic({
        app,
        models: () => [
          import('./models/shop'),
        ],
        component: () => import('./routes/Zcxy'),
      });
       //身份认证
       const Renzheng = dynamic({
        app,
        models: () => [
          import('./models/shop'),
        ],
        component: () => import('./routes/Renzheng'),
      });


  
  
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/Details" exact component={Details} />
        <Route path="/Myteam" exact component={Myteam} />
        <Route path="/Teamlist" exact component={Teamlist} />
        <Route path="/Teamlist2" exact component={Teamlist2} />
        <Route path="/Personal" exact component={Personal} />
        <Route path="/Personaldata" exact component={Personaldata} />
        <Route path="/Reward" exact component={Reward} />
        <Route path="/Foundmanage" exact component={Foundmanage} />
        <Route path="/Packagegifts" exact component={Packagegifts} />
        <Route path="/Store" exact component={Store} />
        <Route path="/Office" exact component={Office} />
        <Route path="/Tixian" exact component={Tixian} />
        <Route path="/TransAcc" exact component={TransAcc} />
        <Route path="/Transrecord" exact component={Transrecord} />
        <Route path="/Tixianrecord" exact component={Tixianrecord} />
        <Route path="/Notice" exact component={Notice} />
        <Route path="/Noticedetails" exact component={Noticedetails} />
        <Route path="/Presentrecord" exact component={Presentrecord} />
        <Route path="/Loginpsw" exact component={Loginpsw} />
        <Route path="/Code" exact component={Code} />
        <Route path="/Message" exact component={Message} />
        <Route path="/Login" exact component={Login} />
        <Route path="/Forgetpsw" exact component={Forgetpsw} />
        <Route path="/Res" exact component={Res} />
        <Route path="/Pay" exact component={Pay} />
        <Route path="/Gifttan" exact component={Gifttan} />
        <Route path="/Gong" exact component={Gong} />
        <Route path="/Xieyi" exact component={Xieyi} />
        <Route path="/Zcxy" exact component={Zcxy} />
        <Route path="/Libao" exact component={Libao} />
        <Route path="/Renzheng" exact component={Renzheng} />
        <Route path="/Yao" exact component={Yao} />
        
      </Switch>
    </Router>
  );
}

export default RouterConfig;
