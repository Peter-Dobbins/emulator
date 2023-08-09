import { StyleSheet, Image, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import ImageWithShadow from './ImageWithShadow';
import { Audio } from 'expo-av';
import { Video, ResizeMode } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomCheckBox from './CustomCheckBox';




const FirstLoadScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  // Minimum loading time in milliseconds
  const minimumLoadingTime = 1500;

  useEffect(() => {
    // Load the custom font
    async function loadFont() {
      await Font.loadAsync({
        'CustomFont': require('./assets/one.ttf'),
        'AnotherCustomFont': require('./assets/two.ttf'), // Replace with the actual path to your custom font file
      });
      setIsLoading(false); // Set isLoading to false after the font is loaded
    }

    // Simulate a delay or any other logic before transitioning to the next screen
    const timer = setTimeout(() => {
      loadFont(); // Load the custom font after the minimum loading time
    }, minimumLoadingTime);

    return () => clearTimeout(timer); // Clear the timer if the component unmounts before the minimum loading time
  }, []);

  if (isLoading) {
    return (
      <View>
        <Image source={require('./assets/pg1.jpg')} style={styles.loading} />
      </View>
    );
  }

  // Return the next screen/component you want to navigate to after the loading screen
  return <Disclaimer navigation={navigation} />;
};







const TERMS_ACCEPTED_KEY = 'termsAccepted';

const Disclaimer = ({ navigation }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkTermsAccepted = async () => {
      const value = await AsyncStorage.getItem(TERMS_ACCEPTED_KEY);
      if (value === 'true') {
        navigation.navigate('Home');
      } else {
        setIsLoading(false);
      }
    };

    checkTermsAccepted();
  }, [navigation]);

  const handleButtonPress = async () => {
    if (isChecked) {
      await AsyncStorage.setItem(TERMS_ACCEPTED_KEY, 'true');
      navigation.navigate('Home');
    } else {
      alert('Please read and accept the terms of use before proceeding.');
    }
  };

  if (isLoading) {
    return null; // or you can return a loading spinner if you have one
  }

  return (
    <ScrollView style={styles.scrollContainerDis}>
      <ScrollView style={styles.termsScrollView}>
        <Text style={styles.Para1}>This app is in the beta stage of development at the moment and is <Text style={styles.Red}>not</Text> ready for public consumption!</Text>
        {/* ... other paragraphs ... */}
        <Text style={styles.Para8}>By entering the app you agree to these terms!</Text>
      </ScrollView>
      <View style={styles.checkboxContainer}>
        <CustomCheckBox
          value={isChecked}
          onValueChange={setIsChecked}
        />
        <Text>I have read and accept the terms of use.</Text>
      </View>
      <TouchableOpacity onPress={handleButtonPress}>
        <Image style={styles.button} source={require('./assets/donotpress.jpg')} />
      </TouchableOpacity>
    </ScrollView>
  );
};
  
// this is the screen after the disclaimer 


































