
<script lang="ts">
	
	const mediaFiles = [
		"2.jpg",
		"2.jpg",
		"3.JPG",
		"4.JPG",
		"IMG_0376.jpg",
		"IMG_0378.jpg",
		"IMG_0379.jpg",
		"IMG_0380.jpg",
		"IMG_0384.jpg",
		"IMG_0385.jpg",
		"IMG_0387.jpg",
		"IMG_0388.jpg",
		"IMG_0391.jpg",
		"IMG_0392.jpg",
		"IMG_0394.jpg",
		"IMG_0395.jpg",
		"IMG_0396.jpg",
		"IMG_0397.jpg",
		"IMG_0398.jpg",
		"IMG_0400.jpg",
		"IMG_0402.jpg",
		"IMG_0405.jpg",
		"IMG_0406.jpg",
		"IMG_0417.jpg",
		"IMG_0419.jpg",
		"IMG_0421.jpg",
		"IMG_0422.jpg",
		"IMG_0423.jpg",
		"IMG_0425.jpg",
		"IMG_0437.jpg"
	];

	let current = 0;
	function prev() {
		current = (current - 1 + mediaFiles.length) % mediaFiles.length;
	}
	function next() {
		current = (current + 1) % mediaFiles.length;
	}

	// keyboard navigation
	if (typeof window !== 'undefined') {
		window.addEventListener('keydown', (e) => {
			if (e.key === 'ArrowLeft') prev();
			if (e.key === 'ArrowRight') next();
		});
	}
</script>

<main class="carousel">
	<div class="media-container">
		{#key mediaFiles[current]}
			{#if mediaFiles[current].endsWith('.mov')}
				<video src={'/' + mediaFiles[current]} controls class="media media-enter" />
			{:else}
				<img src={'/' + mediaFiles[current]} alt="media" class="media media-enter" />
			{/if}
		{/key}
	</div>
	<div class="nav-buttons">
		<button class="btn btn-left" on:click={prev} aria-label="Previous">◀</button>
		<div class="counter">{current + 1} / {mediaFiles.length}</div>
		<button class="btn btn-right" on:click={next} aria-label="Next">▶</button>
	</div>
</main>
<footer class="trademark">By Stefanos Siathas</footer>

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
}
.media {
	max-width: 100%;
	max-height: 76vh;
	border-radius: 0.9rem;
	object-fit: contain;
	box-shadow: 0 6px 20px rgba(0,0,0,0.12);
	transition: transform 300ms cubic-bezier(.2,.9,.3,1), opacity 300ms ease;
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
</style>
