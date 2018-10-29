
$(document).ready(function(){
    $(".logIn").click(function(){
        $.ajax({
                type:"post",
                url:"http://localhost:3000/login/UseLogin",
                data:{
                    username:$(".inpt1").val(),
                    password:$(".inpt2").val()

                },//总是忘记逗号
                success:function(data){
                    if($(".inpt1").val()===data[0].username&& $(".inpt2").val()===data[0].password){
                            if($(".inpt3").val()=="654321"){
                               $(".sub-main-w3").css("display","none"); 
                               $("#User").css("display","block");
                                findName();
                            }
                    }else{
                        confirm("账号或密码不正确");
                        return;
                    }
            }
        })
    })

    function findName(){
        return new Promise(function(resolve,reject){
            $.ajax({
                type:'get',
                url:"http://localhost:3000/layoff/findName",
                success : function(data){
                    console.log(data);
                    show_name(data);
                }
            })
        })
    }

    show_name =function(data){
        $("#User")[0].innerHTML = data.map(function(item){
            return `<li data-id="${item._id}">
                 <div class="cart">
                    </div>
                    <div class="cart_nr">
                        ${item.username}
                    </div>
                    
                    <input type="button" class="dele" value="删除" />
                    
            </li>`;
        }).join("");
        del();
    }
//**************删除员工信息***********************//
      function del(){
        $(".dele").click(function(){
            var name = $(this).prev('.cart_nr').text().trim();
            console.log(name);
            var alt = confirm("确定要开除该员工吗？");
            if(alt){
                $.ajax({
                    url: 'http://localhost:3000/layoff/delete',
                    type: 'post',
                    data:{username:name},
                    success:function(data){
                         console.log(data);
                        if(data.ok==1){
                            findName().then(show_name);
                            
                        }
                    }
                })
            }
        })
    }

});