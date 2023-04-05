// function to download image
function downloadImage(imgUrl, imgName, h2Text, pText, panelIndex, imgIndex) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', imgUrl, true);
    xhr.responseType = 'blob';
    xhr.onload = function(e) {
      const imgBlob = this.response;
      const imgURL = window.URL.createObjectURL(imgBlob);
  
      // create link to download image
      const link = document.createElement('a');
      link.href = imgURL;
      link.download = imgName;
      link.click();
  
      // add data to array
      data.push([imgName, h2Text, pText]);
  
      // create csv file
      if (data.length === totalImages) {
        const csvContent = 'data:text/csv;charset=utf-8,' + data.map(row => row.join(',')).join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.href = encodedUri;
        link.download = 'data.csv';
        document.body.appendChild(link);
        link.click();
      }
    };
    xhr.send();
  
    // wait for 1 second
    setTimeout(() => {
      URL.revokeObjectURL(imgURL);
    }, 3000);
  }
  
  // function to scroll down the page
  function scrollPage() {
    window.scrollBy(0, window.innerHeight);
  }
  
  // get all the panel-body elements
  const panels = document.querySelectorAll('div.panel-body');
  let data = [];
  let totalImages = 0;
  
  // loop through each panel-body
  for (let panelIndex = 0; panelIndex < panels.length; panelIndex++) {
    const panel = panels[panelIndex];
    const appPostImageContainers = panel.querySelectorAll('app-post-image-container');
    const h2 = panel.querySelector('h2[itemprop="name"]');
    const p = panel.querySelector('p[itemprop="text"]');
    let imgIndex = 1;
  
    // loop through each app-post-image-container in the panel-body
    appPostImageContainers.forEach((appPostImageContainer) => {
      const imgs = appPostImageContainer.querySelectorAll('img');
      totalImages += imgs.length;
  
      if (imgs.length > 0 && h2 && p) {
        const h2Text = h2.textContent.trim();
        const pText = p.textContent.trim();
  
        // loop through each image in the app-post-image-container
        imgs.forEach((img) => {
          const imgUrl = img.src;
          const imgName = `${panelIndex + 1}-${imgIndex}.jpg`;
  
          // download the image
          downloadImage(imgUrl, imgName, h2Text, pText, panelIndex, imgIndex);
  
          img.setAttribute('downloaded', true);
          imgIndex++;
        });
      }
    });
  }
  
  // continuously scroll down the page until all images are loaded
  let scrollInterval = setInterval(() => {
    const imagesDownloaded = document.querySelectorAll('img[downloaded]').length;
    if (imagesDownloaded === totalImages) {
      clearInterval(scrollInterval);
    } else {
      scrollPage();
    }
  }, 100);
  
  // clear images from memory after download
  window.addEventListener('beforeunload', () => {
    const images = document.querySelectorAll('img[downloaded]');
    images.forEach((img) => {
      URL.revokeObjectURL(img.src);
    });
  });