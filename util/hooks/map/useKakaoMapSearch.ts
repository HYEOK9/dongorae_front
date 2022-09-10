import { useEffect, useState } from "react";

//키워드로 카카오맵 검색
//return [결과list, 에러여부]
const useKakaoMapSearch = (keyword: string) => {
    const [result, setResult] = useState<any>([]);
    const [searchError, setSearchErrorError] = useState<boolean>(true);

    useEffect(() => {
        if (!keyword || keyword == "") return;
        // 키워드 검색 완료 시 호출되는 콜백함수 입니다
        const placesSearchCB = (data: any, status: any) => {
            if (status === kakao.maps.services.Status.OK) {
                setResult(data);
                setSearchErrorError(false);
            } else setSearchErrorError(true);
        };
        const ps = new kakao.maps.services.Places();
        // 키워드로 장소를 검색합니다
        ps.keywordSearch(keyword, placesSearchCB);
    }, [keyword]);

    return { result, searchError };
};
export default useKakaoMapSearch;
