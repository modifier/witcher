import * as geojson from 'geojson';

export default {
    type: 'FeatureCollection',
    features: [{
        "type": "Feature",
        "properties": {
            "name": "Pont Vanis",
            "url": "https://witcher.fandom.com/wiki/Pont_Vanis"
        },
        "geometry": {
            "type": "Point",
            "coordinates": [1465, 923]
        }
    }, {
        "type": "Feature",
        "properties": {
            "name": "Novigrad",
            "url": "https://witcher.fandom.com/wiki/Novigrad"
        },
        "geometry": {
            "type": "Point",
            "coordinates": [2067, 1803]
        }
    }, {
        "type": "Feature",
        "properties": {
            "name": "Cintra",
            "url": "https://witcher.fandom.com/wiki/Cintra_(city)"
        },
        "geometry": {
            "type": "Point",
            "coordinates": [2234, 3189]
        }
    }, {
        "type": "Feature",
        "properties": {
            "name": "Blaviken",
            "url": "https://witcher.fandom.com/wiki/Blaviken"
        },
        "geometry": {
            "type": "Point",
            "coordinates": [2295, 923]
        }
    }, {
        "type": "Feature",
        "properties": {
            "name": "Tretogor",
            "url": "https://witcher.fandom.com/wiki/Tretogor"
        },
        "geometry": {
            "type": "Point",
            "coordinates": [2631, 1454]
        }
    }, {
        "type": "Feature",
        "properties": {
            "name": "La Valette Castle",
            "url": "https://witcher.fandom.com/wiki/La_Valette_Castle"
        },
        "geometry": {
            "type": "Point",
            "coordinates": [2807, 1667]
        }
    }, {
        "type": "Feature",
        "properties": {
            "name": "Vizima",
            "url": "https://witcher.fandom.com/wiki/Vizima"
        },
        "geometry": {
            "type": "Point",
            "coordinates": [2782, 1942]
        }
    }, {
        "type": "Feature",
        "properties": {
            "name": "Vergen",
            "url": "https://witcher.fandom.com/wiki/Vergen"
        },
        "geometry": {
            "type": "Point",
            "coordinates": [3798, 1514]
        }
    }, {
        "type": "Feature",
        "properties": {
            "name": "Loc Muinne",
            "url": "https://witcher.fandom.com/wiki/Loc_Muinne"
        },
        "geometry": {
            "type": "Point",
            "coordinates": [4689, 1241]
        }
    }]
} as geojson.GeoJsonObject;
