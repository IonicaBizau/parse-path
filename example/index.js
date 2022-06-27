// Dependencies
const parsePath = require("../lib")

console.log(parsePath("http://ionicabizau.net/blog"))
// {
//   protocols: [ 'http' ],
//   protocol: 'http',
//   port: '',
//   resource: 'ionicabizau.net',
//   user: '',
//   password: '',
//   pathname: '/blog',
//   hash: '',
//   search: '',
//   href: 'http://ionicabizau.net/blog',
//   query: {}
// }

console.log(parsePath("http://domain.com/path/name?foo=bar&bar=42#some-hash"))
// {
//   protocols: [ 'http' ],
//   protocol: 'http',
//   port: '',
//   resource: 'domain.com',
//   user: '',
//   password: '',
//   pathname: '/path/name',
//   hash: 'some-hash',
//   search: 'foo=bar&bar=42',
//   href: 'http://domain.com/path/name?foo=bar&bar=42#some-hash',
//   query: { foo: 'bar', bar: '42' }
// }

console.log(parsePath("git+ssh://git@host.xz/path/name.git"))
// {
//   protocols: [ 'git', 'ssh' ],
//   protocol: 'git',
//   port: '',
//   resource: 'host.xz',
//   user: 'git',
//   password: '',
//   pathname: '/path/name.git',
//   hash: '',
//   search: '',
//   href: 'git+ssh://git@host.xz/path/name.git',
//   query: {}
// }
