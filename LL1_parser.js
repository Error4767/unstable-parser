import { TOKEN_TYPES } from "./scanner.js";

const END_SYMBOL = Symbol("end");
const NOT_END_SYMBOL = Symbol("no end");

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
	"+": { type: END_SYMBOL, value: "+" },
	"-": { type: END_SYMBOL, value: "-" },
	"++": { type: END_SYMBOL, value: "++" },
	"--": { type: END_SYMBOL, value: "--" },
	TYPEOF: { type: END_SYMBOL, value: "typeof" },
	DELETE: { type: END_SYMBOL, value: "delete" },
	AWAIT: { type: END_SYMBOL, value: "await" },
	VOID: { type: END_SYMBOL, value: "void" },
	// 算数运算符
	"+": { type: END_SYMBOL, value: "+" },
	"-": { type: END_SYMBOL, value: "-" },
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

	[TOKEN_TYPES.TEMPLATE_STRING]: { // 模板字符串中的字符串
		type: END_SYMBOL,
		dataType: TOKEN_TYPES.TEMPLATE_STRING,
		match(token) {
			return token.type === TOKEN_TYPES.TEMPLATE_STRING;
		}
	},
	// new
	NEW: { type: END_SYMBOL, value: "new" },
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
				token.value = Boolean(token.raw);
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
}

