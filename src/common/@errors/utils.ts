import { createSelectorByActionName } from '~/store/utils';

const reducerName = '@errors';

export const createErrorSelector = createSelectorByActionName(reducerName);
