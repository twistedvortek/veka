from flask import Flask, request, jsonify
app = Flask(__name__)

@app.route('/')
def home():
    return "Hello, World!"

if __name__ == '__main__':
    app.run(debug=True)

@app.route('/sensor_data', methods=['POST'])
def sensor_data():
    data = request.json
    print(data)
    # Process or save your data here
    return jsonify({"success": True, "data": data})
