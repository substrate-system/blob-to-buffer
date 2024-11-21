"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var src_exports = {};
__export(src_exports, {
  blobToBuffer: () => blobToBuffer,
  default: () => src_default
});
module.exports = __toCommonJS(src_exports);
async function blobToBuffer(blob) {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.addEventListener("loadend", onLoadEnd, false);
    reader.addEventListener("error", onErr, false);
    reader.readAsArrayBuffer(blob);
    function onErr(ev) {
      reader.removeEventListener("error", onErr, false);
      reader.removeEventListener("loadend", onLoadEnd, false);
      reject(ev);
    }
    __name(onErr, "onErr");
    function onLoadEnd() {
      reader.removeEventListener("loadend", onLoadEnd, false);
      reader.removeEventListener("error", onErr, false);
      resolve(reader.result);
    }
    __name(onLoadEnd, "onLoadEnd");
  });
}
__name(blobToBuffer, "blobToBuffer");
var src_default = blobToBuffer;
//# sourceMappingURL=index.cjs.map
