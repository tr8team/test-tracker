import { should } from "chai";
// @ts-ignore
import { actionScripts, emulateAction } from "./helper";

should();


describe("logger", function() {

  describe("debug", function() {
    it("should print debug logs", function() {
      const output = emulateAction({
        relativePath: [...actionScripts, "logger", "debug.ts"]
      });

      output.should.deep.equal({
        debug: [
          {
            content: "hydrogen is 1",
            meta: {}
          }
        ]
      })
    });
  });

  describe("notice", function() {
    it("should print notice logs", function() {
      const output = emulateAction({
        relativePath: [...actionScripts, "logger", "notice.ts"]
      });

      output.should.deep.equal({
        notice: [
          {
            content: "helium is 2",
            meta: {}
          }
        ]
      })
    });
  });

  describe("info", function() {
    it("should print info logs", function() {
      const output = emulateAction({
        relativePath: [...actionScripts, "logger", "info.ts"]
      });
      output.should.deep.equal({
        info: [
          {
            content: "lithium is 3",
            meta: {}
          }
        ]
      })
    });
  });

  describe("warning", function() {
    it("should print warning logs", function() {
      const output = emulateAction({
        relativePath: [...actionScripts, "logger", "warning.ts"]
      });

      output.should.deep.equal({
        warning: [
          {
            content: "beryllium is 4",
            meta: {}
          }
        ]
      })
    });
  });

  describe("error", function() {
    it("should print error logs", function() {
      const output = emulateAction({
        relativePath: [...actionScripts, "logger", "error.ts"]
      });

      output.should.deep.equal({
        error: [
          {
            content: "boron is 5",
            meta: {}
          }
        ]
      })
    });
  });

  it("should print all kind of logs", function() {
    const output = emulateAction({
      relativePath: [...actionScripts, "logger", "mix.ts"]
    });

    output.should.deep.equal({
      debug: [
        {
          content: "H is Hydrogen with atomic number 1",
          meta: {}
        }
      ],
      notice: [
        {
          content: "He is Helium with atomic number 2",
          meta: {}
        }
      ],
      info: [
        {
          content: "Li is Lithium with atomic number 3",
          meta: {}
        }
      ],
      warning: [
        {
          content: "Be is Beryllium with atomic number 4",
          meta: {}
        }
      ],
      error: [
        {
          content: "B is Boron with atomic number 5",
          meta: {}
        }
      ],
    })
  });

});