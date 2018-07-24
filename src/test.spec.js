requireAll((require).context(`./`, true, /\.(spec|feature).js$/))
function requireAll(r) {
    r.keys().forEach(r)
}