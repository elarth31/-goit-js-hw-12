import{a as w,i as d,S}from"./assets/vendor-D73Uttp0.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function r(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(t){if(t.ep)return;t.ep=!0;const s=r(t);fetch(t.href,s)}})();function f(o){return o.map(({webformatURL:e,largeImageURL:r,tags:n,likes:t,views:s,comments:i,downloads:v})=>`<li class="gallery-item">
          <a class="gallery-link" href="${r}">
            <img
              class="gallery-image"
              src="${e}"
              alt="${n}"
              width="360"
            />
          </a>
          <div class="thumb-block">
            <div class="block">
              <h2 class="title">Likes</h2>
              <p class="amount">${t}</p>
            </div>
            <div class="block">
              <h2 class="title">Views</h2>
              <p class="amount">${s}</p>
            </div>
            <div class="block">
              <h2 class="title">Comments</h2>
              <p class="amount">${i}</p>
            </div>
            <div class="block">
              <h2 class="title">Downloads</h2>
              <p class="amount">${v}</p>
            </div>
          </div>
        </li>`).join("")}const P=15;async function h(o,e){const r="46767628-a1a0fbec2a5b02d371c47f484";try{const n=encodeURIComponent(o);console.log("Searching for:",n),console.log("Page:",e);const t=await w.get("https://pixabay.com/api/",{params:{key:r,q:n,image_type:"photo",orientation:"horizontal",safesearch:!0,page:e,per_page:P}});return t.data.hits?(console.log("Received data:",t.data.hits),t.data):(console.error("No hits found."),null)}catch(n){d.error({title:"Error",message:"Sorry! The site is currently unavailable. Please try later!"}),console.error("Error message:",n.message)}}function E(){document.addEventListener("DOMContentLoaded",function(){const o=document.querySelector(".up-btn");o&&(o.addEventListener("click",function(){window.scrollTo({top:0,behavior:"smooth"}),document.body.classList.add("scrolling")}),window.addEventListener("scroll",function(){window.scrollY>200?o.classList.add("show"):o.classList.remove("show"),document.body.classList.contains("scrolling")&&window.scrollY===0&&document.body.classList.remove("scrolling")}))})}const g=document.querySelector(".js-search"),m=document.querySelector(".gallery"),c=document.querySelector(".loader"),l=document.querySelector(".btn-load"),y=document.querySelector(".loader-more"),u=document.querySelector(".end-loader");let a=1;const b=15;let p="",L;c.style.display="none";y.style.display="none";l.style.display="none";u.style.display="none";g.addEventListener("submit",k);l.addEventListener("click",q);E();async function k(o){if(o.preventDefault(),a=1,m.innerHTML="",c.style.display="block",l.style.display="none",u.style.display="none",p=o.target.elements.search.value.trim(),!p){d.warning({title:"Caution",message:"Sorry, but you did not fill out the field!"}),c.style.display="none";return}try{const e=await h(p,a);if(c.style.display="none",!e||!e.hits||!e.totalHits){d.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"});return}m.insertAdjacentHTML("beforeend",f(e.hits));const r=Math.ceil(e.totalHits/b);a<r?l.style.display="block":(l.style.display="none",u.style.display="block"),d.success({title:"Wow",message:`We found ${e.totalHits} pictures!`}),L=new S(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250}).refresh(),g.reset()}catch(e){c.style.display="none",console.error("Error in onSearch:",e)}}async function q(){a+=1,y.style.display="block",l.style.display="none",u.style.display="none";const o=()=>document.querySelector(".gallery-item").getBoundingClientRect();try{const e=await h(p,a);m.insertAdjacentHTML("beforeend",f(e.hits)),window.scrollBy({top:o().height*2,left:0,behavior:"smooth"}),L.refresh();const r=Math.ceil(e.totalHits/b);if(a>=r){d.info({title:"Caution",message:"We're sorry, but you've reached the end of search results."}),l.style.display="none",y.style.display="none",u.style.display="block";return}y.style.display="none",l.style.display="block"}catch(e){console.error("Error in onLoadMore:",e)}}
//# sourceMappingURL=index.js.map
