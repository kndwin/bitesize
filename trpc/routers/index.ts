import { createRouter } from 'trpc/utils'

import { coursesRouter } from './courses'
import { curriculumRouter } from './curriculum'

export const combinedRouters = createRouter()
	.merge('courses.', coursesRouter)
	.merge('curriculum.', curriculumRouter)
