import {useState} from 'react';

const ImageSlider = ({ slides }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    
    const sliderStyles = {
        height: "100%",
        position: "relative",
    };

    const slideStyles = {
        width: "100%",
        height: "100%",
        borderRadius: "0px",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundImage: `url(${slides[currentIndex].url})`
    }
    const leftArrowStyles = {
        position: "absolute",
        top: "50%",
        transform: 'translate(0, -50%)',
        left: "16px",
        fontSize: "45px",
        color: "#fff",
        zIndex: 1,
        cursor: "pointer",
    };

    const rightArrowStyles = {
        position: "absolute",
        top: "50%",
        transform: 'translate(0, -50%)',
        right: "16px",
        fontSize: "45px",
        color: "#fff",
        zIndex: 1,
        cursor: "pointer",
    };

    const goToPrevious = () => {
        if (currentIndex === 0) {
            setCurrentIndex(slides.length - 1);
        }
        else {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const goToNext = () => {
        if (currentIndex === slides.length - 1) {
            setCurrentIndex(0);
        } else {
            setCurrentIndex(currentIndex + 1);
        }
    };
    return (
        <div style = {sliderStyles}>
            <div style={leftArrowStyles} onClick={goToPrevious}>←</div>
            <div style={rightArrowStyles} onClick={goToNext}>→</div>
            <div style={slideStyles}>

            </div>
        </div>
    )};
    export default ImageSlider;