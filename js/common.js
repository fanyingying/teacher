! function($, c) {
	"use strict";
	//选项卡点击事件 
	c.tabBottom = function() {
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
	};

	/**
	 * 点击查看更多，一个页面只能用一次呀
	 * @param {Object} ele：显示的ul容器
	 * @param {Object} rows：控制的行数
	 */
	c.showMore = function(ele, rows) {
		var showMoreBtn = document.querySelector('.show-more');

		window.showMoreBox = ele;
		window.showMoreBoxHeight = 200;
		if (ele.childElementCount) {
			//有孩子节点
			var child = ele.children[0];
			//计算个数和高度
			var itemHeight = child.offsetHeight;

			var boxWidth = ele.offsetWidth;
			window.maxHeight = rows * itemHeight;
			window.showMoreBoxHeight = ele.offsetHeight;
			if (showMoreBoxHeight > maxHeight) {
				ele.style.height = maxHeight + 'px';
			}

		}
		//点击事件
		showMoreBtn.addEventListener('tap', function(event) {
			if (this.classList.contains('show')) {
				this.classList.remove('show');
				window.showMoreBox.style.height = maxHeight + 'px';
				this.querySelector('.text').innerText = '点击查看更多';
			} else {
				this.classList.add('show');
				window.showMoreBox.style.height = '';
				this.querySelector('.text').innerText = '点击收起';
			}
		}, false);
	};

	c.viewTeacherDetail = function() {
		mui('.teacher-list li').on('tap', 'a', function() {
			var id = this.getAttribute('data-id');
			mui.openWindow({
				id: id,
				url: this.href,
				styles: webview_style,
				show: {
					aniShow: aniShow
				},
				waiting: {
					autoShow: false
				}
			});
		});
	};
	"function" == typeof define && define.amd && define("common", [], function() {
		return c
	})
}(mui, "undefined" == typeof exports ? window.common = {} : exports);