import React, { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FAQItem = ({ question, answer }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <View style={[styles.container, expanded && styles.containerExpanded]}>
      <TouchableOpacity
        style={styles.questionContainer}
        onPress={toggleExpanded}
      >
        <Text style={styles.question}>{question}</Text>
        <Ionicons
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={24}
          color="black"
        />
      </TouchableOpacity>
      {expanded && (
        <View style={styles.answerContainer}>
          <Text style={styles.answer}>{answer}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    elevation: 2,
  },
  containerExpanded: {
    elevation: 4,
  },
  questionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  question: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
  },
  answerContainer: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  answer: {
    fontSize: 16,
  },
});

export default FAQItem;