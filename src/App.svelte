<script lang="ts">
	import Map from './map';
	import 'leaflet/dist/leaflet.css';
	import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';

	let map: Map;

	function mapAction(container: HTMLElement) {
		map = new Map(container);
		map.initialize();

		return {
			destroy: () => {
				map.remove();
				map = null;
			}
		};
	}

	function resizeMap() {
		if (map) {
			map.invalidateSize();
		}
	}
</script>

<style>
	.app-wrapper {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.map-wrapper {
		flex: 1 0 auto;
		width: 100%;
		padding: 30px;
		box-sizing: border-box;
		position: relative;
	}

	.map-wrapper:before {
		position: absolute;
		top: 15px;
		left: 15px;
		right: 15px;
		bottom: 15px;
		background-color: #ad7546;
		content: "";
		border: 1px #000 solid;
		z-index: 1;
	}

	.map-wrapper:after {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #d4b8a2;
		content: "";
		z-index: 0;
	}

	.map {
		border: 1px #000 solid;
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		z-index: 2;
	}
</style>

<svelte:window on:resize={resizeMap}/>
<div class="app-wrapper">
	<div class="map-wrapper">
		<div class="map" use:mapAction></div>
	</div>
</div>