const express = require("express");
const body_parser = require("body-parser");
const axios = require("axios");
require('dotenv').config();

const app = express().use(body_parser.json());

const token = "EAAOwxVUua2ABO8jHPNZB00P01F7qqtFlEEb4e3iFRDZCnNSPXZALZBEmfGudX4Ux7cUYJmQaHX0mAZCsRUWx2eJWOb0nvtQ2gnwQK2agGsXMlpcRe0B3myRmlAZBFHIXTLuZAYXciupI4ZBNsLZBu9ZApeaZBVfQXwfgSRYZAJPUdUNZCNXtcmw19LHWDiXAYo4VEPvmE8ErE5pPARpoMs52thbd1ZCq8lUJjcciKSoAZDZD";
const mytoken = "a2t_0.0.1";//prasath_token

app.listen(process.env.PORT, () => {
    console.log("webhook is listening");
});

//to verify the callback url from dashboard side - cloud api side
app.get("/webhook", (req, res) => {
    let mode = req.query["hub.mode"];
    let challange = req.query["hub.challenge"];
    let token = req.query["hub.verify_token"];


    if (mode && token) {

        if (mode === "subscribe" && token === mytoken) {
            res.status(200).send(challange);
        } else {
            res.status(403);
        }

    }

});

app.post("/webhook", async (req, res) => { //i want some 

    let body_param = req.body;

    console.log(JSON.stringify(body_param, null, 2));

    if (body_param.object) {
        console.log("inside body param");
        if (body_param.entry &&
            body_param.entry[0].changes &&
            body_param.entry[0].changes[0].value.messages &&
            body_param.entry[0].changes[0].value.messages[0]
        ) {

            if (body_param.entry[0].changes[0].value.messages[0].type == "audio") {
                let audio = body_param.entry[0].changes[0].value.messages[0].audio;
                let audioId = body_param.entry[0].changes[0].value.messages[0].audio.id;
                let response = await axios({
                    method: "GET",
                    url: "https://graph.facebook.com/v19.0/"+audioId,
                    
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': 'Bearer ' + mytoken
                    }

                });
                console.log(response.data.url);
                let response_audio = await axios({
                    method: "GET",
                    url: response.data.url,
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': 'Bearer ' + mytoken
                    }
                });
                console.log(response_audio.data);
            }

            if (body_param.entry[0].changes[0].value.messages[0].type == "text") {
                let phon_no_id = body_param.entry[0].changes[0].value.metadata.phone_number_id;
                let from = body_param.entry[0].changes[0].value.messages[0].from;
                let msg_body = body_param.entry[0].changes[0].value.messages[0].text.body;

                console.log("phone number " + phon_no_id);
                console.log("from " + from);
                console.log("boady param " + msg_body);
                axios({
                    method: "POST",
                    url: "https://graph.facebook.com/v19.0/296604976862397/messages",
                    data: {
                        messaging_product: "whatsapp",
                        to: "966580701918",
                        text: {
                            body: "Your message is " + msg_body
                        }
                    },
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': 'Bearer ' + mytoken
                    }

                });
            }

            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }

    }

});

app.get("/", (req, res) => {
    res.status(200).send("hello this is webhook setup " + process.env.TOKEN);
});