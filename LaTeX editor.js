var input = document.getElementById("input");
var renderinput = function(){
	MathJax.Hub.Queue(function(){
		var math = MathJax.Hub.getAllJax("output")[0];
		MathJax.Hub.Queue(["Text", math, input.value]);
	});
};
function showbox(num){
	document.getElementById("Panel" + num).style.display = "block";
}
function hidebox(num){
	document.getElementById("Panel" + num).style.display = "none";
}
function insertSymb(text,num,mask){
	if(num>0)
		hidebox(num);
	if (input.selectionStart || input.selectionStart == '0') {
		var startPos = input.selectionStart;
		var endPos = input.selectionEnd;
		var scrollPos = input.scrollTop;
		var original = input.value;
		var before = original.substring(0, startPos);
		var after = original.substring(endPos, original.length);
		var selected = original.substring(startPos, endPos);
		if(mask || startPos == endPos){
			input.value = before + text + after;
			input.selectionStart = startPos + text.length;
			input.selectionEnd = startPos + text.length;
		}else{
			switch(num){
			case 0:
				input.value = before + text.substring(0, text.length - 5) + selected + "}" + after;
				break;
			case 2: 
				input.value = before + text.substring(0, text.length - 1) + "{\\left(" + selected + "\\right)}" + after;
				break;
			case 3:
				if(text.indexOf("x") > 0 && text.indexOf("matrix") < 0){
					if(text.indexOf("xyz")>0){
						input.value = before + text.substring(0, text.indexOf("xyz")) +
							selected + text.substring(text.indexOf("xyz") + 3) + after;
					}else {
						input.value = before + text.substring(0, text.indexOf("x")) +
							selected + text.substring(text.indexOf("x") + 1) + after;
					}
				}else{
					if(text.substring(text.length-2)=="b}"){
						input.value = before + text + selected + after;
					}else{
						input.value = before + text + after;
					}
				}
				break;
			case 5:
				input.value = before + text.substring(0, text.indexOf("{")) + "{" + selected + "}" + after;
				break;
			}
			input.selectionStart = startPos;
			input.selectionEnd = startPos;
		}
		input.focus();
		if (scrollPos > 0) {
			input.scrollTop = scrollPos;
		}
	} else {
		input.value += text;
		input.focus();
	}
	renderinput();
}
var vm = new Vue({
	el:"#toolbar",
	data:{
		fontsize:20,
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
			 "\\left< x\\right>","\\acute{x}","\\grave{x}",
			 "\\ddot{x}","\\tilde{x}","\\bar{x}"],
			["\\breve{x}","\\check{x}","\\hat{x}",
			 "\\vec{x}","\\dot{x}","\\widetilde{x}",
			 "\\widehat{x}","\\overbrace{xyz}^a","\\underbrace{xyz}_a",],
			["\\begin{bmatrix}a&b\\\\c&d\\end{bmatrix}","\\frac{x}{y}","\\left({x\\atop y}\\right)",
			 "\\overline{xyz}","\\overleftarrow{xyz}","\\overrightarrow{xyz}",
			 "\\overleftrightarrow{xyz}","\\underline{xyz}","\\lim_{a\\to b}"],
			["\\sum_{a}^{b}","\\prod_{a}^{b}","\\coprod_{a}^{b}",
			 "\\int_{a}^{b}","\\iint_{a}^{b}","\\iiint_{a}^{b}",
			 "\\oint_{a}^{b}","\\bigcup_{a}^{b}","\\bigcap_{a}^{b}"],
			["\\biguplus_{a}^{b}","\\bigsqcup_{a}^{b}","\\bigvee_{a}^{b}",
			 "\\bigwedge_{a}^{b}","\\bigodot_{a}^{b}","\\bigoplus_{a}^{b}",
			 "\\bigotimes_{a}^{b}","\\overset{a}{x}","\\underset{a}{x}"]
		],
		arrows:[
			["\\gets ","\\to ","\\Leftarrow ","\\Rightarrow ","\\leftrightarrow ",
			 "\\Leftrightarrow ","\\longleftarrow ","\\longrightarrow ","\\Longleftarrow ","\\Longrightarrow ",
			 "\\longleftrightarrow ","\\Longleftrightarrow ","\\mapsto ","\\longmapsto "],
			["\\hookleftarrow ","\\hookrightarrow ","\\leftharpoonup ","\\rightharpoonup ","\\leftharpoondown ",
			 "\\rightharpoondown ","\\rightleftharpoons ","\\nearrow ","\\searrow ","\\swarrow ",
			 "\\nwarrow ","\\uparrow ","\\downarrow ","\\Uparrow "],
			["\\Downarrow ","\\updownarrow ","\\Updownarrow ","\\stackrel{\\triangle}{\\longrightarrow}"]
		],
		fonts:[
			["\\mathrm{Roman}","\\mathbf{Bold font}","\\mathtt{Typewriter}"],
			["\\mathsf{Sans serif}","\\mathscr{Script}","\\mathcal{CALIGRAPHY}"],
			["\\mathbb{BLACKBOARD}","\\mathfrak{FRAKTUR}"]
		]
	},
	methods:{
		add:function(set,row,col){
			switch(set){
				case 1:insertSymb(this.symbols[row][col],1,true);break;
				case 2:insertSymb(this.operators[row][col],2,false);break;
				case 3:insertSymb(this.structures[row][col],3,false);break;
				case 4:insertSymb(this.arrows[row][col],4,true);break;
				case 5:insertSymb(this.fonts[row][col],5,false);break;
			}
		}
	},
	watch:{
		fontsize(newVal){
			if(newVal>=10){
				//document.getElementById("output").getElementsByTagName("div")[0]
				//.style.setProperty("font-size",newVal + "px","important");
				document.getElementById("output").getElementsByTagName("div")[0].style.cssText = 
				"display: table-cell;vertical-align: middle;font-size:" + newVal + "px !important";
				renderinput();
			}
		}
	}
});
var vm2 = new Vue({
	el:"#history",
	data:{
		formulas:[
			{name:"Gauss-Bonnet formula",formula:"\\oint_C\\kappa_g\\,\\mathrm{d}s+\\iint_DK\\,\\mathrm{d}\\sigma=2\\pi-\\sum_{i=1}^n\\alpha_i"},
			{name:"Fourier integral",formula:"\\lim_{N\\to+\\infty}\\frac1{2\\pi}\\int_{-N}^{N}\\hat{f}(\\lambda)\\,\\mathrm{e}^{\\mathrm{i}\\lambda x}\\,\\mathrm{d}\\lambda=f(x)"},
			{name:"Simultaneous linear equations",formula:"\\begin{cases}a_1x+a_2y=a_3\\\\b_1x+b_2y=b_3\\end{cases}"}
		]
	},
	computed:{
		storage: function(){
			return localStorage.getItem("webmathdata");
		}
	},
	methods:{
		importformula:function(index){
			input.value = this.formulas[index].formula;
			renderinput();
		},
		removeformula:function(index){
			this.formulas.splice(index,1);
		},
		pushformula:function(){
			if(input.value.length > 0){
				this.formulas.push({name:"User defined",formula:input.value});
			}
		}
	},
	created: function(){
		var history=localStorage.getItem("webmathdata");
		if(history!=null)
			this.formulas=JSON.parse(history);
	},
	watch:{
		formulas(newVal,oldVal){
			localStorage.setItem("webmathdata", JSON.stringify(newVal));
		}
	}
})
input.addEventListener('input', renderinput, false);
window.onresize = function(){
	if(window.innerWidth <= 800){
		document.getElementById("text").style.width = window.innerWidth - 120 + "px";
		document.getElementById("history").style.display = "none";
	}else{
		document.getElementById("text").style.width = window.innerWidth - 430 + "px";
		document.getElementById("history").style.display = "block";
	}
}
