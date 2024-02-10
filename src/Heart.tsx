import { useEffect, useState } from "react";
import "./App.css";

export type HeartPropsType = {
  onHeartClick: () => void;
};

function Heart({ onHeartClick }: HeartPropsType) {
  const [balloonBurst, setBalloonBurst] = useState(false);
  const [touchHeart, setTouchHeart] = useState(false);

  const handleHeartClick = () => {
    setBalloonBurst(true);
    onHeartClick();
  };

  useEffect(() => {
    setTimeout(() => {
      setTouchHeart(true);
    }, 5000);
  }, []);

  return (
    <>
      {balloonBurst ? (
        <>
          <div className="flex flex-col">
            <img src="/assets/emoji.gif" alt="Will you?" />
            <div className="flex gap-3 justify-between mt-5 mx-5 lg:mx-0">
              <button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-2 px-4 rounded">
                Yes
              </button>
              <button 
                className="bg-gradient-to-r from-gray-400 to-blue-400 hover:from-gray-500 hover:to-blue-500 text-white font-bold py-2 px-4 rounded"
              >
                No
              </button>
            </div>
          </div>
        </>
      ) : (
        <div onClick={handleHeartClick} className="flex flex-col items-center">
          {touchHeart && <p className="mb-10 text-2xl">Touch the heart</p>}
          <div className="heart"></div>
        </div>
      )}
    </>
  );
}

export default Heart;
