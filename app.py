import os
from flask import Flask, jsonify
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Add CORS to allow requests from the frontend

# Basic route to test server
@app.route('/')
def home():
    return 'Hello, welcome to the Pokémon API!'

# Route to get specific Pokémon data
@app.route('/pokemon/<name>', methods=['GET'])
def get_pokemon(name):
    try:
        response = requests.get(f'https://pokeapi.co/api/v2/pokemon/{name}', timeout=10)
        response.raise_for_status()
        pokemon_data = response.json()
        return jsonify(pokemon_data)
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 404

# Route to get all Pokémon
@app.route('/pokemon-list', methods=['GET'])
def get_all_pokemon():
    try:
        # Request data from PokeAPI with a timeout to prevent hanging requests
        response = requests.get('https://pokeapi.co/api/v2/pokemon?limit=1025', timeout=10)
        response.raise_for_status()

        # Convert response to JSON
        pokemon_list = response.json().get('results', [])

        # Create a list that includes name, ID, and front picture for each Pokémon
        formatted_pokemon_list = []
        for pokemon in pokemon_list:
            pokemon_id = pokemon.get('url').split('/')[-2]  # Extract ID from URL
            formatted_pokemon_list.append({
                'name': pokemon.get('name'),
                'id': pokemon_id,
                'front_pic': f'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{pokemon_id}.png'
            })

        return jsonify(formatted_pokemon_list)  # Return JSON data containing name, ID, and image URL

    except requests.exceptions.RequestException as e:
        return jsonify({'error': 'Could not retrieve Pokémon list'}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
