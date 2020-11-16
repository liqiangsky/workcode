/* HTTP协议是一个无状态的协议 传输内容是通过报文的形式传输 但是不加密 */
/* HTTPS与HTTP协议一样，但是内容加密 */
// 引入HTTPS模块
var https = require("https");
// 引入HTTP模块
var http = require("http");
// 引入FS模块
var fs = require("fs");
// 引入url模块
var url = require("url");
// 引入path模块
var path = require("path");
// 引入querystring模块
var qs = require("querystring");
// 定义一个MT对象 MimeType
var MT = {
	js: "application/x-javascript",
	html: "text/html",
	css: "text/css",
	png: "image/png",
	gif: "image/gif",
	jpg: "image/jpeg",
	svg: "image/svg+xml",
	txt: "text/plain"
}

// 定义一个处理函数
function handler(req, res) {
	// 使用url解析url字符串
	var url_obj = url.parse(req.url, true);
	// 获取path对象
	var path_obj = path.parse(url_obj.pathname);
	// 接收数据
	if (url_obj.pathname === "/wxxcx/deliver" && req.method === "POST") {
		// 监听data和end事件
		// 定义一个变量
		var data = "";
		req.on("data", function(data_chunk) {
			data += data_chunk;
		});
		req.on("end", function() {
			// 解析成对象
			var obj = qs.parse(data);
			console.log(obj);
		});
		return;
	}

	// 判定是否具备拓展名
	if (!path_obj.ext) {
		url_obj.pathname += "/index.html";
	}
	// 直接读取url_obj.pathname
	fs.readFile("." + url_obj.pathname, function(err, data) {
		if (err) {
			// 设置响应头
			res.setHeader("content-type", "text/plain;charset=utf-8");
			// 返回内容
			res.end("抱歉，您读取的页面" + url_obj.pathname + "不存在");
			return;
		}
		// 获取拓展名
		var ext = url_obj.pathname.split(".").pop();
		// 设置响应头
		res.setHeader("content-type", MT[ext] + ";charset=utf-8");
		// 返回data
		res.end(data);
	});
}

// 创建HTTP服务器
var server = http.createServer(handler);
// 定义配置对象
var option = {
	key: fs.readFileSync("ssl/private.pem"),
	cert: fs.readFileSync("ssl/file.crt")
}
// 创建HTTPS服务器
var server1 = https.createServer(option, handler);

server.listen(3000);
server1.listen(3001);