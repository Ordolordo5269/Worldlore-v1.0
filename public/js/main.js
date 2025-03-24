// Main script for the landing page
document.addEventListener('DOMContentLoaded', () => {
    console.log('Worldlore is ready');
    
    // Simple animation for the title
    const title = document.querySelector('h1');
    if (title) {
        title.style.opacity = '0';
        title.style.transition = 'opacity 1s ease-in-out';
        
        setTimeout(() => {
            title.style.opacity = '1';
        }, 300);
    }
}); 