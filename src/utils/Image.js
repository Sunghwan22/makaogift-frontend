import image1 from '../assets/Iphone.jpeg';

export default function productImage(productId) {
  if (productId === 1) {
    return image1;
  }

  if (productId === 2) {
    return '../assets/s22.jpeg';
  }

  if (productId === 3) {
    return '../assets/macbook.jpeg';
  }

  if (productId === 4) {
    return '../assets/그램.jpeg';
  }

  if (productId === 5) {
    return '../assets/드러그옴므.jpeg';
  }

  if (productId === 6) {
    return '../assets/바밀로고래.jpg';
  }

  if (productId === 7) {
    return '../assets/바밀로키보드.jpg';
  }

  if (productId === 8) {
    return '../assets/시그니엘 레지던스.png';
  }

  return 1;
}
