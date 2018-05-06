function createGraph(data, callback) {

    translateData(data, function(err, translatedData,count) {
        callback(null,translatedData,count);

    });
}


//take data from the db and format for the graph tool
function translateData(originalData, callback) {

    let xDataHappy = [], yDataHappy = [],
         sizeData = [], colorDataHappy = [];

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
                });
                neutralCount += 1;
            })
        }
    }

    //sort again after the addition of neutral moods
    let x = originalData.groupBy('date');
    let y = [];
    for (let key in x) {
        if (x.hasOwnProperty(key)) {
            y.push(x[key])
        }
    }
    y.sort(function(a,b){
        return Date.parse(a[0].date) > Date.parse(b[0].date);
    });

    let final = [];

    y.forEach(function(element) {
        element.sort(function(a,b) {
            return Number(a.hour) > Number(b.hour);
        });

        element.forEach(function(elem) {
            final.push(elem);
        })
    });

    final.forEach(function(element) {

        //convert 24 hour time
        let twelveHourTime = element.hour > 12 ? (element.hour - 12) + 'pm' : element.hour + 'am';

        //yellow for happy, blue for sad, grey for neutral
        let happyColor =  '(hsl(52, 97, 52)';
        let sadColor = 'hsl(210, 79, 30)';
        let neutralColor = 'hsl(0, 0, 77)';

        if(element.mud === 'happy') {
            colorDataHappy.push(happyColor);

        } else if (element.mud === 'sad') {
            colorDataHappy.push(sadColor);

        } else {
            colorDataHappy.push(neutralColor);

        }
        xDataHappy.push(element.date);
        yDataHappy.push(twelveHourTime);

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
            symbol: "square",
        },
        name : "Happy " + happyCount,
        type: "scatter",
    };

    let translatedData = [happy];

    let count = {
        happy: happyCount,
        sad: sadCount,
        neutral: neutralCount
    };
    callback(null,translatedData,count);
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