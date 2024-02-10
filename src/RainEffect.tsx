import { useEffect, useRef } from 'react';
import { useState } from 'react';

const RainEffect = () => {
  const bodyRef = useRef(document.querySelector("body"));
  const [_, setRaindropCount] = useState(0);

  useEffect(() => {
    if (!bodyRef.current) {
      throw new ReferenceError("Body section not found.");
    }

    const createRaindrop = () => {
      const raindrop = document.createElement("div");
      raindrop.className = "raindrop";
      raindrop.style.left = `${Math.random() * 100}vw`;
      raindrop.style.animationDuration = `${Math.random() * 3 + 2}s`;
      bodyRef.current!.appendChild(raindrop);
      setRaindropCount(prevCount => prevCount + 1);
    };

    //? want heart to rain instead of lines
  
    //   const createRaindrop = () => {
    //   const heart = document.createElement("i");
    //   heart.className = "fa-solid fa-heart raindrop";
    //   heart.style.left = `${Math.random() * 100}vw`;
    //   heart.style.animationDuration = `${Math.random() * 3 + 2}s`;
    //   bodyRef.current!.appendChild(heart);
    //   setRaindropCount(prevCount => prevCount + 1);
    // };

    const disableScroll = () => {
      bodyRef.current!.style.overflow = 'hidden';
    }

    disableScroll();

    const removeExcessRaindrops = () => {
      const raindropArr = document.querySelectorAll(".raindrop");
      if (raindropArr.length > 200) {
        raindropArr[0].remove();
        setRaindropCount(prevCount => prevCount - 1);
      }
    };

    const intervalId = setInterval(createRaindrop, 100);
    const cleanupIntervalId = setInterval(removeExcessRaindrops, 100);

    return () => {
      clearInterval(intervalId);
      clearInterval(cleanupIntervalId);
    };
  }, []);

  return <></>;
};

export default RainEffect;
