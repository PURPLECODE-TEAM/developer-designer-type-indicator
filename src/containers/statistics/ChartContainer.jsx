import React, { useEffect, useState } from 'react';
import media from '../../lib/styles/media';
import styled from 'styled-components';
import { loadData } from '../../lib/firebase/api';
import { names, title, shortBio, characters } from '../../lib/util/util';
import BarChart from '../../components/statistics/BarChart';

const Wrapper = styled.div`
  position: relative;
  width: 70rem;
  max-height: 40rem;
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 100;
  background-color: white;
  font-family: 'hannaPro', sans-serif;
  padding: 20px;
  border: 2px solid #b6af4a;
  border-radius: 2rem;
  display: grid;
  @media (max-width: ${media.tablet}) {
    width: 85%;
    max-height: 95vh;
    margin: 1rem auto;
  }
  h1 {
    font-size: 24px;
    padding: 1rem 2rem;
  }
  p {
    padding: 1rem 2rem;
    font-family: 'hannaAir', sans-serif;
    font-size: 16px;
    line-height: 1.3em;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  div {
    margin-bottom: 2rem;
  }
`;

const ChartContainer = () => {
  const [designerData, setDesignerData] = useState(null);
  const [developerData, setDeveloperData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const parseData = (data) => {
      const array = Object.keys(data).map((key) => ({
        shortBio: shortBio[names[key]],
        name: title[names[key]],
        img: characters[names[key]],
        count: data[key],
      }));
      array.sort((a, b) => (a.count < b.count ? 1 : -1));

      return array;
    };
    const fetchData = async () => {
      try {
        const devResponse = await loadData('devCount');
        setDeveloperData(parseData(devResponse));
        const designerResponse = await loadData('designerCount');
        setDesignerData(parseData(designerResponse));
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {!error && designerData && designerData && (
        <Wrapper>
          <h1> 개발자/디자이너 유형 차트 </h1>
          <p>
            개발자/디자이너들은 어떤 유형에 많이 속해있을지 궁금하시죠?🤔 <br />
            그래서 차트로 정리해보았습니다! <br />
            범례에 있는 링크를 클릭하면 해당 유형에 대한 설명을 볼 수 있어요.
          </p>
          <Container>
            <BarChart data={designerData} title="디자이너 유형" />
            <BarChart data={developerData} title="개발자 유형" />
          </Container>
        </Wrapper>
      )}
    </>
  );
};

export default ChartContainer;
