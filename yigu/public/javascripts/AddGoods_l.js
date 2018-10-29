jQuery(function($){
    $("#ul_list").on("click","li_color",function(){
        $(this).addClass("active");
    })
                
    $("#ok").click(function(){
       // imgSrc = $(".pho").attr("src");
        var  imgSrc = new FormData();
        imgSrc.append('photo',$("#fileNode")[0].files[0]);
            console.log(imgSrc);
        $.ajax({
                url:"http://localhost:3000/files/uploads",
                type:'post',//文件传输限定 form 的 method 必须为 POST 
                data:imgSrc,
                contentType: false,//它是代表发送信息至服务器时内容编码类型,通俗点说就是告诉服务器从浏览器提交过来的数据格式。我们在 ajax 中 contentType 设置为 false 是为了避免 JQuery 对其操作，从而失去分界符，而使服务器不能正常解析文件。
                processData: false,
                success:function(data){
                    console.log(data.data);
                    $.ajax({
                            type:"post",
                            url:"http://localhost:3000/files/Addgoods",
                            data:{
                                goodsName:$(".goods_name").val(),
                                price:$(".goods_price").val(),
                                images:data.data
                            },
                            success:function(){
                                alert("添加商品成功");
                            }
                        })
                    }
                })
    })
})
//如果在html内给元素绑定事件(内联事件).如果在js中直接定义action函数,是可以的;但是套在$(function(){})中问题出现了ReferenceError: action is not defined.
//
//作用域的问题调用 selectFile() 函数的时候是在全局作用域找这个函数的，无法访问闭包里面的函数
//selectFile()都包在一个匿名函数里了还指望全局作用域能找到它？把你js部分头尾两行砍掉吧
function selectFile(obj){
        var formdata = new FormData();//FormData ==>表单数据,能自动把表单数据拼接打包,当ajax发送数据时,发送打包的数据;还可以使用FormData对象的append(key,value)添加数据;FormData还可以自动帮忙打包文传送件数据,后台通过$_FILES数组接收;说明FormData对象既可以打包发送表单的数据,也可以手动append数据
        formdata.append('photo',obj.files[0]);
        console.log(formdata);
        var src = obj.files[0].name;
        // console.log(src);
        formart = src.split(".")[1];//利用切割，拿到上传文件格式
          var file =obj.files[0];
          console.log(file)
    //*****************图片预览********************//
    function readPhoto(){
        var reader = new FileReader();//FileReader对象允许web应用程序异步读取存储在用户计算机上的文件(或原始数据缓冲区)的内容，使用文件或Blob对象来指定要读取的文件或数据。
        console.log(reader);
       // reader.readAsDataURL(file);//readyAsDataURL()读取为base64图片编码
        // reader.onload(function(){
        //     $(".pho").attr("src",this.result);
        //     console.log(this.result);
        // });
         reader.onload = (e) => {
          $(".pho").attr("src",e.target.result);
            // console.log(e.target.result);
        }
            if (file){//如果打开文件执行
                reader.readAsDataURL(file);//readyAsDataURL()读取为base64图片编码
                } else {
                 $(".pho").attr("src","");
                }
    }
         
        
    var size = Math.round(file.size / 1024 / 1024);
        if(formart =="jpg"||formart == "pgn"||formart =="gif"){
                if(size>3){
                    alert('图片大小不得超过3M');
                    return;
                }else{
                   readPhoto();
                }
            }else{
                alert('图片格式不正确');
                return;
        }
       
}