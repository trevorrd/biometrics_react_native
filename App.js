import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import * as LocalAuthentication from 'expo-local-authentication';

export default function App() {
  const [biometricsStatus, setBiometricsStatus] = useState('...')

  const authenticate = async () => {
    const biometricOptions = ({
      cancelLabel: 'Cancel',
      fallbackLabel: 'Please enter your passcode because biometrics failed too many times',
      promptMessage: 'Authenticating...'
    })

    await LocalAuthentication.authenticateAsync(biometricOptions)
        .then((results) => {
          console.log('Biometric results: ', results.success, 'errors:', results.error)
          setBiometricsStatus(results.success ? 'Success!' : results.error)
        })
        .catch((error) => {
          console.log('Error!', error)
          setBiometricsStatus('Error with authentication!')
        })
  }

  const Biometrics = () => {
    let status = <Text style={{ fontWeight: 'bold' }}>{biometricsStatus}</Text>

    return status
  }

  return (
    <View style={styles.container}>
      <Text>Trevor's Biometrics React Native App!</Text>
      <StatusBar style="auto" />
      <View style={styles.buttonSpace}>
        <Biometrics></Biometrics>
      </View>

      <View style={styles.buttonSpace}>
      <Button
        onPress={() => {
          authenticate()
        }}
        icon="lock"
        mode="contained"
        color={"#5b4771"}
        accessibilityLabel="Click here to log in!"
        style={styles.myButton}
      >
        Authenticate
      </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  myButton: {
    height: 40,
    width: '50%',
  },

  buttonSpace: {
    margin: 20,
  },
});