const HomeScreen = () => {
  const navigation = useNavigation();

  const handleButtonPress = () => {
    navigation.navigate('Instructions');
  };
  const handleButtonPress1 = () => {
    navigation.navigate('Artists');
  };
  const handleButtonPress2 = () => {
    navigation.navigate('Levels');
  };
  
  return (
    <View style={styles.container2}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <TouchableOpacity onPress={handleButtonPress} style={styles.imageWrapper2}>
          <Image style={styles.homeImage1} source={require('./assets/instructions1.png')} resizeMode="contain"/>
        </TouchableOpacity>
  
        <TouchableOpacity onPress={handleButtonPress1} style={styles.imageWrapper3}>
          <Image style={styles.homeImage2} source={require('./assets/artists1.png')} resizeMode="contain"/>
        </TouchableOpacity>
  
        <TouchableOpacity onPress={handleButtonPress2} style={styles.imageWrapper4}>
          <Image style={styles.homeImage3} source={require('./assets/levels1.png')}  resizeMode="contain"/>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const Instructions = () => {
 
  return (
     <View style={styles.instCont}>
      <ScrollView>
      <Text style={styles.pt}>Watch the video!</Text>
        <Video
      source={require('./assets/vid.mp4')}
      style={styles.video}
      useNativeControls
      resizeMode={ResizeMode.CONTAIN}
    />

        <Text style={styles.pt2}>Or read the instructions!</Text>
        <Text style={styles.pt3}>You will hit the bag eight times around. So whatever combination you’re on, there will be 8.</Text>
        <Text style={styles.pt4}>1) 8 straight left hands.</Text>
        <Text style={styles.pt4}>2) 8 straight left, straight right(1-2)</Text>
        <Text style={styles.pt4}>3) 8 1-2, left-hook</Text>
        <Text style={styles.pt4}>4) 8 1-2, left-hook, right-hook</Text>
        <Text style={styles.pt4}>5) 8 1-2, left-hook, right-hook, left-hook-to-the-body,</Text>
        <Text style={styles.pt4}>6) 8 1-2, left-hook, right-hook, left-hook-to-the-body, right-hook-to-the-body</Text>
        <Text style={styles.pt4}>7) 8 1-2, left-hook, right-hook, left-hook-to-the-body, right-hook-to-the-body, left-hook.</Text>
        <Text style={styles.pt4}>8) 8 1-2, left-hook, right-hook, left-hook-to-the-body, right-hook-to-the-body, left-hook, right-hook</Text>
        </ScrollView>
    </View>
  

  )};

  const Artists = () => {

    const navigation = useNavigation();
  const handleButtonPress = () => {
    navigation.navigate('Aisha');
  }
  const handleButtonPress2 = () => {
    navigation.navigate('DayG');
  }
  const handleButtonPress3 = () => {
    navigation.navigate('Lola');
  }
  return (
    <View style={styles.artCont}>
      <ScrollView>
      
        <TouchableOpacity style={styles.artTouch} onPress={handleButtonPress}>
        <Text style={styles.artText}>Aisha</Text>
          <ImageWithShadow 
            imageSource={require('./assets/tech.jpg')}
            customStyles={styles.image}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.artTouch2} onPress={handleButtonPress2}>
        <Text style={styles.artText}>DayG</Text>
          <ImageWithShadow 
            imageSource={require('./assets/hip.jpg')}
            customStyles={styles.image}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.artTouch3} onPress={handleButtonPress3}>
        <Text style={styles.artText}>Lola</Text>
          <ImageWithShadow 
            imageSource={require('./assets/spain.jpg')}
            customStyles={styles.image}
          />
        </TouchableOpacity>
      </ScrollView>
    </View>
       
  
    )};
  
  
  
  
  
    const Levels = () => {
      const navigation = useNavigation();
    
      const handleButtonPress1 = () => {
        navigation.navigate('Easy');
      }
      const handleButtonPress2 = () => {
        navigation.navigate('Tough');
      }
      const handleButtonPress3 = () => {
        navigation.navigate('Smash');
      }
    
      return (
        <View style={styles.cont}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <TouchableOpacity onPress={handleButtonPress1} style={styles.levelsWrapper1}>
            <Image style={styles.levelsImage1} source={require('./assets/easy.png')} resizeMode="contain"/>
          </TouchableOpacity>
    
          <TouchableOpacity onPress={handleButtonPress2} style={styles.levelsWrapper2}>
            <Image style={styles.levelsImage2} source={require('./assets/tough.png')} resizeMode="contain"/>
          </TouchableOpacity>
    
          <TouchableOpacity onPress={handleButtonPress3} style={styles.levelsWrapper3}>
            <Image style={styles.levelsImage3} source={require('./assets/smash.png')}  resizeMode="contain"/>
          </TouchableOpacity>
        </ScrollView>
      </View>
      );
    };
    const Aisha = () => {
      const audioFile = require('./assets/DnB1.mp3');
      const secondAudioFile = require('./assets/DnB2.mp3'); 
      const thirdAudioFile = require('./assets/Melodic_deep_house.mp3'); 
      const fourthAudioFile = require('./assets/Piano_House.mp3'); 
      const fithAudioFile = require('./assets/Driving_Techno.mp3'); 
    
      const sound = React.useRef(new Audio.Sound());
      const sound2 = React.useRef(new Audio.Sound());
      const sound3 = React.useRef(new Audio.Sound());
      const sound4 = React.useRef(new Audio.Sound());
      const sound5 = React.useRef(new Audio.Sound());
    
      const [isPlaying, setIsPlaying] = useState(false);
      const [isSecondPlaying, setIsSecondPlaying] = useState(false);
      const [isThirdPlaying, setIsThirdPlaying] = useState(false);
      const [isFourthPlaying, setIsFourthPlaying] = useState(false);
      const [isFithPlaying, setIsFithPlaying] = useState(false);
    
      useEffect(() => {
        // Set up the audio session configuration
        Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          staysActiveInBackground: true,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
        });
    
        return () => {
          // Unload the audio when the component unmounts
          sound.current.unloadAsync();
          sound2.current.unloadAsync();
          sound3.current.unloadAsync();
          sound4.current.unloadAsync();
          sound5.current.unloadAsync();
        };
      }, []);
    
      const handleAudioPlay = async () => {
        try {
          if (isPlaying) {
            await sound.current.stopAsync();
            setIsPlaying(false);
          } else {
            // Check if the sound is already loaded
            const status = await sound.current.getStatusAsync();
            if (!status.isLoaded) {
              await sound.current.loadAsync(audioFile);
            }
            await sound.current.playAsync();
            setIsPlaying(true);
          }
        } catch (error) {
          console.log('Error in Playing Audio:', error);
        }
      };
    
      const handleSecondAudioPlay = async () => {
        try {
          if (isSecondPlaying) {
            await sound2.current.stopAsync();
            setIsSecondPlaying(false);
          } else {
            // Check if the sound is already loaded
            const status = await sound2.current.getStatusAsync();
            if (!status.isLoaded) {
              await sound2.current.loadAsync(secondAudioFile);
            }
            await sound2.current.playAsync();
            setIsSecondPlaying(true);
          }
        } catch (error) {
          console.log('Error in Playing Second Audio:', error);
        }
      };

      const handleThirdAudioPlay = async () => {
        try {
          if (isThirdPlaying) {
            await sound3.current.stopAsync();
            setIsThirdPlaying(false);
          } else {
            // Check if the sound is already loaded
            const status = await sound3.current.getStatusAsync();
            if (!status.isLoaded) {
              await sound3.current.loadAsync(thirdAudioFile);
            }
            await sound3.current.playAsync();
            setIsThirdPlaying(true);
          }
        } catch (error) {
          console.log('Error in Playing Second Audio:', error);
        }
      };

      const handleFourthAudioPlay = async () => {
        try {
          if (isFourthPlaying) {
            await sound4.current.stopAsync();
            setIsFourthPlaying(false);
          } else {
            // Check if the sound is already loaded
            const status = await sound4.current.getStatusAsync();
            if (!status.isLoaded) {
              await sound4.current.loadAsync(fourthAudioFile);
            }
            await sound4.current.playAsync();
            setIsFourthPlaying(true);
          }
        } catch (error) {
          console.log('Error in Playing Second Audio:', error);
        }
      };
      const handleFithAudioPlay = async () => {
        try {
          if (isFithPlaying) {
            await sound5.current.stopAsync();
            setIsFithPlaying(false);
          } else {
            // Check if the sound is already loaded
            const status = await sound5.current.getStatusAsync();
            if (!status.isLoaded) {
              await sound5.current.loadAsync(fithAudioFile);
            }
            await sound5.current.playAsync();
            setIsFithPlaying(true);
          }
        } catch (error) {
          console.log('Error in Playing Second Audio:', error);
        }
      };
    
      return (
        <LinearGradient colors={['#09FF05', '#309ABC']} style={styles.gradientContainer}>
          <ScrollView>
          
          <View>
              <View style={styles.sprite}>
                <ImageWithShadow
                  imageSource={require('./assets/sprite.jpg')}
                  customStyles={styles.image}
                />
              </View>
            
          </View>
          <View style={styles.playStopButton}>
            <TouchableOpacity onPress={handleAudioPlay}>
              {isPlaying ? <Image source={require('./assets/stop.png')} /> : <Image source={require('./assets/Play.png')} />}
            </TouchableOpacity>
          </View>
          <Text style={styles.spriteText}>Cry of the Fighting Sprite</Text>
          
          
          <View>
            
              <View style={styles.sprite}>
                <ImageWithShadow
                  imageSource={require('./assets/soul.jpg')} // Replace 'second_image.jpg' with the path to your second image
                  customStyles={styles.image}
                />
              </View>
            
          </View>
          <View style={styles.playStopButton}>
            <TouchableOpacity onPress={handleSecondAudioPlay}>
              {isSecondPlaying ? <Image source={require('./assets/stop.png')} /> : <Image source={require('./assets/Play.png')} />}
            </TouchableOpacity>
          </View>
          <Text style={styles.spriteText}>Soul Searcher</Text>
          
          
          
          
          
          <View>
            
              <View style={styles.sprite}>
                <ImageWithShadow
                  imageSource={require('./assets/fanfare.jpg')} // Replace 'second_image.jpg' with the path to your second image
                  customStyles={styles.image}
                />
              </View>
              </View>
              
              <View style={styles.playStopButton}>
            <TouchableOpacity onPress={handleThirdAudioPlay}>
              {isThirdPlaying ? <Image source={require('./assets/stop.png')} /> : <Image source={require('./assets/Play.png')} />}
            </TouchableOpacity>
          </View>
          
          
          <Text style={styles.spriteText}>The Final Fanfare</Text>
          
          <View style={styles.sprite}>
                <ImageWithShadow
                  imageSource={require('./assets/pianoman.jpg')} // Replace 'second_image.jpg' with the path to your second image
                  customStyles={styles.image}
                />
              </View>
              <View style={styles.playStopButton}>
            <TouchableOpacity onPress={handleFourthAudioPlay}>
              {isFourthPlaying ? <Image source={require('./assets/stop.png')} /> : <Image source={require('./assets/Play.png')} />}
            </TouchableOpacity>
          </View>
          <Text style={styles.spriteText}>Pianist of Dreams</Text>


          <View style={styles.sprite}>
                <ImageWithShadow
                  imageSource={require('./assets/deamon.jpg')} // Replace 'second_image.jpg' with the path to your second image
                  customStyles={styles.image}
                />
              </View>
              <View style={styles.playStopButton}>
            <TouchableOpacity onPress={handleFithAudioPlay}>
              {isFithPlaying ? <Image source={require('./assets/stop.png')} /> : <Image source={require('./assets/Play.png')} />}
            </TouchableOpacity>
          </View>
          <Text style={styles.spriteText}>Demons' Beat</Text>
         
          
          </ScrollView>
        </LinearGradient>
      );
    };

