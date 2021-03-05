import * as L from 'leaflet';
import type { LatLngBoundsLiteral } from 'leaflet';

export default class Map {
    private readonly container: HTMLElement;
    private map: L.Map;

    constructor(container: HTMLElement) {
        this.container = container;
    }

    initialize(): void {
        const size = [5093, 7209];
        this.map = L.map(this.container, {
            preferCanvas: true,
            crs: L.CRS.Simple,
            minZoom: -3,
            maxZoom: 0,
        });
        let bounds: LatLngBoundsLiteral = [[0, 0], [size[1], size[0]]];

        this.map.setView([size[1] / 2, size[0] / 2], -3);

        L.imageOverlay('assets/map.jpg', bounds).addTo(this.map);
    }

    invalidateSize(): void {
        this.map.invalidateSize();
    }

    remove(): void {
        this.map.remove();
    }
}