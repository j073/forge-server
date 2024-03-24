<template>

    <section class="container mb-4" style="margin-top: -70px !important;">
      <div class="slot-sidebar">
        <ul class="slot-sidebar-nav">
            <li>
                <li
                @click="handleItemClick('Pragmatic Play')"
                :class="{
                  active: activeItem === 'Pragmatic Play',
                  btnprovider: activeItem === 'Pragmatic Play',
                }"
                >
                  <NuxtImg style="width: auto; height: 50px" src="https://it-cgg.b-cdn.net/rtp/rajazeus/provider/PP.webp" alt="RTP LIVE PRAGMATIC"/>
                  <p class="long">PRAGMATIC PLAY</p>
                  <p class="short">PP</p>
                </li>
            </li>
            <li>
                <li
                @click="handleItemClick('CQ 9')"
                :class="{
                  active: activeItem === 'CQ 9',
                  btnprovider: activeItem === 'CQ 9',
                }"
                >
                  <NuxtImg style="width: auto; height: 50px" src="https://it-cgg.b-cdn.net/rtp/rajazeus/provider/SBOCQ9.webp" alt="RTP LIVE CQ9"/>
                  <p class="long">CQ9</p>
                  <p class="short">CQ9</p>
                </li>
            </li>
        </ul>
        </div>

        <div class="slot-sidebar">
        <ul class="slot-sidebar-nav">
            <li>
                <li
                @click="handleItemClick('PG SLOTS')"
                :class="{
                  active: activeItem === 'PG SLOTS',
                  btnprovider: activeItem === 'PG SLOTS',
                }"
                >
                  <NuxtImg style="width: auto; height: 50px" src="https://it-cgg.b-cdn.net/rtp/rajazeus/provider/PGSOFT.webp" alt="RTP LIVE PG SLOTS"/>
                  <p class="long">PG SLOTS</p>
                  <p class="short">PG SLOTS</p>
                </li>
            </li>
            <li>
                <li
                @click="handleItemClick('Joker')"
                :class="{
                  active: activeItem === 'Joker',
                  btnprovider: activeItem === 'Joker',
                }"
                >
                  <NuxtImg style="width: auto; height: 50px" src="https://it-cgg.b-cdn.net/rtp/rajazeus/provider/JOKER.webp" alt="RTP LIVE JOKER"/>
                  <p class="long">JOKER</p>
                  <p class="short">JOKER</p>
                </li>
            </li>
        </ul>
        </div>

        <div class="slot-sidebar">
        <ul class="slot-sidebar-nav">
            <li>
                <li
                @click="handleItemClick('SPADEGAMING')"
                :class="{
                  active: activeItem === 'SPADEGAMING',
                  btnprovider: activeItem === 'SPADEGAMING',
                }"
                >
                  <NuxtImg style="width: auto; height: 50px" src="https://it-cgg.b-cdn.net/rtp/rajazeus/provider/SPADEGAMING.webp" alt="RTP LIVE SPADEGAMING"/>
                  <p class="long">SPADEGAMING</p>
                  <p class="short">SPADEGAMING</p>
                </li>
            </li>
            <li>
                <li
                @click="handleItemClick('Habanero')"
                :class="{
                  active: activeItem === 'Habanero',
                  btnprovider: activeItem === 'Habanero',
                }"
                >
                  <NuxtImg style="width: auto; height: 50px" src="https://it-cgg.b-cdn.net/rtp/rajazeus/provider/HABANERO.webp" alt="RTP LIVE HABANERO"/>
                  <p class="long">HABANERO</p>
                  <p class="short">HABANERO</p>
                </li>
            </li>
            <li>
                <li
                @click="handleItemClick('MicroGaming')"
                :class="{
                  active: activeItem === 'MicroGaming',
                  btnprovider: activeItem === 'MicroGaming',
                }"
                id="mobslot1"
                >
                  <NuxtImg style="width: auto; height: 50px" src="https://it-cgg.b-cdn.net/rtp/rajazeus/provider/MICROGAMING.webp" alt="RTP LIVE MICROGAMING"/>
                  <p class="long">MICROGAMING</p>
                  <p class="short">MICRAGAMING</p>
                </li>
            </li>
        </ul>
        </div>
        
    </section>
    
    <div class="container">
      <div v-if="activeItem === 'Pragmatic Play'">
  
        <div v-if="filteredPragmadata.length > 0" class="row">
              <div style="margin-bottom: 20px;">
                <input type="text" v-model="queryPragma" placeholder="Cari games..." style="color: white !important"/>
              </div>
              <div v-for="itemPragma in filteredPragmadata" :key="itemPragma.id" class="fugu-grid-item fugu-grid-item-w2 col-4 col-md-4 col-lg-2 wow fadeInUpX pgsoft">
              <div class="portfolio-item">
                <a href="https://shortener.run/daftar-rz/?ref=mainbrsm" rel="noopener noreferrer nofollow" target="_blank">
                  <div class="thumb img-fluid">
                    <NuxtImg loading="lazy" effect="blur" :alt="itemPragma.game_name" :src="itemPragma.img_src" style="width: 100%; height: auto" />
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
                <a href="https://shortener.run/daftar-rz/?ref=mainbrsm" rel="noopener noreferrer nofollow" target="_blank">
                  <div class="thumb img-fluid">
                    <NuxtImg loading="lazy" effect="blur" :alt="itemPragma.game_name" :src="itemPragma.img_src" style="width: 100%; height: auto" />
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
  
      <div v-if="activeItem === 'PG SLOTS'">
  
        <div v-if="filteredPgsoftdata.length > 0" class="row">
          <div style="margin-bottom: 20px;">
              <input type="text" v-model="queryPgsoft" placeholder="Cari games..." style="color: white !important"/>
          </div>
          <div v-for="itemPG in filteredPgsoftdata" :key="itemPG.id" class="fugu-grid-item fugu-grid-item-w2 col-4 col-md-4 col-lg-2 wow fadeInUpX pgsoft">
              <div class="portfolio-item">
                  <a href="https://shortener.run/daftar-rz/?ref=mainbrsm" rel="noopener noreferrer nofollow" target="_blank">
                      <div class="thumb img-fluid">
                          <NuxtImg loading="lazy" effect="blur" :alt="itemPG.game_name" :src="itemPG.img_src" style="width: 100%; height: auto" />
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
                    <a href="https://shortener.run/daftar-rz/?ref=mainbrsm" rel="noopener noreferrer nofollow" target="_blank">
                        <div class="thumb img-fluid">
                            <NuxtImg loading="lazy" effect="blur" :alt="itemPG.game_name" :src="itemPG.img_src" style="width: 100%; height: auto" />
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
                  <a href="https://shortener.run/daftar-rz/?ref=mainbrsm" rel="noopener noreferrer nofollow" target="_blank">
                      <div class="thumb img-fluid">
                          <NuxtImg loading="lazy" effect="blur" :alt="itemJoker.game_name" :src="itemJoker.img_src" style="width: 100%; height: auto" />
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
            <div style="margin-bottom: 20px;">
                <input type="text" v-model="queryJoker" placeholder="Cari games..." style="color: white !important"/>
            </div>
            <div v-if="filteredJokerData.length > 0" class="row">
            <div v-for="itemJoker in filteredJokerData" :key="itemJoker.id" class="fugu-grid-item fugu-grid-item-w2 col-4 col-md-4 col-lg-2 wow fadeInUpX pgsoft">
                <div class="portfolio-item">
                    <a href="https://shortener.run/daftar-rz/?ref=mainbrsm" rel="noopener noreferrer nofollow" target="_blank">
                        <div class="thumb img-fluid">
                            <NuxtImg loading="lazy" effect="blur" :alt="itemJoker.game_name" :src="itemJoker.img_src" style="width: 100%; height: auto" />
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
                  <a href="https://shortener.run/daftar-rz/?ref=mainbrsm" rel="noopener noreferrer nofollow" target="_blank">
                    <div class="thumb img-fluid">
                      <NuxtImg loading="lazy" effect="blur" :alt="microItem.game_name" :src="microItem.img_src" style="width: 100%; height: auto" />
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
                  <a href="https://shortener.run/daftar-rz/?ref=mainbrsm" rel="noopener noreferrer nofollow" target="_blank">
                    <div class="thumb img-fluid">
                      <NuxtImg loading="lazy" effect="blur" :alt="microItem.game_name" :src="microItem.img_src" style="width: 100%; height: auto" />
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
                  <a href="https://shortener.run/daftar-rz/?ref=mainbrsm" rel="noopener noreferrer nofollow" target="_blank">
                    <div class="thumb img-fluid">
                      <NuxtImg loading="lazy" effect="blur" :alt="itemHabanero.game_name" :src="itemHabanero.img_src" style="width: 100%; height: auto" />
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
                  <a href="https://shortener.run/daftar-rz/?ref=mainbrsm" rel="noopener noreferrer nofollow" target="_blank">
                    <div class="thumb img-fluid">
                      <NuxtImg loading="lazy" effect="blur" :alt="itemHabanero.game_name" :src="itemHabanero.img_src" style="width: 100%; height: auto" />
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

        <div v-if="activeItem === 'CQ 9'">
  
            <div v-if="filteredCQ9Data.length > 0" class="row">
                  <div style="margin-bottom: 20px;">
                    <input type="text" v-model="queryCQ9" placeholder="Cari games..." style="color: white !important"/>
                  </div>
                  <div v-for="itemCQ9 in filteredCQ9Data" :key="itemCQ9.id" class="fugu-grid-item fugu-grid-item-w2 col-4 col-md-4 col-lg-2 wow fadeInUpX pgsoft">
                  <div class="portfolio-item">
                    <a href="https://shortener.run/daftar-rz/?ref=mainbrsm" rel="noopener noreferrer nofollow" target="_blank">
                      <div class="thumb img-fluid">
                        <NuxtImg loading="lazy" effect="blur" :alt="itemCQ9.game_name" :src="itemCQ9.img_src" style="width: 100%; height: auto" />
                      </div>
                    </a>
                    <div class="progress-rtp">
                      <p class="rtp-style">RTP: {{ itemCQ9.number }} %</p>
                      <div :class="['bg-progress-rtp', (itemCQ9.number < 55 && 'red') || (itemCQ9.number >= 55 && itemCQ9.number <= 75 && 'yellow') || (itemCQ9.number > 75 && 'green')]" :style="{ width: `${itemCQ9.number}%` }"></div>
                    </div>
                    <div class="down-content"><span>{{ itemCQ9.game_name }}</span></div>
                  </div>
                </div>
            </div>
            <div v-else>
              <div class="row">
                  <div style="margin-bottom: 20px;">
                    <input type="text" v-model="queryCQ9" placeholder="Cari games..." style="color: white !important"/>
                  </div>
                  <div v-for="itemCQ9 in filteredCQ9Data" :key="itemCQ9.id" class="fugu-grid-item fugu-grid-item-w2 col-4 col-md-4 col-lg-2 wow fadeInUpX pgsoft">
                  <div class="portfolio-item">
                    <a href="https://shortener.run/daftar-rz/?ref=mainbrsm" rel="noopener noreferrer nofollow" target="_blank">
                      <div class="thumb img-fluid">
                        <NuxtImg loading="lazy" effect="blur" :alt="itemCQ9.game_name" :src="itemCQ9.img_src" style="width: 100%; height: auto" />
                      </div>
                    </a>
                    <div class="progress-rtp">
                      <p class="rtp-style">RTP: {{ itemCQ9.number }} %</p>
                      <div :class="['bg-progress-rtp', (itemCQ9.number < 55 && 'red') || (itemCQ9.number >= 55 && itemCQ9.number <= 75 && 'yellow') || (itemCQ9.number > 75 && 'green')]" :style="{ width: `${itemCQ9.number}%` }"></div>
                    </div>
                    <div class="down-content"><span>{{ itemCQ9.game_name }}</span></div>
                  </div>
                </div>
              </div>
              <div class="text-center" style="color: white; animation: fadeIn 2s; width: 100%;">Data Game tidak ditemukan...</div>
            </div>

          </div>    

          <div v-if="activeItem === 'SPADEGAMING'">
  
              <div v-if="filteredSpadeData.length > 0" class="row">
                    <div style="margin-bottom: 20px;">
                      <input type="text" v-model="querySpade" placeholder="Cari games..." style="color: white !important"/>
                    </div>
                    <div v-for="itemSpade in filteredSpadeData" :key="itemSpade.id" class="fugu-grid-item fugu-grid-item-w2 col-4 col-md-4 col-lg-2 wow fadeInUpX pgsoft">
                    <div class="portfolio-item">
                      <a href="https://shortener.run/daftar-rz/?ref=mainbrsm" rel="noopener noreferrer nofollow" target="_blank">
                        <div class="thumb img-fluid">
                          <NuxtImg loading="lazy" effect="blur" :alt="itemSpade.game_name" :src="itemSpade.img_src" style="width: 100%; height: auto" />
                        </div>
                      </a>
                      <div class="progress-rtp">
                        <p class="rtp-style">RTP: {{ itemSpade.number }} %</p>
                        <div :class="['bg-progress-rtp', (itemSpade.number < 55 && 'red') || (itemSpade.number >= 55 && itemSpade.number <= 75 && 'yellow') || (itemSpade.number > 75 && 'green')]" :style="{ width: `${itemSpade.number}%` }"></div>
                      </div>
                      <div class="down-content"><span>{{ itemSpade.game_name }}</span></div>
                    </div>
                  </div>
              </div>
              <div v-else>
                <div class="row">
                    <div style="margin-bottom: 20px;">
                      <input type="text" v-model="querySpade" placeholder="Cari games..." style="color: white !important"/>
                    </div>
                    <div v-for="itemSpade in filteredSpadeData" :key="itemSpade.id" class="fugu-grid-item fugu-grid-item-w2 col-4 col-md-4 col-lg-2 wow fadeInUpX pgsoft">
                    <div class="portfolio-item">
                      <a href="https://shortener.run/daftar-rz/?ref=mainbrsm" rel="noopener noreferrer nofollow" target="_blank">
                        <div class="thumb img-fluid">
                          <NuxtImg loading="lazy" effect="blur" :alt="itemSpade.game_name" :src="itemSpade.img_src" style="width: 100%; height: auto" />
                        </div>
                      </a>
                      <div class="progress-rtp">
                        <p class="rtp-style">RTP: {{ itemSpade.number }} %</p>
                        <div :class="['bg-progress-rtp', (itemSpade.number < 55 && 'red') || (itemSpade.number >= 55 && itemSpade.number <= 75 && 'yellow') || (itemSpade.number > 75 && 'green')]" :style="{ width: `${itemSpade.number}%` }"></div>
                      </div>
                      <div class="down-content"><span>{{ itemSpade.game_name }}</span></div>
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
        querySpade: '',
        queryCQ9: '',
        pragmadata: [],
        pgsoftdata: [],
        jokerdata: [],
        microdata: [],
        habanerodata: [],
        spadedata: [],
        cq9data: [],
      };
    },
    mounted() {
      this.fetchPragmaData();
      this.fetchPgData();
      this.fetchJoker();
      this.fetchMicro();
      this.fetchHabanero();
      this.fetchSpade();
      this.fetchCQ9();
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
              'Cache-Control': "no-store"
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
              'Cache-Control': "no-store"
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
              'Cache-Control': "no-store"
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
              'Cache-Control': "no-store"
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
              'Cache-Control': "no-store"
            }
          });
          const jsonHabanero = responseHabanero.data;
          this.habanerodata = jsonHabanero; 
        } catch (error) {
          console.log("Error fetching", error);
        }
      },
      async fetchSpade() {
      try {
          const responseSpade = await $fetch('https://152.42.160.119/data/nuxt/spadegaming', {
            method: 'GET',
            headers: {
              'Cache-Control': "no-store"
            }
          });
          const jsonSpade = responseSpade.data;
          this.spadedata = jsonSpade; 
        } catch (error) {
          console.log("Error fetching", error);
        }
    },
    async fetchCQ9() {
      try {
          const responseCQ9 = await $fetch('https://152.42.160.119/data/nuxt/cq9', {
            method: 'GET',
            headers: {
              'Cache-Control': "no-store"
            }
          });
          const jsonCQ9 = responseCQ9.data;
          this.cq9data = jsonCQ9; 
        } catch (error) {
          console.log("Error fetching", error);
        }
    },
      switchImage() {
        this.currentIndex = (this.currentIndex + 1) % this.hotimages.length;
        this.$forceUpdate(); 
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
      },
      filteredSpadeData() {
        return this.spadedata.filter(item => item.game_name.toLowerCase().includes(this.querySpade.toLowerCase()));
      },
      filteredCQ9Data() {
        return this.cq9data.filter(item => item.game_name.toLowerCase().includes(this.queryCQ9.toLowerCase()));
      }
      
    },
  
  };
  </script>