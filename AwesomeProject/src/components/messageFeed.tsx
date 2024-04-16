/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { useQuery } from 'react-query';
import { MessageResponse, messageFeedService } from '../services/messageFeedService';


function MessageFeed(): React.JSX.Element {
  const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxMzI1NTc4NCwiZXhwIjoxNzIyNzQ1MDM5ODc2fQ.1NBaHdG0hWt5qIHRnpZcCnvBFC_2exxXUNKL-yWMuxs";
  const conversationId = 1;
  const userId = 1;
  const [messages, setMessages] = useState<MessageResponse[]>([]);
  // const newMessage = useMercure(`/conversations/${conversationId}`);
  const messagesEndRef = useRef<ScrollView>(null);

  const { data, error, isLoading } = useQuery(['message-feed', conversationId], () => messageFeedService(authToken, conversationId), {
    enabled: !!conversationId,
    onSuccess: (response) => {
      if ('data' in response.body) {
        setMessages(response.body.data);
      }
    }
  });

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  // useEffect(() => {
  //   if (newMessage) {
  //     setMessages(currentMessages => [...currentMessages, newMessage]);
  //   }
  // }, [newMessage]);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error loading the conversations!</Text>;
  }
  return (
    <ScrollView ref={messagesEndRef} style={styles.container}>
      {messages.map((message, index) => (
        <View key={index} style={styles.messageContainer}>
          <Text style={[styles.message, { alignSelf: message.senderId === userId ? 'flex-end' : 'flex-start' }]}>
            {message.message}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  messageContainer: {
    marginVertical: 5,
  },
  message: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 10,
  },
});


export default MessageFeed;