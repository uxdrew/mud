

function createGraph(originalData) {

    //yellow for happy, blue for sad, grey for neutral
    const happyColor = 'hsl(55.4, 94, 54.1)';
    const sadColor = 'hsl(212.2, 31.8, 57.5)';
    const neutralColor = 'hsl(0, 0, 77)';

    let sadCount = 0, happyCount = 0, neutralCount = 0;

    originalData.forEach(function(element) {
       element.mud === 'happy' ? happyCount += 1 : sadCount +=1;
    });


    let groupedByDate = originalData.groupBy('date');

    let expectedHours =  ["8", "10", "12", "14"];


    //group by date, then check if any mood recordings
    //were missed, if so, add them as missed data points
    for (let key in groupedByDate) {
        if (groupedByDate.hasOwnProperty(key)) {

            let hours = groupedByDate[key].map(x => x.hour);

            let missingHours = expectedHours.diff(hours);

            missingHours.forEach(function(element){
                originalData.push({
                    user: originalData[0] ? originalData[0].user : 'no user found',
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

    let xDataHappy = final.map(x => x.date);

    let yDataHappy = final.map(y => {
        if(Number(y.hour) === 12) {
            return "12pm";
        }

        if(Number(y.hour) === 0) {
            return "12am";
        }

        return y.hour > 12 ? (y.hour - 12) + "pm" : y.hour + "am";
    });

    let colorData = final.map(elem => {
        if(elem.mud === 'happy') {
            return happyColor;
        }
        if (elem.mud === 'sad') {
            return sadColor;
        }
            return neutralColor;

    });

    let happy = {
        y: yDataHappy,
        x: xDataHappy.map(x => x.substring(0, x.lastIndexOf('/'))),
        mode: "markers",
        marker: {

            color: colorData,
            size: '42',
            symbol: "circle",
        },
        type: "scatter",
    };
    let happySmaller = {
        y: yDataHappy,
        x: xDataHappy.map(x => x.substring(0, x.lastIndexOf('/'))),
        mode: "markers",
        marker: {

            color: "hsl(252, 5.9, 16.7)",
            size: '35',
            symbol: "circle",
        },
        type: "scatter",
    };

    let moodData = [happy,happySmaller];

    let count = {
        happy: happyCount,
        sad: sadCount,
        neutral: neutralCount
    };


    let ret = [
        {data: moodData,
        count: count,
            layout:{  hovermode: false,
                showlegend:false,
                title: "Mood Activity",
                titlefont: {
                    color: "rgb(249, 243, 243)"
                },
                plot_bgcolor: "hsl(252, 5.9, 16.7)",
                paper_bgcolor: "hsl(252, 5.9, 16.7)",
                yaxis: {
                    tickfont: {
                        color: "rgb(211, 202, 202)"
                    },
                    gridwidth: 0,
                    titlefont: {
                        color: "rgb(252, 246, 246)"
                    },
                    showgrid: true,

                    gridcolor: "rgb(157, 150, 150)",
                    showline: false,
                    autorange: true
                },
                xaxis: {
                    tickfont: {
                        color: "rgb(247, 243, 243)"
                    },
                    titlefont: {
                        color: "rgb(252, 246, 246)"
                    },
                    showgrid: false,
                    gridcolor: "rgb(245, 239, 239)",
                    zeroline: false,
                    showline: false,

                },
            }
        }


    ];
    return new Promise(function(resolve, reject) {
        resolve(ret);
        });
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

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

module.exports = createGraph;