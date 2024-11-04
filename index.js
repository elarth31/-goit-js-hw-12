import{a as w,i as a,S}from"./assets/vendor-D73Uttp0.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();function g(t){return t.map(({webformatURL:r,largeImageURL:s,tags:n,likes:e,views:o,comments:c,downloads:L})=>`<li class="gallery-item">
          <a class="gallery-link" href="${s}">
            <img
              class="gallery-image"
              src="${r}"
              alt="${n}"
              width="360"
            />
          </a>
          <div class="thumb-block">
            <div class="block">
              <h2 class="title">Likes</h2>
              <p class="amount">${e}</p>
            </div>
            <div class="block">
              <h2 class="title">Views</h2>
              <p class="amount">${o}</p>
            </div>
            <div class="block">
              <h2 class="title">Comments</h2>
              <p class="amount">${c}</p>
            </div>
            <div class="block">
              <h2 class="title">Downloads</h2>
              <p class="amount">${L}</p>
            </div>
          </div>
        </li>`).join("")}const P=15;async function f(t,r){const s="46767628-a1a0fbec2a5b02d371c47f484";try{const n=encodeURIComponent(t),e=await w.get("https://pixabay.com/api/",{params:{key:s,q:n,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:P}});return e.data&&e.data.hits?e.data:(console.error("No hits found."),{totalHits:0,hits:[]})}catch(n){return a.error({title:"Error",message:"Sorry! The site is currently unavailable. Please try later!"}),console.error("Error message:",n.message),{totalHits:0,hits:[]}}}function E(){document.addEventListener("DOMContentLoaded",function(){const t=document.querySelector(".up-btn");t&&(t.addEventListener("click",function(){window.scrollTo({top:0,behavior:"smooth"}),document.body.classList.add("scrolling")}),window.addEventListener("scroll",function(){window.scrollY>200?t.classList.add("show"):t.classList.remove("show"),document.body.classList.contains("scrolling")&&window.scrollY===0&&document.body.classList.remove("scrolling")}))})}const h=document.querySelector(".js-search"),p=document.querySelector(".gallery"),d=document.querySelector(".loader"),l=document.querySelector(".btn-load"),y=document.querySelector(".loader-more"),u=document.querySelector(".end-loader");let i=1;const b=40;let m="",v;d.style.display="none";y.style.display="none";l.style.display="none";u.style.display="none";h.addEventListener("submit",k);l.addEventListener("click",q);E();async function k(t){if(t.preventDefault(),i=1,p.innerHTML="",d.style.display="block",l.style.display="none",u.style.display="none",m=t.target.elements.search.value.trim(),!m){a.warning({title:"Caution",message:"Sorry, but you did not fill out the field!"}),d.style.display="none";return}try{const r=await f(m,i);if(d.style.display="none",!r||typeof r.totalHits>"u"||!r.hits){a.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"});return}const s=Math.ceil(r.totalHits/b);if(i>=s?(l.style.display="none",u.style.display="block"):l.style.display="block",r.hits.length===0){a.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"});return}p.insertAdjacentHTML("beforeend",g(r.hits)),a.success({title:"Wow",message:`We found ${r.totalHits} pictures!`}),v=new S(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250}).refresh(),h.reset()}catch(r){d.style.display="none",console.error(r),a.error({title:"Error",message:"An unexpected error occurred. Please try again."})}}async function q(){i+=1,y.style.display="block",l.style.display="none",u.style.display="none";try{const t=await f(m,i);if(y.style.display="none",!t||typeof t.totalHits>"u"||!t.hits){a.error({title:"Error",message:"Sorry, no more images to load."});return}p.insertAdjacentHTML("beforeend",g(t.hits));const r=Math.ceil(t.totalHits/b);i>=r?(a.info({title:"Caution",message:"We're sorry, but you've reached the end of search results."}),l.style.display="none",u.style.display="block"):l.style.display="block";const s=()=>document.querySelector(".gallery-item").getBoundingClientRect();window.scrollBy({top:s().height*2,left:0,behavior:"smooth"}),v.refresh()}catch(t){y.style.display="none",a.error({title:"Error",message:"An unexpected error occurred. Please try again."}),console.error("Error in onLoadMoreImages:",t)}}
//# sourceMappingURL=index.js.map
