import React, { useState } from 'react';
import { ReactComponent as PlayButtonSVG } from '../../common/assets/PlayButton.svg';

type Mode = 'Freestyle' | 'Regular' | 'Custom' | 'Metronome';

const App = () => {
  const [wpm, setWpm] = useState<string>('--');
  const [selectedMode, setSelectedMode] = useState<Mode>('Regular');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [isRecording, setIsRecording] = useState<boolean>(false);

  const sampleText = `Origami offers numerous benefits that extend beyond mere artistic expression. Engaging in this intricate paper-folding art enhances fine motor skills and hand-eye coordination, making it a valuable activity for individuals of all ages. Additionally, origami fosters creativity and problem-solving abilities, as practitioners must visualize and execute complex designs. The meditative nature of folding paper can also promote relaxation and reduce stress, contributing to overall mental well-being. Furthermore, origami serves as an educational tool, helping to teach concepts in mathematics and geometry through practical application, thereby enriching cognitive development.`;

  const handlePlayClick = (): void => {
    setIsRecording(!isRecording);
    // Here you would implement speech recognition logic
    if (!isRecording) {
      setTranscript('Recording started...');
      setWpm('120'); // Example WPM
    } else {
      setTranscript('Recording stopped.');
    }
  };

  const handleModeSelect = (mode: Mode): void => {
    setSelectedMode(mode);
    setIsModalVisible(false);
  };

  return (
    <div className="bg-slate-900 leading-relaxed text-teal-200 antialiased">

    {/* Mobile Settings Modal */}
    <div id="hidden-modal" className={!isModalVisible ? "hidden" : "relative"}>
      <div id="mobile-settings" role="dialog" aria-modal="true" className="fixed inset-0 z-50 bg-black/30" onClick={() => setIsModalVisible(false)}>
          <div id="outside-settings-list" className="z-10 w-full h-full flex justify-center items-center">
              <div id="mobile-settings-list" className="z-20 flex flex-col justify-center w-3xs bg-teal-900 p-5 rounded-xl gap-0.5 shadow-xl">
                  <button className="rounded-t-xl text-base sm:text-lg bg-teal-600 text-teal-900 hover:text-teal-300 hover:bg-teal-400/30 px-6 py-3" onClick={() => handleModeSelect("Freestyle")}>Freestyle</button>
                  <button className="text-base sm:text-lg bg-teal-600 text-teal-900 hover:text-teal-300 hover:bg-teal-400/30 px-6 py-3" onClick={() => handleModeSelect("Regular")}>Regular</button>
                  <button className="text-base sm:text-lg bg-teal-600 text-teal-900 hover:text-teal-300 hover:bg-teal-400/30 px-6 py-3" onClick={() => handleModeSelect("Custom")}>Custom</button>
                  <button className="rounded-b-xl text-base sm:text-lg bg-teal-600 text-teal-900 hover:text-teal-300 hover:bg-teal-400/30 px-6 py-3" onClick={() => handleModeSelect("Metronome")}>Metronome</button>
              </div>
          </div>
      </div>
    </div>
    

    <div className="md:mx-auto mx-5 min-h-screen max-w-screen-xl py-6 font-sans md:px-8 md:py-12">
        <header>
            <div className="flex justify-center">
                <h1 className="text-3xl font-bold tracking-tight text-teal-900 sm:text-4xl">Talking Speed Test</h1>
            </div>
        </header>

        <div className="py-12 md:py-16">
            <div className="flex flex-col justify-center items-center">
                <h2 className="text-4xl sm:text-5xl font-bold text-teal-300 mb-6"> {wpm} WPM</h2>

                {/* Settings */}
                <div className="py-6 relative">
                    <button 
                      id="settingsButton" type="button" aria-controls="mobile-settings" aria-expanded="false" 
                      className="md:hidden rounded-xl text-lg bg-teal-400/10 text-teal-300 px-6 py-3 w-3xs mb-0.5 text-center cursor-pointer"
                      onClick={() => setIsModalVisible(true)}>
                        Test Settings
                    </button>
                    <div id="settingsList" className="absolute hidden md:relative z-10 md:flex flex-col md:flex-row justify-center w-3xs">
                        <button className="md:rounded-l-xl text-base sm:text-lg bg-teal-400/10 text-teal-900 hover:text-teal-300 hover:cursor-pointer px-6 py-3" onClick={() => handleModeSelect("Freestyle")}>Freestyle</button>
                        <button className="text-base sm:text-lg bg-teal-400/10 text-teal-900 hover:text-teal-300 hover:cursor-pointer px-6 py-3" onClick={() => handleModeSelect("Regular")}>Regular</button>
                        <button className="text-base sm:text-lg bg-teal-400/10 text-teal-900 hover:text-teal-300 hover:cursor-pointer px-6 py-3" onClick={() => handleModeSelect("Custom")}>Custom</button>
                        <button className="md:rounded-r-xl text-base sm:text-lg bg-teal-400/10 text-teal-900 hover:text-teal-300 hover:cursor-pointer px-6 py-3" onClick={() => handleModeSelect("Metronome")}>Metronome</button>
                    </div>
                </div>

                {/* Play Button */}
                <button id="play-button" className={isRecording ? "rounded-full bg-red-400/10" : "rounded-full bg-teal-400/10"} >
                  <PlayButtonSVG 
                    id="play-icon" 
                    onClick={handlePlayClick}
                    className="scale-90"
                  />
                </button>
            </div>

            {/* Text to Read */}
            <div className="my-3 py-6 bg-teal-400/10 md:px-8 px-6 border-teal-400/10 rounded-3xl">
                <div className="text-xl text-teal-300/90 leading-relaxed antialiased">{sampleText}</div>
            </div>

            {/* Transcript */}
            <div className="py-6 bg-teal-400/10 md:px-8 px-6 border-teal-400/10 rounded-3xl">
                <h3 className="text-xl font-semibold mb-2 text-teal-200">Transcript</h3>
                <div id="speech-transcript" className="text-lg text-slate-200 leading-snug whitespace-pre-wrap"></div>
            </div>

        </div>
    </div>

    </div>
  )
}

export default App