const DayG = () => {
  const audioFile = require('./assets/hhdpt.mp3');
   

  const sound = React.useRef(new Audio.Sound());
 

  const [isPlaying, setIsPlaying] = useState(false);
  

  useEffect(() => {
    // Set up the audio session configuration
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: true,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    });

    return () => {
      // Unload the audio when the component unmounts
      sound.current.unloadAsync();
     
    };
  }, []);

  const handleAudioPlay = async () => {
    try {
      if (isPlaying) {
        await sound.current.stopAsync();
        setIsPlaying(false);
      } else {
        // Check if the sound is already loaded
        const status = await sound.current.getStatusAsync();
        if (!status.isLoaded) {
          await sound.current.loadAsync(audioFile);
        }
        await sound.current.playAsync();
        setIsPlaying(true);
      }
    } catch (error) {
      console.log('Error in Playing Audio:', error);
    }
  };

  

  

  
  

  return (
    <LinearGradient colors={['#01BFCD', '#233947']} style={styles.gradientContainer}>
      <ScrollView>
      
      <View>
          <View style={styles.sprite}>
            <ImageWithShadow
              imageSource={require('./assets/rap1.jpg')}
              customStyles={styles.image}
            />
          </View>
        
      </View>
      <View style={styles.playStopButton}>
        <TouchableOpacity onPress={handleAudioPlay}>
          {isPlaying ? <Image source={require('./assets/stop.png')} /> : <Image source={require('./assets/Play.png')} />}
        </TouchableOpacity>
      </View>
      <Text style={styles.spriteText}>The Truth is Within</Text>
      
      
     
      
     
      
     

     
     
      
      </ScrollView>
    </LinearGradient>
  );
};

