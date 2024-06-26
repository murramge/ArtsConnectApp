import {getPerformanceDetail} from '@apis/kopis';
import {PerformanceDetailInfo} from '@apis/kopis.d';
import {atom, useAtom} from 'jotai';
import {useEffect, useState} from 'react';

export const detailDataAtom = atom<PerformanceDetailInfo | null>(null);

const usePerformanceDetailApi = id => {
  const [detailInfo, setDetailInfo] = useAtom<PerformanceDetailInfo | null>(
    detailDataAtom,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const data = await getPerformanceDetail({performanceId: id});

        setDetailInfo(data);
      } catch (e) {
        console.error(e);
        setError('상세 정보를 불러오는 중 에러가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, []);

  return {detailInfo, loading, error};
};

export default usePerformanceDetailApi;
