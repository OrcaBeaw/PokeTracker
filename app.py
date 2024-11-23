import os
from concurrent.futures import ThreadPoolExecutor

from flask import Flask, jsonify, make_response
import requests
from flask_cors import CORS

app = Flask(__name__)

# Configure CORS at the application level
CORS(app,
     origins=["https://poke-tracker.vercel.app"],
     methods=["GET", "POST", "OPTIONS"],
     allow_headers=["Content-Type"],
     supports_credentials=True,
     expose_headers=["Access-Control-Allow-Origin"],
     max_age=600)

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
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 404

@app.route('/pokemon-list', methods=['GET'])
def get_all_pokemon():
    try:
        # Fetch list of all Pokémon (URLs)
        response = requests.get(url='https://pokeapi.co/api/v2/pokemon?limit=1025', timeout=10)
        response.raise_for_status()
        pokemon_list = response.json().get('results', [])

        # Define function to fetch Pokémon details
        def fetch_pokemon_details(pokemon):
            pokemon_id = pokemon.get('url').split('/')[-2]
            details_response = requests.get(f'https://pokeapi.co/api/v2/pokemon/{pokemon_id}/', timeout=10)
            details_response.raise_for_status()
            details_json = details_response.json()

            # Extract data
            types = [t['type']['name'] for t in details_json.get('types', [])]
            return {
                'name': pokemon.get('name'),
                'id': pokemon_id,
                'front_pic': f'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{pokemon_id}.png',
                'types': types
            }

        # Use ThreadPoolExecutor to parallelize requests
        with ThreadPoolExecutor() as executor:
            formatted_pokemon_list = list(executor.map(fetch_pokemon_details, pokemon_list))

        return jsonify(formatted_pokemon_list)

    except requests.exceptions.RequestException as e:
        return jsonify({'error': 'Could not retrieve Pokémon list'}), 500
    except Exception as e:
        return jsonify({'error': 'An unexpected error occurred'}), 500

@app.after_request
def after_request(response):
    """Ensure CORS headers are set correctly on all responses"""
    # Explicitly set CORS headers
    response.headers.set('Access-Control-Allow-Origin', 'https://poke-tracker.vercel.app')
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.set('Access-Control-Allow-Credentials', 'true')

    # Remove any existing SameSite cookies
    for cookie in response.headers.getlist('Set-Cookie'):
        if '__vercel_live_token' in cookie:
            response.headers.remove('Set-Cookie')

    return response

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)