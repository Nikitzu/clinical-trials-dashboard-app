import { makeStateKey } from '@angular/core';

import { MappedStudy } from '@study-feature/models';

export const studyStateKeyConstant = makeStateKey<MappedStudy[]>('studiesData');
