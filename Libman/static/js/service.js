function getGameIds(){
	$.post(api_root + "GameContent/GetContents", {}, function(data){
		console.log(data);
	});
}
	
function getGameDetails(gid){
	$.post(api_root + "GameContent/GetDetails", gid, function(data){
		console.log(data);
	});
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

function addGameItem(gid, type){
	var gtitle = "GameTitle";
	var image = "./assets/entry/cover/7023a142952ced7e0b125b8fc14240c0.jpg";
	var entrylink = "ent";
	var reldate = "1970-1-1";
	var brand = "GB";
	var gsize = "0";
	var glang = "ZH";
	var lastplay = "1970-1-1";
	var totalplay = "0M";
	
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