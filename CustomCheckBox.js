
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomCheckBox = ({ label, isChecked, onValueChange }) => {
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={() => onValueChange(!isChecked)}
    >
      <Text style={[styles.box, isChecked && styles.checked]}>{isChecked ? '✓' : ''}</Text>
      {label && <Text style={styles.label}>{label}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  box: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#000',
    marginRight: 5,
    textAlign: 'center',
    lineHeight: 18,
  },
  checked: {
    backgroundColor: '#eee',
  },
  label: {
    fontSize: 16,
  },
});

export default CustomCheckBox;
