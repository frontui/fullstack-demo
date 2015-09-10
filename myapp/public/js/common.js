/**!
 * 页面共同部分
 * by frontpay F2E Team
 * created on 2015-08-25
 */
~(function($) {

    // 判断IE版本
    var isIE = function(ver){
      var b = document.createElement('b')
      b.innerHTML = '<!--[if IE ' + ver + ']><i></i><![endif]-->'
      return b.getElementsByTagName('i').length === 1
    };

    var App = {
        // 页面初始化
        initPage: function(){
            for(var i in App) {
                i != 'initPage' && typeof App[i] === 'function' && App[i]();
            }
        },
        // 提现金额展开隐藏
        amountRemind: function(){
            $("#sh").on('click', function(){
                var isOpen = $(this).data('isOpen'), strText = $(this).text(), strLabel = $(this).data('label');
                if(isIE(7)) { // i7 bug
                  $("#arb")[isOpen ? 'hide': 'show']();
                } else {
                  $("#arb")[isOpen ? 'slideUp': 'slideDown']();
                }
                $(this).html(strLabel).data('label', strText).data('isOpen', !isOpen);
            });
        },
        moreBanks:function(){
            var $ul=$(".j-banks-more"),
                $li=$ul.find("li"),
                $btn=$ul.find(".more-ebank"),
                iLen=$li.length,
                Toggle={
                    isHidden:!0,
                    init:function(){
                        this[this.isHidden?"show":"hide"]()
                    },
                    show:function(){
                        this.isHidden=!1,
                            $li.show(),
                            $btn.html("收起").hide()
                    },
                    hide:function(){
                        this.isHidden=!0,
                            $li.slice(8,iLen-1).hide(),
                            $btn.html("查看更多")
                    }
                };
            Toggle.hide(),
            $btn.on("click",$.proxy(Toggle.init,Toggle))
        },
        // 搜索框
        searchInput: function(){
          var handler = {
            // 延迟隐藏
            timer: null,
            // 自动隐藏，如果input是focus状态则不自动隐藏
            autoHide: true,
            // 按钮是否点击，点击保持不隐藏，等input再次blur隐藏
            clicked: false,
            // 显示 obj-按钮, ip 是否input触发
            show: function(obj, ip){
              if(!obj) return;
              clearTimeout(this.timer);
              // 设置自动隐藏状态
              this.autoHide = ip ? true : false;
              $(obj).removeClass('hidden');
            },
            // 隐藏 obj-按钮, ip 是否input触发
            hide: function(obj, ip) {
              if(!obj) return;
              var that = this;
              clearTimeout(this.timer);
              this.timer = setTimeout(function(){
                $(obj).addClass('hidden');
                // 设置自动隐藏状态
                that.autoHide = true;
              }, 500)
            },
            bindEvent: function(obj) {
              var that = this;
              // 按钮鼠标移入移开
              $(obj).off('mouseenter mouseleave').on('mouseenter mouseleave', function(e) {
                if(e.type == 'mouseenter') {
                  handler.show(obj, 1);
                } else {
                  if(!that.clicked && that.autoHide) { // 未点击，自动隐藏
                    handler.hide(obj, 1);
                  }
                }
              });
              // 按钮点击
              $(obj).off('click').on('click', function(){
                that.clicked = true;
                that.show($(this), 1)
              });
            }
          };
          $('[data-toggle="searchInput"]').on('focus blur', function(e){
            var obj = $(this).next('button');
            // input触发显示隐藏
            handler[e.type == 'focus' ? 'show' : 'hide'](obj, 0);
            // 按钮鼠标滑过、移开、点击事件
            handler.bindEvent(obj)
          });
        },
      // 密码输入框禁止复制黏贴
      pwdLimit: function() {
        $('input[type="password"]').on('copy paste cut', function(e) { e.preventDefault(); return false; })
      }
    };

    $(document).ready(App.initPage);
})(jQuery);
