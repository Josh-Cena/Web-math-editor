Vue.component('item', {
	props: ['name','num'],
	template: '<td><a href="#" onclick="addsymb({{name}},{{num}})">\\({{name}}\\)</a></td>',
})
new Vue({
	el:"#app",
	data:{
		name:"latex",
		symbols:[
			["\\alpha ","\\beta ","\\gamma ","\\delta ","\\epsilon",
			 "\\zeta","\\eta","\\theta","\\iota","\\kappa",
			 "\\lambda","\\mu","\\nu","\\xi","\\pi",
			 "\\rho","\\sigma","\\tau"]
		]
	}
});
var input = document.getElementById("input");
function showbox(num){
	document.getElementById("Panel"+num).style.display = "block";
}
function hidebox(num){
	document.getElementById("Panel"+num).style.display = "none";
}
var renderinput = function(){
	MathJax.Hub.Queue(function(){
		var math = MathJax.Hub.getAllJax("output")[0];
		MathJax.Hub.Queue(["Text", math, input.value]);
	});
};
function addsymb(text,num){
	hidebox(num);
	if (input.selectionStart || input.selectionStart == '0') {
		var startPos = input.selectionStart;
		var endPos = input.selectionEnd;
		var restoreTop = input.scrollTop;
		input.value = input.value.substring(0, startPos) + text + input.value.substring(endPos, input.value.length);	 
		if (restoreTop > 0) {
			input.scrollTop = restoreTop;
		}
		input.focus();
		input.selectionStart = startPos + text.length;
		input.selectionEnd = startPos + text.length;
	} else {
		input.value += text;
		input.focus();
	}
	renderinput();
}
var resize = function(){
	document.body.style.height = window.innerHeight + 'px';
};
resize();
window.addEventListener('resize', resize, false);
window.addEventListener('DOMContentLoaded', renderinput, false);
input.addEventListener('input', renderinput, false);
