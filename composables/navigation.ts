export const useNavigation = () => {
  const { data } = useAsyncData('header', () =>
    queryContent('/_collections/header').only(['links']).findOne()
  );

  return {
    ...data.value,
  };
};
