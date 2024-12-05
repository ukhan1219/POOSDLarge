import React, {useState, useEffect} from 'react'
import "./About.css"

function Carousel(){
    const[currentIndex, setCurrentIndex] = useState(0);

    const content = [
        {
            title: "Functions", 
            listItems: 
            [
                "CRUD operations for individual accounts",
                "Fully functional backend",
                "User-focused frontend",
                "Secure database",
                "Calendar-based planning"
            ],
        },
        {
            title: "Mission Statement", 
            text: "The goal of our team was to provide a platform for people to track their excercising habits and plan out their fitness goals."
        },
    ];

    useEffect(() => {
        const interval = setInterval(handleNext,5000);
        return () => clearInterval(interval);
    }, [currentIndex]);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % content.length)
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + content.length) % content.length)
    };

    return(
        <div className = "carousel">
            <div className = "carousel-content">
                <h1 className='blurb-title'>{content[currentIndex].title}:</h1>
                {content[currentIndex].text && <p>{content[currentIndex].text}</p>}
                {content[currentIndex].listItems && (
                <ul>
                    {content[currentIndex].listItems.map((item, index) => (
                    <li key={index} >{item}</li>
                    ))}
                </ul>
                )}
            </div>
            <div className = 'navigation-console'>
                <button className='carousel-arrow left' onClick = {handlePrev}>
                    &#8592;
                </button>

                <div className='page-tracker'>
                    {content.map((_, index) =>(
                        <span
                        key = {index}
                        className={`dot ${index === currentIndex ? "active" : ""}`}
                        onClick = {() => setCurrentIndex(index)}
                        ></span>
                    ))}
                </div>

                <button className='carousel-arrow right' onClick = {handleNext}>
                    &#8594;
                </button>
            </div>
        </div>
    );
};

export default Carousel;