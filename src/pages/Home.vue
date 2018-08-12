<template>
  <section class="Home">
    <div class="small-header">
      <h1>Mesleki İstatistikler</h1>
    </div>
    <div class="content">
     <div class="search">
        <h3>{{title}}</h3>
        <v-select v-model="selectedJob"
                  :options="jobList"
                  placeholder="Meslek Ara">
        </v-select>
     </div>
     <div class="noStatistics">
     <p>İstatistikler Katılım Durumuna Göre Çok Yakında Gelecektir..</p>
     </div>
    <button class="replyStatistics"
            type="button"
            v-if="!showPopup"
            @click="togglePopUp">
      Ankete Katıl
    </button>
    </div>

    <!-- popup -->

    <div class="PopUpField">
      <pop-up @closePopup="togglePopUp"
              v-if="showPopup"
              :isOpen="showPopup"/>
    </div>
  </section>
</template>

<script>
import Jobs from '@/helpers/jobs.json';
import PopUp from '@/components/popup';

export default {
  name: 'Home',

  data() {
    return {
      title: 'Seç Mesleği Gör Verileri',
      jobList: Jobs,
      selectedJob: null,
      showPopup: false,
    };
  },

  components: {
    PopUp,
  },

  methods: {
    togglePopUp() {
      this.showPopup = !this.showPopup;
    },
  },

};
</script>

<style lang="scss">
 .Home {
   width: 100%;
   min-height: 100vh;
  .small-header {
    height: 80px;
    display: flex;
    background: #000;
    color: $white;
    align-items: center;
    justify-content: center;
    h1 {
      font-size: 30px;
      letter-spacing: 1.4px;
    }
  }
  .content {
    margin-top: 40px;
    max-width: 1220px;
    width: 100%;
    padding-left: 20px;
    padding-right: 20px;
    margin-left: auto;
    margin-right: auto;
    .search {
      margin-bottom: 20px;
      h3 {
        margin-bottom: 20px;
        font-size: 20px;
      }
    }
    .noStatistics {
      margin-top: 30px;
      line-height: 40px;
      color: $purple;
      font-weight: 600;
      text-align: center;
    }
    .replyStatistics {
      background: $purple;
      width: 120px;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 46px;
      color: $white;
      border-radius: 5px;
      border: 0;
      position: fixed;
      bottom: 30px;
      right: 30px;
      z-index: 111;
      box-shadow: 6px 7px 21px #000;
      &:hover {
        opacity: .9;
      }
    }
  }
 }
</style>
