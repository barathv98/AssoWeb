import React from 'react'
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";
import { quality } from "@cloudinary/url-gen/actions/delivery";

const RenderImage = () => {

  // Create and configure your Cloudinary instance.
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dehgq82ll'
    }
  }); 

  // Use the image with public ID, 'front_face'.
  const myImage = cld.image('about_us_ljcyzo').delivery(quality(40));

  // Render the transformed image in a React component.
  return (
    <div>
      <AdvancedImage cldImg={myImage} />
    </div>
  )
};

export default RenderImage;