const Lola = () => {
  const audioFile = require('./assets/Latin_Pop_Easy.mp3');
  const secondAudioFile = require('./assets/Tropical_House.mp3'); 
  const thirdAudioFile = require('./assets/Latin_Hard.mp3'); 
  

  const sound = React.useRef(new Audio.Sound());
  const sound2 = React.useRef(new Audio.Sound());
  const sound3 = React.useRef(new Audio.Sound());


  const [isPlaying, setIsPlaying] = useState(false);
  const [isSecondPlaying, setIsSecondPlaying] = useState(false);
  const [isThirdPlaying, setIsThirdPlaying] = useState(false);
  

  useEffect(() => {
    // Set up the audio session configuration
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: true,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    });

    return () => {
      // Unload the audio when the component unmounts
      sound.current.unloadAsync();
      sound2.current.unloadAsync();
      sound3.current.unloadAsync();
    };
  }, []);

  const handleAudioPlay = async () => {
    try {
      if (isPlaying) {
        await sound.current.stopAsync();
        setIsPlaying(false);
      } else {
        // Check if the sound is already loaded
        const status = await sound.current.getStatusAsync();
        if (!status.isLoaded) {
          await sound.current.loadAsync(audioFile);
        }
        await sound.current.playAsync();
        setIsPlaying(true);
      }
    } catch (error) {
      console.log('Error in Playing Audio:', error);
    }
  };

  const handleSecondAudioPlay = async () => {
    try {
      if (isSecondPlaying) {
        await sound2.current.stopAsync();
        setIsSecondPlaying(false);
      } else {
        // Check if the sound is already loaded
        const status = await sound2.current.getStatusAsync();
        if (!status.isLoaded) {
          await sound2.current.loadAsync(secondAudioFile);
        }
        await sound2.current.playAsync();
        setIsSecondPlaying(true);
      }
    } catch (error) {
      console.log('Error in Playing Second Audio:', error);
    }
  };

  const handleThirdAudioPlay = async () => {
    try {
      if (isThirdPlaying) {
        await sound3.current.stopAsync();
        setIsThirdPlaying(false);
      } else {
        // Check if the sound is already loaded
        const status = await sound3.current.getStatusAsync();
        if (!status.isLoaded) {
          await sound3.current.loadAsync(thirdAudioFile);
        }
        await sound3.current.playAsync();
        setIsThirdPlaying(true);
      }
    } catch (error) {
      console.log('Error in Playing Second Audio:', error);
    }
  };

  
  

  return (
    <LinearGradient colors={['#FFF98D', '#AFCCD5', '#D1B784' ]} style={styles.gradientContainer}>
      <ScrollView>
      
      <View>
          <View style={styles.sprite}>
            <ImageWithShadow
              imageSource={require('./assets/stomp.jpg')}
              customStyles={styles.image}
            />
          </View>
        
      </View>
      <View style={styles.playStopButton}>
        <TouchableOpacity onPress={handleAudioPlay}>
          {isPlaying ? <Image source={require('./assets/stop.png')} /> : <Image source={require('./assets/Play.png')} />}
        </TouchableOpacity>
      </View>
      <Text style={styles.spriteText}>Sunshine Stomp</Text>
      
      
      <View>
        
          <View style={styles.sprite}>
            <ImageWithShadow
              imageSource={require('./assets/godess.jpg')} // Replace 'second_image.jpg' with the path to your second image
              customStyles={styles.image}
            />
          </View>
        
      </View>
      <View style={styles.playStopButton}>
        <TouchableOpacity onPress={handleSecondAudioPlay}>
          {isSecondPlaying ? <Image source={require('./assets/stop.png')} /> : <Image source={require('./assets/Play.png')} />}
        </TouchableOpacity>
      </View>
      <Text style={styles.spriteText}>Battle of Sand and Sea</Text>
      
      
      
      
      
      <View>
        
          <View style={styles.sprite}>
            <ImageWithShadow
              imageSource={require('./assets/spanguitar.jpg')} // Replace 'second_image.jpg' with the path to your second image
              customStyles={styles.image}
            />
          </View>
          </View>
          
          <View style={styles.playStopButton}>
        <TouchableOpacity onPress={handleThirdAudioPlay}>
          {isThirdPlaying ? <Image source={require('./assets/stop.png')} /> : <Image source={require('./assets/Play.png')} />}
        </TouchableOpacity>
      </View>
      
      
      <Text style={styles.spriteText}>Guitarra Española</Text>
      
      


     
      
      </ScrollView>
    </LinearGradient>
  );
};

