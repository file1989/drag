

/*窗口拖拽*/
$.fn.drag = function () {
    
    $.each(this, function () {
        var dialog = this;
        var dragger = $(this).find(".drag-title")[0];
        if (!dragger) { dragger = dialog; }
        dragger.onmousedown = function (event) {
            //设置鼠标捕获范围
            if (this.setCapture) {
                this.setCapture();
            } else if (window.captureEvents) {
                window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
            }

            var event = event || window.event;
            var posX = posY = 0;
            var disX = event.clientX - dialog.offsetLeft;
            var disY = event.clientY - dialog.offsetTop;
            //鼠标移动，窗口随之移动        
            dialog.onmousemove = function (event) {
                var event = event || window.event;
                var maxW = document.documentElement.clientWidth - dialog.offsetWidth;
                var maxH = document.documentElement.clientHeight - dialog.offsetHeight;
                posX = event.clientX - disX;
                posY = event.clientY - disY;
                if (posX < 0) {
                    posX = 0;
                } else if (posX > maxW) {
                    posX = maxW;
                }
                if (posY < 0) {
                    posY = 0;
                } else if (posY > maxH) {
                    posY = maxH;
                }
                dialog.style.left = posX + 'px';
                dialog.style.top = posY + 'px';
            }
            //鼠标松开，窗口将不再移动
            dialog.onmouseup = function () {
                //取消鼠标捕获范围设置
                if (dialog.releaseCapture) {
                    dialog.releaseCapture();
                } else if (window.captureEvents) {
                    window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
                }
                dialog.onmousemove = null;
                dialog.onmouseup = null;
            }
        }

    });
}

$(function(){
	$(".drag-dialog").drag();
});


