const { post } = require("axios")
const { json, send } = require('micro')

exports.endpoint = async (req, res) => {
    const languages = {
        asm: { latest: 'https://run.glot.io/languages/assembly/latest' },
        assembly: { latest: 'https://run.glot.io/languages/assembly/latest' },
        ats: { latest: 'https://run.glot.io/languages/ats/latest' },
        sh: { latest: 'https://run.glot.io/languages/bash/latest' },
        bash: { latest: 'https://run.glot.io/languages/bash/latest' },
        c: { latest: 'https://run.glot.io/languages/c/latest' },
        clj: { latest: 'https://run.glot.io/languages/clojure/latest' },
        clojure: { latest: 'https://run.glot.io/languages/clojure/latest' },
        cob: { latest: 'https://run.glot.io/languages/cobol/latest' },
        cobol: { latest: 'https://run.glot.io/languages/cobol/latest' },
        coffee: { latest: 'https://run.glot.io/languages/coffeescript/latest' },
        coffeescript: { latest: 'https://run.glot.io/languages/coffeescript/latest' },
        cpp: { latest: 'https://run.glot.io/languages/cpp/latest' },
        cr: { latest: 'https://run.glot.io/languages/crystal/latest' },
        crystal: { latest: 'https://run.glot.io/languages/crystal/latest' },
        cs: { latest: 'https://run.glot.io/languages/csharp/latest' },
        csharp: { latest: 'https://run.glot.io/languages/csharp/latest' },
        d: { latest: 'https://run.glot.io/languages/d/latest' },
        ex: { latest: 'https://run.glot.io/languages/elixir/latest' },
        elixir: { latest: 'https://run.glot.io/languages/elixir/latest' },
        elm: { latest: 'https://run.glot.io/languages/elm/latest' },
        erlang: { latest: 'https://run.glot.io/languages/erlang/latest' },
        fs: { latest: 'https://run.glot.io/languages/fsharp/latest' },
        fsharp: { latest: 'https://run.glot.io/languages/fsharp/latest' },
        go: { latest: 'https://run.glot.io/languages/go/latest' },
        groovy: { latest: 'https://run.glot.io/languages/groovy/latest' },
        hs: { latest: 'https://run.glot.io/languages/haskell/latest' },
        haskell: { latest: 'https://run.glot.io/languages/haskell/latest' },
        idr: { latest: 'https://run.glot.io/languages/idris/latest' },
        idris: { latest: 'https://run.glot.io/languages/idris/latest' },
        java: { latest: 'https://run.glot.io/languages/java/latest' },
        js: {
            es6: 'https://run.glot.io/languages/javascript/es6',
            latest: 'https://run.glot.io/languages/javascript/latest' },
        javascript: {
            es6: 'https://run.glot.io/languages/javascript/es6',
            latest: 'https://run.glot.io/languages/javascript/latest' },
        jl: { latest: 'https://run.glot.io/languages/julia/latest' },
        julia: { latest: 'https://run.glot.io/languages/julia/latest' },
        kt: { latest: 'https://run.glot.io/languages/kotlin/latest' },
        kotlin: { latest: 'https://run.glot.io/languages/kotlin/latest' },
        lua: { latest: 'https://run.glot.io/languages/lua/latest' },
        m: { latest: 'https://run.glot.io/languages/mercury/latest' },
        mercury: { latest: 'https://run.glot.io/languages/mercury/latest' },
        nim: { latest: 'https://run.glot.io/languages/nim/latest' },
        ocaml: { latest: 'https://run.glot.io/languages/ocaml/latest' },
        pl: { latest: 'https://run.glot.io/languages/perl/latest' },
        perl: { latest: 'https://run.glot.io/languages/perl/latest' },
        pl6: { latest: 'https://run.glot.io/languages/perl6/latest' },
        perl6: { latest: 'https://run.glot.io/languages/perl6/latest' },
        php: { latest: 'https://run.glot.io/languages/php/latest' },
        py: {
            '2': 'https://run.glot.io/languages/python/2',
            latest: 'https://run.glot.io/languages/python/latest' },
        python: {
            '2': 'https://run.glot.io/languages/python/2',
            latest: 'https://run.glot.io/languages/python/latest' },
        rb: { latest: 'https://run.glot.io/languages/ruby/latest' },
        ruby: { latest: 'https://run.glot.io/languages/ruby/latest' },
        rs: { latest: 'https://run.glot.io/languages/rust/latest' },
        rust: { latest: 'https://run.glot.io/languages/rust/latest' },
        scala: { latest: 'https://run.glot.io/languages/scala/latest' },
        swift: { latest: 'https://run.glot.io/languages/swift/latest' },
        ts: { latest: 'https://run.glot.io/languages/typescript/latest' },
        typescript: { latest: 'https://run.glot.io/languages/typescript/latest' } }
    const filenames = {
        assembly: 'main.asm',        asm: 'main.asm',
        bash: 'main.sh',             sh: 'main.sh',
        ats: 'main.dats',            dats: 'main.dats',
        c: 'main.c',
        coffeescript: 'main.coffee', coffee: 'main.coffee',
        clojure: 'main.clj',         clj: 'main.clj',
        cobol: 'main.cob',           cob: 'main.cob',
        csharp: 'Main.cs',           cs: 'Main.cs',
        cpp: 'main.cpp',
        crystal: 'main.cr',          cr: 'main.cr',
        d: 'main.d',
        erlang: 'main.erl',          erl: 'main.erl',
        elm: 'main.elm',
        elixir: 'main.ex',           ex: 'main.ex',
        fsharp: 'main.fs',           fs: 'main.fs',
        go: 'main.go',
        haskell: 'main.hs',          hs: 'main.hs',
        groovy: 'main.groovy',
        idris: 'main.idr',           idr: 'main.idr',
        java: 'Main.java',
        lua: 'main.lua',
        javascript: 'main.js',       js: 'main.js',           es6: 'main.js',
        kotlin: 'Main.kt',           kt: 'Main.kt',
        nim: 'main.nim',
        julia: 'main.jl',            jl: 'main.jl',
        mercury: 'main.m',           m: 'main.m',
        ocaml: 'main.ml',            ml: 'main.ml',
        perl: 'main.pl',             pl: 'main.pl',
        php: 'main.php',
        python: 'main.py',           py: 'main.py',           python2: 'main.py',
        perl6: 'main.pl6',           pl6: 'main.pl6',
        scala: 'main.scala',
        swift: 'main.swift',
        ruby: 'main.rb',             rb: 'main.rb',
        rust: 'main.rs',             rs: 'main.rs',
        typescript: 'main.ts',       ts: 'main.ts' }
    if (req.method === 'GET') {
        return send(res, 200, `<style>pre{white-space:pre-wrap}</style><pre><code>POST / { lang, [command], [stdin], content } => { stdout, stderr, error }</code></pre><p>languages: ${Object.keys(languages).map(lang=>lang+Object.keys(languages[lang]).filter(e=>e!=='latest').map(e=>'/'+e).join()).join(', ')}</p>`)
    }
    let { lang = 'ruby', command = null, stdin = null, content = '' } = await json(req)
    let payload = { files: [{ name: filenames[lang], content }] }
    if (command) payload.command = command
    if (stdin) payload.stdin = stdin
    let url = null
    if (lang === 'es6')
        url = 'https://run.glot.io/languages/javascript/es6'
    else if (lang === 'python2' || lang === 'py2')
        url = 'https://run.glot.io/languages/python/2'
    else if (!languages[lang])
        send(res, 200, { error: 'language not support' })
    else
        url = languages[lang].latest
    const { data } = await post(url, payload, {
        headers: {
            Authorization: 'Token ' + process.env.GLOT_TOKEN,
            'Content-type': 'application/json' } })
    send(res, 200, data)
}