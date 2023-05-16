
import Carousel from 'react-images';

const LightBox = ({ currentImage, photos }) => {
  return (
    <>
      <Carousel
        currentIndex={currentImage}
        views={photos.map((x) => ({
          ...x,
          srcset: x.srcSet,
          caption: x.title
        }))}
      />
    </>
  );
};

export default LightBox;
