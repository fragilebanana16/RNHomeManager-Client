import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  Animated,
  ToastAndroid,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { MaterialIcons } from '@expo/vector-icons';
const SolveDetail = ({ route, navigation }) => {
  const { productID } = route.params;

  const [product, setProduct] = useState({});
  const { showActionSheetWithOptions } = useActionSheet();


  const width = Dimensions.get('window').width;

  const scrollX = new Animated.Value(0);

  let position = Animated.divide(scrollX, width);

  const COLOURS = {
    white: '#ffffff',
    black: '#000000',
    green: '#00AC76',
    red: '#C04345',
    blue: '#0043F9',
    backgroundLight: '#F0F0F3',
    backgroundMedium: '#B9B9B9',
    backgroundDark: '#777777',
  };

  const Items = [
    {
      id: 1,
      category: 'product',
      productName: '停水',
      productPrice: 1799,
      description:
        '日常停水',
      isOff: true,
      offPercentage: 10,
      productImage: require('../../assets/images/nft06.jpeg'),
      isAvailable: true,
      productImageList: [
        require('../../assets/images/nft02.jpeg'),
        require('../../assets/images/nft03.jpeg'),
        require('../../assets/images/nft04.jpeg'),
      ],
      solutions: [
        { id: '1', solution: '检查水费充足', detail: '暂无', useful: 0 },
        { id: '2', solution: '检查水表电池电量', detail: '电池电量不够无法进行水量计量，建议更换电池', useful: 1 },
      ]
    },
    {
      id: 2,
      category: 'product',
      productName: 'boAt Rockerz 450 Bluetooth Headphone',
      productPrice: 1499,
      description:
        'boAt Rockerz 450 M is an on-ear wireless headset that has been ergonomically designed to meet the needs of music lovers.',
      isOff: false,
      productImage: require('../../assets/images/nft07.jpeg'),
      isAvailable: true,
      productImageList: [
        require('../../assets/images/nft02.jpeg'),
        require('../../assets/images/nft03.jpeg'),
        require('../../assets/images/nft04.jpeg'),
      ],
    },
    {
      id: 3,
      category: 'accessory',
      productName: 'boAt Airdopes 441',
      productPrice: 1999,
      description:
        'Bluetooth: It has Bluetooth v5.0 with a range of 10m and is compatible with Android & iOS',
      isOff: true,
      offPercentage: 18,
      productImage: require('../../assets/images/nft05.jpeg'),
      isAvailable: true,
      productImageList: [
        require('../../assets/images/nft02.jpeg'),
        require('../../assets/images/nft03.jpeg'),
        require('../../assets/images/nft04.jpeg'),
      ],
    },
    {
      id: 4,
      category: 'accessory',
      productName: 'boAt Airdopes 441',
      productPrice: 1999,
      description:
        'Bluetooth: It has Bluetooth v5.0 with a range of 10m and is compatible with Android & iOS',
      isOff: true,
      offPercentage: 18,
      productImage: require('../../assets/images/nft05.jpeg'),
      isAvailable: true,
      productImageList: [
        require('../../assets/images/nft02.jpeg'),
        require('../../assets/images/nft03.jpeg'),
        require('../../assets/images/nft04.jpeg'),
      ],
    },
    {
      id: 5,
      category: 'accessory',
      productName: 'boAt Airdopes 441',
      productPrice: 1999,
      description:
        'Bluetooth: It has Bluetooth v5.0 with a range of 10m and is compatible with Android & iOS',
      isOff: true,
      offPercentage: 18,
      productImage: require('../../assets/images/nft05.jpeg'),
      isAvailable: true,
      productImageList: [
        require('../../assets/images/nft02.jpeg'),
        require('../../assets/images/nft03.jpeg'),
        require('../../assets/images/nft04.jpeg'),
      ],
    },
    {
      id: 6,
      category: 'accessory',
      productName: 'boAt Airdopes 441',
      productPrice: 1999,
      description:
        'Bluetooth: It has Bluetooth v5.0 with a range of 10m and is compatible with Android & iOS',
      isOff: true,
      offPercentage: 18,
      productImage: require('../../assets/images/nft05.jpeg'),
      isAvailable: true,
      productImageList: [
        require('../../assets/images/nft02.jpeg'),
        require('../../assets/images/nft03.jpeg'),
        require('../../assets/images/nft04.jpeg'),
      ],
    },
  ];

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDataFromDB();
    });

    return unsubscribe;
  }, [navigation]);

  //get product data by productID

  const getDataFromDB = async () => {
    for (let index = 0; index < Items.length; index++) {
      if (Items[index].id == productID) {
        await setProduct(Items[index]);
        console.log(product);
        return;
      }
    }
  };

  //add to cart

  const addToCart = async id => {
    let itemArray = await AsyncStorage.getItem('cartItems');
    itemArray = JSON.parse(itemArray);
    if (itemArray) {
      let array = itemArray;
      array.push(id);

      try {
        await AsyncStorage.setItem('cartItems', JSON.stringify(array));
        ToastAndroid.show(
          'Item Added Successfully to cart',
          ToastAndroid.SHORT,
        );
        navigation.navigate('Home');
      } catch (error) {
        return error;
      }
    } else {
      let array = [];
      array.push(id);
      try {
        await AsyncStorage.setItem('cartItems', JSON.stringify(array));
        ToastAndroid.show(
          'Item Added Successfully to cart',
          ToastAndroid.SHORT,
        );
        navigation.navigate('Home');
      } catch (error) {
        return error;
      }
    }
  };

  //product horizontal scroll product card
  const renderProduct = ({ item, index }) => {
    return (
      <View
        style={{
          width: width,
          height: 240,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={item}
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'contain',
          }}
        />
      </View>
    );
  };

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: COLOURS.white,
        position: 'relative',
      }}>
      <StatusBar
        backgroundColor={COLOURS.backgroundLight}
        barStyle="dark-content"
      />
      <ScrollView>
        <View
          style={{
            width: '100%',
            backgroundColor: COLOURS.backgroundLight,
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 4,
          }}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: 16,
              paddingLeft: 16,
            }}>
            <TouchableOpacity onPress={() => navigation.goBack('Home')}>
              <Entypo
                name="chevron-left"
                style={{
                  fontSize: 18,
                  color: COLOURS.backgroundDark,
                  padding: 12,
                  backgroundColor: COLOURS.white,
                  borderRadius: 10,
                }}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            data={product.productImageList ? product.productImageList : null}
            horizontal
            renderItem={renderProduct}
            showsHorizontalScrollIndicator={false}
            decelerationRate={0.8}
            snapToInterval={width}
            bounces={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false },
            )}
          />
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16,
              marginTop: 32,
            }}>
            {product.productImageList
              ? product.productImageList.map((data, index) => {
                let opacity = position.interpolate({
                  inputRange: [index - 1, index, index + 1],
                  outputRange: [0.2, 1, 0.2],
                  extrapolate: 'clamp',
                });
                return (
                  <Animated.View
                    key={index}
                    style={{
                      width: '16%',
                      height: 2.4,
                      backgroundColor: COLOURS.black,
                      opacity,
                      marginHorizontal: 4,
                      borderRadius: 100,
                    }}></Animated.View>
                );
              })
              : null}
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 16,
            marginTop: 6,
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 4,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: '600',
                letterSpacing: 0.5,
                marginVertical: 4,
                color: COLOURS.black,
                maxWidth: '84%',
              }}>
              {product.productName}
            </Text>
            <Ionicons
              name="link-outline"
              style={{
                fontSize: 24,
                color: COLOURS.blue,
                backgroundColor: COLOURS.blue + 10,
                padding: 8,
                borderRadius: 100,
              }}
            />
          </View>
          <Text
            style={{
              fontSize: 12,
              color: COLOURS.black,
              fontWeight: '400',
              letterSpacing: 1,
              opacity: 0.5,
              lineHeight: 20,
              maxWidth: '85%',
              maxHeight: 44,
              marginBottom: 18,
            }}>
            {product.description}
          </Text>
          <View
            style={{
              paddingHorizontal: 16,
            }}>
            {product.solutions?.map(data => {
              return <View key={data.id}
              >
                <TouchableOpacity style={{
                  paddingHorizontal: 16,
                  borderBottomColor: COLOURS.backgroundLight,
                  borderBottomWidth: 1,
                  paddingBottom: 10,
                  paddingTop: 10,
                  backgroundColor: COLOURS.blue + 10,
                  borderRadius: 20,
                  marginVertical: 4,
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
                  onLongPress={() => {
                    const options = ['编辑', '删除', '取消'];
                    const destructiveButtonIndex = 0;
                    const cancelButtonIndex = 2;
                    const icon = (name) => (
                      <MaterialIcons key={name} name={name} size={26}/>
                    );
                    const textStyle = { fontSize: 20, paddingLeft: 150};
                    // 暂时不需要把icons传给showActionSheetWithOptions，不还看
                    const icons = [icon('edit'), icon('delete'), icon('cancel')];
                    // https://github.com/expo/react-native-action-sheet
                    showActionSheetWithOptions({
                      options, textStyle,
                      cancelButtonIndex,
                      destructiveButtonIndex
                    }, (selectedIndex) => {
                      switch (selectedIndex) {
                        case 1:
                          // Save
                          console.log('Save');

                          break;

                        case destructiveButtonIndex:
                          // Delete
                          console.log('Delete');

                          break;

                        case cancelButtonIndex:
                          console.log('cancel');

                        // Canceled
                      }
                    });
                  }}
                  delayLongPress={1000}
                >
                  <Text style={{
                    fontSize: 18,
                    fontWeight: '500',
                    color: COLOURS.black,
                    marginBottom: 4,
                  }}  >
                    {data.solution}
                  </Text>
                  <SimpleLineIcons name="question"
                    style={{
                      fontSize: 24,
                      color: COLOURS.blue,
                      padding: 8,
                      borderRadius: 100,
                    }}
                    onPress={() => {
                      console.log('question Press')
                    }}
                  >

                  </SimpleLineIcons>
                </TouchableOpacity>

              </View>

            })}

          </View>
        </View>
      </ScrollView>

      <View
        style={{
          position: 'absolute',
          bottom: 10,
          height: '8%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',

        }}>
        <TouchableOpacity
          onPress={() => (product.isAvailable ? addToCart(product.id) : null)}
          style={{
            width: '86%',
            height: '90%',
            backgroundColor: COLOURS.blue,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '500',
              letterSpacing: 1,
              color: COLOURS.white,
              textTransform: 'uppercase',
            }}>
            {product.isAvailable ? '新增' : 'Not Avialable'}
          </Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default SolveDetail;