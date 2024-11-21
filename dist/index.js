var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
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
export {
  blobToBuffer,
  src_default as default
};
//# sourceMappingURL=index.js.map
