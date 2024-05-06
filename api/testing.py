from sklearn import svm
from sklearn.neighbors import KNeighborsClassifier
import pickle
import statistics
import os
from numpy.fft import rfft, rfftfreq
import scipy
from scipy.stats import kurtosis
from scipy.stats import skew
from numpy.fft import rfft, rfftfreq
from sklearn import preprocessing
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.svm import SVC
from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import train_test_split
import pandas as pd
import sys

file_path = sys.argv[1]
class_01_data_path = file_path
class_01_data = pd.read_csv(class_01_data_path)

def FFT(data):
    '''FFT process and filtering'''
    data = np.asarray(data)
    n = len(data)
    dt = 1/300  # Time increment in each data
    data = rfft(data)*dt
    freq = rfftfreq(n, dt)
    data = abs(data).T
    return data

# Feature Extraction function - Standard Deviation
def std(data):
    '''Standard Deviation features'''
    data = np.asarray(data)
    stdev = pd.DataFrame(np.std(data, axis=1))
    return stdev

# Feature Extraction function - Mean
def mean(data):
    '''Mean features'''
    data = np.asarray(data)
    M = pd.DataFrame(np.mean(data, axis=1))
    return M

# Feature Extraction function - Peak-to-Peak
def pp(data):
    '''Peak-to-Peak features'''
    data = np.asarray(data)
    PP = pd.DataFrame(np.max(data, axis=1) - np.min(data, axis=1))
    return PP

# Feature Extraction function - Variance
def Variance(data):
    '''Variance features'''
    data = np.asarray(data)
    Var = pd.DataFrame(np.var(data, axis=1))
    return Var

# Feature Extraction function - Root Mean Square (RMS)
def rms(data):
    '''RMS features'''
    data = np.asarray(data)
    Rms = pd.DataFrame(np.sqrt(np.mean(data**2, axis=1)))
    return Rms

# Feature Extraction function - Shape Factor
def Shapef(data):
    '''Shape factor features'''
    data = np.asarray(data)
    shapef = pd.DataFrame(rms(data)/Ab_mean(data))
    return shapef

# Feature Extraction function - Impulse Factor
def Impulsef(data):
    '''Impulse factor features'''
    data = np.asarray(data)
    impulse = pd.DataFrame(np.max(data)/Ab_mean(data))
    return impulse

# Feature Extraction function - Crest Factor
def crestf(data):
    '''Crest factor features'''
    data = np.asarray(data)
    crest = pd.DataFrame(np.max(data)/rms(data))
    return crest

# Feature Extraction function - Kurtosis
def kurtosis(data):
    '''Kurtosis features'''
    data = pd.DataFrame(data)
    kurt = data.kurt(axis=1)
    return kurt

# Feature Extraction function - Skewness
def skew(data):
    '''Skewness features'''
    data = pd.DataFrame(data)
    skw = data.skew(axis=1)
    return skw

# Helper function to calculate Absolute Mean
def Ab_mean(data):
    data = np.asarray(data)
    Abm = pd.DataFrame(np.mean(np.absolute(data), axis=1))
    return Abm

# Helper function to calculate Square Root of Amplitude
def SQRT_AMPL(data):
    data = np.asarray(data)
    SQRTA = pd.DataFrame((np.mean(np.sqrt(np.absolute(data, axis=1))))**2)
    return SQRTA

# Helper function to calculate Clearance Factor
def clearancef(data):
    data = np.asarray(data)
    clrf = pd.DataFrame(np.max(data, axis=1)/SQRT_AMPL(data))
    return clrf

def data_extract(path,index):
    data11 = pd.read_csv(path, usecols=[index], header=None)  # read the csv file
    return data11

data_class1_signal0 = data_extract(class_01_data_path,0).T.dropna(axis=1)
data_class1_signal1 = data_extract(class_01_data_path,1).T.dropna(axis=1)
data_class1_signal2 = data_extract(class_01_data_path,2).T.dropna(axis=1)
data_class1_signal3 = data_extract(class_01_data_path,3).T.dropna(axis=1)
data_class1_signal4 = data_extract(class_01_data_path,4).T.dropna(axis=1)
data_class1_signal5 = data_extract(class_01_data_path,5).T.dropna(axis=1)
data_class1_signal6 = data_extract(class_01_data_path,6).T.dropna(axis=1)
data_class1_signal7 = data_extract(class_01_data_path,7).T.dropna(axis=1)


