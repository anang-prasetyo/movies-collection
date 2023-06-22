<script setup>
import { onMounted, ref, watch } from 'vue';
import myDb from './db/movies';

const { movies } = myDb()
const newMovies = ref([])
const selectedMovie = ref(null)
const isClikedMovie = ref(false)
const showDetailMovie = ref(true)
const tags = ref([])
const getTags = () => {
  for (let a=0 ; a<movies.value.length ; a++){
    if (tags.value.length === 0){
      for (let b=0 ; b<movies.value[a].tag.length ; b++){
        tags.value.push(movies.value[a].tag[b])
      }
    }
    else {
      for (let b=0 ; b<movies.value[a].tag.length ; b++){
        if (tags.value.includes(movies.value[a].tag[b])){
          console.log('sudah ada tag yang sama');
        }
        else {
          tags.value.push(movies.value[a].tag[b])
        }
      }
    }
  }
}


watch(
  () => {
    if (isClikedMovie.value){
      showDetailMovie.value = false
      setTimeout(() => {showDetailMovie.value = true}, 250)
      setTimeout(() => {isClikedMovie.value = false}, 250)
    }
  }
)

const slideIndex = ref(0);
const showSlides = async() => {
  let i;
  let countdown = document.getElementsByClassName("toast-my--progress");
  const fromSlide = async() => {
    let slides = document.getElementsByClassName("ImageCarousel");
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
    }
    slideIndex.value++;
    if (slideIndex.value > slides.length) {slideIndex.value = 1}
    slides[slideIndex.value-1].style.display = "block"; 
  } 
  const fromCountdown = async() => {
    countdown[0].style.animationDuration = "9.9s"
    countdown[0].style.display = "block"
    setTimeout(() => {
      countdown[0].style.display = "none"
    }, 9900)
  }
  await fromSlide()
  .then(fromCountdown())
  setTimeout(()=>{
    showSlides()
  }, 10000)
}

const isFilm = ref(true)
const isSeries = ref(true)
const tagMovie = ref('semua')

watch(
  () => {
    if (isSeries.value && isFilm.value){
      newMovies.value = []
      for (let a= 0; a<movies.value.length ; a++){
        newMovies.value.push(movies.value[a])
      }
    }
    if (!isSeries.value && isFilm.value){
      newMovies.value = []
      for (let a= 0; a<movies.value.length ; a++){
        if (movies.value[a].series == 0){
          newMovies.value.push(movies.value[a])
        }
      }
    }
    if (!isFilm.value && isSeries.value){
      newMovies.value = []
      for (let a= 0; a<movies.value.length ; a++){
        if (movies.value[a].series !== 0){
          newMovies.value.push(movies.value[a])
        }
      }
    }
  }
)

const iSFilter = ref(false)
const selectFilter = ref(null)
const stateFilter = ref([0,0])

const resetFilter = () => {
  stateFilter.value = [0,0]
  selectFilter.value = null
}
let filterUpJudul = function(a,b) {
  let fa = a.judul.toLowerCase(),
      fb = b.judul.toLowerCase();

  if (fa < fb) {
      return -1;
  }
  if (fa > fb) {
      return 1;
  }
  return 0;
}
let filterDownJudul = function(a,b) {
  let fa = a.judul.toLowerCase(),
      fb = b.judul.toLowerCase();

  if (fa < fb) {
      return 1;
  }
  if (fa > fb) {
      return -1;
  }
  return 0;
}
let filterUpTahun = function(a,b) {
  return a.tahun - b.tahun
}
let filterDownTahun = function(a,b) {
  return b.tahun - a.tahun
}


onMounted(() => {
  document.onreadystatechange = async() => {
    if (document.readyState == "complete") {
      console.log('Page completed with image and files!')
      showSlides()
      getTags()
    }
  }
  })
</script>