const Easy = () => {
  const audioFile = require('./assets/Latin_Pop_Easy.mp3');
  const secondAudioFile = require('./assets/Melodic_deep_house.mp3'); 
  const thirdAudioFile = require('./assets/hhdpt.mp3'); 

  
  

  const sound = React.useRef(new Audio.Sound());
  const sound2 = React.useRef(new Audio.Sound());
  const sound3 = React.useRef(new Audio.Sound());


  const [isPlaying, setIsPlaying] = useState(false);
  const [isSecondPlaying, setIsSecondPlaying] = useState(false);
  const [isThirdPlaying, setIsThirdPlaying] = useState(false);
  

  useEffect(() => {
    // Set up the audio session configuration
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: true,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    });

    return () => {
      // Unload the audio when the component unmounts
      sound.current.unloadAsync();
      sound2.current.unloadAsync();
      sound3.current.unloadAsync();
    };
  }, []);

  const handleAudioPlay = async () => {
    try {
      if (isPlaying) {
        await sound.current.stopAsync();
        setIsPlaying(false);
      } else {
        // Check if the sound is already loaded
        const status = await sound.current.getStatusAsync();
        if (!status.isLoaded) {
          await sound.current.loadAsync(audioFile);
        }
        await sound.current.playAsync();
        setIsPlaying(true);
      }
    } catch (error) {
      console.log('Error in Playing Audio:', error);
    }
  };

  const handleSecondAudioPlay = async () => {
    try {
      if (isSecondPlaying) {
        await sound2.current.stopAsync();
        setIsSecondPlaying(false);
      } else {
        // Check if the sound is already loaded
        const status = await sound2.current.getStatusAsync();
        if (!status.isLoaded) {
          await sound2.current.loadAsync(secondAudioFile);
        }
        await sound2.current.playAsync();
        setIsSecondPlaying(true);
      }
    } catch (error) {
      console.log('Error in Playing Second Audio:', error);
    }
  };

  const handleThirdAudioPlay = async () => {
    try {
      if (isThirdPlaying) {
        await sound3.current.stopAsync();
        setIsThirdPlaying(false);
      } else {
        // Check if the sound is already loaded
        const status = await sound3.current.getStatusAsync();
        if (!status.isLoaded) {
          await sound3.current.loadAsync(thirdAudioFile);
        }
        await sound3.current.playAsync();
        setIsThirdPlaying(true);
      }
    } catch (error) {
      console.log('Error in Playing Second Audio:', error);
    }
  };

  
  

  return (
    <LinearGradient colors={['#FFEC69', '#99D98B' ]} style={styles.gradientContainer}>
      <ScrollView>
      
      <View>
          <View style={styles.sprite}>
            <ImageWithShadow
              imageSource={require('./assets/stomp.jpg')}
              customStyles={styles.image}
            />
          </View>
        
      </View>
      <View style={styles.playStopButton}>
        <TouchableOpacity onPress={handleAudioPlay}>
          {isPlaying ? <Image source={require('./assets/stop.png')} /> : <Image source={require('./assets/Play.png')} />}
        </TouchableOpacity>
      </View>
      <Text style={styles.spriteText}>Sunshine Stomp</Text>
      
      
      <View>
        
          <View style={styles.sprite}>
            <ImageWithShadow
              imageSource={require('./assets/fanfare.jpg')} // Replace 'second_image.jpg' with the path to your second image
              customStyles={styles.image}
            />
          </View>
        
      </View>
      <View style={styles.playStopButton}>
        <TouchableOpacity onPress={handleSecondAudioPlay}>
          {isSecondPlaying ? <Image source={require('./assets/stop.png')} /> : <Image source={require('./assets/Play.png')} />}
        </TouchableOpacity>
      </View>
      <Text style={styles.spriteText}>The Final Fanfare</Text>
      
      
      
      
      
      <View>
        
          <View style={styles.sprite}>
            <ImageWithShadow
              imageSource={require('./assets/rap1.jpg')} // Replace 'second_image.jpg' with the path to your second image
              customStyles={styles.image}
            />
          </View>
          </View>
          
          <View style={styles.playStopButton}>
        <TouchableOpacity onPress={handleThirdAudioPlay}>
          {isThirdPlaying ? <Image source={require('./assets/stop.png')} /> : <Image source={require('./assets/Play.png')} />}
        </TouchableOpacity>
      </View>
      
      
      <Text style={styles.spriteText}>The Truth is Within</Text>
      
      


     
      
      </ScrollView>
    </LinearGradient>
  );
};

