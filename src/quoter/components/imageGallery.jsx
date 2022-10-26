import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useSelector } from 'react-redux';

export const ImageGallery=()=> {

  const{activeProduct}= useSelector(state=> state.quoter)

  const itemData = [
    {
      img: activeProduct.image,
      title: activeProduct.title,
    },
    
    //… más imagenes  
  ];

  return (
    //<ImageList sx={{ width: '100%', height: 300 }} cols={1} rowHeight={164}>
    <ImageList sx={{ maxWidth: 300, }} cols={1} >
      {itemData.map((item) => (
        <ImageListItem key={item.img} >
          <img
            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};



