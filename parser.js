import { scanne } from "./scanner.js";
import { parse as parseToProduction, transform } from "./LL1_parser.js";

export { getLL1Infos } from "./LL1_parser.js";

const parse = (code) => transform(parseToProduction(scanne(code)));

export { parse };