const Tough = () => {
  const audioFile = require('./assets/Tropical_House.mp3');
  const secondAudioFile = require('./assets/DnB1.mp3'); 
  const thirdAudioFile = require('./assets/DnB2.mp3'); 
  const fourthAudioFile = require('./assets/Latin_Hard.mp3'); 
  

  const sound = React.useRef(new Audio.Sound());
  const sound2 = React.useRef(new Audio.Sound());
  const sound3 = React.useRef(new Audio.Sound());
  const sound4 = React.useRef(new Audio.Sound());
  

  const [isPlaying, setIsPlaying] = useState(false);
  const [isSecondPlaying, setIsSecondPlaying] = useState(false);
  const [isThirdPlaying, setIsThirdPlaying] = useState(false);
  const [isFourthPlaying, setIsFourthPlaying] = useState(false);
 

  useEffect(() => {
    // Set up the audio session configuration
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: true,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    });

    return () => {
      // Unload the audio when the component unmounts
      sound.current.unloadAsync();
      sound2.current.unloadAsync();
      sound3.current.unloadAsync();
      sound4.current.unloadAsync();
      
    };
  }, []);

  const handleAudioPlay = async () => {
    try {
      if (isPlaying) {
        await sound.current.stopAsync();
        setIsPlaying(false);
      } else {
        // Check if the sound is already loaded
        const status = await sound.current.getStatusAsync();
        if (!status.isLoaded) {
          await sound.current.loadAsync(audioFile);
        }
        await sound.current.playAsync();
        setIsPlaying(true);
      }
    } catch (error) {
      console.log('Error in Playing Audio:', error);
    }
  };

  const handleSecondAudioPlay = async () => {
    try {
      if (isSecondPlaying) {
        await sound2.current.stopAsync();
        setIsSecondPlaying(false);
      } else {
        // Check if the sound is already loaded
        const status = await sound2.current.getStatusAsync();
        if (!status.isLoaded) {
          await sound2.current.loadAsync(secondAudioFile);
        }
        await sound2.current.playAsync();
        setIsSecondPlaying(true);
      }
    } catch (error) {
      console.log('Error in Playing Second Audio:', error);
    }
  };

  const handleThirdAudioPlay = async () => {
    try {
      if (isThirdPlaying) {
        await sound3.current.stopAsync();
        setIsThirdPlaying(false);
      } else {
        // Check if the sound is already loaded
        const status = await sound3.current.getStatusAsync();
        if (!status.isLoaded) {
          await sound3.current.loadAsync(thirdAudioFile);
        }
        await sound3.current.playAsync();
        setIsThirdPlaying(true);
      }
    } catch (error) {
      console.log('Error in Playing Second Audio:', error);
    }
  };

  const handleFourthAudioPlay = async () => {
    try {
      if (isFourthPlaying) {
        await sound4.current.stopAsync();
        setIsFourthPlaying(false);
      } else {
        // Check if the sound is already loaded
        const status = await sound4.current.getStatusAsync();
        if (!status.isLoaded) {
          await sound4.current.loadAsync(fourthAudioFile);
        }
        await sound4.current.playAsync();
        setIsFourthPlaying(true);
      }
    } catch (error) {
      console.log('Error in Playing Second Audio:', error);
    }
  };
 

  return (
    <LinearGradient colors={['#99D98B', '#99D98B', '#99D98B', '#DF1932']} style={styles.gradientContainer}>
      <ScrollView>
      
      <View>
          <View style={styles.sprite}>
            <ImageWithShadow
              imageSource={require('./assets/godess.jpg')}
              customStyles={styles.image}
            />
          </View>
        
      </View>
      <View style={styles.playStopButton}>
        <TouchableOpacity onPress={handleAudioPlay}>
          {isPlaying ? <Image source={require('./assets/stop.png')} /> : <Image source={require('./assets/Play.png')} />}
        </TouchableOpacity>
      </View>
      <Text style={styles.spriteText}>Battle of Land and Sea</Text>
      
      
      <View>
        
          <View style={styles.sprite}>
            <ImageWithShadow
              imageSource={require('./assets/sprite.jpg')} // Replace 'second_image.jpg' with the path to your second image
              customStyles={styles.image}
            />
          </View>
        
      </View>
      <View style={styles.playStopButton}>
        <TouchableOpacity onPress={handleSecondAudioPlay}>
          {isSecondPlaying ? <Image source={require('./assets/stop.png')} /> : <Image source={require('./assets/Play.png')} />}
        </TouchableOpacity>
      </View>
      <Text style={styles.spriteText}>Cry of the Fighting Sprite</Text>
      
      
      
      
      
      <View>
        
          <View style={styles.sprite}>
            <ImageWithShadow
              imageSource={require('./assets/soul.jpg')} // Replace 'second_image.jpg' with the path to your second image
              customStyles={styles.image}
            />
          </View>
          </View>
          
          <View style={styles.playStopButton}>
        <TouchableOpacity onPress={handleThirdAudioPlay}>
          {isThirdPlaying ? <Image source={require('./assets/stop.png')} /> : <Image source={require('./assets/Play.png')} />}
        </TouchableOpacity>
      </View>
      
      
      <Text style={styles.spriteText}>Soul Searcher</Text>
      
      <View style={styles.sprite}>
            <ImageWithShadow
              imageSource={require('./assets/spanguitar.jpg')} // Replace 'second_image.jpg' with the path to your second image
              customStyles={styles.image}
            />
          </View>
          <View style={styles.playStopButton}>
        <TouchableOpacity onPress={handleFourthAudioPlay}>
          {isFourthPlaying ? <Image source={require('./assets/stop.png')} /> : <Image source={require('./assets/Play.png')} />}
        </TouchableOpacity>
      </View>
      <Text style={styles.spriteText}>Guitarra Española</Text>

      
      </ScrollView>
    </LinearGradient>
  );
};

