import { TOKEN_TYPES } from "./scanner.js";

const END_SYMBOL = Symbol("end");
const NOT_END_SYMBOL = Symbol("no end");

// new.target 标记
const NEW_POINT_TARGET_IDENTIFY = Symbol("new.target");

// 工具，生成可解析语法秒数文本
function generateSyntaxDescriptionTexts() {
	// 创建可用 symbol type 查找字符串的 map, 目前 key 直接为 TOKEN_TYPES 的 key
	const typeTextsMap = new Map();
	Object.entries(TOKEN_TYPES).forEach(([key, identify])=> typeTextsMap.set(identify, key));
	return Object.entries(not_end_symbols).map(([name, productions])=> {
		return `${name} => ${productions.map(production=> {
			return production.map(token=> {
				if(token.type === END_SYMBOL) {
					if(token.dataType) {
						return typeTextsMap.get(token.dataType);
					}else {
						return token.value;
					}
				}
				if(token.type === NOT_END_SYMBOL) {
					return token.value;
				}
			}).join(" ");
		}).join("\r\n  | ")}`
	}).join("\r\n");
}

/* 
不符合 LL1 需要手写特殊逻辑解析的语法
FunctionParams in ArrowFunciton
ForInStatement
ForOfStatement
ArrayDesturcture in Expression
ObjectDestructure in Expression
Dynamic Import
import.meta
new.target
LabeledStatement
*/

// 终结符
const END_SYMBOLS = {
	LITERAL: { type: END_SYMBOL, value: "literal" },
	// 变量
	VAR: { type: END_SYMBOL, value: "var" },
	LET: { type: END_SYMBOL, value: "let" },
	CONST: { type: END_SYMBOL, value: "const" },
	// 模块
	IMPORT: { type: END_SYMBOL, value: "import" },
	FROM: { type: END_SYMBOL, value: "from" },
	AS: { type: END_SYMBOL, value: "as" },
	EXPORT: { type: END_SYMBOL, value: "export" },
	DEFAULT: { type: END_SYMBOL, value: "default" },
	// 条件
	IF: { type: END_SYMBOL, value: "if" },
	ELSE: { type: END_SYMBOL, value: "else" },
	// 循环
	FOR: { type: END_SYMBOL, value: "for" },
	WHILE: { type: END_SYMBOL, value: "while" },
	BREAK: { type: END_SYMBOL, value: "break" },
	CONTINUE: { type: END_SYMBOL, value: "continue" },
	OF: { type: END_SYMBOL, value: "of" },
	// return
	RETURN: { type: END_SYMBOL, value: "return" },
	// throw
	THROW: { type: END_SYMBOL, value: "throw" },
	// 分隔符
	";": { type: END_SYMBOL, value: ";" },
	",": { type: END_SYMBOL, value: "," },
	// 点
	".": { type: END_SYMBOL, value: "." },
	"?.": { type: END_SYMBOL, value: "?." },
	// 空
	NONE: { type: END_SYMBOL, value: "NONE" },
	// 开始和结束块
	START_BLOCK: { type: END_SYMBOL, value: "{" },
	END_BLOCK: { type: END_SYMBOL, value: "}" },
	// 开始和结束括号
	START_BRACKET: { type: END_SYMBOL, value: "(" },
	END_BRACKET: { type: END_SYMBOL, value: ")" },
	// 方括号
	"[": { type: END_SYMBOL, value: "[" },
	"]": { type: END_SYMBOL, value: "]" },
	// 左侧的运算符
	"!": { type: END_SYMBOL, value: "!" },
	"~": { type: END_SYMBOL, value: "~" },
	"++": { type: END_SYMBOL, value: "++" },
	"--": { type: END_SYMBOL, value: "--" },
	TYPEOF: { type: END_SYMBOL, value: "typeof" },
	DELETE: { type: END_SYMBOL, value: "delete" },
	AWAIT: { type: END_SYMBOL, value: "await" },
	VOID: { type: END_SYMBOL, value: "void" },
	// 左侧和算数运算符
	"+": { type: END_SYMBOL, value: "+" },
	"-": { type: END_SYMBOL, value: "-" },
	// 算数运算符
	"*": { type: END_SYMBOL, value: "*" },
	"/": { type: END_SYMBOL, value: "/" },
	"%": { type: END_SYMBOL, value: "%" },
	// 布尔判断符
	">": { type: END_SYMBOL, value: ">" },
	">=": { type: END_SYMBOL, value: ">=" },
	"<": { type: END_SYMBOL, value: "<" },
	"<=": { type: END_SYMBOL, value: "<=" },
	IN: { type: END_SYMBOL, value: "in" },
	INSTANCEOF: { type: END_SYMBOL, value: "instanceof" },
	// 相等判断符
	"==": { type: END_SYMBOL, value: "==" },
	"!=": { type: END_SYMBOL, value: "!=" },
	"===": { type: END_SYMBOL, value: "===" },
	"!==": { type: END_SYMBOL, value: "!==" },
	// 逻辑运算符
	"&&": { type: END_SYMBOL, value: "&&" },
	"??": { type: END_SYMBOL, value: "??" },

	"||": { type: END_SYMBOL, value: "||" },
	// 三元运算符
	"?": { type: END_SYMBOL, value: "?" },
	":": { type: END_SYMBOL, value: ":" },
	// 赋值运算符
	"=": { type: END_SYMBOL, value: "=" },
	"+=": { type: END_SYMBOL, value: "+=" },
	"-=": { type: END_SYMBOL, value: "-=" },
	"**=": { type: END_SYMBOL, value: "**=" },
	"*=": { type: END_SYMBOL, value: "*=" },
	"/=": { type: END_SYMBOL, value: "/=" },
	"%=": { type: END_SYMBOL, value: "%=" },
	"<<=": { type: END_SYMBOL, value: "<<=" },
	">>=": { type: END_SYMBOL, value: ">>=" },
	">>>=": { type: END_SYMBOL, value: ">>>=" },
	"&=": { type: END_SYMBOL, value: "&=" },
	"^=": { type: END_SYMBOL, value: "^=" },
	"|=": { type: END_SYMBOL, value: "|=" },
	"&&=": { type: END_SYMBOL, value: "&&=" },
	"||=": { type: END_SYMBOL, value: "||=" },
	"??=": { type: END_SYMBOL, value: "??" },
	// 幂运算符
	"**": { type: END_SYMBOL, value: "**" },
	// 位运算符
	"&": { type: END_SYMBOL, value: "&" },
	"^": { type: END_SYMBOL, value: "^" },
	"|": { type: END_SYMBOL, value: "|" },
	// 移位运算符
	">>": { type: END_SYMBOL, value: ">>" },
	"<<": { type: END_SYMBOL, value: "<<" },
	">>>": { type: END_SYMBOL, value: ">>>" },
	// Function 关键字
	FUNCTION: { type: END_SYMBOL, value: "function" },
	// 箭头
	"=>": { type: END_SYMBOL, value: "=>" },
	// 异步
	ASYNC: { type: END_SYMBOL, value: "async" },
	// 展开操作符
	"...": { type: END_SYMBOL, value: "..." },
	// 模板字符串
	"`": { type: END_SYMBOL, value: "`" },
	"$": { type: END_SYMBOL, value: "$" }, // 仅用于模板字符串内的$符号
	// error 相关
	TRY: { type: END_SYMBOL, value: "try" },
	CATCH: { type: END_SYMBOL, value: "catch" },
	FINALLY: { type: END_SYMBOL, value: "finally" },
	// switch
	SWITCH: { type: END_SYMBOL, value: "switch" },
	CASE: { type: END_SYMBOL, value: "case" },
	// debugger
	DEBUGGER: { type: END_SYMBOL, value: "debugger" },
	// with
	WITH: { type: END_SYMBOL, value: "with" },
	// GET SET
	GET: { type: END_SYMBOL, value: "get" },
	SET: { type: END_SYMBOL, value: "set" },
	// class
	CLASS: { type: END_SYMBOL, value: "class" },
	STATIC: { type: END_SYMBOL, value: "static" },
	EXTENDS: { type: END_SYMBOL, value: "extends" },

	[TOKEN_TYPES.TEMPLATE_STRING]: { // 模板字符串中的字符串
		type: END_SYMBOL,
		dataType: TOKEN_TYPES.TEMPLATE_STRING,
		match(token) {
			return token.type === TOKEN_TYPES.TEMPLATE_STRING;
		}
	},
	// new
	NEW: { type: END_SYMBOL, value: "new" },
	// YIELD
	YIELD: { type: END_SYMBOL, value: "yield" },
	// 标识符
	[TOKEN_TYPES.IDENTIFY]: {
		type: END_SYMBOL,
		dataType: TOKEN_TYPES.IDENTIFY,
		match(token) {
			const result = token.type === TOKEN_TYPES.IDENTIFY || token.type === TOKEN_TYPES.KEYWORD;// 许多关键字也可以被作为标识符
			// 标准化转换
			if (result) {
				token.type = "Identifier";
				token.name = token.value;
			}
			return result;
		}
	},
}

// 数据类型(特殊终结符)
const DATA_TYPE_SYMBOLS = {
	[TOKEN_TYPES.STRING_LITERAL]: {
		type: END_SYMBOL,
		dataType: TOKEN_TYPES.STRING_LITERAL,
		match(token) {
			const result = token.type === TOKEN_TYPES.STRING_LITERAL;
			// 标准化转换
			if (result) {
				token.type = "Literal";
				token.raw = token.value.raw;
				token.value = token.value.value;
			}
			return result;
		}
	},
	[TOKEN_TYPES.NUMERTIC_LITERAL]: {
		type: END_SYMBOL,
		dataType: TOKEN_TYPES.NUMERTIC_LITERAL,
		match(token) {
			const result = token.type === TOKEN_TYPES.NUMERTIC_LITERAL;
			// 标准化转换
			if (result) {
				token.type = "Literal";
				token.raw = token.value;
				// 替换掉所有_ ，再解析为值
				token.value = Number(token.raw.replaceAll("_", ""));
			}
			return result;
		}
	},
	[TOKEN_TYPES.BOOLEAN_LITERAL]: {
		type: END_SYMBOL,
		dataType: TOKEN_TYPES.BOOLEAN_LITERAL,
		match(token) {
			const result = token.type === TOKEN_TYPES.BOOLEAN_LITERAL;
			// 标准化转换
			if (result) {
				token.type = "Literal";
				token.raw = token.value;
				token.value = token.raw === "true";
			}
			return result;
		}
	},
	[TOKEN_TYPES.NULL_LITERAL]: {
		type: END_SYMBOL,
		dataType: TOKEN_TYPES.NULL_LITERAL,
		match(token) {
			const result = token.type === TOKEN_TYPES.NULL_LITERAL;
			// 标准化转换
			if (result) {
				token.type = "Literal";
				token.raw = token.value;
				token.value = null;
			}
			return result;
		}
	},
	[TOKEN_TYPES.REGULAR_EXPRESSION_LITERAL]: {
		type: END_SYMBOL,
		dataType: TOKEN_TYPES.REGULAR_EXPRESSION_LITERAL,
		match(token) {
			const result = token.type === TOKEN_TYPES.REGULAR_EXPRESSION_LITERAL;
			// 标准化转换
			if (result) {
				token.type = "Literal";
			}
			return result;
		}
	},
}

// 有效属性名, 在下面的对象属性和类项目会用到
const validPropertyNames = [
	[
		END_SYMBOLS[TOKEN_TYPES.IDENTIFY],
	],
	[
		END_SYMBOLS["["],
		{ type: NOT_END_SYMBOL, value: "Expression" },
		END_SYMBOLS["]"],
	],
	[
		DATA_TYPE_SYMBOLS[TOKEN_TYPES.STRING_LITERAL],
	],
	[
		DATA_TYPE_SYMBOLS[TOKEN_TYPES.NUMERTIC_LITERAL],
	],
	[
		DATA_TYPE_SYMBOLS[TOKEN_TYPES.BOOLEAN_LITERAL],
	],
	[
		DATA_TYPE_SYMBOLS[TOKEN_TYPES.NULL_LITERAL],
	]
];

