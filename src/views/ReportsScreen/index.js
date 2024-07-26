import React, {useContext, useEffect, useState} from 'react';
import {Alert, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import styled from 'styled-components';
import NavBar from '../../components/NavBar';
import Screen from '../../components/Screen';
import Geolocation from '@react-native-community/geolocation';
import {DataTable} from 'react-native-paper';
import Icons from '../../components/Icons';
import BasicButton from '../../components/Button';
import {COLORS} from '../../assets/theme/colors';
import {useNavigation} from '@react-navigation/core';
import {Context} from '../../context';
import {getReports} from '../../api/firebase/reports';
import ReportDetailModal from './Details/ReportDetailModal';
import CustomAlert from '../../components/CustomAlert';

const status = {
  pending: {
    name: 'clockcircleo',
    type: 'ant',
    color: COLORS().pending,
  },
  active: {
    name: 'radio-btn-active',
    type: 'fontisto',
    color: COLORS().active,
  },
  finished: {
    name: 'check',
    type: 'feather',
    color: COLORS().blue,
  },
  unfinished: {
    name: 'x',
    type: 'feather',
    color: COLORS().red,
  },
};

const ReportsScreen = () => {
  const navigation = useNavigation();

  const [reports, setReports] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const [showAlert, setShowAlert] = useState(false);

  const [currentReport, setCurrentReport] = useState({});

  const {userData, setGlobalLoading} = useContext(Context);

  useEffect(() => {
    setGlobalLoading(true);
    getReports(userData.emailDoc)
      .then(res => {
        setReports(
          res.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          })),
        );
        setLoaded(true);
      })
      .catch(error => {
        Alert.alert('Ha ocurrido un error', error.message, [
          {
            text: 'Aceptar',
          },
        ]);
      })
      .finally(f => setGlobalLoading(false));
  }, []);

  const handleNewReport = () =>
    navigation.navigate('NewReportScreen', {
      onGoBack: newReport => setReports([...reports, newReport]),
    });

  const handlePressMapView = report => {
    Geolocation.getCurrentPosition(info => {
      navigation.navigate('MapViewScreen', {
        currentLocation: report.location.coords,
        originalReport: report,
        saveLocation: null,
      });
    });
  };

  const handlePressImage = report => {
    navigation.navigate('ImageModalScreen', {
      url: report?.image?.url,
    });
  };

  const handleCustomAlert = () => setShowAlert(!showAlert);

  const handlePressOpenModal = r => {
    setCurrentReport(r);
    setShowAlert(true);
  };

  const renderData = () =>
    reports.map(d => (
      <DataTable.Row key={d.id}>
        <TouchableOpacity onPress={() => handlePressOpenModal(d)} style={{flex: 5}}>
          <BiggestCellStyled>
            <TextStyled color={d?.monitor?.state ? status[d?.monitor?.state]?.color : status.pending.color}>{d.incident?.value}</TextStyled>
          </BiggestCellStyled>
        </TouchableOpacity>
        <CellStyled>
          <TouchableOpacity onPress={() => handlePressMapView(d)}>
            <WrapperIcon>
              <Icons name="place" type="material" />
            </WrapperIcon>
          </TouchableOpacity>
        </CellStyled>
        <CellStyled>
          {d.image && (
            <TouchableOpacity onPress={() => handlePressImage(d)}>
              <WrapperIcon>
                <Icons name="attachment" type="entypo" />
              </WrapperIcon>
            </TouchableOpacity>
          )}
        </CellStyled>
        <CellStyled>
          {d.image && (
            <TouchableOpacity onPress={() => handlePressImage(d)}>
              <WrapperIcon>
                <Icons
                  color={d?.monitor?.state ? status[d?.monitor?.state]?.color : status.pending.color}
                  name={d?.monitor?.state ? status[d?.monitor?.state]?.name : status.pending.name}
                  type={d?.monitor?.state ? status[d?.monitor?.state]?.type : status.pending.type}
                />
              </WrapperIcon>
            </TouchableOpacity>
          )}
        </CellStyled>
      </DataTable.Row>
    ));

  const renderTable = () => (
    <DataTable style={{flex: 1}}>
      <DataTable.Header>
        <BiggestTitleStyled>Incidente</BiggestTitleStyled>
        <TitleStyled>Lugar</TitleStyled>
        <TitleStyled>Anexo</TitleStyled>
        <TitleStyled>Estado</TitleStyled>
      </DataTable.Header>
      {renderData()}
    </DataTable>
  );

  return (
    <Screen scroll>
      <NavBar hasBackButton />
      <LayoutContainer>
        {loaded && (
          <Container>
            {reports.length ? (
              <LayoutContainer>
                <Name>Últimos reportes</Name>
                {renderTable()}
              </LayoutContainer>
            ) : (
              <NoInfoWrapper>
                <NoInfo>No se encontraron reportes</NoInfo>
              </NoInfoWrapper>
            )}
            <ButtonStyled text={'Nuevo reporte'} onPress={handleNewReport} backgroundColor={COLORS().blue} colorText={COLORS().white} />
          </Container>
        )}
      </LayoutContainer>
      <CustomAlert visibility={showAlert} handleClose={handleCustomAlert} height={220}>
        <ReportDetailModal handleClose={handleCustomAlert} report={currentReport} />
      </CustomAlert>
    </Screen>
  );
};

const LayoutContainer = styled(View)`
  flex: 1;
  width: 100%;
`;

const Container = styled(View)`
  flex: 1;
  width: 90%;
  align-self: center;
  margin: 20px 0;
`;

const Name = styled(Text)`
  font-size: 25px;
  font-weight: bold;
  width: 100%;
`;

const TextStyled = styled(Text)`
  color: ${props => props?.color};
`;

const ButtonStyled = styled(BasicButton)``;

const BiggestTitleStyled = styled(DataTable.Title)`
  flex: 5;
`;

const TitleStyled = styled(DataTable.Title)`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const BiggestCellStyled = styled(DataTable.Cell)`
  flex: 5;
`;

const CellStyled = styled(DataTable.Cell)`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const NoInfoWrapper = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const NoInfo = styled(Text)`
  font-size: 20px;
`;

const WrapperIcon = styled(View)`
  justify-content: center;
  align-items: center;
  padding: 10px;
  align-self: center;
`;

export default ReportsScreen;
