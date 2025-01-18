from flask import Flask, jsonify, render_template, request
import random

app = Flask(__name__)

# Simulated traffic data storage
traffic_data = []

@app.route('/')
def index():
    return render_template('index.html')


@app.route("/visual")
def visual():
    return render_template("visual.html")

@app.route('/info')
def info():
    return render_template('info.html')

@app.route('/mitigation', methods=['GET', 'POST'])
def mitigate_botnet():
    if request.method == 'GET':
        return render_template('mitigation.html')  # Render a template or return a message
    
    # Existing POST logic
    try:
        data = request.json
        botnet_ip = data.get('botnet_ip')
        if not botnet_ip:
            return jsonify({"success": False, "error": "Botnet IP is required"}), 400
        
        print(f"Mitigating {botnet_ip}...")
        return jsonify({"success": True, "message": f"Mitigation successful for {botnet_ip}"})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/traffic_data', methods=['GET'])
def get_traffic_data():
    """API to fetch the current traffic data."""
    return jsonify(traffic_data)

@app.route('/detect', methods=['POST'])
def detect_traffic():
    """API to receive and classify traffic."""
    try:
        data = request.json
        data['status'] = "Normal Traffic" if random.random() > 0.5 else "DDoS Attack"
        traffic_data.append(data)
        # Limit to the latest 10 records
        if len(traffic_data) > 10:
            traffic_data.pop(0)
        return jsonify({"message": "Data received", "data": data})
    except KeyError as e:
        return jsonify({"error": f"Missing key: {str(e)}"}), 400

if __name__ == '__main__':
    app.run(debug=True)
