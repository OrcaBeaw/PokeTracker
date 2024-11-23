import os
from concurrent.futures import ThreadPoolExecutor

from flask import Flask, jsonify
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow all origins

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


@app.route('/pokemon-list', methods=['GET'])
def get_all_pokemon():
    try:
        # Request data from PokeAPI with a timeout to prevent hanging requests
        response = requests.get(url='https://pokeapi.co/api/v2/pokemon?limit=1025', timeout=10)
        response.raise_for_status()

        # Convert response to JSON
        pokemon_list = response.json().get('results', [])

        # Create a list that includes name, ID, front picture, and types for each Pokémon
        formatted_pokemon_list = []
        for pokemon in pokemon_list:
            pokemon_id = pokemon.get('url').split('/')[-2]  # Extract ID from URL

            # Fetch Pokémon details for type information
            pokemon_details = requests.get(f'https://pokeapi.co/api/v2/pokemon/{pokemon_id}/', timeout=10)
            pokemon_details.raise_for_status()
            details_json = pokemon_details.json()

            # Extract types
            types = [t['type']['name'] for t in details_json.get('types', [])]

            formatted_pokemon_list.append({
                'name': pokemon.get('name'),
                'id': pokemon_id,
                'front_pic': f'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{pokemon_id}.png',
                'types': types  # Add the types here
            })

        # Return JSON data containing name, ID, image URL, and types
        return jsonify(formatted_pokemon_list)

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)