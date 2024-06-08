<template>
  <div id="navi" :class="`topnav ${theme ? (theme === 'light' ? 'light' : '') : ''}`">
    <div class="container-fluid">
      <div class="logo">
        <a href="#0">
          <img v-if="theme === 'light'" src="/img/logo-dark.png" alt="logo" />
          <img v-else src="/img/logo-light.png" alt="logo" />
        </a>
      </div>
      <div class="menu-icon">
        <span class="icon">
          <i></i>
          <i></i>
        </span>
        <span class="text" data-splitting>
          <span class="menu-text">Menu</span>
        </span>
      </div>
    </div>
  </div>

  <div class="hamenu">
    <div class="container">
      <div class="row">
        <div class="col-lg-9 col-md-8">
          <div class="menu-links">
            <ul class="main-menu">
              <li>
                <div class="o-hidden">
                  <span class="link dmenu">
                    <span class="nm">01.</span>Home
                    <i class="fas fa-angle-right"></i>
                  </span>
                </div>
                <div class="sub-menu">
                  <ul>
                    <li>
                      <div class="o-hidden">
                        <span class="sub-link back">
                          <i class="pe-7s-angle-left"></i> Go Back
                        </span>
                      </div>
                    </li>
                    <li>
                      <div class="o-hidden">
                        <a class="sub-link" href="/homepage/home1-dark">
                          <span class="nm">01.</span>Main Home
                        </a>
                      </div>
                    </li>
                    <li>
                      <div class="o-hidden">
                        <a class="sub-link" href="/homepage/home2-dark">
                          <span class="nm">02.</span>Creative Agency
                        </a>
                      </div>
                    </li>
                    <li>
                      <div class="o-hidden">
                        <a class="sub-link" href="/homepage/home5-dark">
                          <span class="nm">03.</span>Digital Agency
                        </a>
                      </div>
                    </li>
                    <li>
                      <div class="o-hidden">
                        <a class="sub-link" href="/homepage/home4-dark">
                          <span class="nm">04.</span>Business One Page
                        </a>
                      </div>
                    </li>
                    <li>
                      <div class="o-hidden">
                        <a class="sub-link" href="/homepage/home3-dark">
                          <span class="nm">05.</span>Corporate
                        </a>
                      </div>
                    </li>

                    <li>
                      <div class="o-hidden">
                        <a class="sub-link" href="/homepage/home6-dark">
                          <span class="nm">06.</span>Modern Agency
                        </a>
                      </div>
                    </li>
                    <li>
                      <div class="o-hidden">
                        <a class="sub-link" href="/homepage/home7-dark">
                          <span class="nm">07.</span>Freelancer
                        </a>
                      </div>
                    </li>
                    <li>
                      <div class="o-hidden">
                        <a class="sub-link" href="/homepage/home8-dark">
                          <span class="nm">08.</span>Architecture
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <div class="o-hidden">
                  <a class="link" href="/about/about-dark">
                    <span class="nm">02.</span>About Us
                  </a>
                </div>
              </li>
              <li>
                <div class="o-hidden">
                  <span class="link dmenu">
                    <span class="nm">03.</span>Works
                    <i class="fas fa-angle-right"></i>
                  </span>
                </div>
                <div class="sub-menu">
                  <ul>
                    <li>
                      <div class="o-hidden">
                        <span class="sub-link back">
                          <i class="pe-7s-angle-left"></i> Go Back
                        </span>
                      </div>
                    </li>
                    <li>
                      <div class="o-hidden">
                        <a class="sub-link" href="/showcase/showcase-dark">
                          <span class="nm">01.</span>ShowCase Parallax
                        </a>
                      </div>
                    </li>
                    <li>
                      <div class="o-hidden">
                        <a class="sub-link" href="/showcase3/showcase3-dark">
                          <span class="nm">02.</span>ShowCase Carousel
                        </a>
                      </div>
                    </li>
                    <li>
                      <div class="o-hidden">
                        <a class="sub-link" href="/showcase2/showcase2-dark">
                          <span class="nm">03.</span>ShowCase Circle
                        </a>
                      </div>
                    </li>
                    <li>
                      <div class="o-hidden">
                        <a class="sub-link" href="/works/works-dark">
                          <span class="nm">04.</span>Portfolio Masonry
                        </a>
                      </div>
                    </li>
                    <li>
                      <div class="o-hidden">
                        <a class="sub-link" href="/works2/works2-dark">
                          <span class="nm">05.</span>Portfolio Filtering
                        </a>
                      </div>
                    </li>
                    <li>
                      <div class="o-hidden">
                        <a class="sub-link" href="/works3/works3-dark">
                          <span class="nm">06.</span>Portfolio Gallery
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <div class="o-hidden">
                  <span class="link dmenu">
                    <span class="nm">04.</span>Blogs
                    <i class="fas fa-angle-right"></i>
                  </span>
                </div>
                <div class="sub-menu">
                  <ul>
                    <li>
                      <div class="o-hidden">
                        <span class="sub-link back">
                          <i class="pe-7s-angle-left"></i> Go Back
                        </span>
                      </div>
                    </li>
                    <li>
                      <div class="o-hidden">
                        <a class="sub-link" href="/blog/blog-dark">
                          <span class="nm">01.</span>Blog Standerd
                        </a>
                      </div>
                    </li>
                    <li>
                      <div class="o-hidden">
                        <a class="sub-link" href="/blog-list/blog-list-dark">
                          <span class="nm">02.</span>Blog List
                        </a>
                      </div>
                    </li>
                    <li>
                      <div class="o-hidden">
                        <a class="sub-link" href="/blog-grid/blog-grid-dark">
                          <span class="nm">03.</span>Blog Grid
                        </a>
                      </div>
                    </li>
                    <li>
                      <div class="o-hidden">
                        <a class="sub-link" href="/blog-details/blog-details-dark">
                          <span class="nm">04.</span>Blog Details
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <div class="o-hidden">
                  <a class="link" href="/contact/contact-dark">
                    <span class="nm">05.</span>Contact
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-lg-3 col-md-4">
          <div class="cont-info">
            <div class="item">
              <h6>Phone :</h6>
              <p>+03 762-2367-723</p>
            </div>
            <div class="item">
              <h6>Address :</h6>
              <p>541 Melville Ave, Palo Alto, CA 94301, ask@ohio.colabr.io</p>
            </div>
            <div class="item">
              <h6>Email :</h6>
              <p>
                <a href="#0">Vie_website@gmail.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import initFullNavbarMenu from "@/common/initFullNavbarMenu";

const { theme } = defineProps(['theme']);

onMounted(() => {
  initFullNavbarMenu();
});
</script>