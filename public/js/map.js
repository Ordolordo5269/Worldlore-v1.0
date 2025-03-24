// Initialize the map when the page loads
document.addEventListener('DOMContentLoaded', () => {
    initMap();
});

// Function to initialize the map
function initMap() {
    // Set the Mapbox access token
    mapboxgl.accessToken = countryMapConfig.mapboxToken;
    
    // Create the map
    const map = new mapboxgl.Map({
        container: 'map',
        style: countryMapConfig.style,
        center: countryMapConfig.initialView.center,
        zoom: countryMapConfig.initialView.zoom,
        pitch: countryMapConfig.initialView.pitch,
        bearing: countryMapConfig.initialView.bearing,
        minZoom: countryMapConfig.initialView.minZoom,
        maxZoom: countryMapConfig.initialView.maxZoom,
        maxBounds: countryMapConfig.initialView.maxBounds,
        projection: 'globe' // Use globe projection for a more realistic effect
    });
    
    // Add navigation controls with custom style
    map.addControl(new mapboxgl.NavigationControl({
        showCompass: true,
        visualizePitch: true
    }), 'bottom-right');
    
    // Event when the map finishes loading
    map.on('load', () => {
        console.log('Map loaded successfully');
        
        // Add fog effect for depth
        map.setFog(countryMapConfig.fogOptions);
        
        // Add atmosphere effect for the globe
        map.setLight({
            anchor: 'viewport',
            color: 'white',
            intensity: 0.4
        });
        
        // Add a soft glow effect to country boundaries
        if (map.getLayer('admin-0-boundary')) {
            map.setPaintProperty('admin-0-boundary', 'line-color', 'rgba(255, 255, 255, 0.5)');
            map.setPaintProperty('admin-0-boundary', 'line-width', 1);
        }
        
        // Add a soft glow effect to country labels
        if (map.getLayer('country-label')) {
            map.setPaintProperty('country-label', 'text-color', 'rgba(255, 255, 255, 0.9)');
            map.setPaintProperty('country-label', 'text-halo-color', 'rgba(0, 0, 0, 0.5)');
            map.setPaintProperty('country-label', 'text-halo-width', 1.5);
        }
        
        // Add a fill layer for countries if it doesn't exist
        if (!map.getLayer('country-fills')) {
            // First check if the source exists
            if (!map.getSource('country-boundaries')) {
                map.addSource('country-boundaries', {
                    type: 'vector',
                    url: 'mapbox://mapbox.country-boundaries-v1'
                });
            }
            
            // Add a transparent fill layer to make countries clickable
            map.addLayer({
                id: 'country-fills',
                type: 'fill',
                source: 'country-boundaries',
                'source-layer': 'country_boundaries',
                paint: {
                    'fill-color': 'transparent',
                    'fill-opacity': 0.5
                }
            });
        }
        
        // Add click event for countries
        map.on('click', (e) => {
            // Get features at the clicked point
            const features = map.queryRenderedFeatures(e.point, {
                layers: ['country-fills', 'admin-0-boundary', 'country-label']
            });
            
            // Find the first feature that has a country code
            const countryFeature = features.find(f => 
                f.properties && (f.properties.iso_3166_1 || f.properties.iso_3166_1_alpha_3)
            );
            
            if (countryFeature) {
                // Get the country code (different properties might have it)
                const countryCode = countryFeature.properties.iso_3166_1_alpha_3 || 
                                   countryFeature.properties.iso_3166_1 ||
                                   countryFeature.properties.iso_code;
                
                console.log('Country clicked:', countryCode);
                
                if (countryCode) {
                    // Update the sidebar with the country data
                    window.updateSidebar(countryCode);
                }
            }
        });
        
        // Change cursor to pointer when hovering over countries
        map.on('mousemove', (e) => {
            const features = map.queryRenderedFeatures(e.point, {
                layers: ['country-fills', 'admin-0-boundary', 'country-label']
            });
            
            // Check if we're hovering over a country
            const isOverCountry = features.some(f => 
                f.properties && (f.properties.iso_3166_1 || f.properties.iso_3166_1_alpha_3)
            );
            
            // Change the cursor style
            map.getCanvas().style.cursor = isOverCountry ? 'pointer' : '';
        });
    });
    
    // Add smooth rotation animation at startup
    setTimeout(() => {
        map.easeTo({
            bearing: 15,
            duration: 8000,
            easing: (t) => t
        });
    }, 1000);
    
    // Handle errors
    map.on('error', (e) => {
        console.error('Map error:', e);
    });
} 