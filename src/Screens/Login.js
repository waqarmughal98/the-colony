import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React,{useState} from 'react';
import { FontAwesome,Ionicons } from '@expo/vector-icons';
const { width, height } = Dimensions.get('window');
const vw = width / 100;
const vh = height / 100;
const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const Login=()=>{
    if(email=="admin@gmail.com" && password=="password"){
        navigation.navigate("Dashboard")
    }
    else{
        Alert('Invalid credentials');  
    }
  }
   
  return (
    <ImageBackground
      source={require('../../assets/imgs/Bg.png')} // Replace with the actual path to your image
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Image
          source={require('../../assets/imgs/logoLogin.png')}
          style={styles.Image}
        />
        <Text style={styles.text1}>Welcome back! Let's build</Text>
        <Text style={styles.text2}>Sign in to view the project</Text>
         <View style={styles.inputMainContainer}>
         <View style={styles.inputContainer}>
         <Ionicons name="person"  size={20}
            color="black"
            style={styles.inputIcon}/>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="black"
            value={email}
            onChangeText={(text)=>setEmail(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <FontAwesome
            name="lock"
            size={20}
            color="black"
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="black"
            secureTextEntry={true}
            value={password}
            onChangeText={(text)=>setPassword(text)}
          />
        </View>
         </View>

            <TouchableOpacity onPress={()=>Login()} activeOpacity={0.6} style={styles.signInButton}>
                <Text style={styles.textSignIn}>Sign In</Text>
            </TouchableOpacity>

       
      </View>
    </ImageBackground>
  );
};

export default Login;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch' or 'contain'
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Image: {
    height: vh*38,
    width: vw*73,
  },
  text1: {
    fontSize: 21,
  },
  text2: {
    fontSize: 16,
  },
  inputMainContainer:{
    marginVertical:25,
    width:vw*100
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    width:vw*80,
    backgroundColor:"white",
    borderRadius:100,
    paddingHorizontal:20,
    alignSelf:"center",
    height:45,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: 'black',
    fontSize: 16,
    paddingVertical: 5,
  },
  signInButton:{
    backgroundColor:"black",
    marginHorizontal:40,
    width:vw*80,
    height:45,
    borderRadius:100,
    display:"flex",
    flexDirection:'row',
    justifyContent:"center",
    alignItems:"center"
  },
  textSignIn:{
    color:'white',
    fontSize:20
  }
});
