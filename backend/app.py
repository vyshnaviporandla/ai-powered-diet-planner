from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


def local_rule_based_plan(dietary_preference, goal):
    """
    Local fallback AI engine.
    Generates a general wellness-oriented meal plan
    using simple rules.
    """

    if dietary_preference == "Vegan":
        breakfast = "Oatmeal with banana, berries and plant-based milk"
        lunch = "Rice or whole grains with dal, vegetables and beans"
        dinner = "Vegetable soup with whole grains and beans"

    elif dietary_preference == "Vegetarian":
        breakfast = "Oatmeal with banana, fruit and milk"
        lunch = "Rice or whole grains with dal, vegetables and curd"
        dinner = "Vegetable soup with whole grains and a protein-rich side"

    else:
        breakfast = "Oatmeal with banana, fruit and milk"
        lunch = "Rice or whole grains with dal, vegetables and a protein-rich side"
        dinner = "Vegetable soup with whole grains and a protein-rich side"

    return {
        "goal": goal,
        "dietaryPreference": dietary_preference,
        "breakfast": breakfast,
        "lunch": lunch,
        "snack": "Seasonal fruit with a small serving of nuts or seeds",
        "dinner": dinner,
        "hydration": "Drink water regularly according to your thirst and daily routine.",
        "nutritionSummary": (
            "A balanced combination of grains, vegetables, "
            "fruits and protein-rich foods."
        ),
        "aiEngine": "Local Rule-Based Fallback"
    }


def generate_ai_plan(data):
    """
    AI engine controller.

    Future:
    An external AI API can be called here.

    Current:
    We use the local rule-based engine so the project
    works without a paid AI API.
    """

    dietary_preference = data.get(
        "dietaryPreference",
        "General"
    )

    goal = data.get(
        "goal",
        "Balanced eating"
    )

    # Current fallback engine
    return local_rule_based_plan(
        dietary_preference,
        goal
    )


@app.route("/")
def home():
    return jsonify({
        "message": "AI Diet Planner API is running",
        "status": "success"
    })


@app.route("/api/health")
def health():
    return jsonify({
        "status": "healthy",
        "service": "diet-planner-backend"
    })


@app.route("/api/generate-plan", methods=["POST"])
def generate_plan():
    data = request.get_json() or {}

    try:
        plan = generate_ai_plan(data)

        return jsonify({
            "success": True,
            "plan": plan
        })

    except Exception as error:
        return jsonify({
            "success": False,
            "error": "Unable to generate diet plan"
        }), 500


if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )