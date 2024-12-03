
import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import styles from '../styles/styles.js';

const AccessibilityNotices = ({ visible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
            {/* Title and Date */}
            <View>
              <Text style={styles.modalTitle}>Today's Notices:</Text>
              <Text style={styles.modalDate}>November 8th, 2024</Text>
            </View>
            {/* Close button */}
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Notice Content */}
          <ScrollView style={styles.noticeContent}>
            <View style={styles.noticeItem}>
              <Text style={styles.noticeTitle}>Williams Hall - Elevator Outage</Text>
              <Text style={styles.noticeDescription}>
                The elevator at the north entrance of the building is OUT OF ORDER.
                Alternative routing utilizes the elevator at the east entrance.
              </Text>
            </View>
            <View style={styles.noticeItem}>
              <Text style={styles.noticeTitle}>Upper Quads - Ongoing Construction</Text>
              <Text style={styles.noticeDescription}>
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
