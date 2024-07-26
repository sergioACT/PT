import React, {useContext, useEffect, useState} from 'react';
import {Alert, View} from 'react-native';
import styled from 'styled-components';
import {Formik} from 'formik';
import {COLORS} from '../../../../assets/theme/colors';
import {UpdateDataSchema, UpdateDataSchemaBusiness} from './schema';
import BasicButton from '../../../../components/Button';
import FieldNameInput from '../../../../components/Input/FieldNameInput';
import {Context} from '../../../../context';
import {updateData} from './../../../../api/firebase/users';
import {getColonies} from '../../../../assets/data/listColony';
import CustomPicker from '../../../../components/Picker';

const FormUpdateData = ({setShowAlert}) => {
  const [currentValues, setCurrentValues] = useState({
    name: '',
    phone: '',
    streetNumber: '',
    neighborhood: {},
    zipcode: '',
    email: '',
  });

  const [currentSchema, setCurrentSchema] = useState({});
  const [currentNeighborhood, setCurrentNeighborhood] = useState({});

  const {userData, setGlobalLoading, setUserData, setNewEmail} =
    useContext(Context);
  const {
    email,
    id,
    name,
    neighborhood,
    phone,
    streetNumber,
    zipcode,
    emailDoc,
    businessName,
  } = userData;

  useEffect(() => {
    setCurrentValues({
      id,
      name,
      phone,
      streetNumber,
      neighborhood: neighborhood?.value,
      zipcode,
      email,
      businessName,
    });

    setCurrentSchema(
      businessName == '' ? UpdateDataSchema : UpdateDataSchemaBusiness,
    );

    setCurrentNeighborhood(neighborhood);
  }, []);

  const onSubmit = values => {
    //setNewEmail(values.email != email ? values.email : '');
    // setUserData({...values, neighborhood: currentNeighborhood});
    return;

    if (values.email != email) {
      setShowAlert(true);
    } else {
      setGlobalLoading(true);
      updateData(values, emailDoc)
        .then(() => {
          if (values.email != email) {
            setShowAlert(true);
          }
        })
        .catch(error =>
          Alert.alert('Ha ocurrido un error', error.message, [
            {
              text: 'Aceptar',
            },
          ]),
        )
        .finally(f => setGlobalLoading(false));
    }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={currentValues}
      onSubmit={onSubmit}
      validationSchema={UpdateDataSchema}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        touched,
        errors,
        setFieldValue,
      }) => {
        return (
          <LayoutContainer>
            <Container>
              <FieldNameInput
                fieldName="Nombre completo"
                errors={errors}
                touched={touched}
                validateName="name"
                placeholder="Tu nombre completo"
                values={values}
                onBlur={handleBlur('name')}
                onChangeText={handleChange('name')}
              />
              <FieldNameInput
                fieldName="Teléfono"
                errors={errors}
                touched={touched}
                validateName="phone"
                placeholder={'Tu teléfono'}
                values={values}
                onBlur={handleBlur('phone')}
                onChangeText={handleChange('phone')}
              />
              {businessName != '' && (
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

              <FieldNameInput
                fieldName="Dirección 2 - Colonia"
                errors={errors}
                touched={touched}
                validateName="neighborhood"
                values={values}>
                <CustomPicker
                  value={values.neighborhood}
                  onValueChange={value => {
                    const currentN = getColonies().find(
                      colony => colony.value == value,
                    );

                    setCurrentNeighborhood(currentN);

                    if (currentN?.codigoPostal && currentN?.codigoPostal != 0) {
                      setFieldValue(
                        'zipcode',
                        currentN?.codigoPostal.toString(),
                      );
                    }
                    setFieldValue('neighborhood', value);
                  }}
                  items={getColonies()}
                  placeholderText="Selecciona tu colonia"
                />
              </FieldNameInput>
              <FieldNameInput
                fieldName="Código postal"
                errors={errors}
                touched={touched}
                validateName="zipcode"
                placeholder={'Tu código postal (5 digítos)'}
                values={values}
                onBlur={handleBlur('zipcode')}
                onChangeText={handleChange('zipcode')}
              />
              <FieldNameInput
                fieldName="Email"
                errors={errors}
                errorMessage="Este correo ya esta en uso"
                touched={touched}
                validateName="email"
                placeholder={'Email'}
                values={values}
                onBlur={handleBlur('email')}
                onChangeText={handleChange('email')}
                autoCapitalize="none"
              />
            </Container>
            <UpdateButtonStyled
              text={'Actualizar mis datos'}
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
  flex: 1;
`;

const Container = styled(View)`
  flex: 1;
`;

const UpdateButtonStyled = styled(BasicButton)`
  margin-top: 10px;
`;

export default FormUpdateData;
