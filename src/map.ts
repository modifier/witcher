import * as L from 'leaflet';
import 'leaflet-rastercoords';
import '@geoman-io/leaflet-geoman-free';
import kingdoms from './kingdoms';
import cities from './cities';

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
            maxZoom: 7,
            zoomDelta: 0.25,
            maxBoundsViscosity: 1
        });
        this.rc = new L.RasterCoords(this.map, this.size);
        this.rc.setMaxBounds();

        this.map.setView(this.rc.unproject([this.size[1] / 2, this.size[0] / 2]), 3);
        L.tileLayer('assets/tiles/{z}/{x}/{y}.png', {
            noWrap: true,
            bounds: this.getBounds(),
            maxZoom: 7,
            maxNativeZoom: 5
        }).addTo(this.map);

        this.bindMarkerCreation();

        let cityLayer = this.createCityLayer();
        let kingdomsLayer = this.createKingdomsLayer();
        L.control.layers({}, {"Города": cityLayer, "Королевства": kingdomsLayer}).addTo(this.map);
    }

    createCityLayer(): L.LayerGroup {
        return L.geoJSON(cities, {
            coordsToLatLng: (coords: L.PointTuple) => {
                return this.rc.unproject(coords);
            }
        }).addTo(this.map);
    }

    createKingdomsLayer(): L.LayerGroup {
        return L.geoJSON(kingdoms, {
            coordsToLatLng: (coords: L.PointTuple) => {
                return this.rc.unproject(coords);
            },
            style: (feature) => {
                switch (feature.properties.country) {
                    case 'nilfgaard':
                        return {color: "#35404c"};
                    case 'redania':
                        return {color: "#a8360e"};
                    case 'temeria':
                        return {color: "#386eb7"};
                    case 'cintra':
                        return {color: "#7087a0"};
                    default:
                        return {color: "#0000ff"};
                }
            },
            onEachFeature: (feature: unknown, layer: L.Layer) => {
                layer.on('pm:update', (e) => {
                    console.log('updated layer', JSON.stringify(e.layer._latlngs[0].map((latlng) => {
                        let point = this.rc.project([latlng.lat, latlng.lng]);
                        return [point.x, point.y];
                    })));
                })
            }
        }).addTo(this.map);
    }

    bindMarkerCreation(): void {
        this.map.pm.addControls({
            position: 'topleft',
            drawCircle: false,
        });

        this.map.on('pm:create', (e) => {
            console.log('new layer', JSON.stringify(e.layer._latlngs[0].map((latlng) => {
                let point = this.rc.project([latlng.lat, latlng.lng]);
                return [point.x, point.y];
            })));
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
