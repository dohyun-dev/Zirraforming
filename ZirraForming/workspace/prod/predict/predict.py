import pandas as pd
import warnings
warnings.filterwarnings('ignore')
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures
import numpy as np
import matplotlib.pyplot as plt
import joblib


def predict_run(case, number):
    # 2020_2030 데이터 들고오기
    data_2030 = pd.read_csv('/app/predict/2020_2030_data.csv')


    if case == 1:
        for i in range(len(data_2030)):
            data_2030.loc[i, 'CO2'] = data_2030.loc[i, 'CO2'] - number
    else:
        for i in range(len(data_2030)):
            data_2030.loc[i, 'CO2'] = data_2030.loc[i, 'CO2'] - number * 30


    # 학습 시킬 데이터 x_future_data, x_future_data_poly로 만들기
    x_future_data = data_2030[[  'CH4', 'NO', 'CO2']]

    poly_features = PolynomialFeatures(degree=2, include_bias=False)
    x_future_data_poly = poly_features.fit_transform(x_future_data)

    # 학습시킨 결과 load해서 예측하기
    temperature_learning = joblib.load('/app/predict/temperature_learning')
    result_temperature_2030 = list(temperature_learning.predict(x_future_data_poly))
    print(result_temperature_2030)
    data_2030['temperature_predict'] = result_temperature_2030
    ice_mass_learning = joblib.load('/app/predict/ice_mass_learning')
    result_ice_mass_2030 = list(ice_mass_learning.predict(x_future_data))
    data_2030['ice_mass_predict'] = result_ice_mass_2030

    for i in range(len(data_2030)):
        if i % 10 == 1:
    #         data_2030.loc[i, 'Temperature'] = data_2030.loc[i, 'Temperature'] - 0.005
            data_2030.loc[i, 'temperature_predict'] = data_2030.loc[i, 'temperature_predict'] - 0.005
        elif i % 10 == 2:
    #         data_2030.loc[i, 'Temperature'] = data_2030.loc[i, 'Temperature'] - 0.004
            data_2030.loc[i, 'temperature_predict'] = data_2030.loc[i, 'temperature_predict'] - 0.004
        elif i% 10 == 3:
    #         data_2030.loc[i, 'Temperature'] = data_2030.loc[i, 'Temperature'] + 0.006
            data_2030.loc[i, 'temperature_predict'] = data_2030.loc[i, 'temperature_predict'] + 0.006
        elif i% 10 == 4:
    #         data_2030.loc[i, 'Temperature'] = data_2030.loc[i, 'Temperature'] - 0.003
            data_2030.loc[i, 'temperature_predict'] = data_2030.loc[i, 'temperature_predict'] - 0.003
        elif i% 10 == 5:
    #         data_2030.loc[i, 'Temperature'] = data_2030.loc[i, 'Temperature'] + 0.002
            data_2030.loc[i, 'temperature_predict'] = data_2030.loc[i, 'temperature_predict'] + 0.002
        elif i% 10 == 6:
    #         data_2030.loc[i, 'Temperature'] = data_2030.loc[i, 'Temperature'] + 0.004
            data_2030.loc[i, 'temperature_predict'] = data_2030.loc[i, 'temperature_predict'] + 0.004
        elif i% 10 == 7:
    #         data_2030.loc[i, 'Temperature'] = data_2030.loc[i, 'Temperature'] - 0.003
            data_2030.loc[i, 'temperature_predict'] = data_2030.loc[i, 'temperature_predict'] - 0.003
        elif i% 10 == 8:
    #         data_2030.loc[i, 'Temperature'] = data_2030.loc[i, 'Temperature'] - 0.005
            data_2030.loc[i, 'temperature_predict'] = data_2030.loc[i, 'temperature_predict'] - 0.005
        elif i% 10 == 9:
    #         data_2030.loc[i, 'Temperature'] = data_2030.loc[i, 'Temperature'] - 0.007
            data_2030.loc[i, 'temperature_predict'] = data_2030.loc[i, 'temperature_predict'] - 0.007
        else:
    #         data_2030.loc[i, 'Temperature'] = data_2030.loc[i, 'Temperature'] + 0.002
            data_2030.loc[i, 'temperature_predict'] = data_2030.loc[i, 'temperature_predict'] + 0.002
            
    for i in range(len(data_2030)):
        if i % 10 == 1:
    #         data_2030.loc[i, 'ice_mass'] = data_2030.loc[i, 'ice_mass'] - 1500
            data_2030.loc[i, 'ice_mass_predict'] = data_2030.loc[i, 'ice_mass_predict'] - 750
        elif i% 10 == 2:
    #         data_2030.loc[i, 'ice_mass'] = data_2030.loc[i, 'ice_mass'] + 3000
            data_2030.loc[i, 'ice_mass_predict'] = data_2030.loc[i, 'ice_mass_predict'] + 1500
        elif i% 10 == 3:
    #         data_2030.loc[i, 'ice_mass'] = data_2030.loc[i, 'ice_mass'] - 2000
            data_2030.loc[i, 'ice_mass_predict'] = data_2030.loc[i, 'ice_mass_predict'] - 1000
        elif i% 10 == 4:
    #         data_2030.loc[i, 'ice_mass'] = data_2030.loc[i, 'ice_mass'] + 1000
            data_2030.loc[i, 'ice_mass_predict'] = data_2030.loc[i, 'ice_mass_predict'] + 500
        elif i% 10 == 5:
    #         data_2030.loc[i, 'ice_mass'] = data_2030.loc[i, 'ice_mass'] + 1500
            data_2030.loc[i, 'ice_mass_predict'] = data_2030.loc[i, 'ice_mass_predict'] + 750
        elif i% 10 == 6:
    #         data_2030.loc[i, 'ice_mass'] = data_2030.loc[i, 'ice_mass'] - 2000
            data_2030.loc[i, 'ice_mass_predict'] = data_2030.loc[i, 'ice_mass_predict'] - 1000
        elif i% 10 == 7:
    #         data_2030.loc[i, 'ice_mass'] = data_2030.loc[i, 'ice_mass'] - 3000
            data_2030.loc[i, 'ice_mass_predict'] = data_2030.loc[i, 'ice_mass_predict'] - 1500
        elif i% 10 == 8:
    #         data_2030.loc[i, 'ice_mass'] = data_2030.loc[i, 'ice_mass'] + 1500
            data_2030.loc[i, 'ice_mass_predict'] = data_2030.loc[i, 'ice_mass_predict'] + 750
        elif i % 10 == 9:
    #         data_2030.loc[i, 'ice_mass'] = data_2030.loc[i, 'ice_mass'] - 800
            data_2030.loc[i, 'ice_mass_predict'] = data_2030.loc[i, 'ice_mass_predict'] - 400
        else:
    #         data_2030.loc[i, 'ice_mass'] = data_2030.loc[i, 'ice_mass'] + 1000
            data_2030.loc[i, 'ice_mass_predict'] = data_2030.loc[i, 'ice_mass_predict'] + 500
    print(data_2030)


    # # 2030년도 지구온도 감소 차이, 이산화 탄소, 빙하무게
    answer_dict = {}
    answer_dict['temperature_2030'] = round((data_2030.loc[10, 'Temperature'] - data_2030.loc[10, 'temperature_predict']),5)
    answer_dict['ice_2030'] = round((data_2030.loc[10, 'ice_mass'] - data_2030.loc[10, 'ice_mass_predict'])/-data_2030.loc[10, 'ice_mass'],5) * 100
    if case == 1:
        answer_dict['co2_2030'] = round((number)/data_2030.loc[10, 'CO2'],5) * 100
        answer_dict['year'] = [i for i in range(2020, 2031)]
        answer_dict['temperature'] = list(data_2030.loc[:, 'Temperature'])
        answer_dict['temperature_predict'] = list(data_2030.loc[:, 'temperature_predict'])
    else:
        answer_dict['co2_2030'] = round((number * 30)/data_2030.loc[10, 'CO2'],5) * 100
        answer_dict['year'] = [i for i in range(2020, 2031)]
        answer_dict['ice_mass'] = list(data_2030.loc[:, 'ice_mass'])
        answer_dict['ice_mass_predict'] = list(data_2030.loc[:, 'ice_mass_predict'])
    return answer_dict