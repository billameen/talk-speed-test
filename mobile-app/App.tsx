import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  SafeAreaView,
} from 'react-native';
import Svg, { Path, G } from 'react-native-svg';

type Mode = 'Freestyle' | 'Regular' | 'Custom' | 'Metronome';

const TalkingSpeedTest: React.FC = () => {
  const [wpm, setWpm] = useState<string>('--');
  const [selectedMode, setSelectedMode] = useState<Mode>('Regular');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [isRecording, setIsRecording] = useState<boolean>(false);

  const modes: Mode[] = ['Freestyle', 'Regular', 'Custom', 'Metronome'];

  const sampleText = `Origami offers numerous benefits that extend beyond mere artistic expression. Engaging in this intricate paper-folding art enhances fine motor skills and hand-eye coordination, making it a valuable activity for individuals of all ages. Additionally, origami fosters creativity and problem-solving abilities, as practitioners must visualize and execute complex designs. The meditative nature of folding paper can also promote relaxation and reduce stress, contributing to overall mental well-being. Furthermore, origami serves as an educational tool, helping to teach concepts in mathematics and geometry through practical application, thereby enriching cognitive development.`;

  const PlayIcon: React.FC = () => (
    <Svg width={80} height={80} viewBox="0 0 60 60">
      <G fill="#0b4f4a">
        <Path d="M45.563,29.174l-22-15c-0.307-0.208-0.703-0.231-1.031-0.058C22.205,14.289,22,14.629,22,15v30   c0,0.371,0.205,0.711,0.533,0.884C22.679,45.962,22.84,46,23,46c0.197,0,0.394-0.059,0.563-0.174l22-15   C45.836,30.64,46,30.331,46,30S45.836,29.36,45.563,29.174z M24,43.107V16.893L43.225,30L24,43.107z"/>
        <Path d="M30,0C13.458,0,0,13.458,0,30s13.458,30,30,30s30-13.458,30-30S46.542,0,30,0z M30,58C14.561,58,2,45.439,2,30   S14.561,2,30,2s28,12.561,28,28S45.439,58,30,58z"/>
      </G>
    </Svg>
  );

  const handleModeSelect = (mode: Mode): void => {
    setSelectedMode(mode);
    setIsModalVisible(false);
  };

  const handlePlayPress = (): void => {
    setIsRecording(!isRecording);
    // Here you would implement speech recognition logic
    if (!isRecording) {
      setTranscript('Recording started...');
      setWpm('120'); // Example WPM
    } else {
      setTranscript('Recording stopped.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Talking Speed Test</Text>
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* WPM Display */}
          <Text style={styles.wpmText}>{wpm} WPM</Text>

          {/* Settings Section */}
          <View style={styles.settingsSection}>
            <TouchableOpacity
              style={styles.settingsButton}
              onPress={() => setIsModalVisible(true)}
            >
              <Text style={styles.settingsButtonText}>Test Settings</Text>
            </TouchableOpacity>
          </View>

          {/* Play Button */}
          <TouchableOpacity
            style={[styles.playButton, isRecording && styles.recordingButton]}
            onPress={handlePlayPress}
          >
            <PlayIcon />
          </TouchableOpacity>

          {/* Text to Read */}
          <View style={styles.textContainer}>
            <Text style={styles.sampleText}>{sampleText}</Text>
          </View>

          {/* Transcript */}
          <View style={styles.transcriptContainer}>
            <Text style={styles.transcriptTitle}>Transcript</Text>
            <Text style={styles.transcriptText}>{transcript}</Text>
          </View>
        </View>

        {/* Settings Menu */}
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setIsModalVisible(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setIsModalVisible(false)}
          >
            <View style={styles.modalContent}>
              {modes.map((mode, index) => (
                <TouchableOpacity
                  key={mode}
                  style={[
                    styles.modalButton,
                    index === 0 && styles.firstModalButton,
                    index === modes.length - 1 && styles.lastModalButton,
                  ]}
                  onPress={() => handleModeSelect(mode)}
                >
                  <Text style={styles.modalButtonText}>{mode}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};



/*
Hex to tailwind for future reference:
#0f172a   -> bg-slate-900
#0b4f4a   -> text-teal-900
#2dd4bf   -> text-teal-300
#2dd4bf1a -> bg-teal-400/10
#2dd4bfe6 -> bg-teal-300/90
*/
const styles = StyleSheet.create({
  // General styling
  container: {
    flex: 1,
    backgroundColor: '#0f172a', // bg-slate-900
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0b4f4a', // text-teal-900
    textAlign: 'center',
  },
  mainContent: {
    alignItems: 'center',
    flex: 1,
  },
  wpmText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#2dd4bf', // text-teal-300
    marginBottom: 24,
  },


  // Settings styling
  settingsSection: {
    marginBottom: 24,
  },
  settingsButton: {
    backgroundColor: '#2dd4bf1a', // bg-teal-400/10
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    minWidth: 200,
    alignItems: 'center',
  },
  settingsButtonText: {
    color: '#2dd4bf', // text-teal-300
    fontSize: 18,
  },


  // Play button styling 
  playButton: {
    backgroundColor: '#2dd4bf1a', // bg-teal-400/10
    borderRadius: 50,
    padding: 10,
    marginBottom: 32,
  },
  recordingButton: {
    backgroundColor: '#ef444433', // Red tint when recording - bg-red-500/20
  },


  // Sample text styling
  textContainer: {
    backgroundColor: '#2dd4bf1a', // bg-teal-400/10
    padding: 32,
    borderRadius: 24,
    marginBottom: 24,
    width: '100%',
  },
  sampleText: {
    fontSize: 18,
    color: '#2dd4bfe6', // text-teal-300/90
    lineHeight: 28,
  },


  // Transcript styling
  transcriptContainer: {
    backgroundColor: '#2dd4bf1a', // bg-teal-400/10
    padding: 32,
    borderRadius: 24,
    width: '100%',
  },
  transcriptTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#bfdbfe', // text-teal-200
    marginBottom: 8,
  },
  transcriptText: {
    fontSize: 16,
    color: '#cbd5e1', // text-slate-200
    lineHeight: 24,
    minHeight: 50,
  },


  // Settings modal styling
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#134e4a', // bg-teal-900
    borderRadius: 12,
    overflow: 'hidden',
    minWidth: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalButton: {
    backgroundColor: '#0d9488', // bg-teal-600
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2dd4bf1a', // bg-teal-400/10
  },
  firstModalButton: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2dd4bf1a', // bg-teal-400/10
  },
  lastModalButton: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderBottomWidth: 0,
  },
  modalButtonText: {
    color: '#0b4f4a', // text-teal-900
    fontSize: 16,
    textAlign: 'center',
  },
});

export default TalkingSpeedTest;