// 对象的key为非终结符，值为可用的产生式数组
const not_end_symbols = {
	// 箭头函数内容部分
	ArrowFunctionContent: [
		[
			END_SYMBOLS["=>"],
			{ type: NOT_END_SYMBOL, value: "ArrowFunctionBody" },
		],
		[END_SYMBOLS.NONE],
	],
	// 箭头函数体
	ArrowFunctionBody: [
		[// 是一个表达式(箭头函数右侧不带括号的表达式不可以带有逗号，否则会被认为是两个语句)
			{ type: NOT_END_SYMBOL, value: "Term1_" },
		],
		// 将Block放在后面用于覆盖Term1_,因为单表达式 {} 花括号也可以被推导（对象字面量），在箭头函数中仅有的花括号始终为代码块
		[// 是一个代码块
			{ type: NOT_END_SYMBOL, value: "Block" },
		],
	],
	// 模板字符串
	TemplateLiteral: [
		[
			END_SYMBOLS["`"],
			{ type: NOT_END_SYMBOL, value: "TemplateStringElements" },
			END_SYMBOLS["`"],
		]
	],
	TemplateStringElements: [
		[
			{ type: NOT_END_SYMBOL, value: "TemplateStringElement" },
			{ type: NOT_END_SYMBOL, value: "TemplateStringElements" },
		],
		[
			END_SYMBOLS.NONE,
		],
	],
	// 模板字符串元素
	TemplateStringElement: [
		[
			END_SYMBOLS[TOKEN_TYPES.TEMPLATE_STRING],
		],
		[
			END_SYMBOLS["$"],
			END_SYMBOLS.START_BLOCK,
			{ type: NOT_END_SYMBOL, value: "Expression" },
			END_SYMBOLS.END_BLOCK,
		]
	],
	Expression: [
		[
			{ type: NOT_END_SYMBOL, value: "Term1_" },
			{ type: NOT_END_SYMBOL, value: "Term1" },
		]
	],
	// 可空表达式
	OptionalExpression: [
		[
			{ type: NOT_END_SYMBOL, value: "Expression" },
		],
		[END_SYMBOLS.NONE],
	],
	Expr: [
		[
			{ type: NOT_END_SYMBOL, value: "Literal" },
		],
		[
			END_SYMBOLS.START_BRACKET,
			{ type: NOT_END_SYMBOL, value: "OptionalExpression" },
			END_SYMBOLS.END_BRACKET,
			// 箭头函数可以跟在括号后
			{ type: NOT_END_SYMBOL, value: "ArrowFunctionContent" },
		],
		[
			{ type: NOT_END_SYMBOL, value: "FunctionExpression" },
		],
		[
			{ type: NOT_END_SYMBOL, value: "AsyncFunction" },
		],
		[
			{ type: NOT_END_SYMBOL, value: "ClassExpression" },
		],
	],
	Term1: [
		[
			END_SYMBOLS[","],
			{ type: NOT_END_SYMBOL, value: "Term1_" },
			{ type: NOT_END_SYMBOL, value: "Term1" },
		],
		[END_SYMBOLS.NONE],
	],
	Term1_: [
		[
			{ type: NOT_END_SYMBOL, value: "Term2_" },
			{ type: NOT_END_SYMBOL, value: "Term2" },
		],
		// 生成器 yield
		[
			END_SYMBOLS.YIELD,
			{ type: NOT_END_SYMBOL, value: "OptionalMutiplicationSign" },
			{ type: NOT_END_SYMBOL, value: "OptionalTerm1_" },
		],
	],
	// 可选乘号
	OptionalMutiplicationSign: [
		[
			END_SYMBOLS["*"],
		],
		[
			END_SYMBOLS.NONE,
		]
	],
	// 可选 await
	OptionalAwait: [
		[
			END_SYMBOLS.AWAIT,
		],
		[
			END_SYMBOLS.NONE,
		]
	],
	// 可选Term1_
	OptionalTerm1_: [
		[
			{ type: NOT_END_SYMBOL, value: "Term1_" },
		],
		[
			END_SYMBOLS.NONE,
		]
	],
	Term2: [
		...[
			"=",
			"+=",
			"-=",
			"**=",
			"*=",
			"/=",
			"%=",
			"<<=",
			">>=",
			">>>=",
			"&=",
			"^=",
			"|=",
			"&&=",
			"||=",
			"??=",
		].map(calcSym => {
			return [
				END_SYMBOLS[calcSym],
				{ type: NOT_END_SYMBOL, value: "Term2_" },
				{ type: NOT_END_SYMBOL, value: "Term2" },
			]
		}),
		[END_SYMBOLS.NONE],
	],
	Term2_: [
		[
			{ type: NOT_END_SYMBOL, value: "Term3_" },
			{ type: NOT_END_SYMBOL, value: "Term3" },
		],
	],
	Term3: [
		[
			END_SYMBOLS["?"],
			{ type: NOT_END_SYMBOL, value: "Term3_" },
			{ type: NOT_END_SYMBOL, value: "Term3" },
			END_SYMBOLS[":"],
			{ type: NOT_END_SYMBOL, value: "Term3_" },
			{ type: NOT_END_SYMBOL, value: "Term3" },
		],
		[END_SYMBOLS.NONE],
	],
	Term3_: [
		[
			{ type: NOT_END_SYMBOL, value: "Term4_" },
			{ type: NOT_END_SYMBOL, value: "Term4" },
		]
	],
	Term4: [
		[
			END_SYMBOLS["||"],
			{ type: NOT_END_SYMBOL, value: "Term4_" },
			{ type: NOT_END_SYMBOL, value: "Term4" },
		],
		[
			END_SYMBOLS["??"],
			{ type: NOT_END_SYMBOL, value: "Term4_" },
			{ type: NOT_END_SYMBOL, value: "Term4" },
		],
		[END_SYMBOLS.NONE],
	],
	Term4_: [
		[
			{ type: NOT_END_SYMBOL, value: "Term5_" },
			{ type: NOT_END_SYMBOL, value: "Term5" },
		]
	],
	Term5: [
		[
			END_SYMBOLS["&&"],
			{ type: NOT_END_SYMBOL, value: "Term5_" },
			{ type: NOT_END_SYMBOL, value: "Term5" },
		],
		[END_SYMBOLS.NONE],
	],
	Term5_: [
		[
			{ type: NOT_END_SYMBOL, value: "Term6_" },
			{ type: NOT_END_SYMBOL, value: "Term6" },
		]
	],
	Term6: [
		[
			END_SYMBOLS["|"],
			{ type: NOT_END_SYMBOL, value: "Term6_" },
			{ type: NOT_END_SYMBOL, value: "Term6" },
		],
		[END_SYMBOLS.NONE],
	],
	Term6_: [
		[
			{ type: NOT_END_SYMBOL, value: "Term7_" },
			{ type: NOT_END_SYMBOL, value: "Term7" },
		]
	],
	Term7: [
		[
			END_SYMBOLS["^"],
			{ type: NOT_END_SYMBOL, value: "Term7_" },
			{ type: NOT_END_SYMBOL, value: "Term7" },
		],
		[END_SYMBOLS.NONE],
	],
	Term7_: [
		[
			{ type: NOT_END_SYMBOL, value: "Term8_" },
			{ type: NOT_END_SYMBOL, value: "Term8" },
		]
	],
	Term8: [
		[
			END_SYMBOLS["&"],
			{ type: NOT_END_SYMBOL, value: "Term8_" },
			{ type: NOT_END_SYMBOL, value: "Term8" },
		],
		[END_SYMBOLS.NONE],
	],
	Term8_: [
		[
			{ type: NOT_END_SYMBOL, value: "Term9_" },
			{ type: NOT_END_SYMBOL, value: "Term9" },
		]
	],
	Term9: [
		[
			END_SYMBOLS["=="],
			{ type: NOT_END_SYMBOL, value: "Term9_" },
			{ type: NOT_END_SYMBOL, value: "Term9" },
		],
		[
			END_SYMBOLS["!="],
			{ type: NOT_END_SYMBOL, value: "Term9_" },
			{ type: NOT_END_SYMBOL, value: "Term9" },
		],
		[
			END_SYMBOLS["==="],
			{ type: NOT_END_SYMBOL, value: "Term9_" },
			{ type: NOT_END_SYMBOL, value: "Term9" },
		],
		[
			END_SYMBOLS["!=="],
			{ type: NOT_END_SYMBOL, value: "Term9_" },
			{ type: NOT_END_SYMBOL, value: "Term9" },
		],
		[END_SYMBOLS.NONE],
	],
	Term9_: [
		[
			{ type: NOT_END_SYMBOL, value: "Term10_" },
			{ type: NOT_END_SYMBOL, value: "Term10" },
		]
	],
	Term10: [
		[
			END_SYMBOLS["<"],
			{ type: NOT_END_SYMBOL, value: "Term10_" },
			{ type: NOT_END_SYMBOL, value: "Term10" },
		],
		[
			END_SYMBOLS["<="],
			{ type: NOT_END_SYMBOL, value: "Term10_" },
			{ type: NOT_END_SYMBOL, value: "Term10" },
		],
		[
			END_SYMBOLS[">"],
			{ type: NOT_END_SYMBOL, value: "Term10_" },
			{ type: NOT_END_SYMBOL, value: "Term10" },
		],
		[
			END_SYMBOLS[">="],
			{ type: NOT_END_SYMBOL, value: "Term10_" },
			{ type: NOT_END_SYMBOL, value: "Term10" },
		],
		[
			END_SYMBOLS.IN,
			{ type: NOT_END_SYMBOL, value: "Term10_" },
			{ type: NOT_END_SYMBOL, value: "Term10" },
		],
		[
			END_SYMBOLS.INSTANCEOF,
			{ type: NOT_END_SYMBOL, value: "Term10_" },
			{ type: NOT_END_SYMBOL, value: "Term10" },
		],
		[END_SYMBOLS.NONE],
	],
	Term10_: [
		[
			{ type: NOT_END_SYMBOL, value: "Term11_" },
			{ type: NOT_END_SYMBOL, value: "Term11" },
		]
	],
	Term11: [
		[
			END_SYMBOLS["<<"],
			{ type: NOT_END_SYMBOL, value: "Term11_" },
			{ type: NOT_END_SYMBOL, value: "Term11" },
		],
		[
			END_SYMBOLS[">>"],
			{ type: NOT_END_SYMBOL, value: "Term11_" },
			{ type: NOT_END_SYMBOL, value: "Term11" },
		],
		[
			END_SYMBOLS[">>>"],
			{ type: NOT_END_SYMBOL, value: "Term11_" },
			{ type: NOT_END_SYMBOL, value: "Term11" },
		],
		[END_SYMBOLS.NONE],
	],
	Term11_: [
		[
			{ type: NOT_END_SYMBOL, value: "Term12_" },
			{ type: NOT_END_SYMBOL, value: "Term12" },
		]
	],
	Term12: [
		[
			END_SYMBOLS["+"],
			{ type: NOT_END_SYMBOL, value: "Term12_" },
			{ type: NOT_END_SYMBOL, value: "Term12" },
		],
		[
			END_SYMBOLS["-"],
			{ type: NOT_END_SYMBOL, value: "Term12_" },
			{ type: NOT_END_SYMBOL, value: "Term12" },
		],
		[END_SYMBOLS.NONE],
	],
	Term12_: [
		[
			{ type: NOT_END_SYMBOL, value: "Term13_" },
			{ type: NOT_END_SYMBOL, value: "Term13" },
		],
	],
	Term13: [
		[
			END_SYMBOLS["*"],
			{ type: NOT_END_SYMBOL, value: "Term13_" },
			{ type: NOT_END_SYMBOL, value: "Term13" },
		],
		[
			END_SYMBOLS["/"],
			{ type: NOT_END_SYMBOL, value: "Term13_" },
			{ type: NOT_END_SYMBOL, value: "Term13" },
		],
		[
			END_SYMBOLS["%"],
			{ type: NOT_END_SYMBOL, value: "Term13_" },
			{ type: NOT_END_SYMBOL, value: "Term13" },
		],
		[END_SYMBOLS.NONE],
	],
	Term13_: [
		[
			{ type: NOT_END_SYMBOL, value: "Term14_" },
			{ type: NOT_END_SYMBOL, value: "Term14" },
		],
	],
	Term14: [
		[
			END_SYMBOLS["**"],
			{ type: NOT_END_SYMBOL, value: "Term14_" },
			{ type: NOT_END_SYMBOL, value: "Term14" },
		],
		[
			END_SYMBOLS.NONE,
		],
	],
	Term14_: [
		// 优先级 15的 运算符 均为 左侧运算符 右侧表达式, 所以 先 Term15 后 Term15_
		[
			{ type: NOT_END_SYMBOL, value: "Term15" },
			{ type: NOT_END_SYMBOL, value: "Term15_" },
		]
	],
	Term15: [
		[
			END_SYMBOLS["!"],
			{ type: NOT_END_SYMBOL, value: "Term15" },
		],
		[
			END_SYMBOLS["~"],
			{ type: NOT_END_SYMBOL, value: "Term15" },
		],
		[
			END_SYMBOLS["+"],
			{ type: NOT_END_SYMBOL, value: "Term15" },
		],
		[
			END_SYMBOLS["-"],
			{ type: NOT_END_SYMBOL, value: "Term15" },
		],
		[
			END_SYMBOLS["++"],
			{ type: NOT_END_SYMBOL, value: "Term15" },
		],
		[
			END_SYMBOLS["--"],
			{ type: NOT_END_SYMBOL, value: "Term15" },
		],
		[
			END_SYMBOLS.TYPEOF,
			{ type: NOT_END_SYMBOL, value: "Term15" },
		],
		[
			END_SYMBOLS.VOID,
			{ type: NOT_END_SYMBOL, value: "Term15" },
		],
		[
			END_SYMBOLS.DELETE,
			{ type: NOT_END_SYMBOL, value: "Term15" },
		],
		[
			END_SYMBOLS.AWAIT,
			{ type: NOT_END_SYMBOL, value: "Term15" },
		],
		[
			END_SYMBOLS.NONE,
		],
	],
	Term15_: [
		// new 为左侧运算符 右侧表达式, 所以 先 Term17 再 Term17_
		[
			{ type: NOT_END_SYMBOL, value: "Term16_" },
			{ type: NOT_END_SYMBOL, value: "Term16" },
		]
	],
	Term16: [
		[
			END_SYMBOLS["++"],
		],
		[
			END_SYMBOLS["--"],
		],
		[
			END_SYMBOLS.NONE,
		],
	],
	Term16_: [
		[
			{ type: NOT_END_SYMBOL, value: "TermWithOptionalTagTemplate_" },
			{ type: NOT_END_SYMBOL, value: "TermWithOptionalTagTemplate" },
		]
	],
	// 可选标签模板运算符表达式
	TermWithOptionalTagTemplate: [
		// 模板字符串可以算作是一种后置运算符
		[
			{ type: NOT_END_SYMBOL, value: "TemplateLiteral" },
			{ type: NOT_END_SYMBOL, value: "TermWithOptionalTagTemplate" },
		],
		[
			END_SYMBOLS.NONE,
		],
	],
	TermWithOptionalTagTemplate_: [
		[
			// new 为左侧运算符 右侧表达式, 所以 先 Term17 再 Term17_
			{ type: NOT_END_SYMBOL, value: "Term17" },
			{ type: NOT_END_SYMBOL, value: "Term17_" },
		]
	],
	Term17: [
		[
			END_SYMBOLS.NEW,
			{ type: NOT_END_SYMBOL, value: "Term17" },
		],
		[
			END_SYMBOLS.NONE,
		],
	],
	Term17_: [
		[
			{ type: NOT_END_SYMBOL, value: "Expr" },
			{ type: NOT_END_SYMBOL, value: "Term18" },
		],
	],
	// 可选函数调用参数
	OptionalFunctionCallParams: [
		[
			{ type: NOT_END_SYMBOL, value: "Term1_" },
			// 末尾可以带逗号
			{ type: NOT_END_SYMBOL, value: "OptionalComma" },
			{ type: NOT_END_SYMBOL, value: "OptionalFunctionCallParams" },
		],
		[
			END_SYMBOLS.NONE,
		],
	],
	Term18: [
		[
			END_SYMBOLS["."],
			END_SYMBOLS[TOKEN_TYPES.IDENTIFY],
			{ type: NOT_END_SYMBOL, value: "Term18" },
		],
		[
			END_SYMBOLS["["],
			{ type: NOT_END_SYMBOL, value: "Expression" },
			END_SYMBOLS["]"],
			{ type: NOT_END_SYMBOL, value: "Term18" },
		],
		[
			END_SYMBOLS["?."],
			// 支持 ?.[xx] 语法的情况处理
			{ type: NOT_END_SYMBOL, value: "OptionalChainingAttributeName" },
			{ type: NOT_END_SYMBOL, value: "Term18" },
		],
		[
			END_SYMBOLS.START_BRACKET,
			{ type: NOT_END_SYMBOL, value: "OptionalFunctionCallParams" },
			END_SYMBOLS.END_BRACKET,
			{ type: NOT_END_SYMBOL, value: "Term18" },
		],
		[END_SYMBOLS.NONE],
	],
	// 可选链属性名
	OptionalChainingAttributeName: [
		[
			END_SYMBOLS[TOKEN_TYPES.IDENTIFY],
		],
		[
			END_SYMBOLS["["],
			{ type: NOT_END_SYMBOL, value: "Expression" },
			END_SYMBOLS["]"],
		],
		// 可以是函数调用
		[
			END_SYMBOLS.START_BRACKET,
			{ type: NOT_END_SYMBOL, value: "OptionalFunctionCallParams" },
			END_SYMBOLS.END_BRACKET,
		]
	],
	// 可空逗号
	OptionalComma: [
		[END_SYMBOLS[","]],
		[END_SYMBOLS.NONE],
	],
	// 可选分号
	OptionalDelimter: [
		[END_SYMBOLS[";"]],
		[END_SYMBOLS.NONE],
	],
	// 可选标识符
	OptionalIdentify: [
		[END_SYMBOLS[TOKEN_TYPES.IDENTIFY]],
		[END_SYMBOLS.NONE],
	],
	// 可选 async
	OptionalAsync: [
		[
			END_SYMBOLS.ASYNC
		],
		[END_SYMBOLS.NONE],
	],
	ObjectLiteral: [
		[
			END_SYMBOLS.START_BLOCK,
			{ type: NOT_END_SYMBOL, value: "ObjectContent" },
			END_SYMBOLS.END_BLOCK,
		],
	],
	ObjectContent: [
		[
			{ type: NOT_END_SYMBOL, value: "ObjectProperty" },
			{ type: NOT_END_SYMBOL, value: "ObjectContent" },
		],
		[
			END_SYMBOLS.NONE,
		],
	],
	// setter getter 相关产生式生成
	...(() => {
		return {
			// 合并生成产生式
			MethodGetterContent: validPropertyNames.map(production => {
				return [
					...production,
					END_SYMBOLS.START_BRACKET,
					END_SYMBOLS.END_BRACKET,
					{ type: NOT_END_SYMBOL, value: "Block" },
				];
			}),
			// 合并生成产生式
			MethodSetterContent: validPropertyNames.map(production => {
				return [
					...production,
					END_SYMBOLS.START_BRACKET,
					{ type: NOT_END_SYMBOL, value: "VariableIdentifier" },
					END_SYMBOLS.END_BRACKET,
					{ type: NOT_END_SYMBOL, value: "Block" },
				];
			}),
		}
	})(),
	ObjectProperty: [
		[
			END_SYMBOLS[TOKEN_TYPES.IDENTIFY],
			{ type: NOT_END_SYMBOL, value: "ObjectPropertyContent" },
			{ type: NOT_END_SYMBOL, value: "OptionalComma" },
		],
		// 字符属性名
		[
			DATA_TYPE_SYMBOLS[TOKEN_TYPES.STRING_LITERAL],
			{ type: NOT_END_SYMBOL, value: "ObjectPropertyContent" },
			{ type: NOT_END_SYMBOL, value: "OptionalComma" },
		],
		// 计算属性名
		[
			END_SYMBOLS["["],
			{ type: NOT_END_SYMBOL, value: "Expression" },
			END_SYMBOLS["]"],
			{ type: NOT_END_SYMBOL, value: "ObjectPropertyContent" },
			{ type: NOT_END_SYMBOL, value: "OptionalComma" },
		],
		// 数值字面量属性名
		[
			DATA_TYPE_SYMBOLS[TOKEN_TYPES.NUMERTIC_LITERAL],
			{ type: NOT_END_SYMBOL, value: "ObjectPropertyContent" },
			{ type: NOT_END_SYMBOL, value: "OptionalComma" },
		],
		// 布尔值字面量属性名
		[
			DATA_TYPE_SYMBOLS[TOKEN_TYPES.BOOLEAN_LITERAL],
			{ type: NOT_END_SYMBOL, value: "ObjectPropertyContent" },
			{ type: NOT_END_SYMBOL, value: "OptionalComma" },
		],
		// null字面量属性名
		[
			DATA_TYPE_SYMBOLS[TOKEN_TYPES.NULL_LITERAL],
			{ type: NOT_END_SYMBOL, value: "ObjectPropertyContent" },
			{ type: NOT_END_SYMBOL, value: "OptionalComma" },
		],
		// 展开操作符
		[
			END_SYMBOLS["..."],
			{ type: NOT_END_SYMBOL, value: "Term1_" },
			{ type: NOT_END_SYMBOL, value: "OptionalComma" },
		],
		// getter
		[
			END_SYMBOLS.GET,
			// 由于 get 可能是异步函数标识，也可能是属性名称(Keyword 也会当做 Identidy 解析)，需要进一步解析
			{ type: NOT_END_SYMBOL, value: "ObjectPropertyStartInGet" },
			{ type: NOT_END_SYMBOL, value: "OptionalComma" },
		],
		// setter
		[
			END_SYMBOLS.SET,
			// 由于 set 可能是异步函数标识，也可能是属性名称(Keyword 也会当做 Identidy 解析)，需要进一步解析
			{ type: NOT_END_SYMBOL, value: "ObjectPropertyStartInSet" },
			{ type: NOT_END_SYMBOL, value: "OptionalComma" },
		],
		// async function
		[
			END_SYMBOLS.ASYNC,
			// 由于 async 可能是异步函数标识，也可能是属性名称(Keyword 也会当做 Identidy 解析)，需要进一步解析
			{ type: NOT_END_SYMBOL, value: "ObjectPropertyStartInAsync" },
			{ type: NOT_END_SYMBOL, value: "OptionalComma" },
		],
		// generator Function
		[
			END_SYMBOLS["*"],
			{ type: NOT_END_SYMBOL, value: "PropertyMethodContent" },
			{ type: NOT_END_SYMBOL, value: "OptionalComma" },
		],
	],
	// 属性名从 get 开始，可能是异步函数，或者就是一般的属性名
	ObjectPropertyStartInGet: [
		// getter
		[
			{ type: NOT_END_SYMBOL, value: "MethodGetterContent" },
		],
		// 一般属性
		[
			END_SYMBOLS[":"],
			{ type: NOT_END_SYMBOL, value: "Term1_" },
		],
		// 方法简写
		[
			END_SYMBOLS.START_BRACKET,
			{ type: NOT_END_SYMBOL, value: "FunctionParams" },
			END_SYMBOLS.END_BRACKET,
			{ type: NOT_END_SYMBOL, value: "Block" },
		],
		// 可为空，简写属性
		[
			END_SYMBOLS.NONE
		],
	],
	// 属性名从 set 开始，可能是异步函数，或者就是一般的属性名
	ObjectPropertyStartInSet: [
		// getter
		[
			{ type: NOT_END_SYMBOL, value: "MethodSetterContent" },
		],
		// 一般属性
		[
			END_SYMBOLS[":"],
			{ type: NOT_END_SYMBOL, value: "Term1_" },
		],
		// 方法简写
		[
			END_SYMBOLS.START_BRACKET,
			{ type: NOT_END_SYMBOL, value: "FunctionParams" },
			END_SYMBOLS.END_BRACKET,
			{ type: NOT_END_SYMBOL, value: "Block" },
		],
		// 可为空，简写属性
		[
			END_SYMBOLS.NONE
		],
	],
	// 属性名从 async 开始，可能是异步函数，或者就是一般的属性名
	ObjectPropertyStartInAsync: [
		// 异步函数
		[
			{ type: NOT_END_SYMBOL, value: "OptionalMutiplicationSign" },
			{ type: NOT_END_SYMBOL, value: "PropertyMethodContent" },
		],
		// 一般属性
		[
			END_SYMBOLS[":"],
			{ type: NOT_END_SYMBOL, value: "Term1_" },
		],
		// 方法简写
		[
			END_SYMBOLS.START_BRACKET,
			{ type: NOT_END_SYMBOL, value: "FunctionParams" },
			END_SYMBOLS.END_BRACKET,
			{ type: NOT_END_SYMBOL, value: "Block" },
		],
		// 可为空，简写属性
		[
			END_SYMBOLS.NONE
		],
	],
	// 属性函数主体，不含 async 和 *
	PropertyMethodContent: validPropertyNames.map(production => {
		return [
			...production,
			END_SYMBOLS.START_BRACKET,
			{ type: NOT_END_SYMBOL, value: "FunctionParams" },
			END_SYMBOLS.END_BRACKET,
			{ type: NOT_END_SYMBOL, value: "Block" },
		];
	}),
	ObjectPropertyContent: [
		// 普通值
		[
			END_SYMBOLS[":"],
			{ type: NOT_END_SYMBOL, value: "Term1_" },
		],
		// 函数语法
		[
			END_SYMBOLS.START_BRACKET,
			{ type: NOT_END_SYMBOL, value: "FunctionParams" },
			END_SYMBOLS.END_BRACKET,
			{ type: NOT_END_SYMBOL, value: "Block" },
		],
		// 空语法，同名字面量
		[
			END_SYMBOLS.NONE,
		],
	],
	ArrayLiteral: [
		[
			END_SYMBOLS["["],
			{ type: NOT_END_SYMBOL, value: "ArrayContent" },
			END_SYMBOLS["]"],
		]
	],
	ArrayContent: [
		[
			{ type: NOT_END_SYMBOL, value: "ArrayItem" },
			{ type: NOT_END_SYMBOL, value: "ArrayContent" },
		],
		[
			END_SYMBOLS.NONE,
		],
	],
	ArrayItem: [
		[
			{ type: NOT_END_SYMBOL, value: "Term1_" },
			{ type: NOT_END_SYMBOL, value: "OptionalComma" },
		],
		// 展开操作符
		[
			END_SYMBOLS["..."],
			{ type: NOT_END_SYMBOL, value: "Term1_" },
			{ type: NOT_END_SYMBOL, value: "OptionalComma" },
		],
		[
			END_SYMBOLS[","],
		],
	],
	Literal: [
		[
			END_SYMBOLS[TOKEN_TYPES.IDENTIFY],
			// 箭头函数也可以跟在不带括号的单个标识符后
			{ type: NOT_END_SYMBOL, value: "ArrowFunctionContent" },
		],
		[
			DATA_TYPE_SYMBOLS[TOKEN_TYPES.STRING_LITERAL],
		],
		[
			DATA_TYPE_SYMBOLS[TOKEN_TYPES.NUMERTIC_LITERAL],
		],
		[
			DATA_TYPE_SYMBOLS[TOKEN_TYPES.BOOLEAN_LITERAL],
		],
		[
			DATA_TYPE_SYMBOLS[TOKEN_TYPES.NULL_LITERAL],
		],
		[
			{ type: NOT_END_SYMBOL, value: "ObjectLiteral" },
		],
		[
			{ type: NOT_END_SYMBOL, value: "ArrayLiteral" },
		],
		[
			{ type: NOT_END_SYMBOL, value: "TemplateLiteral" },
		],
		[
			DATA_TYPE_SYMBOLS[TOKEN_TYPES.REGULAR_EXPRESSION_LITERAL],
		],
	],
	Block: [
		[
			END_SYMBOLS.START_BLOCK,
			{ type: NOT_END_SYMBOL, value: "Statements" },
			END_SYMBOLS.END_BLOCK,
		],
	],
	VariableType: [
		[END_SYMBOLS.VAR],
		[END_SYMBOLS.LET],
		[END_SYMBOLS.CONST],
	],
	VariableDeclaration: [
		[
			{ type: NOT_END_SYMBOL, value: "VariableType" },
			{ type: NOT_END_SYMBOL, value: "Declarations" },
		],
	],
	VariableDeclarator: [
		[
			{ type: NOT_END_SYMBOL, value: "VariableIdentifier" },
			// 可以只定义不初始化
			{ type: NOT_END_SYMBOL, value: "VariableInitial" },
		]
	],
	// 这一块严格定义，不能使用 OptionalComma 这种模糊的解析，否则在没有分号的情况下会和表达式解析冲突，从而将表达式尝试解析为 declarator 导致解析失败
	Declarations: [
		[
			{ type: NOT_END_SYMBOL, value: "FirstDeclaration" },
			{ type: NOT_END_SYMBOL, value: "ExtraDeclarations" },
		],
	],
	FirstDeclaration: [
		[
			{ type: NOT_END_SYMBOL, value: "VariableDeclarator" },
		],
		[END_SYMBOLS.NONE],
	],
	ExtraDeclarations: [
		[
			{ type: NOT_END_SYMBOL, value: "VariableDeclaratorHasPrefixComma" },
			{ type: NOT_END_SYMBOL, value: "ExtraDeclarations" },
		],
		[END_SYMBOLS.NONE],
	],
	VariableDeclaratorHasPrefixComma: [
		[
			END_SYMBOLS[","],
			{ type: NOT_END_SYMBOL, value: "VariableDeclarator" },
		]
	],
	VariableInitial: [
		[
			END_SYMBOLS["="],
			{ type: NOT_END_SYMBOL, value: "Term1_" },
		],
		[
			END_SYMBOLS.NONE,
		],
	],
	VariableIdentifier: [
		[
			END_SYMBOLS[TOKEN_TYPES.IDENTIFY],
		],
		[
			{ type: NOT_END_SYMBOL, value: "ObjectPattern" },
		],
		[
			{ type: NOT_END_SYMBOL, value: "ArrayPattern" },
		],
	],
	// 默认值
	DefaultValue: [
		[
			END_SYMBOLS["="],
			{ type: NOT_END_SYMBOL, value: "Term1_" },
		],
		[
			END_SYMBOLS.NONE,
		],
	],
	// 对象解构语法
	ObjectPattern: [
		[
			END_SYMBOLS.START_BLOCK,
			{ type: NOT_END_SYMBOL, value: "ObjectPatternItems" },
			END_SYMBOLS.END_BLOCK,
		]
	],
	ObjectPatternItems: [
		[
			{ type: NOT_END_SYMBOL, value: "ObjectPatternItem" },
			{ type: NOT_END_SYMBOL, value: "ObjectPatternItems" },
		],
		[
			END_SYMBOLS.NONE,
		],
	],
	ObjectPatternItem: [
		[
			END_SYMBOLS[TOKEN_TYPES.IDENTIFY],
			{ type: NOT_END_SYMBOL, value: "ObjectPatternOptionalRename" },
			{ type: NOT_END_SYMBOL, value: "ObjectPatternOptionalDefaultValue" },
			{ type: NOT_END_SYMBOL, value: "OptionalComma" },
		],
		[
			END_SYMBOLS["..."],
			{ type: NOT_END_SYMBOL, value: "VariableIdentifier" },
			{ type: NOT_END_SYMBOL, value: "OptionalComma" },
		]
	],
	// 解构重命名中可以包含另一个解构
	ObjectPatternOptionalRename: [
		[
			END_SYMBOLS[":"],
			{ type: NOT_END_SYMBOL, value: "VariableIdentifier" },
		],
		[
			END_SYMBOLS.NONE,
		],
	],
	ObjectPatternOptionalDefaultValue: [
		[
			END_SYMBOLS["="],
			{ type: NOT_END_SYMBOL, value: "Term1_" },
		],
		[
			END_SYMBOLS.NONE,
		],
	],
	// 数组解构语法
	ArrayPattern: [
		[
			END_SYMBOLS["["],
			{ type: NOT_END_SYMBOL, value: "ArrayPatternItems" },
			END_SYMBOLS["]"],
		],
	],
	ArrayPatternItems: [
		[
			{ type: NOT_END_SYMBOL, value: "ArrayPatternItem" },
			{ type: NOT_END_SYMBOL, value: "ArrayPatternItems" },
		],
		[
			END_SYMBOLS.NONE,
		],
	],
	// 可以是普通赋予标识符，设置默认值，或者嵌套另一个解构
	ArrayPatternItem: [
		[
			END_SYMBOLS[TOKEN_TYPES.IDENTIFY],
			{ type: NOT_END_SYMBOL, value: "DefaultValue" },
			{ type: NOT_END_SYMBOL, value: "OptionalComma" },
		],
		[
			{ type: NOT_END_SYMBOL, value: "ArrayPattern" },
			{ type: NOT_END_SYMBOL, value: "DefaultValue" },
			{ type: NOT_END_SYMBOL, value: "OptionalComma" },
		],
		[
			{ type: NOT_END_SYMBOL, value: "ObjectPattern" },
			{ type: NOT_END_SYMBOL, value: "DefaultValue" },
			{ type: NOT_END_SYMBOL, value: "OptionalComma" },
		],
		[
			END_SYMBOLS["..."],
			{ type: NOT_END_SYMBOL, value: "VariableIdentifier" },
			{ type: NOT_END_SYMBOL, value: "OptionalComma" },
		],
		[
			END_SYMBOLS[","],
		]
	],
	FunctionExpression: [
		[
			END_SYMBOLS.FUNCTION,
			// 生成器乘号标识（可选）
			{ type: NOT_END_SYMBOL, value: "OptionalMutiplicationSign" },
			// 函数名称是可选的
			{ type: NOT_END_SYMBOL, value: "OptionalIdentify" },
			END_SYMBOLS.START_BRACKET,
			{ type: NOT_END_SYMBOL, value: "FunctionParams" },
			END_SYMBOLS.END_BRACKET,
			{ type: NOT_END_SYMBOL, value: "Block" },
		]
	],
	FunctionParams: [
		[
			{ type: NOT_END_SYMBOL, value: "FunctionParam" },
			{ type: NOT_END_SYMBOL, value: "FunctionParams" },
		],
		[
			END_SYMBOLS.NONE,
		],
	],
	FunctionParam: [
		[
			{ type: NOT_END_SYMBOL, value: "VariableIdentifier" },
			{ type: NOT_END_SYMBOL, value: "DefaultValue" },
			{ type: NOT_END_SYMBOL, value: "OptionalComma" },
		],
		[
			END_SYMBOLS["..."],
			{ type: NOT_END_SYMBOL, value: "VariableIdentifier" },
			{ type: NOT_END_SYMBOL, value: "OptionalComma" },
		],
		[END_SYMBOLS.NONE],
	],
	// 异步关键字
	AsyncFunction: [
		[
			END_SYMBOLS.ASYNC,
			{ type: NOT_END_SYMBOL, value: "AsyncFunctionContent" },
		],
		[END_SYMBOLS.NONE],
	],
	// 异步函数体
	AsyncFunctionContent: [
		[
			{ type: NOT_END_SYMBOL, value: "FunctionExpression" },
		],
		[
			END_SYMBOLS[TOKEN_TYPES.IDENTIFY],
			{ type: NOT_END_SYMBOL, value: "ArrowFunctionContent" },
		],
		[
			END_SYMBOLS.START_BRACKET,
			{ type: NOT_END_SYMBOL, value: "FunctionParams" },
			END_SYMBOLS.END_BRACKET,
			{ type: NOT_END_SYMBOL, value: "ArrowFunctionContent" },
		],
	],
	// if
	If: [
		[
			END_SYMBOLS.IF,
			END_SYMBOLS.START_BRACKET,
			{ type: NOT_END_SYMBOL, value: "Expression" },
			END_SYMBOLS.END_BRACKET,
			{ type: NOT_END_SYMBOL, value: "Statement" },
			{ type: NOT_END_SYMBOL, value: "Else" },
		],
	],
	// if 语句的 else 部分, 可空
	Else: [
		[
			END_SYMBOLS.ELSE,
			{ type: NOT_END_SYMBOL, value: "ElseContent" },
		],
		[END_SYMBOLS.NONE],
	],
	// Else 主体内容, 可以直接是 代码块，或者是 另外一个if块
	ElseContent: [
		[
			{ type: NOT_END_SYMBOL, value: "Statement" },
		],
		[
			{ type: NOT_END_SYMBOL, value: "If" },
		],
	],
	// while 语句
	While: [
		[
			END_SYMBOLS.WHILE,
			END_SYMBOLS.START_BRACKET,
			{ type: NOT_END_SYMBOL, value: "Expression" },
			END_SYMBOLS.END_BRACKET,
			{ type: NOT_END_SYMBOL, value: "Block" },
		],
	],
	// return
	Return: [
		[
			END_SYMBOLS.RETURN,
			{ type: NOT_END_SYMBOL, value: "OptionalExpression" },
		],
	],
	// throw
	Throw: [
		[
			END_SYMBOLS.THROW,
			{ type: NOT_END_SYMBOL, value: "Expression" },
		],
	],
	// with
	With: [
		[
			END_SYMBOLS.WITH,
			END_SYMBOLS.START_BRACKET,
			{ type: NOT_END_SYMBOL, value: "Expression" },
			END_SYMBOLS.END_BRACKET,
			{ type: NOT_END_SYMBOL, value: "Block" },
		],
	],
	// OptionalVariableDeclarationOrExpression（用于for循环括号内第一个）
	OptionalVariableDeclarationOrExpression: [
		[
			{ type: NOT_END_SYMBOL, value: "VariableDeclaration" },
		],
		[
			{ type: NOT_END_SYMBOL, value: "Expression" },
		],
		[
			END_SYMBOLS.NONE,
		],
	],
	// for 循环括号内内容
	ForContent: [
		[
			END_SYMBOLS.START_BRACKET,
			{ type: NOT_END_SYMBOL, value: "OptionalVariableDeclarationOrExpression" },
			END_SYMBOLS[";"],
			{ type: NOT_END_SYMBOL, value: "OptionalExpression" },
			END_SYMBOLS[";"],
			{ type: NOT_END_SYMBOL, value: "OptionalExpression" },
			END_SYMBOLS.END_BRACKET,
			{ type: NOT_END_SYMBOL, value: "Block" },
		]
	],
	// 可选的变量类型，用于 for in, for of
	OptionalVariableType: [
		[
			{ type: NOT_END_SYMBOL, value: "VariableType" },
		],
		[
			END_SYMBOLS.NONE,
		],
	],
	// for in
	ForInContent: [
		[
			END_SYMBOLS.START_BRACKET,
			{ type: NOT_END_SYMBOL, value: "OptionalVariableType" },
			{ type: NOT_END_SYMBOL, value: "VariableIdentifier" },
			END_SYMBOLS.IN,
			{ type: NOT_END_SYMBOL, value: "Expression" },
			END_SYMBOLS.END_BRACKET,
			{ type: NOT_END_SYMBOL, value: "Block" },
		]
	],
	// for of
	ForOfContent: [
		[
			{ type: NOT_END_SYMBOL, value: "OptionalAwait" },
			END_SYMBOLS.START_BRACKET,
			{ type: NOT_END_SYMBOL, value: "OptionalVariableType" },
			{ type: NOT_END_SYMBOL, value: "VariableIdentifier" },
			END_SYMBOLS.OF,
			{ type: NOT_END_SYMBOL, value: "Expression" },
			END_SYMBOLS.END_BRACKET,
			{ type: NOT_END_SYMBOL, value: "Block" },
		]
	],
	// try 子句，catch finally
	OptionalCatchClause: [
		[
			END_SYMBOLS.CATCH,
			{ type: NOT_END_SYMBOL, value: "OptionalCatchParam" },
			{ type: NOT_END_SYMBOL, value: "Block" },
		],
		[
			END_SYMBOLS.NONE,
		],
	],
	OptionalCatchParam: [
		[
			END_SYMBOLS.START_BRACKET,
			{ type: NOT_END_SYMBOL, value: "VariableIdentifier" },
			END_SYMBOLS.END_BRACKET,
		],
		[
			END_SYMBOLS.NONE,
		],
	],
	OptionalFinallyClause: [
		[
			END_SYMBOLS.FINALLY,
			{ type: NOT_END_SYMBOL, value: "Block" },
		],
		[
			END_SYMBOLS.NONE,
		],
	],
	Switch: [
		[
			END_SYMBOLS.SWITCH,
			END_SYMBOLS.START_BRACKET,
			{ type: NOT_END_SYMBOL, value: "Expression" },
			END_SYMBOLS.END_BRACKET,
			END_SYMBOLS.START_BLOCK,
			{ type: NOT_END_SYMBOL, value: "SwitchCases" },
			END_SYMBOLS.END_BLOCK,
		]
	],
	SwitchCases: [
		[
			{ type: NOT_END_SYMBOL, value: "SwitchCase" },
			{ type: NOT_END_SYMBOL, value: "SwitchCases" },
		],
		[END_SYMBOLS.NONE],
	],
	SwitchCase: [
		[
			END_SYMBOLS.CASE,
			{ type: NOT_END_SYMBOL, value: "Expression" },
			END_SYMBOLS[":"],
			{ type: NOT_END_SYMBOL, value: "Statements" },
		],
		[
			END_SYMBOLS.DEFAULT,
			END_SYMBOLS[":"],
			{ type: NOT_END_SYMBOL, value: "Statements" },
		]
	],
	ClassExpression: [
		[
			END_SYMBOLS.CLASS,
			{ type: NOT_END_SYMBOL, value: "ClassContent" },
		]
	],
	ClassContent: [
		[
			END_SYMBOLS[TOKEN_TYPES.IDENTIFY],
			{ type: NOT_END_SYMBOL, value: "OptionalSuperClass" },
			{ type: NOT_END_SYMBOL, value: "ClassBody" },
		],
		[
			{ type: NOT_END_SYMBOL, value: "OptionalSuperClass" },
			{ type: NOT_END_SYMBOL, value: "ClassBody" },
		]
	],
	OptionalSuperClass: [
		[
			END_SYMBOLS.EXTENDS,
			{ type: NOT_END_SYMBOL, value: "Expression" },
		],
		[END_SYMBOLS.NONE],
	],
	ClassBody: [
		[
			END_SYMBOLS.START_BLOCK,
			{ type: NOT_END_SYMBOL, value: "ClassItems" },
			END_SYMBOLS.END_BLOCK,
		]
	],
	ClassItems: [
		[
			{ type: NOT_END_SYMBOL, value: "ClassItem" },
			{ type: NOT_END_SYMBOL, value: "ClassItems" },
		],
		[END_SYMBOLS.NONE],
	],
	OptionalStatic: [
		[
			END_SYMBOLS.STATIC,
		],
		[END_SYMBOLS.NONE],
	],
	ClassItem: [
		[
			{ type: NOT_END_SYMBOL, value: "ClassItemContent" },
			{ type: NOT_END_SYMBOL, value: "OptionalDelimter" },
		],
		[
			END_SYMBOLS.STATIC,
			{ type: NOT_END_SYMBOL, value: "ClassItemStartInStatic" },
			{ type: NOT_END_SYMBOL, value: "OptionalDelimter" },
		],
	],
	ClassItemStartInStatic: [
		[
			{ type: NOT_END_SYMBOL, value: "ClassItemContent" },
		],
		// 一般属性
		[
			END_SYMBOLS["="],
			{ type: NOT_END_SYMBOL, value: "Expression" },
		],
		// 方法简写
		[
			END_SYMBOLS.START_BRACKET,
			{ type: NOT_END_SYMBOL, value: "FunctionParams" },
			END_SYMBOLS.END_BRACKET,
			{ type: NOT_END_SYMBOL, value: "Block" },
		],
		// 可为空，简写属性
		[
			END_SYMBOLS.NONE
		],
	],
	ClassItemContent: [
		[
			END_SYMBOLS.GET,
			{ type: NOT_END_SYMBOL, value: "ClassItemStartInGet" },
		],
		[
			END_SYMBOLS.SET,
			{ type: NOT_END_SYMBOL, value: "ClassItemStartInSet" },
		],
		// async function
		[
			END_SYMBOLS.ASYNC,
			{ type: NOT_END_SYMBOL, value: "ClassItemStartInAsync" },
		],
		// generator function
		[
			END_SYMBOLS["*"],
			{ type: NOT_END_SYMBOL, value: "PropertyMethodContent" },
		],
		// class static block
		[
			{ type: NOT_END_SYMBOL, value: "Block" },
		],
		...(()=> {
			return validPropertyNames.map(production=> {
				return [
					...production,
					{ type: NOT_END_SYMBOL, value: "ClassItemNormalMethodOrPropertyContent" },
				]
			});
		})(),
	],
	// 类项从 get 开始，可能是异步函数，或者就是一般的属性名
	ClassItemStartInGet: [
		// getter
		[
			{ type: NOT_END_SYMBOL, value: "MethodGetterContent" },
		],
		// 一般属性
		[
			END_SYMBOLS["="],
			{ type: NOT_END_SYMBOL, value: "Expression" },
		],
		// 方法简写
		[
			END_SYMBOLS.START_BRACKET,
			{ type: NOT_END_SYMBOL, value: "FunctionParams" },
			END_SYMBOLS.END_BRACKET,
			{ type: NOT_END_SYMBOL, value: "Block" },
		],
		// 可为空，简写属性
		[
			END_SYMBOLS.NONE
		],
	],
	// 类项从 set 开始，可能是异步函数，或者就是一般的属性名
	ClassItemStartInSet: [
		// getter
		[
			{ type: NOT_END_SYMBOL, value: "MethodSetterContent" },
		],
		// 一般属性
		[
			END_SYMBOLS["="],
			{ type: NOT_END_SYMBOL, value: "Expression" },
		],
		// 方法简写
		[
			END_SYMBOLS.START_BRACKET,
			{ type: NOT_END_SYMBOL, value: "FunctionParams" },
			END_SYMBOLS.END_BRACKET,
			{ type: NOT_END_SYMBOL, value: "Block" },
		],
		// 可为空，简写属性
		[
			END_SYMBOLS.NONE
		],
	],
	// 类项从 async 开始，可能是异步函数，或者就是一般的属性名
	ClassItemStartInAsync: [
		// 异步函数
		[
			{ type: NOT_END_SYMBOL, value: "OptionalMutiplicationSign" },
			{ type: NOT_END_SYMBOL, value: "PropertyMethodContent" },
		],
		// 一般属性
		[
			END_SYMBOLS["="],
			{ type: NOT_END_SYMBOL, value: "Expression" },
		],
		// 方法简写
		[
			END_SYMBOLS.START_BRACKET,
			{ type: NOT_END_SYMBOL, value: "FunctionParams" },
			END_SYMBOLS.END_BRACKET,
			{ type: NOT_END_SYMBOL, value: "Block" },
		],
		// 可为空，简写属性
		[
			END_SYMBOLS.NONE
		],
	],
	// 右侧内容部分，可以为类方法或类属性定义,以及空
	ClassItemNormalMethodOrPropertyContent: [
		[
			{ type: NOT_END_SYMBOL, value: "OptionalMutiplicationSign" },
			END_SYMBOLS.START_BRACKET,
			{ type: NOT_END_SYMBOL, value: "FunctionParams" },
			END_SYMBOLS.END_BRACKET,
			{ type: NOT_END_SYMBOL, value: "Block" },
		],
		[
			END_SYMBOLS["="],
			{ type: NOT_END_SYMBOL, value: "Expression" },
		],
		[
			END_SYMBOLS.NONE,
		]
	],
	Program: [
		[
			{ type: NOT_END_SYMBOL, value: "Statements" },
		],
	],
	Statements: [
		[
			{ type: NOT_END_SYMBOL, value: "Statement" },
			{ type: NOT_END_SYMBOL, value: "Statements" },
		],
		[
			END_SYMBOLS.NONE,
		],
	],
	Statement: [
		// Expression
		[
			{ type: NOT_END_SYMBOL, value: "Expression" },
			{ type: NOT_END_SYMBOL, value: "OptionalDelimter" },
		],
		// VariableDeclaration
		[
			{ type: NOT_END_SYMBOL, value: "VariableDeclaration" },
			{ type: NOT_END_SYMBOL, value: "OptionalDelimter" },
		],
		// if 语句
		[
			{ type: NOT_END_SYMBOL, value: "If" },
			{ type: NOT_END_SYMBOL, value: "OptionalDelimter" },
		],
		// ImportDeclaration statement
		[
			END_SYMBOLS.IMPORT,
			{ type: NOT_END_SYMBOL, value: "ImportIdentify" },
			DATA_TYPE_SYMBOLS[TOKEN_TYPES.STRING_LITERAL],
			{ type: NOT_END_SYMBOL, value: "OptionalDelimter" },
		],
		// ExportDeclaration statement
		[
			END_SYMBOLS.EXPORT,
			{ type: NOT_END_SYMBOL, value: "ExportContent" },
			{ type: NOT_END_SYMBOL, value: "OptionalDelimter" },
		],
		[
			{ type: NOT_END_SYMBOL, value: "While" },
			{ type: NOT_END_SYMBOL, value: "OptionalDelimter" },
		],
		[
			{ type: NOT_END_SYMBOL, value: "Return" },
			{ type: NOT_END_SYMBOL, value: "OptionalDelimter" },
		],
		[
			END_SYMBOLS.BREAK,
			{ type: NOT_END_SYMBOL, value: "OptionalDelimter" },
		],
		[
			END_SYMBOLS.CONTINUE,
			{ type: NOT_END_SYMBOL, value: "OptionalDelimter" },
		],
		// for循环
		[
			END_SYMBOLS.FOR,
			{ type: NOT_END_SYMBOL, value: "ForContent" },
			{ type: NOT_END_SYMBOL, value: "OptionalDelimter" },
		],
		[
			END_SYMBOLS.TRY,
			{ type: NOT_END_SYMBOL, value: "Block" },
			{ type: NOT_END_SYMBOL, value: "OptionalCatchClause" },
			{ type: NOT_END_SYMBOL, value: "OptionalFinallyClause" },
			{ type: NOT_END_SYMBOL, value: "OptionalDelimter" },
		],
		// 代码块, 这里的代码块会和对象字面量表达式冲突，所以放在后面，故花括号开头的语句，视为代码块
		[
			{ type: NOT_END_SYMBOL, value: "Block" },
			{ type: NOT_END_SYMBOL, value: "OptionalDelimter" },
		],
		[
			{ type: NOT_END_SYMBOL, value: "Switch" },
			{ type: NOT_END_SYMBOL, value: "OptionalDelimter" },
		],
		[
			{ type: NOT_END_SYMBOL, value: "Throw" },
			{ type: NOT_END_SYMBOL, value: "OptionalDelimter" },
		],
		[
			END_SYMBOLS.DEBUGGER,
			{ type: NOT_END_SYMBOL, value: "OptionalDelimter" },
		],
		[
			{ type: NOT_END_SYMBOL, value: "With" },
			{ type: NOT_END_SYMBOL, value: "OptionalDelimter" },
		],
		// 空语句
		[
			{ type: NOT_END_SYMBOL, value: "OptionalDelimter" },
		],
	],
	// 标签语句
	LabeledStatement: [
		[
			END_SYMBOLS[TOKEN_TYPES.IDENTIFY],
			END_SYMBOLS[":"],
			{ type: NOT_END_SYMBOL, value: "Statement" },
		]
	],
	// 导入标识是可选的
	ImportIdentify: [
		[
			{ type: NOT_END_SYMBOL, value: "ImportSpecifiers" },
			END_SYMBOLS.FROM,
		],
		[
			END_SYMBOLS.NONE,
		],
	],
	// 导入描述符
	ImportSpecifiers: [
		// default import
		[
			{ type: NOT_END_SYMBOL, value: "ImportDefault" },
			{ type: NOT_END_SYMBOL, value: "OptionalComma" },
			{ type: NOT_END_SYMBOL, value: "Imports" },
		],
		[
			{ type: NOT_END_SYMBOL, value: "Imports" },
		],
		[
			END_SYMBOLS["*"],
			END_SYMBOLS.AS,
			END_SYMBOLS[TOKEN_TYPES.IDENTIFY],
		],
	],
	ImportDefault: [
		[
			END_SYMBOLS[TOKEN_TYPES.IDENTIFY],
		],
	],
	// 导入花括号部分（可选）
	Imports: [
		[
			{ type: NOT_END_SYMBOL, value: "ModuleSpecifiers" },
		],
		[
			END_SYMBOLS.NONE,
		],
	],
	ExportContent: [
		[
			END_SYMBOLS.DEFAULT,
			{ type: NOT_END_SYMBOL, value: "Term1_" },
		],
		[
			{ type: NOT_END_SYMBOL, value: "ModuleSpecifiers" },
			{ type: NOT_END_SYMBOL, value: "ExportRedirect" },
		],
		[
			{ type: NOT_END_SYMBOL, value: "VariableDeclaration" },
		],
		[
			{ type: NOT_END_SYMBOL, value: "FunctionExpression" },
		],
		[
			{ type: NOT_END_SYMBOL, value: "ClassExpression" },
		],
		[
			END_SYMBOLS["*"],
			{ type: NOT_END_SYMBOL, value: "OptionalExportAllExported" },
			END_SYMBOLS.FROM,
			DATA_TYPE_SYMBOLS[TOKEN_TYPES.STRING_LITERAL],
		],
	],
	OptionalExportAllExported: [
		[
			END_SYMBOLS.AS,
			END_SYMBOLS[TOKEN_TYPES.IDENTIFY],
		],
		[
			END_SYMBOLS.NONE,
		],
	],
	// 导出重定向 export {xx} from "xx";
	ExportRedirect: [
		[
			END_SYMBOLS.FROM,
			DATA_TYPE_SYMBOLS[TOKEN_TYPES.STRING_LITERAL],
		],
		[
			END_SYMBOLS.NONE,
		],
	],
	// 模块标识符（花括号内内容）
	ModuleSpecifiers: [
		[
			END_SYMBOLS.START_BLOCK,
			{ type: NOT_END_SYMBOL, value: "ModuleSpecifiersItems" },
			END_SYMBOLS.END_BLOCK,
		],
	],
	ModuleSpecifiersItems: [
		[
			{ type: NOT_END_SYMBOL, value: "ModuleSpecifiersItem" },
			{ type: NOT_END_SYMBOL, value: "ModuleSpecifiersItems" },
		],
		[
			END_SYMBOLS.NONE,
		],
	],
	ModuleSpecifiersItem: [
		[
			END_SYMBOLS[TOKEN_TYPES.IDENTIFY],
			{ type: NOT_END_SYMBOL, value: "OptionalModuleAlias" },
			{ type: NOT_END_SYMBOL, value: "OptionalComma" },
		],
	],
	// 可选的模块别名
	OptionalModuleAlias: [
		[
			END_SYMBOLS.AS,
			END_SYMBOLS[TOKEN_TYPES.IDENTIFY],
		],
		[
			END_SYMBOLS.NONE,
		],
	],
};

