from flask import Flask, request, jsonify
from flask_cors import CORS
from crewai import Agent, Task, Process, Crew
from langchain_google_genai import ChatGoogleGenerativeAI
import json

api_key = "AIzaSyDUbXceYlMNQX-tZyu3jj7iFf2Pnlpr00k"
app = Flask(__name__)
CORS(app)

# Define agent configurations for different bots
def get_agent_for_type(bot_type):
    if bot_type == 'NLPtoSQL':
        return Agent(
            role = 'SQL Query Generator Assistant',
            goal = 'Generate a SQL query based on the user\'s input.',
            backstory = 'You are an assistant capable of generating SQL queries based on natural language queries. You understand SQL syntax and structure.',
            verbose = False,
            llm = ChatGoogleGenerativeAI(
                model="gemini-pro", verbose=True, temperature=0.1, google_api_key=api_key
            )
        )
    elif bot_type == 'doubt_clarification':
        return Agent(
            role = 'Doubt Clarification Assistant',
            goal = 'Clarify user doubts related to SQL, answer queries, and provide explanations.',
            backstory = 'You are a knowledgeable assistant who can help clarify doubts related to SQL, its syntax, and queries.',
            verbose = False,
            llm = ChatGoogleGenerativeAI(
                model="gemini-pro", verbose=True, temperature=0.1, google_api_key=api_key
            )
        )
    elif bot_type == 'optimized_code':
        return Agent(
            role = 'SQL Optimizer Assistant',
            goal = 'Provide optimized SQL code for given queries.',
            backstory = 'You are an assistant capable of providing optimized SQL code based on user queries. You understand how to improve SQL performance.',
            verbose = False,
            llm = ChatGoogleGenerativeAI(
                model="gemini-pro", verbose=True, temperature=0.1, google_api_key=api_key
            )
        )
    else:
        raise ValueError("Invalid bot type")

@app.route('/process', methods=['POST'])
def process_input():
    try:
        # Get the query and type from the request
        data = request.json
        query = data.get('query')
        bot_type = data.get('type')

        if not query or not bot_type:
            return jsonify({'error': 'Query and type are required'}), 400
        
        # Initialize the agent dynamically based on the bot type
        agent = get_agent_for_type(bot_type)

        # Create the task for the agent
        nlp_task = Task(
            description=f"Generate a response based on the user query: {query}",
            agent=agent,
            expected_output="Generated response in simple English language"
        )
        
        # Create the crew with the agent and task
        crew = Crew(
            agents=[agent],
            tasks=[nlp_task],
            verbose=False,
        )
        
        # Run the crew task
        op = crew.kickoff()
        
        # Assuming op is the result of the query processed by the agent
        output = op  # Replace with actual output from the agent
        
        # Return the output in the response
        return jsonify({'output': output})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True,port=3000)
