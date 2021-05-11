<template>
  <div>
    <Header></Header>
    <MainLanding></MainLanding>
    <MainMessage></MainMessage>
    <LatestDesigns></LatestDesigns>
    <Collection></Collection>
    <AboutArtist></AboutArtist>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "../components/LandingPage/Header.vue";
import MainLanding from "../components/LandingPage/MainLanding.vue";
import MainMessage from "../components/LandingPage/MainMessage.vue";
import LatestDesigns from "../components/LandingPage/LatestDesigns.vue";
import Collection from "../components/LandingPage/Collection.vue";
import AboutArtist from "../components/LandingPage/AboutArtist.vue";
import Footer from "../components/LandingPage/Footer.vue";

export default {
  created() {
    const prods = this.$store.dispatch("prods/callProductsApi");

    console.log("PRODCUTS FROM STORE");
    console.log(prods);
  },
  components: {
    Header,
    MainLanding,
    MainMessage,
    LatestDesigns,
    Collection,
    AboutArtist,
    Footer,
  },
};
</script>
