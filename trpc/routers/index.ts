import { createRouter } from 'trpc/utils'

import { coursesRouter } from './courses'
import { curriculumRouter } from './curriculum'
import { unitsRouter } from './units'

export const combinedRouters = createRouter()
	.merge('courses.', coursesRouter)
	.merge('curriculum.', curriculumRouter)
	.merge("units.", unitsRouter)
