import React, {Component} from 'react';
import {
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  Alert,
  Platform,
  UIManager,
  Text,
  ActivityIndicator,
  LayoutAnimation,
  ScrollView,
  PlatformColor,
  Dimensions,
} from 'react-native';import Spinner from 'react-native-loading-spinner-overlay';


import AsyncStorage from '@react-native-async-storage/async-storage';
import {getStatusBarHeight} from '../services/iphoneXHelper';
import * as CONSTANT from '../../constant/globalConstant';
import { firebase } from '../../firebase/config';
import { useDispatch } from 'react-redux';


if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
const defaultState = {
  form: 'SIGN_UP',
  firstName: '',
  lastName: '',
  signUpEmail: '',
  signInEmail: '',
  forgotEmail: '',
  firstNameError: null,
  lastNameError: null,
  signUpEmailError: null,
  signInEmailError: null,
  forgotEmailError: null,
  signUpPassword: '',
  signInPassword: '',
  signUpPasswordError: null,
  signInPasswordError: null,
  passwordInputEyeIcon: 'eye',
  passwordInputEye: false,
  signInEyeIcon: 'eye',
  signInEye: false,
  refererId: '',
  channelCode: '',
  isForgot: false,
  targetModule: null,
};
export default class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    // GoogleSignin.configure({
    //   webClientId:
    //     "241855441634-g621e6a93itaqbd8o5pp1ckjt18sefnb.apps.googleusercontent.com",
    // });
    this.state = {...defaultState, logs: ''};
  }

  async componentWillUnmount() {}
  componentDidUpdate(prevProps, prevState, snapshot) {}

  async componentDidMount() {}

  onJobTypeChange = value => {
    this.setState({
      jobType: value,
    });
  };

  getValue = () => {
    return this.state.jobType;
  };

  updateUser = async user => {
    await AsyncStorage.setItem('user', JSON.stringify(user));
  };

  duration = () => {
    const currTime = new Date().getTime();
    return parseInt(currTime - this.state.startTimestamp);
  };

  appleAuthLogs = logs => {
    this.setState(prevState => {
      return {logs: prevState.logs + logs + '\n'};
    });
  };

  signupUser = async () => {
    const self = this;
    self.setState({loading: true});
    var success = true;
    let {signUpEmail, signUpPassword, firstName, lastName} = this.state;
    if (firstName === '') {
      const errMsg = 'First Name required';
      this.setState({firstNameError: errMsg});

      success = false;
    }
    if (lastName === '') {
      const errMsg = 'Last Name required';
      this.setState({lastNameError: errMsg});

      success = false;
    }
    if (signUpEmail === '') {
      const errMsg = 'Email required';
      this.setState({signUpEmailError: errMsg});
      success = false;
    }
    if (signUpPassword === '') {
      const errMsg = 'Password required';
      this.setState({signUpPasswordError: errMsg});
      success = false;
    }

    if (!success) {
      self.setState({loading: false});
      return;
    }
    // // const emailKey = signUpEmail.replace(/@|\.|#|\$|\[|\]/g, "_");
    await firebase
      .auth()
      .createUserWithEmailAndPassword(
        this.state.signUpEmail,
        this.state.signUpPassword
      )
      .then((data) => {
        //console.log("====> ", data);
        self.updateUser({
          uid: data.user?.uid,
          email: data.user?.email,
          name: self.state?.firstName + self.state?.lastName,
        });
       
        self.setState({ loading: false });
        self.props.navigation.replace("home");
      })
      .catch((err) => {
        console.log(err, err.message);

        if (
          err.code === "auth/wrong-password" ||
          err.code === "auth/invalid-email"
        ) {
          this.setState({
            signUpPasswordError: "The email or password is invalid",
          });
        } else if (err.code === "auth/email-already-in-use") {
          this.setState({ signUpEmailError: "The email is already in use" });
        }
        self.setState({ loading: false });
      });
  };

  focusedInput = ref => {
    this[ref].setNativeProps({
      style: {
        borderWidth: 1,
        borderColor: CONSTANT.primaryColor,
      },
    });
    if (ref === 'passwordInput') {
      this.setState({passwordInputEye: true});
    } else if (ref === 'passwordSignInInput') {
      this.setState({signInEye: true});
    }

    this[ref].focus();
  };

  blurredInput = ref => {
    this[ref].setNativeProps({
      style: {
        borderWidth: 0,
        borderColor: 'transparent',
      },
    });
    if (ref === 'passwordInput') {
      this.setState({passwordInputEye: false});
    } else if (ref === 'passwordSignInInput') {
      this.setState({signInEye: false});
    }
  };
  signInUser = async () => {
    this.setState({loading: true});
    const email = this.state.signInEmail;
    const password = this.state.signInPassword;
    let success = true;
    // checks if email and password fields are empty
    if (email === '') {
      const errMsg = 'Email required';
      this.setState({signInEmailError: errMsg});
      success = false;
    }
    if (password === '') {
      const errMsg = 'Password required';
      this.setState({signInPasswordError: errMsg});
      success = false;
    }

    if (!success) {
      this.setState({loading: false});
      return;
    }
    console.log(email,password)
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((data) => {
        //console.log("sigin : ", data);
        this.updateUser({
          uid: data.user.uid,
          email: data.user.email,
          name: data.user.displayName,
        });
        this.setState({ loading: false });
        //AsyncStorage.setItem("previousLogin", data.user.email);
        this.props.navigation.replace("home");
      })
      .catch((err) => {
        this.setState({ loading: false });
        console.log(err, err.message);

        if (
          err.code === "auth/wrong-password" ||
          err.code === "auth/user-not-found" ||
          err.code === "auth/invalid-email"
        ) {
          this.setState({
            signInPasswordError: "The email or password is invalid",
          });
        } else {
          this.setState({ signInPasswordError: "The user is not found" });
        }
      });
  };

  forgotPassword = async () => {
    const email = this.state.forgotEmail;
    if (email === '') {
      // check if email field is empty
      const errMsg = 'Email required';
      this.setState({forgotEmailError: errMsg});
      this.setState({loading: false});
      return;
    }
    await firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert(
          "Reset Password",
          "Password reset instructions have been sent to your email address!"
        );
      })
      .catch((err) => {
        if (
          err.code === "auth/user-not-found" ||
          err.code === "auth/invalid-email"
        ) {
          this.setState({ forgotEmailError: "The email is invalid" });
        } else {
          this.setState({ forgotEmailError: "The user is not found" });
        }
      });
  };

  forgotPasswordForm = () => {
    return (
      <View
        style={{
          //justifyContent: 'space-between',
          //flex: 1,
        }}>
        <View>
          <Text style={styles.fieldTitleText}>Email Address</Text>
          <TextInput
            ref={sie => {
              this.forgotEmail = sie;
            }}
            style={styles.fieldInput}
            autoCapitalize="none"
            keyboardType="email-address"
            onFocus={() => this.focusedInput('forgotEmail')}
            onBlur={() => this.blurredInput('forgotEmail')}
            onChangeText={forgotEmail => this.setState({forgotEmail})}
          />
          <Text style={styles.errorText}>{this.state.forgotEmailError}</Text>
        </View>
        <View>
          <TouchableOpacity
            style={[styles.createAccountButton, {marginTop: 58}]}
            onPress={() => {
              this.forgotPassword();
            }}>
            <Text style={styles.buttonText}>Reset Password</Text>
          </TouchableOpacity>
          <Text
            style={{
              ...styles.signIn,
              textAlign: 'center',
              marginTop: 20,
            }}
            onPress={() => {
              LayoutAnimation.spring();
              this.setState({...defaultState, form: 'SIGN_UP'});
            }}>
            Create an account
          </Text>
        </View>
      </View>
    );
  };

  onCreatePress = () => {
    let {form} = this.state;
    let isSignUp = form === 'SIGN_UP';
    if (isSignUp) {
      this.signupUser();
    } else {
      this.signInUser();
    }
  };

  onChangeForm = isSignUp => {
    //LayoutAnimation.easeInEaseOut();
    LayoutAnimation.configureNext({
      duration: 300,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
      },
    });
    isSignUp
      ? this.setState(
          {
            firstNameError: null,
            lastNameError: null,
            signUpEmailError: null,
            signUpPasswordError: null,
          },
          () => {
            this.setState({form: 'SIGN_IN'});
          },
        )
      : this.setState(
          {signInEmailError: null, signInPasswordError: null},
          () => {
            this.setState({form: 'SIGN_UP'});
          },
        );
  };

  render() {
    let {loading, form} = this.state;
    let isSignUp = form === 'SIGN_UP';
    return (
      <ScrollView style={styles.fullSize}>
        {loading && <Spinner visible={true} color={'#fff'} />}
        <Image
          source={require('../../../assets/images/logo3.webp')}
          style={styles.logo}
        />

        {this.state.isForgot ? (
          <View style={{flex: 1}}>
            <Text style={styles.onboardTitleLine1}>Forgot{'\n'}Password</Text>
            {this.forgotPasswordForm()}
          </View>
        ) : (
          <View style={{flex: 1}}>
            {isSignUp ? (
              <Text style={styles.onboardTitleLine1}>{'Set Up Account'}</Text>
            ) : (
              <Text style={styles.onboardTitleLine1}>{'Sign In'}</Text>
            )}
            <View
              style={{
                justifyContent: 'space-between',
                //flex: 1,
                //paddingBottom: 10
              }}>
              <View>
                {isSignUp && (
                  <View>
                    <Text style={styles.fieldTitleText}>First Name</Text>
                    <TextInput
                      testID={'textInputFirstName'}
                      style={styles.fieldInput}
                      ref={sie => {
                        this.firstName = sie;
                      }}
                      onFocus={() => this.focusedInput('firstName')}
                      onBlur={() => {
                        if (this.state.firstName != '')
                          this.setState({firstNameError: null});
                        this.blurredInput('firstName');
                      }}
                      value={this.state.firstName}
                      onChangeText={firstName => this.setState({firstName})}
                      onSubmitEditing={() => {
                        if (this.state.firstName != '')
                          this.setState({firstNameError: null});
                        this.focusedInput('lastName');
                      }}
                    />
                    {this.state.firstNameError && isSignUp && (
                      <Text style={styles.errorText}>
                        {' '}
                        {this.state.firstNameError}
                      </Text>
                    )}
                  </View>
                )}
                {isSignUp && (
                  <View>
                    <Text style={styles.fieldTitleText}>Last Name</Text>
                    <TextInput
                      testID={'textInputLastName'}
                      style={styles.fieldInput}
                      ref={sie => {
                        this.lastName = sie;
                      }}
                      onFocus={() => this.focusedInput('lastName')}
                      onBlur={() => {
                        if (this.state.lastName != '')
                          this.setState({lastNameError: null});
                        this.blurredInput('lastName');
                      }}
                      value={this.state.lastName}
                      onChangeText={lastName => this.setState({lastName})}
                      onSubmitEditing={() => {
                        if (this.state.lastName != '')
                          this.setState({lastNameError: null});
                        this.focusedInput('emailSignInInput');
                      }}
                    />
                    {this.state.lastNameError && isSignUp && (
                      <Text style={styles.errorText}>
                        {' '}
                        {this.state.lastNameError}
                      </Text>
                    )}
                  </View>
                )}
                <View>
                  <Text style={styles.fieldTitleText}>Email Address</Text>
                  <TextInput
                    style={[styles.fieldInput, {fontSize: 14}]}
                    ref={sie => {
                      this.emailSignInInput = sie;
                    }}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    onFocus={() => this.focusedInput('emailSignInInput')}
                    onBlur={() => this.blurredInput('emailSignInInput')}
                    value={
                      isSignUp ? this.state.signUpEmail : this.state.signInEmail
                    }
                    onChangeText={signInEmail =>
                      this.setState(
                        isSignUp ? {signUpEmail: signInEmail} : {signInEmail},
                      )
                    }
                    onSubmitEditing={() =>
                      this.focusedInput('passwordSignInInput')
                    }
                    accessible={true}
                    accessibilityLabel="emailAdressInput"
                  />
                  {this.state.signUpEmailError && isSignUp && (
                    <Text style={styles.errorText}>
                      {' '}
                      {this.state.signUpEmailError}
                    </Text>
                  )}
                  {this.state.signInEmailError && !isSignUp && (
                    <Text style={styles.errorText}>
                      {' '}
                      {this.state.signInEmailError}
                    </Text>
                  )}
                </View>
                <View>
                  <Text style={[styles.fieldTitleText]}>Password</Text>
                  <View style={[styles.fieldInput, {paddingHorizontal: 0}]}>
                    <TextInput
                      style={{
                        width: null,
                        height: 42,
                        borderRadius: 42 / 2,
                        backgroundColor: 'white',
                        paddingHorizontal: 22,
                        fontSize: 14,
                        color: "black",
                      }}
                      ref={sip => {
                        this.passwordSignInInput = sip;
                      }}
                      autoCapitalize="none"
                      onFocus={() => this.focusedInput('passwordSignInInput')}
                      onBlur={() => this.blurredInput('passwordSignInInput')}
                      textContentType="password"
                      secureTextEntry={true}
                      onSubmitEditing={() => {
                        if (isSignUp) {
                          if (this.state.signUpPassword.length < 8) {
                            this.setState({
                              signUpPasswordError:
                                'Password must be longer than 8 characters',
                            });
                          } else {
                            this.setState({signUpPasswordError: null});
                          }
                        }
                      }}
                      onChangeText={signInPassword =>
                        this.setState(
                          isSignUp
                            ? {signUpPassword: signInPassword}
                            : {signInPassword},
                        )
                      }
                      accessible={true}
                      accessibilityLabel="passwordInput"
                    />
                    {/* {this.state.signInEye ? (
                      <TouchableOpacity
                        style={{
                          position: 'absolute',
                          end: 0,
                          paddingVertical: 8,
                          paddingHorizontal: 6,
                        }}
                        onPress={() =>
                          this.setState({
                            signInEyeIcon:
                              this.state.signInEyeIcon === 'eye'
                                ? 'eye-off'
                                : 'eye',
                          })
                        }>
                        <Image
                          style={{
                            height: 27,
                            width: 27,
                          }}
                          source={
                            this.state.signInEyeIcon === 'eye'
                              ? require('../../../assets/images/eye-off.png')
                              : require('../../../assets/images/eye.png')
                          }
                        />
                      </TouchableOpacity>
                    ) : null} */}
                  </View>
                  {this.state.signUpPasswordError && isSignUp && (
                    <Text style={styles.errorText}>
                      {' '}
                      {this.state.signUpPasswordError}
                    </Text>
                  )}
                  {this.state.signInPasswordError && !isSignUp && (
                    <Text style={styles.errorText}>
                      {' '}
                      {this.state.signInPasswordError}
                    </Text>
                  )}
                </View>
              </View>
              <View>
                {/* <View
                  style={{
                    flexDirection: 'row',
                    alignSelf: 'center',
                  }}></View> */}
                <View
                  style={{
                    flexDirection: 'row',
                    alignSelf: 'center',
                    marginTop:  58,
                    alignItems: 'center',
                  }}>
                  <Text style={styles.newUserText}>
                    {isSignUp ? 'Already have an account? ' : 'New user? '}
                  </Text>
                  <TouchableOpacity
                    accessible={true}
                    accessibilityLabel={isSignUp ? 'signInLink' : 'signUpLink'}
                    testID={isSignUp ? 'buttonCreateAccount' : 'buttonSignIn'}
                    onPress={() => {
                      this.onChangeForm(isSignUp);
                    }}>
                    <Text
                      style={{
                        color: CONSTANT.primaryColor,
                        //fontFamily: fontFamily.Regular,
                        fontSize: 14,
                      }}>
                      {isSignUp ? 'Sign In' : 'Sign Up'}
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={this.onCreatePress}
                  style={styles.createAccountButton}
                  accessible={true}
                  accessibilityLabel={
                    isSignUp ? 'signUpButton' : 'signInButton'
                  }>
                  <Text style={styles.buttonText}>
                    {isSignUp ? 'Create an account' : 'Sign In'}
                  </Text>
                </TouchableOpacity>
                {!isSignUp && (
                  <TouchableOpacity
                    style={{alignSelf: 'center'}}
                    onPress={() => {
                      this.setState({isForgot: true});
                      LayoutAnimation.spring();
                    }}>
                    <Text
                      style={{
                        color: CONSTANT.primaryColor,
                        //fontFamily: fontFamily.Bold,

                        fontSize: 14,
                        fontWeight: "bold",
                        paddingTop: 20,
                      }}>
                      Forgot password?
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        )}
        {/* {true && (
          <View style={styles.loadingIndicatorContainer}>
            <View style={styles.loadingIndicatorBackground} />
            <ActivityIndicator color="white" />
          </View>
        )} */}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginVertical: -56,
  },
  fieldTitleText: {
    color: 'black',
    fontWeight: "400",
    fontSize: 14,
    marginStart: 60,
    marginBottom: 4,
    marginTop: 12,
  },
  errorText: {
    color: 'red',
    //fontWeight: "400",
    fontSize: 13,
    marginHorizontal: 60,
    marginTop: 6,
  },
  createAccountButton: {
    backgroundColor: CONSTANT.primaryColor,
    borderRadius: 30,
    marginTop: 24,
    marginHorizontal: 35,
    //marginLeft: 25,
    height: 50,
    //width: 325,
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowOffset: {
      height: 4,
      width: 0,
    },
    shadowRadius: 10,
  },
  signIn: {
    color: CONSTANT.primaryColor,
    fontSize: 14,
    fontWeight: "700",
  },
  fullSize: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    paddingTop: getStatusBarHeight(true),
    paddingBottom: Platform.select({
      ios: 34,
      android: 20,
    }),
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    marginHorizontal: 55,
    marginTop: 6,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '700',
    color: 'white',
    fontStyle: 'normal',
  },
  onboardTitleLine1: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    alignSelf: 'center',
    marginBottom: 28,
  },
  fieldInput: {
    width: 299,
    height: 42,
    borderRadius: 42 / 2,
    alignSelf: 'center',
    elevation: 8,
    shadowColor: '#000000',
    shadowOpacity: 0.15,
    shadowOffset: {
      height: 4,
      width: 0,
    },
    backgroundColor: 'white',
    shadowRadius: 4,
    paddingHorizontal: 22,
    color: "black",
  },
  appleButton: {
    width: 48,
    height: 48,
    borderRadius: 48 / 2,
    elevation: 4,
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowOffset: {
      height: 4,
      width: 0,
    },
    shadowRadius: 4,
    backgroundColor: 'white',
  },
  appleImage: {
    width: 48,
    height: 48,
    borderRadius: 48 / 2,
    resizeMode: 'cover',
  },
  newUserText: {
    color: 'black',
    fontSize: 14,
  },
  loadingIndicatorContainer: {
    ...StyleSheet.absoluteFill,
    display: 'flex',
    flex : 1,
    alignContent: 'center',
    justifyContent: 'center',
    zIndex: 999,
    height: Dimensions.get("window").height,
  },
  loadingIndicatorBackground: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'grey',
    opacity: 0.5,
  },
});
