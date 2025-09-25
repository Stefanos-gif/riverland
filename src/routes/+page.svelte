
<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	const mediaFiles = [
		"2.jpg", "2.jpg",
		"3.JPG", "4.JPG", "5.JPG", "6.JPG", "6.5.JPG", "6.6.jpg", "6.7.jpg", "7.JPG", "8.5.jpg", "8.MP4", "9.JPG", "10.JPG", "11.JPG", "12.JPG", "13.jpg", "14.JPG", "15.jpg", "16.JPG", "17.jpg", "18.jpg", "98.mov", "99.JPG",
		"0ce83324-cbd6-4cb7-8f39-474124b79377.JPG", "5fca090e-a74a-4d1b-bee9-121fb93d9425.JPG", "ddf9c430-0d1f-4c47-8f90-d25be77d9169.JPG", "e5c2854c-7bb0-4293-81df-30359a21b8e0.JPG",
		"IMG_0375.jpg", "IMG_0378.jpg", "IMG_0379.jpg", "IMG_0380.jpg", "IMG_0384.jpg", "IMG_0387.jpg", "IMG_0392.jpg", "IMG_0394.jpg", "IMG_0398.jpg", "IMG_0400.jpg", "IMG_0402.jpg", "IMG_0405.jpg", "IMG_0406.jpg", "IMG_0417.jpg", "IMG_0419.jpg", "IMG_0421.jpg", "IMG_0422.jpg", "IMG_0425.jpg", "IMG_0437.jpg"
	];

	let current = 0;
	let fullscreenOpen = false;
	let fullscreenIndex = 0;

	function prev() {
		current = (current - 1 + mediaFiles.length) % mediaFiles.length;
	}
	function next() {
		current = (current + 1) % mediaFiles.length;
	}

	function openFullscreen(idx: number) {
		fullscreenIndex = idx;
		fullscreenOpen = true;
		setTimeout(() => {
			if (typeof window !== 'undefined') {
				const modal = document.querySelector('.fullscreen-modal') as HTMLElement;
				if (modal) modal.focus();
			}
		}, 0);
	}
	function closeFullscreen() {
		fullscreenOpen = false;
		current = fullscreenIndex;
	}
	function fsPrev(e?: Event) {
		fullscreenIndex = (fullscreenIndex - 1 + mediaFiles.length) % mediaFiles.length;
		if (e) e.stopPropagation();
	}
	function fsNext(e?: Event) {
		fullscreenIndex = (fullscreenIndex + 1) % mediaFiles.length;
		if (e) e.stopPropagation();
	}

	function handleKey(e: KeyboardEvent) {
		if (fullscreenOpen) {
			if (e.key === 'Escape') closeFullscreen();
			if (e.key === 'ArrowLeft') fsPrev();
			if (e.key === 'ArrowRight') fsNext();
		} else {
			if (e.key === 'ArrowLeft') prev();
			if (e.key === 'ArrowRight') next();
		}
	}

	onMount(() => {
		if (typeof window !== 'undefined') {
			window.addEventListener('keydown', handleKey);
		}
	});
	onDestroy(() => {
		if (typeof window !== 'undefined') {
			window.removeEventListener('keydown', handleKey);
		}
	});
</script>

