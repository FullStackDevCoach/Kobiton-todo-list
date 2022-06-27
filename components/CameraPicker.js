import {Modal, Portal} from 'react-native-paper';
import {Text} from 'react-native';

const CameraPicker = () => {
    return <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
            <Text>Example Modal.  Click outside this area to dismiss.</Text>
        </Modal>
    </Portal>
}
