// Cache para almacenar los datos de países
const countriesCache = [
    { name: "Afghanistan", alpha3Code: "AFG" },
    { name: "Albania", alpha3Code: "ALB" },
    { name: "Algeria", alpha3Code: "DZA" },
    { name: "Andorra", alpha3Code: "AND" },
    { name: "Angola", alpha3Code: "AGO" },
    { name: "Antigua and Barbuda", alpha3Code: "ATG" },
    { name: "Argentina", alpha3Code: "ARG" },
    { name: "Armenia", alpha3Code: "ARM" },
    { name: "Australia", alpha3Code: "AUS" },
    { name: "Austria", alpha3Code: "AUT" },
    { name: "Azerbaijan", alpha3Code: "AZE" },
    { name: "Bahamas", alpha3Code: "BHS" },
    { name: "Bahrain", alpha3Code: "BHR" },
    { name: "Bangladesh", alpha3Code: "BGD" },
    { name: "Barbados", alpha3Code: "BRB" },
    { name: "Belarus", alpha3Code: "BLR" },
    { name: "Belgium", alpha3Code: "BEL" },
    { name: "Belize", alpha3Code: "BLZ" },
    { name: "Benin", alpha3Code: "BEN" },
    { name: "Bhutan", alpha3Code: "BTN" },
    { name: "Bolivia", alpha3Code: "BOL" },
    { name: "Bosnia and Herzegovina", alpha3Code: "BIH" },
    { name: "Botswana", alpha3Code: "BWA" },
    { name: "Brazil", alpha3Code: "BRA" },
    { name: "Brunei", alpha3Code: "BRN" },
    { name: "Bulgaria", alpha3Code: "BGR" },
    { name: "Burkina Faso", alpha3Code: "BFA" },
    { name: "Burundi", alpha3Code: "BDI" },
    { name: "Cabo Verde", alpha3Code: "CPV" },
    { name: "Cambodia", alpha3Code: "KHM" },
    { name: "Cameroon", alpha3Code: "CMR" },
    { name: "Canada", alpha3Code: "CAN" },
    { name: "Central African Republic", alpha3Code: "CAF" },
    { name: "Chad", alpha3Code: "TCD" },
    { name: "Chile", alpha3Code: "CHL" },
    { name: "China", alpha3Code: "CHN" },
    { name: "Colombia", alpha3Code: "COL" },
    { name: "Comoros", alpha3Code: "COM" },
    { name: "Congo", alpha3Code: "COG" },
    { name: "Costa Rica", alpha3Code: "CRI" },
    { name: "Croatia", alpha3Code: "HRV" },
    { name: "Cuba", alpha3Code: "CUB" },
    { name: "Cyprus", alpha3Code: "CYP" },
    { name: "Czech Republic", alpha3Code: "CZE" },
    { name: "Denmark", alpha3Code: "DNK" },
    { name: "Djibouti", alpha3Code: "DJI" },
    { name: "Dominica", alpha3Code: "DMA" },
    { name: "Dominican Republic", alpha3Code: "DOM" },
    { name: "Ecuador", alpha3Code: "ECU" },
    { name: "Egypt", alpha3Code: "EGY" },
    { name: "El Salvador", alpha3Code: "SLV" },
    { name: "Equatorial Guinea", alpha3Code: "GNQ" },
    { name: "Eritrea", alpha3Code: "ERI" },
    { name: "Estonia", alpha3Code: "EST" },
    { name: "Eswatini", alpha3Code: "SWZ" },
    { name: "Ethiopia", alpha3Code: "ETH" },
    { name: "Fiji", alpha3Code: "FJI" },
    { name: "Finland", alpha3Code: "FIN" },
    { name: "France", alpha3Code: "FRA" },
    { name: "Gabon", alpha3Code: "GAB" },
    { name: "Gambia", alpha3Code: "GMB" },
    { name: "Georgia", alpha3Code: "GEO" },
    { name: "Germany", alpha3Code: "DEU" },
    { name: "Ghana", alpha3Code: "GHA" },
    { name: "Greece", alpha3Code: "GRC" },
    { name: "Grenada", alpha3Code: "GRD" },
    { name: "Guatemala", alpha3Code: "GTM" },
    { name: "Guinea", alpha3Code: "GIN" },
    { name: "Guinea-Bissau", alpha3Code: "GNB" },
    { name: "Guyana", alpha3Code: "GUY" },
    { name: "Haiti", alpha3Code: "HTI" },
    { name: "Honduras", alpha3Code: "HND" },
    { name: "Hungary", alpha3Code: "HUN" },
    { name: "Iceland", alpha3Code: "ISL" },
    { name: "India", alpha3Code: "IND" },
    { name: "Indonesia", alpha3Code: "IDN" },
    { name: "Iran", alpha3Code: "IRN" },
    { name: "Iraq", alpha3Code: "IRQ" },
    { name: "Ireland", alpha3Code: "IRL" },
    { name: "Israel", alpha3Code: "ISR" },
    { name: "Italy", alpha3Code: "ITA" },
    { name: "Jamaica", alpha3Code: "JAM" },
    { name: "Japan", alpha3Code: "JPN" },
    { name: "Jordan", alpha3Code: "JOR" },
    { name: "Kazakhstan", alpha3Code: "KAZ" },
    { name: "Kenya", alpha3Code: "KEN" },
    { name: "Kiribati", alpha3Code: "KIR" },
    { name: "Kuwait", alpha3Code: "KWT" },
    { name: "Kyrgyzstan", alpha3Code: "KGZ" },
    { name: "Laos", alpha3Code: "LAO" },
    { name: "Latvia", alpha3Code: "LVA" },
    { name: "Lebanon", alpha3Code: "LBN" },
    { name: "Lesotho", alpha3Code: "LSO" },
    { name: "Liberia", alpha3Code: "LBR" },
    { name: "Libya", alpha3Code: "LBY" },
    { name: "Liechtenstein", alpha3Code: "LIE" },
    { name: "Lithuania", alpha3Code: "LTU" },
    { name: "Luxembourg", alpha3Code: "LUX" },
    { name: "Madagascar", alpha3Code: "MDG" },
    { name: "Malawi", alpha3Code: "MWI" },
    { name: "Malaysia", alpha3Code: "MYS" },
    { name: "Maldives", alpha3Code: "MDV" },
    { name: "Mali", alpha3Code: "MLI" },
    { name: "Malta", alpha3Code: "MLT" },
    { name: "Marshall Islands", alpha3Code: "MHL" },
    { name: "Mauritania", alpha3Code: "MRT" },
    { name: "Mauritius", alpha3Code: "MUS" },
    { name: "Mexico", alpha3Code: "MEX" },
    { name: "Micronesia", alpha3Code: "FSM" },
    { name: "Moldova", alpha3Code: "MDA" },
    { name: "Monaco", alpha3Code: "MCO" },
    { name: "Mongolia", alpha3Code: "MNG" },
    { name: "Montenegro", alpha3Code: "MNE" },
    { name: "Morocco", alpha3Code: "MAR" },
    { name: "Mozambique", alpha3Code: "MOZ" },
    { name: "Myanmar", alpha3Code: "MMR" },
    { name: "Namibia", alpha3Code: "NAM" },
    { name: "Nauru", alpha3Code: "NRU" },
    { name: "Nepal", alpha3Code: "NPL" },
    { name: "Netherlands", alpha3Code: "NLD" },
    { name: "New Zealand", alpha3Code: "NZL" },
    { name: "Nicaragua", alpha3Code: "NIC" },
    { name: "Niger", alpha3Code: "NER" },
    { name: "Nigeria", alpha3Code: "NGA" },
    { name: "North Korea", alpha3Code: "PRK" },
    { name: "North Macedonia", alpha3Code: "MKD" },
    { name: "Norway", alpha3Code: "NOR" },
    { name: "Oman", alpha3Code: "OMN" },
    { name: "Pakistan", alpha3Code: "PAK" },
    { name: "Palau", alpha3Code: "PLW" },
    { name: "Palestine", alpha3Code: "PSE" },
    { name: "Panama", alpha3Code: "PAN" },
    { name: "Papua New Guinea", alpha3Code: "PNG" },
    { name: "Paraguay", alpha3Code: "PRY" },
    { name: "Peru", alpha3Code: "PER" },
    { name: "Philippines", alpha3Code: "PHL" },
    { name: "Poland", alpha3Code: "POL" },
    { name: "Portugal", alpha3Code: "PRT" },
    { name: "Qatar", alpha3Code: "QAT" },
    { name: "Romania", alpha3Code: "ROU" },
    { name: "Russia", alpha3Code: "RUS" },
    { name: "Rwanda", alpha3Code: "RWA" },
    { name: "Saint Kitts and Nevis", alpha3Code: "KNA" },
    { name: "Saint Lucia", alpha3Code: "LCA" },
    { name: "Saint Vincent and the Grenadines", alpha3Code: "VCT" },
    { name: "Samoa", alpha3Code: "WSM" },
    { name: "San Marino", alpha3Code: "SMR" },
    { name: "Sao Tome and Principe", alpha3Code: "STP" },
    { name: "Saudi Arabia", alpha3Code: "SAU" },
    { name: "Senegal", alpha3Code: "SEN" },
    { name: "Serbia", alpha3Code: "SRB" },
    { name: "Seychelles", alpha3Code: "SYC" },
    { name: "Sierra Leone", alpha3Code: "SLE" },
    { name: "Singapore", alpha3Code: "SGP" },
    { name: "Slovakia", alpha3Code: "SVK" },
    { name: "Slovenia", alpha3Code: "SVN" },
    { name: "Solomon Islands", alpha3Code: "SLB" },
    { name: "Somalia", alpha3Code: "SOM" },
    { name: "South Africa", alpha3Code: "ZAF" },
    { name: "South Korea", alpha3Code: "KOR" },
    { name: "South Sudan", alpha3Code: "SSD" },
    { name: "Spain", alpha3Code: "ESP" },
    { name: "Sri Lanka", alpha3Code: "LKA" },
    { name: "Sudan", alpha3Code: "SDN" },
    { name: "Suriname", alpha3Code: "SUR" },
    { name: "Sweden", alpha3Code: "SWE" },
    { name: "Switzerland", alpha3Code: "CHE" },
    { name: "Syria", alpha3Code: "SYR" },
    { name: "Taiwan", alpha3Code: "TWN" },
    { name: "Tajikistan", alpha3Code: "TJK" },
    { name: "Tanzania", alpha3Code: "TZA" },
    { name: "Thailand", alpha3Code: "THA" },
    { name: "Timor-Leste", alpha3Code: "TLS" },
    { name: "Togo", alpha3Code: "TGO" },
    { name: "Tonga", alpha3Code: "TON" },
    { name: "Trinidad and Tobago", alpha3Code: "TTO" },
    { name: "Tunisia", alpha3Code: "TUN" },
    { name: "Turkey", alpha3Code: "TUR" },
    { name: "Turkmenistan", alpha3Code: "TKM" },
    { name: "Tuvalu", alpha3Code: "TUV" },
    { name: "Uganda", alpha3Code: "UGA" },
    { name: "Ukraine", alpha3Code: "UKR" },
    { name: "United Arab Emirates", alpha3Code: "ARE" },
    { name: "United Kingdom", alpha3Code: "GBR" },
    { name: "United States", alpha3Code: "USA" },
    { name: "Uruguay", alpha3Code: "URY" },
    { name: "Uzbekistan", alpha3Code: "UZB" },
    { name: "Vanuatu", alpha3Code: "VUT" },
    { name: "Vatican City", alpha3Code: "VAT" },
    { name: "Venezuela", alpha3Code: "VEN" },
    { name: "Vietnam", alpha3Code: "VNM" },
    { name: "Yemen", alpha3Code: "YEM" },
    { name: "Zambia", alpha3Code: "ZMB" },
    { name: "Zimbabwe", alpha3Code: "ZWE" }
];

