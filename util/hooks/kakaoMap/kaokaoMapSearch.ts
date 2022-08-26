import { useEffect, useState } from "react";

const useKakaoMapSearch = (keyword: string, ps: any) => {
    const [result, setResult] = useState<any>([]);
    const [error, setError] = useState<boolean>(true);

    useEffect(() => {
        // 키워드 검색 완료 시 호출되는 콜백함수 입니다
        const placesSearchCB = (data: any, status: any) => {
            if (status === kakao.maps.services.Status.OK) {
                setResult(data);
                setError(false);
            } else setError(true);
        };
        // 키워드로 장소를 검색합니다
        keyword != "" && ps.keywordSearch(keyword, placesSearchCB);
    }, [keyword]);

    return [result, error];
};
export default useKakaoMapSearch;
