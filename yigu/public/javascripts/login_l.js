jQuery(function($){
    $('input').focus(function() {
            $(this).css("color","black");
        });
//***************用户是否注册验证*********************//
    $("#name").blur(function(){
            $.ajax({
                type:'post',
                url:"http://localhost:3000/login/FindLogin",
                data:{username:$("#name").val()},//发送名字数据与数据库对比
                success:function(data){
                    if(data.length<1){
                         confirm("用户未注册");
                        $("#name").val("");
                    }
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

        $(".amdin-login-nr-k-x-r").click(function(){
            $(".amdin-login-nr-k-x-r").empty();
            $(".amdin-login-nr-k-x-r").html(smallLetter(4));
            var ma = $(".amdin-login-nr-k-x-r").html();
            // console.log(ma);
        });
            $('#r_code').blur(function(){
              var val = $('#r_code').val();
              // console.log(val);
              var ma = $(".amdin-login-nr-k-x-r").html();
              
              if(val !=ma){
                  var art=confirm("验证码不正确，请重新输入");
                  if(art){
                              $('#r_code').val("");
                              $(".amdin-login-nr-k-x-r").empty();
                              $(".amdin-login-nr-k-x-r").html("发送验证码");
                                  }
              }
          });
//*****************点击登录验证*************************//         
         $('.amdin-login-nr-login').click(function(){
            if($('#r_code').val()!=""){
                    $.ajax({
                        type:"post",
                        url :"http://localhost:3000/login/UseLogin",
                        data:{
                            username:$("#name").val(),
                            password:$("#pwd").val()
                        },
                        success:function(data){
                          console.log(data);//0: {_id: "5bcfd0b028dd8c29f4bdd592", username: "xiaohong", password: "123"},  0为data的索引，data[0]才为当前对象
                          console.log(data[0].username);
                          console.log(data[0].password);
                            if($("#name").val()===data[0].username&& $("#pwd").val()===data[0].password){
                                location.href="http://localhost:3000/page/home.html";
                            }else{
                              confirm("账号或密码不正确");
                            }
                        }
                    })
                }else{
                    confirm("请输入验证码验证");
                }
            })
})

            