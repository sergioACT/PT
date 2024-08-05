import React, {useContext, useState} from 'react';
import {Alert, LogBox, Text, TouchableWithoutFeedback, View} from 'react-native';
import styled from 'styled-components';
import {Formik} from 'formik';
import Geocode from 'react-geocode';
import {useNavigation} from '@react-navigation/core';
import {COLORS} from '../../../../assets/theme/colors';
import {NewReportSchema} from './schema';
import FieldNameInput from '../../../../components/Input/FieldNameInput';
import BasicButton from '../../../../components/Button';
import FieldName from '../../../../components/Input/FieldName';
import {Context} from '../../../../context';
import ContainerCameraImage from '../../../../components/ContainerCameraImage';
import FieldMap from '../../../../components/FieldMap';
import {addReport, getImage, uploadImage} from '../../../../api/firebase/reports';
import {useToast} from 'react-native-toast-notifications';
import ModalIncidents from './ModalIncidents';

LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

const FormNewReport = ({onGoBack}) => {
  const navigation = useNavigation();
  const {setGlobalLoading, userData} = useContext(Context);

  const [origin, setOrigin] = useState({});
  const [image, setImage] = useState(null);
  const [currentIncident, setCurrentIncident] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const toast = useToast();

  const handleSubmit = async values => {
    let originalOrigin = origin;
    if (Object.keys(originalOrigin).length == 0) {
      await Geocode.fromAddress(values.address).then(
        response => {
          const {lat, lng} = response.results[0].geometry.location;
          originalOrigin = {
            latitude: lat,
            longitude: lng,
          };
        },
        error => {
          Alert.alert('Dirección incorrecta', 'Favor de ingresar una dirección válida', [
            {
              text: 'Aceptar',
            },
          ]);
        },
      );
    }
    if (Object.keys(originalOrigin).length == 0) {
      return;
    }

    let newValues = {
      ...values,
      location: {address: values.address, coords: originalOrigin},
    };

    delete newValues.address;

    newValues = {
      ...newValues,
      creationDate: Date.now(),
      status: 'pending',
      userId: userData.emailDoc,
    };

    setGlobalLoading(true);

    if (image) {
      if (image?.assets.length > 0) {
        let imageName = newValues.creationDate + '_' + values.incident?.value.replace(' ', '_');
        await uploadImage(image?.assets[0], imageName)
          .then(res =>
            getImage(res.ref)
              .then(url => {
                newValues = {
                  ...newValues,
                  image: {imageName, url},
                };
              })
              .catch(error => {
                setGlobalLoading(false);
                Alert.alert('Ha ocurrido un error', error.message, [
                  {
                    text: 'Aceptar',
                  },
                ]);
              }),
          )
          .catch(error => {
            setGlobalLoading(false);
            Alert.alert('Ha ocurrido un error', error.message, [
              {
                text: 'Aceptar',
              },
            ]);
          });
      }
    }
    addReport(newValues)
      .then(res => {
        onGoBack({...newValues, id: res.id});
        toast.show('Tu reporte se ha registrado', {
          type: 'custom_toast',
          animationDuration: 100,
          data: {
            title: 'Reporte enviado',
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

  const handleOpenClose = () => setShowModal(!showModal);

  return (
    <Formik
      initialValues={{
        incident: '',
        address: '',
        description: '',
        image: '',
      }}
      onSubmit={handleSubmit}
      validationSchema={NewReportSchema}>
      {({handleChange, handleBlur, handleSubmit, values, touched, errors, setFieldValue}) => {
        return (
          <LayoutContainer>
            <Container>
              <FieldNameInput fieldName="Incidente" validateName="incident" touched={touched} errors={errors} values={values}>
                <TouchableWithoutFeedback onPress={handleOpenClose}>
                  <ContainerFieldName>{!currentIncident ? <Name>Selecciona el tipo de incidente</Name> : <IncidentName>{currentIncident?.value}</IncidentName>}</ContainerFieldName>
                </TouchableWithoutFeedback>
              </FieldNameInput>

              <FieldMap errors={errors} touched={touched} values={values} handleBlur={handleBlur} handleChange={handleChange} />

              <FieldNameInput
                fieldName="Descripción del incidente"
                errors={errors}
                touched={touched}
                validateName="description"
                values={values}
                placeholder={'Escriba una descripción'}
                value={values.description}
                onBlur={handleBlur('description')}
                onChangeText={handleChange('description')}
                multiline={true}
                blurOnSubmit={true}
                styleInput={{height: 100, paddingBottom: 10, textAlignVertical: 'top'}}
                verticalAlign={'top'}
              />
              <FieldContainer>
                <FieldName>Imagen del incidente</FieldName>
              </FieldContainer>

              <ContainerCameraImage image={image} setImage={setImage} />
            </Container>
            <NewReportButtonStyled text={'Enviar reporte'} onPress={handleSubmit} backgroundColor={COLORS().blue} colorText={COLORS().white} />

            <ModalIncidents
              visible={showModal}
              handleOpenClose={handleOpenClose}
              handleSetIncident={item => {
                setCurrentIncident(item);
                handleOpenClose();
                setFieldValue('incident', item);
              }}
            />
          </LayoutContainer>
        );
      }}
    </Formik>
  );
};

const LayoutContainer = styled(View)`
  flex: 1;
  margin-top: 20px;
`;

const Container = styled(View)`
  flex: 1;
`;

const FieldContainer = styled(View)`
  flex-direction: row;
  margin-top: 10px;
  margin-bottom: 7px;
`;

const NewReportButtonStyled = styled(BasicButton)`
  margin-top: 10px;
`;

const Name = styled(Text)`
  flex: 1;
  color: #c7c7cd;
`;

const IncidentName = styled(Name)`
  flex: 1;
  color: ${COLORS().black};
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

export default FormNewReport;
