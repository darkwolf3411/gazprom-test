
export const useSort = <T>(array: T[],field: string):T[] => {
    if (field == ''){
        return array
    }
    const copyArray = array.concat()
    // @ts-ignore
    return copyArray.sort((a,b)=>a[field]-b[field]) 
}