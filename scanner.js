const WHITE_SPACE = /\s/;

const STRING_SYMBOL = /[\'\"]/;
const NUMERTIC_SYMBOL = /[0-9]/;
const HEX_NUMERTIC_SYMBOL = /[0-9a-fA-F]/;

// 目前使用Symbol防止同名异常
const TOKEN_TYPES = {
	IDENTIFY: Symbol("Identify"),
	STRING_LITERAL: Symbol("StringLiteral"),
	NUMERTIC_LITERAL: Symbol("NumerticLiteral"),
	BOOLEAN_LITERAL: Symbol("BooleanLiteral"),
	NULL_LITERAL: Symbol("NullLiteral"),
	SINGLE_SYMBOL: Symbol("SingleSymbol"),
	MULTIPLE_SYMBOL: Symbol("MultipleSymbol"),
	KEYWORD: Symbol("Keyword"),
	COMMENT: Symbol("Comment"),
	TEMPLATE_STRING: Symbol("TemplateString"),
	REGULAR_EXPRESSION_LITERAL: Symbol("RegularExpressionLiteral"),
}

const singleSymbols = {};
[
	"=",
	">",
	"<",
	"(",
	")",
	"{",
	"}",
	"[",
	"]",
	",",
	";",
	":",
	".",
	"?",
	"+",
	"-",
	"*",
	"/",
	"%",
	"~",
	"!",
	"`",
	"\\",
	"|",
	"^",
	"&",
].forEach(key => {
	singleSymbols[key] = true;
});

// 多符号
const multipleSymbols = {};
[
	"?.",

	"=>",

	"==",
	"===",
	"!=",
	"!==",

	"&&",

	"||",
	"??",

	">=",
	">==",
	"<=",
	"<==",

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

	"++",
	"--",

	"...",

	"**",

	"<<",
	">>",
	">>>",

].forEach(key => {
	// 以每个首字符作为开始存储，数组中存储可用的
	if (!multipleSymbols[key[0]]) {
		multipleSymbols[key[0]] = [];
	}
	multipleSymbols[key[0]].push(key);
});

// 一般关键字
const keyWords = {};
[
	"var",
	"let",
	"const",
	"function",
	"import",
	"from",
	"export",
	"as",
	"default",
	"in",
	"of",
	"instanceof",
	"if",
	"else",
	"while",
	"for",
	"return",
	"typeof",
	"void",
	"delete",
	"await",
	"async",
	"new",
	"break",
	"continue",
	"try",
	"catch",
	"finally",
	"switch",
	"case",
	"throw",
	"yield",
	"debugger",
	"with",
	"get",
	"set",
	"class",
	"static",
	"extends",
].forEach(key => {
	keyWords[key] = TOKEN_TYPES.KEYWORD;
});

// 特殊关键词（基础类型字面量，关键字等）,加入到 keywords 中
Object.entries({
	"true": TOKEN_TYPES.BOOLEAN_LITERAL,
	"false": TOKEN_TYPES.BOOLEAN_LITERAL,
	"null": TOKEN_TYPES.NULL_LITERAL,
}).forEach(([key, type]) => {
	keyWords[key] = type;
});

// 已匹配的集合，和输入字符串
function matchMultiple(matchedSet, input) {
	const fourSymbols = input.substring(0, 4);
	const threeSymbols = fourSymbols.substring(0, 3);
	const twoSymbol = threeSymbols.substring(0, 2);

	let matched;

	matched = matchedSet.includes(fourSymbols);
	if (matched) {
		return fourSymbols;
	}

	// 先匹配三个字符，再匹配两个字符
	matched = matchedSet.includes(threeSymbols);
	if (matched) {
		return threeSymbols;
	}
	matched = matchedSet.includes(twoSymbol);

	return matched ? twoSymbol : false;
}

function isSingleSymbol(char) {
	return !!singleSymbols[char];
}

function createToken(input, type) {
	return (
		type ? {
			type,
			value: input,
		} : { value: input }
	);
}

function scanne(code) {
	// 特殊语法标记
	const parenStack = [];
	const preStartParens = [];

	const squareBracketsStack = [];
	const squareBracketsStackIndexesInTokens = [];
	const preStartSquareBracketsStack = [];
	const preStartSquareBracketsStackIndexesInTokens = [];

	const blockStack = [];
	const preStartBlockStack = [];
	let isTemplateString = false;
	let currentTemplateStringDepth = 0;
	const templateSymbolStack = [];
	let currentTemplateStringRaw = "";

	const tokens = [];
	let cursor = 0;
	let currentToken = "";

	// 清空且返回已解析的token
	function pushParsedToken() {
		if (currentToken.length > 0) {
			// 获取类型(如果是模板字符串就是模板类型)
			const type = isTemplateString ? TOKEN_TYPES.TEMPLATE_STRING : (keyWords.hasOwnProperty(currentToken) && keyWords[currentToken]) /*必须是自有属性，不然原型链上可能有toString或者valueOf等方法，不检测的话导致这些关键词不可用*/;

			// 有类型就用那个类型，否则使用 Identify标识符类型
			const token = type ? createToken(currentToken, type) : createToken(currentToken, TOKEN_TYPES.IDENTIFY);

			// for in for of 特殊标记, 加在 for 之后的开始括号上
			// 遇到in of，在for中（在for的第一层括号内，不在表达式括号内）
			if (currentToken === "in" && parenStack?.[parenStack.length - 1]?.tag === "for") {
				parenStack[parenStack.length - 1].specialType = "ForInContent";
			}
			if (currentToken === "of" && parenStack?.[parenStack.length - 1]?.tag === "for") {
				parenStack[parenStack.length - 1].specialType = "ForOfContent";
			}
			// 如果是模板字符串，添加raw
			if (isTemplateString) {
				// console.log(currentTemplateStringRaw);
				token.raw = currentTemplateStringRaw;
			}

			// 添加
			tokens.push(token);
		}
		currentToken = "";
		// 当前模板字符串的 raw 也清空
		currentTemplateStringRaw = "";
	}

	// 解析被相同符号包裹的字面量，字符串和正则表达式模式主体
	function parseWrapLiteral(startSymbol /* 开始符号，可能是 " ' / */) {
		let char;
		let value = "";
		let raw = "";
		// 是正则解析
		let isRegExpParse = startSymbol === "/";
		while (true) {
			cursor += 1;
			if (cursor >= code.length) {
				console.log("failed to parse string");
				return false;
			}
			char = code[cursor];
			// 如果遇到符号就结束
			if (char === startSymbol) {
				// 非正则或者前一个字符不是 \ 就break, 正则的话可能会出现转移 \/
				if(!isRegExpParse || value[value.length - 1] !== "\\") {
					break;
				};
			}
			// 转义字符处理, 如果 startSymbol 是 /, 则是正则表达式，为正则主体的一部分，不是转义，故不处理
			if (char === "\\" && !isRegExpParse) {
				raw += char;
				// 跳过
				cursor += 1;
				const targetChar = code[cursor];
				value += targetChar;
				raw += targetChar;
				continue;
			}
			value += char;
			raw += char;
		}
		raw = startSymbol + raw + startSymbol;
		// 跳过结束符号
		cursor += 1;
		return {
			value,
			raw,
		};
	}

	function parseNumertic(firstNumertic) {
		let numerticLiteral = firstNumertic;
		let char;

		// 非10进制
		let noDecimal = false;
		// 是否有一个点
		let hadPoint = false;

		// 16进制标识
		let isHex = false;

		// 去掉开头（开头已经检测过了，不需要再次检测）
		cursor += 1;

		// 十六进制，八进制，二进制 (匹配第二个字符)
		char = code[cursor];
		if (/[xXoObB]/.test(char)) {
			numerticLiteral += char;
			cursor += 1;
			// 十六进制
			if (char === "x") {
				isHex = true;
			}
			noDecimal = true;
		}

		while (cursor < code.length) {

			char = code[cursor];
			// big int 处理，直接结束
			if(char === "n") {
				// 如果bigint带. 抛出错误
				if(hadPoint) {
					throw new SyntaxError("valid or unexpected token");
				}
				numerticLiteral += char;
				cursor += 1;
				break;
			}
			// 数字可以带下划线_, 只有10进制可以带一个.
			if (char === "_" || (!hadPoint && !noDecimal && char === ".") || (isHex ? HEX_NUMERTIC_SYMBOL.test(char) : NUMERTIC_SYMBOL.test(char))) {
				if (char === ".") {
					// 已有点
					hadPoint = true;
				}
				numerticLiteral += char;
				cursor += 1;
			} else {
				break;
			}
		}
		// 以.结尾，则不是小数，而是属性获取，不解析为数字，cursor-1
		if (numerticLiteral[numerticLiteral.length - 1] === ".") {
			cursor -= 1;
			numerticLiteral = numerticLiteral.slice(0, numerticLiteral.length - 1);
		}
		// 如果最后出现分隔符，报错
		const tokenLength = numerticLiteral.length;
		if(numerticLiteral[tokenLength - 1] === "_" || numerticLiteral.substring(tokenLength - 2) === "_n") {
			throw new SyntaxError("Numeric separator is not allowed at the last of digits ");
		}
		return numerticLiteral;
	}

	// 正则表达式的有效上个字符, 有一种没有意义的情况不支持,在（ if(condition) /regexp pattern/igs else /regexp pattern/igs） 这种情况下应当被解析为正则，但无意义，故暂不支持
	const regExpValidPreSymbols = {
		"{": true,
		"(": true,
		"[": true,

		"=": true,
		">": true,
		"<": true,

		",": true,
		";": true,
		":": true,

		"|": true,
		"&": true,
		"?": true,
		"^": true,

		"!": true,
		"~": true,

		"+": true,
		"-": true,
		"*": true,
		"/": true, // 这里可以是除号，下面检测的是上下 token, 如果 // 紧挨着也会被正确判断为注释，因为注释检测在正则检测之前（见下面具体执行分析的代码）
		"%": true,
	};
	// 检测是否是正则
	function isRegExp() {
		// 如果上个token是不可视为除号处理的情况，就视为正则表达式解析
		const preToken = tokens[tokens.length - 1];
		// 如果代码开头就是 / ， 那也视为正则，若开头是 / 则上个 token 就不存在
		if (!preToken || regExpValidPreSymbols[tokens[tokens.length - 1].value]) {
			return true;
		}
		return false;
	}
	function parseRegExp() {
		const regExpPatternContent = parseWrapLiteral("/");
		let flags = "";
		// 正则的有效flags
		const validFlags = {
			"i": true,
			"g": true,
			"s": true,
			"m": true,
		};
		// 非空格，非符号，视为flags进行解析
		while (cursor < code.length) {
			const char = code[cursor];
			if (!WHITE_SPACE.test(char) && !singleSymbols[char]) {
				if (validFlags[char]) {
					// 一个标记只能有一个
					validFlags[char] = false;

					flags += char;
					cursor += 1;
				} else {
					throw new SyntaxError("Invalid regular expression flags");
				}
			} else {
				break;
			}
		}
		return {
			type: TOKEN_TYPES.REGULAR_EXPRESSION_LITERAL,
			value: {},
			raw: `${regExpPatternContent.raw}${flags}`,
			regex: {
				pattern: regExpPatternContent.value,
				flags,
			}
		}
	}

	while (cursor < code.length) {
		const char = code[cursor];

		// 模板字符串的话，就直接下一个
		if (isTemplateString) {
			// 转义字符处理
			if (char === "\\") {
				// 把转义字符加入 raw
				currentTemplateStringRaw += char;
				// 把被转义字符加入两者
				cursor += 1;
				const targetChar = code[cursor];
				currentToken += targetChar;
				currentTemplateStringRaw += targetChar;
				// 跳过被转义字符
				cursor += 1;
				continue;
			}

			if ((!(char === "{" && code[cursor - 1] === "$" && code[cursor - 2] !== "\\" /* 转义字符检测 */)) && char !== "`") {
				cursor += 1;
				currentToken += char;
				currentTemplateStringRaw += char;
				continue;
			}
		}

		// 单行注释检测
		if (code.substring(cursor, cursor + 2) == "//") {
			pushParsedToken();
			cursor += 2;

			let comment = "";
			// 遇到换行就结束
			while (code[cursor] !== "\r" && code[cursor] !== "\n" && cursor < code.length) {
				comment += code[cursor];
				cursor += 1;
			}
			// 目前直接去除注释
			// tokens.push(createToken(comment, TOKEN_TYPES.COMMENT));
			continue;
		}
		// 多行注释检测
		if (code.substring(cursor, cursor + 2) == "/*") {
			pushParsedToken();
			cursor += 2;
			let comment = "";
			while (code.substring(cursor, cursor + 2) !== "*/") {
				comment += code[cursor];
				cursor += 1;
			}
			// 目前直接去除注释
			// tokens.push(createToken(comment, TOKEN_TYPES.COMMENT));
			cursor += 2;
			continue;
		}
		// 正则检测
		if (char === "/") {
			if (isRegExp()) {
				pushParsedToken();
				const resultToken = parseRegExp();
				// 正则形式特殊，直接添加，具体 token 相关信息在上面的函数中已经添加了，不需要 createToken 操作
				tokens.push(resultToken);
				continue;
			}
		}
		// 先检测是否可以匹配多个
		const multipleStartMatched = multipleSymbols[char];
		if (multipleStartMatched) {
			const multipleMatched = matchMultiple(multipleStartMatched, code.substring(cursor, cursor + 4));
			if (multipleMatched) {
				// 运算符匹配成功，则首先将之前的字符(如果有的话)添加为token
				pushParsedToken();
				// cursor 添加匹配的运算符的长度
				cursor += multipleMatched.length;

				// 遇到箭头函数，给已纪录的开始的箭头打标记,只对于带括号的箭头函数生效，用于后面语法分析的参数解析
				if (multipleMatched === "=>" && tokens[tokens.length - 1].value === ")") {
					preStartParens[preStartParens.length - 1].specialType = "ArrowFunciton";
				}

				// 添加已匹配的运算符
				tokens.push(createToken(multipleMatched, TOKEN_TYPES.MULTIPLE_SYMBOL));
				continue;
			}
		}
		// 字符串处理
		if (STRING_SYMBOL.test(char)) {
			pushParsedToken();
			const string = parseWrapLiteral(char);
			if (string) {
				tokens.push(createToken(string, TOKEN_TYPES.STRING_LITERAL));
				continue;
			} else {
				return false;
			}
		}
		// 空白处理
		if (WHITE_SPACE.test(char)) {
			pushParsedToken();
			cursor += 1;
			continue;
		}
		// 纯数字处理
		if (currentToken.length === 0 && NUMERTIC_SYMBOL.test(char)) {
			const numertic = parseNumertic(char);
			if (numertic) {
				tokens.push(createToken(numertic, TOKEN_TYPES.NUMERTIC_LITERAL));
				continue;
			} else {
				return false;
			}
		}
		// 单符号处理
		if (isSingleSymbol(char)) {
			// 添加原来的token
			pushParsedToken();
			const resultToken = createToken(char, TOKEN_TYPES.SINGLE_SYMBOL);

			// 如果点后紧跟数字，则是小数的另一种写法
			if (char == "." && NUMERTIC_SYMBOL.test(code[cursor + 1])) {
				// 跳过.
				cursor += 1;
				// 浮点数部分,从cursor开始
				const floatNumerticPart = parseNumertic(code[cursor]);
				if (floatNumerticPart) {
					// 将.拼接到前面
					tokens.push(createToken("." + String(floatNumerticPart), TOKEN_TYPES.NUMERTIC_LITERAL));
					continue;
				} else {
					return false;
				}
			}

			// 括号和for循环标记
			if (char === "(") {
				// 打标记表示是for循环, 但不确定是一般 for | for in | for of ，等待后面判定使用
				if (tokens?.[tokens.length - 1]?.value === "for") {
					resultToken.tag = "for";
				}else if(tokens?.[tokens.length - 2]?.value === "for" && tokens?.[tokens.length - 1]?.value === "await") { // 通过 for await 直接确定是 for await of，直接在 await 上标记特殊类型
					tokens[tokens.length - 1].specialType = "ForOfContent";
				}
				parenStack.push(resultToken);
			} else if (char === ")") {
				const startBracket = parenStack.pop();
				// 如果有消除标记
				if (startBracket?.tag) {
					delete startBracket.tag;
				}
				preStartParens.push(startBracket);
			} else if (char === "{") {// 花括号和模板字符串

				// 是模板字符串内，就做动作
				if (isTemplateString && code[cursor - 1] === "$" && code[cursor - 2] !== "\\" /* 转义字符检测 */) {
					// 获取上一个token
					const preValue = tokens?.[tokens.length - 1]?.value;
					// 超过一个字符，将$符号独立出去
					if (preValue.length > 1) {
						// value 和 raw 都需要截取
						tokens[tokens.length - 1].value = preValue.slice(0, preValue.length - 1);
						const preRaw = tokens[tokens.length - 1].raw;
						tokens[tokens.length - 1].raw = preRaw.slice(0, preRaw.length - 1);
						// 将$符号作为一个单符号添加
						tokens.push(createToken("$", TOKEN_TYPES.SINGLE_SYMBOL));
					} else {
						// 只有一个字符，直接设置为一个 $
						tokens[tokens.length - 1] = createToken("$", TOKEN_TYPES.SINGLE_SYMBOL);
					}
					resultToken.tag = "templateStringExpression";
					currentTemplateStringDepth += 1;
					isTemplateString = false;
				}
				blockStack.push(resultToken);
			} else if (char === "}") {
				const startSymbol = blockStack.pop();
				if (startSymbol?.tag === "templateStringExpression") {
					currentTemplateStringDepth -= 1;
					isTemplateString = true;
				}
				preStartBlockStack.push(startSymbol);
			} else if (char === "[") {
				// 保存符号，以及在 tokens 中的索引，因为后面没有动作了直接添加进去，所以直接是 tokens.length
				squareBracketsStack.push(resultToken);
				squareBracketsStackIndexesInTokens.push(tokens.length);
			} else if (char === "]") {
				// 存储开始括号索引以及其本身 
				preStartSquareBracketsStackIndexesInTokens.push(squareBracketsStackIndexesInTokens.pop());
				preStartSquareBracketsStack.push(squareBracketsStack.pop());
			} else if (char === "=") { // 对于解构表达式的处理
				// 对于上一个字符是 } 的情况，只有对象解构
				if (tokens[tokens.length - 1]?.value === "}") {
					preStartBlockStack[preStartBlockStack.length - 1].specialType = "ObjectDestructure";
				}else if (tokens[tokens.length - 1]?.value === "]") {
					// 获取上一个开始括号在 tokens 中的 index
					const preStartSquareBracketIndex = preStartSquareBracketsStackIndexesInTokens[preStartSquareBracketsStackIndexesInTokens.length - 1];
					// 取得当前关闭括号对应的开始括号前一个字符(当前关闭括号对应的开始括号在 tokens 中的 index 减 1)
					const preTokenInPreStartSquareBracket = tokens[preStartSquareBracketIndex - 1];
					// 检测前一个字符确定是否是解构语法
					if (!preTokenInPreStartSquareBracket || ["[", "(", "{", "}", ",", ";", ":"].includes(preTokenInPreStartSquareBracket.value)) {
						tokens[preStartSquareBracketIndex].specialType = "ArrayDestructure";
					}
				}
			} else if (char === "`") {
				resultToken.templateStringDepth = currentTemplateStringDepth;
				// 与上一个深度相同，则为结束模板字符串
				if (templateSymbolStack?.[templateSymbolStack.length - 1]?.templateStringDepth === resultToken.templateStringDepth) {
					isTemplateString = false;
					templateSymbolStack.pop();
				} else {
					isTemplateString = true;
					templateSymbolStack.push(resultToken);
				}
			}

			// 添加该符号
			tokens.push(resultToken);
			cursor += 1;
			continue;
		}

		cursor += 1;
		currentToken += char;
	}

	// 添加末尾
	pushParsedToken();

	return tokens;
}

export {
	TOKEN_TYPES
}

export { scanne };