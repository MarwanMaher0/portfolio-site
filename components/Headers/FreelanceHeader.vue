<template>
  <header id="Home" class="freelancre hero">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-4">
          <div class="img">
            <img src="/img/1711434167660.jpeg" alt="Marwan Maher" />
          </div>
        </div>
        <div class="col-lg-8">
          <div class="cont">
            <p class="hero-kicker">Egypt · Open to remote &amp; relocation (KSA/UAE)</p>
            <h1>Hi, I'm Marwan — Technical Project Manager &amp; Engineer.</h1>
            <p class="hero-sub">
              I run the IT portfolio of a Riyadh IP-services firm: five production systems, from an IP-management
              platform with 52 live services to a trademark-monitoring platform I took from vendor evaluation to in-house build.
              I still build — Django, Vue, PostgreSQL, LLM pipelines, Arabic/English RTL.
            </p>
            <div class="hero-cta">
              <a href="#Work" class="butn color radius" @click.prevent="scrollTo('Work')">View work</a>
              <a href="/Marwan_Maher_Technical_PM_AI.pdf" class="butn bord radius" download>Download CV</a>
            </div>
          </div>
        </div>
      </div>

      <div class="states">
        <ul class="flex">
          <li class="flex">
            <div class="numb valign"><h3>5</h3></div>
            <div class="text valign"><p>Production systems <br /> owned</p></div>
          </li>
          <li class="flex">
            <div class="numb valign"><h3>52</h3></div>
            <div class="text valign"><p>Live services <br /> (IPORA)</p></div>
          </li>
          <li class="flex">
            <div class="numb valign"><h3>40%</h3></div>
            <div class="text valign"><p>Manual regression cut <br /> (QA practice)</p></div>
          </li>
          <li class="mail-us">
            <a href="mailto:Marwanmaher635@gmail.com?subject=Hello%20from%20your%20portfolio">
              <div class="flex">
                <div class="text valign">
                  <div class="full-width">
                    <p>Get in touch</p>
                    <h6>Marwanmaher635@gmail.com</h6>
                  </div>
                </div>
                <div class="mail-icon">
                  <div class="icon-box">
                    <span class="icon color-font pe-7s-mail"></span>
                  </div>
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="line bottom left"></div>
  </header>
</template>

<script setup>
function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}
</script>

<style>
.freelancre.hero {
  min-height: 0;
  padding: 140px 0 80px;
}

.freelancre.hero .img {
  margin-bottom: 30px;
}

.freelancre.hero .hero-kicker {
  font-size: 13px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #666;
  margin-bottom: 18px;
}

.freelancre.hero .cont h1 {
  font-size: 40px;
  line-height: 1.25;
  font-weight: 600;
  margin-bottom: 22px;
}

.freelancre.hero .hero-sub {
  font-size: 17px;
  line-height: 1.75;
  color: #333;
  max-width: 680px;
  margin-bottom: 30px;
}

.freelancre.hero .hero-cta {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}

.freelancre.hero .hero-cta .butn {
  font-weight: 500;
  cursor: pointer;
}

.freelancre.hero .hero-cta .butn.color {
  color: #fff;
}

.freelancre.hero .hero-cta .butn.color:hover {
  color: #111;
  border-color: #111;
}

.freelancre.hero .states {
  position: relative;
  margin-top: 80px;
  padding-bottom: 0;
}

.freelancre.hero .states li {
  margin-right: 70px;
}

.freelancre.hero .states li:last-of-type {
  margin-right: 0;
}

.freelancre.hero .states li h3 {
  font-size: 46px;
}

@media screen and (max-width: 991px) {
  .freelancre.hero {
    padding-top: 120px;
  }

  .freelancre.hero .img {
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 40px;
  }

  .freelancre.hero .cont h1 {
    font-size: 30px;
  }

  .freelancre.hero .states {
    margin-top: 60px;
  }

  .freelancre.hero .states ul.flex {
    display: block;
  }

  .freelancre.hero .states ul.flex li {
    display: flex;
    margin-right: 0;
    margin-bottom: 30px;
  }

  .freelancre.hero .states ul.flex .mail-us {
    display: block;
    float: none;
    margin-bottom: 0;
  }

  .freelancre.hero .states .mail-us .text {
    text-align: left;
    padding-right: 20px;
  }
}

@media screen and (max-width: 480px) {
  .freelancre.hero .cont h1 {
    font-size: 26px;
  }

  .freelancre.hero .hero-sub {
    font-size: 15px;
  }

  .freelancre.hero .states li h3 {
    font-size: 36px;
  }

  .freelancre.hero .states .mail-us h6 {
    word-break: break-all;
  }
}
</style>
