function getRecGameIDs(){
	return $.post(api_root + "GameContent/GetLast", {}, function(data){
		return data;
	});
}

function loadAllGames(){
	$.post(api_root + "GameContent/GetContents", {}, function(data){
		if(data.success == true){
			if(data.List.length>0){
				var noc = document.getElementById("all_nocontent");
				noc.parentNode.removeChild(noc);
				for(x in data.List){
					getGameDetails(btoa(data.List[x]))
					//console.log();
				}
			}
		}
	});
}
	
function getGameDetails(gid){
	var req = atob(gid);
	$.post(api_root + "GameContent/GetDetails", req, function(data){
		if(data.success == true){
			addGameItem(gid, data.Game, "all");
		}else{
			console.log(data.reason);
		}
		
	});
}

function addGameToLibrary(path){
	$.post(api_root + "GameContent/AddSingleGame", path, function(data){
		if(data.success == false){
			console.log(data.reason);
		}
	});
	window.location.reload();
}

function removeGameItem(gid, type){
	if(type ==="recent"){
		var del = document.getElementById(gid+"_rec");
	}else{
		var del = document.getElementById(gid);
	}
	if(del != null){
		del.parentNode.removeChild(del);
		return true;
	}
	return false;
}

function selectPath(){
	var inputObj=document.createElement('input')
	inputObj.setAttribute('id','file');
	inputObj.setAttribute('type','file');
	inputObj.setAttribute('name','file');
	inputObj.setAttribute("style",'visibility:hidden');
	document.body.appendChild(inputObj);
	inputObj.value;
	inputObj.click();
	console.log(inputObj);
}

$("#addG").on('click',function(){
	selectPath();
	document.querySelector('#file').addEventListener('change', e => {
		if ('files' in e)
			var file = e.files[0];
		else
			var file = e.value;
		console.log(e);
	});
});
 $("#fileImport").on('click',function(){
	//文件上传事件
});

function addGameItem(gid, game, type){
	//console.log(game);
	/* console.log(game);
	console.log(game.m_size);
	console.log(game.m_size/1024/1024/1024); */
	var gtitle = game.m_name;
	var image = encodeURI("./assets/entry/byname/" + game.m_name + ".jpg");
	var entrylink = "ent";
	var reldate = game.m_reldate == null ? "未知" : game.m_reldate;
	var brand = game.m_brand == null ? "未知" : game.m_brand;
	var gsize = (game.m_size/1024/1024/1024).toFixed(2) + "GB";
	var glang = "ZH";
	var lastplay = game.m_lastOpenedTime == null ? "--" : game.m_lastOpenedTime;
	var totalplay = game.m_time == null ? "未知" : game.m_time + "分钟";
	
	/* if(document.getElementById(gid) != null){
		return;
	} */
	
	if(type ==="recent"){
		var dest = document.getElementById('subjects_list_recent');
		gid += "_rec";
	}else{
		var dest = document.getElementById('subjects_list_all');
	}
		
	
	var base = document.createElement("div");
	base.setAttribute("class", "col-xs-12 col-sm-6 transition");
	base.setAttribute("id", gid);
	
	var sec = document.createElement("section")
	sec.setAttribute("class", "media mediabox mb15");
	
	//填充上半部分（图片）
	var cont1 = "<a class=\"media-left\" href=\"{entry}\"><div class=\"media-coverbox thumb-container bg-cover pb1x2\" style=\"background-image:url({bg}); width:120px;\"><span class=\"mask\"><span class=\"abs bottom caption\">{title}</span></span></div></a>";
	sec.innerHTML = cont1.format({entry:entrylink, bg:image, title:gtitle});
	
	//填充下半部分（信息）
	var div2 = document.createElement("div");
	div2.setAttribute("class", "media-body rel");
	var cont2 = "<div class=\"media-heading mb5\"><h4 class=\"text-line text-line-2\" title=\"{title}\"><a class=\"dark ts-white \" href=\"{ent}\">{title}</a></h4></div><span class=\"text-xs grey\">{reldate}</span><p class=\"text-line text-line-6 mt5\"><span>品牌：<font color=\"grey\">{brand}</font></span><br><span>游戏大小：<font color=\"grey\">{gsize}</font></span><br><span>语言：<font color=\"grey\">{glang}</font></span><br><br><span>上次游玩：<font color=\"grey\">{lastplay}</font></span><br><span>总游戏时间：<font color=\"grey\">{totalplay}</font></span>";
	div2.innerHTML = cont2.format({title:gtitle, ent:entrylink, reldate:reldate, brand:brand, gsize:gsize, glang:glang, lastplay:lastplay, totalplay:totalplay});
	
	sec.appendChild(div2);
	base.appendChild(sec);
	dest.appendChild(base);
	return true;
}

