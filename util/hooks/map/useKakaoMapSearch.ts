import { useEffect, useState } from "react";

const useKeywordSearch = (keyword: string) => {
    const [result, setResult] = useState<any>([]);
    const [searchError, setSearchError] = useState<boolean>(true);

    useEffect(() => {
        if (!keyword || keyword == ""){
            setResult([]);
            return;
        }
        // 키워드 검색 완료 시 호출되는 콜백함수 입니다
        const placesSearchCB = (data: any, status: any) => {
            if (status === kakao.maps.services.Status.OK) {
                setResult(data);
                setSearchError(false);
            } else setSearchError(true);
        };
        const ps = new kakao.maps.services.Places();
        // 키워드로 장소를 검색합니다
        ps.keywordSearch(keyword, placesSearchCB);
        console.log(result);
        
    }, [keyword]);

    return { result, searchError };
};

export default useKeywordSearch;
