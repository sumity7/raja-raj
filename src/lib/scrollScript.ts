/**
 * Runs before first paint. On a reload the browser would put the visitor back
 * where they were; we want the top instead. Chrome decides to restore before
 * page scripts can switch restoration off, and it keeps re-applying the old
 * position while the page settles. So for a reload only, the page is held at
 * the top frame-by-frame until the visitor scrolls or touches the page (or two
 * and a half seconds pass). Normal navigation and back/forward are untouched.
 */
export const reloadToTopScript = `(function(){try{var n=performance.getEntriesByType("navigation")[0];if(!n||n.type!=="reload"||location.hash)return;var h=history,ev=["wheel","touchstart","keydown","pointerdown"],stop=false,t0=Date.now();h.scrollRestoration="manual";var end=function(){stop=true;h.scrollRestoration="auto";ev.forEach(function(e){removeEventListener(e,end)})};ev.forEach(function(e){addEventListener(e,end,{passive:true})});var tick=function(){if(stop)return;if(window.scrollY!==0)scrollTo(0,0);if(Date.now()-t0>2500)end();else requestAnimationFrame(tick)};scrollTo(0,0);requestAnimationFrame(tick)}catch(e){}})();`;
