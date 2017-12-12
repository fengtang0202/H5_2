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
 $(".btn_img").click(function(){
   let page=$(this).parent()
   page.css("left",0)
   page.css("-webkit-animation", "slidetoleft .4s forwards ease-out");
     $(".photo").css({"animation":1,"left":0,"opacity":1,"visibility":"visible"})
     $(".photo").attr("touchable",true)
 })
registerSlide(null, null, $(".firstpage"), $(".secondpage"), function(){setTimeout(function(){
  $(".in_0").attr("src","./images/IN_1.png")
  $(".bike").attr("src","./images/bike_light.png")},500)
});
registerSlide(null, $(".firstpage"), $(".secondpage"), $(".thirdpage"),function(){setTimeout(function(){$(".in_1").attr("src","./images/IN_light.png")},500)});
registerSlide(null, $(".secondpage"), $(".thirdpage"), $(".forthpage"),null);
registerSlide(null, $(".thirdpage"), $(".forthpage"), $(".fivepgae"),function(){$(".page_5").css({"transition":"all 1s linear","left":"5%"})});
registerSlide(null,$(".forthpage"),$(".fivepgae"),$(".sixpage"),function(){$(".page_6").css({"transition":"all 1s linear","left":"5%"})});
registerSlide(null,$(".fivepgae"),$(".sixpage"),$(".sevenpage"),function(){setTimeout(function(){$(".bike_img").attr("src","./images/bike_5.jpg")},500)});
registerSlide(null,$(".sixpage"),$(".sevenpage"),$(".eightpage"),null)
registerSlide(null,$(".sevenpage"),$(".eightpage"),null,null)
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
                page1.attr("touchable", "false");
                setTimeout(function(){page2.attr("touchable", "true");}, 200);
                if (page2.attr("alreadyDo") != "true") {
                    page2.attr("alreadyDo", "true");
                    setTimeout(function(){
                        if (page2Do != null) {
                            page2Do();
                        }
                    }, 400);
                }
            }
        } else if (delta_y > 80) {
            if (page0 != null) {
                if (page2 != null)
                    page2.css("visibility", "hidden");
                page0.css("animation", "slidetoorigin .4s forwards ease-out");
                page0.css("-webkit-animation", "slidetoorigin .4s forwards ease-out");
                page1.attr("touchable", "false");
                setTimeout(function(){page0.attr("touchable", "true");}, 300);
                if (page0.attr("alreadyDo") != "true") {
                    page0.attr("alreadyDo", "true");
                    setTimeout(function(){
                        if (page0Do != null) {
                            page0Do();
                        }
                    }, 400);
                }
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


// secondPage left
//获取页面startX和startY的值
var touchstartX, touchstartY,currentParam;
$(".content").on("touchstart", function(e) {
    touchstartX = e.originalEvent.targetTouches[0].pageX;
    touchstartY = e.originalEvent.targetTouches[0].pageY;
    console.log(1)
});
$(".content").on("touchend", function(e) {
    var deltaX = e.originalEvent.changedTouches[0].pageX - touchstartX;
    var deltaY = e.originalEvent.changedTouches[0].pageY - touchstartY;
    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) >  Math.abs(deltaY)) {
        if (deltaX > 0) {
            currentParam>1 && showParam(currentParam-1);
            console.log("left:"+currentParam)
            $(".param:not(.show_1)").css("display","none")
              console.log("向右")
        }else{
            currentParam<3 && showParam(currentParam+1);
            $(".param:not(.show_1)").css("display","none")
            console.log("left:"+currentParam)
            console.log("向左")
        }
    }
});
$(".thirdpage>.color_wrap>.color").click(function() {
    $(".thirdpage>.bike").css("background-image", "url('/zt/2017/H5/aima_ludi/images/thirdpage_bike_"+($(this).index()+1)+".jpg')");
});
function showParam(num) {
currentParam = (num+2)%3+1;
// if (currentParam == 1) {
//     $(".secondpage>.content>.prev").hide();
//     $(".secondpage>.content>.next").show();
// } else if (currentParam == 8) {
//     $(".secondpage>.content>.prev").show();
//     $(".secondpage>.content>.next").hide();
// } else {
//     $(".secondpage>.content>.prev").show();
//     $(".secondpage>.content>.next").show();
// }
var $param = $(".secondpage>.content>.param.param_"+currentParam);
$param.addClass("show");
for(var i=1; i<currentParam; i++) {
    $param = $(".secondpage>.content>.param.param_"+i);
    $param.removeClass("show");
    $param.addClass("onleft");
}
for(var i=currentParam+1; i<=8; i++) {
    $param = $(".secondpage>.content>.param.param_"+i);
    $param.removeClass("show onleft");
  }
}
$(".param:not(.show_1)").css("display","none")
