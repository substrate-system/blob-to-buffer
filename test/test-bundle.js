"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

  // node_modules/@bicycle-codes/tapzero/dist/index.js
  var __defProp2 = Object.defineProperty;
  var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
  function equal(a, b) {
    if (a === b)
      return true;
    if (a && b && typeof a == "object" && typeof b == "object") {
      if (a.constructor !== b.constructor)
        return false;
      var length, i, keys;
      if (Array.isArray(a)) {
        length = a.length;
        if (length != b.length)
          return false;
        for (i = length; i-- !== 0; )
          if (!equal(a[i], b[i]))
            return false;
        return true;
      }
      if (a.constructor === RegExp)
        return a.source === b.source && a.flags === b.flags;
      if (a.valueOf !== Object.prototype.valueOf)
        return a.valueOf() === b.valueOf();
      if (a.toString !== Object.prototype.toString)
        return a.toString() === b.toString();
      keys = Object.keys(a);
      length = keys.length;
      if (length !== Object.keys(b).length)
        return false;
      for (i = length; i-- !== 0; )
        if (!Object.prototype.hasOwnProperty.call(b, keys[i]))
          return false;
      for (i = length; i-- !== 0; ) {
        var key = keys[i];
        if (!equal(a[key], b[key]))
          return false;
      }
      return true;
    }
    return a !== a && b !== b;
  }
  __name(equal, "equal");
  __name2(equal, "equal");
  var NEW_LINE_REGEX = /\n/g;
  var OBJ_TO_STRING = Object.prototype.toString;
  var AT_REGEX = new RegExp(
    // non-capturing group for 'at '
    "^(?:[^\\s]*\\s*\\bat\\s+)(?:(.*)\\s+\\()?((?:\\/|[a-zA-Z]:\\\\)[^:\\)]+:(\\d+)(?::(\\d+))?)\\)$"
  );
  var CACHED_FILE;
  var _a;
  var Test = (_a = class {
    /**
     * @constructor
     * @param {string} name
     * @param {TestFn} fn
     * @param {TestRunner} runner
     */
    constructor(name, fn, runner) {
      this.name = name;
      this._planned = null;
      this._actual = null;
      this.fn = fn;
      this.runner = runner;
      this._result = {
        pass: 0,
        fail: 0
      };
      this.done = false;
      this.strict = runner.strict;
    }
    /**
     * @param {string} msg
     * @returns {void}
     */
    comment(msg) {
      this.runner.report("# " + msg);
    }
    /**
     * Plan the number of assertions.
     *
     * @param {number} n
     * @returns {void}
     */
    plan(n) {
      this._planned = n;
    }
    /**
     * @template T
     * @param {T} actual
     * @param {T} expected
     * @param {string} [msg]
     * @returns {void}
     */
    deepEqual(actual, expected, msg) {
      if (this.strict && !msg)
        throw new Error("tapzero msg required");
      this._assert(
        equal(actual, expected),
        actual,
        expected,
        msg || "should be equivalent",
        "deepEqual"
      );
    }
    /**
     * @template T
     * @param {T} actual
     * @param {T} expected
     * @param {string} [msg]
     * @returns {void}
     */
    notDeepEqual(actual, expected, msg) {
      if (this.strict && !msg)
        throw new Error("tapzero msg required");
      this._assert(
        !equal(actual, expected),
        actual,
        expected,
        msg || "should not be equivalent",
        "notDeepEqual"
      );
    }
    /**
     * @template T
     * @param {T} actual
     * @param {T} expected
     * @param {string} [msg]
     * @returns {void}
     */
    equal(actual, expected, msg) {
      if (this.strict && !msg)
        throw new Error("tapzero msg required");
      this._assert(
        // eslint-disable-next-line eqeqeq
        actual == expected,
        actual,
        expected,
        msg || "should be equal",
        "equal"
      );
    }
    /**
     * @param {unknown} actual
     * @param {unknown} expected
     * @param {string} [msg]
     * @returns {void}
     */
    notEqual(actual, expected, msg) {
      if (this.strict && !msg)
        throw new Error("tapzero msg required");
      this._assert(
        // eslint-disable-next-line eqeqeq
        actual != expected,
        actual,
        expected,
        msg || "should not be equal",
        "notEqual"
      );
    }
    /**
     * @param {string} [msg]
     * @returns {void}
     */
    fail(msg) {
      if (this.strict && !msg)
        throw new Error("tapzero msg required");
      this._assert(
        false,
        "fail called",
        "fail not called",
        msg || "fail called",
        "fail"
      );
    }
    /**
     * @param {unknown} actual
     * @param {string} [msg]
     * @returns {void}
     */
    ok(actual, msg) {
      if (this.strict && !msg)
        throw new Error("tapzero msg required");
      this._assert(
        !!actual,
        actual,
        "truthy value",
        msg || "should be truthy",
        "ok"
      );
    }
    /**
     * @param {Error | null | undefined} err
     * @param {string} [msg]
     * @returns {void}
     */
    ifError(err, msg) {
      if (this.strict && !msg)
        throw new Error("tapzero msg required");
      this._assert(
        !err,
        err,
        "no error",
        msg || String(err),
        "ifError"
      );
    }
    /**
     * @param {Function} fn
     * @param {RegExp | any} [expected]
     * @param {string} [message]
     * @returns {Promise<void>}
     */
    async throws(fn, expected, message) {
      if (typeof expected === "string") {
        message = expected;
        expected = void 0;
      }
      if (this.strict && !message)
        throw new Error("tapzero msg required");
      let caught = void 0;
      try {
        await fn();
      } catch (err) {
        caught = /** @type {Error} */
        err;
      }
      let pass = !!caught;
      if (expected instanceof RegExp) {
        pass = !!(caught && expected.test(caught.message));
      } else if (expected) {
        throw new Error(`t.throws() not implemented for expected: ${typeof expected}`);
      }
      this._assert(pass, caught, expected, message || "should throw", "throws");
    }
    /**
     * @param {boolean} pass
     * @param {unknown} actual
     * @param {unknown} expected
     * @param {string} description
     * @param {string} operator
     * @returns {void}
     */
    _assert(pass, actual, expected, description, operator) {
      if (this.done) {
        throw new Error(
          "assertion occurred after test was finished: " + this.name
        );
      }
      if (this._planned !== null) {
        this._actual = (this._actual || 0) + 1;
        if (this._actual > this._planned) {
          throw new Error(`More tests than planned in TEST *${this.name}*`);
        }
      }
      const report = this.runner.report;
      const prefix = pass ? "ok" : "not ok";
      const id = this.runner.nextId();
      report(`${prefix} ${id} ${description}`);
      if (pass) {
        this._result.pass++;
        return;
      }
      const atErr = new Error(description);
      let err = atErr;
      if (actual && OBJ_TO_STRING.call(actual) === "[object Error]") {
        err = /** @type {Error} */
        actual;
        actual = err.message;
      }
      this._result.fail++;
      report("  ---");
      report(`    operator: ${operator}`);
      let ex = toJSON(expected);
      let ac = toJSON(actual);
      if (Math.max(ex.length, ac.length) > 65) {
        ex = ex.replace(NEW_LINE_REGEX, "\n      ");
        ac = ac.replace(NEW_LINE_REGEX, "\n      ");
        report(`    expected: |-
      ${ex}`);
        report(`    actual:   |-
      ${ac}`);
      } else {
        report(`    expected: ${ex}`);
        report(`    actual:   ${ac}`);
      }
      const at = findAtLineFromError(atErr);
      if (at) {
        report(`    at:       ${at}`);
      }
      report("    stack:    |-");
      const st = (err.stack || "").split("\n");
      for (const line of st) {
        report(`      ${line}`);
      }
      report("  ...");
    }
    /**
     * @returns {Promise<{
     *   pass: number,
     *   fail: number
     * }>}
     */
    async run() {
      this.runner.report("# " + this.name);
      const maybeP = this.fn(this);
      if (maybeP && typeof maybeP.then === "function") {
        await maybeP;
      }
      this.done = true;
      if (this._planned !== null) {
        if (this._planned > (this._actual || 0)) {
          throw new Error(
            `Test ended before the planned number
          planned: ${this._planned}
          actual: ${this._actual || 0}
          `
          );
        }
      }
      return this._result;
    }
  }, __name(_a, "Test"), __name2(_a, "Test"), _a);
  function getTapZeroFileName() {
    if (CACHED_FILE)
      return CACHED_FILE;
    const e = new Error("temp");
    const lines = (e.stack || "").split("\n");
    for (const line of lines) {
      const m = AT_REGEX.exec(line);
      if (!m) {
        continue;
      }
      let fileName = m[2];
      if (m[4] && fileName.endsWith(`:${m[4]}`)) {
        fileName = fileName.slice(0, fileName.length - m[4].length - 1);
      }
      if (m[3] && fileName.endsWith(`:${m[3]}`)) {
        fileName = fileName.slice(0, fileName.length - m[3].length - 1);
      }
      CACHED_FILE = fileName;
      break;
    }
    return CACHED_FILE || "";
  }
  __name(getTapZeroFileName, "getTapZeroFileName");
  __name2(getTapZeroFileName, "getTapZeroFileName");
  function findAtLineFromError(e) {
    const lines = (e.stack || "").split("\n");
    const dir = getTapZeroFileName();
    for (const line of lines) {
      const m = AT_REGEX.exec(line);
      if (!m) {
        continue;
      }
      if (m[2].slice(0, dir.length) === dir) {
        continue;
      }
      return `${m[1] || "<anonymous>"} (${m[2]})`;
    }
    return "";
  }
  __name(findAtLineFromError, "findAtLineFromError");
  __name2(findAtLineFromError, "findAtLineFromError");
  var _a2;
  var TestRunner = (_a2 = class {
    /**
     * @constructor
     * @param {(lines: string) => void} [report]
     */
    constructor(report) {
      this.report = report || printLine;
      this.tests = [];
      this.onlyTests = [];
      this.scheduled = false;
      this._id = 0;
      this.completed = false;
      this.rethrowExceptions = true;
      this.strict = false;
      this._onFinishCallback = void 0;
    }
    /**
     * @returns {string}
     */
    nextId() {
      return String(++this._id);
    }
    /**
     * @param {string} name
     * @param {TestFn} fn
     * @param {boolean} only
     * @returns {void}
     */
    add(name, fn, only2) {
      if (this.completed) {
        throw new Error("Cannot add() a test case after tests completed.");
      }
      const t = new Test(name, fn, this);
      const arr = only2 ? this.onlyTests : this.tests;
      arr.push(t);
      if (!this.scheduled) {
        this.scheduled = true;
        setTimeout(() => {
          const promise = this.run();
          if (this.rethrowExceptions) {
            promise.then(null, rethrowImmediate);
          }
        }, 0);
      }
    }
    /**
     * @returns {Promise<void>}
     */
    async run() {
      const ts = this.onlyTests.length > 0 ? this.onlyTests : this.tests;
      this.report("TAP version 13");
      let total = 0;
      let success = 0;
      let fail = 0;
      for (const test2 of ts) {
        const result = await test2.run();
        total += result.fail + result.pass;
        success += result.pass;
        fail += result.fail;
      }
      this.completed = true;
      this.report("");
      this.report(`1..${total}`);
      this.report(`# tests ${total}`);
      this.report(`# pass  ${success}`);
      if (fail) {
        this.report(`# fail  ${fail}`);
      } else {
        this.report("");
        this.report("# ok");
      }
      if (this._onFinishCallback) {
        this._onFinishCallback({ total, success, fail });
      } else {
        if (typeof process !== "undefined" && typeof process.exit === "function" && typeof process.on === "function" && Reflect.get(process, "browser") !== true) {
          process.on("exit", function(code) {
            if (typeof code === "number" && code !== 0) {
              return;
            }
            if (fail) {
              process.exit(1);
            }
          });
        }
      }
    }
    /**
     * @param {(result: { total: number, success: number, fail: number }) => void} callback
     * @returns {void}
     */
    onFinish(callback) {
      if (typeof callback === "function") {
        this._onFinishCallback = callback;
      } else
        throw new Error("onFinish() expects a function");
    }
  }, __name(_a2, "TestRunner"), __name2(_a2, "TestRunner"), _a2);
  function printLine(line) {
    console.log(line);
  }
  __name(printLine, "printLine");
  __name2(printLine, "printLine");
  var GLOBAL_TEST_RUNNER = new TestRunner();
  function only(name, fn) {
    if (!fn)
      return;
    GLOBAL_TEST_RUNNER.add(name, fn, true);
  }
  __name(only, "only");
  __name2(only, "only");
  function skip(_name, _fn) {
  }
  __name(skip, "skip");
  __name2(skip, "skip");
  function setStrict(strict) {
    GLOBAL_TEST_RUNNER.strict = strict;
  }
  __name(setStrict, "setStrict");
  __name2(setStrict, "setStrict");
  function test(name, fn) {
    if (!fn)
      return;
    GLOBAL_TEST_RUNNER.add(name, fn, false);
  }
  __name(test, "test");
  __name2(test, "test");
  test.only = only;
  test.skip = skip;
  function rethrowImmediate(err) {
    setTimeout(rethrow, 0);
    function rethrow() {
      throw err;
    }
    __name(rethrow, "rethrow");
    __name2(rethrow, "rethrow");
  }
  __name(rethrowImmediate, "rethrowImmediate");
  __name2(rethrowImmediate, "rethrowImmediate");
  function toJSON(thing) {
    const replacer = /* @__PURE__ */ __name2((_k, v) => v === void 0 ? "_tz_undefined_tz_" : v, "replacer");
    const json = JSON.stringify(thing, replacer, "  ") || "undefined";
    return json.replace(/"_tz_undefined_tz_"/g, "undefined");
  }
  __name(toJSON, "toJSON");
  __name2(toJSON, "toJSON");

  // src/index.ts
  async function blobToBuffer(blob2) {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.addEventListener("loadend", onLoadEnd, false);
      reader.addEventListener("error", onErr, false);
      reader.readAsArrayBuffer(blob2);
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

  // test/index.ts
  var blob = new Blob([new Uint8Array([1, 2, 3])], {
    type: "application/octet-binary"
  });
  test("Basic tests", async (t) => {
    const buf = await blobToBuffer(blob);
    t.deepEqual(buf, Buffer.from([1, 2, 3]));
  });
})();
