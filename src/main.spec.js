requireAll((require).context(`./`, true, /\/(.*)\/(.*)\.js$/))
function requireAll(r) {
    r.keys().forEach(r)
}