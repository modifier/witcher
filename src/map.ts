import * as L from 'leaflet';

export default class Map {
    private readonly container: HTMLElement;
    private map: L.Map;

    constructor(container: HTMLElement) {
        this.container = container;
    }

    initialize(): void {
        this.map = L.map(this.container, {
            preferCanvas: true,
            crs: L.CRS.Simple,
            minZoom: 0,
            maxZoom: 5,
            zoomDelta: 0.25,
            maxBoundsViscosity: 1
        });

        this.map.setView([0, 0], 3);
        L.tileLayer('assets/tiles/{z}/{x}/{y}.png', {
            noWrap: true,
        }).addTo(this.map);
    }

    invalidateSize(): void {
        this.map.invalidateSize();
    }

    remove(): void {
        this.map.remove();
    }
}