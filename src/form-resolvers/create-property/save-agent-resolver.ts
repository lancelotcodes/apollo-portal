import * as yup from 'yup';

export const genericResolver = {
  agentID: yup.string().required('Agent name is required!'),
  agentType: yup.number().required('Agent type is required!'),
  isVisibleOnWeb: yup.boolean(),
};

export const saveAgentResolver = yup.object().shape({
  agentID: genericResolver.agentID,
  agentType: genericResolver.agentType,
  isVisibleOnWeb: genericResolver.isVisibleOnWeb,
});
