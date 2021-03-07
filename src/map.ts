import * as L from 'leaflet';
import 'leaflet-rastercoords';
import '@geoman-io/leaflet-geoman-free';

export default class Map {
    private readonly container: HTMLElement;
    private map: L.Map;
    private rc: L.RasterCoords;
    private size = [5093, 7209];
    private cities = [{ "name": "Pont Vanis", "coordinates": [1465, 923] }];

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

        this.bindMarkerCreation();

        let cityLayer = this.createCityLayer();
        L.control.layers({}, {"Города": cityLayer}).addTo(this.map);
    }

    createCityLayer(): L.LayerGroup {
        let citiesLayer = L.layerGroup().addTo(this.map);
        for (let city of this.cities) {
            L.marker(this.rc.unproject(city.coordinates as L.PointTuple), { pmIgnore: true }).bindPopup(city.name).addTo(citiesLayer);
        }

        return citiesLayer;
    }

    bindMarkerCreation(): void {
        this.map.pm.addControls({
            position: 'topleft',
            drawCircle: false,
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