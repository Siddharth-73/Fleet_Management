def calculate_fuel_efficiency(engine_capacity, fuel_consumption, cargo_weight, speed_knots):
    """
    Calculates fuel efficiency based on given parameters.
    A lower efficiency score indicates better fuel economy.
    """
    try:
        efficiency_score = (fuel_consumption / speed_knots) * (cargo_weight / engine_capacity)
        return round(efficiency_score, 2)
    except ZeroDivisionError:
        return None
