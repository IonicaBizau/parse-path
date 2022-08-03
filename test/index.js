// Dependencies
const parseUrl = require("../lib")
    , tester = require("tester")
    ;

const INPUTS = [
    [
        "http://ionicabizau.net/blog"
      , {
            protocols: [ "http" ]
          , protocol: "http"
          , port: ""
          , resource: "ionicabizau.net"
          , host: "ionicabizau.net"
          , user: ""
          , pathname: "/blog"
          , hash: ""
          , search: ""
          , href: "http://ionicabizau.net/blog"
          , query: {}
          , parse_failed: false
        }
    ]
  , [
        "http://subdomain.ionicabizau.net/blog"
      , {
            protocols: [ "http" ]
          , protocol: "http"
          , port: ""
          , resource: "subdomain.ionicabizau.net"
          , host: "subdomain.ionicabizau.net"
          , user: ""
          , pathname: "/blog"
          , hash: ""
          , search: ""
          , href: "http://subdomain.ionicabizau.net/blog"
          , query: {}
          , parse_failed: false
        }
    ]
  , [
        "    http://ionicabizau.net/blog   "
      , {
            protocols: [ "http" ]
          , protocol: "http"
          , port: ""
          , resource: "ionicabizau.net"
          , host: "ionicabizau.net"
          , user: ""
          , pathname: "/blog"
          , hash: ""
          , search: ""
          , href: "http://ionicabizau.net/blog"
          , query: {}
          , parse_failed: false
        }
    ]
  , [
        "http://domain.com/path/name?foo=bar&bar=42#some-hash"
      , {
            protocols: ["http"]
          , protocol: "http"
          , port: ""
          , resource: "domain.com"
          , host: "domain.com"
          , user: ""
          , pathname: "/path/name"
          , hash: "some-hash"
          , search: "foo=bar&bar=42"
          , query: { foo: "bar", bar: "42" }
          , parse_failed: false
          , href: "http://domain.com/path/name?foo=bar&bar=42#some-hash"
        }
    ]
  , [
        "http://domain.com/path/name#some-hash?foo=bar&bar=42"
      , {
            protocols: ["http"]
          , protocol: "http"
          , port: ""
          , resource: "domain.com"
          , host: "domain.com"
          , user: ""
          , pathname: "/path/name"
          , hash: "some-hash?foo=bar&bar=42"
          , search: ""
          , query: {}
          , parse_failed: false
          , href: "http://domain.com/path/name#some-hash?foo=bar&bar=42"
        }
    ]
  , [
        "git+ssh://git@host.xz/path/name.git"
      , {
            protocols: ["git", "ssh"]
          , protocol: "git"
          , port: ""
          , resource: "host.xz"
          , host: "host.xz"
          , user: "git"
          , pathname: "/path/name.git"
          , hash: ""
          , search: ""
          , query: {}
          , parse_failed: false
          , href: "git+ssh://git@host.xz/path/name.git"
        }
    ]
  , [
        // NOTE:parse-path will look at this as a local path
        //      For parsing it as url, please use parse-url
        "git@github.com:IonicaBizau/git-stats.git"
      , {
            protocols: ["file"]
          , protocol: "file"
          , port: ""
          , resource: ""
          , host: ""
          , user: ""
          , pathname: ""
          , hash: ""
          , search: ""
          , query: {}
          , parse_failed: true
          , href: "git@github.com:IonicaBizau/git-stats.git"
        }
    ]
  , [
        "/path/to/file.png"
      , {
            protocols: ["file"]
          , protocol: "file"
          , port: ""
          , resource: ""
          , host: ""
          , user: ""
          , pathname: ""
          , hash: ""
          , search: ""
          , query: {}
          , parse_failed: true
          , href: "/path/to/file.png"
        }
    ]
  , [
        "./path/to/file.png"
      , {
            protocols: ["file"]
          , protocol: "file"
          , port: ""
          , resource: ""
          , host: ""
          , user: ""
          , pathname: ""
          , hash: ""
          , search: ""
          , query: {}
          , parse_failed: true
          , href: "./path/to/file.png"
        }
    ]
  , [
        "./.path/to/file.png"
      , {
            protocols: ["file"]
          , protocol: "file"
          , port: ""
          , resource: ""
          , host: ""
          , user: ""
          , pathname: ""
          , hash: ""
          , search: ""
          , query: {}
          , parse_failed: true
          , href: "./.path/to/file.png"
        }
    ]
  , [
        ".path/to/file.png"
      , {
            protocols: ["file"]
          , protocol: "file"
          , port: ""
          , resource: ""
          , host: ""
          , user: ""
          , pathname: ""
          , hash: ""
          , search: ""
          , query: {}
          , parse_failed: true
          , href: ".path/to/file.png"
        }
    ]
  , [
        "path/to/file.png"
      , {
            protocols: ["file"]
          , protocol: "file"
          , port: ""
          , resource: ""
          , host: ""
          , user: ""
          , pathname: ""
          , hash: ""
          , search: ""
          , query: {}
          , parse_failed: true
          , href: "path/to/file.png"
        }
    ], [
      "git@github.com:9IonicaBizau/git-stats.git"
    , {
          protocols: ["file"]
        , protocol: "file"
        , port: ""
        , resource: ""
        , host: ""
        , user: ""
        , pathname: ""
        , hash: ""
        , search: ""
        , query: {}
        , parse_failed: true
        , href: "git@github.com:9IonicaBizau/git-stats.git"
      }
    ], [
      "git@github.com:0xABC/git-stats.git"
    , {
          protocols: ["file"]
        , protocol: "file"
        , port: ""
        , resource: ""
        , host: ""
        , user: ""
        , pathname: ""
        , hash: ""
        , search: ""
        , query: {}
        , parse_failed: true
        , href: "git@github.com:0xABC/git-stats.git"
      }
    ], [
      "https://attacker.com\\@example.com"
    , {
          protocols: ["https"]
        , protocol: "https"
        , port: ""
        , resource: "attacker.com"
        , host: "attacker.com"
        , user: ""
        , pathname: "/@example.com"
        , hash: ""
        , search: ""
        , href: "https://attacker.com/@example.com"
        , query: {}
        , parse_failed: false
      }
  ], [
      "jav\r\nascript://%0aalert(1)"
    , {
          protocols: ["javascript"]
        , protocol: "javascript"
        , port: ""
        , resource: "%0aalert(1)"
        , host: "%0aalert(1)"
        , user: ""
        , pathname: ""
        , hash: ""
        , href: "javascript://%0aalert(1)"
        , query: {}
        , parse_failed: false
        , search: ""
      }
  ], [
      "https://github.com:89/org/repo.git"
    , {
          protocols: ["https"]
        , protocol: "https"
        , port: "89"
        , resource: "github.com"
        , host: "github.com:89"
        , user: ""
        , pathname: "/org/repo.git"
        , hash: ""
        , href: "https://github.com:89/org/repo.git"
        , query: {}
        , parse_failed: false
        , search: ""
      }
  ]
];

tester.describe("check urls", test => {
    INPUTS.forEach(function (c) {
        test.should("support " + c[0], () => {
            const cParsed = parseUrl(c[0])
            c[1].password = c[1].password || ""
            test.expect(cParsed).toEqual(c[1]);
        });
    });
});
