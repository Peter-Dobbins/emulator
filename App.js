import { StyleSheet, Image, Text, View, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
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
import { AdMobBanner } from 'expo-ads-admob';




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

  useEffect(() => {
    if (!isLoading) {
      navigation.navigate('Disclaimer');
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <View>
        <Image source={require('./assets/pg1.jpg')} style={styles.loading} />
      </View>
    );
  }

  return null; // This will not be reached because we navigate away as soon as isLoading is false
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
    <View style={styles.scrollContainerDis} >
      <ScrollView style={styles.termsScrollView} nestedScrollEnabled={true}>
        <Text>Terms of Use for Beat Box: Box to the Beat!</Text>

<Text>1. Acceptance of Terms</Text>  

<Text>By accessing and using Beat Box: Box to the Beat!, you agree to comply with and be bound by these Terms of Use. If you do not agree to these terms, please do not use the app.</Text>

<Text>2. Description of Service</Text>

<Text>Beat Box: Box to the Beat! provides users with audio guidance, including music and punching sounds, to assist in their boxing workouts. The app is intended for entertainment and general fitness purposes only.</Text>

<Text>3. Health and Safety Precautions </Text>

<Text>Before beginning any workout, users must:</Text>

<Text>Consult with a healthcare professional or physician to ensure that they are fit for physical activity.</Text>
<Text>Warm up properly to prepare the body for exercise.</Text>
<Text>Stretch to prevent injuries.</Text>
<Text>If using a punching bag, always wear hand wraps, boxing gloves and any other appropriate protective gear.</Text>

<Text>4. Limitation of Liability</Text>

<Text>Users understand and agree that:</Text>

<Text>They are using Beat Box: Box to the Beat! at their own risk.</Text>
<Text>They are solely responsible for any damage to their property, injury to themselves, or third parties resulting from the use of this app.</Text>
<Text>Stix&Stones Productions, or Peter Robert Dobbins, shall not be liable for any direct, indirect, incidental, special, or consequential damages, including but not limited to, damages for loss of profits, goodwill, use, data, or other intangible losses resulting from the use of the app.</Text>

<Text>5. No Warranty</Text>

<Text>Beat Box: Box to the Beat! is provided "as is" without any warranty of any kind, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement.</Text>

<Text>6. Indemnification</Text>

<Text>Users agree to indemnify and hold harmless Stix&Stones Productions and/or Peter Robert Dobbins, its officers, directors, employees, and agents from and against any claims, actions, demands, liabilities, judgments, and settlements, including without limitation, reasonable legal fees resulting from or alleged to result from their use of Beat Box: Box to the Beat.</Text>

<Text>7. Modification of Terms</Text>

<Text>Stix&Stones Productions and/or Peter Robert Dobbins reserves the right to change or modify these Terms of Use at any time without notice. Users are responsible for regularly reviewing these terms. Continued use of Beat Box: Box to the Beat! after any such changes constitutes the user's consent to such changes.</Text>

<Text>8. Governing Law</Text>

<Text>These Terms of Use shall be governed by and construed in accordance with the laws of the United Kingdom, without regard to its conflict of law principles.</Text>

<Text>9. Contact</Text>

<Text>For any questions regarding these Terms of Use, please contact stix_stones_productions@yahoo.com.</Text>
      </ScrollView>
      <View style={styles.checkboxContainer}>
      <CustomCheckBox isChecked={isChecked} onValueChange={setIsChecked}
/>
        <Text>I have read and accept the terms of use.</Text>
      </View>
      <View style={styles.button2}><TouchableOpacity style={styles.button1} onPress={handleButtonPress}>
        <Image style={styles.button} source={require('./assets/donotpress.jpg')} />
      </TouchableOpacity></View>
    </View>
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
      <SafeAreaView>
        <AdMobBanner
          bannerSize="fullBanner"
          adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ad unit ID
          onDidFailToReceiveAdWithError={error => console.error(error)}
        />
      </SafeAreaView>
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
        <Stack.Screen name="Disclaimer" component={Disclaimer} />
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
  loading: {
    width: "100%",
    height: "100%",
  },

  scrollContainerDis: {
    flex: 1,
    padding: '10%',
  
    
  },
  termsScrollView: {
     // Adjust this value based on your preference
     maxHeight: '90%', // Adjust this value based on your preference
     borderColor: 'gray',
     borderWidth: 1,
     marginBottom: '5%',
     marginTop: '10%',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  button: {
    width: '100%',
    height: '100%',
    borderRadius: 100 ,
    alignSelf: 'center',
    marginTop: '50%',
    marginBottom: '10%',
  },
  button1: {
    width: '40%',
    height: '40%',
    alignSelf: 'center',
    
  },
  button2: {
    width: '100%',
    
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