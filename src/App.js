import "./App.css";
import BeforeWeBeginCard from "./components/before-we-begin-card/BeforeWeBeginCard";
import BeforeWeBegin from "./components/before-we-begin/BeforeWeBegin";
import Book from "./components/book/Book";
import BottomContent from "./components/bottom-content/BottomContent";
import CardCarousel from "./components/card-carousel/CardCarousel";
import CardScroll from "./components/card-scroll/CardScroll";
import ClientCarousel from "./components/client-carousel/ClientCarousel";
import Faq from "./components/faq/Faq";
import Header from "./components/header/Header";
import HeroBanner from "./components/hero-banner/HeroBanner";
import Promo from "./components/promo/Promo";
import VideoService from "./components/video-service/VideoService";
import VideoTestimonial from "./components/video-testimonial/VideoTestimonial";

function App() {
  return (
    <>
      <Header />
      <HeroBanner />
      <Promo />
      <CardScroll />
      <ClientCarousel />
      <CardCarousel />
      <VideoService />
      <BeforeWeBegin />
      <BeforeWeBeginCard />
      <Book />
      <VideoTestimonial />
      <Faq />
      <BottomContent />
    </>
  );
}

export default App;