/*
OptionalComma -> , | None
OptionalDelimter -> ; | None
OptionalIdentify -> Identify | None

ObjectLiteral -> { ObjectContent }
ObjectContent -> ObjectAttrbute ObjectContent | None
ObjectAttrbute -> 
	|Identify ObjectAttrbuteRight OptionalComma 
	| StringLiteral ObjectAttrbuteRight OptionalComma 
	| [ Expression ] ObjectAttrbuteRight OptionalComma
	| ... Term1_ OptionalComma
ObjectAttrbuteRight -> : Term1_ | ( FunctionParamsDeclaration ) Block | None

ArrayLiteral -> [ ArrayContent ]
ArrayContent -> ArrayItem ArrayContent | None
ArrayItem -> Term1_ OptionalComma | ... Term1_ OptionalComma

ArrowFunctionContent -> => ArrowFunctionBody | None
ArrowFunctionBody -> Term1_ | Block

Literal -> Identify ArrowFunctionContent | string | number | boolean | null | ObjectLiteral | ArrayLiteral | ` TemplateStringElements `

TemplateStringElements -> TemplateStringElement TemplateStringElements | None
TemplateStringElement -> TemplateString | $ { Expression }

VariableType -> var | let | const
VariableDeclarator -> VariableIdentifier VariableInitial;
VariableInitial -> = Term1_ | None
VariableIdentifier -> Identify | ObjectPattern | ArrayPattern
VariableDeclaration -> VariableType Declarations;
Declarations -> FirstDeclaration ExtraDeclarations | None
FirstDeclaration -> VariableDeclarator | None
ExtraDeclarations -> VariableDeclaratorHasPrefixComma ExtraDeclarations | None
VariableDeclaratorHasPrefixComma -> , VariableIdentifier

DefaultValue -> = Term1_ | None

ObjectPattern -> { ObjectPatternItems }
ObjectPatternItems -> ObjectPatternItem ObjectPatternItems | None
ObjectPatternItem -> Identify ObjectPatternOptionalRename ObjectPatternOptionalDefaultValue OptionalComma | ... Identify OptionalComma
ObjectPatternOptionalRename -> : ObjectPatternOptionalRenameValue | None
ObjectPatternOptionalRenameValue -> Identify | ObjectPattern | ArrayPattern
ObjectPatternOptionalDefaultValue -> = Term1_ | None

ArrayPattern -> [ ArrayPatternItems ]
ArrayPatternItems -> ArrayPatternItem ArrayPatternItems | None
ArrayPatternItem -> 
	|Identify DefaultValue OptionalComma 
	| ArrayPattern DefaultValue OptionalComma 
	| ObjectPattern DefaultValue OptionalComma 
	| ... Identify OptionalComma

FunctionDeclaration -> function OptionalIdentify ( FunctionParamsDeclaration ) Block
FunctionParamsDeclaration -> FunctionParam FunctionParamsDeclaration | None
FunctionParam -> FunctionParamIdentify DefaultValue OptionalComma | ... Identify OptionalComma
FunctionParamIdentify -> Identify | ObjectPattern | ArrayPattern

AsyncFunction -> async AsyncFunctionContent
AsyncFunctionContent -> FunctionDeclaration | Identify ArrowFunctionContent | ( FunctionParamsDeclaration ) ArrowFunctionContent

If -> if ( Expression ) Statement Else
Else -> else ElseContent | None
ElseContent -> Statement | If

While -> while ( Expression ) Block;

Return -> return OptionalExpression
Throw -> throw Expression

Block -> { Statements }

OptionalVariableDeclarationOrExpression -> VariableDeclaration | Expression | None
ForContent -> ( OptionalVariableDeclarationOrExpression ; OptionalExpression ; OptionalExpression ) Block

OptionalVariableType -> VariableType | None
ForInContent -> ( OptionalVariableType VariableIdentifier in Expression ) Block
ForOfContent -> ( OptionalVariableType VariableIdentifier of Expression ) Block

OptionalCatchClause -> catch OptionalCatchParam Block | None
OptionalCatchParam -> ( VariableIdentifier ) | None
OptionalFinallyClause -> finally Block

Switch -> switch ( Expression ) { SwitchCases }
SwitchCases -> SwitchCase SwitchCases | None
SwitchCase -> case Expression : Statements | default : Statements

Program -> Statements
Statements -> Statement Statements | None
Statement ->  
	| Expression OptionalDelimter
	| VariableDeclaration OptionalDelimter
	| If OptionalDelimter
	| import ImportIdentify string OptionalDelimter 
	| export ExportContent OptionalDelimter 
	| While OptionalDelimter
	| Return OptionalDelimter
	| break OptionalDelimter
	| continue OptionalDelimter
	| for ForContent OptionalDelimter
	| try Block OptionalCatchClause OptionalFinallyClause OptionalDelimter
	| Block OptionalDelimter
	| Switch OptionalDelimter
	| Throw OptionalDelimter
	| OptionalDelimter

ImportIdentify -> ImportSpecifers from | None
ImportSpecifers -> ImportDefault Imports | Imports
ImportDefault -> Identify
Imports -> ModuleSpecifers | None

ExportContent -> default Expression | ModuleSpecifers ExportRedirect | VariableDeclaration | FunctionDeclaration
ExportRedirect -> from StringLiteral | None

ModuleSpecifers -> { ModuleSpecifersItems }
ModuleSpecifersItems -> ModuleSpecifersItem ModuleSpecifersItems | None
ModuleSpecifersItem -> Identify ModuleOptionalAlias OptionalComma
ModuleOptionalAlias -> as Identify | None
*/