const transformers = (() => {
	const {
		OptionalComma,
		OptionalIdentify,

		Block,

		VariableDeclaration,
		VariableDeclarator,
		VariableDeclaratorHasPrefixComma,
		VariableInitial,

		DefaultValue,

		ObjectPattern,
		ObjectPatternItem,
		ObjectPatternOptionalRename,
		ObjectPatternOptionalDefaultValue,

		ArrayPattern,
		ArrayPatternItem,

		FunctionExpression,
		FunctionParam,
		AsyncFunction,
		AsyncFunctionContent,

		If,
		Else,

		While,

		Return,
		Throw,
		With,

		ForContent,

		ForInContent,
		ForOfContent,

		OptionalCatchClause,
		OptionalCatchParam,
		OptionalFinallyClause,

		Switch,
		SwitchCase,

		Program,
		Statements,
		Statement,
		LabeledStatement,

		ImportIdentify,
		ImportSpecifiers,
		ImportDefault,
		ExportContent,
		OptionalExportAllExported,
		ExportRedirect,
		ModuleSpecifiers,
		ModuleSpecifiersItem,
		OptionalModuleAlias,
		ClassItemContent,
		ClassItemNormalMethodOrPropertyContent,
		ClassItemStartInGet,
		ClassItemStartInSet,
		ClassItemStartInAsync,
		ClassItemStartInStatic,
		ClassItem,
		ClassContent,
		ClassBody,
		OptionalSuperClass,
		ClassExpression,

		ObjectLiteral,
		ArrayLiteral,
		ObjectProperty,
		ObjectPropertyContent,
		MethodGetterContent,
		MethodSetterContent,
		PropertyMethodContent,
		ObjectPropertyStartInAsync,
		ObjectPropertyStartInGet,
		ObjectPropertyStartInSet,

		ArrayItem,
		ArrowFunctionContent,

		Literal,

		TemplateLiteral,
		TemplateStringElement,

		Expression,
		Expr,
		Term1_,
		Term2_,
		Term3_,
		Term4_,
		Term5_,
		Term6_,
		Term7_,
		Term8_,
		Term9_,
		Term10_,
		Term11_,
		Term12_,
		Term13_,
		Term14_,
		Term15_,
		Term16_,
		TermWithOptionalTagTemplate_,
		Term17_,

		Term3,
		Term18,
		OptionalChainingAttributeName,
		OptionalFunctionCallParams,
	} = not_end_symbols;

	// 标准化转换计算表达式
	const normalizeTransformers = {
		"()": ({ left, right }) => ({
			type: "CallExpression",
			callee: left,
			arguments: right || [],
			optional: false,
		}),
		"?.()": ({ left, right }) => ({
			type: "CallExpression",
			callee: left,
			arguments: right || [],
			optional: true,
		}),
		".": ({ left, right, operator: { computed = false } }) => {
			// 如果左侧直接就是 value 为 import 或者 new 的 Identify, 那么就是 MetaProperty（Identify 有.value 属性，expression 无）
			// import.meta 处理
			if (left.value === "import") {
				if (right.value !== "meta") {
					console.log("The only valid meta property for import is 'import.meta'");
					throw new Error("parse failed");
				}
				return {
					type: "MetaProperty",
					meta: left,
					property: right,
				}
			}
			// new.target
			if (left.value === NEW_POINT_TARGET_IDENTIFY) {
				if (right.value !== "target") {
					console.log("The only valid meta property for import is 'import.meta'");
					throw new Error("parse failed");
				}
				return {
					type: "MetaProperty",
					meta: {
						type: "Identifier",
						name: "new",
					},
					property: right,
				}
			}
			return {
				type: "MemberExpression",
				object: left,
				property: right,
				computed,
				optional: false,
			}
		},
		"?.": ({ left, right, operator: { computed = false } }) => ({
			type: "MemberExpression",
			object: left,
			property: right,
			computed,
			optional: true,
		}),
		"new": ({ argument }) => {
			// new 的结合性
			// 如果 new 右侧存在函数调用表达式，则最左侧的表达式视为 new 的调用
			let left = argument;
			// 最后一个函数调用表达式
			let endCallExpression = null;
			while (true) {
				// 遇到最高优先级就退出，因为没有更高优先级
				if (left.highPriority) {
					break;
				}
				// 遇到子 new 退出循环，因为没有更高优先级
				if (left.type === "NewExpression") {
					break;
				}
				if (left.type === "CallExpression") {
					endCallExpression = left;
				}
				left = left.callee || left.object;
				// 如果没有左侧了，中断循环 
				if (!left) {
					break;
				}
			}
			if (endCallExpression) {
				endCallExpression.type = "NewExpression";
				delete endCallExpression.optional;
				return argument;
			} else {
				if (argument.highPriority) {
					return {
						type: "NewExpression",
						callee: argument,
						arguments: [],
					}
				}
				if (argument.type === "CallExpression") {
					argument.type = "NewExpression";
					delete argument.optional;
					return argument;
				} else {
					return {
						type: "NewExpression",
						callee: argument,
						arguments: [],
					}
				}
			}
		},
	};
	[
		"=",
		"+=",
		"-=",
		"**=",
		"*=",
		"/=",
		"%=",
		"<<=",
		">>=",
		">>>=",
		"&=",
		"^=",
		"|=",
		"&&=",
		"||=",
		"??=",
	].forEach(sym => {
		normalizeTransformers[sym] = (binaryExpression) => {
			return {
				...binaryExpression,
				type: "AssignmentExpression",
			};
		}
	});
	["&&", "||", "??"].forEach(sym => {
		normalizeTransformers[sym] = (binaryExpression) => {
			return {
				...binaryExpression,
				type: "LogicalExpression",
			};
		}
	});
	function normalizeComputeExpression(expression) {
		const transform = normalizeTransformers[expression.operator.value];
		const result = transform ? transform(expression) : expression;
		// 如果还有 operator 属性的话，从里面取出实际的运算符字符串作为 operator, 因为不再需要一些额外标识
		result.operator && (result.operator = result.operator.value);
		return result;
	}

	function createSingleCalculateSymbolHandler(associative = "left") {
		return input => {
			const first = input[0];
			if (input.length > 1) {
				// 超过两个，则是多个同优先级运算符
				if (input[1].length > 2) {
					// 多个同优先级运算符左结合
					if (associative === "left") {
						return singleCalculateSymbolHandler([
							normalizeComputeExpression({
								type: "BinaryExpression",
								operator: input[1][0],
								left: input[0],
								right: input[1][1],
							}),
							input[1][2],
						]);
					}
					// 多个同优先级运算符右结合
					if (associative === "right") {
						// 拍平产生式
						const tokens = input.flat(Number.MAX_SAFE_INTEGER);
						let result = tokens.pop();
						while (tokens.length >= 2) {
							// 每次取出两个，分别是运算符和左侧表达式
							let [operator, leftExpression] = [tokens.pop(), tokens.pop()];
							result = normalizeComputeExpression({
								type: "BinaryExpression",
								operator,
								left: leftExpression,
								right: result,
							});
						}
						return result;
					}
				} else {
					// 单个，直接返回
					return normalizeComputeExpression({
						type: "BinaryExpression",
						operator: input[1][0],
						left: input[0],
						right: input[1][1],
					})
				}
			} else {
				return first;
			}
		};
	}

	// 左结合二进制运算
	const singleCalculateSymbolHandler = createSingleCalculateSymbolHandler("left");
	// 右结合二进制运算
	const singleCalculateSymbolHandlerRightAssociative = createSingleCalculateSymbolHandler("right");

	// 运算符处理,包括三元运算符
	const conditionHandler = input => {
		if (input?.[1]?.type === "ConditionalExpression") {
			return {
				test: input[0],
				...input[1],
			}
		} else {
			return singleCalculateSymbolHandler(input);
		}
	}

	// 三元运算符右侧部分处理
	const conditionCalculateSymbolHandler = input => {
		const index = input.findIndex(v => v.value === ":");

		const thenExpression = input.slice(1, index);
		const elseExpression = input.slice(index + 1);
		// 后续需要解析子三元表达式
		return {
			type: "ConditionalExpression",
			// 如果 then 表达式长度大于1 则是子 三元表达式
			consequent: thenExpression.length > 1 ? conditionHandler(thenExpression) : thenExpression[0],
			alternate: elseExpression.length > 1 ? conditionHandler(elseExpression) : elseExpression[0],
		};
	};

	// 取出所有前置运算符
	function getComputeSymbols(input) {
		let current = input;
		let symbols = [];
		while (current.length > 1) {
			symbols.push(current[0]);
			current = current[1];
		}
		current && (symbols.push(current));
		return symbols;
	}

	// 左侧运算符的运算处理
	const leftComputeHandler = input => {
		if (input.length > 1) {
			// 取出所有运算符
			const symbols = getComputeSymbols(input[0]);
			let result = input[1];

			// 从右到左结合运算符
			while (symbols.length > 0) {
				const operator = symbols.pop();
				if (operator.value === "await") {
					result = {
						type: "AwaitExpression",
						argument: result,
					};
				} else {
					// 标准化转换，因为这里 operator.value 可能是 new，如果是的话就需要转换
					result = normalizeComputeExpression({
						type: ["++", "--"].includes(operator.value) ? "UpdateExpression" : "UnaryExpression",
						prefix: true,
						operator,
						argument: result,
					});
				}
			}

			return result;
		} else {
			return input[0];
		}
	}

	const termsAndBasicTypesTransformers = [
		[ArrayItem[0], input => input[0]],
		// 展开操作符
		[ArrayItem[1], input => ({
			type: "SpreadElement",
			argument: input[1],
		})],
		// empty
		[ArrayItem[2], () => null],
		[ArrayLiteral[0], input => ({
			type: "ArrayExpression",
			// 截取内容部分
			elements: input.slice(1, input.length - 1),
		})],
		// 普通值语法
		[ObjectPropertyContent[0], input => ({ method: false, value: input[1] })],
		// 函数简写法
		[ObjectPropertyContent[1], input => ({
			method: true,
			value: {
				type: "FunctionExpression",
				"async": false,
				generator: false,
				params: input.slice(1, input.length - 2),
				body: input[input.length - 1],
			}
		})],
		// 标识符作为key
		[ObjectProperty[0], input => {
			// 如果存在值，正常处理
			if (input[1] && input[1]?.value !== ",") {
				return {
					type: "Property",
					kind: "init",
					method: input[1].method,
					computed: false,
					key: input[0],
					value: input[1].value,
				}
			}else {
				// 不存在值，则是简写属性
				return {
					type: "Property",
					kind: "init",
					method: false,
					computed: false,
					key: input[0],
					value: input[0],
				}
			}
		}],
		// 字符串作为key
		[ObjectProperty[1], input => {
			return {
				type: "Property",
				kind: "init",
				key: input[0],
				method: input[1].method,
				value: input[1].value,
			}
		}],
		// 计算出的key
		[ObjectProperty[2], input => {
			return {
				type: "Property",
				kind: "init",
				key: input[1],
				method: input[3].method,
				value: input[3].value,
				computed: true,
			}
		}],
		[ObjectProperty[3], input => ({
			type: "Property",
			kind: "init",
			key: input[0],
			method: input[1].method,
			value: input[1].value,
		})],
		[ObjectProperty[4], input => ({
			type: "Property",
			kind: "init",
			// boolean 作为 属性名
			key: {
				type: "Identifier",
				name: input[0].raw,
			},
			method: input[1].method,
			value: input[1].value,
		})],
		[ObjectProperty[5], input => ({
			type: "Property",
			kind: "init",
			// null 作为 属性名
			key: {
				type: "Identifier",
				name: input[0].raw,
			},
			method: input[1].method,
			value: input[1].value,
		})],
		// 展开操作符
		[ObjectProperty[6], input => ({
			type: "SpreadElement",
			argument: input[1],
		})],
		[ObjectLiteral[0], input => ({
			type: "ObjectExpression",
			// 截取内容部分
			properties: input.slice(1, input.length - 1),
		})],
		// 表达式以及优先级计算
		[Expression[0], input => {
			const first = input[0];
			if (input.length < 3) {
				return first;
			}
			const expressions = [first];
			while (input.length >= 3) {
				// 取1索引,索引1是表达式,索引0是,
				const extraExpression = input.splice(1, 2)[1];
				expressions.push(extraExpression);
			}
			return {
				type: "SequenceExpression",
				expressions,
			};
		}],
		[ArrowFunctionContent[0], input => input[1]],
		// 可能是括号内的表达式，也可能是带括号的箭头函数
		[Expr[1], input => {
			if (input?.[input.length - 1].value === ")") {
				// 普通表达式
				return {
					// 赋予高优先级，防止和 new 结合出现问题
					highPriority: true,
					...input[1],
				};
			} else {
				// 箭头函数特殊处理
				return {
					type: "ArrowFunctionExpression",
					params: input.slice(1, input.length - 2),
					body: input[input.length - 1],
				}
			}
		}],
		// 可能是标识符，也可能是不带括号的箭头函数
		[Literal[0], input => {
			if (input[1]) {
				return {
					type: "ArrowFunctionExpression",
					params: [input[0]],
					body: input[1],
				}
			} else {
				return input[0];
			}
		}],
		// 模板字符串
		[TemplateLiteral[0], input => {
			const content = input.slice(1, input.length - 1);

			const quasis = [];
			const expressions = [];

			// 创建空模板字符
			const createNoneTemplateString = () => ({
				type: "TemplateElement",
				value: {
					raw: "",
					cooked: "",
				},
				tail: false,
			});

			// 上一个是否是表达式，如果是的话，下面需要在两个相连的表达式之间插入一个空模板字符
			let preIsExpression = false;

			// 如果模板字符串为空或者第一个是表达式，在quasis最前面插入一个空的模板字符
			if (content.length === 0 || content[0].type !== TOKEN_TYPES.TEMPLATE_STRING) {
				quasis.push(createNoneTemplateString());
			}

			content.forEach(item => {
				if (item?.type === TOKEN_TYPES.TEMPLATE_STRING) {
					quasis.push({
						type: "TemplateElement",
						value: {
							raw: item.raw,
							cooked: item.value,
						},
						tail: false,
					});
					preIsExpression = false;
				} else {
					if (preIsExpression) {
						quasis.push(createNoneTemplateString());
					}
					expressions.push(item);
					preIsExpression = true;
				}
			});

			// 如果长度相同，在最后添加一个空模板字符
			if (expressions.length === quasis.length) {
				quasis.push(createNoneTemplateString());
			}
			// 尾部 quasis 做个标记
			quasis[quasis.length - 1].tail = true;

			return {
				type: "TemplateLiteral",
				quasis,
				expressions,
			};
		}],
		[TemplateStringElement[1], input => (input[2])],
		[Term1_[0], singleCalculateSymbolHandlerRightAssociative],
		// generator
		[Term1_[1], input => ({
			type: "YieldExpression",
			delegate: input[1]?.value === "*" ? true : false,
			argument: input.length === 3 ? input[2] : (input.length === 2 ? input[1] : null),
		})],
		[Term2_[0], conditionHandler],
		[Term3[0], conditionCalculateSymbolHandler],
		[Term3_[0], singleCalculateSymbolHandler],
		[Term4_[0], singleCalculateSymbolHandler],
		[Term5_[0], singleCalculateSymbolHandler],
		[Term6_[0], singleCalculateSymbolHandler],
		[Term7_[0], singleCalculateSymbolHandler],
		[Term8_[0], singleCalculateSymbolHandler],
		[Term9_[0], singleCalculateSymbolHandler],
		[Term10_[0], singleCalculateSymbolHandler],
		[Term11_[0], singleCalculateSymbolHandler],
		[Term12_[0], singleCalculateSymbolHandler],
		[Term13_[0], singleCalculateSymbolHandlerRightAssociative],
		[Term14_[0], leftComputeHandler],
		[Term15_[0], input => {
			if (input[1]) {
				// 正常的更新表达式
				return normalizeComputeExpression({
					type: "UpdateExpression",
					prefix: false,
					operator: input[1],
					argument: input[0],
				});
			} else {
				return input[0];
			}
		}],
		[Term16_[0], input => {
			if (input[1]) {
				// 拍平
				const patterns = input.flat(Number.MAX_SAFE_INTEGER);

				let result = {
					type: "TaggedTemplateExpression",
					tag: patterns.shift(),
					quasi: patterns.shift(),
				}
				// 左结合表达式
				while (patterns.length > 0) {
					result = {
						type: "TaggedTemplateExpression",
						tag: result,
						quasi: patterns.shift(),
					}
				}
				return result;
			} else {
				return input[0];
			}
		}],
		[TermWithOptionalTagTemplate_[0], leftComputeHandler],
		[Term17_[0], singleCalculateSymbolHandler],
		// 计算属性名, 这里暂时也视为.运算符
		[Term18[1], input => {
			const result = [
				{
					type: TOKEN_TYPES.SINGLE_SYMBOL,
					// 计算属性标记
					computed: true,
					value: ".",
				},
				input[1],
			];
			input[3] && result.push(input[3]);
			return result;
		}],
		[Term18[2], input => {
			if (input?.[1]?.type === "OptionalCallExpression") {
				const result = [
					{
						type: TOKEN_TYPES.MUTIPLE_SYMBOL,
						value: "?.()",
					},
					(input[1].params || null),
				];
				input[2] && result.push(input[2]);
				return result;
			}
			// 计算属性名处理
			if (input?.[1]?.type === "OptionalComputeAttributeExpression") {
				input[0].computed = true;
				input[1] = input[1].expression;
			}
			return input;
		}],
		// 函数调用
		[Term18[3], input => {
			// 不带参数
			if (input[1].value === ")") {
				const result = [
					{
						type: TOKEN_TYPES.MUTIPLE_SYMBOL,
						value: "()",
					},
					null,
				];
				input[2] && result.push(input[2]);
				return result;
			}
			// 带参数
			const result = [
				{
					type: TOKEN_TYPES.MUTIPLE_SYMBOL,
					value: "()",
				},
				input[1],
			];
			input[3] && result.push(input[3]);
			return result;
		}],
		[OptionalFunctionCallParams[0], input=> input.flat(Number.MAX_SAFE_INTEGER).filter(item=> item?.value !== ",")],
		// 可选链计算属性名
		[OptionalChainingAttributeName[1], input => ({
			type: "OptionalComputeAttributeExpression",
			expression: input[1],
		})],
		// 可选链函数调用
		[OptionalChainingAttributeName[2], input => ({
			// 这个标识的临时的
			type: "OptionalCallExpression",
			params: input.slice(1, input.length - 1)[0],
		})],
	];

	// 有效属性遍历相关的转换器，包括对象和 class 的许多部分
	const validProperyTraversalRelatedTransformers = [
		// getter setter
		...(() => {
			// 如果是字符和数字直接作为key，否则视为标识符
			const transformKey = keyToken => {
				// 这三个如果作为 key 视为标识符，其他的直接返回
				if([false, true, null].includes(keyToken.value)) {
					return { type: "Identifier", name: String(keyToken.value) };
				}else {
					return keyToken;
				}
			};

			// 创建 FunctionExpression
			const createFunctionExpression = (params, body) => {
				return {
					type: "FunctionExpression",
					"async": false,
					generator: false,
					params,
					body,
				}
			};

			// 对象方法主体转换器
			const createObjectFunctionContentTransformer = (name)=> input=> ({
				type: "Property",
				kind: "init",
				method: false,
				computed: false,
				key: {
					type: "Identifier",
					name,
				},
				value: createFunctionExpression(input.slice(1, input.length - 2), input[input.length - 1]),
			});

			// 对象 getter setter
			// 如果是一般的单个字面量作为名字，那么直接取
			const normalGetterTransformer = input => ({ isMethod: true, key: transformKey(input[0]), value: createFunctionExpression([], input[3]) });
			const normalSetterTransformer = input => ({ isMethod: true, key: transformKey(input[0]), value: createFunctionExpression([input[2]], input[4]) });
			// 如果计算属性那么取索引为2的
			const computedGetterTransformer = input => ({ isMethod: true, isComputed: true, key: input[1], value: createFunctionExpression([], input[5]) });
			const computedSetterTransformer = input => ({ isMethod: true, isComputed: true, key: input[1], value: createFunctionExpression([input[4]], input[6]) });
			// 根据 production 获取 transformer
			const getTransformer = (production, type) => {
				// 索引1为 Expression 的，使用 computedHandler
				if (production?.[1]?.value === "Expression") {
					return ({ getter: computedGetterTransformer, setter: computedSetterTransformer })[type];
				} else {
					return ({ getter: normalGetterTransformer, setter: normalSetterTransformer })[type];
				}
			};
			// set, get 开头的内容处理, isMethod 代表是否是 setter, getter
			const objectStartInSetOrGetTransformer = ([{ value: kind }, v]) => {
				// 如果存在值，正常处理
				if(v && v?.value !== ",") {
					const { isMethod, isComputed, key, value } = v;
					return {
						type: "Property",
						kind: isMethod ? kind : "init",
						method: isMethod ? true : false,
						computed: isComputed ? true : false,
						key,
						value,
					}
				}else {
					// 不存在，则是 set 或 get 的简写属性
					return {
						type: "Property",
						kind: "init",
						method: false,
						computed: false,
						key: {
							type: "Identifier",
							name: kind,
						},
						value: {
							type: "Identifier",
							name: kind,
						},
					};
				}
			};

			// 对象方法 async generator 的函数主体部分
			// 如果是一般的单个字面量作为名字，那么直接取
			const normalMethodTransformer = input => ({ isMethod: true, key: transformKey(input[0]), value: createFunctionExpression(input.slice(2, input.lenth - 2), input[input.length - 1]) });
			// 如果计算属性那么取索引为2的
			const computedMethodTransformer = input => ({ isMethod: true, isComputed: true, key: input[1], value: createFunctionExpression(input.slice(4, input.lenth - 2), input[input.length - 1]) });
			// 根据产生式选择 Transformer
			const getMethodTransformer = (production) => (production?.[1]?.value === "Expression" ? computedMethodTransformer : normalMethodTransformer);

			// 类方法主体转换器
			const createClassFunctionContentTransformer = (name)=> input=> ({
				type: "MethodDefinition",
				kind: "method",
				computed: false,
				key: {
					type: "Identifier",
					name,
				},
				value: createFunctionExpression(input.slice(1, input.length - 2), input[input.length - 1]),
			});

			// class 的 setter 和 getter 转换，仅和 object 的 type 不同, isMethod 仍代表是否是 setter, getter
			const classItemStartInSetOrGetTransformer = ([{ value: kind }, v]) => {
				if(v) {
					const { isProperty, isMethod, isComputed, key, value } = v;
					return {
						type: isProperty ? "PropertyDefinition" : "MethodDefinition",
						static: false,
						kind: isMethod ? kind : "method",
						computed: isComputed ? true : false,
						key,
						value,
					}
				}else {
					return {
						type: "PropertyDefinition",
						computed: false,
						static: false,
						key: {
							type: "Identifier",
							name: kind,
						},
						value: null,
					};
				}
			};
			
			return [
				// object property setter, getter
				...MethodGetterContent.map(production => ([production, getTransformer(production, "getter")])),
				...MethodSetterContent.map(production => ([production, getTransformer(production, "setter")])),
				// 1 是普通属性，需要处理为 { isMethod, isComputed, key, value } 的格式便于给 objectSetOrGetTransformer 继续处理区分
				[ObjectPropertyStartInGet[1], input=> ({
					key: {
						type: "Identifier",
						name: "get",
					}, 
					value: input[1],
				})],
				[ObjectPropertyStartInGet[2], createObjectFunctionContentTransformer("get")],
				[ObjectPropertyStartInSet[1], input=> ({
					key: {
						type: "Identifier",
						name: "set",
					}, 
					value: input[1],
				})],
				[ObjectPropertyStartInSet[2], createObjectFunctionContentTransformer("set")],
				[ObjectProperty[7], objectStartInSetOrGetTransformer],
				[ObjectProperty[8], objectStartInSetOrGetTransformer],
				// object async, generator
				...PropertyMethodContent.map(production => ([production, getMethodTransformer(production)])),
				// ObjectProperty handler
				[ObjectPropertyStartInAsync[0], input=> {
					// 异步生成器函数
					if(input[0]?.value === "*") {
						return {
							type: "Property",
							kind: "init",
							method: true,
							computed: input[1].isComputed,
							key: input[1].key,
							value: {
								...input[1].value,
								"async": true,
								generator: true,
							},
						}
					}else {
						// 异步函数
						return {
							type: "Property",
							kind: "init",
							method: true,
							computed: input[0].isComputed,
							key: input[0].key,
							value: {
								...input[0].value,
								"async": true,
								generator: false,
							},
						};
					}
				}],
				[ObjectPropertyStartInAsync[1], input=> ({
					type: "Property",
					kind: "init",
					method: false,
					computed: false,
					key: {
						type: "Identifier",
						name: "async",
					},
					value: input[1],
				})],
				[ObjectPropertyStartInAsync[2], createObjectFunctionContentTransformer("async")],
				[ObjectProperty[9], input=> {
					// 如果有值则直接返回，没有的话则是第四种形态，简写属性
					if(input[1] && input[1]?.value !== ",") {
						return input[1];
					}else {
						return {
							type: "Property",
							kind: "init",
							method: false,
							computed: false,
							key: {
								type: "Identifier",
								name: "async",
							},
							value: {
								type: "Identifier",
								name: "async",
							},
						};
					}
				}],
				// 生成器函数
				[ObjectProperty[10], input => ({
					type: "Property",
					kind: "init",
					method: true,
					computed: input[1].isComputed,
					key: input[1].key,
					value: {
						...input[1].value,
						"async": true,
						generator: false,
					},
				})],

				// class 相关所有的
				// class setter, getter
				[ClassItemContent[0], classItemStartInSetOrGetTransformer],
				[ClassItemContent[1], classItemStartInSetOrGetTransformer],
				// 1 是普通属性，需要处理为 { isMethod, isComputed, key, value } 的格式便于给 classItemStartInSetOrGetTransformer 继续处理区分
				[ClassItemStartInGet[1], input=> ({
					isProperty: true,
					key: {
						type: "Identifier",
						name: "get",
					}, 
					value: input[1],
				})],
				[ClassItemStartInGet[2], createClassFunctionContentTransformer("get")],
				// 1 是普通属性，需要处理为 { isMethod, isComputed, key, value } 的格式便于给 classItemStartInSetOrGetTransformer 继续处理区分
				[ClassItemStartInSet[1], input=> ({
					isProperty: true,
					key: {
						type: "Identifier",
						name: "set",
					}, 
					value: input[1],
				})],
				[ClassItemStartInSet[2], createClassFunctionContentTransformer("set")],
				[ClassItemStartInAsync[0], input=> {
					// 异步生成器函数
					if(input[0]?.value === "*") {
						return {
							type: "MethodDefinition",
							kind: "method",
							static: false,
							computed: input[1].isComputed ? true : false,
							key: input[1].key,
							value: {
								...input[1].value,
								"async": true,
								generator: true,
							},
						}
					}else {
						// 异步函数
						return {
							type: "MethodDefinition",
							kind: "method",
							static: false,
							computed: input[0].isComputed ? true : false,
							key: input[0].key,
							value: {
								...input[0].value,
								"async": true,
								generator: false,
							},
						};
					}
				}],
				[ClassItemStartInAsync[1], input=> ({
					type: "PropertyDefinition",
					static: false,
					computed: false,
					key: {
						type: "Identifier",
						name: "async",
					},
					value: input[1],
				})],
				[ClassItemStartInAsync[2], createClassFunctionContentTransformer("async")],
				// 异步函数
				[ClassItemContent[2], input=> {
					// 如果有值则直接返回，没有的话则就没有初始化，因此无value
					if(input[1] && input[1]?.value !== ",") {
						return input[1];
					}else {
						return {
							type: "PropertyDefinition",
							computed: false,
							static: false,
							key: {
								type: "Identifier",
								name: "async",
							},
							value: null,
						};
					}
				}],
				// 生成器函数
				[ClassItemContent[3], ([,{ isComputed, key, value }])=> ({
					type: "MethodDefinition",
					kind: "method",
					static: false,
					computed: isComputed ? true : false,
					key,
					value: {
						...value,
						generator: true,
					},
				})],
				// static block
				[ClassItemContent[4], input=> ({...input[0], type: "StaticBlock"})],
				[ClassItemNormalMethodOrPropertyContent[0], input=> {
					// 检测是否是生成器
					let paramsStartIndex = input[0]?.value === "*" ? 2 : 1;
					return {
						isProperty: false,
						value: {
							...createFunctionExpression(input.slice(paramsStartIndex, input.length - 2), input[input.length - 1]),
							generator: true,
							async: false,
						},
					}
				}],
				[ClassItemNormalMethodOrPropertyContent[1], input=> ({
					isProperty: true,
					value: input[1],
				})],
				// 从索引5个开始都是一般属性的声明
				...ClassItemContent.slice(5).map(production=> {
					return [production, (input)=> {
						let key;
						let value;
						let isProperty;
						let computed = false;
						// 如果长度大于 3 (3：无值，4：有值)， 就是计算属性名
						if(input.length >= 3) {
							computed = true;
							key = input[1];
							// 如果有值，则正常处理
							if(input[3]) {
								value = input[3].value;
								isProperty = input[3].isProperty;
							}else {
								// 没有值，是计算属性名属性声明，未初始化
								value = null;
								isProperty = true;
							}
						}else {
							// 一般属性名
							key = input[0];
							// 如果有值，则正常处理
							if(input[1]) {
								value = input[1].value;
								isProperty = input[1].isProperty;
							}else {
								// 没有值，是属性声明，未初始化
								value = null;
								isProperty = true;
							}
						}
						if(isProperty) {
							return {
								type: "PropertyDefinition",
								static: false,
								computed,
								key: transformKey(key),
								value,
							}
						}else {
							return {
								type: "MethodDefinition",
								kind: "method",
								static: false,
								computed,
								key: transformKey(key),
								value,
							}
						}
					}];
				}),
				[ClassItem[0], input=> input[0]],
				[ClassItem[1], input=> {
					// 如果有值则直接返回，没有的话则就没有初始化，因此无 value
					if(input[1] && input[1]?.value !== ";") {
						return input[1];
					}else {
						return {
							type: "PropertyDefinition",
							computed: false,
							static: false,
							key: {
								type: "Identifier",
								name: "static",
							},
							value: null,
						};
					}
				}],
				[ClassItemStartInStatic[0], ([classItem])=> (classItem.type === "StaticBlock" ? classItem : { ...classItem, static: true})],
				[ClassItemStartInStatic[1], input=> ({
					type: "PropertyDefinition",
					static: false,
					computed: false,
					key: {
						type: "Identifier",
						name: "static",
					},
					value: input[1],
				})],
				[ClassItemStartInStatic[2], createClassFunctionContentTransformer("static")],
				[ClassBody[0], input=> ({
					type: "ClassBody",
					body: input.slice(1, input.length - 1),
				})],
				// 这里的 type superClass 只是一个标记
				[OptionalSuperClass[0], input=> ({ type: "superClass", value: input[1] })],
				[ClassContent[0], input=> {
					if(input.length === 3) {
						return {
							type: "ClassExpression",
							id: input[0],
							superClass: input[1].value,
							body: input[2],
						};
					}else {
						return {
							type: "ClassExpression",
							id: input[0],
							superClass: null,
							body: input[1],
						};
					}
				}],
				[ClassContent[1], input=> {
					if(input[1]) {
						return {
							type: "ClassExpression",
							id: null,
							superClass: input[0].value,
							body: input[1],
						};
					}else {
						return {
							type: "ClassExpression",
							id: null,
							superClass: null,
							body: input[0],
						};
					}
				}],
				[ClassExpression[0], input=> input[1]],
			];
		})(),
	]

	return new Map([
		...termsAndBasicTypesTransformers,
		...validProperyTraversalRelatedTransformers,
		[OptionalComma[0], input => (input[0])],
		[OptionalIdentify[0], input => (input[0])],

		[Block[0], input => ({
			type: "BlockStatement",
			body: input.slice(1, input.length - 1),
		})],

		[VariableDeclaration[0], input => ({
			type: "VariableDeclaration",
			kind: input[0].value,
			declarations: input.slice(1),
		})],
		[VariableDeclarator[0], input => ({
			type: "VariableDeclarator",
			id: input[0],
			init: input[1],
		})],
		[VariableDeclaratorHasPrefixComma[0], input => input[1]],
		[VariableInitial[0], input => (input[1])],
		// 默认值
		[DefaultValue[0], input => (input[1])],
		// 解构的重命名
		[ObjectPatternOptionalRename[0], input => ({
			type: "DestructureRename",
			value: input[1],
		})],
		// 解构默认值
		[ObjectPatternOptionalDefaultValue[0], input => ({
			type: "DestructureDefaultValue",
			value: input[1],
		})],
		// 解构中的单项
		[ObjectPatternItem[0], input => {
			const result = {
				type: "Property",
				key: input[0],
			}

			input.slice(1).forEach(item => {
				if (item.type === "DestructureRename") {
					result.value = item.value;
				}
				if (item.type === "DestructureDefaultValue") {
					// 重命名
					if (result.value) {
						result.value = {
							type: "AssignmentPattern",
							left: result.value,
							right: item.value,
						}
					} else {
						// 不重命名
						result.value = {
							type: "AssignmentPattern",
							left: result.key,
							right: item.value,
						}
					}
				}
			});

			// 如果重命名和初始化都不存在，就设置为标识符同样的value
			!result.value && (result.value = result.key);

			return result;
		}],
		// 剩余参数
		[ObjectPatternItem[1], input => ({
			type: "RestElement",
			argument: input[1],
		})],
		[ObjectPattern[0], input => ({
			type: "ObjectPattern",
			properties: input.slice(1, input.length - 1),
		})],
		// 正常元素处理（去除剩余参数）
		...ArrayPatternItem.slice(0, ArrayPatternItem.length - 2).map(ArrayPatternItemProduction => [ArrayPatternItemProduction, input => {
			// 索引1是逗号或者不存在，就没有默认值
			if (input?.[1]?.value === "," || !input[1]) {
				return input[0];
			} else {
				return {
					type: "AssignmentPattern",
					left: input[0],
					right: input[1],
				};
			}
		}]
		),
		// 剩余参数处理
		[ArrayPatternItem[ArrayPatternItem.length - 2], input => ({
			type: "RestElement",
			argument: input[1],
		})],
		// 逗号处理，空解构
		[ArrayPatternItem[ArrayPatternItem.length - 1], () => null],
		[ArrayPattern[0], input => ({
			type: "ArrayPattern",
			elements: input.slice(1, input.length - 1),
		})],
		[FunctionExpression[0], input => {
			const result = {
				type: "FunctionExpression",
				body: input[input.length - 1],
				id: null,
				generator: false,
			};
			// 参数开始括号的索引
			let bracketStartIndex = input.findIndex(v => v?.value === "(");

			// 如果括号在第二个，则是匿名函数
			if (bracketStartIndex === 1) {
				result.id = null;
			} else if (bracketStartIndex === 2) {
				// 括号在第三个，则可能是具名函数或者是匿名生成器函数
				if (input[1]?.value === "*") {
					result.generator = true;
				} else {
					result.id = input[1];
				}
			} else if (bracketStartIndex === 3) {
				// 括号在第四个，则是具名生成器函数
				result.generator = true;
				result.id = input[2];
			}

			result.params = input.slice(bracketStartIndex + 1, input.length - 2);
			return result;
		}],
		[FunctionParam[0], input => {
			// 如果索引1值为空, 或者直接没有索引1，即没有默认值
			if (input?.[1]?.value === "," || !(input?.[1])) {
				return input[0];
			} else {
				return {
					type: "AssignmentPattern",
					left: input[0],
					right: input[1],
				};
			}
		}],
		// 函数剩余参数
		[FunctionParam[1], input => ({
			type: "RestElement",
			argument: input[1],
		})],
		[AsyncFunction[0], input => ({
			"async": true,
			...input[1],
		})],
		// 无括号异步箭头函数
		[AsyncFunctionContent[1], input => {
			if (input[1]) {
				return {
					type: "ArrowFunctionExpression",
					params: input[0],
					body: input[1],
				}
			}
			// 如果没有索引1，则箭头函数没有主体，语法错误
			console.log("syntax error, arrow Function don's has body");
			throw new Error("parse failed");
		}],
		// 带括号异步箭头函数
		[AsyncFunctionContent[2], input => {
			if (input[input.length - 1]?.value !== ")") {
				return {
					type: "ArrowFunctionExpression",
					// 切出参数
					params: input.slice(1, input.length - 2),
					body: input[input.length - 1],
				}
			}
			// 如果结尾是)，则箭头函数没有主体，语法错误
			console.log("syntax error, arrow Function don's has body");
			throw new Error("parse failed");
		}],
		[If[0], input => {
			const ifStatement = {
				type: "IfStatement",
				test: input[2],
				consequent: input[4],
			}
			if (input[5]) {
				ifStatement.alternate = input[5];
			}
			return ifStatement;
		}],
		[Else[0], input => input[1]],
		[While[0], input => ({
			type: "WhileStatement",
			test: input[2],
			body: input[4],
		})],
		[Return[0], input => ({
			type: "ReturnStatement",
			argument: input[1],
		})],
		[Throw[0], input => ({
			type: "ThrowStatement",
			argument: input[1],
		})],
		[With[0], input => ({
			type: "WithStatement",
			object: input[2],
			body: input[4],
		})],
		[ForContent[0], input => {
			const result = {
				type: "ForStatement",
				body: input[input.length - 1],
			};
			const firstDelimterIndex = input.findIndex(v => v.value === ";");
			const secondDelimterIndex = input.slice(firstDelimterIndex + 1).findIndex(v => v.value === ";");

			// 如果第一个分号在索引2处，则表示有表达式
			if (firstDelimterIndex === 2) {
				result.init = input[1];
			}
			// 两个分号所在的索引相差超过1，则表示有表达式
			if ((secondDelimterIndex - firstDelimterIndex) === 2) {
				result.test = input[firstDelimterIndex + 1];
			}
			// 第二个分号后一个token不是结束括号，则表示有表达式
			if (input[secondDelimterIndex + 1].value !== ")") {
				result.update = input[secondDelimterIndex + 1];
			}
			return result;
		}],
		[ForInContent[0], input => {
			// 长度为7，具有变量类型
			if (input.length === 7) {
				return {
					type: "ForInStatement",
					left: {
						type: "VariableDeclaration",
						kind: input[1].value,
						declarations: [
							{ type: "VariableDeclarator", id: input[2], init: null }
						],
					},
					right: input[4],
					body: input[6],
				}
			} else {
				return {
					type: "ForInStatement",
					left: input[1],
					right: input[3],
					body: input[5],
				}
			}
		}],
		[ForOfContent[0], input => {
			// conten 最终处理为主体部分，仅从括号开始到循环体块结束的部分，不包含 await 关键字
			let content = input;
			let isAwait = false;
			if (content[0]?.value === "await") {
				content = content.slice(1);
				isAwait = true;
			}
			// 长度为7，具有变量类型
			if (content.length === 7) {
				return {
					type: "ForOfStatement",
					"await": isAwait,
					left: {
						type: "VariableDeclaration",
						kind: content[1].value,
						declarations: [
							{ type: "VariableDeclarator", id: content[2], init: null }
						],
					},
					right: content[4],
					body: content[6],
				}
			} else {
				return {
					type: "ForOfStatement",
					"await": isAwait,
					left: content[1],
					right: content[3],
					body: content[5],
				}
			}
		}],
		[ModuleSpecifiers[0], input => (input.slice(1, input.length - 1))],
		// 别名直接返回标识符
		[OptionalModuleAlias[0], input => (input[1])],
		[ModuleSpecifiersItem[0], input => {
			// 如果索引1有效且不是逗号，则有as别名
			if (input[1] && input[1]?.value !== ",") {
				// 具有 as 别名
				return {
					type: "ModuleSpecifer",
					name: input[0],
					local: input[1],
				}
			} else {
				return {
					type: "ModuleSpecifer",
					name: input[0],
					local: input[0],
				}
			}
		}],
		// error
		[OptionalCatchParam[0], input => (input[1])],
		[OptionalCatchClause[0], input => ({
			type: "CatchClause",
			param: input.length === 3 ? input[1] : null,
			body: input.length === 3 ? input[2] : input[1],
		})],
		[OptionalFinallyClause[0], input => (input[1])],
		// switch语句
		[Switch[0], input => ({
			type: "SwitchStatement",
			discriminant: input[2],
			cases: input.slice(5, input.length - 1),
		})],
		[SwitchCase[0], input => ({
			type: "SwitchCase",
			test: input[1],
			consequent: input.slice(3),
		})],
		[SwitchCase[1], input => ({
			type: "SwitchCase",
			test: null,
			consequent: input.slice(2),
		})],
		// 语句
		[Statements[0], input => ({
			type: "Statements",
			Statements: input,
		})],
		// 程序
		[Program[0], input => ({
			type: "Program",
			body: input,
		})],
		// 表达式
		[Statement[0], input => {
			// 如果是函数声明，直接返回，并且类型改为 FunctionDeclaration
			if (input[0].type === "FunctionExpression") {
				input[0].type = "FunctionDeclaration";
				return input[0];
			}
			// 如果是类声明，直接返回，并且类型改为 ClassDeclaration
			if (input[0].type === "ClassExpression") {
				input[0].type = "ClassDeclaration";
				return input[0];
			}
			// 都不是，包装为普通的 ExpressionStatement
			return {
				type: "ExpressionStatement",
				expression: input[0],
			}
		}],
		// 变量声明
		[Statement[1], input => (input[0])],
		// if
		[Statement[2], input => input[0]],
		// 导入声明
		[Statement[3], input => {
			if (input[1].type === "Literal") {
				return {
					type: "ImportDeclaration",
					specifiers: [],
					source: input[1],
				}
			} else {
				return {
					type: "ImportDeclaration",
					specifiers: input[1],
					source: input[2],
				}
			}
		}],
		// 导出声明
		[Statement[4], input => (input[1])],

		[Statement[5], input => input[0]],
		[Statement[6], input => input[0]],
		// break
		[Statement[7], () => ({
			type: "BreakStatement",
		})],
		// continue
		[Statement[8], () => ({
			type: "ContinueStatement",
		})],
		// for 循环语句
		[Statement[9], input => input[1]],
		// try 语句
		[Statement[10], input => {
			const result = {
				type: "TryStatement",
				block: input[1],
				handler: null,
				finalizer: null,
			};
			const extras = input.slice(2);
			extras.forEach(itemClause => {
				if (itemClause.type === "CatchClause") {
					result.handler = itemClause;
				}
				if (itemClause.type === "BlockStatement") {
					result.finalizer = itemClause;
				}
			});
			return result;
		}],
		// 代码块
		[Statement[11], input => (input[0])],
		// switch
		[Statement[12], input => (input[0])],
		// throw
		[Statement[13], input => (input[0])],
		// debugger
		[Statement[14], () => ({
			type: "DebuggerStatement",
		})],
		// with
		[Statement[15], input => (input[0])],
		// 空语句
		[Statement[16], () => ({
			type: "EmptyStatement",
		})],

		[LabeledStatement[0], ([label,,body])=> ({
			type: "LabeledStatement",
			label,
			body,
		})],

		[ImportIdentify[0], input => (input[0])],
		[ImportDefault[0], input => (input[0])],
		[ImportSpecifiers[0], input => {
			// 索引1的节点
			const oneIndex = input[1];

			if (oneIndex) {
				// 存在索引1，具有花括号内的导入

				// 如果有可选的逗号则需要去除
				if (oneIndex.value === ",") {
					input[2].forEach(specifer => {
						specifer.type = "ImportSpecifier";
						specifer.imported = specifer.name;
						delete specifer.name;
					});
					// 默认导入加到最前面
					input[2].unshift({
						type: "ImportDefaultSpecifier",
						local: input[0],
					});
					return input[2];
				} else {
					input[1].forEach(specifer => {
						specifer.type = "ImportSpecifier";
						specifer.imported = specifer.name;
						delete specifer.name;
					});
					// 默认导入加到最前面
					input[1].unshift({
						type: "ImportDefaultSpecifier",
						local: input[0],
					});
					return input[1];
				}
			} else {
				// 如果不存在索引1的token，则只有默认导入
				return [
					{
						type: "ImportDefaultSpecifier",
						local: input[0],
					},
				];
			}
		}],
		[ImportSpecifiers[1], input => {
			input[0].forEach(specifer => {
				specifer.type = "ImportSpecifier";
				specifer.imported = specifer.name;
				delete specifer.name;
			});
			return input[0];
		}],
		// 导入命名空间的形式
		[ImportSpecifiers[2], input => ([
			{
				type: "ImportNamespaceSpecifier",
				local: input[2],
			}
		])],
		[ExportRedirect[0], input => (input[1])],
		[ExportContent[0], input => {
			// 如果是函数，类型就是函数声明
			input[1].type === "FunctionExpression" && (input[1].type = "FunctionDeclaration");
			// 如果是类，类型就是类声明
			input[1].type === "ClassExpression" && (input[1].type = "ClassDeclaration");
			return {
				type: "ExportDefaultDeclaration",
				declaration: input[1],
			};
		}],
		[ExportContent[1], input => {
			input[0].forEach(specifer => {
				specifer.type = "ExportSpecifier";
				specifer.exported = specifer.name;
				delete specifer.name;
			});
			return {
				type: "ExportNamedDeclaration",
				specifiers: input[0],
				source: input[1],
			};
		}],
		[ExportContent[2], input => ({
			type: "ExportNamedDeclaration",
			declaration: input[0],
		})],
		[ExportContent[3], input => {
			// type 为声明
			input[0].type = "FunctionDeclaration";
			return {
				type: "ExportNamedDeclaration",
				declaration: input[0],
			};
		}],
		[ExportContent[4], input => {
			// type 为声明
			input[0].type = "ClassDeclaration";
			return {
				type: "ExportNamedDeclaration",
				declaration: input[0],
			};
		}],
		[OptionalExportAllExported[0], input => (input[1])],
		// 导出全部
		[ExportContent[5], input => ({
			type: "ExportAllDeclaration",
			exported: input.length === 4 ? input[1] : null,
			source: input[input.length - 1],
		})],
	]);
})();

