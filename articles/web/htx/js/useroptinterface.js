function isMobile(phone){
	var phoneReg = /^1[3,4,5,7,8][0-9]{9}$/;
	if(!phoneReg.test(phone)) {
		return false;
	}
	return true;
}


function userOpt(nameBox, mobileBox,codeBtn,opType,tips) {
if(typeof(tips) == "undefined"){
		tips="您已操作成功！客服人员会电话联系您，请稍作等待！";
		}
	var name=$.trim($("[name='"+nameBox+"']").val());
	var mobile = $.trim($("[name='"+mobileBox+"']").val());
	
	
	if(name == null || name=="" ){
		layer.tips("请填写完整信息", $("[name='"+nameBox+"']"), { guide: 2, time: 3 });
		return;
    }
	if(mobile == null || mobile=="" ){
		layer.tips("请填写手机号码", $("[name='"+mobileBox+"']"), { guide: 2, time: 3 });
		return;
    }
	if(!isMobile(mobile)){
    layer.tips("请输入有效格式的手机号码！", $("[name='"+mobileBox+"']"), { guide: 2, time: 3 });
      return;
    }
	var loadi = layer.load('请稍等…');
	var params={ "LinkID": opType,"Mobile":mobile,"Name":name};
     var url = "./ajax.php?action=m1";
    $.getJSON(url,params,function(data){
		layer.close(loadi);
		
		switch (data.Code)
{
case "0":
  alert(tips);
  location.reload();
  break;
case "1":
  layer.tips("手机号码格式错误！", $("[name='"+mobileBox+"']"), { guide: 2, time: 3 });
  break;
case "2":
  layer.tips("您已操作成功， 无需再次操作！", $("#"+codeBtn), { guide: 2, time: 3 });
  break;
  default:
  layer.tips("操作失败！", $("#"+codeBtn), { guide: 2, time: 3 });
  break;
}
	});
}

function userOptgp(nameBox, mobileBox,codeBtn,opType,tips) {
if(typeof(tips) == "undefined"){
		tips="您已操作成功！客服人员会电话联系您，请稍作等待！";
		}
	var name=$.trim($("[name='"+nameBox+"']").val());
	var mobile = $.trim($("[name='"+mobileBox+"']").val());
	
	
	if(name == null || name=="" ){
		layer.tips("请填写完整信息", $("[name='"+nameBox+"']"), { guide: 2, time: 3 });
		return;
    }
	if(mobile == null || mobile=="" ){
		layer.tips("请填写手机号码", $("[name='"+mobileBox+"']"), { guide: 2, time: 3 });
		return;
    }
	if(!isMobile(mobile)){
    layer.tips("请输入有效格式的手机号码！", $("[name='"+mobileBox+"']"), { guide: 2, time: 3 });
      return;
    }
	var loadi = layer.load('请稍等…');
	var params={ "LinkID": opType,"Mobile":mobile,"Reserve1":name};
     var url = "./ajax.php?action=m1";
    $.getJSON(url,params,function(data){
		layer.close(loadi);
		
		switch (data.Code)
{
case "0":
  alert(tips);
  location.reload();
  break;
case "1":
  layer.tips("手机号码格式错误！", $("[name='"+mobileBox+"']"), { guide: 2, time: 3 });
  break;
case "2":
  layer.tips("您已操作成功， 无需再次操作！", $("#"+codeBtn), { guide: 2, time: 3 });
  break;
  default:
  layer.tips("操作失败！", $("#"+codeBtn), { guide: 2, time: 3 });
  break;
}
	});
}

function userOptMobile( mobileBox,codeBtn,opType,tips) {
if(typeof(tips) == "undefined"){
		tips="您已操作成功！客服人员会电话联系您，请稍作等待！";
		}
	var mobile = $.trim($("[name='"+mobileBox+"']").val());
	
	
	if(mobile == null || mobile=="" ){
		layer.tips("请填写手机号码", $("[name='"+mobileBox+"']"), { guide: 2, time: 3 });
		return;
    }
	if(!isMobile(mobile)){
    layer.tips("请输入有效格式的手机号码！", $("[name='"+mobileBox+"']"), { guide: 2, time: 3 });
      return;
    }
	var loadi = layer.load('请稍等…');
	var params={ "LinkID": opType,"Mobile":mobile};
     var url = "./ajax.php?action=m1";
    $.getJSON(url,params,function(data){
		layer.close(loadi);
		
		switch (data.Code)
{
case "0":
  alert(tips);
  location.reload();
  break;
case "1":
  layer.tips("手机号码格式错误！", $("[name='"+mobileBox+"']"), { guide: 2, time: 3 });
  break;
case "2":
  layer.tips("您已操作成功， 无需再次操作！", $("#"+codeBtn), { guide: 2, time: 3 });
  break;
  default:
  layer.tips("操作失败！", $("#"+codeBtn), { guide: 2, time: 3 });
  break;
}
	});
}

