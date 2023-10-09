import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StatusBar,
    ScrollView,
    TouchableOpacity,
    Image,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Toobox = ({ navigation }) => {
    const [products, setProducts] = useState([]);
    const [accessory, setAccessory] = useState([]);
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
            productPrice: '水费充足，无水',
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
                {solution : '检查水费充足', detail: '暂无'},
                {solution : '检查水表电池电量', detail: '电池电量不够无法进行水量计量，建议更换电池'},
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
    //get called on screen loads
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getDataFromDB();
        });

        return unsubscribe;
    }, [navigation]);

    //get data from DB

    const getDataFromDB = () => {
        let productList = [];
        let accessoryList = [];
        for (let index = 0; index < Items.length; index++) {
            if (Items[index].category == 'product') {
                productList.push(Items[index]);
            } else if (Items[index].category == 'accessory') {
                accessoryList.push(Items[index]);
            }
        }

        setProducts(productList);
        setAccessory(accessoryList);
    };

    //create an product reusable card

    const ProductCard = ({ data }) => {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('SolveDetail', { productID: data.id })}
                style={{
                    width: '48%',
                    marginVertical: 14,
                }}>
                <View
                    style={{
                        width: '100%',
                        height: 100,
                        borderRadius: 10,
                        backgroundColor: COLOURS.backgroundLight,
                        position: 'relative',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 8,
                    }}>
                    <Image source={data.productImage} style={{width: '80%', height: '80%',resizeMode: 'contain', borderRadius: 4}}/>
                    {data.isOff ? (
                        <View
                            style={{
                                position: 'absolute',
                                width: '24%',
                                height: '24%',
                                backgroundColor: COLOURS.green,
                                top: 0,
                                left: 0,
                                borderTopLeftRadius: 10,
                                borderBottomRightRadius: 10,
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'row'
                            }}>
                            <MaterialCommunityIcons
                            name="thumb-up-outline"
                            style={{
                                fontSize: 16,
                                color: COLOURS.white,
                            }}
                            />
                            <Text
                                style={{
                                    fontSize: 12,
                                    color: COLOURS.white,
                                    fontWeight: 'bold',
                                    letterSpacing: 1,
                                    paddingLeft: 2,
                                }}>
                                {data.offPercentage}
                            </Text>
                        </View>
                    ) : null}
 
                </View>
                <Text
                    style={{
                        fontSize: 16,
                        color: COLOURS.black,
                        fontWeight: '600',
                        marginBottom: 2,
                    }}>
                    {data.productName}
                </Text>
                {data.category == 'accessory' ? (
                    data.isAvailable ? (
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                            <FontAwesome
                                name="circle"
                                style={{
                                    fontSize: 12,
                                    marginRight: 6,
                                    color: COLOURS.green,
                                }}
                            />
                            <Text
                                style={{
                                    fontSize: 12,
                                    color: COLOURS.green,
                                }}>
                                Available
                            </Text>
                        </View>
                    ) : (
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                            <FontAwesome
                                name="circle"
                                style={{
                                    fontSize: 12,
                                    marginRight: 6,
                                    color: COLOURS.red,
                                }}
                            />
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: COLOURS.red,
                                }}>
                                Unavailable
                            </Text>
                        </View>
                    )
                ) : null}
                <Text style={{
                    fontSize: 12,
                   }}>{data.productPrice}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View
            style={{
                width: '100%',
                height: '100%',
                backgroundColor: COLOURS.white,
            }}>
            <StatusBar backgroundColor={COLOURS.white} barStyle="dark-content" />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View
                    style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        padding: 16,
                    }}>
                    <TouchableOpacity>
                        <Entypo
                            name="shopping-bag"
                            style={{
                                fontSize: 18,
                                color: COLOURS.backgroundMedium,
                                padding: 12,
                                borderRadius: 10,
                                backgroundColor: COLOURS.backgroundLight,
                            }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('MyCart')}>
                        <MaterialCommunityIcons
                            name="cart"
                            style={{
                                fontSize: 18,
                                color: COLOURS.backgroundMedium,
                                padding: 12,
                                borderRadius: 10,
                                borderWidth: 1,
                                borderColor: COLOURS.backgroundLight,
                            }}
                        />
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        marginBottom: 10,
                        padding: 16,
                    }}>
                    <Text
                        style={{
                            fontSize: 26,
                            color: COLOURS.black,
                            fontWeight: '500',
                            letterSpacing: 1,
                            marginBottom: 4,
                        }}>
                        日常修理 &amp; 记事台账
                    </Text>

                </View>
                <View
                    style={{
                        padding: 16,
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                            <Text
                                style={{
                                    fontSize: 18,
                                    color: COLOURS.black,
                                    fontWeight: '500',
                                    letterSpacing: 1,
                                }}>
                                水电
                            </Text>
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: COLOURS.black,
                                    fontWeight: '400',
                                    opacity: 0.5,
                                    marginLeft: 10,
                                }}>
                                41
                            </Text>
                        </View>
                        <Text
                            style={{
                                fontSize: 14,
                                color: COLOURS.blue,
                                fontWeight: '400',
                            }}>
                            SeeAll
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'space-around',
                        }}>
                        {products.map(data => {
                            return <ProductCard data={data} key={data.id} />;
                        })}
                    </View>
                </View>

                <View
                    style={{
                        padding: 16,
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                            <Text
                                style={{
                                    fontSize: 18,
                                    color: COLOURS.black,
                                    fontWeight: '500',
                                    letterSpacing: 1,
                                }}>
                                其他
                            </Text>
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: COLOURS.black,
                                    fontWeight: '400',
                                    opacity: 0.5,
                                    marginLeft: 10,
                                }}>
                                78
                            </Text>
                        </View>
                        <Text
                            style={{
                                fontSize: 14,
                                color: COLOURS.blue,
                                fontWeight: '400',
                            }}>
                            SeeAll
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'space-around',
                        }}>
                        {accessory.map(data => {
                            return <ProductCard data={data} key={data.id} />;
                        })}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default Toobox;