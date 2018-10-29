
$(document).ready(function(){
    $("#ul_list").on("click","li_color",function(){
        $(this).addClass("active");
    })
//**************创建插件对象*****************//
//?宽、高、标题、内容、遮罩层、位置、是否能拖拽?//
    function Popover(options){
        var defaults = {

            width:400,
            height:"auto",//可以为auto或者具体值
            title:"弹窗标题",
            
            overlay: 0.65,//传入false代表不需要遮罩层
            position:"center",//默认居中
            draggable:true//是否能拖拽
        }
        
        var opt  = Object.assign({},defaults,options);//为避免没有参数传入，默认对象，最后将对象进行合并
        this.position = opt.position;//存储位置
        this.init(opt);//执行init方法
    }
//prototype 属性允许您向对象添加属性和方法, Prototype 是全局属性，适用于所有的Javascript对象
//所有主要浏览器都支持 prototype 属性
//
//创建方法：
//（1）初始化（创建弹窗元素以及子元素，插入body里面）
Popover.prototype ={
    constructor : Popover,
    init : function(opt){
        this.ele = document.createElement("div");//使用ele保存整个弹窗
         //弹窗盒子
        this.ele.classList.add("popover");
        this.ele.style.width = opt.width +'px';
        if(typeof opt.height == "number"){//判断如果不为auto的情况
            this.ele.style.height =opt.height +'px';
        }
       //弹窗标题
        var title = document.createElement("div");
        title.classList.add("title");
        title.innerHTML =opt.title;
        this.ele.appendChild(
            title);
        //弹窗内容
        var content = document.createElement("div");
        content.classList.add("content");
        var inp1 =document.createElement("input");
        inp1.type="text";
        inp1.placeholder="请输入商品名";
        inp1.classList.add("inp1");
        var inp2 =document.createElement("input");
        inp2.classList.add("inp2");
        inp2.type="text";
        inp2.placeholder="请输入商品价格";
        var inp3 =document.createElement("input");
        inp3.classList.add("inp3");
        inp3.type="text";
        inp3.placeholder="请输入图片名";

        var btn_c = document.createElement("input");
        btn_c.type = "button";
        btn_c.value = "确定";
        btn_c.classList.add("btn_c");

        var btn_d = document.createElement("input");
        btn_d.type = "button";
        btn_d.value = "取消";
        btn_d.classList.add("btn_d");

        content.appendChild(inp1);
        content.appendChild(inp2);
        content.appendChild(inp3);
        content.appendChild(btn_c);
        content.appendChild(btn_d);
        this.ele.appendChild(content);
        //弹窗遮罩层
        if(opt.overlay !=false){//如果传值为false则没有以下的类名
            this.overlay = document.createElement("div");//this指向overlay，为了下面拿到参数
            this.overlay.classList.add("overlay");
            this.overlay.style.opacity = opt.overlay;
            document.body.appendChild(this.overlay);
        }
        //弹窗关闭按钮
        var closeBtn =document.createElement("span");
        closeBtn.classList.add("btn-close");
        closeBtn.innerHTML = "&times";
        this.ele.appendChild(closeBtn);

        closeBtn.onclick =()=>{
            this.hide();
        }
        btn_d.onclick =()=>{
            this.hide();
        }
         if(opt.draggable){
            this.drag();
        }
        document.body.appendChild(this.ele);
        this.show();
    },
//（2）显示、隐藏 、设置位置、拖拽等动能
    show : function(){
        this.ele.style.display = "block";
        if(this.overlay !=false){
            this.overlay.style.display ="block";
        }

        this.setPos();

    },
    hide : function(){
        this.ele.style.display = "none";
        if(this.overlay){
            this.overlay.style.display = "none";
        }
    },
    setPos : function(x,y){
        if(x == undefined){
            if(this.position == "center"){
                x = (window.innerWidth - this.ele.offsetWidth)/2;
                y = (window.innerHeight - this.ele.offsetHeight)/2;
            }else{
                x = this.position.x;
                y = this.position.y;
            }
        }
        this.ele.style.left = x + 'px';
        this.ele.style.top = y + 'px';
    },
    drag(){
        var self = this;//由于点击事件中this指向事件源对象，所以定义self赋值this。
        var pop =self.ele;//相当于var pop  =this.ele
        this.ele.onmousedown = e=>{
            var ox = e.clientX - pop.offsetLeft;
            var oy = e.clientY - pop.offsetTop;
            // 只能在标题位置拖拽
            if(oy>pop.children[0].offsetHeight){
                return;
            }//判断当光标点击的位置大于标题时，不允许拖拽，直接return；
            document.onmousemove = function(evt){
                var x = evt.clientX - ox;
                var y = evt.clientY - oy;
                self.setPos(x,y);

                evt.preventDefault();
                pop.style.zIndex =10;//设置层级覆盖其他内容
            }
        }

        document.onmouseup = function(){
            document.onmousemove = null;
        }
    }
}


//**************查询商品信息*************************//
    function find(){
        return new Promise(function(resolve,reject){
           $.ajax({
                    url: 'http://localhost:3000/FindDelete/find',
                    type: 'post',
                    data:{goodsName:$("#Gname").val()},
                    success:function(data){
                        if(data.length>0){
                            $(".tishi").html("");
                            show_goods(data);
                        }else{
                            $(".goods").remove();
                            $(".tishi").html("兄弟认真点，不然我查不到啊！！！");
                        }   
                    }
                })
        })
    }
       

     $("#btn").click(function(){
               find();
            })

     function show_goods(data){

       
            // $(".goods").remove();
            $(".goods")[0].innerHTML = data.map(function(item){
            return `<li data-id="${item._id}">
                 <div class="cart-nr">
                        <img src="../images/${item.images}" height="80" width="80" alt="" />

                    </div>
                    <div class="cart-nr-wz">
                        ${item.goodsName}
                    </div>
                    <div class="li-price">
                        ￥${item.price}
                    </div>
                    <input type="button" class="dele" value="删除" />
                    <input type="button" class="alters" value="修改" />
            </li>`;
        }).join("");
        del();
        alters();
      }


//**************删除商品信息***********************//
      function del(){
        $(".dele").click(function(){
            var alt = confirm("确定要删除该商品吗？");
            if(alt){
                $.ajax({
                    url: 'http://localhost:3000/FindDelete/deletes',
                    type: 'post',
                    data:{goodsName:$("#Gname").val()},
                    success:function(data){
                         console.log(data);
                        if(data.ok==1){
                            find().then(show_goods);
                             console.log(11);
                        }
                    }
                })
            }
        })
    }
//**************修改商品信息***********************//
    alters = function(){
        $(".alters").click(function(){
            new Popover({title:"修改商品信息",height:200,width:800,overlay:0.8});
            var id = $(this).parent().attr("data-id");
                console.log(id);
            $('.btn_c').click(function(){
                console.log(id);
                $.ajax({
                    url:'http://localhost:3000/FindDelete/alter',
                    type: 'post',
                    data:{

                        id:id,
                        goodsName:$('.inp1').val(),
                        price:$('.inp2').val(),
                        images:$('.inp3').val()
                    },
                    success:function(data){
                        if(data.ok==1){
                            let atlr = confirm("商品修改成功");
                            if(atlr){
                                find().then(show_goods);
                                
                            }
                        }
                    }
                })
            })
            
        })
    }
});