function userOptgp2(reserveBox,nameBox, mobileBox,codeBtn,opType,tips) {
if(typeof(tips) == "undefined"){
		tips="您已操作成功！客服人员会电话联系您，请稍作等待！";
		}
	var reserve=$.trim($("[name='"+reserveBox+"']").val());
	var name=$.trim($("[name='"+nameBox+"']").val());
	var mobile = $.trim($("[name='"+mobileBox+"']").val());

	if(reserve == null || reserve=="" ){
		layer.tips("请填写完整信息", $("[name='"+reserveBox+"']"), { guide: 2, time: 3 });
		return;
    }
	
	if(name == null || name=="" ){
		layer.tips("请填写完整信息", $("[name='"+nameBox+"']"), { guide: 2, time: 3 });
		return;
    }
	if(mobile == null || mobile=="" ){
		layer.tips("请填写手机号码", $("[name='"+mobileBox+"']"), { guide: 2, time: 3 });
		return;
    }
	if(!isMobile(mobile)){
    layer.tips("请输入有效格式的手机号码！", $("[name='"+mobileBox+"']"), { guide: 2, time: 3 });
      return;
    }
	var loadi = layer.load('请稍等…');
	var params={ "LinkID": opType,"Mobile":mobile,"Name":name,"Reserve1":reserve};
     var url = "./ajax.php?action=m1";
    $.getJSON(url,params,function(data){
		layer.close(loadi);
		
		switch (data.Code)
{
case "0":
  alert(tips);
  location.reload();
  break;
case "1":
  layer.tips("手机号码格式错误！", $("[name='"+mobileBox+"']"), { guide: 2, time: 3 });
  break;
case "2":
  layer.tips("您已操作成功， 无需再次操作！", $("#"+codeBtn), { guide: 2, time: 3 });
  break;
  default:
  layer.tips("操作失败！", $("#"+codeBtn), { guide: 2, time: 3 });
  break;
}
	});
}

function userOptgpbysem(nameBox, mobileBox,codeBtn,opType,tips) {
if(typeof(tips) == "undefined"){
		tips="您已操作成功！客服人员会电话联系您，请稍作等待！";
		}
	var name=$.trim($("[name='"+nameBox+"']").val());
	var mobile = $.trim($("[name='"+mobileBox+"']").val());
	
	
	if(name == null || name=="" ){
		layer.tips("请填写完整信息", $("[name='"+nameBox+"']"), { guide: 2, time: 3 });
		return;
    }
	var gpze=/^(((002|000|300|600)[\d]{3})|60[\d]{4})/; 
	if(!gpze.test(name)){
		alert("股票代码不正确，无法诊断\n请输入6位数的股票代码，以000|002|300|600开头");
		return;
	}
	if(mobile == null || mobile=="" ){
		layer.tips("请填写手机号码", $("[name='"+mobileBox+"']"), { guide: 2, time: 3 });
		return;
    }
	if(!isMobile(mobile)){
    layer.tips("请输入有效格式的手机号码！", $("[name='"+mobileBox+"']"), { guide: 2, time: 3 });
      return;
    }
	var loadi = layer.load('请稍等…');
	var params={ "Mobile":mobile,"code":name};
     var url = "./ajax.php?action=m1";
    $.getJSON(url,params,function(data){
		layer.close(loadi);
		switch (data.Code){
		case 0:
		  alert('您已操作成功！客服人员会电话联系您，请稍作等待！');
		  location.reload();
		  break;
		case "1":
		  layer.tips("手机号码格式错误！", $("[name='"+mobileBox+"']"), { guide: 2, time: 3 });
		  break;
		case "2":
		  layer.tips("您已操作成功， 无需再次操作！", $("#"+codeBtn), { guide: 2, time: 3 });
		  break;
		  default:
		  layer.tips("操作失败！", $("#"+codeBtn), { guide: 2, time: 3 });
		  break;
		}
	});
}

function userOptbysem(nameBox, mobileBox,codeBtn,opType,tips) {
if(typeof(tips) == "undefined"){
		tips="您已操作成功！客服人员会电话联系您，请稍作等待！";
		}
	var name=$.trim($("[name='"+nameBox+"']").val());
	var mobile = $.trim($("[name='"+mobileBox+"']").val());
	
	
	if(name == null || name=="" ){
		layer.tips("请填写完整信息", $("[name='"+nameBox+"']"), { guide: 2, time: 3 });
		return;
    }
	if(mobile == null || mobile=="" ){
		layer.tips("请填写手机号码", $("[name='"+mobileBox+"']"), { guide: 2, time: 3 });
		return;
    }
	if(!isMobile(mobile)){
    layer.tips("请输入有效格式的手机号码！", $("[name='"+mobileBox+"']"), { guide: 2, time: 3 });
      return;
    }
	var loadi = layer.load('请稍等…');
	var params={ "LinkID": opType,"Mobile":mobile,"Name":name};
     var url = "./ajax.php?action=m1";
    $.getJSON(url,params,function(data){
		layer.close(loadi);
		
		switch (data.Code)
{
case "0":
$.ajax({
        url: "http://sasinterface.songyutech.com/Spread/SpreadInsertSq?callback=callback",
        data: { "LinkId": opType, "LinkName": "Index", "LinkURL": encodeURI(window.location.href), "PageUrl": ""},
        success: function(datasem) {
        },
        error: function(datasem) {
        }
    });
  alert(tips);
  location.reload();
  break;
case "1":
  layer.tips("手机号码格式错误！", $("[name='"+mobileBox+"']"), { guide: 2, time: 3 });
  break;
case "2":
  layer.tips("您已操作成功， 无需再次操作！", $("#"+codeBtn), { guide: 2, time: 3 });
  break;
  default:
  layer.tips("操作失败！", $("#"+codeBtn), { guide: 2, time: 3 });
  break;
}
	});
}


