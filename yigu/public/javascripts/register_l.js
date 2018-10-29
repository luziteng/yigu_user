jQuery(function($){
//****************聚焦文本框改变字体颜色****************//    
    $('input').focus(function() {
       $(this).next().css("display","none");
       $(this).css("color","black");
    });

//*****************注册账号验证**********************//
     $("#mobile").blur(function(){
            
            $.ajax({
                type:'post',
                url:"http://localhost:3000/register/FindRegister",
                data:{username:$("#mobile").val()},//发送名字数据与数据库对比
                success:function(data){
                    if(data.length>0){
                        confirm("用户已注册");
                        $("#mobile").val("");
                    }else{
                        console.log(6666);
                    }
                    // console.log(data);
                }
            })
     })
//*****************随机生成小写字母字符串***************//
        function smallLetter(num){
            var randomMa = [];
            for(var i=0;i<num;i++){

                randomMa.push(String.fromCharCode(parseInt(Math.random()*(122-97+1)+97))); 
            }
            return randomMa.join("");
        }
//******************验证码验证***************************//
        $("#v_code_sms").click(function(){
            $("#v_code_sms").empty();
            $("#v_code_sms").html(smallLetter(4));
            var ma = $("#v_code_sms").html();
            // console.log(ma);
        });

        $('#validcode').blur(function(){
            var val = $('#validcode').val();
            // console.log(val);
            var ma = $("#v_code_sms").html();
            
            if(val !=ma){
                var art=confirm("验证码不正确，请重新输入");
                if(art){
                            $('#validcode').val("");
                            $("#v_code_sms").empty();
                            $("#v_code_sms").html("发送验证码");
                                }
            }
        });
//*********************密码验证*************************//
    
        $("#t_pwd").blur(function(){
            var mi =$("#txtpwd").val();
            var mii =  $("#t_pwd").val();
            // console.log(mi);
            // console.log(mii);
            if(mii!== mi){
                var ar =confirm("两次输入密码不一致");
                if(ar){
                    $("#txtpwd").val("");
                    $("#t_pwd").val("");
                }
            }
        });
//*********************完成注册，写入数据库***************//
    $('.amdin-login-nr-login').click(function(){
        var yzm =$('#validcode').val();//先验证验证码是否输入，再发送ajax请求 
        if(yzm !=""){
            $.ajax({
                type:"post",
                url:"http://localhost:3000/register/AddRegister",
                dataType:"text",
                data:{username: $('#mobile').val(),password:$("#t_pwd").val()},//字符串类型加引号
                success:function(data){
                    console.log(data);
                    if(data.length>0){
                        let arl =confirm("注册成功，点击登录");
                        if(arl){
                            location.href="http://localhost:3000/page/login.html";
                        }
                    }                
                }
            })
            }else{
               confirm("请输入验证码验证"); 
            }
            
    })
})