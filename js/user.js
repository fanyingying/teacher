/**
 * 演示程序当前的 “注册/登录” 等操作 
 **/
(function($, owner) {
	/**
	 * 用户登录
	 **/
	owner.login = function(loginInfo, callback) {
		callback = callback || $.noop;
		loginInfo = loginInfo || {};
		loginInfo.account = loginInfo.account || '';
		loginInfo.password = loginInfo.password || '';
		if (!/^1(3|5|7|8|4)\d{9}$/.test(loginInfo.account)) {
			return callback('请输入有效的手机号码！');
		}
		if (loginInfo.password.length < 6) {
			return callback('密码最短为 6 个字符');
		}
		config.getAjaxByParm({
			'url': 'userLogin',
			'data': loginInfo,
			'success': function(data) {
				//服务器返回响应，根据响应结果，分析是否登录成功；
				owner.createState(loginInfo.account, callback);
			}
		});
	};

	owner.createState = function(name, callback) {
		var state = owner.getState();
		state.account = name;
		state.token = "token123456789";
		owner.setState(state);
		return callback();
	};

	/**
	 * 新用户注册
	 **/
	owner.reg = function(regInfo, callback) {
		callback = callback || $.noop;
		regInfo = regInfo || {};
		regInfo.account = regInfo.account || '';
		regInfo.password = regInfo.password || '';
		//TODO 更多参数
		if (regInfo.account.length < 5) {
			return callback('用户名最短需要 5 个字符');
		}
		if (regInfo.password.length < 6) {
			return callback('密码最短需要 6 个字符');
		}
		//TODO 姓名验证？ 
		config.getAjaxByParm({
			'url': 'userReg',
			'data': regInfo,
			'success': function(data) {

				mui.toast('注册成功');
				$.openWindow({
					url: 'login.html',
					id: 'login',
					show: {
						aniShow: 'pop-in'
					}
				});
			}
		});

		var users = JSON.parse(localStorage.getItem('$users') || '[]');
		users.push(regInfo);
		localStorage.setItem('$users', JSON.stringify(users));
		return callback();
	};

	/**
	 * 验证手机号码是否可被注册
	 * */
	owner.checkUser = function(regInfo, callback) {
		callback = callback || $.noop;
		regInfo = regInfo || {};
		regInfo.account = regInfo.account || '';
		//验证手机号码
		if (!/^1(3|5|7|8|4)\d{9}$/.test(regInfo.account)) {
			return callback('请输入有效的手机号码！');
		}
		config.getAjaxByParm({
			'url': 'checkUser',
			'data': regInfo,
			'success': function(data) {
				//TODO 根据状态返回不同的提示
				return callback('该手机已被注册');
				return callback();
			}
		});
	}

	/**
	 *发送验证码 
	 */
	owner.sendCode = function(btnCode,params, second) {
		second = second || 60;
		btnCode.setAttribute("disabled", "disabled");
		var interval = setInterval(function() {
			user.sendCode(btnCode);
			if (second < 1) {
				clearInterval(interval);
				btnCode.removeAttribute("disabled");
				btnCode.innerHTML = "获取验证码";
				return;
			}
			btnCode.innerHTML = '{0}秒后重新发送'.format(second);
			second--;
		}, 1000);
		//TODO ajax发送验证码
		config.getAjaxByParm({
			'url': 'sendCode',
			'data': params,
			'success': function(data) {
				//TODO 根据状态返回不同的提示
				return callback('该手机已被注册');
				return callback();
			}
		});
		mui.toast("发送成功");
	}

	/**
	 * 获取当前状态
	 **/
	owner.getState = function() {
		var stateText = localStorage.getItem('$state') || "{}";
		return JSON.parse(stateText);
	};

	/**
	 * 设置当前状态
	 **/
	owner.setState = function(state) {
		state = state || {};
		localStorage.setItem('$state', JSON.stringify(state));
		//var settings = owner.getSettings();
		//settings.gestures = '';
		//owner.setSettings(settings);
	};

	var checkEmail = function(email) {
		email = email || '';
		return (email.length > 3 && email.indexOf('@') > -1);
	};

	/**
	 * 找回密码
	 **/
	owner.findPassword = function(regInfo, callback) {
		callback = callback || $.noop;
		regInfo = regInfo || {};
		regInfo.account = regInfo.account || '';
		regInfo.code = regInfo.code || '';
		regInfo.password = regInfo.password || '';
		//TODO 用户输入验证
		
		config.getAjaxByParm({
			'url': 'findPassword',
			'data': regInfo,
			'success': function(data) {
				//TODO 根据状态返回不同的提示
				return callback('注册成功！');
				return callback();
			}
		}); 
	};

	/**
	 * 获取应用本地配置
	 **/
	owner.setSettings = function(settings) {
		settings = settings || {};
		localStorage.setItem('$settings', JSON.stringify(settings));
	}

	/**
	 * 设置应用本地配置
	 **/
	owner.getSettings = function() {
			var settingsText = localStorage.getItem('$settings') || "{}";
			return JSON.parse(settingsText);
		}
		/**
		 * 获取本地是否安装客户端
		 **/
	owner.isInstalled = function(id) {
		if (id === 'qihoo' && mui.os.plus) {
			return true;
		}
		if (mui.os.android) {
			var main = plus.android.runtimeMainActivity();
			var packageManager = main.getPackageManager();
			var PackageManager = plus.android.importClass(packageManager)
			var packageName = {
				"qq": "com.tencent.mobileqq",
				"weixin": "com.tencent.mm",
				"sinaweibo": "com.sina.weibo"
			}
			try {
				return packageManager.getPackageInfo(packageName[id], PackageManager.GET_ACTIVITIES);
			} catch (e) {}
		} else {
			switch (id) {
				case "qq":
					var TencentOAuth = plus.ios.import("TencentOAuth");
					return TencentOAuth.iphoneQQInstalled();
				case "weixin":
					var WXApi = plus.ios.import("WXApi");
					return WXApi.isWXAppInstalled()
				case "sinaweibo":
					var SinaAPI = plus.ios.import("WeiboSDK");
					return SinaAPI.isWeiboAppInstalled()
				default:
					break;
			}
		}
	}
}(mui, window.user = {}));