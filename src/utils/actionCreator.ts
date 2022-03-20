const createAction = (type: string) => (payload?: any) => ({
  type,
  ...(payload && { payload }),
});

export default createAction;
