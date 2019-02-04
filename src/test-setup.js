require('jsdom-global')(undefined, {url: 'https://example.org/'})

// https://github.com/vuejs/vue-test-utils/issues/936
// FIXME "TypeError: Super expression must either be null or a function" because of prettier.
window.Date = Date