<main class="carousel">
	<div class="media-container">
		{#key mediaFiles[current]}
			{#if mediaFiles[current].endsWith('.mov') || mediaFiles[current].endsWith('.MP4')}
				<video src={'/' + mediaFiles[current]} controls class="media media-enter">
					<track kind="captions" label="No captions" />
				</video>
			{:else}
				<img src={'/' + mediaFiles[current]} alt="media" class="media media-enter" />
			{/if}
		{/key}
		<button class="fullscreen-btn" aria-label="Open fullscreen" on:click={() => openFullscreen(current)} tabindex="0">⛶</button>
	</div>
	<div class="nav-buttons">
		<button class="btn btn-left" on:click={prev} aria-label="Previous">◀</button>
		<div class="counter">{current + 1} / {mediaFiles.length}</div>
		<button class="btn btn-right" on:click={next} aria-label="Next">▶</button>
	</div>

	{#if fullscreenOpen}
	<div class="fullscreen-modal" tabindex="-1" aria-modal="true" role="dialog" on:click|self={closeFullscreen} on:keydown={(e) => { if ((e.key === 'Enter' || e.key === ' ') && e.target === e.currentTarget) { closeFullscreen(); } }}>
			<button class="close-btn" aria-label="Close fullscreen" on:click={closeFullscreen}>✕</button>
			<button class="fs-nav-btn fs-prev" aria-label="Previous" on:click|stopPropagation={fsPrev}>◀</button>
			<div class="fs-media-wrapper">
				{#if mediaFiles[fullscreenIndex].endsWith('.mov') || mediaFiles[fullscreenIndex].endsWith('.MP4')}
					<video src={'/' + mediaFiles[fullscreenIndex]} controls autoplay class="fs-media">
						<track kind="captions" label="No captions" />
					</video>
				{:else}
					<img src={'/' + mediaFiles[fullscreenIndex]} alt="media fullscreen" class="fs-media" />
				{/if}
			</div>
			<button class="fs-nav-btn fs-next" aria-label="Next" on:click|stopPropagation={fsNext}>▶</button>
		</div>
	{/if}
</main>
<footer class="trademark">by Stefanos Siathas™</footer>

<style>
	:global(body) {
	margin: 0;
	font-family: 'Segoe UI', Roboto, system-ui, -apple-system, 'Helvetica Neue', Arial;
	background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 30%, #f6d365 60%, #fda085 100%);
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

main.carousel {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-height: 88vh;
	padding: 1.5rem;
}
.media-container {
	width: 100%;
	max-width: 920px;
	aspect-ratio: 16/10;
	display: flex;
	align-items: center;
	justify-content: center;
	background: linear-gradient(180deg, rgba(255,255,255,0.85), rgba(255,255,255,0.6));
	border-radius: 1.2rem;
	box-shadow: 0 10px 30px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.6);
	margin-bottom: 1.25rem;
	padding: 0.5rem;
	border: 2px solid rgba(255,255,255,0.35);
	backdrop-filter: blur(4px);
	overflow: hidden;
}
.media {
	max-width: 100%;
	max-height: 100%;
	width: auto;
	height: auto;
	border-radius: 0.9rem;
	object-fit: contain;
	box-shadow: 0 6px 20px rgba(0,0,0,0.12);
	transition: transform 300ms cubic-bezier(.2,.9,.3,1), opacity 300ms ease;
	display: block;
	margin: auto;
}
.media-enter {
	animation: fadeInUp 360ms ease both;
}
.nav-buttons {
	display: flex;
	align-items: center;
	gap: 1rem;
	margin-bottom: 1.8rem;
}
.btn {
	border: none;
	color: white;
	padding: 0.6rem 0.9rem;
	border-radius: 999px;
	font-weight: 600;
	cursor: pointer;
	box-shadow: 0 6px 18px rgba(0,0,0,0.12);
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 48px;
	height: 48px;
	font-size: 1.1rem;
	transition: transform 160ms ease, box-shadow 160ms ease, opacity 160ms ease;
}
.btn:active { transform: translateY(2px); }
.btn:focus {
	outline: 3px solid rgba(255,255,255,0.6);
	outline-offset: 4px;
}
.btn-left { background: linear-gradient(135deg,#ff758c,#ff7eb3); }
.btn-right { background: linear-gradient(135deg,#7afcff,#4ea8de); }
.btn-left:hover { box-shadow: 0 10px 28px rgba(255,117,141,0.28); }
.btn-right:hover { box-shadow: 0 10px 28px rgba(78,168,222,0.28); }
.counter {
	color: #333;
	font-weight: 600;
	background: rgba(255,255,255,0.65);
	padding: 0.35rem 0.75rem;
	border-radius: 999px;
	box-shadow: 0 4px 12px rgba(0,0,0,0.06);
}
.trademark {
	text-align: center;
	font-size: 1.05rem;
	color: #333;
	margin-top: 1.6rem;
	font-family: 'Segoe UI', Arial, sans-serif;
	opacity: 0.9;
}

@keyframes fadeInUp {
	from { opacity: 0; transform: translateY(12px) scale(0.995); }
	to { opacity: 1; transform: translateY(0) scale(1); }
}

@media (max-width: 900px) {
	.media-container { max-width: 98vw; aspect-ratio: 4/3; }
	.media { max-height: 58vh; }
}
@media (max-width: 600px) {
	.media-container { aspect-ratio: 1/1; padding: 0.35rem; }
	.media { max-height: 46vh; border-radius: 0.7rem; }
	.btn { width: 44px; height: 44px; }
	.counter { padding: 0.25rem 0.5rem; font-size: 0.95rem; }
	.trademark { font-size: 0.95rem; }
}
/* Fullscreen modal styles */
.fullscreen-btn {
	position: absolute;
	top: 1.1rem;
	right: 1.1rem;
	background: rgba(255,255,255,0.85);
	border: none;
	border-radius: 50%;
	width: 40px;
	height: 40px;
	font-size: 1.3rem;
	color: #333;
	cursor: pointer;
	box-shadow: 0 2px 8px rgba(0,0,0,0.10);
	z-index: 2;
	transition: background 0.2s;
}
.fullscreen-btn:focus {
	outline: 2px solid #4ea8de;
}
.media-container { position: relative; }
.fullscreen-modal {
	position: fixed;
	top: 0; left: 0; right: 0; bottom: 0;
	background: rgba(0,0,0,0.92);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 1000;
	outline: none;
	animation: fadeInUp 320ms cubic-bezier(.2,.9,.3,1);
}
.fs-media-wrapper {
	max-width: 98vw;
	max-height: 92vh;
	display: flex;
	align-items: center;
	justify-content: center;
}
.fs-media {
	max-width: 98vw;
	max-height: 88vh;
	border-radius: 1.1rem;
	box-shadow: 0 8px 32px rgba(0,0,0,0.22);
	background: #fff;
	object-fit: contain;
}
.close-btn {
	position: absolute;
	top: 1.2rem;
	right: 1.2rem;
	background: rgba(255,255,255,0.85);
	border: none;
	border-radius: 50%;
	width: 44px;
	height: 44px;
	font-size: 1.4rem;
	color: #333;
	cursor: pointer;
	z-index: 2;
	box-shadow: 0 2px 8px rgba(0,0,0,0.10);
	transition: background 0.2s;
}
.close-btn:focus {
	outline: 2px solid #ff758c;
}
.fs-nav-btn {
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	background: rgba(255,255,255,0.85);
	border: none;
	border-radius: 50%;
	width: 48px;
	height: 48px;
	font-size: 1.5rem;
	color: #333;
	cursor: pointer;
	z-index: 2;
	box-shadow: 0 2px 8px rgba(0,0,0,0.10);
	transition: background 0.2s;
}
.fs-prev { left: 2vw; }
.fs-next { right: 2vw; }
.fs-nav-btn:focus {
	outline: 2px solid #4ea8de;
}
@media (max-width: 600px) {
	.fullscreen-btn, .close-btn, .fs-nav-btn {
		width: 38px; height: 38px; font-size: 1.1rem;
	}
	.fs-media { border-radius: 0.7rem; }
	.fs-prev { left: 1vw; }
	.fs-next { right: 1vw; }
}
</style>
