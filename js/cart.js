//初始状态
$(".cart_td_7").each(function(){
    $(this).html($(this).prev().prev().html());
})
//点击加号
var Cindex;
$(".hand:odd").on("click",function(){
    num = parseInt($(this).prev().val())+1;//对应的数量加1
    $(this).prev().val(num);//得到的数字添加到页面上
    var price = num*($(this).parents(".cart_td_6").prev().html())+".00";
    $(this).parents(".cart_td_6").next().html(price);  
    //加号对应的checked选中
    $(this).parents('tr').children().eq(0).children().prop("checked",true);
 ;
Cindex=0;
for(var m = 0 ;m<$(".cart_td_1").length;m++){
    if ($(".cart_td_1 input")[m].checked){
        Cindex++; 
        if(Cindex==$(".cart_td_1").length){
            $("#allCheckBox").prop("checked",true);
            }
        }
    }
    totalMoney()
})

//点击减号
$(".hand:even").on("click",function(){
    num = parseInt($(this).next().val())-1; //对应的数量减1 
        
    var price = num*($(this).parent().prev().html())+".00";
    $(this).parent().next().html(price);
 
    $(this).parents('tr').children().eq(0).children().prop("checked",true);
    //当商品的个数减到0时，不能在进行减少
    if (num==0) {
            var jQ = $(this).parents("tr").find(".cart_td_5").html();
            $(this).parent().next().html(jQ);
            alert("亲,不能少于一件商品哦~");
            num=1;        
        }
    $(this).next().val(num); 
  totalMoney(); 
}) 
//点击删除
$(".cart_td_8>a").on("click",function(){
    $(this).parents("tr").prev().remove();
    $(this).parents("tr").remove();
    totalMoney(); //删除后计算总计 
})
//点击全选
$(".allCheckBox").on("click",function(){
    //点击全选，全部选中或者全部不选
    if (this.checked) {
        $(":checkbox").prop("checked",true);
    }else{
        $(":checkbox").prop("checked",false);
    }  
    totalMoney(); //点击全选后计算
})
//点击店铺全选
$(".shopAllCheckBox").on("click",function(){
    if (this.checked) {
        $(this).parents("tr").next().find("input").prop("checked",true);
          index=0;//进行循环，当全部的checked被选中的时候全选的被选中
          for(var m = 0 ;m<$(".cart_td_1").length;m++){
            if ($(".cart_td_1 input")[m].checked){
                index++; 
                if(index==$(".cart_td_1").length){
                    $(".allCheckBox").prop("checked",true);
                }
            }
          }

    }else{
        $(this).parents("tr").next().find("input").prop("checked",false);
    }
     
    totalMoney();//计算总价
 
   
})

//点击单选
var index;
var unit;
var number;
$(".cart_td_1 input").on("click",function(){
    //当这个被选中的时候进行如下判断
    if (this.checked) {
        index=0;
        for(var m = 0 ;m<$(".cart_td_1").length;m++){
            if ($(".cart_td_1 input")[m].checked){
                index++; 
                if(index==$(".cart_td_1").length){
                    $(".allCheckBox").prop("checked",true);
                    }
                }
            }
        }else{
        $(".allCheckBox").prop("checked",false);  
    }
    totalMoney();//计算总价和数量
}) 

//删除所选
$("#deleteAll").click(function(){
    $(".cart_td_1 input").each(function(){
        if (this.checked) {
            $(this).parents("tr").prev().remove();       
            $(this).parents("tr").remove();
            $(".allCheckBox").prop("checked",false)                
        }
    })
   totalMoney();
})        

//总计的计算
var mm = 0;
var sum=0;
var pm = 0;
var pms=0;

function totalMoney(){
mm=0;//单价
sum=0;//计算价格和
pm = 0;
pms=0;
$(".cart_td_1>input").each(function(){    
    if (this.checked){
        mm=parseInt($(this).parents("tr").find(".cart_td_7").html());
        sum=sum+mm;//总价
        pm = parseInt($(this).parents("td").siblings('.cart_td_6').length)
        pms = pms+pm; // 总数
    }
})
$(".total").html(sum);
$(".product_total_num_in").html(pms);
}
