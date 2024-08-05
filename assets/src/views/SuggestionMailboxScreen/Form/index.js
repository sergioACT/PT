import React, {useContext} from 'react';
import {View} from 'react-native';
import styled from 'styled-components';
import {Formik} from 'formik';
import {COLORS} from '../../../assets/theme/colors';
import {SuggestionMailboxSchema} from './schema';
import BasicButton from '../../../components/Button';
import FieldNameInput from '../../../components/Input/FieldNameInput';
import CustomPicker from '../../../components/Picker';
import {Context} from '../../../context';
import {addSuggestion} from '../../../api/firebase/mailbox';
import {useNavigation} from '@react-navigation/core';
import {useToast} from 'react-native-toast-notifications';

export const listIssues = [
  {
    id: 1,
    label: 'Sugerencia',
    value: 'Sugerencia',
  },
  {
    id: 2,
    label: 'Queja',
    value: 'Queja',
  },
  {
    id: 3,
    label: 'Elogio',
    value: 'Elogio',
  },
];

const FormNewSuggestion = () => {
  const {setGlobalLoading, userData} = useContext(Context);
  const navigation = useNavigation();

  const toast = useToast();

  const handleSubmit = async values => {
    setGlobalLoading(true);

    const newValues = {
      ...values,
      userId: userData.emailDoc,
      creationDate: Date.now(),
    };

    addSuggestion(newValues)
      .then(res => {
        toast.show('Tu sugerencia se ha enviado con éxito', {
          type: 'custom_toast',
          animationDuration: 100,
          data: {
            title: 'Sugerencia enviada',
          },
        });
        navigation.goBack();
      })
      .catch(err => {
        Alert.alert('Ha ocurrido un error', err.message, [
          {
            text: 'Aceptar',
          },
        ]);
      })
      .finally(f => setGlobalLoading(false));
  };

  return (
    <Formik
      initialValues={{
        complaint: '',
        message: '',
      }}
      onSubmit={handleSubmit}
      validationSchema={SuggestionMailboxSchema}>
      {({handleChange, handleBlur, handleSubmit, values, touched, errors}) => {
        return (
          <LayoutContainer>
            <Container>
              <FieldNameInput
                fieldName="En que podemos ayudarte"
                errors={errors}
                touched={touched}
                validateName="complaint"
                values={values}>
                <CustomPicker
                  onValueChange={handleChange('complaint')}
                  items={listIssues}
                  placeholderText={'Selecciona una opción'}
                />
              </FieldNameInput>
              <FieldNameInput
                fieldName="Mensaje"
                errors={errors}
                touched={touched}
                validateName="message"
                placeholder={'Tu mensaje'}
                values={values}
                onBlur={handleBlur('message')}
                onChangeText={handleChange('message')}
              />
            </Container>
            <NewButtonStyled
              text={'Enviar'}
              onPress={handleSubmit}
              backgroundColor={COLORS().purple}
              colorText={COLORS().white}
            />
          </LayoutContainer>
        );
      }}
    </Formik>
  );
};

const LayoutContainer = styled(View)`
  margin-top: 20px;
  flex: 1;
`;

const Container = styled(View)`
  flex: 1;
`;

const NewButtonStyled = styled(BasicButton)`
  margin-top: 10px;
`;

export default FormNewSuggestion;
