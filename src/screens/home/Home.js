import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  I18nManager,
  Dimensions,
  LogBox,
  StyleSheet,
  Switch,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
//import Feather from 'react-native-vector-icons/Feather';
//import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FormButton from '../../components/FormButton';
import {useSelector, useDispatch} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import TutorCard from './TutorCard';
import SkeletonTutorCard from './SkeletonTutorCard';
import * as CONSTANT from '../../constant/globalConstant';
import Header from '../../components/Header';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import RBSheet from 'react-native-raw-bottom-sheet';
import CountriesJson from '../../constant/CountriesJson';
import MultiSelect from 'react-native-multiple-select';
import {debounce} from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';

LogBox.ignoreLogs([
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.',
]);
const Home = ({navigation, route}) => {
  const isFocused = useIsFocused();

  const [keyword, setKeyword] = useState(null);
  const [loader, setLoader] = useState(false);
  const [tutors, setTutors] = useState([]);
  const [filteredTutors, setFilteredTutors] = useState([]);
  const [tutorSpinner, setTutorSpinner] = useState(false);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState([]);
  const [isSearchInputFocused, setIsSearchInputFocused] = useState(false);
  const rbSheet = useRef();
  const [user, setUser] = useState({});
  // const [data, setData]= useState(useSelector(state => state.value.allTutors));
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const data = useSelector(state => state.value.allTutors);
  useEffect(() => {
    if (isFocused) {
      //setData(useSelector(state => state.value.allTutors));
      getAllTutors();
      getCountriesList();
      getUser();
    }
  }, [isFocused]);

  const getUser = async () => {
    const userObj = await AsyncStorage.getItem('user');
    if (userObj) {
      const parsedUserObj = JSON.parse(userObj);
      setUser(parsedUserObj);
    } else {
      setUser({});
    }
  };

  const getAllTutors = async () => {
    setTutorSpinner(true);
    const dataArr = [];
    // Object.keys(data)?.map(val => {
    //     console.log(val);
    //   dataArr.push(data[val]);
    // });
    // setTutors(data);
    // if (filteredTutors.length <= 0) {
    //   setFilteredTutors(dataArr);
    // }
    // setTutorSpinner(false);
    setTimeout(() => {
     const sortData = [...data].sort((a, b) => a.name.localeCompare(b.name));
     console.log()
      setTutors(sortData);
      if (filteredTutors.length <= 0) {
        setFilteredTutors(sortData);
      }
      setTutorSpinner(false);
    }, 5000);
  };

  const getCountriesList = () => {
    const countriesData = [];
    CountriesJson?.map(val => {
      countriesData.push({label: val.name, value: val.name});
    });
    setCountries(countriesData);
  };

  const clearAllData = async () => {
    setSelectedCountry([]);
    setIsEnabled(false);
    handleSearch('');
  };

  const clearSearch = () => {
    setKeyword(null);
    handleSearch('');
  };

  const handleSearch = debounce(value => {
    const filteredUsers = tutors.filter(user =>
      user.name.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredTutors(filteredUsers);
  }, 500);

  const handleInputChange = value => {
    setKeyword(value);
    handleSearch(value);
  };

  const applyFilters = () => {
    //console.log("isEnable",selectedCountry[0]?.toLowerCase() )
    let filteredData = [];
    if (selectedCountry.length > 0) {
      filteredData = tutors.filter(item =>
        item.country?.toLowerCase().includes(selectedCountry[0]?.toLowerCase()),
      );
      console.log(filteredData.length)
    } else {
      filteredData = filteredTutors;
    }

    // if (isEnabled) {
    //     console.log("i am filter")
    //   filteredData.sort((a, b) => a.name.localeCompare(b.name));
    // }
    setFilteredTutors(filteredData);
  };

  return (
    <SafeAreaView style={styles.globalContainer}>
      <LinearGradient
        colors={[CONSTANT.primaryColor, CONSTANT.secondary2Color]}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 1}}
        style={styles.homeContainer}>
        <Header
          title={'Home'}
          titleColor={'#FFFFFF'}
          noIcon={true}
          user={user}
        />
      </LinearGradient>
      <View style={{flexDirection: 'row'}}>
        <View
          style={[
            styles.searchContainer,
            {
              borderColor: isSearchInputFocused
                ? CONSTANT.primaryColor
                : '#C5D1D8',
            },
          ]}>
          <View style={styles.searchInputContainer}>
            <Image
              source={require('../../../assets/images/searchicon.png')}
              style={styles.searchIcon}
            />
            <TextInput
              //ref={this.setSearchInputRef}
              value={keyword}
              style={styles.searchInput}
              onChangeText={handleInputChange}
              placeholder={
                'Search                                                                          '
              }
              placeholderTextColor={'#51515140'}
              onFocus={() => {
                //console.log('setIsSearchInputFocused');
                setIsSearchInputFocused(true);
              }}
              onBlur={() => setIsSearchInputFocused(false)}
            />
            {keyword && keyword.length > 0 && (
              <TouchableOpacity
                hitSlop={10}
                onPress={clearSearch}
                style={{
                  backgroundColor: 'transparent',
                  //alignSelf : "flex-start",
                  marginStart: '104%',
                  position: 'absolute',
                }}>
                <Image
                  style={styles.searchInputCloseIcon}
                  source={require('../../../assets/images/crossicon.png')}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <TouchableOpacity onPress={() => rbSheet.current.open()}>
          <Feather
            style={{marginTop: 15}}
            name={'sliders'}
            size={25}
            color={'#1C1C1C'}
          />
        </TouchableOpacity>
      </View>
      {loader && <Spinner visible={true} color={CONSTANT.primaryColor} />}
      <View style={{backgroundColor: '#fff', flex: 1}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          data={filteredTutors}
          keyExtractor={(x, i) => i.toString()}
          maxToRenderPerBatch={10}
          ListEmptyComponent={
            <>
              {tutorSpinner ? (
                <>
                  <SkeletonTutorCard />
                  <SkeletonTutorCard />
                  <SkeletonTutorCard />
                  <SkeletonTutorCard />
                  <SkeletonTutorCard />
                  <SkeletonTutorCard />
                  <SkeletonTutorCard />
                  <SkeletonTutorCard />
                  <SkeletonTutorCard />
                  <SkeletonTutorCard />
                </>
              ) : (
                <View style={styles.NodataFoundContainer}>
                  <Image
                    resizeMode="contain"
                    style={styles.NodataFoundImg}
                    source={require('../../../assets/images/empty.png')}
                  />
                  <Text style={styles.NodataFoundText}>
                    {'Oops! No record found ☹️'}
                  </Text>
                </View>
              )}
            </>
          }
          renderItem={({item, index}) => (
            <TouchableOpacity activeOpacity={0.9}>
              <TutorCard item={item} navigation={navigation.navigate} />
            </TouchableOpacity>
          )}
        />
      </View>
      <RBSheet
        ref={rbSheet}
        height={Dimensions.get('window').height * 0.5}
        duration={250}
        customStyles={{
          container: {
            paddingLeft: 10,
            paddingRight: 10,
            backgroundColor: 'transparent',
          },
        }}>
        <View style={styles.RBSheetParentStyle}>
          <View style={styles.RBSheetheaderStyle}>
            <Text style={styles.RBSheetHeaderTextStyle}>{'Narrow Search'}</Text>
            <Feather
              onPress={() => rbSheet.current.close()}
              style={styles.RBSheetCloseIconStyle}
              name={'x'}
              size={20}
              color={'#1C1C1C'}
            />
          </View>
          <ScrollView
            style={{paddingHorizontal: 10}}
            showsVerticalScrollIndicator={false}>
            {/* <View style={styles.homeCheckBoxesContainer}>
              <Text style={styles.narrowSearchHeadingText}>
                {'Sort Alphabetically'}
              </Text>

              <Switch
                trackColor={{false: '#767577', true: CONSTANT.primaryColor}}
                thumbColor={'#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View> */}

            <Text style={styles.narrowSearchHeadingText}>{'Location'}</Text>
            <View style={styles.narrowSearchLocationConatiner}>
              <MultiSelect
                fontSize={16}
                onSelectedItemsChange={value => {
                  setSelectedCountry(value);
                }}
                uniqueKey="value"
                items={countries}
                selectedItems={selectedCountry}
                borderBottomWidth={0}
                single={true}
                searchInputPlaceholderText={'Select Country'}
                selectText={'Select Country'}
                styleMainWrapper={styles.multiSlectstyleMainWrapper}
                styleDropdownMenuSubsection={
                  styles.multiSlectstyleDropdownMenuSubsection
                }
                styleListContainer={{
                  maxHeight: 150,
                }}
                onChangeInput={text => console.log(text)}
                displayKey="label"
                submitButtonText={'submit'}
              />
            </View>

            <FormButton
              buttonTitle={'Apply filters'}
              backgroundColor={CONSTANT.primaryColor}
              textColor={'#fff'}
              onPress={() => {
                applyFilters();
                rbSheet.current.close();
                console.log(selectedCountry[0], isEnabled);
              }}
            />
            <View style={styles.narrowSearchButtonView}>
              <Text
                onPress={async () => {
                  await clearAllData();
                }}
                style={styles.narrowSearchClearButton}>
                {'Clear Filters'}
              </Text>
            </View>
          </ScrollView>
        </View>
      </RBSheet>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  globalContainer: {
    flex: 1,
    backgroundColor: CONSTANT.whiteColor,
  },
  homeContainer: {
    width: '100%',
    //paddingBottom: 50,
    //height: 300,
  },
  NodataFoundContainer: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
  },
  NodataFoundImg: {
    width: 250,
    height: 250,
    marginTop: '45%',
  },
  NodataFoundText: {
    color: CONSTANT.fontColor,
    fontSize: 18,
    marginVertical: 10,
    fontWeight: '700',
  },
  card: {
    minHeight: 80,
    marginLeft: 10,
    marginRight: 10,
    marginVertical: 13,
    borderRadius: 8,
  },
  searchContainer: {
    marginTop: 10,
    borderWidth: 1,
    marginHorizontal: 16,
    borderRadius: 8,
    backgroundColor: 'white',
    marginBottom: 11,
    flexDirection: 'row',
  },
  sort: {
    fontSize: 14,
    fontWeight: '400',
    color: '#08A88E',
  },
  searchInputContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 40,
    width: '90%',
  },
  searchInput: {
    fontSize: 16,
    paddingStart: 4,
    paddingEnd: 25,
    color: 'black',
  },
  searchIcon: {
    height: 14,
    width: 17,
    marginStart: 12,
    resizeMode: 'contain',
    tintColor: '#6C7C83',
  },
  searchInputCloseIcon: {
    height: 16,
    width: 16,
    resizeMode: 'contain',
  },
  RBSheetheaderStyle: {
    backgroundColor: CONSTANT.grayColor,
    height: 60,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },

  RBSheetCloseIconStyle: {
    width: '10%',
    textAlign: 'center',
    right: 0,
  },
  RBSheetHeaderTextStyle: {
    color: CONSTANT.fontColor,
    fontSize: 18,
    lineHeight: 26,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  RBSheetParentStyle: {
    backgroundColor: CONSTANT.whiteColor,
    height: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    overflow: 'hidden',
  },
  homeCheckBoxesContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 10,
    paddingBottom: 15,
    //marginHorizontal: 10,
    borderBottomColor: CONSTANT.borderColor,
    borderBottomWidth: 1,
    width: '100%',
    justifyContent: 'space-between',
  },

  narrowSearchHeadingText: {
    color: CONSTANT.fontColor,
    fontSize: 16,
    lineHeight: 26,
    textAlign: 'left',
    marginTop: 5,
    fontWeight: 'bold',
  },
  narrowSearchButtonView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  narrowSearchClearButton: {
    color: CONSTANT.shadeGrayColor,
    fontSize: 16,
    lineHeight: 26,
    marginVertical: 15,
    //fontFamily: 'Urbanist-Bold',
    fontWeight: 'bold',
  },
  narrowSearchLocationConatiner: {
    marginVertical: 10,
    borderBottomColor: CONSTANT.borderColor,
    borderBottomWidth: 1,
    width: '100%',
  },
  multiSlectstyleMainWrapper: {
    overflow: 'hidden',
    width: '100%',
  },
  multiSlectstyleDropdownMenuSubsection: {
    backgroundColor: CONSTANT.whiteColor,
    height: 70,
    paddingLeft: 10,
    paddingTop: 18,
  },
});
