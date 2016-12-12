// JavaScript Document
function xz_add_js(url){
			var script = document.createElement("SCRIPT");
			script.type = "text/javascript";
			script.src = url;
			document.getElementsByTagName("HEAD")[0].appendChild(script);
		}
		
		window.onload = function(){
			//ID值
			var id = "zdzyjr";
			//获取来路url
			var referrer = document.referrer;
			//获取url
			var url_ = location.href;
			//获取标题
			var title = document.title;
			//获取域名
			var domain = document.domain;
			//获取关键字
			var meta = document.getElementsByTagName('meta');
			var keywords = '';
			//遍历得到keywords字段数据
			for(i in meta){
			 if(typeof meta[i].name!="undefined"&&meta[i].name.toLowerCase()=="keywords"){
			  keywords = meta[i].content;
			 }
			}
		
			var url = "http://c.broadtrum.cn/g.php?";
				url += "id=" + encodeURIComponent(id);
				url += "&referrer=" + encodeURIComponent(referrer);
				url += "&url=" + encodeURIComponent(url_);
				url += "&title=" + encodeURIComponent(title);
				url += "&domain=" + encodeURIComponent(domain);
				url += "&keywords=" + encodeURIComponent(keywords);
				url += "&r=" + (new Date()).getTime();//这个随便传一个值，为的是防止缓存，必须传这个值不传不行
				url += "&gfrom=referrer";
				
			//调用此函数
			xz_add_js(url);
		}; 