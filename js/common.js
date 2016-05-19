! function($, t) {
	"use strict";
	//选项卡点击事件 
	t.tabBottom = function() {
			//当前激活选项
			window.activeEle = document.querySelector('.mui-bar-tab a.mui-active');
			window.activeTab = activeEle.getAttribute('href');
			//选项卡点击事件
			mui('.mui-bar-tab').on('tap', 'a', function(e) {
				e.stopPropagation();

				
				var targetTab = this.getAttribute('href');
				var targetId = this.getAttribute('id');
				if (targetTab == activeTab) {
				 
					return;
				}
				
				 
				//跳转页面
				$.openWindow({
					url: targetTab,
					id: targetTab,
					preload: true,
					createNew: false,
					show: {
						aniShow: 'pop-in'
					},
					styles: {
						popGesture: 'hide'
					},
					waiting: {
						autoShow: true,
						title: '正在加载...',
					}
				});
				//更改当前活跃的选项卡
				activeTab = targetTab;
			 
			});
		},
		"function" == typeof define && define.amd && define("common", [], function() {
			return t
		})
}(mui, "undefined" == typeof exports ? window.common = {} : exports);