/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';
const Alexa = require('alexa-sdk');

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1';
const APP_ID = undefined;

const SKILL_NAME = 'Space Facts';
const GET_FACT_MESSAGE = "Generating a random meme in 3... 2... 1... : ";
const HELP_MESSAGE = 'You can say tell me a space fact, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

//=========================================================================================================================================
//TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/data
//=========================================================================================================================================
const data = [
  'what did the farmer say when he lost his tractor? Wheres my tractor',
  'whats 9 plus 10. 21?',
  'come to surf taco we have free sha voc a doo',
  'it is wednesday my dudes  aaaaaaaaaaaaaaaaaaaaaaaaaahhhhhhhh',
  "Your not my dad you ugly ass noodle head",
  "ive got a question for you  What are THOSE!!",
  "if call my top being flat again I'm gonna yeet google home out the freakin window.",
  "an old car engine is starting vvvvvvvvvvvvvvv vvvvvvvvvvvvvv vvvvvvvv vvvv vvvvvv vv ",
  "i'm going to yeet my self across the room",
  "Road work ahead. sure hope it does.",
  "Amazon alexa is a very bad device.",
  "Nice meme.",
  "sans undertale.",
  "Well, Seymour, I made it... despite your directions Ah, Superintendent Chalmers! Welcome! I hope you're prepared for an unforgettable luncheon! Oh egads, my roast is ruined! But what if... I were to purchase fast food and disguise it as my own cooking?  Oh ho ho ho ho... delightfully devilish, Seymour! Uh- Skinner with his crazy explanations,The superintendent's gonna need his medication, When he hears Skinner's lame exaggerations, There'll be trouble in town tonight! Seymour! Superintendent, I was just, uh... just stretching my calves on the windowsill. Isometric exercise! Care to join me? Why is there smoke coming out of your oven, Seymour? Uhh no! That isn't smoke It's steam Steam from the steamed clams we're having! Mmm steamed clams! Ooh Superintendent, I hope you're ready for mouthwatering hamburgers! I thought we were having steamed clams D'oh, no I said steamed hams! That's what I call hamburgers! You call hamburgers steamed hams? Yes It's a regional dialect! Uh-huh uh, what region? Uhh upstate New York Really? Well, I'm from Utica, and I've never heard anyone use the phrase steamed hams. Oh, not in Utica, no It's an Albany expression I see You know, these hamburgers are quite similar to the ones they have at Krusty Burger Oh ho ho ho... no, patented Skinner burgers Old family recipe For steamed hams? Yes Yeah, so you call them steamed hams despite the fact they are obviously grilled  Ye- hey- you know, the- one thing I should- excuse me for one second Of course Well, that was wonderful. A good time was had by all, I'm pooped Yes, I should be- Good Lord, what is happening in there!? Aurora borealis? Uh- aurora borealis!? At this time of year, at this time of day, in this part of the country, localized entirely within your kitchen!? Yes! May I see it? No Seymour, the house is on fire! No, mother—it's just the northern lights! Well, Seymour, you are an odd fellow, but I must say... you steam a good ham Help! Help!",
  "They did surgery on a grape.",
  "If you own AirPods, you officially don't speak broke.",
  "New Smash character: Donald Trump shuts it down!",
  "What's the dumbest thing you've ever spent money on? 'my diploma.'",
  "Three men on a lifeboat want to smoke. But they don't have a lighter. So, they throw one cigarette over the boat to make it a cigarette lighter.",
  "What people think I do at hackathons: Days of coding and hard work. What I actually do: Sleep for half the time, freak out the other half.",
  "WATCH OUT TITANIC THE ICEBERG IS COMING! OH MY GOD it HAS AIRPODS ON it CAN'T HEAR us!",
  "I'm going to yeet myself across the room",
  "A man walks into a bar. Ouch.",
  "A horse walks into a bar. Several patrons immediately leave due to the dangers ",
  "What do you call cheese that isn't yours?.. Stolen. Stealing is bad for you and you should return it.",
  "What did one Frenchman say to the other?.. I don't know. I don't speak French.",
  "What did Buzz Lightyear say to Woody?.. A lot, there were 3 movies.",
  "What did Jessie say when she got caught with Buzz Lightyear by Woody?.. You've got a friend in me.",
  "What do college students and deer have in common?.. They both stand in the middle of the road and stare at your headlights.",
  "This is Bill. Bill is on Facebook. Bill sees something that offends him. Bill moves on. Bill is smart. Be like Bill.",
  "Having dumped a bag of ashes on the table, Stew hid behind the door and waited for the x-ray technician's reaction.",
  "Boss: Can I see you in my office? Me, trying to supress my laughter as I put on camo: You can sure try.",
  "Mr. Trump, what you've just said is one of the most insanley idiotic things I have ever heard. At no point in your rambling, incoherent response were you even close to anything that could be considered a rational thought. Everyone in this room is now dumber for having listened to it. I award you no points, and may God have mercy on your soul.",
  "British people be like wakes up during a heart transplant, right ,what's all this then.",
  "Ian opens shades.  me. bro what is wrong with you?",
  "you wanna hear a damn joke? Just go look in the mirror.",
  "alexa looks at meme catapult. Alexa, YEET!",
  "me: says nothing. alexa:I don't care if you broke your elbow",
  "just told every kid in the plane that there riding the battle bus and they all jumped out, sadly thier glider didn't open up I lmao, now thats a victory royale",
  "do you believe we are gonna stand up here for 3 minutes and tell alexa to pit out memes? yes",
  "my little cousin got airpods for christmas and is going around the house saying, i cant hear yall cuz your broke!",
];

//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================

const handlers = {
    'LaunchRequest': function () {
        this.emit('GetNewFactIntent');
    },
    'GetNewFactIntent': function () {
        const factArr = data;
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];
        const speechOutput = GET_FACT_MESSAGE + randomFact;

        this.response.cardRenderer(SKILL_NAME, randomFact);
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
