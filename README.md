## unstable-parser
一个 Javascript 解析器，可以将js代码解析为AST(抽象语法树)  
该解析器目前处于实验阶段，请勿在生产环境中使用  
目前该解析器已经可以解析大多数JS语法，只有极少数语法不支持  
解析出的AST已经基本符合 [ESTree规范](https://github.com/estree/estree)

### 使用方法
#### 在线使用
[在线解析](https://ecuder.cn/Parser)  
以一个基本的防抖函数为例  
进入上述网站，在左侧粘贴下列代码，并点击上方解析按钮  
```javascript
export function debounce(fn, delay, self = null) {
	let timer = null;
	return function(...args) {
		if(timer) {clearTimeout(timer)}
		timer = setTimeout(()=> {
			self ? fn.apply(self, args) : fn.apply(window, args);
		}, delay);
	}
}
```
会输出以下AST
```javascript

{
  "type": "Program",
  "body": [
    {
      "type": "ExportDeclaration",
      "declaration": {
        "type": "FunctionDeclaration",
        "body": {
          "type": "BlockStatement",
          "body": [
            {
              "type": "VariableDeclaration",
              "kind": "let",
              "declarations": [
                {
                  "type": "VariableDeclarator",
                  "id": {
                    "type": "Identifier",
                    "value": "timer",
                    "name": "timer"
                  },
                  "init": {
                    "type": "Literal",
                    "value": null,
                    "raw": "null"
                  }
                }
              ]
            },
            {
              "type": "ReturnStatement",
              "argument": {
                "type": "FunctionExpression",
                "body": {
                  "type": "BlockStatement",
                  "body": [
                    {
                      "type": "IfStatement",
                      "test": {
                        "type": "Identifier",
                        "value": "timer",
                        "name": "timer"
                      },
                      "consequent": {
                        "type": "BlockStatement",
                        "body": [
                          {
                            "type": "ExpressionStatement",
                            "expression": {
                              "type": "CallExpression",
                              "callee": {
                                "type": "Identifier",
                                "value": "clearTimeout",
                                "name": "clearTimeout"
                              },
                              "arguments": [
                                {
                                  "type": "Identifier",
                                  "value": "timer",
                                  "name": "timer"
                                }
                              ],
                              "optional": false
                            }
                          }
                        ]
                      }
                    },
                    {
                      "type": "ExpressionStatement",
                      "expression": {
                        "type": "AssignmentExpression",
                        "operator": "=",
                        "left": {
                          "type": "Identifier",
                          "value": "timer",
                          "name": "timer"
                        },
                        "right": {
                          "type": "CallExpression",
                          "callee": {
                            "type": "Identifier",
                            "value": "setTimeout",
                            "name": "setTimeout"
                          },
                          "arguments": [
                            {
                              "type": "ArrowFunctionExpression",
                              "params": [],
                              "body": {
                                "type": "BlockStatement",
                                "body": [
                                  {
                                    "type": "ExpressionStatement",
                                    "expression": {
                                      "test": {
                                        "type": "Identifier",
                                        "value": "self",
                                        "name": "self"
                                      },
                                      "type": "ConditionalExpression",
                                      "consequent": {
                                        "type": "CallExpression",
                                        "callee": {
                                          "type": "MemberExpression",
                                          "object": {
                                            "type": "Identifier",
                                            "value": "fn",
                                            "name": "fn"
                                          },
                                          "property": {
                                            "type": "Identifier",
                                            "value": "apply",
                                            "name": "apply"
                                          },
                                          "optional": false
                                        },
                                        "arguments": [
                                          {
                                            "type": "Identifier",
                                            "value": "self",
                                            "name": "self"
                                          },
                                          {
                                            "type": "Identifier",
                                            "value": "args",
                                            "name": "args"
                                          }
                                        ],
                                        "optional": false
                                      },
                                      "alternate": {
                                        "type": "CallExpression",
                                        "callee": {
                                          "type": "MemberExpression",
                                          "object": {
                                            "type": "Identifier",
                                            "value": "fn",
                                            "name": "fn"
                                          },
                                          "property": {
                                            "type": "Identifier",
                                            "value": "apply",
                                            "name": "apply"
                                          },
                                          "optional": false
                                        },
                                        "arguments": [
                                          {
                                            "type": "Identifier",
                                            "value": "window",
                                            "name": "window"
                                          },
                                          {
                                            "type": "Identifier",
                                            "value": "args",
                                            "name": "args"
                                          }
                                        ],
                                        "optional": false
                                      }
                                    }
                                  }
                                ]
                              }
                            },
                            {
                              "type": "Identifier",
                              "value": "delay",
                              "name": "delay"
                            }
                          ],
                          "optional": false
                        }
                      }
                    }
                  ]
                },
                "id": null,
                "generator": false,
                "params": [
                  {
                    "type": "RestElement",
                    "name": {
                      "type": "Identifier",
                      "value": "args",
                      "name": "args"
                    }
                  }
                ]
              }
            }
          ]
        },
        "id": {
          "type": "Identifier",
          "value": "debounce",
          "name": "debounce"
        },
        "generator": false,
        "params": [
          {
            "type": "Identifier",
            "value": "fn",
            "name": "fn"
          },
          {
            "type": "Identifier",
            "value": "delay",
            "name": "delay"
          },
          {
            "type": "AssignmentPattern",
            "left": {
              "type": "Identifier",
              "value": "self",
              "name": "self"
            },
            "right": {
              "type": "Literal",
              "value": null,
              "raw": "null"
            }
          }
        ]
      }
    }
  ]
}
```
#### 通过npm使用
##### 安装
npm install unstable-parser
##### 使用
```javascript
import { parse } from "unstable-parser";
const ast = parse("需要解析的代码");
```

#### 通过公共CDN使用
以 skypack 为例
```javascript
import("https://cdn.skypack.dev/unstable-parser").then(({parse})=> {
    const ast = parse("需要解析的代码");
})
```