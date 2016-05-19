/*
 * 相关服务端调用的接口地址，统一管理配置便于因临时修改导致全部功能点的替换
 * http: //
 */
var config = {
	"app": "教师助手",
	"version": "1.0",
	"domain": "",
	"debug": true,
	"URL": {
		'userLogin': '/test',
		'userReg': '',
		'checkUser': '',
		'sendCode': '',
		'findPassword': '',
		'getMessageList': '',

	}
};
config.getUrl = function(name) {
	if (!config.URL[name]) {
		return "";
	}
	return config.URL[name];
};

/**
 * 获取或设置本地存储
 * */
config.storage = function(key, value) {
	var f = mui.os.plus ? plus.storage : localStorage;
	if (arguments.length == 2) { //设置
		return f.setItem(key, value);
	} else {
		return f.getItem(key);
	}
};

//调试记录
config.debug = function() {
	config.debug && console.log.apply(window.console, arguments);
}

/**
 * 
 * 封装的ajax
 */
config.getAjaxByParm = function(params) {
	params = params || {};
	var urlName = params.url || '';
	var data = params.data || '';
	var success = params.success || function() {};
	var error = params.error || '';
	var options = params.options || {};
	var complete = params.complete || function() {};

	var url = config.getUrl(urlName);
	if (!url) {
		console.log(urlName + " get url is null");
		return;
	}
	var sid = config.storage('xkw_sessionId');
	mui.ajax(url, {
		headers: {
			'Content-Type': "application/json",
			'X-SessionId': sid
		},
		data: data,
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		timeout: 10000, //超时时间设置为10秒；
		beforeSend: function(xhr) {
			xhr.timeout = options && options.timeout || 10000; //默认10秒超时
			xhr.onabort = function() { //mui.ajax没有封装此事件，故手动添加下
				mui.toast("请求被中止");
			}
		},
		success: success,
		error: function(xhr, xhrErrMsg ) {
			if (xhr.status == 400) { //400状态，是服务端自定义的错误状态，提供了友好的错误信息
				try {
					var resObj = JSON.parse(xhr.response);
					if (resObj && resObj.message) {
						mui.toast(resObj.message);
					}
				} catch (e) {}
			} else if (xhr.status == 401) { //服务端定义的Session失效
				mui.toast('您未登录或者登录已失效');
			} else if (navigator.onLine == false) {
				mui.toast("您的网络已断开")
			} else if (xhrErrMsg == 'timeout') {
				mui.toast("请求已超时"); //可能原因分三类：（1）客户端网络状况不好没发出去，（2）服务器端繁忙没有响应，（3）网络中途任意环节超时
			} else if (xhrErrMsg == 'abort') {
				mui.toast('请求被终止,可能是遇到不安全的请求，比如跨域');
			} else {
				if (!window.plus) {
					mui.toast(xhrErrMsg);
					return;
				}
				var nt = plus.networkinfo;
				var s = nt.getCurrentType();
				if (s == nt.CONNECTION_NONE || s == nt.CONNECTION_UNKNOW) {
					mui.toast("您的网络已断开");
					return;
				}
				mui.toast(xhrErrMsg);
			}
		},
		complete: complete
	});

};
config.downByUrl = function(urlPath) {
	var dtask = plus.downloader.createDownload(urlPath, {
		filename: "_doc/myPic.png"
	}, function(d, status) {
		// 下载完成
		if (status == 200) {
			config.debug("Download success: " + d.filename);
		} else {
			config.debug("Download failed: " + status);
		}
	});
	dtask.start();
}