<template>
  <Header></Header>
  <MainPhoto></MainPhoto>
  <MainMessage></MainMessage>
  <LatestDesigns></LatestDesigns>
  <Collection></Collection>
  <AboutArtist></AboutArtist>
  <Footer></Footer>
</template>

<script>
import Header from "../components/LandingPage/Header.vue";
import MainPhoto from "../components/LandingPage/MainPhoto.vue";
import MainMessage from "../components/LandingPage/MainMessage.vue";
import LatestDesigns from "../components/LandingPage/LatestDesigns.vue";
import Collection from "../components/LandingPage/Collection.vue";
import AboutArtist from "../components/LandingPage/AboutArtist.vue";
import Footer from "../components/LandingPage/Footer.vue";

export default {
  components: {
    Header,
    MainPhoto,
    MainMessage,
    LatestDesigns,
    Collection,
    AboutArtist,
    Footer,
  },
};
</script>
