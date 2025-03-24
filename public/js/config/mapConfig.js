// Configuración del mapa mundial
const countryMapConfig = {
    mapboxToken: 'pk.eyJ1IjoiYW5kcmVzb29kIiwiYSI6ImNtNWNtMmd4dzJlZmQybXFyMGJuMDFxemsifQ.t4UlHVJhUi9ntjG5Tiq5_A',
    style: 'mapbox://styles/mapbox/navigation-night-v1',
    initialView: {
        center: [0, 20],
        zoom: 2,
        pitch: 30,
        bearing: 0,
        minZoom: 1.5,
        maxZoom: 18,
        maxBounds: [[-180, -85], [180, 85]]
    },
    fogOptions: {
        color: 'rgb(186, 210, 235)',
        'horizon-blend': 0.1,
        'high-color': 'rgb(36, 92, 223)',
        'space-color': 'rgb(11, 11, 25)',
        'star-intensity': 0.6
    }
}; 