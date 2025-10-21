import Footer from "../../common/footer";
import Con1 from "../../components/intro/Con1";
import Con2 from "../../components/intro/Con2";
import Con3 from "../../components/intro/Con3";
import Con4 from "../../components/intro/Con4";
import IntroLogin from "../../components/intro/IntroLogin";
import "./style.scss";

function Intro() {
  return (
    <main className="intro">
      <Con1 />
      <Con2 />
      <Con3 />
      <IntroLogin />
      <Con4 />
      <Footer />
    </main>
  );
}

export default Intro;