fft_10 = FFT(data_class1_signal0)
fft_11 = FFT(data_class1_signal1)
fft_12 = FFT(data_class1_signal2)
fft_13 = FFT(data_class1_signal3)
fft_14 = FFT(data_class1_signal4)
fft_15 = FFT(data_class1_signal5)
fft_16 = FFT(data_class1_signal6)
fft_17 = FFT(data_class1_signal7)

def reshape_data(data, num_columns=10):
    '''Reshape data into multiple columns'''
    data = np.asarray(data)
    num_rows = data.shape[0]
    num_full_chunks = num_rows // num_columns
    reshaped_data = data[:num_full_chunks*num_columns].reshape(-1, num_columns)
    return reshaped_data

def NormalizeData(data):  # Normalization (0-1)
    data_max = np.max(data)
    data_min = np.min(data)
    normalized_data = (data - data_min) / (data_max - data_min)
    normalized_data=reshape_data(normalized_data)
    return normalized_data

fft_10 = NormalizeData(fft_10)
fft_11 = NormalizeData(fft_11)
fft_12 = NormalizeData(fft_12)
fft_13 = NormalizeData(fft_13)
fft_14 = NormalizeData(fft_14)
fft_15 = NormalizeData(fft_15)
fft_16 = NormalizeData(fft_16)
fft_17 = NormalizeData(fft_17)

shapef_10 = Shapef(fft_10)
shapef_11 = Shapef(fft_11)
shapef_12 = Shapef(fft_12)
shapef_13 = Shapef(fft_13)
shapef_14 = Shapef(fft_14)
shapef_15 = Shapef(fft_15)
shapef_16 = Shapef(fft_16)
shapef_17 = Shapef(fft_17)

shapef_1 = pd.concat([shapef_10,shapef_11, shapef_12, shapef_13,
 shapef_14, shapef_15, shapef_16, shapef_17
],
                     axis=1, ignore_index=True)
rms_10 = rms(fft_10)
rms_11 = rms(fft_11)
rms_12 = rms(fft_12)
rms_13 = rms(fft_13)
rms_14 = rms(fft_14)
rms_15 = rms(fft_15)
rms_16 = rms(fft_16)
rms_17 = rms(fft_17)

rms_1 = pd.concat([rms_10, rms_11, rms_12, rms_13,
 rms_14, rms_15, rms_16, rms_17
],
                  axis=1, ignore_index=True)

Impulsef_10 = Impulsef(fft_10)
Impulsef_11 = Impulsef(fft_11)
Impulsef_12 = Impulsef(fft_12)
Impulsef_13 = Impulsef(fft_13)
Impulsef_14 = Impulsef(fft_14)
Impulsef_15 = Impulsef(fft_15)
Impulsef_16 = Impulsef(fft_16)
Impulsef_17 = Impulsef(fft_17)

Impulsef_1 = pd.concat(
    [Impulsef_10, Impulsef_11, Impulsef_12, 
     Impulsef_14, Impulsef_15, Impulsef_16, Impulsef_17
    ],
    axis=1, ignore_index=True)

# peak factor
pp_10 = pp(fft_10)
pp_11 = pp(fft_11)
pp_12 = pp(fft_12)
pp_13 = pp(fft_13)
pp_14 = pp(fft_14)
pp_15 = pp(fft_15)
pp_16 = pp(fft_16)
pp_17 = pp(fft_17)

pp_1 = pd.concat(
    [pp_10, pp_11, pp_12, pp_13,
     pp_14, pp_15, pp_16, pp_17
    ],
    axis=1, ignore_index=True)

kurtosis_10 = kurtosis(fft_10)
kurtosis_11 = kurtosis(fft_11)
kurtosis_12 = kurtosis(fft_12)
kurtosis_13 = kurtosis(fft_13)
kurtosis_14 = kurtosis(fft_14)
kurtosis_15 = kurtosis(fft_15)
kurtosis_16 = kurtosis(fft_16)
kurtosis_17 = kurtosis(fft_17)

kurtosis_1 = pd.concat(
    [kurtosis_10, kurtosis_11, kurtosis_12, kurtosis_13,
     kurtosis_14, kurtosis_15, kurtosis_16, kurtosis_17
    ],
    axis=1, ignore_index=True)

# crest factor
crestf_10 = crestf(fft_10)
crestf_11 = crestf(fft_11)
crestf_12 = crestf(fft_12)
crestf_13 = crestf(fft_13)
crestf_14 = crestf(fft_14)
crestf_15 = crestf(fft_15)
crestf_16 = crestf(fft_16)
crestf_17 = crestf(fft_17)


