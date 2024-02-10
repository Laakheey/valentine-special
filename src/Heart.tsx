import { useEffect, useState } from "react";
import "./App.css";
import { useClerk } from "@clerk/clerk-react";

export type HeartPropsType = {
  onHeartClick: () => void;
  onNoClick: () => void;
};

function Heart({ onHeartClick, onNoClick }: HeartPropsType) {
  const [balloonBurst, setBalloonBurst] = useState(false);
  const [touchHeart, setTouchHeart] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const { signOut } = useClerk()

  const handleHeartClick = () => {
    setBalloonBurst(true);
    onHeartClick();
  };

  const handleNoClick = () => {
    onNoClick();
    signOut();
    document.exitFullscreen();
  }

  useEffect(() => {
    setTimeout(() => {
      setTouchHeart(true);
    }, 3000);
  }, []);

  return (
    <>
      {balloonBurst ? (
        <>
          <div className="flex flex-col">
            <img
              src="/assets/emoji.gif"
              alt="Will you?"
              onLoad={() => setShowButton(true)}
            />
            {showButton && (
              <div className="flex gap-3 justify-between mt-5 mx-5 lg:mx-0">
                <button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-2 px-4 rounded">
                  Yes
                </button>
                <button 
                    className="bg-gradient-to-r from-gray-400 to-blue-400 hover:from-gray-500 hover:to-blue-500 text-white font-bold py-2 px-4 rounded"
                    onClick={handleNoClick}
                >
                  No
                </button>
              </div>
            )}
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
