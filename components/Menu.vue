<template>
    <div class="container fugu-gallery-menu" style="text-align: center;">
        <ul>
        <li
          @click="handleItemClick('Pragmatic Play')"
          :class="{
            active: activeItem === 'Pragmatic Play',
            j0x73fx: activeItem === 'Pragmatic Play',
          }"
        >
        <nuxt-img loading="lazy" effect="blur" src="https://it-cgg.b-cdn.net/rtp/rmj/provider/pragmaticplay.webp" style="width: 100px;"/>
        <br/>PRAGMATIC PLAY
        </li>
        <li
          @click="handleItemClick('PG Soft')"
          :class="{
            active: activeItem === 'PG Soft',
            j0x73fx: activeItem === 'PG Soft',
          }"
        >
        <nuxt-img loading="lazy" effect="blur" src="https://it-cgg.b-cdn.net/rtp/rmj/provider/pgsoft.webp" style="width: 100px;"/>
        <br/>PG SOFT
        </li>
        <li
          @click="handleItemClick('Joker')"
          :class="{
            active: activeItem === 'Joker',
            j0x73fx: activeItem === 'Joker',
          }"
        >
        <nuxt-img loading="lazy" effect="blur" src="https://it-cgg.b-cdn.net/rtp/rmj/provider/joker.webp" style="width: 100px;"/>
        <br/>JOKER
        </li>
        <li
          @click="handleItemClick('MicroGaming')"
          :class="{
            active: activeItem === 'MicroGaming',
            j0x73fx: activeItem === 'MicroGaming',
          }"
        >
        <nuxt-img loading="lazy" effect="blur" src="https://it-cgg.b-cdn.net/rtp/rmj/provider/microgaming.webp" style="width: 100px;"/>
        <br/>MICROGAMING
        </li>
        <li
          @click="handleItemClick('Habanero')"
          :class="{
            active: activeItem === 'Habanero',
            j0x73fx: activeItem === 'Habanero',
          }"
        >
        <nuxt-img loading="lazy" effect="blur" src="https://it-cgg.b-cdn.net/rtp/rmj/provider/habanero.webp" style="width: 100px;"/>
        <br/>HABANERO
        </li>
        </ul>
    </div>
    <div class="container">
      <div v-if="activeItem === 'Pragmatic Play'">
  
        <div v-if="filteredPragmadata.length > 0" class="row">
              <div style="margin-bottom: 20px;">
                <input type="text" v-model="queryPragma" placeholder="Cari games..." style="color: white !important"/>
              </div>
              <div v-for="itemPragma in filteredPragmadata" :key="itemPragma.id" class="fugu-grid-item fugu-grid-item-w2 col-4 col-md-4 col-lg-2 wow fadeInUpX pgsoft">
              <div class="portfolio-item">
                <a href="https://urlshortenertool.com/RTP-RM" rel="noopener noreferrer nofollow" target="_blank">
                  <div class="thumb img-fluid">
                    <nuxt-img loading="lazy" effect="blur" :alt="itemPragma.game_name" :src="itemPragma.img_src" style="width: 100%; height: auto" />
                  </div>
                </a>
                <div class="progress-rtp">
                  <p class="rtp-style">RTP: {{ itemPragma.number }} %</p>
                  <div :class="['bg-progress-rtp', (itemPragma.number < 55 && 'red') || (itemPragma.number >= 55 && itemPragma.number <= 75 && 'yellow') || (itemPragma.number > 75 && 'green')]" :style="{ width: `${itemPragma.number}%` }"></div>
                </div>
                <div class="down-content"><span>{{ itemPragma.game_name }}</span></div>
              </div>
            </div>
        </div>
        <div v-else>
          <div class="row">
              <div style="margin-bottom: 20px;">
                <input type="text" v-model="queryPragma" placeholder="Cari games..." style="color: white !important"/>
              </div>
              <div v-for="itemPragma in filteredPragmadata" :key="itemPragma.id" class="fugu-grid-item fugu-grid-item-w2 col-4 col-md-4 col-lg-2 wow fadeInUpX pgsoft">
              <div class="portfolio-item">
                <a href="https://urlshortenertool.com/RTP-RM" rel="noopener noreferrer nofollow" target="_blank">
                  <div class="thumb img-fluid">
                    <nuxt-img loading="lazy" effect="blur" :alt="itemPragma.game_name" :src="itemPragma.img_src" style="width: 100%; height: auto" />
                  </div>
                </a>
                <div class="progress-rtp">
                  <p class="rtp-style">RTP: {{ itemPragma.number }} %</p>
                  <div :class="['bg-progress-rtp', (itemPragma.number < 55 && 'red') || (itemPragma.number >= 55 && itemPragma.number <= 75 && 'yellow') || (itemPragma.number > 75 && 'green')]" :style="{ width: `${itemPragma.number}%` }"></div>
                </div>
                <div class="down-content"><span>{{ itemPragma.game_name }}</span></div>
              </div>
            </div>
          </div>
          <div class="text-center" style="color: white; animation: fadeIn 2s; width: 100%;">Data Game tidak ditemukan...</div>
        </div>
  
      </div>
  
      <div v-if="activeItem === 'PG Soft'">
  
        <div v-if="filteredPgsoftdata.length > 0" class="row">
          <div style="margin-bottom: 20px;">
              <input type="text" v-model="queryPgsoft" placeholder="Cari games..." style="color: white !important"/>
          </div>
          <div v-for="itemPG in filteredPgsoftdata" :key="itemPG.id" class="fugu-grid-item fugu-grid-item-w2 col-4 col-md-4 col-lg-2 wow fadeInUpX pgsoft">
              <div class="portfolio-item">
                  <a href="https://urlshortenertool.com/RTP-RM" rel="noopener noreferrer nofollow" target="_blank">
                      <div class="thumb img-fluid">
                          <nuxt-img loading="lazy" effect="blur" :alt="itemPG.game_name" :src="itemPG.img_src" style="width: 100%; height: auto" />
                      </div>
                  </a>
                  <div class="progress-rtp">
                      <p class="rtp-style">RTP: {{ itemPG.number }} %</p>
                      <div :class="['bg-progress-rtp', (itemPG.number < 55 && 'red') || (itemPG.number >= 55 && itemPG.number <= 75 && 'yellow') || (itemPG.number > 75 && 'green')]" :style="{ width: `${itemPG.number}%` }"></div>
                  </div>
                  <div class="down-content"><span>{{ itemPG.game_name }}</span></div>
                </div>
             </div>
        </div>
        <div v-else>
          <div class="row">
            <div style="margin-bottom: 20px;">
                <input type="text" v-model="queryPgsoft" placeholder="Cari games..." style="color: white !important"/>
            </div>
            <div v-for="itemPG in filteredPgsoftdata" :key="itemPG.id" class="fugu-grid-item fugu-grid-item-w2 col-4 col-md-4 col-lg-2 wow fadeInUpX pgsoft">
                <div class="portfolio-item">
                    <a href="https://urlshortenertool.com/RTP-RM" rel="noopener noreferrer nofollow" target="_blank">
                        <div class="thumb img-fluid">
                            <nuxt-img loading="lazy" effect="blur" :alt="itemPG.game_name" :src="itemPG.img_src" style="width: 100%; height: auto" />
                        </div>
                    </a>
                    <div class="progress-rtp">
                        <p class="rtp-style">RTP: {{ itemPG.number }} %</p>
                        <div :class="['bg-progress-rtp', (itemPG.number < 55 && 'red') || (itemPG.number >= 55 && itemPG.number <= 75 && 'yellow') || (itemPG.number > 75 && 'green')]" :style="{ width: `${itemPG.number}%` }"></div>
                    </div>
                    <div class="down-content"><span>{{ itemPG.game_name }}</span></div>
                  </div>
              </div>
          </div>
          <div class="text-center" style="color: white; animation: fadeIn 2s; width: 100%;">Data Game tidak ditemukan...</div>
        </div>
  
        </div>
        <div v-if="activeItem === 'Joker'">
  
          <div v-if="filteredJokerData.length > 0" class="row">
          <div style="margin-bottom: 20px;">
              <input type="text" v-model="queryJoker" placeholder="Cari games..." style="color: white !important"/>
          </div>
          <div v-for="itemJoker in filteredJokerData" :key="itemJoker.id" class="fugu-grid-item fugu-grid-item-w2 col-4 col-md-4 col-lg-2 wow fadeInUpX pgsoft">
              <div class="portfolio-item">
                  <a href="https://urlshortenertool.com/RTP-RM" rel="noopener noreferrer nofollow" target="_blank">
                      <div class="thumb img-fluid">
                          <nuxt-img loading="lazy" effect="blur" :alt="itemJoker.game_name" :src="itemJoker.img_src" style="width: 100%; height: auto" />
                      </div>
                  </a>
                  <div class="progress-rtp">
                      <p class="rtp-style">RTP: {{ itemJoker.number }} %</p>
                      <div :class="['bg-progress-rtp', (itemJoker.number < 55 && 'red') || (itemJoker.number >= 55 && itemJoker.number <= 75 && 'yellow') || (itemJoker.number > 75 && 'green')]" :style="{ width: `${itemJoker.number}%` }"></div>
                  </div>
                  <div class="down-content"><span>{{ itemJoker.game_name }}</span></div>
                </div>
             </div>
        </div>
        <div v-else>
          <div class="row">
            <div style="margin-bottom: 20px;">
                <input type="text" v-model="queryJoker" placeholder="Cari games..." style="color: white !important"/>
            </div>
            <div v-for="itemJoker in filteredPgsoftdata" :key="itemJoker.id" class="fugu-grid-itemJoker fugu-grid-itemJoker-w2 col-4 col-md-4 col-lg-2 wow fadeInUpX pgsoft">
                <div class="portfolio-itemJoker">
                    <a href="https://urlshortenertool.com/RTP-RM" rel="noopener noreferrer nofollow" target="_blank">
                        <div class="thumb img-fluid">
                            <nuxt-img loading="lazy" effect="blur" :alt="itemJoker.game_name" :src="itemJoker.img_src" style="width: 100%; height: auto" />
                        </div>
                    </a>
                    <div class="progress-rtp">
                        <p class="rtp-style">RTP: {{ itemJoker.number }} %</p>
                        <div :class="['bg-progress-rtp', (itemJoker.number < 55 && 'red') || (itemJoker.number >= 55 && itemJoker.number <= 75 && 'yellow') || (itemJoker.number > 75 && 'green')]" :style="{ width: `${itemJoker.number}%` }"></div>
                    </div>
                    <div class="down-content"><span>{{ itemJoker.game_name }}</span></div>
                  </div>
              </div>
          </div>
          <div class="text-center" style="color: white; animation: fadeIn 2s; width: 100%;">Data Game tidak ditemukan...</div>
        </div>
  
        </div>
        <div v-if="activeItem === 'MicroGaming'">
          
          <div v-if="filteredeMicroData.length > 0" class="row">
                <div style="margin-bottom: 20px;">
                  <input type="text" v-model="queryMicro" placeholder="Cari games..." style="color: white !important"/>
                </div>
                <div v-for="microItem in filteredeMicroData" :key="microItem.id" class="fugu-grid-item fugu-grid-item-w2 col-4 col-md-4 col-lg-2 wow fadeInUpX pgsoft">
                <div class="portfolio-item">
                  <a href="https://urlshortenertool.com/RTP-RM" rel="noopener noreferrer nofollow" target="_blank">
                    <div class="thumb img-fluid">
                      <nuxt-img loading="lazy" effect="blur" :alt="microItem.game_name" :src="microItem.img_src" style="width: 100%; height: auto" />
                    </div>
                  </a>
                  <div class="progress-rtp">
                    <p class="rtp-style">RTP: {{ microItem.number }} %</p>
                    <div :class="['bg-progress-rtp', (microItem.number < 55 && 'red') || (microItem.number >= 55 && microItem.number <= 75 && 'yellow') || (microItem.number > 75 && 'green')]" :style="{ width: `${microItem.number}%` }"></div>
                  </div>
                  <div class="down-content"><span>{{ microItem.game_name }}</span></div>
                </div>
              </div>
          </div>
          <div v-else>
            <div class="row">
                <div style="margin-bottom: 20px;">
                  <input type="text" v-model="queryMicro" placeholder="Cari games..." style="color: white !important"/>
                </div>
                <div v-for="microItem in filteredeMicroData" :key="microItem.id" class="fugu-grid-item fugu-grid-item-w2 col-4 col-md-4 col-lg-2 wow fadeInUpX pgsoft">
                <div class="portfolio-item">
                  <a href="https://urlshortenertool.com/RTP-RM" rel="noopener noreferrer nofollow" target="_blank">
                    <div class="thumb img-fluid">
                      <nuxt-img loading="lazy" effect="blur" :alt="microItem.game_name" :src="microItem.img_src" style="width: 100%; height: auto" />
                    </div>
                  </a>
                  <div class="progress-rtp">
                    <p class="rtp-style">RTP: {{ microItem.number }} %</p>
                    <div :class="['bg-progress-rtp', (microItem.number < 55 && 'red') || (microItem.number >= 55 && microItem.number <= 75 && 'yellow') || (microItem.number > 75 && 'green')]" :style="{ width: `${microItem.number}%` }"></div>
                  </div>
                  <div class="down-content"><span>{{ microItem.game_name }}</span></div>
                </div>
              </div>
            </div>
            <div class="text-center" style="color: white; animation: fadeIn 2s; width: 100%;">Data Game tidak ditemukan...</div>
          </div>
  
        </div>
        <div v-if="activeItem === 'Habanero'">
  
          <div v-if="filteredHabaneroData.length > 0" class="row">
                <div style="margin-bottom: 20px;">
                  <input type="text" v-model="queryHabanero" placeholder="Cari games..." style="color: white !important"/>
                </div>
                <div v-for="itemHabanero in filteredHabaneroData" :key="itemHabanero.id" class="fugu-grid-item fugu-grid-item-w2 col-4 col-md-4 col-lg-2 wow fadeInUpX pgsoft">
                <div class="portfolio-item">
                  <a href="https://urlshortenertool.com/RTP-RM" rel="noopener noreferrer nofollow" target="_blank">
                    <div class="thumb img-fluid">
                      <nuxt-img loading="lazy" effect="blur" :alt="itemHabanero.game_name" :src="itemHabanero.img_src" style="width: 100%; height: auto" />
                    </div>
                  </a>
                  <div class="progress-rtp">
                    <p class="rtp-style">RTP: {{ itemHabanero.number }} %</p>
                    <div :class="['bg-progress-rtp', (itemHabanero.number < 55 && 'red') || (itemHabanero.number >= 55 && itemHabanero.number <= 75 && 'yellow') || (itemHabanero.number > 75 && 'green')]" :style="{ width: `${itemHabanero.number}%` }"></div>
                  </div>
                  <div class="down-content"><span>{{ itemHabanero.game_name }}</span></div>
                </div>
              </div>
          </div>
          <div v-else>
            <div class="row">
                <div style="margin-bottom: 20px;">
                  <input type="text" v-model="queryHabanero" placeholder="Cari games..." style="color: white !important"/>
                </div>
                <div v-for="itemHabanero in filteredHabaneroData" :key="itemHabanero.id" class="fugu-grid-item fugu-grid-item-w2 col-4 col-md-4 col-lg-2 wow fadeInUpX pgsoft">
                <div class="portfolio-item">
                  <a href="https://urlshortenertool.com/RTP-RM" rel="noopener noreferrer nofollow" target="_blank">
                    <div class="thumb img-fluid">
                      <nuxt-img loading="lazy" effect="blur" :alt="itemHabanero.game_name" :src="itemHabanero.img_src" style="width: 100%; height: auto" />
                    </div>
                  </a>
                  <div class="progress-rtp">
                    <p class="rtp-style">RTP: {{ itemHabanero.number }} %</p>
                    <div :class="['bg-progress-rtp', (itemHabanero.number < 55 && 'red') || (itemHabanero.number >= 55 && itemHabanero.number <= 75 && 'yellow') || (itemHabanero.number > 75 && 'green')]" :style="{ width: `${itemHabanero.number}%` }"></div>
                  </div>
                  <div class="down-content"><span>{{ itemHabanero.game_name }}</span></div>
                </div>
              </div>
            </div>
            <div class="text-center" style="color: white; animation: fadeIn 2s; width: 100%;">Data Game tidak ditemukan...</div>
          </div>
  
        </div>    
    </div>
  </template>
  
  <script> 
  export default {
    data() {
      return {
        activeItem: "Pragmatic Play",
        hotimages: [
          'https://it-cgg.b-cdn.net/rtp/rajapanen/hot-games/so-hot.webp',
          'https://it-cgg.b-cdn.net/rtp/rajapanen/hot-games/hot-bigwin.webp'
        ],
        currentIndex: 0,
        intervalId: null,
        queryPragma: '',
        queryPgsoft: '',
        queryJoker: '',
        queryMicro: '',
        queryHabanero: '',
        pragmadata: [],
        pgsoftdata: [],
        jokerdata: [],
        microdata: [],
        habanerodata: []
      };
    },
    mounted() {
      this.fetchPragmaData();
      this.fetchPgData();
      this.fetchJoker();
      this.fetchMicro();
      this.fetchHabanero();
      this.intervalId = setInterval(() => {
        this.switchImage();
      }, 2000); 
    },
    beforeDestroy() {
      clearInterval(this.intervalId);
    },
    methods: {
      handleItemClick(item) {
        this.activeItem = item;
      },
      async fetchPragmaData() {
        try {
          const responsePragma = await $fetch('https://152.42.160.119/data/nuxt/pragmatic', {
            method: 'GET',
            headers: {
              'Cache-Control': 'no-cache',
            }
          });
          const jsonPragma = responsePragma.data;
          this.pragmadata = jsonPragma; 
        } catch (error) {
          console.log("Error fetching", error);
        }
      },
      async fetchPgData() {
        try {
          const responsePg = await $fetch('https://152.42.160.119/data/nuxt/pgsoft', {
            method: 'GET',
            headers: {
              'Cache-Control': 'no-cache',
            }
          });
          const jsonPg = responsePg.data;
          this.pgsoftdata = jsonPg; 
        } catch (error) {
          console.log("Error fetching", error);
        }
      },
      async fetchJoker() {
        try {
          const responseJoker = await $fetch('https://152.42.160.119/data/nuxt/joker', {
            method: 'GET',
            headers: {
              'Cache-Control': 'no-cache',
            }
          });
          const jsonJoker = responseJoker.data;
          this.jokerdata = jsonJoker; 
        } catch (error) {
          console.log("Error fetching", error);
        }
      },
      async fetchMicro() {
        try {
          const responseMicro = await $fetch('https://152.42.160.119/data/nuxt/microgaming', {
            method: 'GET',
            headers: {
              'Cache-Control': 'no-cache',
            }
          });
          const jsonMicro = responseMicro.data;
          this.microdata = jsonMicro; 
        } catch (error) {
          console.log("Error fetching", error);
        }
      },
      async fetchHabanero() {
        try {
          const responseHabanero = await $fetch('https://152.42.160.119/data/nuxt/habanero', {
            method: 'GET',
            headers: {
              'Cache-Control': 'no-cache',
            }
          });
          const jsonHabanero = responseHabanero.data;
          this.habanerodata = jsonHabanero; 
        } catch (error) {
          console.log("Error fetching", error);
        }
      },
      switchImage() {
        this.currentIndex = (this.currentIndex + 1) % this.hotimages.length;
        this.$forceUpdate(); // Force a re-render of the component
      },
    },
    computed: {
      liClasses() {
        return {
          active: this.activeItem,
          btnprovider: this.activeItem,
        };
      },
      currentImage() {
        return this.hotimages[this.currentIndex];
      },
      filteredPragmadata() {
        return this.pragmadata.filter(item => item.game_name.toLowerCase().includes(this.queryPragma.toLowerCase()));
      },
      filteredPgsoftdata() {
        return this.pgsoftdata.filter(item => item.game_name.toLowerCase().includes(this.queryPgsoft.toLowerCase()));
      },
      filteredJokerData() {
        return this.jokerdata.filter(item => item.game_name.toLowerCase().includes(this.queryJoker.toLowerCase()));
      },
      filteredeMicroData() {
        return this.microdata.filter(item => item.game_name.toLowerCase().includes(this.queryMicro.toLowerCase()));
      },
      filteredHabaneroData() {
        return this.habanerodata.filter(item => item.game_name.toLowerCase().includes(this.queryHabanero.toLowerCase()));
      }
      
    },
  
  };
  </script>