crestf_1 = pd.concat(
    [crestf_10, crestf_11, crestf_12, crestf_13,
     crestf_14, crestf_15, crestf_16, crestf_17
    ],
    axis=1, ignore_index=True)

mean_10 = mean(fft_10)
mean_11 = mean(fft_11)
mean_12 = mean(fft_12)
mean_13 = mean(fft_13)
mean_14 = mean(fft_14)
mean_15 = mean(fft_15)
mean_16 = mean(fft_16)
mean_17 = mean(fft_17)

mean_1 = pd.concat(
    [mean_10, mean_11, mean_12, mean_13,
     mean_14, mean_15, mean_16, mean_17
    ],
    axis=1, ignore_index=True)

std_10 = std(fft_10)
std_11 = std(fft_11)
std_12 = std(fft_12)
std_13 = std(fft_13)
std_14 = std(fft_14)
std_15 = std(fft_15)
std_16 = std(fft_16)
std_17 = std(fft_17)

std_1 = pd.concat(
    [std_10, std_11, std_12, std_13,
     std_14, std_15, std_16, std_17
    ],
    axis=1, ignore_index=True)

skew_10 = skew(fft_10)
skew_11 = skew(fft_11)
skew_12 = skew(fft_12)
skew_13 = skew(fft_13)
skew_14 = skew(fft_14)
skew_15 = skew(fft_15)
skew_16 = skew(fft_16)
skew_17 = skew(fft_17)

skew_1 = pd.concat(
    [skew_10, skew_11, skew_12, skew_13,
     skew_14, skew_15, skew_16, skew_17
    ],
    axis=1, ignore_index=True)

x_1 = pd.concat([mean_1.iloc[:, :4], std_1.iloc[:, :4], shapef_1.iloc[:, :4], rms_1.iloc[:, :4], Impulsef_1.iloc[:, :4],
                pp_1.iloc[:, :4], kurtosis_1.iloc[:, :4], crestf_1.iloc[:, :4], skew_1.iloc[:, :4]], axis=1, ignore_index=True)

x1 = np.asarray(x_1)
fft_x1 = pd.DataFrame(x1).to_csv(r"testing_subset_features_w8.csv", index=None, header=True)
import pickle
svm_pkl_filename=r"C:\Users\Lenovo\OneDrive\Desktop\edp_finally\region_prediction_models\svm.pkl"
with open(svm_pkl_filename,'rb') as file:
    svm_model=pickle.load(file)
import pandas as pd
import numpy as np

df = pd.read_csv(r"C:\Users\Lenovo\OneDrive\Desktop\edp_finally\region_prediction_models\testing_subset_features_w8.csv")
predictions = []
lgbm_pkl_filename=r"C:\Users\Lenovo\OneDrive\Desktop\edp_finally\lgbm_for_whole.pkl"
lgbmA_pkl_filename=r"C:\Users\Lenovo\Downloads\lgbm_A (1).pkl"
lgbmB_pkl_filename=r"C:\Users\Lenovo\OneDrive\Desktop\edp_finally\lgbm_B.pkl"
lgbmC_pkl_filename=r"C:\Users\Lenovo\Downloads\lgbm_C (1).pkl"

with open(lgbm_pkl_filename,'rb') as file:
    lgbm_model=pickle.load(file)
with open(lgbmA_pkl_filename,'rb') as file:
    lgbmA_model=pickle.load(file)
with open(lgbmB_pkl_filename,'rb') as file:
    lgbmB_model=pickle.load(file)
with open(lgbmC_pkl_filename,'rb') as file:
    lgbmC_model=pickle.load(file)
for index, row in df.iterrows():
    single_row_features_array = np.array(row.values)
    prediction = svm_model.predict([single_row_features_array])
    if prediction=='A':
        predictions.append(lgbmB_model.predict([single_row_features_array]))
    elif prediction=='B':
        predictions.append(lgbmB_model.predict([single_row_features_array]))
    elif prediction=='C':
        predictions.append(lgbmB_model.predict([single_row_features_array]))
    
predictions_array = np.array(predictions)
ndf = pd.DataFrame({'': range(0, len(predictions_array))})
from sklearn.linear_model import LinearRegression
lr = LinearRegression()
lr.fit(ndf,predictions_array)
print(lr.predict(ndf)[-1][-1])