from flask import Flask, request, jsonify
import joblib
from utils.database import insert_ship_data, fetch_ship_data, insert_fuel_efficiency, create_tables
from utils.fuel_efficiency import calculate_fuel_efficiency

app = Flask(__name__)

# Ensure database tables are created
create_tables()

# Load the trained machine learning model
model = joblib.load('models/model.pkl')

@app.route('/insert', methods=['POST'])
def insert_data():
    """Insert ship data into the database"""
    data = request.json
    insert_ship_data(data)
    return jsonify({"message": "Data inserted successfully"}), 201

@app.route('/predict', methods=['GET'])
def predict():
    """Fetch stored ship data and make predictions using ML model"""
    data = fetch_ship_data()
    predictions = model.predict(data)
    return jsonify({"predictions": predictions.tolist()}), 200

@app.route('/calculate-fuel-efficiency', methods=['POST'])
def fuel_efficiency():
    """Calculate fuel efficiency for a given ship"""
    data = request.json
    ship_id = data.get("ship_id")
    engine_capacity = data.get("engine_capacity")
    fuel_consumption = data.get("fuel_consumption")
    cargo_weight = data.get("cargo_weight")
    speed_knots = data.get("speed_knots")

    if not all([engine_capacity, fuel_consumption, cargo_weight, speed_knots]):
        return jsonify({"error": "Missing parameters"}), 400

    efficiency_score = calculate_fuel_efficiency(engine_capacity, fuel_consumption, cargo_weight, speed_knots)
    
    if efficiency_score is None:
        return jsonify({"error": "Invalid input values"}), 400
    
    insert_fuel_efficiency(ship_id, engine_capacity, fuel_consumption, cargo_weight, speed_knots, efficiency_score)

    return jsonify({"ship_id": ship_id, "efficiency_score": efficiency_score}), 200

if __name__ == '__main__':
    app.run(debug=True)
