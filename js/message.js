/**
 * 消息模块
 **/
(function($, owner) {
	/**
	 * 根据条件获取消息列表
	 * @param {Object} 参数
	 * @param {Object} 回调
	 */
	owner.getList = function(params, callback) {
		callback = callback || $.noop;
		params = params || {};
		mui.ajax('', {
			data: params,
			dataType: 'json', //服务器返回json格式数据
			type: 'post', //HTTP请求类型
			timeout: 10000, //超时时间设置为10秒；
			success: function(data) {
				 				 
			},
			error: function(xhr, type, errorThrown) {
				//异常处理；
				console.log(type);
				return callback('错误提示');
			}
		});
	};

	/**
	 * 下拉刷新具体业务实现
	 */
	owner.pulldownRefresh = function(params) {
		owner.getList(params, function(err) {
			mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
			if (err) {
				mui.toast(err);
				return;
			}
			
		});
		
		//测试效果
		setTimeout(function() {
			var table = document.body.querySelector('.mui-table-view');
			var cells = document.body.querySelectorAll('.mui-table-view-cell');
			for (var i = cells.length, len = i + 3; i < len; i++) {
				var li = document.createElement('li');
				li.className = 'mui-table-view-cell';
				li.innerHTML = '<a class="mui-navigate-right">Item ' + (i + 1) + '</a>';
				//下拉刷新，新纪录插到最前面；
				table.insertBefore(li, table.firstChild);
			}
			mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
		}, 1500);
	};
    count = 0;
	/**
	 * 上拉加载具体业务实现
	 */
	owner.pullupRefresh = function() {
	   
		setTimeout(function() {
			mui('#refreshContainer').pullRefresh().endPullupToRefresh((++count > 2)); //参数为true代表没有更多数据了。
			var table = document.body.querySelector('.mui-table-view');
			var cells = document.body.querySelectorAll('.mui-table-view-cell');
			for (var i = cells.length, len = i + 1; i < len; i++) {
				var li = document.createElement('li');
				li.className = 'mui-table-view-cell';
				li.innerHTML = '<a class="mui-navigate-right">Item ' + (i + 1) + '</a>';
				table.appendChild(li);
			}
		}, 1500);
	};
})(mui, window.message = {});