import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import joblib

# Load dataset
df = pd.read_csv('data/ship_data.csv')

# Preprocess data
X = df[['latitude', 'longitude', 'fuel_consumption']]
y = df['maintenance_required']

# Train model
model = RandomForestClassifier()
model.fit(X, y)

# Save model
joblib.dump(model, '../backend/models/model.pkl')