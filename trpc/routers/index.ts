import { createRouter } from 'trpc/utils'

import { coursesRouter } from './courses'

export const combinedRouters = createRouter()
	.merge('courses.', coursesRouter)