// Utilidades
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Funciones de búsqueda
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase().trim();
    const searchResults = document.getElementById('search-results');
    
    if (!searchTerm) {
        searchResults.classList.remove('active');
        return;
    }
    
    const matches = countriesCache.filter(country => 
        country.name.toLowerCase().includes(searchTerm) ||
        country.alpha3Code.toLowerCase().includes(searchTerm)
    ).slice(0, 5);
    
    displaySearchResults(matches, searchResults);
}

function displaySearchResults(matches, searchResults) {
    if (matches.length > 0) {
        searchResults.innerHTML = matches.map(country => `
            <div class="search-result-item" data-code="${country.alpha3Code}">
                ${country.name}
            </div>
        `).join('');
        
        attachResultListeners(searchResults);
        searchResults.classList.add('active');
    } else {
        searchResults.classList.remove('active');
    }
}

function attachResultListeners(searchResults) {
    searchResults.querySelectorAll('.search-result-item').forEach(item => {
        item.addEventListener('click', () => {
            const countryCode = item.dataset.code;
            selectCountry(countryCode);
            searchResults.classList.remove('active');
            document.getElementById('country-search').value = '';
        });
    });
}

// Funciones de selección de país
function selectCountry(countryCode) {
    if (!map || !map.loaded()) {
        console.warn('Map not loaded yet');
        return;
    }

    const features = map.querySourceFeatures('country-boundaries', {
        sourceLayer: 'country_boundaries',
        filter: ['==', 'iso_3166_1_alpha_3', countryCode]
    });
    
    if (features.length > 0) {
        const feature = features[0];
        updateCountrySelection(feature);
        centerMapOnCountry(feature);
        updateSidebar(countryCode);
    }
}

function updateCountrySelection(feature) {
    if (selectedCountryId) {
        map.setFeatureState(
            { source: 'country-boundaries', sourceLayer: 'country_boundaries', id: selectedCountryId },
            { selected: false }
        );
    }
    
    selectedCountryId = feature.id;
    map.setFeatureState(
        { source: 'country-boundaries', sourceLayer: 'country_boundaries', id: selectedCountryId },
        { selected: true }
    );
}

function centerMapOnCountry(feature) {
    const center = turf.center(feature.geometry);
    map.easeTo({
        center: center.geometry.coordinates,
        zoom: 4,
        duration: 2000
    });
}

function updateSidebar(countryCode) {
    if (window.updateSidebar) {
        window.updateSidebar(countryCode);
    }
}

// Inicialización
function initSearch() {
    const searchInput = document.getElementById('country-search');
    const searchResults = document.getElementById('search-results');
    
    searchInput.addEventListener('input', debounce(handleSearch, 300));
    
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.classList.remove('active');
        }
    });
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initSearch); 