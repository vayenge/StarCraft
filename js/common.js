var NavEyes = {
			Index:-1,
			IsRollingStop:false,
			ShowImage:function(index){
					if(this.Index != index){
						this.Index = index;
						$j(".active-button").removeClass("active-button");
						$j(".image-button").find("li").eq(index).addClass("active-button");
						$j(".image-list").find("li").hide();  								
						$j(".image-list").find("li").eq(index).fadeIn(1000);
					}
			},
			Rolling:function(){
				if(this.IsRollingStop == false){
					var nextIndex = this.Index + 1;
					if(nextIndex >= $j(".image-button").find("li").length){
						nextIndex = 0;
					}
					this.ShowImage(nextIndex);
				}
				setTimeout("NavEyes.Rolling()",3000);
			},
			Init:function(){
				$j.each($j(".image-button").find("li"),function(i,item){								
					$j(item).click(function(){
						NavEyes.ShowImage(i);
					});
					$j(item).mousemove(function(){
						NavEyes.IsRollingStop = true;
						$j(".active-button").removeClass("active-button");
						$j(".image-button > li").eq(NavEyes.Index).addClass("active-button");
						$j(item).addClass("active-button");
					});
					
					$j(item).mouseout(function(){
						NavEyes.IsRollingStop = false;
					});					
				});
				$j('.image-button li').mouseout(function(){
					$j(".active-button").removeClass("active-button");
					$j(".image-button > li").eq(NavEyes.Index).addClass("active-button");
				});
				$j(".mask").mousemove(function(){
					NavEyes.IsRollingStop = true;
				});
				$j(".mask").mouseout(function(){
					NavEyes.IsRollingStop = false;
				});
				
				$j(".mask").click(function(){
					var url = $j(".image-list > li:visible").find("a:first").attr("href");
					window.open(url);
				});
			}
		};

		$j(function(){
			NavEyes.Init();
			NavEyes.Rolling();
});

function topMenu(menuClass) {
    $j(menuClass).each(function() {
        var flyMenu = $j(this);
        var menuContent = flyMenu.find(".flyout-menu");
        var flyMenuHeight = menuContent.height();
        menuContent.css({ height: 0});
        flyMenu.hover(
			function() { menuContent.stop().show(0).animate({ height: flyMenuHeight}, 400);},
    	    function() { menuContent.stop().animate({ height: 0}, 400, function() { $j(this).css({ display: "none" });});
        });
    });
};