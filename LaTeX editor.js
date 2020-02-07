var input = document.getElementById("input");
var renderinput = function(){
	MathJax.Hub.Queue(function(){
		var math = MathJax.Hub.getAllJax("output")[0];
		MathJax.Hub.Queue(["Text", math, input.value]);
	});
};
function showbox(num){
	document.getElementById("Panel"+num).style.display = "block";
}
function hidebox(num){
	document.getElementById("Panel"+num).style.display = "none";
}
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
var vm = new Vue({
	el:"#app",
	data:{
		name:"latex",
		symbols:[
			["\\alpha ","\\beta ","\\gamma ","\\delta ","\\epsilon ",
			 "\\zeta ","\\eta ","\\theta ","\\iota ","\\kappa ",
			 "\\lambda ","\\mu ","\\nu ","\\xi ","\\pi ",
			 "\\rho ","\\sigma ","\\tau "],
			["\\upsilon ","\\phi ","\\chi ","\\psi ","\\omega ",
			 "\\Gamma ","\\Delta ","\\Theta ","\\Lambda ","\\Xi ",
			 "\\Pi ","\\Sigma ","\\Upsilon","\\Phi ","\\Psi ",
			 "\\Omega ","\\varepsilon ","\\vartheta "],
			["\\varpi ","\\varrho ","\\varsigma ","\\varphi ","\\aleph ",
			 "\\hbar ","\\imath ","\\jmath ","\\ell ","\\wp ",
			 "\\Re ","\\Im ","\\mathrm{d}","\\partial ","\\infty ",
			 "\\emptyset ","\\nabla ","\\top "],
			["\\bot ","\\angle ","\\forall ","\\exists ","\\neg ",
			 "\\flat ","\\natural ","\\sharp ","\\S ","\\triangleleft ",
			 "\\triangleright ","\\bigtriangleup ","\\bigtriangledown ","\\wedge ","\\vee ",
			 "\\cap ","\\cup ","\\sqcap "],
			["\\sqcup ","\\uplus ","\\amalg ","\\dagger ","\\ddagger ",
			 "\\diamond ","\\bullet ","\\wr ","\\div ","\\times ",
			 "\\cdot ","\\odot ","\\oslash ","\\otimes ","\\oplus ",
			 "\\pm ","\\mp ","\\circ "],
			["\\star ","\\ne ","\\le ","\\ge ","\\ll ",
			 "\\gg ","\\prec ","\\succ ","\\preceq ","\\succeq ",
			 "\\sim ","\\approx ","\\simeq ","\\cong ","\\equiv ",
			 "\\doteq ","\\in ","\\notin "],
			["\\owns ","\\subset ","\\supset ","\\subseteq ","\\supseteq ",
			 "\\smile ","\\frown ","\\models ","\\mid ","\\parallel ",
			 "\\vdash ","\\dashv ","\\propto ","\\asymp ","\\bowtie",
			 "\\mathbb{A}","\\mathcal{A}","\\mathfrak{A}"],
			["\\cdots ","\\vdots ","\\ddots "]
		],
		operators:[
			["\\log ","\\lg ","\\ln ","\\sin ","\\cos ",
			 "\\tan ","\\cot ","\\sec ","\\csc "],
			["\\arcsin ","\\arccos ","\\arctan ","\\sinh ","\\cosh ",
			 "\\tanh ","\\coth ","\\arg ","\\ker "],
			["\\dim ","\\hom ","\\exp ","\\deg "],
			["\\lim ","\\limsup ","\\liminf ","\\max ","\\min ",
			 "\\sup ","\\inf ","\\det ","\\Pr"],
			["\\gcd ","\\bmod "]
		],
		structures:[
			["\\sqrt{x}","\\sqrt[a]{x}","{x}_{a}",
			 "{x}^{a}","{x}_{a}^{b}","\\left|x\\right|",
			 "\\left(x\\right)","\\left[x\\right]","\\left\\{x\\right\\}"],
			["\\lfloor x\\rfloor ","\\lceil x\\rceil","\\left\\| x\\right\\|",
			 "\\left< x\\right>","\\acute{a}","\\grave{a}",
			 "\\ddot{a}","\\tilde{a}","\\bar{a}"],
			["\\breve{a}","\\check{a}","\\hat{a}",
			 "\\vec{a}","\\dot{a}","\\widetilde{a}",
			 "\\widehat{a}","\\overbrace{x,y}^a","\\underbrace{x,y}_a",],
			["\\begin{bmatrix}a&b\\\\c&d\\end{bmatrix}","\\frac{a}{b}","\\left({a\\atop b}\\right)",
			 "\\overline{abc}","\\overleftarrow{abc}","\\overrightarrow{abc}",
			 "\\overleftrightarrow{abc}","\\underline{abc}","\\lim_{a\\to b}"],
			["\\sum_{a}^{b}","\\prod_{a}^{b}","\\coprod_{a}^{b}",
			 "\\int_{a}^{b}","\\iint_{a}^{b}","\\iiint_{a}^{b}",
			 "\\oint_{a}^{b}","\\bigcup_{a}^{b}","\\bigcap_{a}^{b}"],
			["\\biguplus_{a}^{b}","\\bigsqcup_{a}^{b}","\\bigvee_{a}^{b}",
			 "\\bigwedge_{a}^{b}","\\bigodot_{a}^{b}","\\bigoplus_{a}^{b}",
			 "\\bigotimes_{a}^{b}","\\overset{a}b","\\underset{a}b"]
		],
		arrows:[
			["\\gets ","\\to ","\\Leftarrow ","\\Rightarrow ","\\leftrightarrow ",
			 "\\Leftrightarrow ","\\longleftarrow ","\\longrightarrow ","\\Longleftarrow ","\\Longrightarrow ",
			 "\\longleftrightarrow ","\\Longleftrightarrow ","\\mapsto ","\\longmapsto "],
			["\\hookleftarrow ","\\hookrightarrow ","\\leftharpoonup ","\\rightharpoonup ","\\leftharpoondown ",
			 "\\rightharpoondown ","\\rightleftharpoons ","\\nearrow ","\\searrow ","\\swarrow ",
			 "\\nwarrow ","\\uparrow ","\\downarrow ","\\Uparrow "],
			["\\Downarrow ","\\updownarrow ","\\Updownarrow ","\\stackrel{\\triangle}{\\longrightarrow}"]
		]
	},
	methods:{
		add:function(set,row,col){
			if(set==1)
				addsymb(this.symbols[row][col],1);
			else if(set==2)
				addsymb(this.operators[row][col],2);
			else if(set==3)
				addsymb(this.structures[row][col],3);
			else if(set==4)
				addsymb(this.arrows[row][col],4);
		}
	}
});
var resize = function(){
	document.body.style.height = window.innerHeight + 'px';
};
resize();
window.addEventListener('resize', resize, false);
window.addEventListener('DOMContentLoaded', renderinput, false);
input.addEventListener('input', renderinput, false);
