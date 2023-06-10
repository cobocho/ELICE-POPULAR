import { useEffect, useState } from 'react';
import styled from 'styled-components';
import SliderTop from '../components/Home/components/SliderTop/SliderTop';
import SlideStoreList from '../components/Home/components/SlideStore/SlideStoreList';
import VerticalStoreList from '../components/Home/components/VerticalStore/VerticalStoreList';
import ReservationStoreList from '../components/Home/components/ReservationStore/ReservationStoreList';
import { Line } from '../components/Home/components/Line';
import { Store } from '../types/store';
import CategoryBox from '../components/Home/components/PreferredCategory/CategoryBox';
import MetaTag from '../components/SEO/MetaTag';
// import CasouselSlideList from '../components/Home/components/CarouselStore/CasouselSlideList';

const Container = styled.div`
  width: 100%;
  background-color: #fff;
`;

const HomePage = () => {
  const [stores, setStores] = useState<Store[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    //const response = await fetch('/store/all');
    const response = await fetch('http://34.22.81.36:3000/stores');
    const result: Store[] = await response.json();
    setStores(result);
  }

  return (
    <Container>
      <SliderTop></SliderTop>
      <SlideStoreList text={'추천 팝업스토어😍'} stores={stores}></SlideStoreList>
      <Line></Line>
      <VerticalStoreList text={'주간 팝업스토어👀'} stores={stores}></VerticalStoreList>
      <CategoryBox />
      <SlideStoreList text={'최근 오픈한 팝업스토어😳'} stores={stores}></SlideStoreList>
      <SlideStoreList text={'종료 직전 팝업스토어🔥'} stores={stores}></SlideStoreList>
      <Line></Line>
      <ReservationStoreList text={'예약 필수 팝업스토어💖'} stores={stores}></ReservationStoreList>
    </Container>
  );
};

export default HomePage;