const hasNoneProductions = {};
Object.entries(not_end_symbols).forEach(([key, productions]) => {
	productions.forEach(production => {
		if (production[0] === END_SYMBOLS.NONE) {
			hasNoneProductions[key] = true;
		}
	});
});

// 需要最后解析后拍平的产生式
const flatProductions = [
	not_end_symbols.Statements[0],
	not_end_symbols.ModuleSpecifiersItems[0],
	not_end_symbols.FunctionParams[0],
	not_end_symbols.ObjectContent[0],
	not_end_symbols.ArrayContent[0],
	not_end_symbols.ObjectPatternItems[0],
	not_end_symbols.ArrayPatternItems[0],
	not_end_symbols.Declarations[0],
	not_end_symbols.TemplateStringElements[0],
	not_end_symbols.ExtraDeclarations[0],
	not_end_symbols.SwitchCases[0],
	// term1 是分隔表达式，直接拍平
	not_end_symbols.Term1[0],
	// class 项拍平
	not_end_symbols.ClassItems[0],
];

// 获得 First 集
function getFirstSet() {
	const firstSets = {};
	const getSize = () => {
		return Object.values(firstSets).reduce((o, v) => {
			return o + v.size;
		}, 0);
	}

	const actions = [];
	const addAction = (fn) => actions.push(fn);
	const runActions = () => {
		while (actions.length > 0) {
			actions.pop()();
		}
	}

	const add = () => Object.entries(not_end_symbols).forEach(([name, productions]) => {
		// 不存在就创建
		!firstSets[name] && (firstSets[name] = new Set());

		productions.forEach(production => {
			// 默认计算First(第一个)
			let currentIndex = 0;
			let first = production[currentIndex];

			const addFirst = () => {
				// 不存在下一个符号了，添加一个空进去
				if (!first) {
					firstSets[name].add(END_SYMBOLS.NONE);
					return;
				}
				// 如果是终结符，直接加入 first 集
				if (first.type === END_SYMBOL) {
					firstSets[name].add(first);
				}
				// 如果是非终结符，计算之后将 First(该非终结符)加入 first 集
				if (first.type === NOT_END_SYMBOL) {
					addAction(() => {
						// 取出那个非终结符的 first 集合
						const firsts = [...firstSets[first.value]];
						// 遍历添加到集合中
						firsts.forEach(endSymbol => {
							firstSets[name].add(endSymbol)
						});
						// 如果那个非终结符可以推导出空，则继续加入下一个符号,直到不存在
						if (firstSets[first.value].has(END_SYMBOLS.NONE)) {
							currentIndex += 1;
							first = production[currentIndex];
							addFirst();
						}
					});
				}
			}
			addFirst();
		});
	}, runActions());

	// 一直调用其构建集合直到集合尺寸不在增长
	let preSize = getSize();
	add();
	while (true) {
		const currentSize = getSize();
		if (preSize === currentSize) {
			break;
		}
		add();
		preSize = currentSize;
	}
	return firstSets;
}

