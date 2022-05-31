import { scanne } from "./scanner.js";
import { parse, transform } from "./LL1_parser.js";

export default function parseCode(code) {
  return transform(parse(scanne(code)));
}