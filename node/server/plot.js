function createGraph(data, callback) {

    translateData(data, function(err, translatedData) {
        callback(null,translatedData);

    });
}


//take data from the db and format for the graph tool
function translateData(originalData, callback) {

    let xDataHappy = [], yDataHappy = [],
        xDataSad = [] , yDataSad = [],
        xDataNeutral = [], yDataNeutral = [],
         sizeData = [], colorDataHappy = [],
         colorDataSad = [], colorDataNeutral = [];

    let sadCount = 0, happyCount = 0, neutralCount = 0;

    originalData.forEach(function(element) {
       element.mud === 'happy' ? happyCount += 1 : sadCount +=1;
    });


    let newData = originalData.groupBy('date');

    let expectedHours =  ["8", "10", "12", "14"];

    //group by date, then check if any mood recordings
    //were missed, if so, add them as missed data points
    for (let key in newData) {
        if (newData.hasOwnProperty(key)) {

            let hours = [];

            newData[key].forEach(function(element) {
                hours.push(element.hour);
            });

            let missingHours = expectedHours.diff(hours);

            missingHours.forEach(function(element){
                originalData.push({
                    user: originalData[0].user,
                    mud: "missed",
                    date : key,
                    hour : element,
                })
                neutralCount += 1;
            })

        }
    }


    //sort time by hour
    originalData.sort(function(a,b) {
        return a.hour - b.hour;
    });

    originalData.forEach(function(element) {

        //convert 24 hour time
        let twelveHourTime = element.hour > 12 ? (element.hour - 12) + 'pm' : element.hour + 'am';

        //yellow for happy, blue for sad, grey for neutral
        let happyColor =  '(hsl(52, 97, 52)';
        let sadColor = 'hsl(210, 79, 30)';
        let neutralColor = 'hsl(0, 0, 77)';

        if(element.mud === 'happy') {
            colorDataHappy.push(happyColor);
            xDataHappy.push(twelveHourTime);
            yDataHappy.push(element.date);
        } else if (element.mud === 'sad') {
            colorDataSad.push(sadColor);
            xDataSad.push(twelveHourTime);
            yDataSad.push(element.date);
        } else {
            colorDataNeutral.push(neutralColor);
            xDataNeutral.push(twelveHourTime);
            yDataNeutral.push(element.date);
        }

        //add default size for any mood
       sizeData.push('42');

    });

    let happy = {
        y: yDataHappy,
        x: xDataHappy,
        mode: "markers",
        marker: {

            color: colorDataHappy,
            size: sizeData,
        },
        name : "Happy " + happyCount,
        type: "scatter"
    };
    let sad = {
        y: yDataSad,
        x: xDataSad,
        mode: "markers",
        marker: {
            color: colorDataSad,
            size: sizeData,
        },
        name : "Sad " + sadCount,
        type: "scatter"
    };

    let neutral = {
        y: yDataNeutral,
        x: xDataNeutral,
        mode: "markers",
        marker: {
            color: colorDataNeutral,
            size: sizeData,
        },
        name: "Neutral " + neutralCount,
        type: "scatter"
    };

    let translatedData = [happy,sad,neutral];


    callback(null,translatedData);
}

//helper functions
Array.prototype.groupBy = function(prop) {
    return this.reduce(function(groups, item) {
        const val = item[prop];
        groups[val] = groups[val] || [];
        groups[val].push(item);
        return groups
    }, {})
};

Array.prototype.diff = function(a) {
    return this.filter(function(i) {
        return a.indexOf(i) < 0;
    });
};

module.exports = createGraph;