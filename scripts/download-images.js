const https = require('https');
const fs = require('fs');
const path = require('path');

const images = {
  barbers: [
    {
      url: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1',
      filename: 'barber-1.jpg'
    },
    {
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      filename: 'barber-2.jpg'
    },
    {
      url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d',
      filename: 'barber-3.jpg'
    },
    {
      url: 'https://images.unsplash.com/photo-1506795660198-e95c776bcb45',
      filename: 'barber-4.jpg'
    },
    {
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      filename: 'barber-5.jpg'
    }
  ],
  services: [
    {
      url: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1',
      filename: 'service-1.jpg'
    },
    {
      url: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70',
      filename: 'service-2.jpg'
    },
    {
      url: 'https://images.unsplash.com/photo-1621607512214-68297480165e',
      filename: 'service-3.jpg'
    },
    {
      url: 'https://images.unsplash.com/photo-1562322140-8baeececf3df',
      filename: 'service-4.jpg'
    },
    {
      url: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9',
      filename: 'service-5.jpg'
    },
    {
      url: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c',
      filename: 'service-6.jpg'
    }
  ],
  gallery: [
    {
      url: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70',
      filename: 'gallery-1.jpg'
    },
    {
      url: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a',
      filename: 'gallery-2.jpg'
    },
    {
      url: 'https://images.unsplash.com/photo-1621607512214-68297480165e',
      filename: 'gallery-3.jpg'
    },
    {
      url: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70',
      filename: 'gallery-4.jpg'
    },
    {
      url: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a',
      filename: 'gallery-5.jpg'
    },
    {
      url: 'https://images.unsplash.com/photo-1621607512214-68297480165e',
      filename: 'gallery-6.jpg'
    }
  ],
  hero: [
    {
      url: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70',
      filename: 'hero-bg.jpg'
    }
  ],
  about: [
    {
      url: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a',
      filename: 'about-us.jpg'
    }
  ]
};

async function downloadImage(url, filename, directory) {
  return new Promise((resolve, reject) => {
    const filepath = path.join(__dirname, '..', 'public', 'images', directory, filename);
    const file = fs.createWriteStream(filepath);

    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${filename} to ${directory}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

async function downloadAllImages() {
  for (const [directory, imageList] of Object.entries(images)) {
    for (const image of imageList) {
      try {
        await downloadImage(image.url, image.filename, directory);
      } catch (error) {
        console.error(`Error downloading ${image.filename}:`, error);
      }
    }
  }
}

downloadAllImages().then(() => {
  console.log('All images downloaded successfully!');
}).catch((error) => {
  console.error('Error downloading images:', error);
}); 