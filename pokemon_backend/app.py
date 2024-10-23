from crypt import methods

from flask import Flask, jsonify
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app) #ADD CORS TO ALLOW REQUEST FROM FRONTEND

#basic route to test server
@app.route('/')
def home():
    return 'Hello, welcome to the pokemon api!'

#route to get pokedata
@app.route('/pokemon/<name>', methods=['GET'])
def get_pokemon(name):
    try:
        #make request to PokeAPI to get data for the specified pokemon
        response = requests.get(f'https://pokeapi.co/api/v2/pokemon/{name}')
        response.raise_for_status() #Raise error if request fails

        #Convert response to json
        pokemon_data = response.json()
        return jsonify(pokemon_data) #return json data

    except requests.exceptions.RequestException as e:
        #If an error ocurred, return a json response with an error message
        return jsonify({'error': str(e)}), 404

if __name__ == '__main__':
    app.run(debug=True)