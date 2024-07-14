from flask import Flask, request, jsonify, render_template
import mindsdb_sdk
from dotenv import load_dotenv
import os

app = Flask(__name__)

load_dotenv()

mindsdb_server = os.getenv('MINDSDB_SERVER', 'http://localhost:47334')
server = mindsdb_sdk.connect(mindsdb_server)
project_name = "mindsdb"
model_name = "cyber_chatbot7"

@app.route('/')
def index():
    return render_template('guardy.html')

@app.route('/chat')
def chat():
    return render_template('chatwindow.html')

@app.route('/games')
def games():
    return render_template('games.html')

@app.route('/courses')
def courses():
    return render_template('courses.html')

@app.route('/quiz')
def quiz():
    return render_template('quiz.html')


@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        user_question = data['question']

        context = "Answer very little quirkily and as if speaking           to another cyber expert: "
        question = f"{context}{user_question}"

        project = server.get_project(project_name)

        model = project.models.get(model_name)

        prediction = model.predict({'question': question})

        return jsonify({'response': prediction['answer'].iloc[0]})

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
