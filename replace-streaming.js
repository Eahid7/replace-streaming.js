// Save this as replace-streaming.js
function replaceStreamingWithDownloadGrid() {
    // Get movie details from the page
    const movieTitle = document.querySelector('.movie-title').textContent;
    const rating = document.querySelector('.movie-meta').textContent.match(/(\d+\.\d+)\/10/)?.[1] || '8.5';
    const year = movieTitle.match(/\((\d{4})\)/)?.[1] || '';
    const cleanTitle = movieTitle.replace(/\(\d{4}\)/, '').trim();

    // Your exact HTML structure with dynamic data
    const newHTML = `
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap');

    .download-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
        padding: 20px;
        max-width: 1200px;
        margin: 0 auto;
        font-family: 'Montserrat', sans-serif;
    }

    .download-card {
        background: linear-gradient(145deg, #457b9d20, #e6394620);
        border-radius: 15px;
        padding: 20px;
        transition: transform 0.3s ease;
        border: 2px solid var(--border-color, #dddddd);
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }

    .download-card:hover {
        transform: translateY(-5px);
    }

    .download-card .movie-title {
        font-size: 1.3rem;
        margin: 10px 0;
        color: #FF0000;
        text-align: center;
        border-bottom: 2px solid #e63946;
        padding-bottom: 10px;
        font-weight: 700;
    }

    .download-card .movie-info {
        color: #FF0000;
        font-size: 0.9rem;
        margin: 15px 0;
        text-align: center;
        line-height: 1.6;
        font-weight: 400;
    }

    .download-links {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        margin-top: 15px;
        justify-content: center;
    }

    .download-button {
        padding: 10px 20px;
        border-radius: 8px;
        text-decoration: none;
        font-weight: 600;
        transition: all 0.3s ease;
        font-family: 'Montserrat', sans-serif;
    }

    .download-button:hover {
        transform: scale(1.05);
    }

    .quality-720 {
        background-color: #e63946;
        color: white;
    }

    .quality-1080 {
        background-color: #457b9d;
        color: white;
    }
    </style>

    <div class="download-grid">
        <div class="download-card">
            <h3 class="movie-title">🎬 ${cleanTitle}</h3>
            <div class="movie-info">
                ⭐ Rating: ${rating}/10<br>
                📅 Year: ${year}<br>
                ⏱️ Duration: 2h 15m
            </div>
            <div class="download-links">
                <a href="#" class="download-button quality-720">📥 720p</a>
                <a href="#" class="download-button quality-1080">📥 1080p</a>
            </div>
        </div>
    </div>`;

    // Find and replace the streaming-options section
    const streamingSection = document.querySelector('.streaming-options');
    if (streamingSection) {
        streamingSection.outerHTML = newHTML;
    }
}

// Run when page loads
document.addEventListener('DOMContentLoaded', replaceStreamingWithDownloadGrid);

// Create a mutation observer to watch for changes in the DOM
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (document.querySelector('.streaming-options')) {
            replaceStreamingWithDownloadGrid();
        }
    });
});

// Start observing the document
observer.observe(document.body, { childList: true, subtree: true });
