const imageMap = {
  'ski_jacket.jpg': require('../assets/images/items/ski_jacket.jpg'),
  'thermal_layers.jpg': require('../assets/images/items/thermal_layers.jpg'),
  'snow_goggles.jpg': require('../assets/images/items/snow_goggles.jpg'),
};

export const getImage = (filename) => {
  if (!imageMap[filename]) {
    console.warn(`Image not found for: ${filename}`);
  }
  return imageMap[filename] || imageMap['ski_jacket.jpg']; // Safe fallback
};