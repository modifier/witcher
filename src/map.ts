import * as L from 'leaflet';
import 'leaflet-rastercoords';

export default class Map {
    private readonly container: HTMLElement;
    private map: L.Map;
    private rc: L.RasterCoords;
    private size = [5093, 7209];

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
        this.rc = new L.RasterCoords(this.map, this.size);
        this.rc.setMaxBounds();

        this.map.setView(this.rc.unproject([this.size[1] / 2, this.size[0] / 2]), 3);
        L.tileLayer('assets/tiles/{z}/{x}/{y}.png', {
            noWrap: true,
            bounds: this.getBounds(),
        }).addTo(this.map);

        this.addMarkers();
        this.bindMarkerCreation();
    }

    addMarkers(): void {
        L.marker(this.rc.unproject([1465, 923])).addTo(this.map)
            .bindPopup('Pont Vanis');
    }

    bindMarkerCreation(): void {
        this.map.doubleClickZoom.disable();

        this.map.on('dblclick', ({ latlng: { lat, lng }}: L.LeafletMouseEvent) => {
            L.marker({ lat, lng }).addTo(this.map)
                .bindPopup(JSON.stringify(this.rc.project([lat, lng])))
                .openPopup();
        });
    }

    invalidateSize(): void {
        this.map.invalidateSize();
    }

    remove(): void {
        this.map.remove();
    }

    private getBounds(): L.LatLngBounds {
        let southWest = this.rc.unproject([0, this.size[1]]);
        let northEast = this.rc.unproject([this.size[0], 0]);

        return new L.LatLngBounds(southWest, northEast);
    }
}