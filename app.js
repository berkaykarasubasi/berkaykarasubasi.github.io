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

// Slider: Yatay kaydırmalı galeriler (prev/next, teker, klavye)
(function initHorizontalSliders(){
	const sliderSections = document.querySelectorAll('.sm-gallery--slider');
	if (!sliderSections.length) return;

	sliderSections.forEach(section => {
		const grid = section.querySelector('.sm-gallery__grid');
		if (!grid) return;

		const prevBtn = section.querySelector('.sm-slider-btn--prev');
		const nextBtn = section.querySelector('.sm-slider-btn--next');
		const autoplayEnabled = section.dataset.autoplay !== 'false';
		const interval = parseInt(section.dataset.interval, 10) || 7000;
		let autoplayTimer = null;
		const hasOverflow = () => (grid.scrollWidth - grid.clientWidth) > 16;
		const resizeObserver = new ResizeObserver(() => {
			if (!hasOverflow()){
				stopAutoplay();
				grid.scrollTo({ left: 0 });
			}else{
				startAutoplay();
			}
		});
		resizeObserver.observe(grid);

		const getStep = () => Math.max(240, Math.min(grid.clientWidth * 0.9, 600));

		function scrollByStep(direction){
			const step = getStep() * (direction === 'next' ? 1 : -1);
			grid.scrollBy({ left: step, behavior: 'smooth' });
		}

		function goNextAuto(){
			if (!hasOverflow()) return;
			const maxScroll = grid.scrollWidth - grid.clientWidth;
			const nearEnd = grid.scrollLeft >= (maxScroll - 12);
			if (nearEnd){
				grid.scrollTo({ left: 0, behavior: 'smooth' });
			}else{
				scrollByStep('next');
			}
		}

		function stopAutoplay(){
			if (autoplayTimer){
				clearInterval(autoplayTimer);
				autoplayTimer = null;
			}
		}

		function startAutoplay(){
			if (!autoplayEnabled || !hasOverflow()) return;
			stopAutoplay();
			autoplayTimer = setInterval(goNextAuto, interval);
		}

		prevBtn && prevBtn.addEventListener('click', () => {
			scrollByStep('prev');
			startAutoplay();
		});
		nextBtn && nextBtn.addEventListener('click', () => {
			scrollByStep('next');
			startAutoplay();
		});

		// Fare tekeri ile yatay kaydırma (dikey tekeri yataya map’le)
		grid.addEventListener('wheel', (e) => {
			// trackpad yatay hareketini bozma
			const absX = Math.abs(e.deltaX);
			const absY = Math.abs(e.deltaY);
			if (absX > absY) return;
			if (absY < 2) return; // ufak jitter’ı yoksay
			e.preventDefault();
			grid.scrollBy({ left: e.deltaY, behavior: 'smooth' });
		}, { passive: false });

		// Klavye ok tuşları (bölüm odaktayken)
		section.tabIndex = 0;
		section.addEventListener('keydown', (e) => {
			if (e.key === 'ArrowRight') { e.preventDefault(); scrollByStep('next'); }
			if (e.key === 'ArrowLeft')  { e.preventDefault(); scrollByStep('prev'); }
		});

		section.addEventListener('mouseenter', stopAutoplay);
		section.addEventListener('mouseleave', startAutoplay);
		section.addEventListener('focusin', stopAutoplay);
		section.addEventListener('focusout', startAutoplay);
		startAutoplay();
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


// Poster & Broşür sliderı (full width, autoplay + manuel kontrol)
(function initPrintSlider(){
	const slider = document.querySelector('.print-slider');
	if (!slider) return;

	const track = slider.querySelector('.print-slider__track');
	const slides = Array.from(track.children);
	if (!slides.length) return;

	const prevBtn = slider.querySelector('.print-slider__btn--prev');
	const nextBtn = slider.querySelector('.print-slider__btn--next');
	const autoplayEnabled = slider.dataset.autoplay !== 'false';
	const interval = parseInt(slider.dataset.interval, 10) || 6000;
	let currentIndex = 0;
	let autoplayTimer = null;

	function updateSlidePosition(){
		const offset = -currentIndex * slider.clientWidth;
		track.style.transform = `translateX(${offset}px)`;
	}

	function goTo(index){
		const total = slides.length;
		currentIndex = (index + total) % total;
		updateSlidePosition();
	}

	function next(){ goTo(currentIndex + 1); }
	function prev(){ goTo(currentIndex - 1); }

	function stopAutoplay(){
		if (autoplayTimer){
			clearInterval(autoplayTimer);
			autoplayTimer = null;
		}
	}

	function startAutoplay(){
		if (!autoplayEnabled) return;
		stopAutoplay();
		autoplayTimer = setInterval(next, interval);
	}

	prevBtn && prevBtn.addEventListener('click', () => {
		prev();
		startAutoplay();
	});
	nextBtn && nextBtn.addEventListener('click', () => {
		next();
		startAutoplay();
	});

	slider.addEventListener('mouseenter', stopAutoplay);
	slider.addEventListener('mouseleave', startAutoplay);
	window.addEventListener('resize', () => updateSlidePosition());

	updateSlidePosition();
	startAutoplay();
})();

(function initFloatingNav(){
	const nav = document.querySelector('.floating-nav');
	if (!nav) return;

	const toggle = nav.querySelector('.floating-nav__toggle');
	const links = nav.querySelectorAll('.floating-nav__links a');

	nav.classList.add('is-visible');

	const collapse = () => {
		if (!nav.classList.contains('is-open')) return;
		nav.classList.remove('is-open');
		toggle && toggle.setAttribute('aria-expanded', 'false');
	};

	window.addEventListener('scroll', collapse, { passive: true });

	toggle && toggle.addEventListener('click', () => {
		const willOpen = !nav.classList.contains('is-open');
		nav.classList.toggle('is-open', willOpen);
		toggle.setAttribute('aria-expanded', String(willOpen));
	});

	links.forEach(link => {
		link.addEventListener('click', collapse);
	});
})();

(function initScrollTop(){
	const btn = document.querySelector('.scroll-top');
	if (!btn) return;

	const updateState = () => {
		const shouldShow = window.scrollY > 400;
		btn.classList.toggle('is-visible', shouldShow);
	};

	updateState();
	window.addEventListener('scroll', updateState, { passive: true });

	btn.addEventListener('click', () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	});
})();


