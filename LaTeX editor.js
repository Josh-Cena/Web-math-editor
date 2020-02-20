var input = document.getElementById("input");
var renderinput = function(){
	rawText = vm2.parseRawtext(input.value);
	MathJax.Hub.Queue(function(){
		var math = MathJax.Hub.getAllJax("output")[0];
		MathJax.Hub.Queue(["Text", math, rawText]);
	});
};
function showbox(num,show){
	document.getElementById("Panel" + num).style.display = show ? "block" : "none";
}
function insertSymb(text){
	if (input.selectionStart || input.selectionStart == '0') {
		var startPos = input.selectionStart;
		var endPos = input.selectionEnd;
		var scrollPos = input.scrollTop;
		var original = input.value;
		var before = original.substring(0, startPos);
		var after = original.substring(endPos, original.length);
		var selected = original.substring(startPos, endPos);
		if(typeof text == "object"){
			if(startPos != endPos){
				input.value = before + text.left + selected + text.right + after;
				input.selectionStart = startPos + text.left.length + selected.length + text.right.length;
			}else{
				input.value = before + text.disp + after;
				input.selectionStart = startPos + text.disp.length;
			}
		}else{
			input.value = before + text + after;
			input.selectionStart = startPos + text.length;
		}
		input.selectionEnd = input.selectionStart;
		input.focus();
		if (scrollPos > 0) {
			input.scrollTop = scrollPos;
		}
	}else{
		input.value += text;
		input.focus();
	}
	renderinput();
}
function foldHistory(){
	document.getElementById("text").style.width = window.innerWidth - 120 + "px";
	document.getElementById("foldBtn").style.right = "-2px";
	document.getElementById("historypanel").style.right = "-310px";
	setTimeout(function(){document.getElementById("historypanel").style.display = "none";},500);
}
function expandHistory(){
	document.getElementById("text").style.width = window.innerWidth - 430 + "px";
	document.getElementById("historypanel").style.display = "block";
	setTimeout(function(){
		document.getElementById("foldBtn").style.right = "308px";
		document.getElementById("historypanel").style.right = "0px";
	},3);
}
function showDialog(name,show){
	document.getElementById(name).style.visibility = show ? "visible" : "hidden";
	document.getElementsByClassName("overlay")[0].style.display = show ? "block" : "none";
	document.getElementById(name).style.opacity = show ? 1 : 0;
}
var vm = new Vue({
	el:"#toolbar",
	data:{
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
			[{disp:"\\log ",left:"\\log{\\left(",right:"\\right)}"},
			 {disp:"\\log ",left:"\\log{\\left(",right:"\\right)}"},
			 {disp:"\\ln ",left:"\\ln{\\left(",right:"\\right)}"},
			 {disp:"\\sin ",left:"\\sin{\\left(",right:"\\right)}"},
			 {disp:"\\cos ",left:"\\cos{\\left(",right:"\\right)}"},
			 {disp:"\\tan ",left:"\\tan{\\left(",right:"\\right)}"},
			 {disp:"\\cot ",left:"\\cot{\\left(",right:"\\right)}"},
			 {disp:"\\sec ",left:"\\sec{\\left(",right:"\\right)}"},
			 {disp:"\\csc ",left:"\\csc{\\left(",right:"\\right)}"}],
			[{disp:"\\arcsin ",left:"\\arcsin{\\left(",right:"\\right)}"},
			 {disp:"\\arccos ",left:"\\arccos{\\left(",right:"\\right)}"},
			 {disp:"\\arctan ",left:"\\arctan{\\left(",right:"\\right)}"},
			 {disp:"\\sinh ",left:"\\sinh{\\left(",right:"\\right)}"},
			 {disp:"\\cosh ",left:"\\cosh{\\left(",right:"\\right)}"},
			 {disp:"\\tanh ",left:"\\tanh{\\left(",right:"\\right)}"},
			 {disp:"\\coth ",left:"\\coth{\\left(",right:"\\right)}"},
			 {disp:"\\arg ",left:"\\arg{\\left(",right:"\\right)}"},
			 {disp:"\\ker ",left:"\\ker{\\left(",right:"\\right)}"}],
			[{disp:"\\dim ",left:"\\dim{\\left(",right:"\\right)}"},
			 {disp:"\\hom ",left:"\\hom{\\left(",right:"\\right)}"},
			 {disp:"\\exp ",left:"\\exp{\\left(",right:"\\right)}"},
			 {disp:"\\deg ",left:"\\deg{\\left(",right:"\\right)}"}],
			[{disp:"\\lim ",left:"\\lim{\\left(",right:"\\right)}"},
			 {disp:"\\limsup ",left:"\\limsup{\\left(",right:"\\right)}"},
			 {disp:"\\liminf ",left:"\\liminf{\\left(",right:"\\right)}"},
			 {disp:"\\max ",left:"\\max{\\left(",right:"\\right)}"},
			 {disp:"\\min ",left:"\\min{\\left(",right:"\\right)}"},
			 {disp:"\\sup ",left:"\\sup{\\left(",right:"\\right)}"},
			 {disp:"\\inf ",left:"\\inf{\\left(",right:"\\right)}"},
			 {disp:"\\det ",left:"\\det{\\left(",right:"\\right)}"},
			 {disp:"\\Pr ",left:"\\Pr{\\left(",right:"\\right)}"}],
			[{disp:"\\gcd ",left:"\\gcd{\\left(",right:"\\right)}"},
			 {disp:"\\bmod ",left:"\\bmod{\\left(",right:"\\right)}"}]
		],
		structures:[
			[{disp:"\\sqrt{x} ",left:"\\sqrt{",right:"}"},
			 {disp:"\\sqrt[a]{x} ",left:"\\sqrt[a]{",right:"}"},
			 {disp:"{x}_{a} ",left:"{",right:"}_{a}"},
			 {disp:"{x}^{a} ",left:"{",right:"}^{a}"},
			 {disp:"{x}_{a}^{b} ",left:"\\sqrt[a]{",right:"}"},
			 {disp:"\\left|x\\right|",left:"\\left|",right:"\\right|"},
			 {disp:"\\left(x\\right)",left:"\\left(",right:"\\right)"},
			 {disp:"\\left[x\\right]",left:"\\left[",right:"\\right]"},
			 {disp:"\\left\\{x\\right\\}",left:"\\left\\{",right:"\\right\\}"}],
			[{disp:"\\lfloor x\\rfloor",left:"\\lfloor ",right:"\\rfloor"},
			 {disp:"\\lceil x\\rceil",left:"\\lceil ",right:"\\rceil"},
			 {disp:"\\left\\|x\\right\\|",left:"\\left\\|",right:"\\right\\|"},
			 {disp:"\\left<x\\right>",left:"\\left<",right:"\\right>"},
			 {disp:"\\acute{x}",left:"\\acute{",right:"}"},
			 {disp:"\\grave{x}",left:"\\grave{",right:"}"},
			 {disp:"\\ddot{x}",left:"\\ddot{",right:"}"},
			 {disp:"\\tilde{x}",left:"\\tilde{",right:"}"},
			 {disp:"\\bar{x}",left:"\\bar{",right:"}"}],
			[{disp:"\\breve{x}",left:"\\breve{",right:"}"},
			 {disp:"\\check{x}",left:"\\check{",right:"}"},
			 {disp:"\\hat{x}",left:"\\hat{",right:"}"},
			 {disp:"\\vec{x}",left:"\\vec{",right:"}"},
			 {disp:"\\dot{x}",left:"\\dot{",right:"}"},
			 {disp:"\\widetilde{x}",left:"\\widetilde{",right:"}"},
			 {disp:"\\widehat{x}",left:"\\widehat{",right:"}"},
			 {disp:"\\overbrace{xyz}^{a}",left:"\\overbrace{",right:"}^{a}"},
			 {disp:"\\underbrace{xyz}_{a}",left:"\\underbrace{",right:"}_{a}"}],
			["\\begin{bmatrix}a&b\\\\c&d\\end{bmatrix}",
			 {disp:"\\frac{x}{y}",left:"\\frac{",right:"}{y}"},
			 {disp:"\\left({x\\atop y}\\right)",left:"\\left({",right:"\\atop y}\\right)"},
			 {disp:"\\overline{xyz}",left:"\\overline{",right:"}"},
			 {disp:"\\overleftarrow{xyz}",left:"\\overleftarrow{",right:"}"},
			 {disp:"\\overrightarrow{xyz}",left:"\\overrightarrow{",right:"}"},
			 {disp:"\\overleftrightarrow{xyz}",left:"\\overleftrightarrow{",right:"}"},
			 {disp:"\\underline{xyz}",left:"\\underline{",right:"}"},
			 {disp:"\\lim_{a\\to b}",left:"\\lim_{a\\to b}{",right:"}"}],
			[{disp:"\\sum_{a}^{b}",left:"\\sum_{a}^{b}{",right:"}"},
			 {disp:"\\prod_{a}^{b}",left:"\\prod_{a}^{b}{",right:"}"},
			 {disp:"\\coprod_{a}^{b}",left:"\\coprod_{a}^{b}{",right:"}"},
			 {disp:"\\int_{a}^{b}",left:"\\int_{a}^{b}{",right:"}"},
			 {disp:"\\iint_{a}^{b}",left:"\\iint_{a}^{b}{",right:"}"},
			 {disp:"\\iiint_{a}^{b}",left:"\\iiint_{a}^{b}{",right:"}"},
			 {disp:"\\oint_{a}^{b}",left:"\\oint_{a}^{b}{",right:"}"},
			 {disp:"\\bigcup_{a}^{b}",left:"\\bigcup_{a}^{b}{",right:"}"},
			 {disp:"\\bigcap_{a}^{b}",left:"\\bigcap_{a}^{b}{",right:"}"}],
			[{disp:"\\biguplus_{a}^{b}",left:"\\biguplus_{a}^{b}{",right:"}"},
			 {disp:"\\bigsqcup_{a}^{b}",left:"\\bigsqcup_{a}^{b}{",right:"}"},
			 {disp:"\\bigvee_{a}^{b}",left:"\\bigvee_{a}^{b}{",right:"}"},
			 {disp:"\\bigwedge_{a}^{b}",left:"\\bigwedge_{a}^{b}{",right:"}"},
			 {disp:"\\bigodot_{a}^{b}",left:"\\bigodot_{a}^{b}{",right:"}"},
			 {disp:"\\bigoplus_{a}^{b}",left:"\\bigoplus_{a}^{b}{",right:"}"},
			 {disp:"\\bigotimes_{a}^{b}",left:"\\bigotimes_{a}^{b}{",right:"}"},
			 {disp:"\\overset{a}{x}",left:"\\overset{a}{",right:"}"},
			 {disp:"\\underset{a}{x}",left:"\\underset{a}{",right:"}"}]
		],
		arrows:[
			["\\gets ","\\to ","\\Leftarrow ","\\Rightarrow ","\\leftrightarrow ",
			 "\\Leftrightarrow ","\\longleftarrow ","\\longrightarrow ","\\Longleftarrow ","\\Longrightarrow ",
			 "\\longleftrightarrow ","\\Longleftrightarrow ","\\mapsto "],
			["\\longmapsto ","\\hookleftarrow ","\\hookrightarrow ","\\leftharpoonup ","\\rightharpoonup ",
			 "\\leftharpoondown ","\\rightharpoondown ","\\rightleftharpoons ","\\nearrow ","\\searrow ",
			 "\\swarrow ","\\nwarrow ","\\uparrow "],
			["\\downarrow ","\\Uparrow ","\\Downarrow ","\\updownarrow ","\\Updownarrow ",
			 {disp:"\\stackrel{\\triangle}{\\longrightarrow}",left:"\\stackrel{",right:"}{\\longrightarrow}"}]
		],
		fonts:[
			[{disp:"\\mathrm{Roman}",left:"\\mathrm{",right:"}"},
			 {disp:"\\mathbf{Bold font}",left:"\\mathbf{",right:"}"},
			 {disp:"\\mathtt{Typewriter}",left:"\\mathtt{",right:"}"}],
			[{disp:"\\mathsf{Sans serif}",left:"\\mathsf{",right:"}"},
			 {disp:"\\mathscr{Script}",left:"\\mathscr{",right:"}"},
			 {disp:"\\mathcal{CALIGRAPHY}",left:"\\mathcal{",right:"}"}],
			[{disp:"\\mathbb{BLACKBOARD}",left:"\\mathbb{",right:"}"},
			 {disp:"\\mathfrak{FRAKTUR}",left:"\\mathfrak{",right:"}"}],
			[{disp:"{\\Huge Huge}",left:"{\\Huge ",right:"}"},
			 {disp:"{\\huge huge}",left:"{\\huge ",right:"}"},
			 {disp:"{\\LARGE LARGE}",left:"{\\LARGE",right:"}"}],
			[{disp:"{\\Large Large}",left:"{\\Large",right:"}"},
			 {disp:"{\\large large}",left:"{\\large",right:"}"},
			 {disp:"{\\normalsize normal}",left:"{\\normal",right:"}"}],
			[{disp:"{\\small small}",left:"{\\small",right:"}"},
			 {disp:"{\\scriptsize script}",left:"{\\scriptsize",right:"}"},
			 {disp:"{\\tiny tiny}",left:"{\\tiny",right:"}"}]
		],
		styles:[
			[{disp:"{\\displaystyle \\sum_a^b}",left:"{\\displaystyle ",right:"}"},
			 {disp:"{\\textstyle \\sum_a^b}",left:"{\\textstyle ",right:"}"},
			 {disp:"{\\scriptstyle \\sum_a^b}",left:"{\\scriptstyle ",right:"}"},
			 {disp:"{\\scriptscriptstyle \\sum_a^b}",left:"{\\scriptscriptstyle ",right:"}"}],
			[{disp:"\\text{Text}",left:"\\text{",right:"}"}]
		]
	},
	methods:{
		add:function(charset,row,col){
			hidebox(charset);
			switch(charset){
				case 1: insertSymb(this.symbols[row][col]);break;
				case 2: insertSymb(this.operators[row][col]);break;
				case 3: insertSymb(this.structures[row][col]);break;
				case 4: insertSymb(this.arrows[row][col]);break;
				case 5: insertSymb(this.fonts[row][col]);break;
				case 6: insertSymb(this.styles[row][col]);break;
			}
		}
	}
});
var vm2 = new Vue({
	el:"#history",
	data:{
		fontsize:20,
		seen:true,
		formulas:[
			{name:"Gauss-Bonnet formula",
			 formula:"\\oint_C\\kappa_g\\,\\mathrm{d}s+\\iint_DK\\,\\mathrm{d}\\sigma=2\\pi-\\sum_{i=1}^n\\alpha_i"},
			{name:"Fourier integral",
			 formula:"\\lim_{N\\to+\\infty}\\frac1{2\\pi}\\int_{-N}^{N}\\hat{f}(\\lambda)\\,\\mathrm{e}^{\\mathrm{i}\\lambda x}\\,\\mathrm{d}\\lambda=f(x)"},
			{name:"Simultaneous linear equations",
			 formula:"\\begin{cases}a_1x+a_2y=a_3\\\\b_1x+b_2y=b_3\\end{cases}"}
		],
		shortcuts:[
			{short:"\\RR",cut:"\\mathbb{R}"},
			{short:"\\QQ",cut:"\\mathbb{Q}"}
		]
	},
	computed:{
		icon:function(){
			return this.seen ? "▶" : "◀";
		}
	},
	methods:{
		importformula:function(index){
			input.value = this.formulas[index].formula;
			renderinput();
		},
		parseRawtext:function(rawText){
			for(shortcut of this.shortcuts){
				var reg = shortcut.short.replace(/\\/g,"\\\\");
				reg = eval("/" + reg + "(?![a-zA-Z])/g");
				rawText = rawText.replace(reg,shortcut.cut);
			}
			return rawText;
		},
		removeformula:function(index){
			if (confirm("Do you really want to delete this formula? \nThis action can NOT be undone")){
				this.formulas.splice(index,1);
				setTimeout(function(){
					var math = MathJax.Hub.getAllJax("history");
					for(var i = index; i < math.length; i++){
						MathJax.Hub.Queue(["Typeset",math[i],this.formulas[i]]);
					}
				},2000);
			}
		},
		pushformula:function(){
			if(input.value.length > 0){
				showDialog("Nameinput",true);
				document.getElementById("formulaname").focus();
			}else{
				alert("Empty formula");
			}
		},
		hide:function(){
			if(this.seen)
				foldHistory();
			else
				expandHistory();
			this.seen = !this.seen;
		},
		proceedSaving:function(confirm){
			showDialog('Nameinput',false);
			var fname = document.getElementById("formulaname").value;
			if (confirm && fname != null && fname != "") {
				this.formulas.push({name:fname,formula:input.value});
				setTimeout(function(){MathJax.Hub.Queue(["Typeset",MathJax.Hub,"history"])},100);
			}
			setTimeout(function(){document.getElementById("formulaname").value = "";},300);
		},
		proceedAddingSC:function(confirm){
			showDialog('AddSC',false);
			var shortBox = document.getElementById("short");
			var cutBox = document.getElementById("cut");
			if(confirm){
				if(shortBox.value == "" || cutBox.value == "")
					alert("Cannot contain empty element");
				else
					this.shortcuts.push({short:"\\" + shortBox.value,cut:cutBox.value});
			}
			setTimeout(function(){shortBox.value = "";cutBox.value = "";},300);
		},
		toFront:function(num){
			for(var i = 1;i < 5;i++){
				document.getElementById("L" + i).style.height = "29px";
				document.getElementById("menu" + i).style.display = "none";
			}
			document.getElementById("L" + num).style.height = "33px";
			document.getElementById("menu" + num).style.display = "block";
		}
	},
	created: function(){
		var history = localStorage.getItem("webmathdata");
		if(history != null)
			this.formulas = JSON.parse(history);
		history = localStorage.getItem("webmathdata2");
		if(history != null)
			this.shortcuts = JSON.parse(history);
	},
	watch:{
		formulas(newVal){
			localStorage.setItem("webmathdata", JSON.stringify(newVal));
		},
		shortcuts(newVal){
			localStorage.setItem("webmathdata2", JSON.stringify(newVal));
		},
		fontsize(newVal){
			if(newVal >= 10){
				document.getElementById("output").getElementsByTagName("div")[0].style.cssText = 
				"display: table-cell;vertical-align: middle;font-size:" + newVal + "px !important";
				renderinput();
			}
		}
	}
})
input.addEventListener('input', renderinput, false);
window.onresize = function(){
	if(window.innerWidth <= 800)
		foldHistory();
	else
		expandHistory();
	vm2.seen = !vm2.seen;
}
