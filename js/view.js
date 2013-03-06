$(document).ready(function() {
controller.initBounds();
controller.initPaper();
view.init();

});

view={

	head:function(centerline){
	var head=model.paper.circle(centerline,(model.bounds.bottom/2),200)
		.attr({'fill':model.skinColor})
		.click(function(){
			controller.changeSkinColor();		
			});
	return head;
	},

	mirror:function(centerline,target){
	var mirror=target.clone();
	if (mirror.attr("cx")>0){
		var x2=(centerline-mirror.attr("cx"))+centerline; 	
		mirror.attr({cx:x2});
		}
	return mirror;
	},

	sclera:function(centerline,head){
	var x=centerline-(head.attr("r")/2);
	var y=head.attr("cy");
	var r=50;

	var sclera=model.paper.circle(x,y,r).attr({'fill':'#fff'}).attr({"stroke-width":0});
	return sclera;
	},

	iris:function(sclera){
	var s=sclera;
	var x=s.attr("cx");
	var y=s.attr("cy");
	var r=s.attr("r")/2;
	var iris=model.paper.circle(x,y,r).attr({fill:model.eyeColor});
	iris.click(function(){
		controller.changeEyeColor();
		});
	return iris;
	},

	upperLid:function(sclera){
	var reach=15;
	var path="";
	path+="M "+(sclera.attr("cx")+sclera.attr("r")+reach)+" "+sclera.attr("cy");
	path+=" Q "+sclera.attr("cx")+" "+(sclera.attr("cy")-sclera.attr("r"));
	path+="  "+(sclera.attr("cx")-sclera.attr("r")-reach)+" "+sclera.attr("cy");
	path+=" Q "+sclera.attr("cx")+" "+(sclera.attr("cy")-(2*sclera.attr("r"))-reach);
	path+=" "+(sclera.attr("cx")+sclera.attr("r")+reach)+" "+sclera.attr("cy");
	path+="Z";

	var lid=model.paper.path(path).attr({"fill":model.skinColor,'stroke-width':0});

	return lid;
	},

	lashes:function(sclera){
	var reach=15;
	path="";
	path+="M "+(sclera.attr("cx")+sclera.attr("r")+reach)+" "+sclera.attr("cy");
	path+=" Q "+sclera.attr("cx")+" "+(sclera.attr("cy")-sclera.attr("r"));
	path+="  "+(sclera.attr("cx")-sclera.attr("r")-reach)+" "+sclera.attr("cy");
	path+=" Q "+sclera.attr("cx")+" "+(sclera.attr("cy")-(sclera.attr("r"))-reach);
	path+=" "+(sclera.attr("cx")+sclera.attr("r")+reach)+" "+sclera.attr("cy");
	path+="Z";
	var lashes=model.paper.path(path).attr({fill:"#555",'stroke-width':0});
	return lashes;
	},

	lowerLid:function(sclera){
	var reach=15;
	var path="";
	path+="M "+(sclera.attr("cx")+sclera.attr("r")+reach)+" "+sclera.attr("cy");
	path+=" Q "+sclera.attr("cx")+" "+(sclera.attr("cy")+sclera.attr("r"));
	path+="  "+(sclera.attr("cx")-sclera.attr("r")-reach)+" "+sclera.attr("cy");
	path+=" Q "+sclera.attr("cx")+" "+(sclera.attr("cy")+(2*sclera.attr("r"))+reach);
	path+=" "+(sclera.attr("cx")+sclera.attr("r")+reach)+" "+sclera.attr("cy");
	path+="Z";
	var lid=model.paper.path(path).attr({"fill":model.skinColor,'stroke-width':0});
	return lid;
	},

	look:function(right,left){
	var tX=0;
	var tY=0;
	if (_.random(10)>4){
		tX=_.random((-0.7*right.attr("r")),(0.7*right.attr("r")));
		tY=_.random((-0.7*right.attr("r")),(0.7*right.attr("r")));
		}
	var transformation="t "+tX+" "+tY;
	var glance=300;
	var look=_.random(1000,2000);
	var animRight=Raphael.animation({'transform':transformation},glance);
	var animLeft=Raphael.animation({'transform':transformation},glance,function(){
		view.look(right,left);
		});
	if (model.lookReady==true){
		right.animate(animRight.delay(look));
		left.animate(animLeft.delay(look));
		}
	else{
		view.look(right,left);
		}

	},

	lookHere:function(right,left,x,y){
	var tX=0;
	var tY=0;
	controller.lookReady(false);
	var r=right.attr("r");
	if (x>(right.attr("cx")+r)){
		tX=0.7*r;
		}
	else if (x<(left.attr("cx")-r)){
		tX=-0.7*r;
		}
	if (y>(right.attr("cy")+r)){
		tY=0.7*r;
		}
	else if (y<(left.attr("cy")-r)){
		tY=-0.7*r;
		}
	var transformation="t "+tX+" "+tY;
	var glance=100;
	var lookTime=1000;
	var animRight=Raphael.animation({'transform':transformation},glance);
	var animLeft=Raphael.animation({'transform':transformation},glance,function(){
		controller.lookReady(true);
		});
	right.animate(animRight.delay(lookTime));
	left.animate(animLeft.delay(lookTime));

	},

	nose:function(centerline,head){
	var noseWidth=20;
	var noseLength=80;
	var path="M "+(centerline-noseWidth)+" "+(head.attr("cy")+noseLength);
	path+="Q "+centerline+" "+(head.attr("cy")+noseLength+20);
	path+=" "+(centerline+noseWidth)+" "+(head.attr("cy")+noseLength);
	path+="Z";

	var nose=model.paper.path(path).attr({fill:"#555"});	

	return nose;
	},

	mouth:function(centerline,head){
	var width=60;
	var height=120;
	var path="M "+(centerline-width)+" "+(head.attr("cy")+height);
	path+="Q "+centerline+" "+(head.attr("cy")+height+10);
	path+=" "+(centerline+width)+" "+(head.attr("cy")+height);
	path+="Z";

	var mouth=model.paper.path(path).attr({fill:"#555"});	

	return mouth;
	},

	hair:function(head){
	
	var floof=function(x1,y1,x2,y2){
		var fluff=100;
		var distance=Math.sqrt(Math.abs(x1-x2)*Math.abs(x1-x2)+Math.abs(y1-y2)*Math.abs(y1-y2));
		var hypo=Math.sqrt((distance/2)*(distance/2)+(fluff)*(fluff));
		var fluffX=x1+hypo;
		var fluffY=y1+hypo;
		var f="";
		f+="M "+x2+" "+y2;
		f+=" Q "+(x1-20)+" "+y1;
		f+=" "+x1+" "+(y1-20);
		f+=" Z ";
		/*
		f+="M "+x1+" "+y1;
		f+=" Q "+(Math.abs((x1+x2)/2)-hypo)+" "+(Math.abs((y1+y2)/2));
		f+=" "+x2+" "+y2;	
		f+=" Q "+(Math.abs((x1+x2)/2)+hypo)+" "+(Math.abs((y1+y2)/2));
		f+=" "+x1+" "+y1;
		f+="Z";
		*/
		return f;
		};

	var volume=_.random(20,50);
	var x=head.attr("cx");
	var y=head.attr("cy");
	var r=head.attr("r");

	var path="";
	var theta=_.random(250,290);
	theta=theta*(Math.PI/180);
	var aX=x+r*Math.cos(theta);
	var aY=y+r*Math.sin(theta)-30;
	for (var i=0;i<3;i++){
		var theta2=_.random(180,210);
		console.log(theta2);
		theta2=theta2*Math.PI/180;
		var bX=x+r*Math.cos(theta2)-volume;
		var bY=y+r*Math.sin(theta2)+volume;

		path+=floof(aX,aY,bX,bY);
		}
	for (var i=0;i<3;i++){
		var theta2=_.random(330,360);
	
		console.log(theta2);
		theta2=theta2*Math.PI/180;
		var bX=x+r*Math.cos(theta2)+volume;
		var bY=y+r*Math.sin(theta2)+volume;

		path+=floof(aX,aY,bX,bY);
		}
	var hair=model.paper.path(path).attr({fill:model.hairColor,'stroke-width':0});

	return hair;
	},

	init:function(){
	var centerline=model.bounds.right/2;
	var head=view.head(centerline);

	var leftSclera=view.sclera(centerline,head);
	var leftIris=view.iris(leftSclera);
	var leftLowerLid=view.lowerLid(leftSclera);
	var leftUpperLid=view.upperLid(leftSclera);
	var leftLashes=view.lashes(leftSclera);

	var rightSclera=view.mirror(centerline,leftSclera);
	var rightIris=view.iris(rightSclera);
	var rightLowerLid=view.lowerLid(rightSclera);
	var rightUpperLid=view.upperLid(rightSclera);
	var rightLashes=view.lashes(rightSclera);

	var nose=view.nose(centerline,head);
	var mouth=view.mouth(centerline,head);

	//var hair=view.hair(head);

	view.look(rightIris,leftIris);

	$("body").click(function(e){
		model.paper.circle(e.pageX,e.pageY,20).attr({fill:"white"});
		view.lookHere(rightIris,leftIris,e.pageX,e.pageY);
		});


	eve.on("changeSkinColor",function(){
		head.animate({fill:model.skinColor},200);
		leftLowerLid.animate({fill:model.skinColor},200);
		leftUpperLid.animate({fill:model.skinColor},200);
		rightLowerLid.animate({fill:model.skinColor},200);
		rightUpperLid.animate({fill:model.skinColor},200);
		});

	eve.on("changeEyeColor",function(){
		leftIris.animate({fill:model.eyeColor},200);
		rightIris.animate({fill:model.eyeColor},200);
		});

	

	},

	

};
