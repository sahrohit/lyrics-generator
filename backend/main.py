from urllib import request
from flask import Flask, request, jsonify
import json
from flask_cors import CORS
import requests
from os import environ
import datetime
import numpy as np
from keras.models import Sequential
from keras.layers import LSTM, Dense
import tensorflow as tf
from autocorrect import Speller

with open('corpus.txt', 'r') as file:
    Corpus = file.read()

spell = Speller()

symb = sorted(list(set(Corpus)))

L_corpus = len(Corpus) #length of corpus
L_symb = len(symb) #length of total unique characters

mapping = dict((c, i) for i, c in enumerate(symb))
reverse_mapping = dict((i, c) for i, c in enumerate(symb))

model = Sequential()
model.add(LSTM(256, input_shape=(40, 1)))
model.add(Dense(47, activation='softmax'))
opt = tf.keras.optimizers.Adamax(learning_rate=0.01)
model.compile(loss='categorical_crossentropy', optimizer=opt)
model.summary()

model.load_weights("Lyrics_Generator_kaggle_v2.h5")

def Lyrics_Generator(starter,Ch_count): #,temperature=1.0):
    generated= ""
    starter = starter
    seed=[mapping[char] for char in starter]
    generated += starter 
    # Generating new text of given length
    for i in range(Ch_count):
        seed=[mapping[char] for char in starter]
        x_pred = np.reshape(seed, (1, len(seed), 1))
        x_pred = x_pred/ float(L_symb)
        prediction = model.predict(x_pred, verbose=0)[0]  
        # Getting the index of the next most probable index
        prediction = np.asarray(prediction).astype('float64')
        prediction = np.log(prediction) / 1.0 
        exp_preds = np.exp(prediction)
        prediction = exp_preds / np.sum(exp_preds)
        probas = np.random.multinomial(1, prediction, 1)
        index = np.argmax(prediction)
        next_char = reverse_mapping[index]  
        # Generating new text
        generated += next_char
        starter = starter[1:] + next_char
       
    return generated

app = Flask("lyrics_generator")
CORS(app)


@app.route("/", methods=["GET"])
def ping():
    return "Pinging Model Application"


@app.route("/api/lyrics", methods=["POST"])
def api():
    input_json = request.json 
    initiator = input_json["initiator"]
    characters = input_json["characters"]
    print(initiator,characters)
    lyrics = Lyrics_Generator(initiator, characters)

    if not request.headers.getlist("X-Forwarded-For"):
        ip = request.remote_addr
    else:
        ip = request.headers.getlist("X-Forwarded-For")[0]

    try:
        geoDataResponse = requests.get(f"http://www.geoplugin.net/json.gp?ip={ip}")
        geoData = json.loads(geoDataResponse.text)
    except:
        print("Error getting Geo Data")

    response = {
        "generated_lyrics": spell(lyrics)
    }

    database_data = {
        # Objets need to be added to the database
        "generated_lyrics": spell(lyrics),
        "timestamp": datetime.datetime.now().timestamp(),
        "ipAddress": ip,
        "geoData": geoData,
    }
 
    try:
        requests.post(
            environ.get("DATABASE_URL"),
            data=json.dumps(database_data),
        )
    except:
        print("Couldn't Write to the Database")

    return jsonify(response)


if __name__ == "__main__":
    app.run(debug=True, port=9696)
