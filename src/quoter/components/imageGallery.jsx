import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useSelector } from 'react-redux';

export const ImageGallery=()=> {

  const{activeProductToEdit, activeQuoter}= useSelector(state=> state.quoter)
  const imageError='https://c8.alamy.com/compes/2jd98n6/goku-dragon-ball-z-1996-2jd98n6.jpg'
  
  let itemData=[];
  try{
    activeQuoter
      ?itemData = [{ img: activeQuoter.image, title: activeQuoter.title,}]
      :itemData = [{ img: activeProductToEdit.image,title: activeProductToEdit.title,}]
  }catch(error){
    itemData=[{
      img: imageError,
      title: 'error'
    }, ]
  }
  

  return (
    //<ImageList sx={{ width: '100%', height: 300 }} cols={1} rowHeight={164}>
    <ImageList sx={{ maxWidth: 300, }} cols={1} >
      {itemData.map((item) => (
        <ImageListItem key={item.title} >
          <img
            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
            onError={(e)=>{e.target.src=imageError}}
            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};



