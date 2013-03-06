davis=
{
random:function (x)
	{
		return (Math.floor(Math.random()*x));
	},

bell: function (x)
	{
		var i=Math.round((davis.random(x)+davis.random(x)+davis.random(x))/3);
		return i;
	},

randomColor:function (x)
	{

	if (x){	x=x.toLowerCase();}
	else{x=="none"}

	var red=davis.random(255);
	var green=davis.random(255);
	var blue=davis.random(255);
	var color="rgb("+red+","+green+","+blue+")";

	if (x=="mammal" || x=="mammalian"){
		red=160+davis.random(85);
		green=red-40;
		blue=green/2;
		color="rgb("+red+","+green+","+blue+")";
		}
	return color;
	},
	
pick: function (x)
	{
	return x[davis.random(x.length)];
	}
};
