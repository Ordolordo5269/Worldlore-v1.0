// Initialize the map when the page loads
document.addEventListener('DOMContentLoaded', initMap);

// Variables globales
let map;
let hoveredCountryId = null;
let selectedCountryId = null;

// Function to initialize the map
function initMap() {
    mapboxgl.accessToken = countryMapConfig.mapboxToken;
    
    map = new mapboxgl.Map({
        container: 'map',
        style: countryMapConfig.style,
        center: countryMapConfig.initialView.center,
        zoom: countryMapConfig.initialView.zoom,
        pitch: countryMapConfig.initialView.pitch,
        bearing: countryMapConfig.initialView.bearing,
        minZoom: countryMapConfig.initialView.minZoom,
        maxZoom: countryMapConfig.initialView.maxZoom,
        maxBounds: countryMapConfig.initialView.maxBounds,
        projection: 'globe'
    });
    
    // Exponer la variable map globalmente
    window.map = map;
    
    map.addControl(new mapboxgl.NavigationControl({
        showCompass: true,
        visualizePitch: true
    }), 'bottom-right');
    
    map.on('load', () => {
        setupMapEffects();
        setupCountryInteractions();
        
        // Add smooth rotation animation at startup
        setTimeout(() => {
            map.easeTo({
                bearing: 15,
                duration: 8000,
                easing: (t) => t
            });
        }, 1000);
    });
}

// Setup visual effects for the map
function setupMapEffects() {
    map.setFog(countryMapConfig.fogOptions);
    map.setLight({
        anchor: 'viewport',
        color: 'white',
        intensity: 0.4
    });
    
    // Add country fill layer
    if (!map.getLayer('country-fills')) {
        if (!map.getSource('country-boundaries')) {
            map.addSource('country-boundaries', {
                type: 'vector',
                url: 'mapbox://mapbox.country-boundaries-v1'
            });
        }
        
        map.addLayer({
            id: 'country-fills',
            type: 'fill',
            source: 'country-boundaries',
            'source-layer': 'country_boundaries',
            paint: {
                'fill-color': [
                    'case',
                    ['boolean', ['feature-state', 'selected'], false],
                    'rgba(255, 255, 255, 0.3)',
                    ['boolean', ['feature-state', 'hover'], false],
                    'rgba(255, 255, 255, 0.2)',
                    'transparent'
                ],
                'fill-opacity': 0.5
            }
        });
    }
}

// Setup country interactions (click and hover)
function setupCountryInteractions() {
    // Click event for countries
    map.on('click', (e) => {
        const features = map.queryRenderedFeatures(e.point, {
            layers: ['country-fills', 'admin-0-boundary', 'country-label']
        });
        
        const countryFeature = features.find(f => 
            f.properties && (f.properties.iso_3166_1 || f.properties.iso_3166_1_alpha_3)
        );
        
        if (countryFeature) {
            const countryCode = countryFeature.properties.iso_3166_1_alpha_3 || 
                               countryFeature.properties.iso_3166_1 ||
                               countryFeature.properties.iso_code;
            
            if (countryCode) {
                // Reset previous selection
                if (selectedCountryId) {
                    map.setFeatureState(
                        { source: 'country-boundaries', sourceLayer: 'country_boundaries', id: selectedCountryId },
                        { selected: false }
                    );
                }
                
                // Set new selection
                selectedCountryId = countryFeature.id;
                map.setFeatureState(
                    { source: 'country-boundaries', sourceLayer: 'country_boundaries', id: selectedCountryId },
                    { selected: true }
                );
                
                window.updateSidebar(countryCode);
                
                map.easeTo({
                    center: e.lngLat,
                    zoom: 4,
                    duration: 2000
                });
            }
        }
    });
    
    // Hover effects
    map.on('mousemove', (e) => {
        const features = map.queryRenderedFeatures(e.point, {
            layers: ['country-fills', 'admin-0-boundary', 'country-label']
        });
        
        const isOverCountry = features.some(f => 
            f.properties && (f.properties.iso_3166_1 || f.properties.iso_3166_1_alpha_3)
        );
        
        map.getCanvas().style.cursor = isOverCountry ? 'pointer' : '';
        
        if (isOverCountry) {
            const countryFeature = features.find(f => 
                f.properties && (f.properties.iso_3166_1 || f.properties.iso_3166_1_alpha_3)
            );
            
            if (countryFeature && countryFeature.id !== hoveredCountryId) {
                if (hoveredCountryId) {
                    map.setFeatureState(
                        { source: 'country-boundaries', sourceLayer: 'country_boundaries', id: hoveredCountryId },
                        { hover: false }
                    );
                }
                
                hoveredCountryId = countryFeature.id;
                map.setFeatureState(
                    { source: 'country-boundaries', sourceLayer: 'country_boundaries', id: hoveredCountryId },
                    { hover: true }
                );
            }
        } else if (hoveredCountryId) {
            map.setFeatureState(
                { source: 'country-boundaries', sourceLayer: 'country_boundaries', id: hoveredCountryId },
                { hover: false }
            );
            hoveredCountryId = null;
        }
    });
}

// Function to reset map view
function resetMapView() {
    if (!map) return;
    
    // Reset selection
    if (selectedCountryId) {
        map.setFeatureState(
            { source: 'country-boundaries', sourceLayer: 'country_boundaries', id: selectedCountryId },
            { selected: false }
        );
        selectedCountryId = null;
    }
    
    map.easeTo({
        center: countryMapConfig.initialView.center,
        zoom: countryMapConfig.initialView.zoom,
        pitch: countryMapConfig.initialView.pitch,
        bearing: countryMapConfig.initialView.bearing,
        duration: 2000
    });
}

// Export function for use in other files
window.resetMapView = resetMapView; 