import { useMemo } from "react";

export const usePagination = <T>(
  array: T[],
  page_size: number,
  page_number: number
): [number[], T[]] => {
  const pagination: [number[], T[]] = useMemo(() => {
    const numbersPageArray: number[] = [];
    for (let i = 1; i < Math.ceil(array.length / page_size)+1; i++) {
      numbersPageArray.push(i);
    }
    const paginateArray = array.slice(
      (page_number - 1) * page_size,
      page_number * page_size
    );
    return [numbersPageArray, paginateArray];
  }, [array, page_size, page_number])
  return pagination
};
