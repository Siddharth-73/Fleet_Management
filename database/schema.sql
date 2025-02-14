CREATE TABLE ship_data (
    id SERIAL PRIMARY KEY,
    ship_id INTEGER NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL,
    fuel_consumption FLOAT NOT NULL,
    timestamp TIMESTAMP NOT NULL,
    maintenance_required BOOLEAN DEFAULT FALSE
);