import React, {useContext, useEffect, useState} from 'react';
import {Alert, LogBox, Text, View, TouchableWithoutFeedback} from 'react-native';
import styled from 'styled-components';
import {Formik} from 'formik';
import {COLORS} from '../../../assets/theme/colors';
import {SignUpSchema, SignUpSchemaBusiness} from './schema';
import BasicButton from '../../../components/Button';
import FieldNameInput from '../../../components/Input/FieldNameInput';
import {getColonies} from '../../../assets/data/listColony';
import {Context} from '../../../context';
import {addUser, createUser, sendEmailV} from './../../../api/firebase/users';
import {useNavigation} from '@react-navigation/core';
import {useToast} from 'react-native-toast-notifications';
import ModalIncidents from '../../ReportsScreen/NewReportScreen/Form/ModalIncidents';

LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

const FormSignUp = () => {
  const navigation = useNavigation();
  const {setGlobalLoading} = useContext(Context);
  const [emailAlreadyInUse, setEmailAlreadyInUse] = useState(false);
  const [isBusiness, setIsBusiness] = useState(false);
  const [currentNeighborhood, setCurrentNeighborhood] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [validationSchema, setValidationSchema] = useState(SignUpSchema);

  const toast = useToast();

  useEffect(() => {
    if (isBusiness) {
      setValidationSchema(SignUpSchemaBusiness);
    } else {
      setValidationSchema(SignUpSchema);
    }
  }, [isBusiness]);

  const handleSubmit = values => {
    setGlobalLoading(true);

    const newValues = {
      ...values,
      neighborhood: currentNeighborhood,
      hasEmergency: false,
    };

    createUser(newValues.email, newValues.password)
      .then(res => {
        delete newValues.password;

        addUser({emailDoc: res.user.uid, ...newValues})
          .then(resSignUp => {
            sendEmailV()
              .then(res => console.log('correo enviado'))
              .catch(err => {
                Alert.alert('Ha ocurrido un error', err.message, [
                  {
                    text: 'Aceptar',
                  },
                ]);
              });

            toast.show('Se registró exitosamente tu usuario, se envió un correo de verificación', {
              type: 'custom_toast',
              animationDuration: 100,
              data: {
                title: 'Registro correcto',
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
          .finally(f => {
            setGlobalLoading(false);
          });
      })
      .catch(err => {
        setGlobalLoading(false);
        if (err.code == 'auth/email-already-in-use') {
          setEmailAlreadyInUse(true);
          Alert.alert('Ha ocurrido un error', 'Este correo ya esta en uso2', [
            {
              text: 'Aceptar',
            },
          ]);
        } else {
          setEmailAlreadyInUse(false);
          Alert.alert('Ha ocurrido un error', err.message, [
            {
              text: 'Aceptar',
            },
          ]);
        }
      })
      .finally(f => {
        setEmailAlreadyInUse(false);
      });
    return;
  };

  const handleOpenClose = () => setShowModal(!showModal);

  return (
    <Formik
      initialValues={{
        name: '',
        phone: '',
        businessName: '',
        streetNumber: '',
        neighborhood: '',
        zipcode: '',
        email: '',
        password: '',
      }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}>
      {({handleChange, handleBlur, handleSubmit, values, touched, errors, setFieldValue}) => {
        return (
          <LayoutContainer>
            <Container>
              <TitleStyled fontSize={20}>Registro de {isBusiness ? 'un negocio nuevo' : 'una cuenta nueva'}</TitleStyled>
              <FieldNameInput fieldName="Nombre completo" errors={errors} touched={touched} validateName="name" placeholder="Tu nombre completo" values={values} onBlur={handleBlur('name')} onChangeText={handleChange('name')} />
              <FieldNameInput fieldName="Teléfono" errors={errors} touched={touched} validateName="phone" placeholder={'Tu teléfono'} values={values} onBlur={handleBlur('phone')} onChangeText={handleChange('phone')} />
              {isBusiness && (
                <FieldNameInput
                  fieldName="Nombre del negocio"
                  errors={errors}
                  touched={touched}
                  validateName="businessName"
                  placeholder={'Nombre de tu negocio'}
                  values={values}
                  onBlur={handleBlur('businessName')}
                  onChangeText={handleChange('businessName')}
                />
              )}
              <FieldNameInput
                fieldName="Dirección 1 - Calle y número"
                errors={errors}
                touched={touched}
                validateName="streetNumber"
                placeholder={'Tu dirección (Calle y número)'}
                values={values}
                onBlur={handleBlur('streetNumber')}
                onChangeText={handleChange('streetNumber')}
              />

              <FieldNameInput fieldName="Dirección 2 - Colonia" errors={errors} touched={touched} validateName="neighborhood" values={values}>
                <TouchableWithoutFeedback onPress={handleOpenClose}>
                  <ContainerFieldName>{!currentNeighborhood ? <Name>Selecciona la colonia</Name> : <IncidentName>{currentNeighborhood?.value}</IncidentName>}</ContainerFieldName>
                </TouchableWithoutFeedback>
              </FieldNameInput>

              <FieldNameInput fieldName="Código postal" errors={errors} touched={touched} validateName="zipcode" placeholder={'Tu código postal (5 digítos)'} values={values} onBlur={handleBlur('zipcode')} onChangeText={handleChange('zipcode')} />
              <FieldNameInput
                fieldName="Email"
                errors={errors}
                showError={emailAlreadyInUse}
                errorMessage="Este correo ya esta en uso"
                touched={touched}
                validateName="email"
                placeholder={'Email'}
                values={values}
                onBlur={handleBlur('email')}
                onChangeText={handleChange('email')}
                autoCapitalize="none"
              />
              <FieldNameInput
                fieldName="Contraseña"
                errors={errors}
                touched={touched}
                validateName="password"
                placeholder={'Contraseña'}
                values={values}
                onBlur={handleBlur('password')}
                onChangeText={handleChange('password')}
                autoCapitalize="none"
                secureTextEntry
              />
              <TouchableWithoutFeedback onPress={() => setIsBusiness(!isBusiness)}>
                <View>
                  <CtaText>{isBusiness ? 'No tengo negocio' : 'Cuento con un negocio'}</CtaText>
                </View>
              </TouchableWithoutFeedback>
            </Container>
            <SignUpButtonStyled text={'Deseo registrarme'} onPress={handleSubmit} backgroundColor={COLORS().purple} colorText={COLORS().white} />

            <ModalIncidents
              list={getColonies()}
              title="Selecciona una colonia"
              placeholder="Busca tu colonia"
              visible={showModal}
              handleOpenClose={handleOpenClose}
              handleSetIncident={item => {
                setCurrentNeighborhood(item);
                handleOpenClose();
                setFieldValue('neighborhood', item?.value);
                if (item?.codigoPostal !== '' && item?.codigoPostal !== 0) {
                  setFieldValue('zipcode', item?.codigoPostal.toString());
                }
              }}
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

const TitleStyled = styled(Text)`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 15px;
`;

const CtaText = styled(Text)`
  font-size: 15px;
  font-weight: 500;
  margin-top: 15px;
  text-align: right;
  color: ${COLORS().purple};
`;

const SignUpButtonStyled = styled(BasicButton)`
  margin-top: 10px;
`;

const ContainerFieldName = styled(View)`
  margin-top: 5px;
  margin-bottom: 10px;
  background-color: ${COLORS().white};
  border-radius: 3px;
  border-width: 1px;
  border-color: ${COLORS().grayInput};
  padding: 10px 15px;
  font-size: 14px;
  width: 100%;
`;

const Name = styled(Text)`
  flex: 1;
  color: #c7c7cd;
`;

const IncidentName = styled(Name)`
  flex: 1;
  color: ${COLORS().black};
`;

export default FormSignUp;
