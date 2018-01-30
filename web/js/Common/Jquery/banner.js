$('nav .login').on("click",function(){
	/*window.location.href="../WebPages/Index.html"*/
	window.open("../WebPages/Index.html","_blank");
})

//以下是二维码
function move(obj,attr,target){
			clearInterval(obj.timer);
			obj.timer=setInterval(function(){
				var speed=(target-parseInt(getStyle(obj,attr)))/8;
				var speedInt=speed>0?Math.ceil(speed):Math.floor(speed);
				if(parseInt(obj.style[attr])==target){
					clearInterval(obj.timer);
				}else{
					obj.style[attr]=parseInt(getStyle(obj,attr))+speedInt+"px";
				}
			},50)
		}
		function getStyle(obj,attr){
			if(obj.currentStyle){
				return obj.currentStyle[attr];
			}else{
				return getComputedStyle(obj)[attr];
			}
			
		}
		 $(".aa").siblings().hide();
        $('.erweima').on("mouseover",function(){
        	 $(".aa").siblings().show();
        	 move($(".erweima")[0],"right",0)
        })
		$('.erweima').on("mouseout",function(){
        	 $(".aa").siblings().hide();
        	 move($(".erweima")[0],"right",-120)
       })
	