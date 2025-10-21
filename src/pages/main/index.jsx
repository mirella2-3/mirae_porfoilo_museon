import CardList from "../../components/main/CardList";
import TopRatedList from "../../components/main/TopRatedList";
import DramaList from "../../components/main/DramaList";
import Director from "../../components/main/Director";
import RankSlider from "../../components/main/RankSlider";
import Recommend from "../../components/main/Recommend";
import TripAds from "../../components/main/TripAds";
import Visual3 from "../../components/main/Visual3";

import "./style.scss";
import AnimationList from "../../components/main/AnimationList";

function Main() {
  return (
    <main className="main">
      <Visual3 />
      <CardList />
      <RankSlider />
      <TopRatedList />
      <Recommend />
      <TripAds />
      {/* <Director /> */}
      <DramaList />
      <AnimationList />
    </main>
  );
}

export default Main;
