<template>
  <section class="call-action section-padding bg-img" :style="{ backgroundImage: `url(/img/patrn.svg)` }">
    <div class="container">
      <div class="row">
        <div class="col-md-8 col-lg-9">
          <div class="content sm-mb30">
            <h6 class="wow words chars splitting" data-splitting>
              Purchase The Vie
            </h6>
            <h2 class="wow words chars splitting" data-splitting>
              and Make <br />
              <b class="back-color">Your Life Easier</b>.
            </h2>
          </div>
        </div>

        <div class="col-md-4 col-lg-3 valign">
          <NuxtLink to="#" class="butn bord curve wow fadeInUp" data-wow-delay=".5s">
            <span>Purchase Now</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>