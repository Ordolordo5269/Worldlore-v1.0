// Sidebar functionality
document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('country-sidebar');
    const closeSidebarBtn = document.getElementById('close-sidebar');
    
    // Close sidebar when the close button is clicked
    closeSidebarBtn.addEventListener('click', () => {
        sidebar.classList.remove('active');
    });
    
    // Function to update the sidebar with country data
    window.updateSidebar = async (countryCode) => {
        try {
            // Show loading state
            showLoadingState();
            
            // Fetch country data from our API
            const response = await fetch(`/api/countries/details/${countryCode}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            // Update the sidebar with the data
            updateSidebarContent(data);
            
            // Show the sidebar
            sidebar.classList.add('active');
        } catch (error) {
            console.error('Error fetching country data:', error);
            showErrorState();
        }
    };
    
    // Function to show loading state
    function showLoadingState() {
        document.getElementById('country-name').textContent = 'Loading...';
        document.getElementById('country-official-name').textContent = '';
        document.getElementById('country-flag').src = '';
        
        // Reset all values to loading state
        const valueElements = document.querySelectorAll('.info-value');
        valueElements.forEach(el => {
            el.textContent = 'Loading...';
        });
        
        // Reset sector breakdown
        document.getElementById('agriculture-sector').style.width = '0%';
        document.getElementById('industry-sector').style.width = '0%';
        document.getElementById('services-sector').style.width = '0%';
        
        // Reset urban/rural distribution
        document.getElementById('urban-percentage').style.width = '0%';
        document.getElementById('rural-percentage').style.width = '0%';
        
        // Reset lists
        document.getElementById('political-parties').innerHTML = '<li>Loading...</li>';
        document.getElementById('international-orgs').innerHTML = '<span class="tag">Loading...</span>';
        document.getElementById('key-allies').innerHTML = '<span class="tag">Loading...</span>';
    }
    
    // Function to show error state
    function showErrorState() {
        document.getElementById('country-name').textContent = 'Error';
        document.getElementById('country-official-name').textContent = 'Could not load country data';
        
        // Reset all values to error state
        const valueElements = document.querySelectorAll('.info-value');
        valueElements.forEach(el => {
            el.textContent = 'N/A';
        });
        
        // Show the sidebar anyway to display the error
        sidebar.classList.add('active');
    }
    
    // Function to update the sidebar content with country data
    function updateSidebarContent(data) {
        // Basic information
        document.getElementById('country-name').textContent = data.basic.name || 'N/A';
        document.getElementById('country-official-name').textContent = data.basic.officialName || 'N/A';
        document.getElementById('country-flag').src = data.basic.flag || '';
        document.getElementById('country-iso').textContent = data.basic.isoCode || 'N/A';
        document.getElementById('country-continent').textContent = data.basic.continent || 'N/A';
        document.getElementById('country-capital').textContent = data.basic.capital || 'N/A';
        
        // Economy
        document.getElementById('country-gdp').textContent = data.economy.gdp || 'N/A';
        document.getElementById('country-gdp-per-capita').textContent = data.economy.gdpPerCapita || 'N/A';
        document.getElementById('country-inflation').textContent = data.economy.inflation || 'N/A';
        
        // Currency
        if (data.basic.currencies && data.basic.currencies.length > 0) {
            const currency = data.basic.currencies[0];
            document.getElementById('country-currency').textContent = 
                `${currency.code} (${currency.name})`;
        } else {
            document.getElementById('country-currency').textContent = 'N/A';
        }
        
        // Sector breakdown - Only update if we have actual data
        if (data.economy.sectorBreakdown && 
            typeof data.economy.sectorBreakdown.agriculture === 'string' && 
            typeof data.economy.sectorBreakdown.industry === 'string' && 
            typeof data.economy.sectorBreakdown.services === 'string') {
            updateSectorBreakdown(data.economy.sectorBreakdown);
        } else {
            // Show placeholder with equal distribution
            document.getElementById('agriculture-sector').style.width = '33.3%';
            document.getElementById('industry-sector').style.width = '33.3%';
            document.getElementById('services-sector').style.width = '33.3%';
            
            document.getElementById('agriculture-sector').innerHTML = '<span class="sector-label">N/A</span>';
            document.getElementById('industry-sector').innerHTML = '<span class="sector-label">N/A</span>';
            document.getElementById('services-sector').innerHTML = '<span class="sector-label">N/A</span>';
        }
        
        // Politics - Remove synthetic data
        document.getElementById('country-political-system').textContent = 'N/A';
        document.getElementById('country-democracy-index').textContent = 'N/A';
        document.getElementById('political-parties').innerHTML = '<li>No data available</li>';
        
        // Population
        document.getElementById('country-population').textContent = data.population.total || 'N/A';
        document.getElementById('country-density').textContent = data.population.density || 'N/A';
        document.getElementById('country-hdi').textContent = 'N/A';
        
        // Urban/Rural distribution - Only update if we have actual data
        if (data.population.urbanPercentage && data.population.ruralPercentage) {
            updateUrbanRuralDistribution(data.population.urbanPercentage, data.population.ruralPercentage);
        } else if (data.population.urbanPercentage) {
            // If we only have urban percentage, calculate rural
            const urbanPct = parseFloat(data.population.urbanPercentage);
            if (!isNaN(urbanPct)) {
                const ruralPct = (100 - urbanPct).toFixed(2) + '%';
                updateUrbanRuralDistribution(data.population.urbanPercentage, ruralPct);
            } else {
                // Show placeholder with equal distribution
                document.getElementById('urban-percentage').style.width = '50%';
                document.getElementById('rural-percentage').style.width = '50%';
                
                document.getElementById('urban-percentage').innerHTML = '<span class="distribution-label">N/A</span>';
                document.getElementById('rural-percentage').innerHTML = '<span class="distribution-label">N/A</span>';
            }
        } else {
            // Show placeholder with equal distribution
            document.getElementById('urban-percentage').style.width = '50%';
            document.getElementById('rural-percentage').style.width = '50%';
            
            document.getElementById('urban-percentage').innerHTML = '<span class="distribution-label">N/A</span>';
            document.getElementById('rural-percentage').innerHTML = '<span class="distribution-label">N/A</span>';
        }
        
        // Diplomacy - Only use real data, not synthetic
        document.getElementById('international-orgs').innerHTML = '<span class="tag">No data available</span>';
        document.getElementById('key-allies').innerHTML = '<span class="tag">No data available</span>';
        
        // Update timestamp
        const timestamp = new Date();
        document.getElementById('data-timestamp').textContent = 
            `Last updated: ${timestamp.toLocaleString()}`;
    }
    
    // Function to update sector breakdown visualization
    function updateSectorBreakdown(sectorData) {
        // Parse percentage values
        let agriculture = parseFloat(sectorData.agriculture);
        let industry = parseFloat(sectorData.industry);
        let services = parseFloat(sectorData.services);
        
        // Check if we have valid data
        if (isNaN(agriculture) || isNaN(industry) || isNaN(services)) {
            // If data is not available, show placeholder
            document.getElementById('agriculture-sector').style.width = '33.3%';
            document.getElementById('industry-sector').style.width = '33.3%';
            document.getElementById('services-sector').style.width = '33.3%';
            
            document.getElementById('agriculture-sector').innerHTML = '<span class="sector-label">N/A</span>';
            document.getElementById('industry-sector').innerHTML = '<span class="sector-label">N/A</span>';
            document.getElementById('services-sector').innerHTML = '<span class="sector-label">N/A</span>';
            return;
        }
        
        // Remove % sign if present
        agriculture = agriculture.toString().replace('%', '');
        industry = industry.toString().replace('%', '');
        services = services.toString().replace('%', '');
        
        // Convert to numbers
        agriculture = parseFloat(agriculture);
        industry = parseFloat(industry);
        services = parseFloat(services);
        
        // Update the width of each sector
        document.getElementById('agriculture-sector').style.width = `${agriculture}%`;
        document.getElementById('industry-sector').style.width = `${industry}%`;
        document.getElementById('services-sector').style.width = `${services}%`;
        
        // Update the labels
        document.getElementById('agriculture-sector').innerHTML = 
            `<span class="sector-label">Agriculture ${agriculture}%</span>`;
        document.getElementById('industry-sector').innerHTML = 
            `<span class="sector-label">Industry ${industry}%</span>`;
        document.getElementById('services-sector').innerHTML = 
            `<span class="sector-label">Services ${services}%</span>`;
    }
    
    // Function to update urban/rural distribution visualization
    function updateUrbanRuralDistribution(urban, rural) {
        // Parse percentage values
        let urbanPct = parseFloat(urban);
        let ruralPct = parseFloat(rural);
        
        // Check if we have valid data
        if (isNaN(urbanPct) || isNaN(ruralPct)) {
            // If data is not available, show placeholder
            document.getElementById('urban-percentage').style.width = '50%';
            document.getElementById('rural-percentage').style.width = '50%';
            
            document.getElementById('urban-percentage').innerHTML = '<span class="distribution-label">N/A</span>';
            document.getElementById('rural-percentage').innerHTML = '<span class="distribution-label">N/A</span>';
            return;
        }
        
        // Remove % sign if present
        urbanPct = urbanPct.toString().replace('%', '');
        ruralPct = ruralPct.toString().replace('%', '');
        
        // Convert to numbers
        urbanPct = parseFloat(urbanPct);
        ruralPct = parseFloat(ruralPct);
        
        // Update the width of each segment
        document.getElementById('urban-percentage').style.width = `${urbanPct}%`;
        document.getElementById('rural-percentage').style.width = `${ruralPct}%`;
        
        // Update the labels
        document.getElementById('urban-percentage').innerHTML = 
            `<span class="distribution-label">Urban ${urbanPct}%</span>`;
        document.getElementById('rural-percentage').innerHTML = 
            `<span class="distribution-label">Rural ${ruralPct}%</span>`;
    }
}); 