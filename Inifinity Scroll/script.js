const imageContainer = document.getElementById('image-container'); 
const loader = document.getElementById('loader'); 


let ready = false;
let imagesLoaded = 0;
let totalImages = 0;  
let photosArray = [];
let initialLoad = true; 

// Unsplash API 
let initialCount = 5; 
const apiKey= '-ez91zxtBi2Z1Hvlow-RDH7piRcPxXM0HTTS6jyPi6w'; 
let apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${initialCount}`; 

// New Block New Function 
function updateAPIURLWithNewCount (picCount) {
    apiUrl  =  `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${picCount}`;
}

// Check if all images were loaded
function imageLoaded () {
    imagesLoaded++; 
    if(imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true; 
    }
}

//Helper function to set attribtes on DOM elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]); 
    }
}
// Create Elements for links & phots, Add to DOM
function displayPhotos() {
    imagesLoaded = 0; 
    totalImages = photosArray.length;


    // Run function for each object in photoArrays
    photosArray.forEach((photo) => {
     
     
        // create <a> to link to Unsplash 
      const item = document.createElement('a'); 
      setAttributes(item, {
        href:photo.links.html,
        target: '_blank', 
      }); 
      
      
      //Create <img> for photo 
      const img = document.createElement('img');
      setAttributes(img, {
        src: photo.urls.regular, 
        alt: photo.alt_description,
        title: photo.alt_description, 
      });
     
     
      // Event Listener, check when each is finished loading
      img.addEventListener('load', imageLoaded);
      
      
      //Put <img> inside <a>, then put both inside imageContainer Element
      item.appendChild(img);
      imageContainer.appendChild(item); 
    });
}
// Get Photos from Unsplash API 

async function getPhotos() {
    try {
        const response = await fetch (apiUrl);
        photosArray = await response.json();
        displayPhotos();
        if (initialLoad) {
            updateAPIURLWithNewCount(30);
            initialLoad = false; 
        }
    } catch (error) {
        // Catch Error Here
    }
}

// Check to see if scrolling near bottom of page, Load More Photos 
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false; 
        getPhotos(); 
    }  
})



// On Load
getPhotos(); 