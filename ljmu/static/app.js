import React from 'react';
import {RNCamera} from 'react-native-camera';
import {StyleSheet, View} from 'react-native';

const App = () => {
  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        captureAudio={false}
      />
      {/* You'll overlay sensor data here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, flexDirection: 'column'},
  preview: {flex: 1, justifyContent: 'flex-end', alignItems: 'center'},
});

export default App;
