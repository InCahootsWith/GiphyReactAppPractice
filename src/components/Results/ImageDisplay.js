import React from "react"
import Fade from "react-reveal/Fade";
import Gallery from 'react-grid-gallery';
import './Results.scss'


const ImageDisplay = (props) => {

    let IMAGES = [];

    const createImages = () => {

        {props.items.map((gif, key) =>
            IMAGES.push({
                    src: gif.images.fixed_height.url,
                    thumbnail: gif.images.fixed_height.url,
                    thumbnailWidth: parseInt(gif.images.fixed_height.width),
                    thumbnailHeight: parseInt(gif.images.fixed_height.height),
                    caption: gif.title,

                }
            )
        )}
    }


    return(
        <Fade big>
            <div>
                {createImages()}
                <Gallery enableLightbox={false} enableImageSelection={false} images={IMAGES}/>
            </div>
        </Fade>
    )
}

export default ImageDisplay