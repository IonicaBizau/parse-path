const protocols = require("protocols")

/**
 * parsePath
 * Parses the input url.
 *
 * @name parsePath
 * @function
 * @param {String} url The input url.
 * @return {Object} An object containing the following fields:
 *
 *  - `protocols` (Array): An array with the url protocols (usually it has one element).
 *  - `protocol` (String): The first protocol, `"ssh"` (if the url is a ssh url) or `"file"`.
 *  - `port` (null|Number): The domain port.
 *  - `resource` (String): The url domain (including subdomains).
 *  - `user` (String): The authentication user (usually for ssh urls).
 *  - `pathname` (String): The url pathname.
 *  - `hash` (String): The url hash.
 *  - `search` (String): The url querystring value.
 *  - `href` (String): The input url.
 *  - `query` (Object): The url querystring, parsed as object.
 */
function parsePath(url) {

    const output = {
        protocols: []
      , protocol: null
      , port: null
      , resource: ""
      , user: ""
      , password: ""
      , pathname: ""
      , hash: ""
      , search: ""
      , href: url
      , query: {}
    }

    try {
        const parsed = new URL(url)
        output.protocols = protocols(parsed)
        output.protocol = output.protocols[0]
        output.port = parsed.port
        output.resource =  parsed.host
        output.user = parsed.username || ""
        output.password = parsed.password || ""
        output.pathname = parsed.pathname
        output.hash = parsed.hash.slice(1)
        output.search = parsed.search.slice(1)
        output.href = parsed.href
        output.query = Object.fromEntries(parsed.searchParams)
    } catch (e) {
        // TODO Maybe check if it is a valid local file path
        //      In any case, these will be parsed by higher
        //      level parsers such as parse-url, git-url-parse, git-up
        output.protocols = ["file"]
        output.protocol = output.protocols[0]
        output.port = ""
        output.resource =  ""
        output.user = ""
        output.pathname = ""
        output.hash = ""
        output.search = ""
        output.href = url
        output.query = {}
    }

    return output;
}

module.exports = parsePath;
