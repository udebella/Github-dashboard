import * as chai from 'chai'
import * as sinonChai from 'sinon-chai'

chai.use(sinonChai)

// Require all project javascript files for coverage
const requireAll = r => r.keys().forEach(r)
requireAll((require).context(`./`, true, /\/(.*)\/(.*)\.js$/))
