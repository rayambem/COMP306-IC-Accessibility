
import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

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

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    //height: '70%',
    backgroundColor: '#F0F4FA',
    borderRadius: 10,
    padding: 40,
    alignItems: 'center',
  },
  modalHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalTitleContainer: {
    alignItems: 'center', 
  },
  modalDate: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
  },
  closeButton: {
    fontSize: 24,
    color: '#333',
  },
  noticeContent: {
    width: '100%',
  },
  noticeItem: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
  },
  noticeTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  noticeDescription: {
    fontSize: 14,
    color: '#333',
  },
});

export default AccessibilityNotices;
