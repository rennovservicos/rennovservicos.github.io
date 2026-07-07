/* ─── Mobile Drawer ─── */
(function () {
  var overlay = document.getElementById('mobile-overlay');
  var toggle  = document.getElementById('nav-toggle');
  var close   = document.getElementById('drawer-close');
  if (!overlay || !toggle) return;

  function open()  { overlay.classList.add('is-open');  toggle.setAttribute('aria-expanded','true');  document.body.style.overflow='hidden'; }
  function shut()  { overlay.classList.remove('is-open'); toggle.setAttribute('aria-expanded','false'); document.body.style.overflow=''; }

  toggle.addEventListener('click', open);
  if (close) close.addEventListener('click', shut);
  overlay.addEventListener('click', function(e){ if(e.target===overlay) shut(); });
  document.addEventListener('keydown', function(e){ if(e.key==='Escape') shut(); });

  /* Close drawer + smooth-scroll for anchor links inside drawer */
  document.querySelectorAll('.drawer-anchor').forEach(function(a){
    a.addEventListener('click', function(e){
      var href = a.getAttribute('href') || '';
      var hash = href.indexOf('#') !== -1 ? href.split('#')[1] : null;
      if (!hash) return;
      var target = document.getElementById(hash);
      if (target) {
        e.preventDefault();
        shut();
        setTimeout(function(){ target.scrollIntoView({ behavior:'smooth', block:'start' }); }, 250);
      } else {
        shut();
      }
    });
  });

  /* Close drawer on any non-anchor drawer-link click */
  document.querySelectorAll('.drawer-link:not(.drawer-anchor), .drawer-portal-btn').forEach(function(a){
    a.addEventListener('click', function(){ shut(); });
  });
})();

/* ─── Smooth scroll for desktop nav anchor links (homepage only) ─── */
document.querySelectorAll('.smooth-anchor').forEach(function(a){
  a.addEventListener('click', function(e){
    var href = a.getAttribute('href') || '';
    var hash = href.indexOf('#') !== -1 ? href.split('#')[1] : null;
    if (!hash) return;
    var target = document.getElementById(hash);
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior:'smooth', block:'start' }); }
  });
});

/* ─── FAQ Accordion ─── */
document.querySelectorAll('.faq-question').forEach(function(btn){
  btn.addEventListener('click', function(){
    var expanded = btn.getAttribute('aria-expanded') === 'true';
    document.querySelectorAll('.faq-question').forEach(function(b){
      b.setAttribute('aria-expanded','false');
      var a = document.getElementById(b.getAttribute('aria-controls'));
      if(a) a.style.display='none';
    });
    if(!expanded){
      btn.setAttribute('aria-expanded','true');
      var ans = document.getElementById(btn.getAttribute('aria-controls'));
      if(ans) ans.style.display='block';
    }
  });
});
