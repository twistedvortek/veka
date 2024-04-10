from flask import Flask, request, render_template, jsonify
from werkzeug.utils import secure_filename
from celery import Celery
import os
from moviepy.editor import VideoFileClip

app = Flask(__name__)

# Configuration
UPLOAD_FOLDER = './uploads'
PROCESSED_FOLDER = './processed'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'mp4'}
MAX_CONTENT_LENGTH = 10 * 1024 * 1024  # 10MB

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = MAX_CONTENT_LENGTH
app.config['CELERY_BROKER_URL'] = 'redis://localhost:6379/0'
app.config['CELERY_RESULT_BACKEND'] = 'redis://localhost:6379/0'

# Initialize Celery
celery = Celery(app.name, broker=app.config['CELERY_BROKER_URL'])
celery.conf.update(app.config)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def allowed_duration(filepath, max_duration=30):
    video = VideoFileClip(filepath)
    duration = video.duration  # Duration in seconds
    video.close()
    return duration <= max_duration

@app.route('/')
def index():
    return render_template('main.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        # Check video duration
        if not allowed_duration(filepath):
            return jsonify({'error': 'Video duration exceeds the allowed limit.'}), 400

        # Process the file asynchronously
        task = process_file.apply_async(args=[filepath])
        return jsonify({'message': 'File uploaded. Processing started.', 'task_id': task.id})

@app.route('/status/<task_id>')
def taskstatus(task_id):
    task = process_file.AsyncResult(task_id)
    response = {
        'state': task.state,
        'current': 0,
        'total': 100,
        'status': 'Pending...'
    }
    if task.info:
        response.update(task.info)
    return jsonify(response)

@celery.task(bind=True)
def process_file(self, filepath):
    # Placeholder for your processing logic
    processed_output = yolo_deepsort_process(filepath)

        # Simulate processing progress
    for i in range(1, 101):
        self.update_state(state='PROGRESS', meta={'current': i, 'total': 100, 'status': 'Processing'})
        time.sleep(0.1)  # Simulate processing delay
    
    # Save processed output to PROCESSED_FOLDER and return path
    processed_filepath = os.path.join(PROCESSED_FOLDER, os.path.basename(filepath))
    # Example processing function call
    # actual_processing_function(filepath, processed_filepath)
    return {'processed_filepath': processed_filepath, 'status': 'Completed'}

def yolo_deepsort_process(filepath):
    # Dummy processing function - replace with actual processing
    return filepath  # For demo purposes, return the same path

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