// 获得 Follow 集
function getFollowSet(firstSets) {
	const followSets = {};
	const getSize = () => {
		return Object.values(followSets).reduce((o, v) => {
			return o + v.size;
		}, 0);
	}

	// 初始化集合
	Object.keys(not_end_symbols).forEach(key => {
		followSets[key] = new Set();
	});

	const actions = [];
	const addAction = (fn) => actions.push(fn);
	const runActions = () => {
		while (actions.length > 0) {
			actions.pop()();
		}
	}

	const add = () => Object.entries(not_end_symbols).forEach(([name, productions]) => {
		productions.forEach(production => {
			production.forEach((symbol, i) => {
				if (symbol.type === NOT_END_SYMBOL) {
					let next = production[i + 1];
					// 后继为空， 将 产生式左侧 添加到 Follow(symbol) 中
					if (!next) {
						addAction(() => {
							// 取得左侧，添加到被选取的产生式，Follow 中
							[...followSets[name]].forEach(sym => {
								followSets[symbol.value].add(sym);
							});
						});
						return;
					}
					// 后继字符是终结符，直接添加
					if (next.type === END_SYMBOL) {
						followSets[symbol.value].add(next);
					} else {
						// next 的 First 除了空全部添加
						firstSets[next.value].forEach(sym => {
							// NONE 不添加
							if (sym === END_SYMBOLS.NONE) {
								return;
							}
							// 非 NONE 添加
							followSets[symbol.value].add(sym)
						});
						// 非终结符，能推出空,则吧左部 Follow 加入 Follow(Symbol)
						if (firstSets[next.value].has(END_SYMBOLS.NONE)) {
							addAction(() => {
								// 取得左侧，添加到被选取的产生式，Follow 中
								[...followSets[name]].forEach(sym => {
									followSets[symbol.value].add(sym);
								});
							});
						}
					}
				}
			})
		});
	}, runActions());

	// 一直调用其构建集合直到集合尺寸不在增长
	let preSize = getSize();
	add();
	while (true) {
		const currentSize = getSize();
		if (preSize === currentSize) {
			break;
		}
		add();
		preSize = currentSize;
	}

	return followSets;
}