function userOptMobilebysem( mobileBox,codeBtn,opType,tips) {
if(typeof(tips) == "undefined"){
		tips="您已操作成功！客服人员会电话联系您，请稍作等待！";
		}
	var mobile = $.trim($("[name='"+mobileBox+"']").val());
	
	
	if(mobile == null || mobile=="" ){
		layer.tips("请填写手机号码", $("[name='"+mobileBox+"']"), { guide: 2, time: 3 });
		return;
    }
	if(!isMobile(mobile)){
    layer.tips("请输入有效格式的手机号码！", $("[name='"+mobileBox+"']"), { guide: 2, time: 3 });
      return;
    }
	var loadi = layer.load('请稍等…');
	var params={ "LinkID": opType,"Mobile":mobile};
     var url = "./ajax.php?action=m1";
    $.getJSON(url,params,function(data){
		layer.close(loadi);
		
		switch (data.Code)
{
case "0":
$.ajax({
        url: "http://sasinterface.songyutech.com/Spread/SpreadInsertSq?callback=callback",
        data: { "LinkId": opType, "LinkName": "Index", "LinkURL": encodeURI(window.location.href), "PageUrl": ""},
        success: function(datasem) {
        },
        error: function(datasem) {
        }
    });
  alert(tips);
  location.reload();
  break;
case "1":
  layer.tips("手机号码格式错误！", $("[name='"+mobileBox+"']"), { guide: 2, time: 3 });
  break;
case "2":
  layer.tips("您已操作成功， 无需再次操作！", $("#"+codeBtn), { guide: 2, time: 3 });
  break;
  default:
  layer.tips("操作失败！", $("#"+codeBtn), { guide: 2, time: 3 });
  break;
}
	});
}



function userOptgpbysemandtj(nameBox, mobileBox,codeBtn,opType,tips) {
if(typeof(tips) == "undefined"){
		tips="您已操作成功！客服人员会电话联系您，请稍作等待！";
		}
	var name=$.trim($("[name='"+nameBox+"']").val());
	var mobile = $.trim($("[name='"+mobileBox+"']").val());
	
	
	if(name == null || name=="" ){
		layer.tips("请填写完整信息", $("[name='"+nameBox+"']"), { guide: 2, time: 3 });
		return;
    }
	if(mobile == null || mobile=="" ){
		layer.tips("请填写手机号码", $("[name='"+mobileBox+"']"), { guide: 2, time: 3 });
		return;
    }
	if(!isMobile(mobile)){
    layer.tips("请输入有效格式的手机号码！", $("[name='"+mobileBox+"']"), { guide: 2, time: 3 });
      return;
    }
	var loadi = layer.load('请稍等…');
	var params={ "LinkID": opType,"Mobile":mobile,"Reserve1":name};
     var url = "./ajax.php?action=m1";
    $.getJSON(url,params,function(data){
		layer.close(loadi);
		
		switch (data.Code)
{
case "0":
var _mvq = window._mvq || [];window._mvq = _mvq;
_mvq.push(['$setAccount', 'm-201097-0']);

_mvq.push(['$setGeneral', 'registered', '', /*用户名*/ '', /*用户id*/ Math.random()]);
_mvq.push(['$logConversion']);
$.ajax({
        url: "http://sasinterface.songyutech.com/Spread/SpreadInsertSq?callback=callback",
        data: { "LinkId": opType, "LinkName": "Index", "LinkURL": encodeURI(window.location.href), "PageUrl": ""},
        success: function(datasem) {
        },
        error: function(datasem) {
        }
    });
  alert(tips);
  location.reload();
  break;
case "1":
  layer.tips("手机号码格式错误！", $("[name='"+mobileBox+"']"), { guide: 2, time: 3 });
  break;
case "2":
  layer.tips("您已操作成功， 无需再次操作！", $("#"+codeBtn), { guide: 2, time: 3 });
  break;
  default:
  layer.tips("操作失败！", $("#"+codeBtn), { guide: 2, time: 3 });
  break;
}
	});
}