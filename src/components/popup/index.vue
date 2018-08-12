<template>
  <div class="PopUp"
       :class="{'open' : isOpen}">
    <div class="PopUp-Overlay" @click="closePopup"></div>
    <div class="PopUp-Content">
      <button class="closeButton"
              @click="closePopup"
              type="button">x</button>
      <div class="title">
        <h2>ANKET FORMU</h2>
        <hr>
      </div>

      <form @submit.prevent="onSubmit">

        <div class="form-item">
          <v-select v-model="selectedJob"
                    name="selectedJob"
                    :options="jobList"
                    v-validate="'required'"
                    :class="{'error' : errors.first('selectedJob') }"
                    placeholder="Mesleğiniz">
          </v-select>
          <span class="error" v-if="errors.first('selectedJob')">Meslek Zorunludur</span>
        </div>

        <div class="form-item column">
          <input type="text"
                 name="definition"
                 v-model="definition"
                 title="(Örneğin, Öğretmenler için : Matematik öğretmeni)"
                 v-validate="'required'"
                 :class="{'error' : errors.first('definition') }"
                 placeholder="Alanınız">
          <span class="description">(Örneğin, Öğretmenler için : Matematik öğretmeni)</span>
          <span class="error" v-if="errors.first('definition')"> Alan Zorunludur</span>
        </div>

        <div class="form-item">
          <input type="text"
                 v-model="time"
                 name="time"
                 v-validate="'required'"
                 :class="{'error' : errors.first('time') }"
                 placeholder="Kaç senedir sektördesiniz?">
          <span class="error" v-if="errors.first('time')">Tecrübe süresi zorunludur</span>
        </div>

        <div class="form-item">
          <input type="number"
                 step="any"
                 min="1"
                 v-validate="'required'"
                 v-model="worksHours"
                 name="worksHours"
                 :class="{'error' : errors.first('worksHours') }"
                 placeholder="Günlük Ortalama Çalışma Saatiniz">
          <span class="error" v-if="errors.first('worksHours')">Çalışma Süresi Zorunludur</span>
        </div>

        <div class="form-item">
          <select v-model="level"
                  v-validate="'required'"
                  :class="{'error' : errors.first('level') }"
                  name="level">
            <option :value="null" disabled>Seviyeniz</option>
            <option value="1">Junior</option>
            <option value="2">Medior</option>
            <option value="3">Senior</option>
          </select>
          <span class="error" v-if="errors.first('level')">Seviye Zorunludur</span>
        </div>

        <div class="form-item">
          <input type="number"
                 min="1"
                 step="any"
                 v-model="salary"
                 name="salary"
                 v-validate="'required'"
                 :class="{'error' : errors.first('salary') }"
                 placeholder="Aylık Maaşınız">
          <span class="error" v-if="errors.first('salary')">Maaş Zorunludur</span>
          <select name="rate"
                  v-model="rate"
                  :class="{'error' : errors.first('rate') }"
                  v-validate="'required'">
            <option :value="null" disabled>Kur Seçiniz</option>
            <option value="tl">TL</option>
            <option value="usd">Dolar</option>
            <option value="euro">Euro</option>
          </select>
          <span class="error" v-if="errors.first('rate')">Kur zorunludur</span>
        </div>

        <div class="form-item">
          <button type="submit">
            <span v-if="!isSender">Formu Gönder</span>
            <div v-else class="loading">
              <Loading/>
            </div>
          </button>
        </div>
        <div class="form-item">
          <p v-if="showMessage"
             class="successMessage">
            Ankete Katıldığınız İçin Teşekkür Ederiz :)
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Jobs from '@/helpers/jobs.json';
import { DB } from '@/helpers/firebase';

export default {
  name: 'PopUp',
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      jobList: [],
      selectedJob: null,
      definition: null,
      worksHours: null,
      level: null,
      salary: null,
      rate: null,
      time: null,
      isSender: false,
      showMessage: false,
    };
  },
  mounted() {
    this.jobList = Jobs;
  },
  methods: {
    closePopup() {
      this.$emit('closePopup');
      this.selectedJob = null;
      this.definition = null;
      this.worksHours = null;
      this.level = null;
      this.salary = null;
      this.rate = null;
      this.time = null;
      this.isSender = false;
      this.showMessage = false;
    },
    onSubmit() {
      this.$validator.validateAll().then((result) => {
        if (!result) return;
        this.isSender = true;
        const data = {
          code: this.selectedJob.id,
          group: this.definition,
          hours: this.worksHours,
          level: this.level,
          salary: this.salary,
          rate: this.rate,
          time: this.time,
        };
        DB.ref('veriler').push(data).then((res) => {
          this.isSender = false;
          if (res) {
            this.showMessage = true;
          }
        });
      });
    },
  },
};
</script>

<style lang="scss">
 .PopUp {
    z-index: 100;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    display: none;
    align-items: center;
    justify-content: center;
    transition: 1.1s all ease;
    &.open {
      display: flex;
     .PopUp-Content {
        animation: 1.1s PopUpAnimate ease;
     }
    }
    &-Overlay {
      position: absolute;
      background: rgba(#000, .7);
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }
    &-Content {
      width: 80%;
      background-color: #fdfdfd;
      box-shadow: 5px 10px 20px 0 rgba(0, 0, 0, 0.3);
      display: flex;
      flex-direction: column;
      padding: 50px 20px;
      z-index: 10000;
      position: relative;
      border-radius: 10px;
      .closeButton {
        position: absolute;
        right: -15px;
        top: -10px;
        display: flex;
        width: 35px;
        height: 35px;
        border-radius: 50%;
        border: 3px solid;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 25px;
        z-index: 999;
        background: $color-dark;
        color: $white;
        transition: .7 all ease-out;
        &:hover {
          background: #00bcd4;
        }
      }
      form {
        .form-item {
          width: 100%;
          margin-bottom: 20px;
          display: flex;
          &.column {
           flex-direction: column;
           span {
             margin-top: 12px;
             font-size: 13px;
             color: $color-dark;
             opacity: 0.7;
           }
          }
          div {
            width: 100%;
          }
          &:not(:first-child) {
            input, select {
              height: 46px;
              width: 100%;
              border-radius: 5px;
              outline: 0;
              border: 1px solid $color-gray;
            }
            input {
              padding: 7px;
            }
            button {
              width: 100%;
              height: 46px;
              max-width: 160px;
              color: $white;
              background: $purple;
              font-weight: bold;
              border: 0;
              border-radius: 5px;
              display: flex;
              align-items: center;
              justify-content: center;
              .loading {
                font-size: 45px;
              }
            }
          }
        }
      }
    }
 }

 @keyframes PopUpAnimate {
    0% {
      top: -50%;
    }
    100% {
      top: 0%;
    }
  }
</style>
