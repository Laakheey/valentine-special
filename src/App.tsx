import { SignIn, SignedIn, SignedOut, useClerk } from "@clerk/clerk-react";
import Heart from "./Heart";
import RainEffect from "./RainEffect";

function App() {
  const { user } = useClerk();

  const handlePlayAudio = () => {
    let audioElement = document.createElement("audio");
    audioElement.src = "/audio/music.mp3";
    audioElement.id = "audio-id";
    document.body.appendChild(audioElement);
    audioElement.play();
    audioElement.volume = 0.1;
    audioElement.loop = true;

    document.body.requestFullscreen();

  };

  const handlePauseAudio = () => {
    let audioElement = document.getElementById("audio-id") as HTMLAudioElement;
    audioElement.pause();
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <RainEffect />
      <SignedIn>
        <div className="flex justify-center items-center flex-col">
          <div className="flex text-4xl justify-center mt-5 gap-2 pl-3 lg:pl-0">
            <p>Happy Valentine's Day {user?.fullName}</p>
            <img
              src={user?.imageUrl}
              width={40}
              className="rounded-full hidden lg:block"
            />
          </div>
        </div>
        <div className="flex justify-center items-center flex-grow">
          <Heart onHeartClick={handlePlayAudio} onNoClick={handlePauseAudio} />
        </div>
      </SignedIn>
      <SignedOut>
        <SignIn />
      </SignedOut>
    </div>
  );
}

export default App;
