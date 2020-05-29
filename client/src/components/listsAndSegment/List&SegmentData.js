export const SegmentConditions = [
    {
        id:1,
        text:"What someone has done (or not done)",
        metric: [ "Bounced Email","Clicked Email","Dropped Email","Marker Email as Spam","Opened Email", "Received Email","Unreceived Email" ],
        frequency: ["at least once","zero times","equals","doesn't equal","is atleast","is greater than","is less than","is at most"],
        time: ["over all time", "in the last","between","before","after","between dates"]
    },
    {
        id:2,
        text:"Properties About Someone",
        dimensions:["Created","Email","First Active","First Name","Last Active","Last Name","Organisation","Phone Number","Unique ID","Viewed Items"],
        condition: ["equals","doesn't equal","contains","doesn't contain","is in","is not in","starts with","doesn't start with","is set","is not set"],
        type:["Text","Number","Date","Boolean","List"]
    },
    {
        id:3,
        text:"If someone is or is not within the EU (GDPR)",
        location:["is","is not"],
        region:["European Union", "United States"]
    },
    {
        id:4,
        text:"Someone's proximity to a location",
        person:["is","is not"],
        dimensions:["Miles","Kilomenters"],
        countries:["India","Russia"]
    },
    {
        id:5,
        text:"If someone is in or not in a list",
        person:["is","is not"],
        lists:["Dummy lists","Actual will be dynamic"]
    },
    {
        id:6,
        text:"If someone is or is not suppressed for email",
        person:["is","is not"]
    },
    {
        id:7,
        text:"Predictive analytics about someone",
        attribute:["Predicted Gender"],
        person:["is","is not"],
        possibility:["Uncertain","Likely Male","Likely Female"]
    }
]