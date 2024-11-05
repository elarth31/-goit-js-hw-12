import{a as w,i as n,S}from"./assets/vendor-D73Uttp0.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function o(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(e){if(e.ep)return;e.ep=!0;const s=o(e);fetch(e.href,s)}})();function h(t){return t.map(({webformatURL:r,largeImageURL:o,tags:a,likes:e,views:s,comments:l,downloads:L})=>`<li class="gallery-item">
          <a class="gallery-link" href="${o}">
            <img
              class="gallery-image"
              src="${r}"
              alt="${a}"
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
              <p class="amount">${s}</p>
            </div>
            <div class="block">
              <h2 class="title">Comments</h2>
              <p class="amount">${l}</p>
            </div>
            <div class="block">
              <h2 class="title">Downloads</h2>
              <p class="amount">${L}</p>
            </div>
          </div>
        </li>`).join("")}const H=15;async function g(t,r){const o="46767628-a1a0fbec2a5b02d371c47f484";try{const a=encodeURIComponent(t),e=await w.get("https://pixabay.com/api/",{params:{key:o,q:a,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:H}});if(e.data&&e.data.hits){const s=e.data.totalHits,l=e.data.hits.length;return{hits:e.data.hits,totalHits:s,currentHits:l}}else return console.error("No hits found."),{totalHits:0,hits:[],currentHits:0}}catch(a){return n.error({title:"Error",message:"Sorry! The site is currently unavailable. Please try later!"}),console.error("Error message:",a.message),{totalHits:0,hits:[],currentHits:0}}}function P(){document.addEventListener("DOMContentLoaded",function(){const t=document.querySelector(".up-btn");t&&(t.addEventListener("click",function(){window.scrollTo({top:0,behavior:"smooth"}),document.body.classList.add("scrolling")}),window.addEventListener("scroll",function(){window.scrollY>200?t.classList.add("show"):t.classList.remove("show"),document.body.classList.contains("scrolling")&&window.scrollY===0&&document.body.classList.remove("scrolling")}))})}const f=document.querySelector(".js-search"),p=document.querySelector(".gallery"),d=document.querySelector(".loader"),i=document.querySelector(".btn-load"),y=document.querySelector(".loader-more"),u=document.querySelector(".end-loader");let c=1;const b=15;let m="",v;d.style.display="none";y.style.display="none";i.style.display="none";u.style.display="none";f.addEventListener("submit",E);i.addEventListener("click",k);P();async function E(t){if(t.preventDefault(),c=1,p.innerHTML="",d.style.display="block",i.style.display="none",u.style.display="none",m=t.target.elements.search.value.trim(),!m){n.warning({title:"Caution",message:"Sorry, but you did not fill out the field!"}),d.style.display="none";return}try{const r=await g(m,c);if(d.style.display="none",!r||typeof r.totalHits>"u"||!r.hits){n.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"});return}const o=Math.ceil(r.totalHits/b);if(c>=o?(i.style.display="none",u.style.display="block"):i.style.display="block",r.hits.length===0){n.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"});return}p.insertAdjacentHTML("beforeend",h(r.hits)),n.success({title:"Wow",message:`We found ${r.totalHits} pictures!`}),v=new S(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250}).refresh(),f.reset()}catch(r){d.style.display="none",console.error(r),n.error({title:"Error",message:"An unexpected error occurred. Please try again."})}}async function k(){c+=1,y.style.display="block",i.style.display="none",u.style.display="none";try{const t=await g(m,c);if(y.style.display="none",!t||typeof t.totalHits>"u"||!t.hits){n.error({title:"Error",message:"Sorry, no more images to load."});return}p.insertAdjacentHTML("beforeend",h(t.hits));const r=Math.ceil(t.totalHits/b);c>=r?(n.info({title:"Caution",message:"You've reached the end of the collection."}),i.style.display="none",u.style.display="block"):i.style.display="block";const o=()=>document.querySelector(".gallery-item").getBoundingClientRect();window.scrollBy({top:o().height*2,left:0,behavior:"smooth"}),v.refresh()}catch(t){y.style.display="none",n.error({title:"Error",message:"An unexpected error occurred. Please try again."}),console.error("Error in onLoadMoreImages:",t)}}
//# sourceMappingURL=index.js.map