<template>
  <main>
    <div class="bg-poster position-relative">
      <div class="nav-logo position-absolute top-0 w-100">
        <div class="title text-danger text-logo">
          NETPLIK
        </div>
      </div>
      <div class="vh-100 d-flex align-items-center justify-content-center">
        <div class="container px-5 d-flex flex-column align-items-center justify-content-center">
          <div class="display-1 text-uppercase fw-bold text-center mt-3 mb-6">Tempat nonton film dan series.</div>
        </div>
      </div>
    </div>
    <span id="TopContent"></span>
    <div class="position-sticky z-2 top-0" style="backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%); background-color: rgba(17, 25, 40, 0.75); min-height: 320px; max-height: 320px;">
      <div class="container mb-6 py-2">
        <div class="row d-flex gap-3 align-items-center justify-content-center position-relative">
          <div class="col-auto d-flex align-items-center">
            <div v-if="selectedMovie && showDetailMovie" style="max-width: 400px; max-height: 250px;">
              <iframe v-if="selectedMovie.series !== 0" width="400" height="250" :src="selectedMovie.videoUrl[selectedMovie.selectSeries-1]" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
              <iframe v-else width="400" height="250" :src="selectedMovie.videoUrl" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>            
            <div v-else-if="isClikedMovie" style="width: 400px; height: 250px; background: black;">
            </div>
            <div v-else class="position-relative">
              <div v-for="m, i in movies" :key="i" @click="selectedMovie = m, selectedMovie.selectSeries = 1, isClikedMovie = true">
                <div class="ImageCarousel fade position-relative" style="max-width: 400px; max-height: 250px; overflow: hidden;">
                  <img :src="m.landscapeUrl" :alt="m.judul" class="w-100" style="min-height: 250px; object-fit: cover;">
                  <div class="ImageCarousel-caption position-absolute w-100 text-center" style="bottom: 5%;">{{ m.judul + ' (' + m.tahun +')' }}</div>
                </div>
              </div>
              <span class="toast-my--progress"></span>
            </div>
          </div>
          <div v-if="selectedMovie && selectedMovie.series !== 0" class="col-auto" style="max-height: 250px; overflow: auto;">
            <div v-for="s in selectedMovie.series" :key="s" class=" d-flex flex-column gap-1">
              <div :class="selectedMovie.selectSeries == s ? 'text-white' : 'text-white-50'" class="btn btn-default" @click="selectedMovie.selectSeries = s, isClikedMovie = true">Eps {{ s }}</div>
            </div>
          </div>
          <div v-if="selectedMovie" class="col-4 fs-2">{{ selectedMovie.judul + ' (' + selectedMovie.tahun + ')' }}</div>
          <div v-else class="col-4 fs-2">Mau nonton apa hari ini?</div>
          <div class="position-absolute bottom-0 start-0 flex-column w-auto" :class="iSFilter ? 'd-inline-flex' : 'd-none'" style="cursor:pointer;">
            <div :class="selectFilter === 'Judul' ? 'text-white' : 'text-white-50'" @click="selectFilter = 'Judul', stateFilter[1] = 0, stateFilter[0] < 2 ? stateFilter[0]++ : stateFilter[0] == 2 ? stateFilter[0]-- : '', stateFilter[0] == 1 ? newMovies.sort(filterDownJudul) : stateFilter[0] == 2 ? newMovies.sort(filterUpJudul) : ''"><i :class="stateFilter[0] == 2 ? 'bi-arrow-up-short' : stateFilter[0] == 1 ? 'bi-arrow-down-short' : 'bi-dash'"></i> Judul</div>
            <div :class="selectFilter === 'Tahun' ? 'text-white' : 'text-white-50'" @click="selectFilter = 'Tahun', stateFilter[0] = 0, stateFilter[1] < 2 ? stateFilter[1]++ : stateFilter[1] == 2 ? stateFilter[1]-- : '', stateFilter[1] == 1 ? newMovies.sort(filterDownTahun) : stateFilter[1] == 2 ? newMovies.sort(filterUpTahun) : ''"><i :class="stateFilter[1] == 2 ? 'bi-arrow-up-short' : stateFilter[1] == 1 ? 'bi-arrow-down-short' : 'bi-dash'"></i> Tahun</div>
          </div>
        </div>
        <nav class="my-2">
          <ul class="nav">
            <li class="nav-item"><i class="nav-link" :class="iSFilter ? 'bi-filter-circle-fill' : 'bi-filter-circle'" style="cursor: pointer;" @click="iSFilter = !iSFilter"></i></li>
            <li class="nav-item" @click="tagMovie = 'semua', isFilm = true, isSeries = true, resetFilter()">
              <a href="#TopContent" class="nav-link " :class="isFilm && isSeries ? 'text-white' : 'text-white-50'">Semua</a>
            </li>
            <li class="nav-item" :class="isFilm ? 'border-bottom border-primary' : ''" @click="isSeries ? isFilm = !isFilm : '', resetFilter()" style="cursor: pointer;">
              <a class="nav-link" :class="isFilm ? 'text-primary' : 'text-white-50'">Film</a>
            </li>
            <li class="nav-item" :class="isSeries ? 'border-bottom border-success' : ''" @click="isFilm ? isSeries = !isSeries : '', resetFilter()" style="cursor: pointer;">
              <a class="nav-link" :class="isSeries ? 'text-success' : 'text-white-50'">Series</a>
            </li>
            <li class="nav-link" :class="tagMovie !== 'semua' ? 'text-white' : 'text-white-50'" style="cursor:default;"><i class="bi bi-arrow-right-short"></i></li>
            <li v-for="t, i in tags.sort()" :key="i" class="nav-item" @click="tagMovie = t">
              <a href="#TopContent" class="nav-link" :class="tagMovie == t ? 'text-white' : 'text-white-50'">{{ t }}</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <div v-if="tagMovie == 'semua'" class="container pt-2 pb-3 mt-3">
      <div v-if="tagMovie == 'semua'" class="row" style="row-gap: 3rem;">
        <div v-for="m, i in newMovies" :key="i" class="col-2">
          <div style="cursor: pointer;">
            <div class="poster" @click="selectedMovie = m, selectedMovie.selectSeries = 1, isClikedMovie = true">
              <img :src="m.posterUrl" :alt="m.judul" />
              <div class="overlay">{{ m.judul + ' (' + m.tahun + ')' }}</div>
              <div class="tag-quality is-info"><span class="text-uppercase">{{ m.quality }}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="container pt-2 pb-3 mt-3">
      <div class="row" style="row-gap: 3rem;">
        <div v-for="m, i in newMovies" :key="i"  :class="m.tag.includes(tagMovie) ? 'col-2' : 'd-none'">
          <div v-if="m.tag.includes(tagMovie)" @click="selectedMovie = m, selectedMovie.selectSeries = 1, isClikedMovie = true" style="cursor: pointer;">
            <div class="poster">
              <img :src="m.posterUrl" :alt="m.judul" />
              <div class="overlay">{{ m.judul + ' (' + m.tahun + ')' }}</div>
              <div class="tag-quality is-info"><span class="text-uppercase">{{ m.quality }}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
.ImageCarousel{
  display: none;
  cursor: pointer;
  &-caption{
    opacity: 0;
    transition: all .5s ease;
  }
  &:hover &-caption{
    opacity: 1;
  }
}
.fade{opacity: 1;}
.toast-my--progress{
  position: absolute;
  left: 5px;
  bottom: 5px;
  width: 0;
  height: 3px;
  background-image: linear-gradient(to right, blue, cyan);
  border-radius: 4px;
  animation: progress linear forwards;
}
@keyframes progress {
  to {
    width: calc(100% - 10px);
  }
} 
</style>
