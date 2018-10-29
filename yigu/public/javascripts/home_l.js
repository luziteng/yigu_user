
$(document).ready(function(){
    $("#ul_list").on("click","li_color",function(){
        $(this).addClass("active");
    })
         $.ajax({
                type: 'get',
                url: 'http://localhost:3000/home/UseHome',
                success:function(data){
                    console.log(data);
                    showList(data);
                }
            });
            $list = $("#goods_list");
            showList = function(data){
                 $list[0].innerHTML = data.map(function(item){
                            console.log(item);
                        return `<li data-id="${item._id}">
                                    <div class="hr-wrap">
                                            <img src="../images/${item.images}">
                                    <div class="wz"><em class="ygzm"></em>${item.goodsName}<em class="cpxl"></em></div>
                                    <div class="list-price"><b>￥${item.price}</b><i>已有<a>334</a>人想购买</i></div>
                                    </div>
                                </li>`;
                    }).join("");
        }
            
});