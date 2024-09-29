import { SafeAreaView, StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import { Colors } from '../../Utils/Colors';
import LinearGradient from 'react-native-linear-gradient';

const About = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={[Colors.primaryLight, Colors.primary, Colors.primaryDark]}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.title}>About Our App</Text>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Our Mission</Text>
            <Text style={styles.sectionText}>
              {`We strive to create innovative solutions that make a positive impact on people's lives.`}
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Features</Text>
            <Text style={styles.sectionText}>
              {`• User-friendly interface\n• Powerful functionality\n• Secure and reliable\n• Regular updates`}
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{'Contact Us'}</Text>
            <Text style={styles.sectionText}>
              {`Email: support@ourapp.com\nPhone: (123) 456-7890`}
            </Text>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default About;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    color: Colors.white,
    lineHeight: 24,
  },
});
