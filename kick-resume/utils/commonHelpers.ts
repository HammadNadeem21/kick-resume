const TOKENRATIO = 800;

export const calculateCreditFromTokens = (tokens: number) => {
  return tokens / TOKENRATIO;
};
