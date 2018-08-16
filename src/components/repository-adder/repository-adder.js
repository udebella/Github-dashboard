import {library} from '@fortawesome/fontawesome-svg-core'
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons'
import Badge from '../badge/badge.vue'

library.add(faPlusCircle)

export default {
	name: `repository-adder`,
	components: {
		Badge,
	},
}
