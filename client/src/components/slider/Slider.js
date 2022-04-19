import React from 'react';
import './slider.css';
import AwesomeSlider from 'react-awesome-slider';
import withAutoPlay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';



const AutoPlaySlider = withAutoPlay(AwesomeSlider);

const Slider = () => {
    return (
        <AutoPlaySlider play={true}  interval={1000} className='slider' >
            <div className="sliderItem" data-src='http://localhost:3001/images/post/image_1.webp' >
                <div className="sliderItemInfoContainer">
                    <div className="sliderItemTitle">SHOP TRENDING CLOTHES</div>
                    <div className="sliderItemDescription">SHOP THE LATEST TRENDING CLOTHING, BIG SALE LIVE NOW</div>
                    <div className="shopNowButton">SHOP NOW</div>
                </div>
            </div>
                

            <div className="sliderItem" data-src='http://localhost:3001/images/post/image_2.webp' >
                    <div className="sliderItemInfoContainer">
                    <div className="sliderItemTitle">THIS IS TITLE</div>
                    <div className="sliderItemDescription">THIS IS THE SIMPLE DESCRIPTION EVER GIVEN </div>
                </div>
            </div>

            <div className="sliderItem" data-src='http://localhost:3001/images/post/image_3.webp' >
                <div className="sliderItemInfoContainer">
                    <div className="sliderItemTitle">THIS IS TITLE</div>
                    <div className="sliderItemDescription">THIS IS THE SIMPLE DESCRIPTION EVER GIVEN </div>
                </div>
               
            </div>

            <div className="sliderItem" data-src='http://localhost:3001/images/post/image_4.webp'  >
                <div className="sliderItemInfoContainer">
                    <div className="sliderItemTitle">THIS IS TITLE</div>
                    <div className="sliderItemDescription">THIS IS THE SIMPLE DESCRIPTION EVER GIVEN </div>
                </div>
            </div>
                

            
                
        </AutoPlaySlider>
    )
}

export default Slider;
