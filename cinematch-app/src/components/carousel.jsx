import { useState } from "react";
import { View, TouchableOpacity, Dimensions, StyleSheet, Image } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import { useNavigation } from '@react-navigation/native';


const PAGE_WIDTH = Dimensions.get('window').width;

function Parallax({list}) {
  const [isVertical, setIsVertical] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const [pagingEnabled, setPagingEnabled] = useState(true);
  const [snapEnabled, setSnapEnabled] = useState(true);
  const progressValue = useSharedValue(0);
  const baseOptions = isVertical
    ? {
      vertical: true,
    }
    : 
    {
      vertical: false,
      width: PAGE_WIDTH,
      height: PAGE_WIDTH * 0.6,
    };

    const navigation = useNavigation();

    const handlePress = (object) => {
      navigation.navigate('MovieDetails', { object });
    };

  return (
    <View
      style={{
        alignItems: "center",
      }}
    >
      <Carousel 
            width={200}
            height={300}
            vertical={false}
            loop
            pagingEnabled={pagingEnabled}
            snapEnabled={snapEnabled}
            autoPlay={autoPlay}
            autoPlayInterval={1500}
            onProgressChange={(_, absoluteProgress) =>
                (progressValue.value = absoluteProgress)
            }
            mode="parallax"
            modeConfig={{
                parallaxScrollingScale: 0.9,
                parallaxScrollingOffset: 50,
            }}

            data={list}
            scrollAnimationDuration={1000}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handlePress(item)} style={{flex: 1,  flexDirection: "row" }}>
                    <Image style={styles.img} source={{ uri: `https://image.tmdb.org/t/p/original/${item.img}` }} />
                </TouchableOpacity>
            )}
        /> 
    </View>
  );
}


export default Parallax;


const styles = StyleSheet.create({
   
    img: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
    }
})