function getSelectSet(firstSets, followSets) {
	const selectSets = new Map();

	Object.entries(not_end_symbols).forEach(([name, productions]) => {
		productions.forEach(production => {
			let noNone = production.some(sym => {
				// 终结符且不为None，直接添加
				if (sym.type === END_SYMBOL) {
					sym !== END_SYMBOLS.NONE && selectSets.set({
						token: name,
						production: production,
					}, new Set([sym]));
					return true;
				} else {
					if (firstSets[sym.value].has(END_SYMBOLS.NONE)) {
						const newSet = new Set([...firstSets[sym.value]]);
						newSet.delete(END_SYMBOLS.NONE);
						// 非终结符可推出空，添加first该终结符
						selectSets.set({
							token: name,
							production: production,
						}, newSet);
					} else {
						// 非终结符不可推出空，最后返回true
						selectSets.set({
							token: name,
							production: production,
						}, firstSets[sym.value]);
						return true;
					}
				}
			});
			// 右侧可推出空
			if (!noNone) {
				// 递归将左侧加入右侧所有非终结符中
				production.forEach(sym => {
					if (sym.type === END_SYMBOL) {
						let selectSet = firstSets[sym.value];
						selectSet.delete(END_SYMBOLS.NONE);
						// 取左侧的 Follow 集
						selectSet = [...selectSet, ...followSets[name]]

						selectSets.set({
							token: name,
							production: production,
						}, selectSet);
					}
				})
			}
		});
	});

	return selectSets;
}

