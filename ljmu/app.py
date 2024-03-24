from flask import Flask, request, jsonify, render_template, send_from_directory
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__, static_folder='vue_build/static', template_folder='vue_build')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
db = SQLAlchemy(app)

class SensorData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    # Extend with more fields as needed

@app.before_first_request
def create_tables():
    db.create_all()

# Route to serve the Vue app's index.html
@app.route('/')
def serve_vue_app():
    return send_from_directory(app.template_folder, 'index.html')

# Additional route to serve static files from the Vue app's build output
@app.route('/static/<path:path>')
def serve_static(path):
    return send_from_directory('vue_build/static', path)

@app.route('/sensor_data', methods=['POST'])
def sensor_data():
    data = request.json
    new_record = SensorData(latitude=data['latitude'], longitude=data['longitude'])
    db.session.add(new_record)
    db.session.commit()
    return jsonify({"success": True, "message": "Sensor data saved."})

if __name__ == '__main__':
    app.run(debug=True)
