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
					getGameDetails(btoa(data.List[x]), "all");
					//console.log();
				}
			}
		}
	});
}

function loadAllRecentGames(){
	$.post(api_root + "GameContent/GetLast", {}, function(data){
		if(data.success == true){
			if(data.List.length>0){
				var noc = document.getElementById("rec_nocontent");
				noc.parentNode.removeChild(noc);
				for(x in data.List){
					getGameDetails(btoa(data.List[x]), "recent");
					//console.log();
				}
			}
		}
	});
}
	
function getGameDetails(gid, type){
	var req = atob(gid);
	$.post(api_root + "GameContent/GetDetails", req, function(data){
		if(data.success == true){
			addGameItem(gid, data.Game, type);
		}else{
			alert(data.reason);
		}
		
	});
}

function addGameToLibrary(path){
	$.post(api_root + "GameContent/AddSingleGame", path, function(data){
		if(data.success == false){
			alert(data.reason);
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
	var a = Formium.external.natives.SelectGamePath();
	addGameToLibrary(a);
}

function openGameDetailPage(){
	alert("Detail");
}

function addGameItem(gid, game, type){
	//console.log(game);
	/* console.log(game);
	console.log(game.m_size);
	console.log(game.m_size/1024/1024/1024); */
	var gtitle = game.m_name;
	var image = encodeURI("./assets/entry/byname/" + game.m_name + ".jpg");
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
	var cont1 = "<a class=\"media-left\" onclick=\"openGameDetailPage(\'{ggid}\')\"><div class=\"media-coverbox thumb-container bg-cover pb1x2\" style=\"background-image:url({bg}); width:120px;\"><span class=\"mask\"><span class=\"abs bottom caption\">{title}</span></span></div></a>";
	sec.innerHTML = cont1.format({ggid:gid, bg:image, title:gtitle});
	
	//填充下半部分（信息）
	var div2 = document.createElement("div");
	div2.setAttribute("class", "media-body rel");
	var cont2 = "<div class=\"media-heading mb5\"><h4 class=\"text-line text-line-2\" title=\"{title}\"><a class=\"dark ts-white \" onclick=\"openGameDetailPage(\'{ggid}\')\">{title}</a></h4></div><span class=\"text-xs grey\">{reldate}</span><p class=\"text-line text-line-6 mt5\"><span>品牌：<font color=\"grey\">{brand}</font></span><br><span>游戏大小：<font color=\"grey\">{gsize}</font></span><br><span>语言：<font color=\"grey\">{glang}</font></span><br><br><span>上次游玩：<font color=\"grey\">{lastplay}</font></span><br><span>总游戏时间：<font color=\"grey\">{totalplay}</font></span>";
	div2.innerHTML = cont2.format({ggid:gid, title:gtitle, reldate:reldate, brand:brand, gsize:gsize, glang:glang, lastplay:lastplay, totalplay:totalplay});
	
	sec.appendChild(div2);
	base.appendChild(sec);
	dest.appendChild(base);
	return true;
}

function openGameDetailPage(gid){
	//console.log(game);
	//var imgsrc = getParenthesesStr($(game).find(".media-coverbox").attr("style"));
	//var title = $(game).find("h4,.text-line,.text-line-2").attr("title");
	//var gid = $(game).find("col-xs-12 col-sm-6 transition")
	//imgsrc = imgsrc.substring(1, imgsrc.length - 1);
	var req = atob(gid);
	//console.log(title);
	var a = $("#overlay-detail");
	var b = $("\
	<div class=\"Modal-wrapper Modal-enter-active\" id=\"overlay-window\">\
		<div class=\"Modal-backdrop\"></div>\
			<div class=\"Modal\">\
				<div class=\"Modal-inner\">\
					<div class=\"Modal-content\" id=\"overlay-content\">\
						<div class=\"row row-m10\">\
							<div class=\"col-xs-12 col-md-9 col-p10\">\
								<div class=\"box mb20\" style=\"min-height: 300px;\">\
									<div class=\"entry-sections p20\">\
										<div class=\"row row-sm entry-box-header\">\
											<div class=\"col-xs-12 col-sm-5 col-md-4 cover-container\">\
												<div id=\"game_cover\" class=\"cover-box\" data-rating=\"3\">\
													\
												</div>\
											</div>\
											\
											<div class=\"col-xs-12 col-sm-7 col-md-8\">\
												<div class=\"entry-info\">\
													<div class=\"entry-title\"></div>\
													\
														<div class=\"entry-line\">\
															<span>制作厂商：</span>\
															<span class=\"entry-producter\">\
																<a></a>\
															</span>\
														</div>\
														<div class=\"entry-line\">\
															<span>游戏大小：</span>\
															<span class=\"entry-director\">\
																<a></a>\
															</span>\
														</div>\
														<div class=\"entry-line\">\
															<span>语言：</span>\
															<span class=\"entry-artist\">\
																<a></a>\
															</span>\
														</div>\
														 <div class=\"entry-line\">\
															<span>发行日期：</span>\
															<span class=\"entry-ptime\">\
																<font color=\"#f577ab\"></font>\
															</span>\
															<span class=\"entry-star\"></span>\
														</div>\
														<div class=\"entry-line\">\
															<span>上次启动：</span>\
															<span class=\"entry-actors\">\
																<a></a>\
															</span>\
														</div>\
													<div class=\"entry-links\">\
														<a onclick=\"doStart(this);window.location.reload();\" data-id=\"0\" class=\"we-btn btn-primary we-bigger mr5\">\
															<span>开始游戏</span>\
														</a>\
														<a class=\"we-btn btn-color we-bigger vab\">\
															<span>游戏画廊</span>\
														</a>\
													</div>\
													\
												</div>\
											</div>\
										</div>\
									</div>\
								</div>\
								\
								<div class=\"box mb20\">\
									<div class=\"entry-sections\" style=\"min-height: 300px;\">\
										<div class=\"entry-section entry-block\">\
											<h3>剧情简介</h3>\
											<blockquote id=\"game_description\">\
											</blockquote>\
										</div>\
									</div>\
								</div>\
							</div>\
							\
							<div class=\"col-xs-12 col-md-3 col-p10 sticky sticky-top\" id=\"sidebar\" role=\"navigation\" style=\"\">\
								<div class=\"panel panel-box\">\
									<div class=\"panel-heading\">\
										<h3>分类标签</h3>\
									</div>\
									<div class=\"panel-body\">\
										<ul class=\"entry-tag-list\">\
										</ul>\
									</div>\
								</div>\
								<div class=\"\">\
									<div id=\"entry_databox\" class=\"panel panel-box\">\
										<div class=\"panel-heading\">\
											<h3>详细信息</h3>\
										</div>\
										<div class=\"panel-body entry-data-box\">\
										</div>\
									</div>\
								</div>\
							</div>\
							\
						</div>\
					</div>\
				</div>\
				<button aria-label=\"关闭\" type=\"button\" class=\"Button Modal-closeButton Button--plain\" onclick=\"var a=document.getElementById('overlay-window');a.parentNode.removeChild(a);\">\
						<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" data-new-api=\"Xmark24\" class=\"Zi Zi--Close Modal-closeIcon\" fill=\"currentColor\">\
							<path d=\"M19.81 4.19a.75.75 0 010 1.06L5.25 19.808a.75.75 0 11-1.06-1.06l14.558-14.56a.75.75 0 011.06 0z\" fill-rule=\"evenodd\" clip-rule=\"evenodd\"></path>\
							<path d=\"M19.81 19.81a.75.75 0 01-1.061 0L4.19 5.254a.75.75 0 011.06-1.061L19.81 18.75a.75.75 0 010 1.06z\" fill-rule=\"evenodd\" clip-rule=\"evenodd\"></path>\
						</svg>\
				</button>\
			</div>\
		</div>\
	</div>");
	a.append(b);
	b.find(".entry-links").find("a").attr("data-id", gid);
	
	
	$.post(api_root + "GameContent/GetDetails", req, function(data){
		if(data.success == true){
			var game = data.Game;
			var title = game.m_name;
			var imgsrc = encodeURI("./assets/entry/byname/" + game.m_name + ".jpg");
			var reldate = game.m_reldate == null ? "未知" : game.m_reldate;
			var brand = game.m_brand == null ? "未知" : game.m_brand;
			var gsize = (game.m_size/1024/1024/1024).toFixed(2) + "GB";
			var glang = "ZH";
			var lastplay = game.m_lastOpenedTime == null ? "--" : game.m_lastOpenedTime;
			var totalplay = game.m_time == null ? "未知" : game.m_time + "分钟";
			
			b.find("#game_cover").append($("<div class=\"cover-inner\" data-fancybox=\"gallery\" data-caption=\"{gtitle}\">\
						<img class=\"cover-thumb lazy-loaded\" src=\"{gimg}\" alt=\"{gtitle}\">\
					</div>".format({gimg:imgsrc, gtitle:title})));
					
			var c = b.find(".entry-title");
			c.append($("\
			<div class=\"entry-title\">\
				<h1 class=\"float-xs block-xs\">{gtitle}</h1>\
			</div>\
			".format({gtitle:title})));
			b.find(".entry-info").find(".entry-producter").find("a").text(brand);
			b.find(".entry-info").find(".entry-director").find("a").text(gsize);
			b.find(".entry-info").find(".entry-artist").find("a").text(glang);
			b.find(".entry-info").find(".entry-ptime").find("font").text(reldate);
			b.find(".entry-info").find(".entry-actors").find("a").text(lastplay);
			
			
		}else{
			alert(data.reason);
		}
		
	});
	
	
	
}

function doStart(game){
	var id = atob($(game).attr("data-id"));
	console.log(id);
	Formium.external.natives.OpenGame(id);
}

function getParenthesesStr(text) {
    let result = ''
    if (text == null)
        return result
    let regex = /\((.+?)\)/g;
    result = text.match(regex)[0]
    return result
}