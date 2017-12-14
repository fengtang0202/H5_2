$(document).on("touchmove",function(e){
    e.preventDefault();
}, false);
// 点击圆点显示dialog
// click =>touchstart
$(".point").on("click",function(){
  var index=$(this).attr("class").slice(-1)
  $(".dialog_under").show()
  $(`.tag${index}`).addClass("show")
})
$(".dialog_under").on("click",function(){
    $(".dialog").removeClass("show");
    $(this).hide();
});
$(".line_wrap").on("click",function(){
   $(".firstpage").css("top",0)
   $(".firstpage").css("-webkit-animation", "slidetotop 1s forwards ease-out")
   $(".secondpage").attr("touchable","true")
   setTimeout(function(){
     $(".in_0").attr("src","./images/IN_1.png")
     $(".bike").attr("src","./images/bike_1.png")},300)
     //调用定时器的代码
     // let index=0
     // timer(index)
})
 function timer(index){
  return setInterval(function(){
  index=(index+1)%2
    $(".param").eq(index).fadeIn().siblings(".param").fadeOut()
    $(".bike_btn").children().eq(index).addClass("active").siblings().removeClass("active")
   },3000)
 }
    let  timer1;
    let [n,m]=[0,0];
    registerSlide(null,null,$(".secondpage"),$(".thirdpage"),function(){
        $(".in_1").attr("src","./images/INblue_1.png")
        $(".in_0").attr("src","./images/IN_0.png")
        $(".bike").attr("src","./images/bike_0.png")
      });
    registerSlide(function(){
      $(".in_1").attr("src","./images/INblue_0.png")
      $(".in_0").attr("src","./images/IN_1.png")
      $(".bike").attr("src","./images/bike_1.png")
    }, $(".secondpage"), $(".thirdpage") , $(".forthpage"),function(){
      $(".in_1").attr("src","./images/INblue_0.png")
    });
    registerSlide(function(){$(".in_1").attr("src","./images/INblue_1.png")}, $(".thirdpage"), $(".forthpage"), $(".fivepgae"),function(){
      $(".page_5").css({"transition":"all .5s linear","left":"5%"})});
    registerSlide(function(){
       $(".detail_1").css({"transition":"all .5s linear","left":"100%"})
       $(".detail_2").css({"transition":"all .5s linear","left":"-100%"})
       $(".detail_3").css({"transition":"all .5s linear","left":"100%"})
    }
      , $(".forthpage"),$(".fivepgae"), $(".sixpage"),function(){
        $(".page_6").css({"transition":"all .5s linear","left":"5%"})
           $(".detail_1").css({"transition":"all .5s linear","left":"100%"})
           $(".detail_2").css({"transition":"all .5s linear","left":"-100%"})
           $(".detail_3").css({"transition":"all .5s linear","left":"100%"})
      });
    registerSlide(function(){
      $(".detail_4").css({"transition":"all .5s linear","left":"100%"})
      $(".detail_5").css({"transition":"all .5s linear","left":"-100%"})
      $(".detail_6").css({"transition":"all .5s linear","left":"100%"})
      $(".page_5").css({"transition":"all .5s linear","left":"5%"})
    }, $(".fivepgae"), $(".sixpage") , $(".sevenpage"),function(){
      setTimeout(function(){$(".bike_img").attr("src","./images/bike_5.jpg")
      $(".detail_4").css({"transition":"all .5s linear","left":"100%"})
      $(".detail_5").css({"transition":"all .5s linear","left":"-100%"})
      $(".detail_6").css({"transition":"all .5s linear","left":"100%"})
    },300)});
    registerSlide(function(){
      $(".page_6").css({"transition":"all .5s linear","left":"5%"})
      $(".bike_img").attr("src","./images/bike_4.jpg")
  }, $(".sixpage") , $(".sevenpage"), $(".eightpage") ,function(){$(".bike_img").attr("src","./images/bike_4.jpg")})
    registerSlide(function(){$(".bike_img").attr("src","./images/bike_5.jpg")}, $(".sevenpage"), $(".eightpage"),$(".secondpage"),function(){
      $(".in_0").attr("src","./images/IN_1.png")
      $(".bike").attr("src","./images/bike_0.png")
    })
    function registerSlide(page0Do, page0, page1, page2, page2Do) {
        //上滑事件
        var start_y;
        page1.on("touchstart",function(e) {
            if (page1.attr("touchable") == "false") {
                start_y = Infinity;
                return;
            }
            start_y = e.originalEvent.targetTouches[0].pageY;
            var page1_index = parseInt(page1.css("z-index"));
            if (page1_index <= 0) {
                page1_index = 999;
                page1.css("z-index", page1_index);
            }
            if (page0 != null) {
                page0.attr("touchable", "false");
                page0.css("animation", "1");
                page0.css("-webkit-animation", "1");
                page0.css("top", "-100%");
                page0.css("opacity", "0");
                page0.css("z-index", page1_index+1);
                page0.css("visibility", "visible");
                page0.show();
            }
            if (page2 != null) {
                page2.attr("touchable", "false");
                page2.css("animation", "1");
                page2.css("-webkit-animation", "1");
                page2.css("top", "0");
                page2.css("opacity", "1");
                page2.css("z-index", page1_index-1);
                page2.css("visibility", "visible");
                page2.show();
            }
        });
        var page_height = parseInt(page1.css("height"));
        page1.on("touchmove",function(e) {
            if (page1.attr("touchable") == "false" || start_y == Infinity)

                return;
            var delta_y = e.originalEvent.targetTouches[0].pageY - start_y;
            // console.log(e.originalEvent.targetTouches[0])
            if (delta_y <=0) {
                if (page2 != null) {
                    page1.css("animation", "1");
                    page1.css("-webkit-animation", "1");
                    page1.css("top", "-"+(-delta_y)+"px");
                    page1.css("opacity", 1 + (delta_y/page_height));
                }
            } else {
                if (page0 != null) {
                    page0.css("animation", "1");
                    page0.css("-webkit-animation", "1");
                    page0.css("top", -(1-delta_y/page_height)*100+"%");
                    page0.css("opacity", delta_y/page_height);
                }
            }
        });
        page1.on("touchend",function(e) {
            if (page1.attr("touchable") == "false" || start_y == Infinity)
                return;
            var delta_y = e.originalEvent.changedTouches[0].pageY - start_y;
            if (delta_y < -80) {
                if (page2 != null) {
                    if (page0 != null)
                    page0.css("visibility", "hidden");
                    page1.css("animation", "slidetotop .4s forwards ease-out");
                    page1.css("-webkit-animation", "slidetotop .4s forwards ease-out");
                    setTimeout(function(){page2.attr("touchable", "true");}, 200);
                    // if (page2.attr("alreadyDo") != "true") {
                        page2.attr("alreadyDo", "true");
                        setTimeout(function(){
                            if (page2Do != null) {
                                page2Do();
                            }
                        }, 400);
                    // }
                }
            } else if (delta_y > 80) {
                if (page0 != null) {
                    if (page2 != null)
                    page2.css("visibility", "hidden");
                    page0.css("animation", "slidetoorigin .4s forwards ease-out");
                    page0.css("-webkit-animation", "slidetoorigin .4s forwards ease-out");
                    page1.attr("touchable", "false");
                    setTimeout(function(){page0.attr("touchable", "true");}, 300);
                    // if (page0.attr("alreadyDo") != "true") {
                        page0.attr("alreadyDo", "true");
                        setTimeout(function(){
                            if (page0Do != null) {
                                page0Do();
                            }
                        }, 400);
                    // }
                }
            } else {
                if (page2 != null) {
                    page1.css("animation", "slidetoorigin .1s forwards ease-out");
                    page1.css("-webkit-animation", "slidetoorigin .1s forwards ease-out");
                }
                if (page0 != null) {
                    page0.css("animation", "slidetotop .1s forwards ease-out");
                    page0.css("-webkit-animation", "slidetotop .1s forwards ease-out");
                }
            }
        });
    }
       var touchstartX, touchstartY;
    $(".content").on("touchstart", function(e) {
        touchstartX = e.originalEvent.targetTouches[0].pageX;
      });
    function move(element){
      element.fadeOut()
      element.siblings().fadeIn()
      $(".dialog_under").css("display","none")
      $(".bike_btn").find(".active").removeClass("active").siblings().addClass("active")
      }
      $(".param").on("touchend", function(e) {
        var deltaX = e.originalEvent.changedTouches[0].pageX - touchstartX;
          deltaX!=0 && move($(this))
        })
