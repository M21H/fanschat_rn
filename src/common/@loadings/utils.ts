import { createSelectorByActionName } from '~/store/utils';

const reducerName = '@loadings';

export const createLoadingSelector = createSelectorByActionName(reducerName);