const Smash = () => {
  const audioFile = require('./assets/Piano_House.mp3');
  const secondAudioFile = require('./assets/Driving_Techno.mp3'); 
  
  

  const sound = React.useRef(new Audio.Sound());
  const sound2 = React.useRef(new Audio.Sound());
  


  const [isPlaying, setIsPlaying] = useState(false);
  const [isSecondPlaying, setIsSecondPlaying] = useState(false);
  
  

  useEffect(() => {
    // Set up the audio session configuration
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: true,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    });

    return () => {
      // Unload the audio when the component unmounts
      sound.current.unloadAsync();
      sound2.current.unloadAsync();
      
    };
  }, []);

  const handleAudioPlay = async () => {
    try {
      if (isPlaying) {
        await sound.current.stopAsync();
        setIsPlaying(false);
      } else {
        // Check if the sound is already loaded
        const status = await sound.current.getStatusAsync();
        if (!status.isLoaded) {
          await sound.current.loadAsync(audioFile);
        }
        await sound.current.playAsync();
        setIsPlaying(true);
      }
    } catch (error) {
      console.log('Error in Playing Audio:', error);
    }
  };

  const handleSecondAudioPlay = async () => {
    try {
      if (isSecondPlaying) {
        await sound2.current.stopAsync();
        setIsSecondPlaying(false);
      } else {
        // Check if the sound is already loaded
        const status = await sound2.current.getStatusAsync();
        if (!status.isLoaded) {
          await sound2.current.loadAsync(secondAudioFile);
        }
        await sound2.current.playAsync();
        setIsSecondPlaying(true);
      }
    } catch (error) {
      console.log('Error in Playing Second Audio:', error);
    }
  };



  
  

  return (
    <LinearGradient colors={['#DF1932', '#000000' ]} style={styles.gradientContainer}>
      <ScrollView>
      
      <View>
          <View style={styles.sprite}>
            <ImageWithShadow
              imageSource={require('./assets/pianoman.jpg')}
              customStyles={styles.image}
            />
          </View>
        
      </View>
      <View style={styles.playStopButton}>
        <TouchableOpacity onPress={handleAudioPlay}>
          {isPlaying ? <Image source={require('./assets/stop.png')} /> : <Image source={require('./assets/Play.png')} />}
        </TouchableOpacity>
      </View>
      <Text style={styles.spriteText}>Pianist of Dreams</Text>
      
      
      <View>
        
          <View style={styles.sprite}>
            <ImageWithShadow
              imageSource={require('./assets/deamon.jpg')} // Replace 'second_image.jpg' with the path to your second image
              customStyles={styles.image}
            />
          </View>
        
      </View>
      <View style={styles.playStopButton}>
        <TouchableOpacity onPress={handleSecondAudioPlay}>
          {isSecondPlaying ? <Image source={require('./assets/stop.png')} /> : <Image source={require('./assets/Play.png')} />}
        </TouchableOpacity>
      </View>
      <Text style={styles.spriteText}>Demons' Beat</Text>
      
      
      
    
      


     
      
      </ScrollView>
    </LinearGradient>
  );
};

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FirstLoad" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="FirstLoad" component={FirstLoadScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Instructions" component={Instructions} />
        <Stack.Screen name="Artists" component={Artists} />
        <Stack.Screen name="Aisha" component={Aisha} />
        <Stack.Screen name="DayG" component={DayG} />
        <Stack.Screen name="Lola" component={Lola} />
        <Stack.Screen name="Levels" component={Levels} />
        <Stack.Screen name="Easy" component={Easy} />
        <Stack.Screen name="Tough" component={Tough} />
        <Stack.Screen name="Smash" component={Smash} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};






