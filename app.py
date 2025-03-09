from flask import Flask, render_template, url_for, request
import csv
import random

app = Flask(__name__)

def getPracticeCards(deck): # serve all cards from a specified csv to the practice page
    cards = []
    with open("decks/" + deck) as file: # path can be varied here
        reader = csv.reader(file)
        for row in reader:
            cards.append({"front" : row[0], "back" : row[1]})
    random.shuffle(cards)
    return cards

def getQuizCards(deck): # return question and answer cards with matching id
    cards = []
    questionCards = []
    answerCards = []
    with open("decks/" + deck) as file:
        reader = csv.reader(file)
        for row in reader:
            cards.append({"front" : row[0], "back" : row[1], "pair" : row})
        random.shuffle(cards)
        cards = cards[:16]
        for card in cards: # divide card into question and answer cards
            questionCards.append({"content" : card["front"], "pair" : card["pair"]})
            answerCards.append({"content" : card["back"], "pair" : card["pair"]})
    random.shuffle(questionCards)
    random.shuffle(answerCards)
    return questionCards, answerCards
        

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/practice")
def practice():
    cards = getPracticeCards("testcsv.csv")
    return render_template("practice.html", cards = cards)

@app.route("/quiz")
def quiz():
    questionCards, answerCards = getQuizCards("testcsv.csv")
    return render_template("quiz.html", questionCards = questionCards, answerCards = answerCards)

app.run(debug = True)