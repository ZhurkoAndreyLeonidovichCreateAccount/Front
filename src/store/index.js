import { createStore } from 'vuex'

import concerts from './concerts'

const store = {
	modules: {
		concerts	
	},
  strict: process.env.NODE_ENV !== 'production'
}
export default createStore(store);