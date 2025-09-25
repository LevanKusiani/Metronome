// Utility to fetch album covers from GetSongBPM webpages
// Since the API doesn't provide cover URLs, scraping them from the track's webpage is the only way

/**
 * Fetches album cover URL from GetSongBPM track webpage
 * @param {string} uri - The URI from the API response
 * @returns {Promise<string|null>} - Album cover URL or null if not found
 */
export const fetchAlbumCover = async (uri) => {
  try {
    if (!uri) {
      return null;
    }

    // Create a proxy URL to avoid CORS issues
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(uri)}`;
    
    const response = await fetch(proxyUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const htmlContent = data.contents;

    // Parse the HTML to find the album cover
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    
    // Look for the album cover using multiple selectors
    const selectors = [
      '.inCover img',
      '.col-xs-3.inCover img',
      '[class*="inCover"] img',
      '.album-cover img',
      '.cover img'
    ];

    let coverElement = null;
    let usedSelector = '';

    for (const selector of selectors) {
      coverElement = doc.querySelector(selector);
      if (coverElement) {
        usedSelector = selector;
        break;
      }
    }
    
    if (coverElement) {
      let coverUrl = coverElement.src;
      
      // Handle different URL formats
      if (coverUrl.includes('localhost') || coverUrl.includes('image_loading.png')) {
        // This is a placeholder/loading image, try to get the real src
        const dataSrc = coverElement.getAttribute('data-src') || 
                       coverElement.getAttribute('data-original') ||
                       coverElement.getAttribute('data-lazy');
        if (dataSrc) {
          coverUrl = dataSrc;
        } else {
          // Try to find a different image or construct URL from other attributes
          const parentElement = coverElement.parentElement;
          if (parentElement) {
            const parentDataSrc = parentElement.getAttribute('data-src') ||
                                 parentElement.getAttribute('data-original');
            if (parentDataSrc) {
              coverUrl = parentDataSrc;
            }
          }
        }
      }
      
      // Ensure the URL is absolute
      if (coverUrl.startsWith('//')) {
        return `https:${coverUrl}`;
      } else if (coverUrl.startsWith('/')) {
        return `https://getsongbpm.com${coverUrl}`;
      } else if (coverUrl.startsWith('http')) {
        return coverUrl;
      } else if (coverUrl.startsWith('img/')) {
        return `https://getsongbpm.com/${coverUrl}`;
      }
    } else {
      // Try to find any image that's not a loading placeholder
      const allImages = doc.querySelectorAll('img');
      const realImages = Array.from(allImages).filter(img => 
        !img.src.includes('localhost') && 
        !img.src.includes('image_loading.png') &&
        !img.src.includes('placeholder') &&
        img.src.length > 0
      );
      
      if (realImages.length > 0) {
        // Try the first real image found
        const realImage = realImages[0];
        let coverUrl = realImage.src;
        
        if (coverUrl.startsWith('//')) {
          return `https:${coverUrl}`;
        } else if (coverUrl.startsWith('/')) {
          return `https://getsongbpm.com${coverUrl}`;
        } else if (coverUrl.startsWith('http')) {
          return coverUrl;
        } else if (coverUrl.startsWith('img/')) {
          return `https://getsongbpm.com/${coverUrl}`;
        }
      }
    }

    return null;
  } catch (error) {
    return null;
  }
};

/**
 * Alternative method using a different CORS proxy
 * @param {string} uri - The URI from the API response
 * @returns {Promise<string|null>} - Album cover URL or null if not found
 */
export const fetchAlbumCoverAlternative = async (uri) => {
  try {
    if (!uri) return null;


    // Alternative CORS proxy
    const proxyUrl = `https://cors-anywhere.herokuapp.com/${uri}`;
    
    const response = await fetch(proxyUrl, {
      method: 'GET',
      headers: {
        'Accept': 'text/html',
        'X-Requested-With': 'XMLHttpRequest',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const htmlContent = await response.text();
    
    // Parse the HTML to find the album cover
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    
    // Look for the album cover using multiple selectors
    const selectors = [
      '.inCover img',
      '.col-xs-3.inCover img',
      '[class*="inCover"] img',
      '.album-cover img',
      '.cover img'
    ];

    let coverElement = null;
    let usedSelector = '';

    for (const selector of selectors) {
      coverElement = doc.querySelector(selector);
      if (coverElement) {
        usedSelector = selector;
        break;
      }
    }
    
    if (coverElement) {
      let coverUrl = coverElement.src;
      
      // Handle different URL formats
      if (coverUrl.includes('localhost') || coverUrl.includes('image_loading.png')) {
        // This is a placeholder/loading image, try to get the real src
        const dataSrc = coverElement.getAttribute('data-src') || 
                       coverElement.getAttribute('data-original') ||
                       coverElement.getAttribute('data-lazy');
        if (dataSrc) {
          coverUrl = dataSrc;
        } else {
          // Try to find a different image or construct URL from other attributes
          const parentElement = coverElement.parentElement;
          if (parentElement) {
            const parentDataSrc = parentElement.getAttribute('data-src') ||
                                 parentElement.getAttribute('data-original');
            if (parentDataSrc) {
              coverUrl = parentDataSrc;
            }
          }
        }
      }
      
      if (coverUrl.startsWith('//')) {
        return `https:${coverUrl}`;
      } else if (coverUrl.startsWith('/')) {
        return `https://getsongbpm.com${coverUrl}`;
      } else if (coverUrl.startsWith('http')) {
        return coverUrl;
      } else if (coverUrl.startsWith('img/')) {
        return `https://getsongbpm.com/${coverUrl}`;
      }
    }

    return null;
  } catch (error) {
    return null;
  }
};

/**
 * Fallback method - try multiple approaches
 * @param {string} uri - The URI from the API response
 * @returns {Promise<string|null>} - Album cover URL or null if not found
 */
export const fetchAlbumCoverWithFallback = async (uri) => {
  // Try the primary method first
  let coverUrl = await fetchAlbumCover(uri);
  
  // If that fails, try the alternative method
  if (!coverUrl) {
    coverUrl = await fetchAlbumCoverAlternative(uri);
  }
  
  return coverUrl;
};