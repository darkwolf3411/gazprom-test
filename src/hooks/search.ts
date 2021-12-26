export const useSearch = <T>(array: T[], searchValue: string): T[] => {
  if (searchValue?.trim() == "") {
    return array;
  }
  return array.filter((item) =>
    Object.values(item).some((value) => String(value).includes(searchValue))
  );
};
