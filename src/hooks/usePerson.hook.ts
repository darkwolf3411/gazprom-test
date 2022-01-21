import { useMemo } from "react";

const sort = <T>(
  array: T[],
  sortName: string = "id",
  sortDirection: boolean = false
): T[] => {
  const copyArray = array.concat();
  const sortArray = copyArray.sort((a, b) =>
  // @ts-ignore
    a[sortName] > b[sortName] ? 1 : -1
  );
  return sortDirection ? sortArray : sortArray.reverse();
};

const pagination = <T>(
  array: T[],
  page_size: number,
  page_number: number
): T[] => {
  const paginateArray = array.slice(
    (page_number - 1) * page_size,
    page_number * page_size
  );
  return paginateArray;
};

const search = <T>(array: T[], searchValue: string): T[] => {
  if (searchValue?.trim() == "") {
    return array;
  }
  return array.filter((item) =>
    Object.values(item).some((value) => String(value).includes(searchValue))
  );
};

export const usePersons = <T>(
  array: T[] | undefined,
  page_size: number,
  page_number: number,
  searchValue: string,
  sortName: string,
  sortDirection: boolean
): { array: T[]; searchLenght: number } => {
  const result = useMemo(() => {
    if(!array){
      return { array: [], searchLenght: 1 }
    }
    const searchResult = search(
      sort(array, sortName, sortDirection),
      searchValue
    );
    const paginationResult = pagination(searchResult, page_size, page_number);
    return { array: paginationResult, searchLenght: searchResult.length };
  }, [array, page_size, page_number, searchValue, sortName, sortDirection]);
  return result;
};