const styles = StyleSheet.create({

  scrollContainerDis: {
    flex: 1,
    padding: 10,
  },
  termsScrollView: {
    maxHeight: 200, // Adjust this value based on your preference
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },


  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 10,
   
  },
 
  loading: {
    width: "100%",
    height: "100%",
  },
  // Disclaimer screen
  Para1: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 90,
    lineHeight: 50,
    marginHorizontal: 2,
  },
  // for red text on disclaimer screen
  Red: {
    color: "red",
  },
  Para2: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 5,
    lineHeight: 50,
    marginHorizontal: 2,
    textDecorationLine: "underline",
  },
  Para3: {
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold",
    marginTop: 20,
    lineHeight: 50,
    marginHorizontal: 2,
    color: "red",
  },

  Para4: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    lineHeight: 50,
    marginHorizontal: 2,
  },
  Para5: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 5,
    lineHeight: 30,
    marginHorizontal: 2,
  },
  Para6: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    lineHeight: 30,
    marginHorizontal: 2,
  },
  Para7: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    lineHeight: 30,
    marginHorizontal: 2,
  },
  Para8: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    lineHeight: 30,
    marginHorizontal: 2,
  },

  button: {
    width: 140,
    height: 140,
    borderRadius: 100 ,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 60,
  },
  // This is all for the home screen where the user has the first options to select instructions artists and levels 
  container2: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: 'center',
},
  
imageWrapper2: {
  width: '100%',
  height: '33.33%', // Change the height to a percentage of the total height
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '10%',
},

imageWrapper3: {
  width: '100%',
  height: '33.33%', // Change the height to a percentage of the total height
  alignItems: 'center',
  justifyContent: 'center',
},

imageWrapper4: {
  width: '100%',
  height: '33.33%', // Change the height to a percentage of the total height
  alignItems: 'center',
  justifyContent: 'center',
},

homeImage1: {
    width: '130%',
    height: '100%',
    resizeMode: 'contain',
},

homeImage2: {
    width: '85%',
    height: '100%',
    resizeMode: 'contain',
    marginTop: '-15%',
},

homeImage3: {
    width: '150%',
    height: '100%',
    resizeMode: 'contain',
    marginBottom: '10%'

},

  

 // this is the instructions screen 

 instCont: {
  flex: 1,
  backgroundColor: "black",

 },
        pt: {
          color: "white",
          marginTop: 100,
          alignSelf: "center",
          fontSize: 50,
          fontFamily: 'CustomFont',
          
          },
      
      pt2: {
          color: "white",
          marginTop: 100,
          alignSelf: "center",
          fontSize: 45,
          fontFamily: 'AnotherCustomFont',
         
          },
      pt3: {
          color: "white",
          marginTop: "10%",
          alignSelf: "center",
          fontSize: 30,
          },
      pt4: {
          color: "white",
          marginTop: "10%",
         
          fontSize: 30,
          },
          
// this is for the Artists page
      
          
            artCont: {
              backgroundColor: "black",
              flex: 1,
            },
            artText: {
              color: 'white',
              alignSelf: 'center',
              fontFamily: 'CustomFont',
              fontSize: 50,
              

            },
            artTouch: {
              alignSelf: 'center',
              flex: 1,
              width: '60%',
              marginTop: '20%', 
              marginBottom: '10%',
              aspectRatio: 1,
            },
            artTouch2: {
              alignSelf: 'center',
              flex: 1,
              width: '60%',
              marginTop: '20%', 
              marginBottom: '10%',
              aspectRatio: 1,
            },
            artTouch3: {
              alignSelf: 'center',
              flex: 1,
              width: '60%',
              marginTop: '20%', 
              marginBottom: '30%',
              aspectRatio: 1,
            },
            image: {
              width: '100%',
              height: '100%',
              aspectRatio: 1, // This will make the images square
              borderRadius: 20,
            },
         
          
    
      










            // this is for the Aisha page, with my music!!
gradientContainer: {
  width: '100%',
  height: '100%',
  opacity: 0.9,
},
sprite: {
  alignSelf: 'center',
  width: '50%',
  marginTop: '20%', 
  marginBottom: '10%',
  aspectRatio: 1,
},

spriteText: {
  color: 'white',
  fontFamily: 'AnotherCustomFont',
  alignSelf: 'center',
  fontSize: 40,
},

playStopButton: {
  alignSelf: 'center',
},
















video: {
  width: '100%', // Set the width to take the full width of the container
    aspectRatio: 16 / 9, 
  alignSelf: 'center',
  marginTop: 100,


},


// for levels page 



  cont: {
    flex: 1,
  backgroundColor: "black",
  justifyContent: 'center',
  },
  
  levelsWrapper1:{
    width: '100%',
    height: '33.33%', // Change the height to a percentage of the total height
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10%',

  },

  levelsWrapper2:{
    width: '100%',
    height: '33.33%', // Change the height to a percentage of the total height
    alignItems: 'center',
    justifyContent: 'center',

  },

  levelsWrapper3:{
    width: '100%',
  height: '33.33%', // Change the height to a percentage of the total height
alignItems: 'center',
justifyContent: 'center',

  },




  levelsImage1: {
    width: '85%',
  height: '100%',
  resizeMode: 'contain',
    
  },
  levelsImage2: {
    width: '100%',
    height: '110%',
    resizeMode: 'contain',
    
  
    
  },
  levelsImage3: {
    width: '110%',
  height: '100%',
  resizeMode: 'contain',
  marginBottom: '10%'
    
    
  },



     


      
      
});


export default App;