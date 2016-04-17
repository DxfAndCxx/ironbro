/**
 *
 * @authors 陈小雪 (shell_chen@yeah.net)
 * @date    2016-04-16 12:41:33
 */

$("html").css("height", "100%");

var CLASS  = {"首页":'door',
    "夹芯板":"sandwich",
    "管材":'tube',
    "型材":"proximate",
    "方管":"square",
    "配件":"parts",};

var PICTURES = {'door':3,
    'parts':14,
    'proximate':4,
    'sandwich':7,
    'square':7,
    'tube':6,
};

var BACKGROUND = ["muzhi.jpg", "muzhitiaowen.jpg", "hengtiaowen.jpg", "gewen.jpg"];

var ImgHref = 'http://cdn.fengidri.me/ironbro/';
var ImgBackgound = 'image/background/';
var Params = getUrlParams();
var thisClass = Params.p?Params.p:"door";
var oNavbars = $("#Navbars");
var oItems = $("#ImageItems");
var thisPicture = PICTURES[thisClass];
var ImageWH = "1300x600";
var thisPathName = window.location.pathname;

if(thisClass === "door"){
    $("#Intro").css("display", "block");
    $("#items-row").css("display", "none");
}

var Init = function(){
    $.each(CLASS, function(key, value){
        var active = value === thisClass? "active":"";
        var href = "index.html?p="+value;
        var nav_inner = '<li class="'+active+'"><a href="'+href+'">'+key+'</a></li>';
        $(nav_inner).appendTo(oNavbars);
    });

    if(thisClass==="door"){
        oItems.hide();
        return;
    }

    for(var i=0;i<thisPicture;i++){
        var background = ImgBackgound + BACKGROUND[i%BACKGROUND.length];
        var active = i===0?"active":"";
        var img_href = ImgHref+thisClass+'/'+(i+1)+ '.jpg'+'!/fwfh/' + ImageWH;

        var items_inner = '<div class="col-sm-6 col-md-4 col-lg-3 ">';
        items_inner += '<div class="thumbnail">';
        items_inner += '<img class="item-img"src="'+img_href+'" data-slide-to="'+i+'">';
        items_inner += '</div>';
        items_inner += '</div>';
        $(items_inner).appendTo(oItems);
    }
}

var InitCarousel = function(){
    var oCarousel = $("#Image-Carousel");
    for(var i=0;i<thisPicture;i++){
        var active = i===0?"active":"";
        var img_href = ImgHref+thisClass+'/'+(i+1)+ '.jpg'+'!/fwfh/' + ImageWH;

        var inner = '<li data-target="#Image-Carousel" data-slide-to="'+i+'" class="'+active+'"></li>';

        $(inner).appendTo($(".carousel-indicators"), oCarousel);

        var inner = '<div class="item '+active+'">';
        inner += '<img src="'+img_href+'" alt="'+i+'">';
        inner +='</div>';

        $(inner).appendTo($(".carousel-inner"), oCarousel);
    }
}

function getUrlParams() {
    var result = {};
    var params = (window.location.search.split('?')[1] || '').split('&');
    for(var param in params) {
        if (params.hasOwnProperty(param)) {
            paramParts = params[param].split('=');
            result[paramParts[0]] = decodeURIComponent(paramParts[1] || "");
        }
    }
    return result;
}

(function browserRedirect(){
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == 'ipad';
    var bIsIphone = sUserAgent.match(/iphone os/i) == 'iphone os';
    var bIsMidp = sUserAgent.match(/midp/i) == 'midp';
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == 'rv:1.2.3.4';
    var bIsUc = sUserAgent.match(/ucweb/i) == 'web';
    var bIsCE = sUserAgent.match(/windows ce/i) == 'windows ce';
    var bIsWM = sUserAgent.match(/windows mobile/i) == 'windows mobile';

    if(bIsIpad || bIsIphone || bIsMidp || bIsUc7 || bIsUc || bIsCE || bIsWM){
        var H = document.body.clientHeight;
        var W = document.body.clientWidth;
        ImageWH = H +"x" + W;
    }

    if(bIsIphone || bIsMidp || bIsUc7 || bIsUc || bIsCE || bIsWM) return;

    $("#ImageItems").on("click", ".item-img", function (e){
        var slide = $(this).attr("data-slide-to");
        $("#Image-Carousel").carousel(Number(slide));
        $("#Modal-Image-carousel").modal("show");
    });

    InitCarousel();

})();








