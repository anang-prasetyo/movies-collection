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
const isKosong = ref(false)
const isFilmOrSeries = ref(null)

watch(
  () => {
    if (isSeries.value && isFilm.value){
      newMovies.value = []
      for (let a= 0; a<movies.value.length ; a++){
        newMovies.value.push(movies.value[a])
      }
      isKosong.value = false
    }
    if (!isSeries.value && isFilm.value){
      isFilmOrSeries.value = 'Film'
      isKosong.value = false
      newMovies.value = []
      for (let a= 0; a<movies.value.length ; a++){
        if (movies.value[a].series == 0){
          newMovies.value.push(movies.value[a])
        }
      }
      if (tagMovie.value !== 'semua' &&!newMovies.value[0].tag.includes(tagMovie.value)){
        isKosong.value = true
      }
    }
    if (!isFilm.value && isSeries.value){
      isFilmOrSeries.value = 'Series'
      isKosong.value = false
      newMovies.value = []
      for (let a= 0; a<movies.value.length ; a++){
        if (movies.value[a].series !== 0){
          newMovies.value.push(movies.value[a])
        }
      }
      if (tagMovie.value !== 'semua' && !newMovies.value[0].tag.includes(tagMovie.value)){
        isKosong.value = true
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
      <div class="px-4 py-3 px-md-5 position-absolute top-0 w-100">
        <div class="display-4 text-danger text-logo">
          netplik
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
    -webkit-backdrop-filter: blur(16px) saturate(180%); background-color: rgba(17, 25, 40, 0.75);">
      <div class="container-fluid container-md mb-6 py-2 d-flex flex-column justify-content-between align-items-center h-100">
        <div class="row d-flex gap-3 align-items-center justify-content-center position-relative h-100 w-100">
          <div class="col-auto">
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
          <div v-if="selectedMovie && selectedMovie.series !== 0" class="col-auto d-flex flex-sm-column align-items-center eps">
            <div v-for="s in selectedMovie.series" :key="s" style="white-space: nowrap;">
              <div :class="selectedMovie.selectSeries == s ? 'text-white' : 'text-white-50'" class="btn btn-default" @click="selectedMovie.selectSeries = s, isClikedMovie = true">Eps {{ s }}</div>
            </div>
          </div>
          <div v-if="selectedMovie" class="col-auto col-md-4 px-4 px-md-0 fs-md-2 text-sm-center">{{ selectedMovie.judul + ' (' + selectedMovie.tahun + ')' }}</div>
          <div v-else class="col-auto col-md-4 text-center fs-md-2">Mau nonton apa hari ini?</div>
          <div class="position-absolute bottom-0 start-0 flex-column w-auto" :class="iSFilter ? 'd-inline-flex' : 'd-none'" style="cursor:pointer;">
            <div :class="selectFilter === 'Judul' ? 'text-white' : 'text-white-50'" @click="selectFilter = 'Judul', stateFilter[1] = 0, stateFilter[0] < 2 ? stateFilter[0]++ : stateFilter[0] == 2 ? stateFilter[0]-- : '', stateFilter[0] == 1 ? newMovies.sort(filterDownJudul) : stateFilter[0] == 2 ? newMovies.sort(filterUpJudul) : ''"><i :class="stateFilter[0] == 2 ? 'bi-arrow-up-short' : stateFilter[0] == 1 ? 'bi-arrow-down-short' : 'bi-dash'"></i> Judul</div>
            <div :class="selectFilter === 'Tahun' ? 'text-white' : 'text-white-50'" @click="selectFilter = 'Tahun', stateFilter[0] = 0, stateFilter[1] < 2 ? stateFilter[1]++ : stateFilter[1] == 2 ? stateFilter[1]-- : '', stateFilter[1] == 1 ? newMovies.sort(filterDownTahun) : stateFilter[1] == 2 ? newMovies.sort(filterUpTahun) : ''"><i :class="stateFilter[1] == 2 ? 'bi-arrow-up-short' : stateFilter[1] == 1 ? 'bi-arrow-down-short' : 'bi-dash'"></i> Tahun</div>
          </div>
        </div>
        <nav class="mt-1 mx-auto mx-md-2 d-flex align-items-center row justify-content-center">
          <ul class="nav col-auto">
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
          </ul>
          <ul class="nav d-inline-flex justify-content-center col-auto col-sm" style="overflow: auto; max-height: 40px;">
            <li v-for="t, i in tags.sort()" :key="i" class="nav-item" @click="tagMovie = t">
              <a href="#TopContent" class="nav-link" :class="tagMovie == t ? 'text-white' : 'text-white-50'">{{ t }}</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <div v-if="isKosong" class="container">Tidak ada {{ isFilmOrSeries }} pada kategori {{ tagMovie }}</div>
    <div v-if="tagMovie == 'semua'" class="container pt-2 pb-3 mt-3">
      <div class="row row-gap-4">
        <div v-for="m, i in newMovies" :key="i" class="m-auto m-sm-0 col-6 col-sm-4 col-md-3 col-lg-2">
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
        <div v-for="m, i in newMovies" :key="i" :class="m.tag.includes(tagMovie) ? 'm-auto m-sm-0 col-8 col-sm-6 col-md-4 col-lg-2' : 'd-none'">
          <div @click="selectedMovie = m, selectedMovie.selectSeries = 1, isClikedMovie = true" style="cursor: pointer;">
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

.eps{
  overflow: auto;
}
@media (min-width: 576px) { 
  .eps{
    max-height: 250px;
  }
}
@media (max-width: 576px) { 
  .poster{
    height: 250px;
  }
}
</style>
