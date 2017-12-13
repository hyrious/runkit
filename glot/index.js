const axios = require("axios")
const { send } = require('micro')

exports.endpoint = (req, res) => {
    if (req.method === 'GET') {
        return res.end('<pre><code>POST / { lang, stdin, cont } => { [stdout, stderr,] error }</code></pre>')
    }
    const langs = {"assembly":{"file":"dio.asm","url":"https://run.glot.io/languages/assembly"},"asm":{"file":"dio.asm","url":"https://run.glot.io/languages/assembly"},"bash":{"file":"dio.sh","url":"https://run.glot.io/languages/bash"},"sh":{"file":"dio.sh","url":"https://run.glot.io/languages/bash"},"ats":{"file":"dio.dats","url":"https://run.glot.io/languages/ats"},"dats":{"file":"dio.dats","url":"https://run.glot.io/languages/ats"},"c":{"file":"dio.c","url":"https://run.glot.io/languages/c"},"coffeescript":{"file":"dio.coffee","url":"https://run.glot.io/languages/coffeescript"},"coffee":{"file":"dio.coffee","url":"https://run.glot.io/languages/coffeescript"},"clojure":{"file":"dio.clj","url":"https://run.glot.io/languages/clojure"},"clj":{"file":"dio.clj","url":"https://run.glot.io/languages/clojure"},"cobol":{"file":"dio.cob","url":"https://run.glot.io/languages/cobol"},"cob":{"file":"dio.cob","url":"https://run.glot.io/languages/cobol"},"csharp":{"file":"dio.cs","url":"https://run.glot.io/languages/csharp"},"cs":{"file":"dio.cs","url":"https://run.glot.io/languages/csharp"},"cpp":{"file":"dio.cpp","url":"https://run.glot.io/languages/cpp"},"crystal":{"file":"dio.cr","url":"https://run.glot.io/languages/crystal"},"cr":{"file":"dio.cr","url":"https://run.glot.io/languages/crystal"},"d":{"file":"dio.d","url":"https://run.glot.io/languages/d"},"erlang":{"file":"dio.erl","url":"https://run.glot.io/languages/erlang"},"erl":{"file":"dio.erl","url":"https://run.glot.io/languages/erlang"},"elm":{"file":"dio.elm","url":"https://run.glot.io/languages/elm"},"elixir":{"file":"dio.ex","url":"https://run.glot.io/languages/elixir"},"ex":{"file":"dio.ex","url":"https://run.glot.io/languages/elixir"},"fsharp":{"file":"dio.fs","url":"https://run.glot.io/languages/fsharp"},"fs":{"file":"dio.fs","url":"https://run.glot.io/languages/fsharp"},"go":{"file":"dio.go","url":"https://run.glot.io/languages/go"},"haskell":{"file":"dio.hs","url":"https://run.glot.io/languages/haskell"},"hs":{"file":"dio.hs","url":"https://run.glot.io/languages/haskell"},"groovy":{"file":"dio.groovy","url":"https://run.glot.io/languages/groovy"},"idris":{"file":"dio.idr","url":"https://run.glot.io/languages/idris"},"idr":{"file":"dio.idr","url":"https://run.glot.io/languages/idris"},"java":{"file":"dio.java","url":"https://run.glot.io/languages/java"},"lua":{"file":"dio.lua","url":"https://run.glot.io/languages/lua"},"javascript":{"file":"dio.js","url":"https://run.glot.io/languages/javascript"},"js":{"file":"dio.js","url":"https://run.glot.io/languages/javascript"},"kotlin":{"file":"dio.kt","url":"https://run.glot.io/languages/kotlin"},"kt":{"file":"dio.kt","url":"https://run.glot.io/languages/kotlin"},"nim":{"file":"dio.nim","url":"https://run.glot.io/languages/nim"},"julia":{"file":"dio.jl","url":"https://run.glot.io/languages/julia"},"jl":{"file":"dio.jl","url":"https://run.glot.io/languages/julia"},"mercury":{"file":"dio.m","url":"https://run.glot.io/languages/mercury"},"m":{"file":"dio.m","url":"https://run.glot.io/languages/mercury"},"ocaml":{"file":"dio.ml","url":"https://run.glot.io/languages/ocaml"},"ml":{"file":"dio.ml","url":"https://run.glot.io/languages/ocaml"},"perl":{"file":"dio.pl","url":"https://run.glot.io/languages/perl"},"pl":{"file":"dio.pl","url":"https://run.glot.io/languages/perl"},"php":{"file":"dio.php","url":"https://run.glot.io/languages/php"},"python":{"file":"dio.py","url":"https://run.glot.io/languages/python"},"py":{"file":"dio.py","url":"https://run.glot.io/languages/python"},"perl6":{"file":"dio.pl6","url":"https://run.glot.io/languages/perl6"},"pl6":{"file":"dio.pl6","url":"https://run.glot.io/languages/perl6"},"scala":{"file":"dio.scala","url":"https://run.glot.io/languages/scala"},"swift":{"file":"dio.swift","url":"https://run.glot.io/languages/swift"},"ruby":{"file":"dio.rb","url":"https://run.glot.io/languages/ruby"},"rb":{"file":"dio.rb","url":"https://run.glot.io/languages/ruby"},"rust":{"file":"dio.rs","url":"https://run.glot.io/languages/rust"},"rs":{"file":"dio.rs","url":"https://run.glot.io/languages/rust"},"typescript":{"file":"dio.ts","url":"https://run.glot.io/languages/typescript"},"ts":{"file":"dio.ts","url":"https://run.glot.io/languages/typescript"}}
    let data = ""
    req.on('data', x => data += x)
    req.on('end', () => {
        let { lang, stdin, cont: content } = JSON.parse(data)
        if (!stdin) {
            stdin = ""
        }
        if (!langs[lang]) {
            send(res, 404, { error: 'language not support' })
        }
        data = { stdin, files: [{ name: langs[lang].file, content }] }
        axios.post(langs[lang].url + '/latest', data,
            {
                headers: {
                    Authorization: 'Token ' + process.env.GLOT_TOKEN,
                    'Content-type': 'application/json'
                }
            }
        ).then(r => {
            send(res, 200, r.data)
        })
    })
}