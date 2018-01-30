Vue.component("cuty-rty",{
	     data(){
	     	return{
	     		classA:"",
	     		classB:"",
	     		classC:"",
	     		
	     	}
	     },
			template:`
			   <section class="container-fluid" id="header">
        <nav class="navbar navbar-default navbar-fixed-top row" style="background:#0F4567;">
            <div class="onelogo">
            <div class="navbar-brand"><img src="../images/loginImg/logo.png" alt="logo" style="margin-left: 50px;"></div>
            <span class="niuluo">纽罗口腔管理平台</span>
            <span class="PhoneNumber">客服电话：400-0985-987</span>
            </div>
        <slot name="two">
             <a class="chatqq" target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=2162814136&site=qq&menu=yes"><img border="0" src="http://wpa.qq.com/pa?p=2:2162814136:41" alt="点击这里给我发消息" title="点击这里给我发消息"/></a>
         <div class="erweima">
			<img src="../Images/erweima.png"  class="aa"/><b>纽罗科技<br>关注有惊喜</b>
			<div>
				<img src="../Images/yakangbao.jpg" class="yakangbao">
				<div class="jiathis_style">
	<span class="jiathis_txt">分享到：</span>
	<a class="jiathis_button_icons_1"></a>
	<a class="jiathis_button_icons_2"></a>
	<a class="jiathis_button_icons_3"></a>
	<a class="jiathis_button_icons_4"></a>
	<a class="jiathis_counter_style"></a>
          </div>
			</div>
		</div>   
         </slot>
            <div class="btn-group xiazai">
                    <button data-toggle="dropdown" class="btn btn-success dropdown-toggle" type="button">客户端下载</button>
                    <ul class="dropdown-menu" role="menu">
                        <li>
                            <a href="http://www.niuluo-tech.cn:84/Package/NioroOralPlatform_32.rar" download="">Windows 32位</a>
                        </li>
                        <li>
                            <a href="http://www.niuluo-tech.cn:84/Package/NioroOralPlatform_64.rar" download="">Windows 64位</a>
                        </li>
                    </ul>
                </div>
             <ul class="lan">
             	<li @click="produc" :class="classA"><a href="../WebPages/Login.html">产品介绍</a></li>
            	<li @click="newscente" :class="classB"> <a href="../WebPages/news.html">新闻中心 </a> </li>
            	<li @click="aboutus" :class="classC"><a href="../WebPages/aboutUs.html">关于我们</a></li>
            	<li><a href="https://www.lagou.com/gongsi/163821.html" target="_blank">加入我们</a></li>
            </ul>
            <div class="login">登录系统</div>
            <a class="btn btn-success dropdown-toggle" href="http://mall.niuluo-tech.cn/shop/index.php?act=seller_login" style="margin-right: 50px;" target="_blank">供应商管理入口</a>
        </nav>
  </section>
			`,
		 methods:{
		 	newscente(){
		      window.location.href="../WebPages/news.html";
		       this.classB="lanli";
		 	},
		 	aboutus(){
		 		window.location.href="../WebPages/aboutUs.html";
		 	},
		 	produc(){
		 		window.location.href="../WebPages/Login.html"
		 	}
		 }
		})
		new Vue({
			el:'#denglu',
						
		})
//脚下的组件
  Vue.component("footy",{
  	 template:`
  	     <footer class="navbar navbar-default  navbar-fixed-bottom" style="background:#0F4567; text-align: center;">
        <div>
            <h5>纽罗口腔管理平台&copy;2017&nbsp;&nbsp;<a href="http://www.miitbeian.gov.cn" target="_blank">沪ICP备16039368号-1</a></h5>
        </div>
    </footer>
  	 `
  })
	new Vue({
		el:'#foot'
	})