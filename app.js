// GSAP giriş animasyonları (1.png kapağı)
(function initHeroAnimations(){
	const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (prefersReduced) return;

	const tl = gsap.timeline({ defaults:{ ease:'power3.out' } });

	tl.from('.hero__kicker', { y:20, opacity:0, duration:0.6 })
	  .from(['.t-porto', '.t-folyo'], {
			yPercent: 110,
			opacity: 0,
			stagger: 0.08,
			duration: 0.9
	  }, '-=0.2')
	  .from('.hero__underline', { scaleX:0, transformOrigin:'left center', duration:0.7 }, '-=0.2')
	  .from('.t-year', { y:20, opacity:0, duration:0.5 }, '-=0.2')
	  .from('.hero__name', { opacity:0, duration:0.8 }, '-=0.3');
})();

// 2.png - MERHABA bölümü için ScrollTrigger animasyonları
(function initHelloAnimations(){
	if (!gsap || !window.ScrollTrigger) return;
	gsap.registerPlugin(ScrollTrigger);

	const base = { ease:'power3.out', duration:0.8 };

	gsap.from('.hello__title', {
		yPercent: 30,
		opacity: 0,
		duration: 0.9,
		scrollTrigger: {
			trigger: '.hello',
			start: 'top 70%'
		}
	});

	gsap.from('.hello__desc', {
		y: 20,
		opacity: 0,
		...base,
		scrollTrigger: { trigger: '.hello__desc', start: 'top 80%' }
	});

	gsap.from('.chip', {
		y: 14,
		opacity: 0,
		stagger: 0.07,
		...base,
		scrollTrigger: { trigger: '.hello__actions', start: 'top 85%' }
	});

	gsap.from(['.profile-card', '.xp-card'], {
		y: 24,
		opacity: 0,
		stagger: 0.15,
		...base,
		scrollTrigger: { trigger: '.hello__grid', start: 'top 75%' }
	});

	gsap.from('.info-card', {
		y: 20,
		opacity: 0,
		stagger: 0.1,
		...base,
		scrollTrigger: { trigger: '.info-cards', start: 'top 80%' }
	});
})();

// 3.png - İÇERİK bölümü animasyonları
(function initContentsAnimations(){
	if (!gsap || !ScrollTrigger) return;

	gsap.from('.contents__title', {
		yPercent: 20,
		opacity: 0,
		duration: 0.9,
		ease: 'power3.out',
		scrollTrigger: { trigger: '.contents', start: 'top 70%' }
	});

	gsap.from('.content-item', {
		y: 16,
		opacity: 0,
		stagger: 0.08,
		duration: 0.7,
		ease: 'power3.out',
		scrollTrigger: { trigger: '.contents__grid', start: 'top 75%' }
	});
})();

// 4.png - Sosyal Medya detay
(function initSmDetail(){
	if (!gsap || !ScrollTrigger) return;

	gsap.from('.sm-detail__title', {
		xPercent: -10,
		opacity: 0,
		duration: 0.9,
		ease: 'power3.out',
		scrollTrigger: { trigger: '.sm-detail', start: 'top 75%' }
	});

	gsap.from('.sm-detail__badge', {
		scale: 0,
		duration: 0.5,
		ease: 'back.out(1.7)',
		scrollTrigger: { trigger: '.sm-detail__badge', start: 'top 80%' }
	});

	gsap.from('.sm-detail__text p', {
		y: 20,
		opacity: 0,
		stagger: 0.15,
		duration: 0.7,
		ease: 'power2.out',
		scrollTrigger: { trigger: '.sm-detail__text', start: 'top 80%' }
	});

	gsap.from('.sm-detail__logo', {
		y: 30,
		opacity: 0,
		duration: 0.8,
		ease: 'power3.out',
		scrollTrigger: { trigger: '.sm-detail__logo', start: 'top 80%' }
	});
})();

// 5.png - Sosyal Medya kart galerisi
(function initSmGallery(){
	if (!gsap || !ScrollTrigger) return;

	gsap.from('.sm-shot', {
		y: 30,
		opacity: 0,
		stagger: 0.08,
		duration: 0.7,
		ease: 'power3.out',
		scrollTrigger: { trigger: '.sm-gallery__grid', start: 'top 75%' }
	});
})();

// 6.png - Dikey hikâye kartları
(function initSmStories(){
	if (!gsap || !ScrollTrigger) return;

	gsap.from('.story-card', {
		y: 40,
		opacity: 0,
		stagger: 0.1,
		duration: 0.75,
		ease: 'power3.out',
		scrollTrigger: { trigger: '.sm-stories__grid', start: 'top 75%' }
	});
})();