function createAnalyzeTable(selectSets) {
	const analyzeTable = {};
	[...selectSets.entries()].forEach(([{ token: NoEndSymbol, production }, endSymbols]) => {
		if (!analyzeTable[NoEndSymbol]) {
			analyzeTable[NoEndSymbol] = new Map();
		}
		endSymbols.forEach(endSymbol => {
			// 字符串类型分析表项
			analyzeTable[NoEndSymbol].set(endSymbol.dataType || endSymbol.value, production);
		});
	});
	return analyzeTable;
}

const firstSets = getFirstSet();
const followSets = getFollowSet(firstSets);
const selectSets = getSelectSet(firstSets, followSets);
const analyzeTable = createAnalyzeTable(selectSets);

function getLL1Infos() {
	return {
		END_SYMBOLS,
		not_end_symbols,
		DATA_TYPE_SYMBOLS,
		hasNoneProductions,
		transformers,
		firstSets,
		followSets,
		selectSets,
		analyzeTable,
	}
}

function parse(input) {
	const tokens = [...input].reverse();

	const token = tokens[tokens.length - 1];
	// 无 token 的话，就返回一个 Statements 为空的 Program 形式
	if(!token) {
		return {
			production: not_end_symbols.Program[0],
			children: [],
		}
	}
	
	let production = analyzeTable.Program.get(token.type) || analyzeTable.Program.get(token.value);

	if(!production && token.type === TOKEN_TYPES.KEYWORD) {
		production = analyzeTable.Program.get(TOKEN_TYPES.IDENTIFY);
	}

	const matchProd = (production, container) => production.every((sym, index) => {
		if (!container.children) {
			container.children = [];
		}
		if (sym.type === END_SYMBOL) {
			const token = tokens.pop();
			// 遇到空，直接结束
			if (sym === END_SYMBOLS.NONE) {
				return true;
			}

			// 如果有match, 调用其 match 方法匹配
			if (sym?.match?.(token)) {
				container.children.push(token);
				return true;
			}

			// 没有数据类型，直接检测值是否相等
			if (token.value === sym.value) {
				container.children.push(token);
				return true;
			}
			console.log("failed to parse end sym", token, sym, production, container);
			throw new Error("parse failed");
		} else {
			const token = tokens[tokens.length - 1];
			// 没有token了，表示已经结束, 直接true
			if (!token) {
				return true;
			}

			// 特殊处理
			const specialType = token.specialType;
			if (specialType) {
				// 箭头函数参数特殊处理
				if (specialType === "ArrowFunciton") {
					// 设置下一个token采用函数参数解析(如果不是空参数)
					if (tokens?.[tokens.length - 2]?.value !== ")") {
						tokens[tokens.length - 2].production = not_end_symbols.FunctionParams[0];
					}
					delete token.specialType;
				}
				// for in, for of 处理
				if (specialType === "ForInContent") {
					token.production = not_end_symbols.ForInContent[0];
					delete token.specialType;
				} else if (specialType === "ForOfContent") {
					token.production = not_end_symbols.ForOfContent[0];
					delete token.specialType;
				}
			}

			const name = sym.value;
			// console.log(token.type, analyzeTable?.[name]?.get(token.type), token, sym);
			// 尝试用类型从表中查找所需产生式，(如果是关键字，则前面的找不到，会根据value找)
			let p = analyzeTable?.[name]?.get(token.type) || analyzeTable?.[name]?.get(token.value);

			// console.log(p, name, token, production,index, sym, analyzeTable?.[name]);

			// 需要产生式的 specialType 相关处理
			if (specialType) {
				// 如果是解构且因为是表达式所以当成了 ArrayLiteral 解析，那么就让其作为 ArrayPattern 解析
				if (specialType === "ArrayDestructure" && p === not_end_symbols.ArrayLiteral[0]) {
					token.production = not_end_symbols.ArrayPattern[0];
					delete token.specialType;
				}
				// 两步成功解析 数组解构表达式
				// 如果是 ObjectDestructure 类型，且被解析为 Block, 那么让其当成 Expression 解析，以保证优先级的等相关东西
				if (specialType === "ObjectDestructure" && p === not_end_symbols.Block[0]) {
					token.production = not_end_symbols.Expression[0];
				}
				// 因为上面当作 Expression 解析，这样不论是单独写还是在表达式中的，只要为 ObjectDestructure，在解析 Expression 时必然被当作 ObjectLiternal, 将这部分符合条件的使用 ObjectPattern 解析即可
				if (specialType === "ObjectDestructure" && p === not_end_symbols.ObjectLiteral[0]) {
					token.production = not_end_symbols.ObjectPattern[0];
					delete token.specialType2;
				}
			}

			// 某些情况特殊处理的产生式
			if (token.production) {
				p = token.production;
				// 取完就删除，否则会重新进入该部分无限递归
				delete token.production;
			}

			// 如果是 KEYWORD 则可能是 Identify, 即关键字作为标识符,使用标识符查找产生式
			if (!p && token.type === TOKEN_TYPES.KEYWORD) {
				p = analyzeTable?.[name]?.get(TOKEN_TYPES.IDENTIFY);
			}
			// new.target 标记
			if (token.value === "new" && tokens?.[tokens.length - 2]?.value === ".") {
				// 设置值为该标记，这样该 new 在 Term17 就会被忽略(否则该 new 会被 Term17 使用，产生冲突问题), 待进入 Expr 之后特殊处理
				token.value = NEW_POINT_TARGET_IDENTIFY;
			}
			// 动态加载表达式 import() 和 模块元数据 import.meta 用法特殊处理
			if (token.value === "import" && ["(", "."].includes(tokens?.[tokens.length - 2]?.value)) {
				// 将该关键字作为 Identify 匹配
				p = analyzeTable?.[name]?.get(TOKEN_TYPES.IDENTIFY);
			}
			// LabeledStatement
			// 如果在第一项，且产生式为 Expression 且下一个 token 是 : 则为 LabeledStatement
			if(index === 0 && p === not_end_symbols.Statement[0] && tokens?.[tokens.length - 2]?.value === ":") {
				p = not_end_symbols.LabeledStatement[0];
			}

			// 无法匹配
			if (!p) {
				// 如果可空，就视为空
				if (hasNoneProductions[name]) {
					// console.log("optional", name, sym, token);
					// console.log("idsadkl", token, sym, analyzeTable?.[name]);
					return true;
				}
				console.log(p, name, token, production, index, sym, analyzeTable?.[name]);
				throw new Error("parse failed");
			}

			// flatProductions 会检测拍平处理，对于一些特殊的产生式，给他拍平就好
			if (flatProductions.includes(p)) {
				const matched = matchProd(p, container);
				if (!matched) {
					console.log("failed to parse expr");
					throw new Error("parse failed");
				}
				return true;
			} else {
				const subSyntax = { production: p };
				const matched = matchProd(p, subSyntax);
				if (!matched) {
					console.log("failed to parse expr");
					throw new Error("parse failed");
				}
				container.children.push(subSyntax);
				return true;
			}
		}
	})

	const container = {
		production,
	};
	matchProd(production, container);

	// 如果还有 token 尚未被消耗，那么就出现了无法解析的语法
	if(tokens.length > 0) {
		throw new Error("Uncaught SyntaxError: Unexpected token " + tokens[tokens.length - 1].value);
	}

	return container;
}

function transform(parsed) {
	if (parsed.children) {
		parsed.children = parsed.children.map(item => {
			return transform(item);
		});
	} else {
		// 没有子节点，是终结符，直接返回
		return parsed;
	}
	const tranformer = transformers.get(parsed.production);
	if (tranformer) {
		return tranformer(parsed.children);
	} else {
		// 只有一个子节点，并且不存在 tranformer，就直接返回这个子节点
		if (parsed.children.length === 1) {
			return parsed.children[0];
		}
		return parsed.children;
	}
}

// console.log(hasNoneProductions);

export {
	parse,
	transform,
	getLL1Infos,
	generateSyntaxDescriptionTexts,
}