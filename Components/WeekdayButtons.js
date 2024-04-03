import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';

const WeekDaysButtons = () => {
  // Array representing the days of the week
  const days = ['S','M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around',}}>
      {days.map((day, index) => (
        <TouchableOpacity
          key={index}
          style={{
            backgroundColor: 'white',
            borderWidth: 1,
            borderRadius: 20,
            width: 40,
            height: 40,
            justifyContent: 'center',
            marginTop: 4,
            ...Platform.select({
              ios: {
                shadowColor: 'black',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
              },
              android: {
                elevation: 5,
              },
            }),
          }}
        >
          <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>{day}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default WeekDaysButtons;
