import { FC } from 'react'
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";

interface Props {
  imageName: string;
}
const RenderImage: FC<Props> = ({ imageName }) => {

  // Create and configure your Cloudinary instance.
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dehgq82ll'
    }
  }); 

  // Use the image with public ID, 'front_face'.
  const myImage = cld.image(imageName);

  // Render the transformed image in a React component.
  return (
    <div>
      <AdvancedImage cldImg={myImage} />
    </div>
  )
};

export default RenderImage;
