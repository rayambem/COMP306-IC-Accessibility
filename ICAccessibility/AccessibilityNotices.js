
import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import styles from './styles/global.js';
import homeStyles from './styles/homeStyle.js';

const AccessibilityNotices = ({ visible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={homeStyles.modalBackground}>
        <View style={homeStyles.modalContainer}>
        <View style={homeStyles.modalHeader}>
            {/* Title and Date */}
            <View>
              <Text style={homeStyles.modalTitle}>Today's Notices:</Text>
              <Text style={homeStyles.modalDate}>November 8th, 2024</Text>
            </View>
            {/* Close button */}
            <TouchableOpacity onPress={onClose}>
              <Text style={homeStyles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Notice Content */}
          <ScrollView style={homeStyles.noticeContent}>
            <View style={homeStyles.noticeItem}>
              <Text style={homeStyles.noticeTitle}>Williams Hall - Elevator Outage</Text>
              <Text style={homeStyles.noticeDescription}>
                The elevator at the north entrance of the building is OUT OF ORDER.
                Alternative routing utilizes the elevator at the east entrance.
              </Text>
            </View>
            <View style={homeStyles.noticeItem}>
              <Text style={homeStyles.noticeTitle}>Upper Quads - Ongoing Construction</Text>
              <Text style={homeStyles.noticeDescription}>
                The accessible pathway behind Holmes Hall is currently closed due to ongoing construction.
                Alternative routing goes around Rowland Hall for access.
              </Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};



export default AccessibilityNotices;
