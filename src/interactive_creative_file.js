import { parserUtils } from './parser/parser_utils';

export function createInteractiveCreativeFile(
  interactiveCreativeAttributes = {}
) {
  return {
    type: interactiveCreativeAttributes.type || null,
    apiFramework: interactiveCreativeAttributes.apiFramework || null,
    variableDuration:
      parserUtils.parseBoolean(
        interactiveCreativeAttributes.variableDuration
      ) || null,
    fileURL: null
  };
}
