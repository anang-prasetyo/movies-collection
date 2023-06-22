import {ref} from 'vue'

export default function myDb(){
  const movies = ref([
    {
      judul: 'Fast X',
      tahun: 2023,
      series: 0,
      quality: 'WEB-DL',
      posterUrl: 'https://i.pinimg.com/564x/75/20/d0/7520d08e00d926a2cf8230183b318077.jpg',
      landscapeUrl: 'https://i.pinimg.com/originals/25/9c/d6/259cd6ad7f2611a41d4f3fc56df7a5c9.jpg',
      videoUrl: 'https://www.youtube.com/embed/32RAq6JzY-w',
      tag: ['Balapan', 'Aksi']
    },
    {
      judul: 'Spider-Man No Way Home',
      tahun: 2021,
      series: 0,
      quality: 'WEB-DL',
      posterUrl: 'https://i.pinimg.com/564x/bb/9e/45/bb9e457a955dfd92382fce3e00c7ecc9.jpg',
      landscapeUrl: 'https://i.pinimg.com/564x/fe/a0/98/fea098dbaf17d8ee9fe5376abe32cd12.jpg',
      videoUrl: 'https://www.youtube.com/embed/JfVOs4VSpmA',
      tag: ['Marvel', 'Superhero']
    },
    {
      judul: 'Spider-Man Across The Spider Verse',
      tahun: 2023,
      series: 0,
      quality: 'WEB-DL',
      posterUrl: 'https://i.pinimg.com/originals/46/7d/94/467d9422c34a27a813e84d4da80a0cb1.jpg',
      landscapeUrl: 'https://images.squarespace-cdn.com/content/v1/51b3dc8ee4b051b96ceb10de/a528ec50-cc70-46f0-a2e3-31b279594daa/spider-man-across-the-spider-verse-banner-features-an-epic-number-of-spider-people.jpg?format=1500w',
      videoUrl: 'https://www.youtube.com/embed/cqGjhVJWtEg',
      tag: ['Marvel', 'Superhero', 'Animasi']
    },
    {
      judul: 'The Flash',
      tahun: 2023,
      series: 0,
      quality: 'WEB-DL',
      posterUrl: 'https://i.pinimg.com/originals/7a/ac/2a/7aac2a88ce44a105e986148c071dfcf2.jpg',
      landscapeUrl: 'https://i.pinimg.com/originals/87/5d/1a/875d1a4874d0159f667dd0b10473e579.jpg',
      videoUrl: 'https://www.youtube.com/embed/hebWYacbdvc',
      tag: ['DC', 'Superhero']
    },
    {
      judul: 'Transformers Rise Of The Beasts',
      tahun: 2023,
      series: 0,
      quality: 'WEB-DL',
      posterUrl: 'https://i.pinimg.com/originals/0f/f0/10/0ff010231db67df023d0c11ba1cc4c7f.jpg',
      landscapeUrl: 'https://static1.cbrimages.com/wordpress/wp-content/uploads/2023/05/transformers-rise-of-the-beasts-imax.jpg',
      videoUrl: 'https://www.youtube.com/embed/WWWDskI46Js',
      tag: ['Robot', 'Aksi']
    },
    {
      judul: 'Furious 7',
      tahun: 2015,
      series: 0,
      quality: 'bluray',
      posterUrl: 'https://i.pinimg.com/originals/0d/57/f7/0d57f74c55c9c6507316cc4ac2ab6203.jpg',
      landscapeUrl: 'https://i.pinimg.com/originals/e6/41/f6/e641f6ff38eba8c55f03bbba5d19e664.jpg',
      videoUrl: 'https://www.youtube.com/embed/Skpu5HaVkOc',
      tag: ['Balapan', 'Aksi']
    },
    {
      judul: 'The Lion King',
      tahun: 2019,
      series: 0,
      quality: 'bluray',
      posterUrl: 'https://i.pinimg.com/originals/05/07/cf/0507cff221a01e707d8ead1262a01487.jpg',
      landscapeUrl: 'https://i.pinimg.com/originals/31/71/4d/31714d90aac49a62420b49e7f6ed073d.jpg',
      videoUrl: 'https://www.youtube.com/embed/7TavVZMewpY',
      tag: ['Petualangan', 'Aksi']
    },
    {
      judul: 'Ralph Breaks the Internet',
      tahun: 2018,
      series: 0,
      quality: 'bluray',
      posterUrl: 'https://i.pinimg.com/originals/64/47/d3/6447d3f1f94899cfdc8503cad9407df8.jpg',
      landscapeUrl: 'https://i.pinimg.com/564x/63/7b/c9/637bc9e2f1414151ae0e405a3d47f7b1.jpg',
      videoUrl: 'https://www.youtube.com/embed/_BcYBFC6zfY',
      tag: ['Petualangan', 'Animasi']
    },
    {
      judul: 'Aquaman',
      tahun: 2018,
      series: 0,
      quality: 'web-dl',
      posterUrl: 'https://i.pinimg.com/originals/f1/97/6a/f1976a9a7eab1070d62826e9b21411e1.jpg',
      landscapeUrl: 'https://www.defilmkijker.com/wp-content/uploads/2018/12/Recensie-Aquaman.jpg',
      videoUrl: 'https://www.youtube.com/embed/WDkg3h8PCVU',
      tag: ['DC', 'Superhero']
    },
    {
      judul: 'Ms Marvel',
      tahun: 2022,
      series: 6,
      quality: 'WEB-DL',
      posterUrl: 'https://i.pinimg.com/564x/1b/02/a2/1b02a2c9beed708e4d0bc127e146814b.jpg',
      landscapeUrl: 'https://staticg.sportskeeda.com/editor/2022/06/9d185-16546824624899-1920.jpg',
      videoUrl: ['https://www.youtube.com/embed/m9EX0f6V11Y', 'https://www.youtube.com/embed/c7HSY8HF_3U', 'https://www.youtube.com/embed/EWb7fLLf6pY', 'https://www.youtube.com/embed/_IagU74GaeA', 'https://www.youtube.com/embed/meYrEggcYls', 'https://www.youtube.com/embed/V7NeQyHwFxk'],
      tag: ['Marvel', 'Superhero']
    },
  ])
  return { movies }
}