/* Expression 指代任意有效表达式， Term1_ 就指代单表达式（不含逗号的），Expr指单个字面量或是 ( Expression ) 的形式
Expression -> Term1_ Term1
OptionalExpression -> Expression | None
Expr -> Literal | FunctionDeclaration | ( OptionalExpression ) ArrowFunctionContent
Term1 -> , Term1_ Term1 | None
Term1_ -> Term2_ Term2
Term2 -> = Term2_ Term2 
	| += Term2_ Term2 
	| -= Term2_ Term2 
	| **= Term2_ Term2
	| *= Term2_ Term2 
	| /= Term2_ Term2 
	| %= Term2_ Term2 
	| <<= Term2_ Term2
	| >>= Term2_ Term2
	| >>>= Term2_ Term2
	| &= Term2_ Term2
	| ^= Term2_ Term2
	| |= Term2_ Term2
	| &&= Term2_ Term2
	| ||= Term2_ Term2
	| ??= Term2_ Term2
	| None
Term2_ -> Term3_ Term3
Term3 -> ? Term3_ Term3 : Term3_ Term3 | None
Term3_ -> Term4_ Term4
Term4 -> || Term4_ Term4 | ?? Term4_ Term4 | None
Term4_ -> Term5_ Term5
Term5 -> && Term5_ Term5 | None
Term5_ -> Term6_ Term6
Term6 -> | Term6_ Term6 | None
Term6_ -> Term7_ Term7
Term7 -> ^ Term7_ Term7 | None
Term7_ -> Term8_ Term8
Term8 -> & Term8_ Term8 | None
Term8_ -> Term9_ Term9
Term9 -> == Term9_ Term9 | != Term9_ Term9 | === Term9_ Term9 | !== Term9_ Term9 | None
Term9_ -> Term10_ Term10
Term10 -> > Term10_ Term10 | < Term10_ Term10 | >= Term10_ Term 11 | <= Term10_ Term10 | in Term10_ Term10 | instanceof Term10_ Term10 | None
Term10_ -> Term11_ Term11
Term11 -> >> Term11_ Term11 | << Term11_ Term11 | None
Term11_ -> Term12_ Term12
Term12 -> + Term12_ Term12 | - Term12_ Term12 | None
Term12_ -> Term13_ Term13
Term13 -> * Term13_ Term13 | / Term13_ Term13 | % Term13_ Term13 | None
Term13_ -> Term14_ Term14
Term14 -> ** Term14_ Term14 | None
Term14_ -> Term15 Term15_
Term15 -> typeof Term15 
	| delete Term15 
	| void Term15 
	| await Term15 
	| ! Term15_
	| ~ Term15_
	| + Term15_
	| - Term15_
	| ++ Term15_
	| -- Term15_
	| None
Term15_ -> Term16_ Term16
Term16 -> ++ | -- | None
Term16_ -> Term17 Term17_
Term17 -> new Term17 | None
Term17_ -> Expr Term18
Term18 -> . Identify Term18 | [ Expression ] Term18 | ?. OptionalChainingAttributeName Term18 | ( Expression ) Term18 | None
OptionalChainingAttributeName -> Identify | [ Expression ]
*/

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
			{ type: NOT_END_SYMBOL, value: "FunctionDeclaration" },
		],
		[
			{ type: NOT_END_SYMBOL, value: "AsyncFunction" },
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
		// new 为左侧运算符 右侧表达式, 所以 先 Term17 再 Term17_
		[
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
			{ type: NOT_END_SYMBOL, value: "Expression" },
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
	ObjectLiteral: [
		[
			END_SYMBOLS.START_BLOCK,
			{ type: NOT_END_SYMBOL, value: "ObjectContent" },
			END_SYMBOLS.END_BLOCK,
		],
	],
	ObjectContent: [
		[
			{ type: NOT_END_SYMBOL, value: "ObjectAttribute" },
			{ type: NOT_END_SYMBOL, value: "ObjectContent" },
		],
		[
			END_SYMBOLS.NONE,
		],
	],
	ObjectAttribute: [
		[
			END_SYMBOLS[TOKEN_TYPES.IDENTIFY],
			{ type: NOT_END_SYMBOL, value: "ObjectAttributeRight" },
			{ type: NOT_END_SYMBOL, value: "OptionalComma" },
		],
		// 字符属性名
		[
			DATA_TYPE_SYMBOLS[TOKEN_TYPES.STRING_LITERAL],
			{ type: NOT_END_SYMBOL, value: "ObjectAttributeRight" },
			{ type: NOT_END_SYMBOL, value: "OptionalComma" },
		],
		// 计算属性名
		[
			END_SYMBOLS["["],
			{ type: NOT_END_SYMBOL, value: "Expression" },
			END_SYMBOLS["]"],
			{ type: NOT_END_SYMBOL, value: "ObjectAttributeRight" },
			{ type: NOT_END_SYMBOL, value: "OptionalComma" },
		],
		// 展开操作符
		[
			END_SYMBOLS["..."],
			{ type: NOT_END_SYMBOL, value: "Term1_" },
			{ type: NOT_END_SYMBOL, value: "OptionalComma" },
		]
	],
	ObjectAttributeRight: [
		// 普通值
		[
			END_SYMBOLS[":"],
			{ type: NOT_END_SYMBOL, value: "Term1_" },
		],
		// 函数语法
		[
			END_SYMBOLS.START_BRACKET,
			{ type: NOT_END_SYMBOL, value: "FunctionParamsDeclaration" },
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
		// 模板字符串
		[
			END_SYMBOLS["`"],
			{ type: NOT_END_SYMBOL, value: "TemplateStringElements" },
			END_SYMBOLS["`"],
		],
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
			END_SYMBOLS[TOKEN_TYPES.IDENTIFY],
			{ type: NOT_END_SYMBOL, value: "OptionalComma" },
		]
	],
	// 解构重命名中可以包含另一个解构
	ObjectPatternOptionalRename: [
		[
			END_SYMBOLS[":"],
			{ type: NOT_END_SYMBOL, value: "ObjectPatternOptionalRenameValue" },
		],
		[
			END_SYMBOLS.NONE,
		],
	],
	// 解构重命名值，可以为一个标识符或者是另一个解构
	ObjectPatternOptionalRenameValue: [
		[
			END_SYMBOLS[TOKEN_TYPES.IDENTIFY]
		],
		[
			{ type: NOT_END_SYMBOL, value: "ObjectPattern" },
		],
		[
			{ type: NOT_END_SYMBOL, value: "ArrayPattern" },
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
			END_SYMBOLS[TOKEN_TYPES.IDENTIFY],
			{ type: NOT_END_SYMBOL, value: "OptionalComma" },
		]
	],
	FunctionDeclaration: [
		[
			END_SYMBOLS.FUNCTION,
			// 函数名称是可选的
			{ type: NOT_END_SYMBOL, value: "OptionalIdentify" },
			END_SYMBOLS.START_BRACKET,
			{ type: NOT_END_SYMBOL, value: "FunctionParamsDeclaration" },
			END_SYMBOLS.END_BRACKET,
			{ type: NOT_END_SYMBOL, value: "Block" },
		]
	],
	FunctionParamsDeclaration: [
		[
			{ type: NOT_END_SYMBOL, value: "FunctionParam" },
			{ type: NOT_END_SYMBOL, value: "FunctionParamsDeclaration" },
		],
		[
			END_SYMBOLS.NONE,
		],
	],
	FunctionParam: [
		[
			{ type: NOT_END_SYMBOL, value: "FunctionParamIdentify" },
			{ type: NOT_END_SYMBOL, value: "DefaultValue" },
			{ type: NOT_END_SYMBOL, value: "OptionalComma" },
		],
		[
			END_SYMBOLS["..."],
			END_SYMBOLS[TOKEN_TYPES.IDENTIFY],
			{ type: NOT_END_SYMBOL, value: "OptionalComma" },
		],
		[END_SYMBOLS.NONE],
	],
	FunctionParamIdentify: [
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
			{ type: NOT_END_SYMBOL, value: "FunctionDeclaration" },
		],
		[
			END_SYMBOLS[TOKEN_TYPES.IDENTIFY],
			{ type: NOT_END_SYMBOL, value: "ArrowFunctionContent" },
		],
		[
			END_SYMBOLS.START_BRACKET,
			{ type: NOT_END_SYMBOL, value: "FunctionParamsDeclaration" },
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
		// 空语句
		[
			{ type: NOT_END_SYMBOL, value: "OptionalDelimter" },
		],
	],
	// 导入标识是可选的
	ImportIdentify: [
		[
			{ type: NOT_END_SYMBOL, value: "ImportSpecifers" },
			END_SYMBOLS.FROM,
		],
		[
			END_SYMBOLS.NONE,
		],
	],
	// 导入描述符
	ImportSpecifers: [
		// default import
		[
			{ type: NOT_END_SYMBOL, value: "ImportDefault" },
			{ type: NOT_END_SYMBOL, value: "OptionalComma" },
			{ type: NOT_END_SYMBOL, value: "Imports" },
		],
		[
			{ type: NOT_END_SYMBOL, value: "Imports" },
		]
	],
	ImportDefault: [
		[
			END_SYMBOLS[TOKEN_TYPES.IDENTIFY],
		],
	],
	// 导入花括号部分（可选）
	Imports: [
		[
			{ type: NOT_END_SYMBOL, value: "ModuleSpecifers" },
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
			{ type: NOT_END_SYMBOL, value: "ModuleSpecifers" },
			{ type: NOT_END_SYMBOL, value: "ExportRedirect" },
		],
		[
			{ type: NOT_END_SYMBOL, value: "VariableDeclaration" },
		],
		[
			{ type: NOT_END_SYMBOL, value: "FunctionDeclaration" },
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
	ModuleSpecifers: [
		[
			END_SYMBOLS.START_BLOCK,
			{ type: NOT_END_SYMBOL, value: "ModuleSpecifersItems" },
			END_SYMBOLS.END_BLOCK,
		],
	],
	ModuleSpecifersItems: [
		[
			{ type: NOT_END_SYMBOL, value: "ModuleSpecifersItem" },
			{ type: NOT_END_SYMBOL, value: "ModuleSpecifersItems" },
		],
		[
			END_SYMBOLS.NONE,
		],
	],
	ModuleSpecifersItem: [
		[
			END_SYMBOLS[TOKEN_TYPES.IDENTIFY],
			{ type: NOT_END_SYMBOL, value: "ModuleOptionalAlias" },
			{ type: NOT_END_SYMBOL, value: "OptionalComma" },
		],
	],
	// 可选的模块别名
	ModuleOptionalAlias: [
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
		Declarations,
		VariableDeclaratorHasPrefixComma,
		VariableInitial,

		DefaultValue,

		ObjectPattern,
		ObjectPatternItem,
		ObjectPatternOptionalRename,
		ObjectPatternOptionalRenameValue,
		ObjectPatternOptionalDefaultValue,

		ArrayPattern,
		ArrayPatternItem,

		FunctionDeclaration,
		FunctionParamsDeclaration,
		FunctionParam,
		FunctionParamIdentify,
		AsyncFunction,
		AsyncFunctionContent,

		If,
		Else,

		While,

		Return,
		Throw,

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

		ImportIdentify,
		ImportSpecifers,
		ImportDefault,
		Imports,
		ExportContent,
		ExportRedirect,
		ModuleSpecifers,
		ModuleSpecifersItems,
		ModuleSpecifersItem,
		ModuleOptionalAlias,

		ObjectLiteral,
		ArrayLiteral,
		ObjectAttribute,
		ObjectAttributeRight,
		ArrayItem,
		ArrowFunctionContent,

		Literal,

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
		Term17_,

		Term3,
		Term18,
		OptionalChainingAttributeName,
	} = not_end_symbols;

	// 标准化转换计算表达式
	const normalizeTransformers = {
		"()": ({ left, right }) => ({
			type: "CallExpression",
			callee: left,
			arguments: right && (right.type === "SequenceExpression" ? [...right.expressions] : [right]),
			optional: false,
		}),
		".": ({ left, right }) => ({
			type: "MemberExpression",
			object: left,
			property: right,
			optional: false,
		}),
		"?.": ({ left, right }) => ({
			type: "MemberExpression",
			object: left,
			property: right,
			optional: true,
		}),
		"new": ({ argument }) => (argument.type === "CallExpression" ? {
			type: "NewExpression",
			callee: argument.callee,
			arguments: argument.arguments || [],
		} : {
			type: "NewExpression",
			callee: argument,
			arguments: [],
		}),
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
	function normalizeComputeExpression(binaryExpression) {
		const transform = normalizeTransformers[binaryExpression.operator];
		return transform ? transform(binaryExpression) : binaryExpression;
	}

	const singleCalculateSymbolHandler = input => {

		const first = input[0];
		if (input.length > 1) {
			// 超过两个，则是多个同优先级运算符
			if (input[1].length > 2) {
				// 多个同优先级运算符, 目前全部左结合
				return singleCalculateSymbolHandler([
					normalizeComputeExpression({
						type: "BinaryExpression",
						operator: input[1][0].value,
						left: input[0],
						right: input[1][1],
					}),
					input[1][2],
				]);
			} else {
				// 单个，直接返回
				return normalizeComputeExpression({
					type: "BinaryExpression",
					operator: input[1][0].value,
					left: input[0],
					right: input[1][1],
				})
			}
		} else {
			return first;
		}
	};

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
		// console.log(input);
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
				const currentSymbol = symbols.pop().value;
				result = normalizeComputeExpression({
					type: ["++", "--"].includes(currentSymbol) ? "UpdateExpression" : "UnaryExpression",
					prefix: true,
					operator: currentSymbol,
					argument: result,
				})
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
		[ArrayLiteral[0], input => ({
			type: "ArrayExpression",
			// 截取内容部分
			elements: input.slice(1, input.length - 1),
		})],
		// 普通值语法
		[ObjectAttributeRight[0], input => input[1]],
		// 函数简写法
		[ObjectAttributeRight[1], input => {
			return {
				type: "FunctionExpression",
				params: input.slice(1, input.length - 2),
				body: input[input.length - 1],
			}
		}],
		// 标识符作为key
		[ObjectAttribute[0], input => {
			// 如果不存在右侧，则赋予同名标识符即key本身
			if (!input[1]) {
				input[1] = input[0];
			}
			return {
				type: "Property",
				key: input[0],
				value: input[1],
			}
		}],
		// 字符串作为key
		[ObjectAttribute[1], input => {
			return {
				type: "Property",
				key: input[0],
				value: input[1],
			}
		}],
		// 计算出的key
		[ObjectAttribute[2], input => {
			return {
				type: "Property",
				key: input[1],
				value: input[3],
			}
		}],
		// 展开操作符
		[ObjectAttribute[3], input => ({
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
				return input[1];
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
		[Literal[7], input => {
			const content = input.slice(1, input.length - 1);

			const quasis = [];
			const expressions = [];

			// 创建空模板字符
			const createNoneTemplateString = () => ({
				type: "TemplateElement",
				value: {
					type: TOKEN_TYPES.TEMPLATE_STRING,
					value: "",
				},
			});

			// 上一个是否是表达式，如果是的话，下面需要在两个相连的表达式之间插入一个空模板字符
			let preIsExpression = false;

			// 如果第一个是表达式，在quasis最前面插入一个空的模板字符
			if (content[0].type !== TOKEN_TYPES.TEMPLATE_STRING) {
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

			return {
				type: "TemplateLiteral",
				quasis,
				expressions,
			};
		}],
		[TemplateStringElement[1], input => (input[2])],
		[Term1_[0], singleCalculateSymbolHandler],
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
		[Term13_[0], singleCalculateSymbolHandler],
		[Term14_[0], leftComputeHandler],
		[Term15_[0], input => {
			if (input[1]) {
				return {
					type: "UpdateExpression",
					prefix: false,
					operator: input[1],
					argument: input[0],
				}
			} else {
				return input[0];
			}
		}],
		[Term16_[0], leftComputeHandler],
		[Term17_[0], singleCalculateSymbolHandler],
		// 计算属性名, 这里暂时也视为.运算符
		[Term18[1], input => {
			const result = [
				{
					type: TOKEN_TYPES.SINGLE_SYMBOL,
					value: ".",
				},
				input[1],
			];
			input[3] && result.push(input[3]);
			return result;
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
			return result
		}],
		// 可选链成员操作符语法
		[OptionalChainingAttributeName[1], input => (input[1])],
	];

	return new Map([
		...termsAndBasicTypesTransformers,
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
			name: input[1],
		})],
		[ObjectPattern[0], input => ({
			type: "ObjectPattern",
			properties: input.slice(1, input.length - 1),
		})],
		// 正常元素处理（去除剩余参数）
		...ArrayPatternItem.slice(0, ArrayPatternItem.length - 1).map(ArrayPatternItemProduction => [ArrayPatternItemProduction, input => {
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
		[ArrayPatternItem[ArrayPatternItem.length - 1], input => ({
			type: "RestElement",
			name: input[1],
		})],
		[ArrayPattern[0], input => ({
			type: "ArrayPattern",
			elements: input.slice(1, input.length - 1),
		})],
		[FunctionDeclaration[0], input => {
			const result = {
				type: "FunctionExpression",
				body: input[input.length - 1],
			}
			// 如果是括号，则为匿名函数
			if (input[1].value === END_SYMBOLS.START_BRACKET.value) {
				// 参数截取括号内容部分
				result.params = input.slice(2, input.length - 2);
			} else {
				// 函数名
				result.id = input[1];
				// 参数截取括号内容部分
				result.params = input.slice(3, input.length - 2);
			}
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
			name: input[1],
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
			return false;
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
			return false;
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

		[ForContent[0], input => {
			const result = {
				type: "ForStatement",
				body: input[input.length - 1],
			};
			const firstDelimterIndex = input.findIndex(v => v.value === ";");
			const secondDelimterIndex = input.findLastIndex(v => v.value === ";");

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
		...(() => {
			const createSpecialForHandler = type => input => {
				// 长度为7，具有变量类型
				if (input.length === 7) {
					return {
						type,
						left: {
							type: "VariableDeclaration",
							kind: input[1].value,
							id: input[2],
						},
						right: input[4],
						body: input[6],
					}
				} else {
					return {
						type,
						left: input[1],
						right: input[3],
						body: input[5],
					}
				}
			}
			return [
				[ForInContent[0], createSpecialForHandler("ForInStatement")],
				[ForOfContent[0], createSpecialForHandler("ForOfStatement")],
			];
		})(),
		[ModuleSpecifers[0], input => (input.slice(1, input.length - 1))],
		// 别名直接返回标识符
		[ModuleOptionalAlias[0], input => (input[1])],
		[ModuleSpecifersItem[0], input => {
			// 如果索引1有效且是逗号，则不具有as别名
			if (input[1]?.value === ",") {
				return {
					type: "ModulaSpecifer",
					name: input[0],
					local: input[0],
				}
			} else {
				// 具有 as 别名
				return {
					type: "ModulaSpecifer",
					name: input[0],
					local: input[1],
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
		[Program[0], input=> ({
			type: "Program",
			body: input,
		})],
		// 表达式
		[Statement[0], input => {
			// 如果是函数声明，直接返回，否则包装为 ExpressionStatement
			if (input[0].type === "FunctionExpression") {
				input[0].type = "FunctionDeclaration";
				return input[0];
			}
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
			if (input[1].type === TOKEN_TYPES.STRING_LITERAL) {
				return {
					type: "ImportDeclaration",
					specifers: [],
					source: input[1],
				}
			} else {
				return {
					type: "ImportDeclaration",
					specifers: input[1],
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
		// switch语句
		[Statement[12], input => (input[0])],
		// throw
		[Statement[13], input => (input[0])],
		// 空语句
		[Statement[14], () => ({
			type: "EmptyStatement",
		})],

		[ImportIdentify[0], input => (input[0])],
		[ImportDefault[0], input => (input[0])],
		[ImportSpecifers[0], input => {
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
		[ImportSpecifers[1], input => (input[0])],

		[ExportRedirect[0], input => (input[1])],
		[ExportContent[0], input => {
			// 如果是函数，类型就是函数声明
			input[1].type === "FunctionExpression" && (input[1].type = "FunctionDeclaration");
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
				specifers: input[0],
				source: input[1],
			};
		}],
		[ExportContent[2], input => ({
			type: "ExportNamedDeclaration",
			declaration: input[0],
		})],
		[ExportContent[3], input => {
			// 如果是函数，类型就是函数声明
			input[0].type === "FunctionExpression" && (input[0].type = "FunctionDeclaration");
			return {
				type: "ExportDeclaration",
				declaration: input[0],
			};
		}],
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
	not_end_symbols.ModuleSpecifersItems[0],
	not_end_symbols.FunctionParamsDeclaration[0],
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

window.ll1Infos = {
	firstSets,
	followSets,
	selectSets,
	analyzeTable,
}

function parse(input) {
	const tokens = [...input].reverse();

	const token = tokens[tokens.length - 1];
	const production = analyzeTable.Program.get(token.type) || analyzeTable.Program.get(token.value);

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
			if (sym.match && sym.match(token)) {
				container.children.push(token);
				return true;
			}

			// 没有数据类型，直接检测值是否相等
			if (token.value === sym.value) {
				container.children.push(token);
				return true;
			}
			console.log("failed to parse end sym", token, sym, production, container);
			return false;
		} else {
			const token = tokens[tokens.length - 1];
			// 没有token了，表示已经结束, 直接true
			if (!token) {
				return true;
			}

			// 结束符号，直接匹配，返回 true
			if (token.value === END_SYMBOLS.END_BLOCK.value || token.value === END_SYMBOLS.END_BRACKET.value) {
				return true;
			}

			// 特殊处理
			const specialType = token.specialType;
			if (specialType) {
				// 箭头函数参数特殊处理
				if (specialType === "ArrowFunciton") {
					// 设置下一个token采用函数参数解析(如果不是空参数)
					if (tokens?.[tokens.length - 2]?.value !== ")") {
						tokens[tokens.length - 2].production = not_end_symbols.FunctionParamsDeclaration[0];
					}
				}
				// for in, for of 处理
				if (specialType === "ForInContent") {
					token.production = not_end_symbols.ForInContent[0];
				}
				if (specialType === "ForOfContent") {
					token.production = not_end_symbols.ForOfContent[0];
				}
				// 删除掉该属性，只需要处理一次
				delete token.specialType;
			}

			const name = sym.value;
			// console.log(token.type, analyzeTable?.[name]?.get(token.type), token, sym);
			// 尝试用类型从表中查找所需产生式，(如果是关键字，则前面的找不到，会根据value找)
			let p = analyzeTable?.[name]?.get(token.type) || analyzeTable?.[name]?.get(token.value);

			// console.log(p, name, token, production,index, sym, analyzeTable?.[name]);

			// 某些情况特殊处理的产生式
			if (token.production) {
				p = token.production;
				// 取完就删除，否则会重新进入该部分无限递归
				delete token.production;
			}

			// 如果是 KEYWORD 则可能是 Identify, 即关键字作为标识符,使用标识符查找产生式
			if (!p && token.type === TOKEN_TYPES.KEYWORD && name !== "Statements" /* 语句中不可存在关键字(这样也对于switch中case不做处理) */) {
				p = analyzeTable?.[name]?.get(TOKEN_TYPES.IDENTIFY);
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
				return false;
			}

			// flatProductions 会检测拍平处理，对于一些特殊的产生式，给他拍平就好
			if (flatProductions.includes(p)) {
				const matched = matchProd(p, container);
				if (!matched) {
					console.log("failed to parse expr");
					return false;
				}
				return true;
			} else {
				const subSyntax = { production: p };
				const matched = matchProd(p, subSyntax);
				if (!matched) {
					console.log("failed to parse expr");
					return false;
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
	// console.log(tokens);
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

/*
暂未支持的语法
语句开头的变量字面量
语句开头的没有变量类型的解构
*/

export {
	parse,
	transform,
}